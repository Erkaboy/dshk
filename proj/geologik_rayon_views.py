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
from proj.geologik_rayon_models import GeologRayon_data,GeologRayon_data_edit,GeologRayon,GeologRayon_edit

from django.contrib.gis.geos import GEOSException

# GeologRayon_data.objects.all().delete()
# GeologRayon.objects.all().delete()
# GeologRayon_data_edit.objects.all().delete()
# GeologRayon_edit.objects.all().delete()

# for i in GeologRayon_edit.objects.all():
# 	print(i.geolograyon_data_id)

def geologik_rayonlash_data(request):
	data=request.POST
	if data.get('type')=='geologik_rayonlash':
		if data.get('filter')=='-0':
			geo_ray= GeologRayon.objects.filter(~Q(status = 4)).distinct('geolograyon_data_id')
			geo_ray_data= serializers.serialize('json',geo_ray,fields=[
					'geolograyon_data_id',
					'id',
					'status' 
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':geo_ray_data})


		else:
			if data.get('filter_type')=='vil':
				geo_ray= GeologRayon.objects.filter(~Q(status = 4),Q(vil_id=data.get('filter'))).distinct('geolograyon_data_id')
				geo_ray_data= serializers.serialize('json',geo_ray,fields=[
					'geolograyon_data_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
				return JsonResponse({'data':geo_ray_data})

	elif data.get('type')=='geologik_rayonlash_edit':
		if data.get('filter_type')=='status':
			if data.get('filter')=='1':
				geo_ray= GeologRayon_edit.objects.filter(status=data.get('filter')).distinct('geolograyon_data_id','geolograyon_data_edit_id')
			else:
				geo_ray= GeologRayon_edit.objects.filter(status=data.get('filter')).distinct('geolograyon_data_id')

			geo_ray_data= serializers.serialize('json',geo_ray,fields=[
					'geolograyon_data_id',
					'geolograyon_data_edit_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':geo_ray_data})

		elif data.get('filter_type')=='vil':
			geo_ray= GeologRayon_edit.objects.filter(vil_id=data.get('filter')).distinct('geolograyon_data_id','geolograyon_data_edit_id')
			geo_ray_data= serializers.serialize('json',geo_ray,fields=[
					'geolograyon_data_id',
					'geolograyon_data_edit_id',
					'id',
					'status'
					],use_natural_foreign_keys=True)
			return JsonResponse({'data':geo_ray_data})


def delete_geo_ray(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='first_delete':

			geo_ray=GeologRayon.objects.filter(id=data.get('geo_ray_id')).first()
			geo_ray_edit=GeologRayon_edit.objects.filter(geolograyon_id=geo_ray.pk).first()

			if data.get('dtype')=='data':
				geo_ray_data=GeologRayon_data.objects.filter(pk=geo_ray.geolograyon_data_id.pk).first()
				geo_ray_data.status=3
				geo_ray_data.save()

			if not geo_ray_edit:
				geo_ray_edit_id=copy_table_geo_ray(geo_ray.pk)
			else:
				geo_ray_edit_id=geo_ray_edit.pk

			geo_ray_edit=GeologRayon_edit.objects.get(pk=geo_ray_edit_id)
			geo_ray_edit.status=3
			geo_ray_edit.save();

			geo_ray.status=3
			geo_ray.save()				

			return HttpResponse(0)

		elif data.get('type')=='admin_delete':

			if data.get('confirm')=='1':

				geo_ray = GeologRayon.objects.filter(id=data.get('geo_ray_id'),status=4).first()
				if data.get('dtype')=='one':
					if not geo_ray:
						geo_ray = GeologRayon.objects.filter(id=data.get('geo_ray_id')).first()
						geo_ray.status=4
						geo_ray.save()

						GeologRayon_edit.objects.filter(geolograyon_id=geo_ray.pk).delete()
						
						return HttpResponse(1)
					else:
						return HttpResponse(0)
				else:
					if not geo_ray:
						geo_ray = GeologRayon.objects.filter(id=data.get('geo_ray_id')).first()
						geo_ray_data=GeologRayon_data.objects.filter(pk=geo_ray.geolograyon_data_id.pk).first()
						for item in GeologRayon.objects.filter(geolograyon_data_id=geo_ray.geolograyon_data_id.pk):
							item.status=4
							item.save()
							GeologRayon_edit.objects.filter(geolograyon_id=item.pk).delete()

						geo_ray_data.status=4
						geo_ray_data.save()

						return HttpResponse(1)

					else:
						return HttpResponse(3)

			else:
				geo_ray = GeologRayon.objects.filter(id=data.get('geo_ray_id')).first()
				if data.get('dtype')=='one':
					geo_ray_edit = GeologRayon_edit.objects.filter(geolograyon_id=geo_ray.pk,status=3).first()
					if geo_ray_edit:					
						geo_ray.status=0
						geo_ray.save()
						geo_ray_edit.delete()
						return HttpResponse(2)
					else:
						return HttpResponse(3)
				else:
					geo_ray_data=GeologRayon_data.objects.filter(pk=geo_ray.geolograyon_data_id.pk).first()
					geo_ray_data.status=0
					geo_ray_data.save()
					
					return HttpResponse(2)
	else:
		return HttpResponse('/delete_geo_ray')	





def save_edit_geo_ray(request):
	if request.method=='POST': 
		data=request.POST
		geo_ray_edit = GeologRayon_edit.objects.filter(id=data.get('geo_ray_id')).first()
		geo_ray = GeologRayon.objects.filter(pk=geo_ray_edit.geolograyon_id.pk).first()

		if data.get('confirm')=='1':

			geo_ray.geolograyon_data_id=geo_ray_edit.geolograyon_data_id
			geo_ray.vil_id=geo_ray_edit.vil_id
			geo_ray.injenerlik_geologik_viloyat_indeksi=geo_ray_edit.injenerlik_geologik_viloyat_indeksi
			geo_ray.injenerlik_geologik_viloyat_tavsifi=geo_ray_edit.injenerlik_geologik_viloyat_tavsifi
			geo_ray.injenerlik_geologik_hududlar_indeksi=geo_ray_edit.injenerlik_geologik_hududlar_indeksi
			geo_ray.injenerlik_geologik_hududlar_tavsifi=geo_ray_edit.injenerlik_geologik_hududlar_tavsifi
			geo_ray.injenerlik_geologik_kichik_hududlar_indeksi=geo_ray_edit.injenerlik_geologik_kichik_hududlar_indeksi
			geo_ray.injenerlik_geologik_kichik_hududlar_tavsifi=geo_ray_edit.injenerlik_geologik_kichik_hududlar_tavsifi
			geo_ray.injenerlik_geologik_uchastkalar_indeksi=geo_ray_edit.injenerlik_geologik_uchastkalar_indeksi
			geo_ray.injenerlik_geologik_uchastkalar_tavsifi=geo_ray_edit.injenerlik_geologik_uchastkalar_tavsifi
			geo_ray.hududlarning_geologik_genetik_tavsifi=geo_ray_edit.hududlarning_geologik_genetik_tavsifi
			geo_ray.hududdagi_geodinamik_jarayonlar=geo_ray_edit.hududdagi_geodinamik_jarayonlar
			geo_ray.tavsiya_etiladigan_injenerlik_tadbirlari=geo_ray_edit.tavsiya_etiladigan_injenerlik_tadbirlari
			geo_ray.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=geo_ray_edit.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi
			geo_ray.kod=geo_ray_edit.kod
			geo_ray.wkb_geometry=geo_ray_edit.wkb_geometry
			geo_ray.status=0
			geo_ray.save()

			geo_ray_edit.delete()

			return HttpResponse(1)
		else:
			geo_ray_edit.delete()
			geo_ray.status=0
			geo_ray.save()

			return HttpResponse(0)
	else:
		return HttpResponse('save_edit_geo_ray')

def save_edit_geo_ray_data(request):
	if request.method=='POST': 
		data=request.POST
		geo_ray_edit = GeologRayon_edit.objects.filter(id=data.get('geo_ray_id')).first()
		geo_ray = GeologRayon.objects.filter(pk=geo_ray_edit.geolograyon_id.pk).first()

		geo_ray_data_edit=GeologRayon_data_edit.objects.filter(pk=geo_ray_edit.geolograyon_data_edit_id.pk).first()
		geo_ray_data=GeologRayon_data.objects.filter(pk=geo_ray_data_edit.geolograyon_data_id.pk).first()

		if data.get('confirm')=='1':

			geo_ray_data.obyekt_nomi=geo_ray_data_edit.obyekt_nomi
			geo_ray_data.bajaruvchi_tashkilot=geo_ray_data_edit.bajaruvchi_tashkilot
			geo_ray_data.bajaruvchi_shaxs=geo_ray_data_edit.bajaruvchi_shaxs
			geo_ray_data.buyurtmachi=geo_ray_data_edit.buyurtmachi
			geo_ray_data.inv_nomer=geo_ray_data_edit.inv_nomer
			geo_ray_data.grif=geo_ray_data_edit.grif
			geo_ray_data.koordinatalar_tizimi=geo_ray_data_edit.koordinatalar_tizimi
			geo_ray_data.masshtab=geo_ray_data_edit.masshtab
			geo_ray_data.ish_boshlangan_vaqt=geo_ray_data_edit.ish_boshlangan_vaqt
			geo_ray_data.ish_yakunlangan_vaqt=geo_ray_data_edit.ish_yakunlangan_vaqt
			geo_ray_data.ish_bajarilgan_davr=geo_ray_data_edit.ish_bajarilgan_davr
			geo_ray_data.maydoni_ga=geo_ray_data_edit.maydoni_ga
			geo_ray_data.shartnoma_n=geo_ray_data_edit.shartnoma_n
			geo_ray_data.shartnoma_nomi=geo_ray_data_edit.shartnoma_nomi
			geo_ray_data.vil_id=geo_ray_data_edit.vil_id
			geo_ray_data.tuman=geo_ray_data_edit.tuman
			geo_ray_data.joy_nomi=geo_ray_data_edit.joy_nomi
			geo_ray_data.izoh=geo_ray_data_edit.izoh
			geo_ray_data.soato=geo_ray_data_edit.soato


			if geo_ray_data.hisobot!='' and geo_ray_data_edit.hisobot!=geo_ray_data.hisobot:
				os.remove(str(geo_ray_data.hisobot))
			if geo_ray_data.grafik!='' and geo_ray_data_edit.grafik!=geo_ray_data.grafik:
				os.remove(str(geo_ray_data.grafik))	

			geo_ray_data.hisobot=geo_ray_data_edit.hisobot
			geo_ray_data.grafik=geo_ray_data_edit.grafik

			geo_ray_data.status=0
			geo_ray_data.save()

			geo_ray_data_edit.my_delete()


			geo_ray.geolograyon_data_id=geo_ray_edit.geolograyon_data_id
			geo_ray.vil_id=geo_ray_edit.vil_id
			geo_ray.injenerlik_geologik_viloyat_indeksi=geo_ray_edit.injenerlik_geologik_viloyat_indeksi
			geo_ray.injenerlik_geologik_viloyat_tavsifi=geo_ray_edit.injenerlik_geologik_viloyat_tavsifi
			geo_ray.injenerlik_geologik_hududlar_indeksi=geo_ray_edit.injenerlik_geologik_hududlar_indeksi
			geo_ray.injenerlik_geologik_hududlar_tavsifi=geo_ray_edit.injenerlik_geologik_hududlar_tavsifi
			geo_ray.injenerlik_geologik_kichik_hududlar_indeksi=geo_ray_edit.injenerlik_geologik_kichik_hududlar_indeksi
			geo_ray.injenerlik_geologik_kichik_hududlar_tavsifi=geo_ray_edit.injenerlik_geologik_kichik_hududlar_tavsifi
			geo_ray.injenerlik_geologik_uchastkalar_indeksi=geo_ray_edit.injenerlik_geologik_uchastkalar_indeksi
			geo_ray.injenerlik_geologik_uchastkalar_tavsifi=geo_ray_edit.injenerlik_geologik_uchastkalar_tavsifi
			geo_ray.hududlarning_geologik_genetik_tavsifi=geo_ray_edit.hududlarning_geologik_genetik_tavsifi
			geo_ray.hududdagi_geodinamik_jarayonlar=geo_ray_edit.hududdagi_geodinamik_jarayonlar
			geo_ray.tavsiya_etiladigan_injenerlik_tadbirlari=geo_ray_edit.tavsiya_etiladigan_injenerlik_tadbirlari
			geo_ray.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=geo_ray_edit.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi
			geo_ray.kod=geo_ray_edit.kod
			geo_ray.wkb_geometry=geo_ray_edit.wkb_geometry
			geo_ray.status=0
			geo_ray.save()

			geo_ray_edit.delete()

			return HttpResponse(1)
		else:
			geo_ray_edit.delete()
			geo_ray.status=0
			geo_ray.save()

			if geo_ray_data_edit.hisobot!='' and geo_ray_data_edit.hisobot!=geo_ray_data.hisobot:
				os.remove(str(geo_ray_data_edit.hisobot))
			if geo_ray_data_edit.grafik!='' and geo_ray_data_edit.grafik!=geo_ray_data.grafik:
				os.remove(str(geo_ray_data_edit.grafik))	
			
			geo_ray_data_edit.my_delete()
			geo_ray_data.status=0
			geo_ray_data.save()

			return HttpResponse(0)
	else:
		return HttpResponse('save_edit_geo_ray_data')	

def geo_ray_data_data(request):
	if request.method=='POST':
		data=GeologRayon_data.objects.filter(vil_id=request.POST.get('vil_id')).order_by('obyekt_nomi').values('obyekt_nomi','tuman','pk')
		data2=GeologRayon_data_edit.objects.filter(vil_id=request.POST.get('vil_id'),status=1).order_by('obyekt_nomi').values('obyekt_nomi','tuman','pk')

		return JsonResponse({'data':list(data),'data2':list(data2)},safe=False)
	else:
		return HttpResponse('geo_ray_data_data')

def save_geo_ray(request):
	if request.method=='POST':
		geo_ray_id=request.POST.get('geo_ray_id')
		geo_ray_edit = GeologRayon_edit.objects.filter(id=geo_ray_id).first()

		if request.POST.get('confirm')=='1':

			if geo_ray_edit.geolograyon_data_id:
				geolograyon_data=geo_ray_edit.geolograyon_data_id
			else:
				geolograyon_data=GeologRayon_data.objects.create(
					obyekt_nomi=geo_ray_edit.geolograyon_data_edit_id.obyekt_nomi,
					bajaruvchi_tashkilot=geo_ray_edit.geolograyon_data_edit_id.bajaruvchi_tashkilot,
					bajaruvchi_shaxs=geo_ray_edit.geolograyon_data_edit_id.bajaruvchi_shaxs,
					buyurtmachi=geo_ray_edit.geolograyon_data_edit_id.buyurtmachi,
					inv_nomer=geo_ray_edit.geolograyon_data_edit_id.inv_nomer,
					grif=geo_ray_edit.geolograyon_data_edit_id.grif,
					koordinatalar_tizimi=geo_ray_edit.geolograyon_data_edit_id.koordinatalar_tizimi,
					masshtab=geo_ray_edit.geolograyon_data_edit_id.masshtab,
					ish_boshlangan_vaqt=geo_ray_edit.geolograyon_data_edit_id.ish_boshlangan_vaqt,
					ish_yakunlangan_vaqt=geo_ray_edit.geolograyon_data_edit_id.ish_yakunlangan_vaqt,
					ish_bajarilgan_davr=geo_ray_edit.geolograyon_data_edit_id.ish_bajarilgan_davr,
					maydoni_ga=geo_ray_edit.geolograyon_data_edit_id.maydoni_ga,
					shartnoma_n=geo_ray_edit.geolograyon_data_edit_id.shartnoma_n,
					shartnoma_nomi=geo_ray_edit.geolograyon_data_edit_id.shartnoma_nomi,
					vil_id=geo_ray_edit.geolograyon_data_edit_id.vil_id,
					tuman=geo_ray_edit.geolograyon_data_edit_id.tuman,
					joy_nomi=geo_ray_edit.geolograyon_data_edit_id.joy_nomi,
					izoh=geo_ray_edit.geolograyon_data_edit_id.izoh,
					soato=geo_ray_edit.geolograyon_data_edit_id.soato,
					id=geo_ray_edit.geolograyon_data_edit_id.id,
					hisobot=geo_ray_edit.geolograyon_data_edit_id.hisobot,
					grafik=geo_ray_edit.geolograyon_data_edit_id.grafik,
					status=0
					)

				for i in GeologRayon_edit.objects.filter(geolograyon_data_edit_id=geo_ray_edit.geolograyon_data_edit_id.pk):
					i.geolograyon_data_edit_id=None
					i.geolograyon_data_id=geolograyon_data
					i.save()
				GeologRayon_data_edit.objects.filter(pk=geo_ray_edit.geolograyon_data_edit_id.pk).first().my_delete()
			
			geo_ray_edit = GeologRayon_edit.objects.filter(id=geo_ray_id).first()
			
			if request.POST.get('type')=='one':
					
				geo_ray =  GeologRayon.objects.create(
					geolograyon_data_id = geolograyon_data,
					vil_id=geo_ray_edit.vil_id,
					injenerlik_geologik_viloyat_indeksi=geo_ray_edit.injenerlik_geologik_viloyat_indeksi,
					injenerlik_geologik_viloyat_tavsifi=geo_ray_edit.injenerlik_geologik_viloyat_tavsifi,
					injenerlik_geologik_hududlar_indeksi=geo_ray_edit.injenerlik_geologik_hududlar_indeksi,
					injenerlik_geologik_hududlar_tavsifi=geo_ray_edit.injenerlik_geologik_hududlar_tavsifi,
					injenerlik_geologik_kichik_hududlar_indeksi=geo_ray_edit.injenerlik_geologik_kichik_hududlar_indeksi,
					injenerlik_geologik_kichik_hududlar_tavsifi=geo_ray_edit.injenerlik_geologik_kichik_hududlar_tavsifi,
					injenerlik_geologik_uchastkalar_indeksi=geo_ray_edit.injenerlik_geologik_uchastkalar_indeksi,
					injenerlik_geologik_uchastkalar_tavsifi=geo_ray_edit.injenerlik_geologik_uchastkalar_tavsifi,
					hududlarning_geologik_genetik_tavsifi=geo_ray_edit.hududlarning_geologik_genetik_tavsifi,
					hududdagi_geodinamik_jarayonlar=geo_ray_edit.hududdagi_geodinamik_jarayonlar,
					tavsiya_etiladigan_injenerlik_tadbirlari=geo_ray_edit.tavsiya_etiladigan_injenerlik_tadbirlari,
					gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=geo_ray_edit.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi,
					kod=geo_ray_edit.kod,
					id=geo_ray_edit.id,
					wkb_geometry=geo_ray_edit.wkb_geometry,
					status=0
					)
				geo_ray_edit.delete()

				return HttpResponse(1)
			else:
				for item in GeologRayon_edit.objects.filter(geolograyon_data_id=geo_ray_edit.geolograyon_data_id.pk):
					if item:
						geo_ray =  GeologRayon.objects.create(
							geolograyon_data_id = geolograyon_data,
							vil_id=item.vil_id,
							injenerlik_geologik_viloyat_indeksi=item.injenerlik_geologik_viloyat_indeksi,
							injenerlik_geologik_viloyat_tavsifi=item.injenerlik_geologik_viloyat_tavsifi,
							injenerlik_geologik_hududlar_indeksi=item.injenerlik_geologik_hududlar_indeksi,
							injenerlik_geologik_hududlar_tavsifi=item.injenerlik_geologik_hududlar_tavsifi,
							injenerlik_geologik_kichik_hududlar_indeksi=item.injenerlik_geologik_kichik_hududlar_indeksi,
							injenerlik_geologik_kichik_hududlar_tavsifi=item.injenerlik_geologik_kichik_hududlar_tavsifi,
							injenerlik_geologik_uchastkalar_indeksi=item.injenerlik_geologik_uchastkalar_indeksi,
							injenerlik_geologik_uchastkalar_tavsifi=item.injenerlik_geologik_uchastkalar_tavsifi,
							hududlarning_geologik_genetik_tavsifi=item.hududlarning_geologik_genetik_tavsifi,
							hududdagi_geodinamik_jarayonlar=item.hududdagi_geodinamik_jarayonlar,
							tavsiya_etiladigan_injenerlik_tadbirlari=item.tavsiya_etiladigan_injenerlik_tadbirlari,
							gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=item.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi,
							kod=item.kod,
							id=item.id,
							wkb_geometry=item.wkb_geometry,
							status=0
							)
						item.delete()
					
				return HttpResponse(1)
		else:
			if request.POST.get('type')=='one':
				if geo_ray_edit.geolograyon_data_edit_id:
					if GeologRayon_edit.objects.filter(geolograyon_data_edit_id=geo_ray_edit.geolograyon_data_edit_id.pk).count()==1:
						GeologRayon_data_edit.objects.filter(pk=geo_ray_edit.geolograyon_data_edit_id.pk).delete()
					else:
						geo_ray_edit.delete()
				else:
					geo_ray_edit.delete()

				return HttpResponse(2)

			else:
				if geo_ray_edit.geolograyon_data_edit_id:
					GeologRayon_data_edit.objects.filter(pk=geo_ray_edit.geolograyon_data_edit_id.pk).delete()
				else:
					GeologRayon_edit.objects.filter(geolograyon_data_id=geo_ray_edit.geolograyon_data_id.pk).delete()
				return HttpResponse(2)
	else:
		return HttpResponse('/save_geo_ray')

def copy_table_geo_ray(geo_ray_id):

	geo_ray = GeologRayon.objects.filter(pk=geo_ray_id).first()
	geo_ray_edit = GeologRayon_edit.objects.create(
		geolograyon_id=geo_ray,
		geolograyon_data_id = geo_ray.geolograyon_data_id,
		vil_id=geo_ray.vil_id,
		injenerlik_geologik_viloyat_indeksi=geo_ray.injenerlik_geologik_viloyat_indeksi,
		injenerlik_geologik_viloyat_tavsifi=geo_ray.injenerlik_geologik_viloyat_tavsifi,
		injenerlik_geologik_hududlar_indeksi=geo_ray.injenerlik_geologik_hududlar_indeksi,
		injenerlik_geologik_hududlar_tavsifi=geo_ray.injenerlik_geologik_hududlar_tavsifi,
		injenerlik_geologik_kichik_hududlar_indeksi=geo_ray.injenerlik_geologik_kichik_hududlar_indeksi,
		injenerlik_geologik_kichik_hududlar_tavsifi=geo_ray.injenerlik_geologik_kichik_hududlar_tavsifi,
		injenerlik_geologik_uchastkalar_indeksi=geo_ray.injenerlik_geologik_uchastkalar_indeksi,
		injenerlik_geologik_uchastkalar_tavsifi=geo_ray.injenerlik_geologik_uchastkalar_tavsifi,
		hududlarning_geologik_genetik_tavsifi=geo_ray.hududlarning_geologik_genetik_tavsifi,
		hududdagi_geodinamik_jarayonlar=geo_ray.hududdagi_geodinamik_jarayonlar,
		tavsiya_etiladigan_injenerlik_tadbirlari=geo_ray.tavsiya_etiladigan_injenerlik_tadbirlari,
		gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=geo_ray.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi,
		kod=geo_ray.kod,
		id=geo_ray.id,
		wkb_geometry=geo_ray.wkb_geometry,
		status=2
			)

	geo_ray.status=2
	geo_ray.save()

	
	return geo_ray_edit.pk 




def copy_table_geo_ray_data(geo_ray_data_id):

	geo_ray_data = GeologRayon_data.objects.filter(pk=geo_ray_data_id).first()
	geo_ray_data_edit = GeologRayon_data_edit.objects.create(
		geolograyon_data_id = geo_ray_data,
		obyekt_nomi=geo_ray_data.obyekt_nomi,
		bajaruvchi_tashkilot=geo_ray_data.bajaruvchi_tashkilot,
		bajaruvchi_shaxs=geo_ray_data.bajaruvchi_shaxs,
		buyurtmachi=geo_ray_data.buyurtmachi,
		inv_nomer=geo_ray_data.inv_nomer,
		grif=geo_ray_data.grif,
		koordinatalar_tizimi=geo_ray_data.koordinatalar_tizimi,
		masshtab=geo_ray_data.masshtab,
		ish_boshlangan_vaqt=geo_ray_data.ish_boshlangan_vaqt,
		ish_yakunlangan_vaqt=geo_ray_data.ish_yakunlangan_vaqt,
		ish_bajarilgan_davr=geo_ray_data.ish_bajarilgan_davr,
		maydoni_ga=geo_ray_data.maydoni_ga,
		shartnoma_n=geo_ray_data.shartnoma_n,
		shartnoma_nomi=geo_ray_data.shartnoma_nomi,
		vil_id=geo_ray_data.vil_id,
		tuman=geo_ray_data.tuman,
		joy_nomi=geo_ray_data.joy_nomi,
		izoh=geo_ray_data.izoh,
		soato=geo_ray_data.soato,
		hisobot=geo_ray_data.hisobot,
		grafik=geo_ray_data.grafik,
		id=geo_ray_data.id,
		status=2
			)

	geo_ray_data.status=2
	geo_ray_data.save()

	
	return geo_ray_data_edit.pk 



def edit_geo_ray_data_edit(request):
	if request.method=='POST':
		data=request.POST
		if data.get('status')=='0':

			geo_ray_data_0= GeologRayon_data.objects.get(pk=data.get('id'))
			geo_ray_data = GeologRayon_data_edit.objects.filter(geolograyon_data_id=geo_ray_data_0.pk).first()
			if not geo_ray_data:
				edit_geo_ray_data_id=copy_table_geo_ray_data(data.get('id'))
			else:
				edit_geo_ray_data_id=geo_ray_data.pk
		else:
			edit_geo_ray_data_id=data.get('id')	


		obj=GeologRayon_data_edit.objects.get(pk=edit_geo_ray_data_id)
		obj.obyekt_nomi=data.get('obyekt_nomi')
		obj.bajaruvchi_tashkilot=data.get('bajaruvchi_tashkilot')
		obj.bajaruvchi_shaxs=data.get('bajaruvchi_shaxs')
		obj.buyurtmachi=data.get('buyurtmachi')
		obj.inv_nomer=data.get('inv_nomer')
		obj.grif=data.get('grif')
		obj.koordinatalar_tizimi=data.get('koor_tiz')
		obj.masshtab=data.get('masshtab')
		obj.ish_boshlangan_vaqt=data.get('ish_bosh_vaqt')
		obj.ish_yakunlangan_vaqt=data.get('ish_yak_vaqt')
		obj.ish_bajarilgan_davr=data.get('ish_baj_davr')
		obj.maydoni_ga=data.get('maydoni_ga')
		obj.shartnoma_n=data.get('shartnoma_n')
		obj.shartnoma_nomi=data.get('shartnoma_nomi')
		obj.vil_id=data.get('vil_id')
		obj.tuman=data.get('tuman')
		obj.joy_nomi=data.get('joy_nomi')
		obj.izoh=data.get('izoh')
		obj.soato=data.get('soato')

		obj_0=GeologRayon_data.objects.get(pk=obj.geolograyon_data_id.pk)


		if request.FILES.get('hisobot',False):
			if obj.hisobot!='' and obj.hisobot!=obj_0.hisobot:
				os.remove(str(obj.hisobot))
			obj.hisobot=request.FILES.get('hisobot')
		elif request.POST.get('hisobot_del','no')=='yes':
			if obj.hisobot!='' and obj.hisobot!=obj_0.hisobot:
				os.remove(str(obj.hisobot))
			obj.hisobot=None


		if request.FILES.get('grafik',False):
			if obj.grafik!='' and obj.grafik!=obj_0.grafik:
				os.remove(str(obj.grafik))
			obj.grafik=request.FILES.get('grafik')
		elif request.POST.get('grafik_del','no')=='yes':
			if obj.grafik!='' and obj.grafik!=obj_0.grafik:
				os.remove(str(obj.grafik))
			obj.grafik=None
	 
		obj.save()


		geo_ray=GeologRayon.objects.filter(id=data.get('geo_ray_id')).first()
		geo_ray_edit=GeologRayon_edit.objects.filter(geolograyon_id=geo_ray.pk).first()

		if not geo_ray_edit:
			geo_ray_edit_id=copy_table_geo_ray(geo_ray.pk)
		else:
			geo_ray_edit_id=geo_ray_edit.pk

		geo_ray_edit=GeologRayon_edit.objects.get(pk=geo_ray_edit_id)
		geo_ray_edit.geolograyon_data_edit_id=obj

		geo_ray_edit.save();

		return JsonResponse({'status':2,'id':edit_geo_ray_data_id})
	else:
		return HttpResponse('edit_geo_ray_data')



def edit_geo_ray(request):
	if request.method=='POST':
		data=request.POST

		if data.get('status')=='1':
			if data.get('with')=='yes':

				obj_0=GeologRayon_data_edit.objects.get(pk=int(data.get('geo_ray_data_id')))

				obj_0.obyekt_nomi=data.get('obyekt_nomi')
				obj_0.bajaruvchi_tashkilot=data.get('bajaruvchi_tashkilot')
				obj_0.bajaruvchi_shaxs=data.get('bajaruvchi_shaxs')
				obj_0.buyurtmachi=data.get('buyurtmachi')
				obj_0.inv_nomer=data.get('inv_nomer')
				obj_0.grif=data.get('grif')
				obj_0.koordinatalar_tizimi=data.get('koor_tiz')
				obj_0.masshtab=data.get('masshtab')
				obj_0.ish_boshlangan_vaqt=data.get('ish_bosh_vaqt')
				obj_0.ish_yakunlangan_vaqt=data.get('ish_yak_vaqt')
				obj_0.ish_bajarilgan_davr=data.get('ish_baj_davr')
				obj_0.maydoni_ga=data.get('maydoni_ga')
				obj_0.shartnoma_n=data.get('shartnoma_n')
				obj_0.shartnoma_nomi=data.get('shartnoma_nomi')
				obj_0.vil_id=data.get('vil_id')
				obj_0.tuman=data.get('tuman')
				obj_0.joy_nomi=data.get('joy_nomi')
				obj_0.izoh=data.get('izoh')
				obj_0.soato=data.get('soato')

				if request.FILES.get('hisobot',False):
					if obj_0.hisobot!='':
						os.remove(str(obj_0.hisobot))
					obj_0.hisobot=request.FILES.get('hisobot')
				elif request.POST.get('hisobot_del','no')=='yes':
					if obj_0.hisobot!='':
						os.remove(str(obj_0.hisobot))
					obj_0.hisobot=None

				if request.FILES.get('grafik',False):
					if obj_0.grafik!='':
						os.remove(str(obj_0.grafik))
					obj_0.grafik=request.FILES.get('grafik')	
				elif request.POST.get('grafik_del','no')=='yes':
					if obj_0.grafik!='':
						os.remove(str(obj_0.grafik))
					obj_0.grafik=None

				obj_0.save()

			obj=GeologRayon_edit.objects.get(pk=int(data.get('id')))

			obj.injenerlik_geologik_viloyat_indeksi=data.get('vil_ind')
			obj.injenerlik_geologik_viloyat_tavsifi=data.get('vil_tav')
			obj.injenerlik_geologik_hududlar_indeksi=data.get('hud_ind')
			obj.injenerlik_geologik_hududlar_tavsifi=data.get('hud_tav')
			obj.injenerlik_geologik_kichik_hududlar_indeksi=data.get('kich_hud_ind')
			obj.injenerlik_geologik_kichik_hududlar_tavsifi=data.get('kich_hud_tav')
			obj.injenerlik_geologik_uchastkalar_indeksi=data.get('uch_ind')
			obj.injenerlik_geologik_uchastkalar_tavsifi=data.get('uch_tav')
			obj.hududlarning_geologik_genetik_tavsifi=data.get('gen_tav')
			obj.hududdagi_geodinamik_jarayonlar=data.get('geod_jar')
			obj.tavsiya_etiladigan_injenerlik_tadbirlari=data.get('inj_tad')
			obj.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=data.get('grund_tav')
			obj.kod=data.get('kod')
			obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
	
			obj.save()

			return JsonResponse({'status':1,'id':data.get('id')})

		elif data.get('status')=='0' or data.get('status')=='2':
			if data.get('status')=='0':

				geo_ray_0= GeologRayon.objects.get(pk=data.get('id'))
				geo_ray = GeologRayon_edit.objects.filter(geolograyon_id=geo_ray_0.pk).first()
				if not geo_ray:
					edit_geo_ray_id=copy_table_geo_ray(data.get('id'))
				else:
					edit_geo_ray_id=geo_ray.pk
			else:
				edit_geo_ray_id=data.get('id')	
	
			obj=GeologRayon_edit.objects.get(pk=edit_geo_ray_id)

			obj.injenerlik_geologik_viloyat_indeksi=data.get('vil_ind')
			obj.injenerlik_geologik_viloyat_tavsifi=data.get('vil_tav')
			obj.injenerlik_geologik_hududlar_indeksi=data.get('hud_ind')
			obj.injenerlik_geologik_hududlar_tavsifi=data.get('hud_tav')
			obj.injenerlik_geologik_kichik_hududlar_indeksi=data.get('kich_hud_ind')
			obj.injenerlik_geologik_kichik_hududlar_tavsifi=data.get('kich_hud_tav')
			obj.injenerlik_geologik_uchastkalar_indeksi=data.get('uch_ind')
			obj.injenerlik_geologik_uchastkalar_tavsifi=data.get('uch_tav')
			obj.hududlarning_geologik_genetik_tavsifi=data.get('gen_tav')
			obj.hududdagi_geodinamik_jarayonlar=data.get('geod_jar')
			obj.tavsiya_etiladigan_injenerlik_tadbirlari=data.get('inj_tad')
			obj.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=data.get('grund_tav')
			obj.kod=data.get('kod')
			obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
	
			obj.save()

			return JsonResponse({'status':2,'id':edit_geo_ray_id})
	else:
		return HttpResponse('edit_geo_ray')
 
def edit_geo_ray_data(request):
	if request.method=='POST':
		data=request.POST
		if data.get('status')=='0':

			geo_ray_edit= GeologRayon_edit.objects.filter(id=data.get('geo_ray_id')).first()
			
			if geo_ray_edit:

				geo_ray_json= serializers.serialize('geojson', [geo_ray_edit,])
				geo_ray_data=list(GeologRayon_data.objects.filter(pk=geo_ray_edit.geolograyon_data_id.pk).values('obyekt_nomi','tuman','pk'))

				return JsonResponse({
								'geo_ray_json':geo_ray_json,
								'geo_ray_data':geo_ray_data,
								'geo_ray_id': geo_ray_edit.pk,
								'status': 2,
								 },safe=False)

			else:
				geo_ray=  GeologRayon.objects.get(id=data.get('geo_ray_id'))
				geo_ray_json= serializers.serialize('geojson', [geo_ray,])
				geo_ray_data=list(GeologRayon_data.objects.filter(pk=geo_ray.geolograyon_data_id.pk).values('obyekt_nomi','tuman','pk'))

				return JsonResponse({
							'geo_ray_json':geo_ray_json,
							'geo_ray_data':geo_ray_data,
							'geo_ray_id': geo_ray.pk,
							'status': 0,
							 },safe=False)

		elif data.get('status')=='1':
			geo_ray= GeologRayon_edit.objects.get(id=data.get('geo_ray_id'))
			geo_ray_json= serializers.serialize('geojson', [geo_ray,])
			if geo_ray.geolograyon_data_id:
				geo_ray_data=list(GeologRayon_data.objects.filter(vil_id=geo_ray.vil_id).values('obyekt_nomi','tuman','pk'))
			else:
				geo_ray_data=list(GeologRayon_data_edit.objects.filter(pk=geo_ray.geolograyon_data_edit_id.pk).values('obyekt_nomi','tuman','pk'))

			return JsonResponse({
							'geo_ray_json':geo_ray_json,
							'geo_ray_data':geo_ray_data,
							'geo_ray_id': geo_ray.pk,
							'status': 1,
							 },safe=False)


		elif data.get('status')=='2':

			geo_ray= GeologRayon_edit.objects.get(id=data.get('geo_ray_id'))
			geo_ray_json= serializers.serialize('geojson', [geo_ray,])
			geo_ray_data=list(GeologRayon_data.objects.filter(pk=geo_ray.geolograyon_data_id.pk).values('obyekt_nomi','tuman','pk'))

			return JsonResponse({
							'geo_ray_json':geo_ray_json,
							'geo_ray_data':geo_ray_data,
							'geo_ray_id': geo_ray.pk,
							'status': 2,
							 },safe=False)

	else:
		return HttpResponse('/edit_geo_ray_data')




def edit_geo_ray_data_data(request):
	if request.method=='POST':
		data=request.POST
		if data.get('status')=='0':

			geo_ray_data_edit= GeologRayon_data_edit.objects.filter(id=data.get('id'))
			
			if geo_ray_data_edit:
				return JsonResponse({
								'data':list(geo_ray_data_edit.values()),
								'status': 2,
								 },safe=False)

			else:
				geo_ray_data=  GeologRayon_data.objects.filter(id=data.get('id'))
				return JsonResponse({
								'data':list(geo_ray_data.values()),
								'status': 0,
							 },safe=False)


		elif data.get('status')=='1':
			
			geo_ray_data=  GeologRayon_data_edit.objects.filter(pk=data.get('id'))
			
			return JsonResponse({'data':list(geo_ray_data.values())})


		elif data.get('status')=='2':

			geo_ray_data=  GeologRayon_data_edit.objects.filter(id=data.get('id'))
			return JsonResponse({
								'data':list(geo_ray_data.values()),
								'status': 2,
							 },safe=False)

	else:
		return HttpResponse('/edit_geo_ray_data')







def geo_ray_data_dialog_view(request):
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
			data=serializers.serialize('json',GeologRayon_data.objects.filter(pk=GeologRayon.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.pk))
			if not GeologRayon_data_edit.objects.filter(geolograyon_data_id=GeologRayon_data.objects.filter(pk=GeologRayon.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.pk).first().pk):
				edit='yes'
			else:
				edit='no'
			return JsonResponse({'data':data,'sessia':sessia,'edit':edit,'id':request.POST.get('id')},safe=False)
		
		elif request.POST.get('status')=='1':
			if GeologRayon_edit.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id:
				data=serializers.serialize('json',GeologRayon_data.objects.filter(pk=GeologRayon_edit.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.pk))
			else:
				data=serializers.serialize('json',GeologRayon_data_edit.objects.filter(pk=GeologRayon_edit.objects.filter(id=request.POST.get('id')).first().geolograyon_data_edit_id.pk))
			return JsonResponse({'data':data,'sessia':sessia,'id':request.POST.get('id')},safe=False)

		elif request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				edit='yes'
				
				data=serializers.serialize('json',GeologRayon_data.objects.filter(pk=GeologRayon.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.pk))

				if GeologRayon_edit.objects.filter(geolograyon_id=GeologRayon.objects.filter(id=request.POST.get('id')).first().pk).first().geolograyon_data_edit_id:
					edit='yes'
				else:
					edit='no'
			else:
				if GeologRayon_edit.objects.filter(id=request.POST.get('id')).first().geolograyon_data_edit_id:
					edit='yes'
					data=serializers.serialize('json',GeologRayon_data_edit.objects.filter(pk=GeologRayon_edit.objects.filter(id=request.POST.get('id')).first().geolograyon_data_edit_id.pk))
				else:
					edit='no'
					data=serializers.serialize('json',GeologRayon_data.objects.filter(pk=GeologRayon_edit.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.pk))
			return JsonResponse({'data':data,'sessia':sessia,'edit':edit,'id':request.POST.get('id')},safe=False)
	else:
		return HttpResponse('/geo_ray_data_dialog_view')


def geo_ray_dialog_view(request):
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
			data=serializers.serialize('json',GeologRayon.objects.filter(id=request.POST.get('id')))
			data_status=GeologRayon.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.status
			return JsonResponse([{'data':data,'sessia':sessia,'data_status':data_status}],safe=False)
		
		elif request.POST.get('status')=='1' or request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				data=serializers.serialize('json',GeologRayon.objects.filter(id=request.POST.get('id')))
				data_status=GeologRayon.objects.filter(id=request.POST.get('id')).first().geolograyon_data_id.status

			else:
				data=serializers.serialize('json',GeologRayon_edit.objects.filter(id=request.POST.get('id')))
				data_status=0			
			return JsonResponse([{'data':data,'sessia':sessia,'data_status':data_status}],safe=False)
	else:
		return HttpResponse('/geo_ray_dialog_view')


def create_geo_ray(request):
	if request.method=='POST':
		data=request.POST	
		if data.get('with')=='no':
			print(data.get('geo_ray_id'))
			if data.get('geo_ray_id').split('-')[0]=='1':
				geo_data=GeologRayon_data.objects.get(pk=int(data.get('geo_ray_id').split('-')[1]))
				geo_data_edit=None
			else:
				geo_data=None
				geo_data_edit=GeologRayon_data_edit.objects.get(pk=int(data.get('geo_ray_id').split('-')[1]))

			if data.get('type')=='one':

				geo_ray =  GeologRayon_edit.objects.create(
							geolograyon_data_id = geo_data,
							geolograyon_data_edit_id = geo_data_edit,
							vil_id=data.get('vil_id'),
							injenerlik_geologik_viloyat_indeksi=data.get('vil_ind'),
							injenerlik_geologik_viloyat_tavsifi=data.get('vil_tav'),
							injenerlik_geologik_hududlar_indeksi=data.get('hud_ind'),
							injenerlik_geologik_hududlar_tavsifi=data.get('hud_tav'),
							injenerlik_geologik_kichik_hududlar_indeksi=data.get('kich_hud_ind'),
							injenerlik_geologik_kichik_hududlar_tavsifi=data.get('kich_hud_tav'),
							injenerlik_geologik_uchastkalar_indeksi=data.get('uch_ind'),
							injenerlik_geologik_uchastkalar_tavsifi=data.get('uch_tav'),
							hududlarning_geologik_genetik_tavsifi=data.get('gen_tav'),
							hududdagi_geodinamik_jarayonlar=data.get('geod_jar'),
							tavsiya_etiladigan_injenerlik_tadbirlari=data.get('inj_tad'),
							gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=data.get('grund_tav'),
							kod=data.get('kod'),
							wkb_geometry=GEOSGeometry(data.get('geometry')),
							status=1
							)

				geo_ray.id='gr_'+str(geo_ray.pk)
				geo_ray.save()

				return HttpResponse(1)
			else:
				layers=json.loads(data.get('layers'))
				for i in layers['features']:
					try:
						geo_ray = GeologRayon_edit.objects.create(
								geolograyon_data_id = geo_data,
								geolograyon_data_edit_id = geo_data_edit,
								vil_id=data.get('vil_id'),
								injenerlik_geologik_viloyat_indeksi=i['properties']['Injenerlik_geologik_viloyat_indeksi'],
								injenerlik_geologik_viloyat_tavsifi=i['properties']['Injenerlik_geologik_viloyat_tavsifi'],
								injenerlik_geologik_hududlar_indeksi=i['properties']['Injenerlik_geologik_hududlar_indeksi'],
								injenerlik_geologik_hududlar_tavsifi=i['properties']['Injenerlik_geologik_hududlar_tavsifi'],
								injenerlik_geologik_kichik_hududlar_indeksi=i['properties']['Injenerlik_geologik_kichik_hududlar_indeksi'],
								injenerlik_geologik_kichik_hududlar_tavsifi=i['properties']['Injenerlik_geologik_kichik_hududlar_tavsifi'],
								injenerlik_geologik_uchastkalar_indeksi=i['properties']['Injenerlik_geologik_uchastkalar_indeksi'],
								injenerlik_geologik_uchastkalar_tavsifi=i['properties']['Injenerlik_geologik_uchastkalar_tavsifi'],
								hududlarning_geologik_genetik_tavsifi=i['properties']['Hududlarning_geologik_genetik_tavsifi'],
								hududdagi_geodinamik_jarayonlar=i['properties']['Hududdagi_geodinamik_jarayonlar'],
								tavsiya_etiladigan_injenerlik_tadbirlari=i['properties']['Tavsiya_etiladigan_injenerlik_tadbirlari'],
								gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=i['properties']['Gruntlarning_seysmik_xususiyatlari_buyicha_toifasi'],
								kod=i['properties']['KOD'],
								wkb_geometry=GEOSGeometry(str(i['geometry'])),
								status=1
								)

						geo_ray.id='gr_'+str(geo_ray.pk)
						geo_ray.save()
					except (GEOSException, ValueError, TypeError):
						continue

				return HttpResponse(1)
		else:
			geo_data=GeologRayon_data_edit.objects.create(
				obyekt_nomi=data.get('obyekt_nomi'),
				bajaruvchi_tashkilot=data.get('bajaruvchi_tashkilot'),
				bajaruvchi_shaxs=data.get('bajaruvchi_shaxs'),
				buyurtmachi=data.get('buyurtmachi'),
				inv_nomer=data.get('inv_nomer'),
				grif=data.get('grif'),
				koordinatalar_tizimi=data.get('koor_tiz'),
				masshtab=data.get('masshtab'),
				ish_boshlangan_vaqt=data.get('ish_bosh_vaqt'),
				ish_yakunlangan_vaqt=data.get('ish_yak_vaqt'),
				ish_bajarilgan_davr=data.get('ish_baj_davr'),
				maydoni_ga=data.get('maydoni_ga'),
				shartnoma_n=data.get('shartnoma_n'),
				shartnoma_nomi=data.get('shartnoma_nomi'),
				vil_id=data.get('vil_id'),
				tuman=data.get('tuman'),
				joy_nomi=data.get('joy_nomi'),
				izoh=data.get('izoh'),
				soato=data.get('soato'),
				hisobot=request.FILES.get('hisobot'),
				grafik=request.FILES.get('grafik'),
				status=1
				) 
			geo_data.id='grd_'+str(geo_data.pk)
			geo_data.save()


			if data.get('type')=='one':

				geo_ray =  GeologRayon_edit.objects.create(
							geolograyon_data_edit_id = geo_data,
							vil_id=data.get('vil_id'),
							injenerlik_geologik_viloyat_indeksi=data.get('vil_ind'),
							injenerlik_geologik_viloyat_tavsifi=data.get('vil_tav'),
							injenerlik_geologik_hududlar_indeksi=data.get('hud_ind'),
							injenerlik_geologik_hududlar_tavsifi=data.get('hud_tav'),
							injenerlik_geologik_kichik_hududlar_indeksi=data.get('kich_hud_ind'),
							injenerlik_geologik_kichik_hududlar_tavsifi=data.get('kich_hud_tav'),
							injenerlik_geologik_uchastkalar_indeksi=data.get('uch_ind'),
							injenerlik_geologik_uchastkalar_tavsifi=data.get('uch_tav'),
							hududlarning_geologik_genetik_tavsifi=data.get('gen_tav'),
							hududdagi_geodinamik_jarayonlar=data.get('geod_jar'),
							tavsiya_etiladigan_injenerlik_tadbirlari=data.get('inj_tad'),
							gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=data.get('grund_tav'),
							kod=data.get('kod'),
							wkb_geometry=GEOSGeometry(data.get('geometry')),
							status=1
							)

				geo_ray.id='gr_'+str(geo_ray.pk)
				geo_ray.save()

				return HttpResponse(1)
			else:

				layers=json.loads(data.get('layers'))
				for i in layers['features']:

					try:
						geo_ray = GeologRayon_edit.objects.create(
								geolograyon_data_edit_id = geo_data,
								vil_id=data.get('vil_id'),
								injenerlik_geologik_viloyat_indeksi=i['properties']['Injenerlik_geologik_viloyat_indeksi'],
								injenerlik_geologik_viloyat_tavsifi=i['properties']['Injenerlik_geologik_viloyat_tavsifi'],
								injenerlik_geologik_hududlar_indeksi=i['properties']['Injenerlik_geologik_hududlar_indeksi'],
								injenerlik_geologik_hududlar_tavsifi=i['properties']['Injenerlik_geologik_hududlar_tavsifi'],
								injenerlik_geologik_kichik_hududlar_indeksi=i['properties']['Injenerlik_geologik_kichik_hududlar_indeksi'],
								injenerlik_geologik_kichik_hududlar_tavsifi=i['properties']['Injenerlik_geologik_kichik_hududlar_tavsifi'],
								injenerlik_geologik_uchastkalar_indeksi=i['properties']['Injenerlik_geologik_uchastkalar_indeksi'],
								injenerlik_geologik_uchastkalar_tavsifi=i['properties']['Injenerlik_geologik_uchastkalar_tavsifi'],
								hududlarning_geologik_genetik_tavsifi=i['properties']['Hududlarning_geologik_genetik_tavsifi'],
								hududdagi_geodinamik_jarayonlar=i['properties']['Hududdagi_geodinamik_jarayonlar'],
								tavsiya_etiladigan_injenerlik_tadbirlari=i['properties']['Tavsiya_etiladigan_injenerlik_tadbirlari'],
								gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=i['properties']['Gruntlarning_seysmik_xususiyatlari_buyicha_toifasi'],
								kod=i['properties']['KOD'],
								wkb_geometry=GEOSGeometry(str(i['geometry'])),
								status=1
								)

						geo_ray.id='gr_'+str(geo_ray.pk)
						geo_ray.save()

					except (GEOSException, ValueError, TypeError) as e:
						print(e)
						continue

				return HttpResponse(1)

			return HttpResponse(1)
	else:
		return HttpResponse('/create_geo_ray') 


