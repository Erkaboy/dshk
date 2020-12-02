from __future__ import unicode_literals
from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse 
import os 
from django.core.serializers import serialize
from django.core.paginator import Paginator
import geodaisy.converters as convert

import psycopg2

 
import json
from django.contrib.gis.geos import GEOSGeometry

from django.core import serializers

from django.db.models import Q
from proj.redline_models import Redlines_edit,Redlines

from proj.genplan_models import Genplans
from .models import Viloyat


 
def redline_data(request):
	data=request.POST
	if data.get('type')=='redline':
		if data.get('filter')=='-0':
			redline= Redlines.objects.filter(~Q(status = 4))
			redline_data= serializers.serialize('json',redline,fields=[
					'genplan_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':redline_data})
		else:
			if data.get('filter_type')=='vil':
				redline= Redlines.objects.filter(~Q(status = 4),Q(vil_id=data.get('filter')))
				redline_data= serializers.serialize('json',redline,fields=[
					'genplan_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':redline_data})

	elif data.get('type')=='redline_edit':
		if data.get('filter_type')=='status':
			redline= Redlines_edit.objects.filter(status=data.get('filter'))
			redline_data= serializers.serialize('json',redline,fields=[
					'genplan_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':redline_data})

		elif data.get('filter_type')=='vil':
			redline= Redlines_edit.objects.filter(vil_id=data.get('filter'))
			redline_data= serializers.serialize('json',redline,fields=[
					'genplan_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':redline_data})


def save_edit_redline(request):
	if request.method=='POST':
		data=request.POST
		redline_edit = Redlines_edit.objects.filter(id=data.get('redline_id')).first()
		redline = Redlines.objects.filter(pk=redline_edit.redline_id.pk).first()
		if data.get('confirm')=='1':
			redline.nomi=redline_edit.nomi
			redline.genplan_id =redline_edit.genplan_id
			redline.vil_id=redline_edit.vil_id
			redline.wkb_geometry=redline_edit.wkb_geometry			
			redline.status=0
			redline.save()
			redline_edit.delete()
			return HttpResponse(1)
		else:
			redline_edit.delete()
			redline.status=0
			redline.save()

			return HttpResponse(0)
	else:
		return HttpResponse('save_edit_redline')

 
def delete_redline(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='last_delete':

			redline = Redlines.objects.filter(id=data.get('redline_id')).first()
			redline_edit = Redlines_edit.objects.filter(redline_id=redline.pk,status=3).first()

			if redline_edit:
				return HttpResponse(redline_edit.pk)
			else:
				redline_edit = Redlines_edit.objects.create(
					genplan_id = redline.genplan_id,
					redline_id=redline,
					vil_id=redline.vil_id,
					nomi=redline.nomi,
					id=redline.id,
					status = 3,
					wkb_geometry = redline.wkb_geometry

				)

				redline.status=3
				redline.save()

				return HttpResponse(0)	

		elif data.get('type')=='admin_delete':
			if data.get('confirm')=='1':
				redline = Redlines.objects.filter(id=data.get('redline_id'),status=4).first()
				if not redline:
					redline = Redlines.objects.filter(id=data.get('redline_id')).first()
					redline.status=4
					redline.save()

					Redlines_edit.objects.filter(redline_id=redline.pk).delete()
					
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				redline = Redlines.objects.filter(id=data.get('redline_id')).first()
				redline_edit = Redlines_edit.objects.filter(redline_id=redline.pk,status=3).first()
				if redline_edit:					
					redline.status=0
					redline.save()
					redline_edit.delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)
	else:
		return HttpResponse('/delete_redline')	

 
def redline_genplans_data(request):
	if request.method=='POST':
		data=request.POST
		genplan_data=Genplans.objects.filter(Q(respublika_viloyat=data.get('vil_id')),~Q(status=4),~Q(tasdiqlanganligi=3)).order_by('aholi_punktining_nomi').values('aholi_punktining_nomi','pk')



		return JsonResponse({'genplan_data':list(genplan_data)},safe=False)
	else:

		return HttpResponse('/redline_genplans_data')

 
def edit_redline_data(request):
	if request.method=='POST':
		data=request.POST
		if data.get('status')=='0':

			redline_edit= Redlines_edit.objects.filter(id=data.get('redline_id')).first()
			
			if redline_edit:

				redlines_json= serializers.serialize('geojson', [redline_edit,])
				genplan_data=Genplans.objects.filter(respublika_viloyat=redline_edit.vil_id).values('aholi_punktining_nomi','pk')

				return JsonResponse({
								'redlines_json':redlines_json,
								'genplan_data':list(genplan_data),
								'redline_id': redline_edit.pk,
								'status': 2,
								 },safe=False)

			else:

				redlines= Redlines.objects.get(id=data.get('redline_id'))
				redlines_json= serializers.serialize('geojson', [redlines,])
				genplan_data=Genplans.objects.filter(respublika_viloyat=redlines.vil_id).values('aholi_punktining_nomi','pk')

				return JsonResponse({
								'redlines_json':redlines_json,
								'genplan_data':list(genplan_data),
								'redline_id': redlines.pk,
								'status': 0,
								 },safe=False)

		elif data.get('status')=='1':
			redlines= Redlines_edit.objects.get(id=data.get('redline_id'))
			redlines_json= serializers.serialize('geojson', [redlines,])
			genplan_data=Genplans.objects.filter(respublika_viloyat=redlines.vil_id).values('aholi_punktining_nomi','pk')

			return JsonResponse({
							'redlines_json':redlines_json,
							'genplan_data':list(genplan_data),
							'redline_id': redlines.pk,
							'status': 1,
							 },safe=False)


		elif data.get('status')=='2':

			redlines= Redlines_edit.objects.get(id=data.get('redline_id'))
			print(redlines)
			redlines_json= serializers.serialize('geojson', [redlines,])
			genplan_data=Genplans.objects.filter(respublika_viloyat=redlines.vil_id).values('aholi_punktining_nomi','pk')

			return JsonResponse({
							'redlines_json':redlines_json,
							'genplan_data':list(genplan_data),
							'redline_id': redlines.pk,
							'status': 2,
							 },safe=False)

	else:
		return HttpResponse('/edit_redline')


def create_redline(request):
	if request.method=='POST':
		data=request.POST

		genplan=Genplans.objects.get(pk=data.get('genplan_id'))

		redline = Redlines_edit.objects.create(
					nomi=genplan.aholi_punktining_nomi,
					genplan_id=genplan,
					vil_id=data.get('vil_id'),
					wkb_geometry=GEOSGeometry(data.get('geometry')),
					status=1
					)

		redline.id='redline_'+str(redline.pk)
		redline.save()

		return HttpResponse(1)
	else:
		return HttpResponse('/create_redline')




def copy_table_redline(redline_id):

	redline = Redlines.objects.filter(pk=redline_id).first()
	redline_edit = Redlines_edit.objects.create(
						nomi=redline.nomi,
						genplan_id=redline.genplan_id,
						vil_id=redline.vil_id,
						redline_id=redline,
						id=redline.id,
						wkb_geometry=redline.wkb_geometry,
						status=2
				)

	redline.status=2
	redline.save()
 	
	return redline_edit.pk 



def edit_redline(request):
	if request.method=='POST':
		data=request.POST
		genplan=Genplans.objects.get(pk=data.get('genplan_id'))

		if data.get('status')=='1':

			obj=Redlines_edit.objects.get(pk=int(data.get('redline_id')))

			obj.nomi=genplan.aholi_punktining_nomi
			obj.genplan_id=genplan
			obj.vil_id=data.get('vil_id')
			obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
				
			obj.save()

			return JsonResponse({'status':1,'redline_id':data.get('redline_id')})


		elif data.get('status')=='0' or data.get('status')=='2':


			if data.get('status')=='0':

				redline_0= Redlines.objects.get(pk=data.get('redline_id'))
				redline = Redlines_edit.objects.filter(redline_id=redline_0.pk).first()
				
				if not redline:
					redline_id=copy_table_redline(data.get('redline_id'))
				else:
					redline_id=redline.pk
			else:
				redline_id=data.get('redline_id')

			obj=Redlines_edit.objects.filter(pk=redline_id).first()
			obj.nomi=genplan.aholi_punktining_nomi
			obj.genplan_id=genplan
			obj.vil_id=data.get('vil_id')
			obj.wkb_geometry=GEOSGeometry(data.get('geometry'))

			obj.save()

			return JsonResponse({'status':2,'redline_id':redline_id})

	else:
		return HttpResponse('edit_redline')



def save_redline(request):
	if request.method=='POST':
		redline_id=request.POST.get('redline_id')
		redline_edit = Redlines_edit.objects.filter(id=redline_id).first()
		if request.POST.get('confirm')=='1':
			if redline_edit:
				redline = Redlines.objects.create(
					genplan_id = redline_edit.genplan_id,
					vil_id=redline_edit.vil_id,
					nomi=redline_edit.nomi,
					id=redline_edit.id,
					status = 0,
					wkb_geometry = redline_edit.wkb_geometry
				)

				redline_edit.delete()
				return HttpResponse(1)	
			else:
				return HttpResponse(0)
		else:
			if redline_edit:
				redline_edit.delete()
				return HttpResponse(2)
			else:
				return HttpResponse(3)
	else:
		return HttpResponse('/save_redline')


def redline_dialog_view(request):
	if request.method=='POST':
		try:
			if request.session['authenticate']:
				sessia={
				'service':request.session['service'],
				'status':request.session['status']
				}
			else:
				sessia={
				'service':'all',
				'status':-1
				}
		except KeyError:
			sessia={
				'service':'null',
				'status':-1
			}

		if request.POST.get('status')=='0' or request.POST.get('status')=='3':
			data=serializers.serialize('json',Genplans.objects.filter(pk=Redlines.objects.get(id=request.POST.get('id')).genplan_id_id))
			
			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
		
		elif request.POST.get('status')=='1' or request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				data=serializers.serialize('json',Genplans.objects.filter(pk=Redlines.objects.get(id=request.POST.get('id')).genplan_id_id))
			else:
				data=serializers.serialize('json',Genplans.objects.filter(pk=Redlines_edit.objects.get(id=request.POST.get('id')).genplan_id_id))
			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
	else:
		return HttpResponse('/redline_dialog_view')

