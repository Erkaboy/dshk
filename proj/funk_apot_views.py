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
from proj.funk_apot_models import FunkApots,FunkApots_edit
from proj.funk_genplan_models import FunkZones

from proj.apot_models import Apots

from django.contrib.gis.geos import GEOSException

 

def funk_apot_data(request):
	data=request.POST
	if data.get('type')=='funk_zones_po_apot':
		if data.get('filter')=='-0':
			funk_apot= FunkApots.objects.filter(~Q(status = 4)).distinct('apot_id')
			funk_apot_data= serializers.serialize('json',funk_apot,fields=[
					'apot_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':funk_apot_data})

	elif data.get('type')=='funk_zones_po_apot_edit':
		if data.get('filter_type')=='status':
			funk_apot= FunkApots_edit.objects.filter(status=data.get('filter')).distinct('apot_id')
			funk_apot_data= serializers.serialize('json',funk_apot,fields=[
					'apot_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':funk_apot_data})



def save_edit_funk_apot(request):
	if request.method=='POST':
		data=request.POST
		funk_apot_edit = FunkApots_edit.objects.filter(id=data.get('funk_apot_id')).first()
		funk_apot = FunkApots.objects.filter(pk=funk_apot_edit.funkapot_id.pk).first()
		if data.get('confirm')=='1':

			funk_apot.funk_zone=funk_apot_edit.funk_zone
			funk_apot.type=funk_apot_edit.type
			funk_apot.zonalarning_nomi=funk_apot_edit.zonalarning_nomi
			funk_apot.mavjud_imoratlarning_tavsifi_asosan=funk_apot_edit.mavjud_imoratlarning_tavsifi_asosan
			funk_apot.shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_apot_edit.shaharsozlik_faoliyatining_ruxsat_berilgan_turi
			funk_apot.shaharsozlik_faoliyatining_taqiqlangan_turi=funk_apot_edit.shaharsozlik_faoliyatining_taqiqlangan_turi
			funk_apot.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_apot_edit.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru
			funk_apot.funktsional_zonalarning_maydoni_ga=funk_apot_edit.funktsional_zonalarning_maydoni_ga

			funk_apot.apot_id =funk_apot_edit.apot_id
			funk_apot.vil_id=funk_apot_edit.vil_id			
			funk_apot.wkb_geometry=funk_apot_edit.wkb_geometry			
			funk_apot.status=0
			funk_apot.save()

			funk_apot_edit.delete()
			return HttpResponse(1)
		else:
			funk_apot_edit.delete()
			funk_apot.status=0
			funk_apot.save()

			return HttpResponse(0)
	else:
		return HttpResponse('save_edit_funk_apot')




def delete_funk_apot(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='last_delete':

			funk_apot = FunkApots.objects.filter(id=data.get('funk_apot_id')).first()

			if data.get('dtype')=='one':

				funk_apot_edit = FunkApots_edit.objects.filter(funkapot_id=funk_apot.pk,status=3).first()

				if not funk_apot_edit:
					funk_apot_edit_1 = FunkApots_edit.objects.create(
						apot_id = funk_apot.apot_id,
						funkapot_id=funk_apot,
						vil_id=funk_apot.vil_id,
						funk_zone=funk_apot.funk_zone,
						zonalarning_nomi=funk_apot.zonalarning_nomi,
						funktsional_zonalarning_maydoni_ga=funk_apot.funktsional_zonalarning_maydoni_ga,
						mavjud_imoratlarning_tavsifi_asosan=funk_apot.mavjud_imoratlarning_tavsifi_asosan,
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_apot.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
						shaharsozlik_faoliyatining_taqiqlangan_turi=funk_apot.shaharsozlik_faoliyatining_taqiqlangan_turi,
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_apot.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
						type=funk_apot.type,
						id=funk_apot.id,
						status = 3,
						wkb_geometry = funk_apot.wkb_geometry
					)
					
					funk_apot.status=3
					funk_apot.save()

					return HttpResponse(0)
			else:
				for item in FunkApots.objects.filter(apot_id=funk_apot.apot_id.pk):
					funk_apot_edit = FunkApots_edit.objects.filter(funkapot_id=item.pk,status=3).first()
					if not funk_apot_edit:
						funk_apot_edit_1 = FunkApots_edit.objects.create(
							apot_id = item.apot_id,
							funkapot_id=item,
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
				funk_apot = FunkApots.objects.filter(id=data.get('funk_apot_id'),status=4).first()
				if data.get('dtype')=='one':
					if not funk_apot:
						funk_apot = FunkApots.objects.filter(id=data.get('funk_apot_id')).first()
						funk_apot.status=4
						funk_apot.save()

						FunkApots_edit.objects.filter(funkapot_id=funk_apot.pk).delete()
						
						return HttpResponse(1)
					else:
						return HttpResponse(0)
				else:
					if not funk_apot:
						funk_apot = FunkApots.objects.filter(id=data.get('funk_apot_id')).first()
						for item in FunkApots.objects.filter(apot_id=funk_apot.apot_id.pk, status=3):
							item.status=4
							item.save()

							FunkApots_edit.objects.filter(funkapot_id=item.pk).delete()

						return HttpResponse(1)

					else:
						return HttpResponse(3)

			else:
				funk_apot = FunkApots.objects.filter(id=data.get('funk_apot_id')).first()
				if data.get('dtype')=='one':
					funk_apot_edit = FunkApots_edit.objects.filter(funkapot_id=funk_apot.pk,status=3).first()
					if funk_apot_edit:					
						funk_apot.status=0
						funk_apot.save()
						funk_apot_edit.delete()
						return HttpResponse(2)
					else:
						return HttpResponse(3)
				else:
					for item in FunkApots.objects.filter(apot_id=funk_apot.apot_id.pk):
						item.status=0
						item.save()

					FunkApots_edit.objects.filter(apot_id=funk_apot.apot_id.pk).delete()
	
					return HttpResponse(2)
	else:
		return HttpResponse('/delete_funk_apot')	



 
def save_funk_apot(request):
	if request.method=='POST':
		funk_apot_id=request.POST.get('funk_apot_id')
		funk_apot_edit = FunkApots_edit.objects.filter(id=funk_apot_id).first()
		if request.POST.get('confirm')=='1':
			if request.POST.get('type')=='one':
				if funk_apot_edit:
					funk_apot = FunkApots.objects.create(
						apot_id = funk_apot_edit.apot_id,
						vil_id=funk_apot_edit.vil_id,
						funk_zone=funk_apot_edit.funk_zone,
						zonalarning_nomi=funk_apot_edit.zonalarning_nomi,
						funktsional_zonalarning_maydoni_ga=funk_apot_edit.funktsional_zonalarning_maydoni_ga,
						mavjud_imoratlarning_tavsifi_asosan=funk_apot_edit.mavjud_imoratlarning_tavsifi_asosan,
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_apot_edit.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
						shaharsozlik_faoliyatining_taqiqlangan_turi=funk_apot_edit.shaharsozlik_faoliyatining_taqiqlangan_turi,
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_apot_edit.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
						type=funk_apot_edit.type,
						id=funk_apot_edit.id,
						status = 0,
						wkb_geometry = funk_apot_edit.wkb_geometry
					)


					funk_apot_edit.delete()
					return HttpResponse(1)	
				else:
					return HttpResponse(0)
			else:
				if funk_apot_edit:
					for item in FunkApots_edit.objects.filter(apot_id=funk_apot_edit.apot_id.pk):
						if item:
							funk_apot = FunkApots.objects.create(
								apot_id = item.apot_id,
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
				if funk_apot_edit:
					funk_apot_edit.delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)
			else:
				if funk_apot_edit:
					FunkApots_edit.objects.filter(apot_id=funk_apot_edit.apot_id.pk).delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)
	else:
		return HttpResponse('/save_funk_apot')



def copy_table_funk_apot(funk_apot_id):

	funk_apot = FunkApots.objects.filter(pk=funk_apot_id).first()
	funk_apot_edit = FunkApots_edit.objects.create(
						apot_id=funk_apot.apot_id,
						vil_id=funk_apot.vil_id,
						funkapot_id=funk_apot,
						id=funk_apot.id,
						funk_zone=funk_apot.funk_zone,
						type=funk_apot.type,
						zonalarning_nomi=funk_apot.zonalarning_nomi,
						mavjud_imoratlarning_tavsifi_asosan=funk_apot.mavjud_imoratlarning_tavsifi_asosan,
						shaharsozlik_faoliyatining_ruxsat_berilgan_turi=funk_apot.shaharsozlik_faoliyatining_ruxsat_berilgan_turi,
						shaharsozlik_faoliyatining_taqiqlangan_turi=funk_apot.shaharsozlik_faoliyatining_taqiqlangan_turi,
						shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru=funk_apot.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru,
						funktsional_zonalarning_maydoni_ga=funk_apot.funktsional_zonalarning_maydoni_ga,
						wkb_geometry=funk_apot.wkb_geometry,
						status=2
						)

	funk_apot.status=2
	funk_apot.save()

	
	return funk_apot_edit.pk 




def edit_funk_apot(request):
	if request.method=='POST':
		data=request.POST
		
		apot=Apots.objects.get(pk=data.get('apot_id'))
		funk_zone_data=FunkZones.objects.filter(type=int(data.get('funk_zone_id'))).first()

		if data.get('status')=='1':

			obj=FunkApots_edit.objects.get(pk=int(data.get('funk_apot_id')))

			obj.apot_id=apot 
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
 
			return JsonResponse({'status':1,'funk_apot_id':data.get('funk_apot_id')})

 
		elif data.get('status')=='0' or data.get('status')=='2':

			if data.get('status')=='0':

				funk_apot_0= FunkApots.objects.get(pk=data.get('funk_apot_id'))
				funk_apot = FunkApots_edit.objects.filter(funkapot_id=funk_apot_0.pk).first()
				if not funk_apot:
					edit_funk_id=copy_table_funk_apot(data.get('funk_apot_id'))
				else:
					edit_funk_id=funk_apot.pk
			else:
				edit_funk_id=data.get('funk_apot_id')	

			obj=FunkApots_edit.objects.filter(pk=edit_funk_id).first()

			obj.apot_id=apot 
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

		
			return JsonResponse({'status':2,'funk_apot_id':edit_funk_id})
			
	else:
		return HttpResponse('edit_funk_apot')



 
def edit_funk_apot_data(request):
	if request.method=='POST':
		data=request.POST
		if data.get('status')=='0':

			funk_apot_edit= FunkApots_edit.objects.filter(id=data.get('funk_apot_id')).first()
			
			if funk_apot_edit:

				funk_apot_json= serializers.serialize('geojson', [funk_apot_edit,])
				apot_link=Apots.objects.get(pk=funk_apot_edit.apot_id.pk)			
				tuman_data=Apots.objects.filter(respublika_viloyat=funk_apot_edit.vil_id).distinct('tuman_shahar').values('tuman_shahar')
				apot_data=Apots.objects.filter(respublika_viloyat=funk_apot_edit.vil_id,tuman_shahar=apot_link.tuman_shahar).values('fuqarolar_yiginlari','pk')

				return JsonResponse({
								'funk_apot_json':funk_apot_json,
								'apot_data':list(apot_data),
								'tuman_data':list(tuman_data),
								'tuman_name':apot_link.tuman_shahar,
								'funk_apot_id': funk_apot_edit.pk,
								'status': 2,
								 },safe=False)

			else:

				funk_apot= FunkApots.objects.get(id=data.get('funk_apot_id'))
				funk_apot_json= serializers.serialize('geojson', [funk_apot,])
				apot_link=Apots.objects.get(pk=funk_apot.apot_id.pk)			
				tuman_data=Apots.objects.filter(respublika_viloyat=funk_apot.vil_id).distinct('tuman_shahar').values('tuman_shahar')
				apot_data=Apots.objects.filter(respublika_viloyat=funk_apot.vil_id,tuman_shahar=apot_link.tuman_shahar).values('fuqarolar_yiginlari','pk')

				return JsonResponse({
								'funk_apot_json':funk_apot_json,
								'apot_data':list(apot_data),
								'tuman_data':list(tuman_data),
								'tuman_name':apot_link.tuman_shahar,
								'funk_apot_id': funk_apot.pk,
								'status': 0,
								 },safe=False) 

		elif data.get('status')=='1':
			funk_apot= FunkApots_edit.objects.get(id=data.get('funk_apot_id'))
			funk_apot_json= serializers.serialize('geojson', [funk_apot,])
			apot_link=Apots.objects.get(pk=funk_apot.apot_id.pk)			
			tuman_data=Apots.objects.filter(respublika_viloyat=funk_apot.vil_id).distinct('tuman_shahar').values('tuman_shahar')
			apot_data=Apots.objects.filter(respublika_viloyat=funk_apot.vil_id,tuman_shahar=apot_link.tuman_shahar).values('fuqarolar_yiginlari','pk')

			return JsonResponse({
							'funk_apot_json':funk_apot_json,
							'tuman_data':list(tuman_data),
							'tuman_name':apot_link.tuman_shahar,
							'apot_data':list(apot_data),
							'funk_apot_id': funk_apot.pk,
							'status': 1,
							 },safe=False)

		elif data.get('status')=='2':

			funk_apot= FunkApots_edit.objects.get(id=data.get('funk_apot_id'))
			funk_apot_json= serializers.serialize('geojson', [funk_apot,])
			apot_link=Apots.objects.get(pk=funk_apot.apot_id.pk)			
			tuman_data=Apots.objects.filter(respublika_viloyat=funk_apot.vil_id).distinct('tuman_shahar').values('tuman_shahar')
			apot_data=Apots.objects.filter(respublika_viloyat=funk_apot.vil_id,tuman_shahar=apot_link.tuman_shahar).values('fuqarolar_yiginlari','pk')

			return JsonResponse({
							'funk_apot_json':funk_apot_json,
							'tuman_data':list(tuman_data),
							'tuman_name':apot_link.tuman_shahar,
							'apot_data':list(apot_data),
							'funk_apot_id': funk_apot.pk,
							'status': 2,
							 },safe=False)

	else:
		return HttpResponse('/edit_funk_apot_data')


def create_funk_apot(request):
	if request.method=='POST':
		data=request.POST	
		apot=Apots.objects.get(pk=int(data.get('apot_id')))


		if data.get('type')=='one':

			funk_zone_data=FunkZones.objects.filter(type=int(data.get('funk_zone_id'))).first()
			funk_zone = FunkApots_edit.objects.create(
						apot_id=apot,
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
					funk_zone = FunkApots_edit.objects.create(
							apot_id=apot,
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
		return HttpResponse('/create_funk_apot')


def funk_apot_tuman_data(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='tuman':
			tuman_data=Apots.objects.filter(respublika_viloyat=data.get('vil_id')).distinct('tuman_shahar').order_by('tuman_shahar').values('tuman_shahar','pk')
			return JsonResponse({'tuman_data':list(tuman_data)},safe=False)
		else:
			apot_data=Apots.objects.filter(Q(respublika_viloyat=data.get('vil_id')),Q(tuman_shahar=data.get('tuman_name')),~Q(status = 4),~Q(tasdiqlanganligi=2),~Q(tasdiqlanganligi=3)).order_by('fuqarolar_yiginlari').values('fuqarolar_yiginlari','pk')
			return JsonResponse({'apot_data':list(apot_data)},safe=False)
	else:
		return HttpResponse('funk_apot_tuman_data')


 
def funk_apot_dialog_view(request):
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
			data=serializers.serialize('json',FunkApots.objects.filter(id=request.POST.get('id')))

			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
		
		elif request.POST.get('status')=='1' or request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				data=serializers.serialize('json',FunkApots.objects.filter(id=request.POST.get('id')))
			else:
				data=serializers.serialize('json',FunkApots_edit.objects.filter(id=request.POST.get('id')))
			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
	else:
		return HttpResponse('/funk_apot_dialog_view')
