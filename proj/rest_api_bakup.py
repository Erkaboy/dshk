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
from proj.genplan_models import Genplans,Sub_genplan_data,Sub_sub_genplan_data
from proj.apot_models import Apots,Sub_apot_data
from proj.apot_models import Apots,Sub_apot_data
from proj.funk_genplan_models import FunkGenplans
from proj.geologik_rayon_models import GeologRayon,GeologRayon_data



from basicauth.decorators import basic_auth_required


@basic_auth_required 
def dshk_rest_api(request,xizmat='',obj_id='obj_id'):

	if xizmat=='geologik-rayonlashtirish-umumiy-ruyxati':
		geo_ray_data= GeologRayon.objects.filter(~Q(status=4)).values(
		'id'
		)
		return JsonResponse({'data':list(geo_ray_data)},safe=False)

	elif xizmat=='bitta-geologik-rayonlashtirish-obyekti-haqida-tuliq-malumot':
	
		geo_ray_data= GeologRayon.objects.filter(id=str(obj_id))
		geo_ray_json= serializers.serialize('geojson',geo_ray_data,geometry_field='wkb_geometry',fields={				
				'geolograyon_data_id',
				'vil_id',
				'injenerlik_geologik_viloyat_indeksi',
				'injenerlik_geologik_viloyat_tavsifi',
				'injenerlik_geologik_hududlar_indeksi',
				'injenerlik_geologik_hududlar_tavsifi',
				'injenerlik_geologik_kichik_hududlar_indeksi',
				'injenerlik_geologik_kichik_hududlar_tavsifi',
				'injenerlik_geologik_uchastkalar_indeksi',
				'injenerlik_geologik_uchastkalar_tavsifi',
				'hududlarning_geologik_genetik_tavsifi',
				'hududdagi_geodinamik_jarayonlar',
				'tavsiya_etiladigan_injenerlik_tadbirlari',
				'gruntlarning_seysmik_xususiyatlari_buyicha_toifasi',
				'kod',
				'id',
				'pk'
				}
				)
		if geo_ray_data.first():
			obj_id=geo_ray_data.first().geolograyon_data_id.pk
		else:
			obj_id=-1

		geo_ray_main_data= GeologRayon_data.objects.filter(pk=str(obj_id)).values(
				'obyekt_nomi',
				'bajaruvchi_tashkilot',
				'bajaruvchi_shaxs',
				'buyurtmachi',
				'inv_nomer',
				'grif',
				'koordinatalar_tizimi',
				'masshtab',
				'ish_boshlangan_vaqt',
				'ish_yakunlangan_vaqt',
				'ish_bajarilgan_davr',
				'maydoni_ga',
				'shartnoma_n',
				'shartnoma_nomi',
				'vil_id',
				'tuman',
				'joy_nomi',
				'izoh',
				'id',
				'soato',
				"pk"
			)


		return JsonResponse({'main_data':json.loads(geo_ray_json),'addintional_data':list(geo_ray_main_data)},safe=False)
	
	elif xizmat=='bosh-rejalar-asosida-qilingan-funksional-zonalar-umumiy-ruyxati':
		fzg_data= FunkGenplans.objects.filter(~Q(status=4)).values(
		'id',
		)
		return JsonResponse({'data':list(fzg_data)},safe=False)

	elif xizmat=='bitta-bosh-rejalar-asosida-qilingan-funksional-zona-haqida-tuliq-malumot':
		fzg_data= FunkGenplans.objects.filter(id=str(obj_id))
		fzg_json= serializers.serialize('geojson',fzg_data,geometry_field='wkb_geometry',fields={				
				'funk_zone',
				'vil_id',
				'zonalarning_nomi',
				'funktsional_zonalarning_maydoni_ga',
				'mavjud_imoratlarning_tavsifi_asosan',
				'shaharsozlik_faoliyatining_ruxsat_berilgan_turi',
				'shaharsozlik_faoliyatining_taqiqlangan_turi',
				'shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru',
				'type',
		  		'id',
               			'pk'
				}
				)

		if fzg_data.first():
			obj_id=fzg_data.first().genplan_id.pk
		else:
			obj_id=-1

		genplan_data= Genplans.objects.filter(pk=str(obj_id)).values(
				"aholi_punktining_nomi",
				"mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi",
				"aholi_punktining_tipi",
				"aholi_punktining_maqomi",
				"respublika_viloyat",
				"tuman_shahar",
				"loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv",
				"shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy",
				"shahar_chegarasi_loyihasini_tasdiqlangan_organ",
				"shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san",
				"aholi_punktining_loyihaviy_maydoni_ga",
				"aholining_loyihaviy_soni",
				"ishlab_chiqalgan_yili",
				"tasdiqlanganligi",
				"reja_qilingan_hujjat",
				'id',
				"pk"
		)

		
		return JsonResponse({'main_data':json.loads(fzg_json),'additional_data':list(genplan_data)},safe=False)

	
	elif xizmat=='hududlarni-arxitekturaviy-rejalashtirishni-tashkillashtirish-loyihalari-umumiy-ruyxati':
		apot_data= Apots.objects.filter(~Q(status=4)).values(
				'fuqarolar_yiginlari',
				'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
				'aholi_punktining_tipi',
				'aholi_punktining_maqomi',
				'respublika_viloyat',
				'tuman_shahar',
				'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
				'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
				'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
				'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
				'aholi_punktining_loyihaviy_maydoni_ga',
				'aholining_loyihaviy_soni',
				'ishlab_chiqalgan_yili',
				'ishlab_chiqarish_asosi',
				'reja_qilingan_hujjat',
				'tasdiqlanganligi',
				'kfi_markazi',
				'boysinuvchi_aholi_punktlari_soni',
				'shaharsozlik_kengashi_qarori',
				'aholi_soni_tip',
	  			'id',
               			"pk"
		)
		return JsonResponse({'data':list(apot_data)},safe=False)

	elif xizmat=='bitta-hududlarni-arxitekturaviy-rejalashtirishni-tashkillashtirish-loyihasi-haqida-malumot-olish':
		apot_data= Apots.objects.filter(id=str(obj_id))
		apot_json= serializers.serialize('geojson',apot_data,geometry_field='wkb_geometry',fields={
				'fuqarolar_yiginlari',
				'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
				'aholi_punktining_tipi',
				'aholi_punktining_maqomi',
				'respublika_viloyat',
				'tuman_shahar',
				'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
				'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
				'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
				'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
				'aholi_punktining_loyihaviy_maydoni_ga',
				'aholining_loyihaviy_soni',
				'ishlab_chiqalgan_yili',
				'ishlab_chiqarish_asosi',
				'reja_qilingan_hujjat',
				'tasdiqlanganligi',
				'kfi_markazi',
				'boysinuvchi_aholi_punktlari_soni',
				'shaharsozlik_kengashi_qarori',
				'aholi_soni_tip',
	  			'id',
               			"pk"
				}
				)

		text=[]
		data1=Sub_apot_data.objects.filter(apot_id__id=str(obj_id)).order_by('sub_apot_id__zindex')
		for i in data1:
			text.append({'service_name':i.sub_apot_id.nomi,'z_index':i.sub_apot_id.zindex,'file':str(i.file).replace('apot_data','https://api.dshk.uz/apot_data')})
	


		return JsonResponse({'additional_data':list(text),'main_data':json.loads(apot_json)},safe=False)

	elif xizmat=='bosh-rejalar-umumiy-ruyxati':
		genplan_data= Genplans.objects.filter(~Q(status=4)).values(
		"aholi_punktining_nomi",
                "mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi",
                "aholi_punktining_tipi",
                "aholi_punktining_maqomi",
                "respublika_viloyat",
                "tuman_shahar",
                "loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv",
                "shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy",
                "shahar_chegarasi_loyihasini_tasdiqlangan_organ",
                "shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san",
                "aholi_punktining_loyihaviy_maydoni_ga",
                "aholining_loyihaviy_soni",
                "ishlab_chiqalgan_yili",
                "tasdiqlanganligi",
                "reja_qilingan_hujjat",
		'id',
                "pk"
		)
		return JsonResponse({'data':list(genplan_data)},safe=False)

	elif xizmat=='bitta-bosh-reja-haqida-tuliq-malumot-olish':

		genplan_data= Genplans.objects.filter(id=str(obj_id))
		genplan_json= serializers.serialize('geojson',genplan_data,geometry_field='wkb_geometry',fields={
		"aholi_punktining_nomi",
                "mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi",
                "aholi_punktining_tipi",
                "aholi_punktining_maqomi",
                "respublika_viloyat",
                "tuman_shahar",
                "loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv",
                "shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy",
                "shahar_chegarasi_loyihasini_tasdiqlangan_organ",
                "shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san",
                "aholi_punktining_loyihaviy_maydoni_ga",
                "aholining_loyihaviy_soni",
                "ishlab_chiqalgan_yili",
                "tasdiqlanganligi",
                "reja_qilingan_hujjat",
		'id',
                "pk"
	}
		)


		data1=Sub_genplan_data.objects.filter(genplan_id__id=str(obj_id)).order_by('sub_genplan_id__zindex')
		text='['
		w=1
		for i in data1:
			text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","geotif":"'+str(i.geotif).replace('genplan_data','https://api.dshk.uz/genplan_data')+'","pdf":"'+str(i.pdf).replace('genplan_data','https://api.dshk.uz/genplan_data')+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
			data2=Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=i.id).order_by('sub_sub_genplan_id__index')
			z=1
			for x in data2:
				text=text+'{"nomi":"'+str(x.sub_sub_genplan_id)+'","file_name":"'+str(x.file).replace('genplan_data','https://api.dshk.uz/genplan_data')+'"}'
				if z!=len(data2):
					text=text+','
				z=z+1
			text=text+']}'
			if w!=len(data1):
				text=text+','
			w=w+1
		text=text+']'

		return JsonResponse({'additional_data':json.loads(text),'main_data':json.loads(genplan_json)},safe=False)



