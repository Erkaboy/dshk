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
from proj.funk_genplan_models import FunkGenplans,FunkGenplans_edit,FunkZones

from proj.genplan_models import Genplans
from .models import Viloyat

from django.contrib.gis.geos import GEOSException

# FunkGenplans_edit.objects.all().delete()

# FunkGenplans.objects.all().delete()


def funk_gen_data(request):
	data=request.POST
	if data.get('type')=='funk_zones_po_genplan':
		if data.get('filter')=='-0':
			funk_gen= FunkGenplans.objects.filter(~Q(status = 4)).distinct('genplan_id')
			funk_gen_data= serializers.serialize('json',funk_gen,fields=[
					'genplan_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':funk_gen_data})


	elif data.get('type')=='funk_zones_po_genplan_edit':
		if data.get('filter_type')=='status':
			funk_gen= FunkGenplans_edit.objects.filter(status=data.get('filter')).distinct('genplan_id')
			funk_gen_data= serializers.serialize('json',funk_gen,fields=[
					'genplan_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':funk_gen_data})

		

def save_edit_funk_gen(request):
	if request.method=='POST':
		data=request.POST
		funk_gen_edit = FunkGenplans_edit.objects.filter(id=data.get('funk_gen_id')).first()
		funk_gen = FunkGenplans.objects.filter(pk=funk_gen_edit.funkgenplan_id.pk).first()
		if data.get('confirm')=='1':

			funk_gen.funk_zone=funk_gen_edit.funk_zone
			funk_gen.type=funk_gen_edit.type
			funk_gen.zonalarning_nomi=funk_gen_edit.zonalarning_nomi
			funk_gen.mavjud_imoratlarning_tavsifi_asosan=funk_gen_edit.mavjud_imoratlarning_tavsifi_asosan
			funk_gen.shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_gen_edit.shaharsozlik_faoliyatining_ruxsat_berilgan_turi
			funk_gen.shaharsozlik_faoliyatining_taqiqlangan_turi=funk_gen_edit.shaharsozlik_faoliyatining_taqiqlangan_turi
			funk_gen.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_gen_edit.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru
			funk_gen.funktsional_zonalarning_maydoni_ga=funk_gen_edit.funktsional_zonalarning_maydoni_ga

			funk_gen.genplan_id =funk_gen_edit.genplan_id
			funk_gen.vil_id=funk_gen_edit.vil_id			
			funk_gen.wkb_geometry=funk_gen_edit.wkb_geometry			
			funk_gen.status=0
			funk_gen.save()

			funk_gen_edit.delete()
			return HttpResponse(1)
		else:
			funk_gen_edit.delete()
			funk_gen.status=0
			funk_gen.save()

			return HttpResponse(0)
	else:
		return HttpResponse('save_edit_funk_gen')



def copy_table_funk_gen(funk_gen_id):

	funk_gen = FunkGenplans.objects.filter(pk=funk_gen_id).first()
	funk_gen_edit = FunkGenplans_edit.objects.create(
						genplan_id=funk_gen.genplan_id,
						vil_id=funk_gen.vil_id,
						funkgenplan_id=funk_gen,
						id=funk_gen.id,
						funk_zone=funk_gen.funk_zone,
						type=funk_gen.type,
						zonalarning_nomi=funk_gen.zonalarning_nomi,
						mavjud_imoratlarning_tavsifi_asosan=funk_gen.mavjud_imoratlarning_tavsifi_asosan,
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_gen.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
						shaharsozlik_faoliyatining_taqiqlangan_turi=funk_gen.shaharsozlik_faoliyatining_taqiqlangan_turi,
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_gen.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
						funktsional_zonalarning_maydoni_ga=funk_gen.funktsional_zonalarning_maydoni_ga,
						wkb_geometry=funk_gen.wkb_geometry,
						status=2
						)

	funk_gen.status=2
	funk_gen.save()

	
	return funk_gen_edit.pk 



def edit_funk_gen(request):
	if request.method=='POST':
		data=request.POST
		
		genplan=Genplans.objects.get(pk=data.get('genplan_id'))
		funk_zone_data=FunkZones.objects.filter(type=int(data.get('funk_zone_id'))).first()

		if data.get('status')=='1':

			obj=FunkGenplans_edit.objects.get(pk=int(data.get('funk_gen_id')))

			obj.genplan_id=genplan
			obj.funk_zone=funk_zone_data
			obj.type=funk_zone_data.type
			obj.vil_id=data.get('vil_id')
			obj.zonalarning_nomi=funk_zone_data.disUz
			obj.mavjud_imoratlarning_tavsifi_asosan=data.get('mut')
			obj.shaharsozlik_faoliyatining_ruxsat_berilgan_turi=data.get('shfret')
			obj.shaharsozlik_faoliyatining_taqiqlangan_turi=data.get('shftt')
			obj.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=data.get('shfmsharet')
			obj.funktsional_zonalarning_maydoni_ga=data.get('fzm')
			obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
				
			obj.save()

			return JsonResponse({'status':1,'funk_gen_id':data.get('funk_gen_id')})

		elif data.get('status')=='0' or data.get('status')=='2':
			
			if data.get('status')=='0':

				funk_gen_0= FunkGenplans.objects.get(pk=data.get('funk_gen_id'))
				funk_gen = FunkGenplans_edit.objects.filter(funkgenplan_id=funk_gen_0.pk).first()
				if not funk_gen:
					edit_funk_id=copy_table_funk_apot(data.get('funk_gen_id'))
				else:
					edit_funk_id=funk_gen.pk
			else:
				edit_funk_id=data.get('funk_gen_id')	

			obj=FunkGenplans_edit.objects.filter(pk=edit_funk_id).first()

			obj.genplan_id=genplan 
			obj.funk_zone=funk_zone_data
			obj.type=funk_zone_data.type
			obj.vil_id=data.get('vil_id')
			obj.zonalarning_nomi=funk_zone_data.disUz
			obj.mavjud_imoratlarning_tavsifi_asosan=data.get('mut')
			obj.shaharsozlik_faoliyatining_ruxsat_berilgan_turi=data.get('shfret')
			obj.shaharsozlik_faoliyatining_taqiqlangan_turi=data.get('shftt')
			obj.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=data.get('shfmsharet')
			obj.funktsional_zonalarning_maydoni_ga=data.get('fzm')
			obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
					
			obj.save()
		
			return JsonResponse({'status':2,'funk_gen_id':edit_funk_id})
	else:
		return HttpResponse('edit_funk_gen')

 

 
def edit_funk_gen_data(request):
	if request.method=='POST':
		data=request.POST
		if data.get('status')=='0':

			funk_gen_edit= FunkGenplans_edit.objects.filter(id=data.get('funk_gen_id')).first()
			
			if funk_gen_edit:

				funk_gen_json= serializers.serialize('geojson', [funk_gen_edit,])
				genplan_data=Genplans.objects.filter(respublika_viloyat=funk_gen_edit.vil_id).values('aholi_punktining_nomi','pk')

				return JsonResponse({
								'funk_gen_json':funk_gen_json,
								'genplan_data':list(genplan_data),
								'funk_gen_id': funk_gen_edit.pk,
								'status': 2,
								 },safe=False)

			else:

				funk_gen=  FunkGenplans.objects.get(id=data.get('funk_gen_id'))
				funk_gen_json= serializers.serialize('geojson', [funk_gen,])
				genplan_data=Genplans.objects.filter(respublika_viloyat=funk_gen.vil_id).values('aholi_punktining_nomi','pk')

				return JsonResponse({
								'funk_gen_json':funk_gen_json,
								'genplan_data':list(genplan_data),
								'funk_gen_id': funk_gen.pk,
								'status': 0,
								 },safe=False) 

		elif data.get('status')=='1':
			funk_gen= FunkGenplans_edit.objects.get(id=data.get('funk_gen_id'))
			funk_gen_json= serializers.serialize('geojson', [funk_gen,])
			genplan_data=Genplans.objects.filter(respublika_viloyat=funk_gen.vil_id).values('aholi_punktining_nomi','pk')

			return JsonResponse({
							'funk_gen_json':funk_gen_json,
							'genplan_data':list(genplan_data),
							'funk_gen_id': funk_gen.pk,
							'status': 1,
							 },safe=False)


		elif data.get('status')=='2':

			funk_gen= FunkGenplans_edit.objects.get(id=data.get('funk_gen_id'))
			funk_gen_json= serializers.serialize('geojson', [funk_gen,])
			genplan_data=Genplans.objects.filter(respublika_viloyat=funk_gen.vil_id).values('aholi_punktining_nomi','pk')

			return JsonResponse({
							'funk_gen_json':funk_gen_json,
							'genplan_data':list(genplan_data),
							'funk_gen_id': funk_gen.pk,
							'status': 2,
							 },safe=False)

	else:
		return HttpResponse('/edit_funk_gen_data')
 

 
def delete_funk_gen(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='last_delete':

			funk_gen = FunkGenplans.objects.filter(id=data.get('funk_gen_id')).first()

			if data.get('dtype')=='one':

				funk_gen_edit = FunkGenplans_edit.objects.filter(funkgenplan_id=funk_gen.pk,status=3).first()

				if not funk_gen_edit:
					funk_gen_edit_1 = FunkGenplans_edit.objects.create(
						genplan_id = funk_gen.genplan_id,
						funkgenplan_id=funk_gen,
						vil_id=funk_gen.vil_id,
						funk_zone=funk_gen.funk_zone,
						zonalarning_nomi=funk_gen.zonalarning_nomi,
						funktsional_zonalarning_maydoni_ga=funk_gen.funktsional_zonalarning_maydoni_ga,
						mavjud_imoratlarning_tavsifi_asosan=funk_gen.mavjud_imoratlarning_tavsifi_asosan,
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_gen.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
						shaharsozlik_faoliyatining_taqiqlangan_turi=funk_gen.shaharsozlik_faoliyatining_taqiqlangan_turi,
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_gen.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
						type=funk_gen.type,
						id=funk_gen.id,
						status = 3,
						wkb_geometry = funk_gen.wkb_geometry
					)

					funk_gen.status=3
					funk_gen.save()

					return HttpResponse(0)
			else:
				for item in FunkGenplans.objects.filter(genplan_id=funk_gen.genplan_id.pk):
					funk_gen_edit = FunkGenplans_edit.objects.filter(funkgenplan_id=item.pk,status=3).first()
					if not funk_gen_edit:
						funk_gen_edit_1 = FunkGenplans_edit.objects.create(
							genplan_id = item.genplan_id,
							funkgenplan_id=item,
							vil_id=item.vil_id,
							funk_zone=item.funk_zone,
							zonalarning_nomi=item.zonalarning_nomi,
							funktsional_zonalarning_maydoni_ga=item.funktsional_zonalarning_maydoni_ga,
							mavjud_imoratlarning_tavsifi_asosan=item.mavjud_imoratlarning_tavsifi_asosan,
							shaharsozlik_faoliyatining_ruxsat_berilgan_turi=item.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
							shaharsozlik_faoliyatining_taqiqlangan_turi=item.shaharsozlik_faoliyatining_taqiqlangan_turi,
							shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=item.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
							type=item.type,
							id=item.id,
							status = 3,
							wkb_geometry = item.wkb_geometry
					)

					item.status=3
					item.save()

				return HttpResponse(0)


		elif data.get('type')=='admin_delete':

			if data.get('confirm')=='1':
				funk_gen = FunkGenplans.objects.filter(id=data.get('funk_gen_id'),status=4).first()
				if data.get('dtype')=='one':
					if not funk_gen:
						funk_gen = FunkGenplans.objects.filter(id=data.get('funk_gen_id')).first()
						funk_gen.status=4
						funk_gen.save()

						FunkGenplans_edit.objects.filter(funkgenplan_id=funk_gen.pk).delete()
						
						return HttpResponse(1)
					else:
						return HttpResponse(0)
				else:
					if not funk_gen:
						funk_gen = FunkGenplans.objects.filter(id=data.get('funk_gen_id')).first()
						for item in FunkGenplans.objects.filter(genplan_id=funk_gen.genplan_id.pk, status=3):
							item.status=4
							item.save()

							FunkGenplans_edit.objects.filter(funkgenplan_id=item.pk).delete()

						return HttpResponse(1)

					else:
						return HttpResponse(3)

			else:
				funk_gen = FunkGenplans.objects.filter(id=data.get('funk_gen_id')).first()
				if data.get('dtype')=='one':
					funk_gen_edit = FunkGenplans_edit.objects.filter(funkgenplan_id=funk_gen.pk,status=3).first()
					if funk_gen_edit:					
						funk_gen.status=0
						funk_gen.save()
						funk_gen_edit.delete()
						return HttpResponse(2)
					else:
						return HttpResponse(3)
				else:
					for item in FunkGenplans.objects.filter(genplan_id=funk_gen.genplan_id.pk):
						item.status=0
						item.save()

					FunkGenplans_edit.objects.filter(genplan_id=funk_gen.genplan_id.pk).delete()
	
					return HttpResponse(2)
	else:
		return HttpResponse('/delete_funk_gen')	



def funk_genplan_dialog_view(request):
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
			data=serializers.serialize('json',FunkGenplans.objects.filter(id=request.POST.get('id')))

			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
		
		elif request.POST.get('status')=='1' or request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				data=serializers.serialize('json',FunkGenplans.objects.filter(id=request.POST.get('id')))
			else:
				data=serializers.serialize('json',FunkGenplans_edit.objects.filter(id=request.POST.get('id')))
			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
	else:
		return HttpResponse('/funk_genplan_dialog_view')



 
def save_funk_gen(request):
	if request.method=='POST':
		funk_gen_id=request.POST.get('funk_gen_id')
		funk_gen_edit = FunkGenplans_edit.objects.filter(id=funk_gen_id).first()
		if request.POST.get('confirm')=='1':
			if request.POST.get('type')=='one':
				if funk_gen_edit:
					funk_gen = FunkGenplans.objects.create(
						genplan_id = funk_gen_edit.genplan_id,
						vil_id=funk_gen_edit.vil_id,
						funk_zone=funk_gen_edit.funk_zone,
						zonalarning_nomi=funk_gen_edit.zonalarning_nomi,
						funktsional_zonalarning_maydoni_ga=funk_gen_edit.funktsional_zonalarning_maydoni_ga,
						mavjud_imoratlarning_tavsifi_asosan=funk_gen_edit.mavjud_imoratlarning_tavsifi_asosan,
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_gen_edit.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
						shaharsozlik_faoliyatining_taqiqlangan_turi=funk_gen_edit.shaharsozlik_faoliyatining_taqiqlangan_turi,
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_gen_edit.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
						type=funk_gen_edit.type,
						id=funk_gen_edit.id,
						status = 0,
						wkb_geometry = funk_gen_edit.wkb_geometry
					)


					funk_gen_edit.delete()
					return HttpResponse(1)	
				else:
					return HttpResponse(0)
			else:
				if funk_gen_edit:
					for item in FunkGenplans_edit.objects.filter(genplan_id=funk_gen_edit.genplan_id.pk):
						if item:
							funk_gen = FunkGenplans.objects.create(
								genplan_id = item.genplan_id,
								vil_id=item.vil_id,
								funk_zone=item.funk_zone,
								zonalarning_nomi=item.zonalarning_nomi,
								funktsional_zonalarning_maydoni_ga=item.funktsional_zonalarning_maydoni_ga,
								mavjud_imoratlarning_tavsifi_asosan=item.mavjud_imoratlarning_tavsifi_asosan,
								shaharsozlik_faoliyatining_ruxsat_berilgan_turi=item.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
								shaharsozlik_faoliyatining_taqiqlangan_turi=item.shaharsozlik_faoliyatining_taqiqlangan_turi,
								shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=item.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
								type=item.type,
								id=item.id,
								status = 0,
								wkb_geometry = item.wkb_geometry
							)
							item.delete()

					
					return HttpResponse(1)	
				else:
					return HttpResponse(0)
		else:
			if request.POST.get('type')=='one':
				if funk_gen_edit:
					funk_gen_edit.delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)
			else:
				if funk_gen_edit:
					FunkGenplans_edit.objects.filter(genplan_id=funk_gen_edit.genplan_id.pk).delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)
	else:
		return HttpResponse('/save_funk_gen')



def create_funk_gen(request):
	if request.method=='POST':
		data=request.POST	
		genplan=Genplans.objects.get(pk=int(data.get('genplan_id')))

		if data.get('type')=='one':

			funk_zone_data=FunkZones.objects.filter(type=int(data.get('funk_zone_id'))).first()
			funk_zone = FunkGenplans_edit.objects.create(
						genplan_id=genplan,
						funk_zone=funk_zone_data,
						type=funk_zone_data.type,
						vil_id=data.get('vil_id'),
						zonalarning_nomi=funk_zone_data.disUz,
						mavjud_imoratlarning_tavsifi_asosan=data.get('mut'),
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=data.get('shfret'),
						shaharsozlik_faoliyatining_taqiqlangan_turi=data.get('shftt'),
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=data.get('shfmsharet'),
						funktsional_zonalarning_maydoni_ga=data.get('fzm'),
						wkb_geometry=GEOSGeometry(data.get('geometry')),
						status=1
						)

			funk_zone.id='fzg_'+str(funk_zone.pk)
			funk_zone.save()

			return HttpResponse(1)
		else:

			layers=json.loads(data.get('layers'))
			for i in layers['features']:

				funk_zone_data=FunkZones.objects.filter(type=int(i['properties']['Type'])).first()

				try:
					funk_zone = FunkGenplans_edit.objects.create(
							genplan_id=genplan,
							funk_zone=funk_zone_data,
							vil_id=data.get('vil_id'),
							type=funk_zone_data.type,
							zonalarning_nomi=funk_zone_data.disUz,
							mavjud_imoratlarning_tavsifi_asosan=i['properties']['Mavjud_imoratlarning_tavsifi_asosan'],
							shaharsozlik_faoliyatining_ruxsat_berilgan_turi=i['properties']['Shaharsozlik_faoliyatining_ruxsat_berilgan_turi'],
							shaharsozlik_faoliyatining_taqiqlangan_turi=i['properties']['Shaharsozlik_faoliyatining_taqiqlangan_turi'],
							shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=i['properties']['Shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_rux'],
							funktsional_zonalarning_maydoni_ga=i['properties']['Funktsional_zonalarning_maydoni_ga'],
							wkb_geometry=GEOSGeometry(str(i['geometry'])),
							status=1
							)

					funk_zone.id='fzg_'+str(funk_zone.pk)
					funk_zone.save()
				except (GEOSException, ValueError, TypeError):
					continue

			return HttpResponse(1)
	else:
		return HttpResponse('/create_funk_gen') 
