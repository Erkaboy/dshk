from __future__ import unicode_literals
from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse 
import os 
from subprocess import call
from django.contrib.auth import authenticate,login,logout
import pdfkit
from pyvirtualdisplay import Display
import xlsxwriter
from django.core.serializers import serialize
from django.core.paginator import Paginator
import geodaisy.converters as convert

import psycopg2
import requests
import csv
import urllib
import codecs
 
from datetime import datetime,date
from django.core.files.storage import default_storage

import json
from django.contrib.gis.geos import GEOSGeometry

from proj.pdp_models import Pdps,Pdps_edit,Sub_pdp,Sub_sub_pdp,Sub_pdp_data,Sub_pdp_data_edit,Sub_sub_pdp_data,Sub_sub_pdp_data_edit

from django.core import serializers

from django.db.models import Q

def pdps_data(request):
	data=request.POST
	if data.get('type')=='pdp':
		if data.get('filter')=='-0':
			pdp= Pdps.objects.filter(~Q(status = 4))
			pdp_data= serializers.serialize('json',pdp,fields=[
					'aholi_punktining_nomi',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'aholi_punktining_maqomi',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
					'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
					'aholi_punktining_loyihaviy_maydoni_ga',
					'aholining_loyihaviy_soni',
					'ishlab_chiqalgan_yili',
					'id',
					'tasdiqlanganligi',
					'status'
					])
			return JsonResponse({'data':pdp_data})
		else:
			if data.get('filter_type')=='tas':
				pdp= Pdps.objects.filter(~Q(status = 4),Q(tasdiqlanganligi=data.get('filter')))
				pdp_data= serializers.serialize('json',pdp,fields=[
					'aholi_punktining_nomi',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'aholi_punktining_maqomi',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
					'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
					'aholi_punktining_loyihaviy_maydoni_ga',
					'aholining_loyihaviy_soni',
					'ishlab_chiqalgan_yili',
					'id',
					'tasdiqlanganligi',
					'status'
					])
				return JsonResponse({'data':pdp_data})
			elif data.get('filter_type')=='vil':
				pdp= Pdps.objects.filter(~Q(status = 4),Q(respublika_viloyat=data.get('filter')))
				pdp_data= serializers.serialize('json',pdp,fields=[
					'aholi_punktining_nomi',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'aholi_punktining_maqomi',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
					'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
					'aholi_punktining_loyihaviy_maydoni_ga',
					'aholining_loyihaviy_soni',
					'ishlab_chiqalgan_yili',
					'id',
					'tasdiqlanganligi',
					'status'
					])
				return JsonResponse({'data':pdp_data})
	elif data.get('type')=='pdp_edit':
		if data.get('filter_type')=='status':
			pdp= Pdps_edit.objects.filter(status=data.get('filter'))
			pdp_data= serializers.serialize('json',pdp,fields=[
					'aholi_punktining_nomi',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'aholi_punktining_maqomi',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
					'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
					'aholi_punktining_loyihaviy_maydoni_ga',
					'aholining_loyihaviy_soni',
					'ishlab_chiqalgan_yili',
					'id',
					'tasdiqlanganligi',
					'status'
					])
			return JsonResponse({'data':pdp_data})
		elif data.get('filter_type')=='vil':
			pdp= Pdps_edit.objects.filter(respublika_viloyat=data.get('filter'))
			pdp_data= serializers.serialize('json',pdp,fields=[
					'aholi_punktining_nomi',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'aholi_punktining_maqomi',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'shahar_chegarasi_loyihasini_tasdiqlangan_organ',
					'shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san',
					'aholi_punktining_loyihaviy_maydoni_ga',
					'aholining_loyihaviy_soni',
					'ishlab_chiqalgan_yili',
					'id',
					'tasdiqlanganligi',
					'status'
					])
			return JsonResponse({'data':pdp_data})

def save_edit_pdp(request):
	if request.method=='POST':
		data=request.POST
		pdp_edit = Pdps_edit.objects.filter(id=data.get('pdp_id')).first()
		pdp = Pdps.objects.filter(pk=pdp_edit.pdp_id.pk).first()
		sub_pdp_data= Sub_pdp_data.objects.filter(pdp_id=pdp.pk)
		sub_pdp_data_0= Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk)

		if data.get('confirm')=='1':
			for sub_item in sub_pdp_data:
				if sub_item.status==3:

					if sub_item.geotif!='':
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_item.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_item.layer_name)
							
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_item.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)
					sub_item.delete()

				elif sub_item.status==2:
					sub_sub_pdp_data = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=sub_item.pk)
					sub_pdp_data_edit=Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk,sub_pdp_id=sub_item.sub_pdp_id.pk).first()

					for sub_sub_item in sub_sub_pdp_data:
						if sub_sub_item.status==3:
							sub_sub_item.delete()
						elif sub_sub_item.status==2:
							sub_sub_pdp_data_edit=Sub_sub_pdp_data_edit.objects.filter(sub_sub_pdp_id=sub_sub_item.sub_sub_pdp_id.pk,Sub_pdp_data_id=sub_pdp_data_edit.pk).first()
							if sub_sub_item.file!=sub_sub_pdp_data_edit.file:
								if sub_sub_item.file!='':
									os.remove(str(sub_sub_item.file))
								sub_sub_item.file=sub_sub_pdp_data_edit.file
								sub_sub_item.save()							

					if sub_item.pdf!='' and sub_item.pdf!=sub_pdp_data_edit.pdf:
						os.remove(str(sub_item.pdf))
					sub_item.pdf=sub_pdp_data_edit.pdf

					if sub_item.geotif!='' and sub_item.geotif!=sub_pdp_data_edit.geotif:
						os.remove(str(sub_item.geotif))

						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_item.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_item.layer_name)
							
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_item.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)

					sub_item.geotif=sub_pdp_data_edit.geotif
					sub_item.layer_name=sub_pdp_data_edit.layer_name
					sub_item.save()
				
					if sub_item.geotif=='' and sub_item.pdf=='':
						sub_item.delete()

			for sub_item in sub_pdp_data_0:
				if sub_item.status==1:
					Sub_pdp_data.objects.create(
					pdp_id=pdp,
					sub_pdp_id=sub_item.sub_pdp_id,
					layer_name=sub_item.layer_name,
					status=0,
					geotif = sub_item.geotif,
					pdf = sub_item.pdf
				)
			for sub_item in sub_pdp_data_0:			
				sub_sub_pdp_data_0 = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_pdp_data_0:
					if sub_sub_item.status==1:
						sub_pdp_data_main= Sub_pdp_data.objects.filter(pdp_id=pdp.pk,sub_pdp_id=sub_item.sub_pdp_id.pk).first()
						Sub_sub_pdp_data.objects.create(
						Sub_pdp_data_id=sub_pdp_data_main,
						sub_sub_pdp_id=sub_sub_item.sub_sub_pdp_id,
						status=0,
						file=sub_sub_item.file
				)

			for sub_item in sub_pdp_data_0:	
				sub_sub_pdp_data_0 = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_pdp_data_0:
					sub_sub_item.my_delete()
				sub_item.my_delete()

			pdp.aholi_punktining_nomi=pdp_edit.aholi_punktining_nomi
			pdp.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =pdp_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi
			pdp.aholi_punktining_tipi=pdp_edit.aholi_punktining_tipi
			pdp.aholi_punktining_maqomi=pdp_edit.aholi_punktining_maqomi
			pdp.respublika_viloyat =pdp_edit.respublika_viloyat
			pdp.tuman_shahar = pdp_edit.tuman_shahar
			pdp.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =pdp_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv
			pdp.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =pdp_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy
			pdp.shahar_chegarasi_loyihasini_tasdiqlangan_organ =pdp_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ
			pdp.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =pdp_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san
			pdp.aholi_punktining_loyihaviy_maydoni_ga =pdp_edit.aholi_punktining_loyihaviy_maydoni_ga
			pdp.tasdiqlanganligi=pdp_edit.tasdiqlanganligi
			pdp.aholining_loyihaviy_soni =pdp_edit.aholining_loyihaviy_soni
			pdp.ishlab_chiqalgan_yili=pdp_edit.ishlab_chiqalgan_yili
			pdp.reja_qilingan_hujjat=pdp_edit.reja_qilingan_hujjat
			
			pdp.wkb_geometry=pdp_edit.wkb_geometry

			if pdp.grafik_malumot!='' and pdp.grafik_malumot!=pdp_edit.grafik_malumot:
				os.remove(str(pdp.grafik_malumot))
			pdp.grafik_malumot=pdp_edit.grafik_malumot
			
			if pdp.izohlovchi_malumot!='' and pdp.izohlovchi_malumot!=pdp_edit.izohlovchi_malumot:
				os.remove(str(pdp.izohlovchi_malumot))
			pdp.izohlovchi_malumot=pdp_edit.izohlovchi_malumot

			sub_pdp_data= Sub_pdp_data.objects.filter(pdp_id=pdp.pk)
			for sub_item in sub_pdp_data:			
				sub_sub_pdp_data = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_pdp_data:
					sub_sub_item.status==0
					sub_sub_item.save()
				sub_item.status=0
				sub_item.save()
			pdp.status=0
			pdp.id=pdp_edit.id
			pdp.save()

			pdp_edit.my_delete()
			return HttpResponse(1)
		else:
			for sub_item in sub_pdp_data_0:			
				sub_sub_pdp_data_0 = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_pdp_data_0:
					if sub_sub_item.status==1 or sub_sub_item.status==2:
						sub_sub_item.delete()
				if sub_item.status==1:
					if sub_item.layer_name!='':
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_item.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_item.layer_name)
							
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_item.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)
					sub_item.delete()
				elif sub_item.status==2:
					sub_pdp_data=Sub_pdp_data.objects.filter(pdp_id=pdp.pk,sub_pdp_id=sub_item.sub_pdp_id.pk).first()

					if sub_item.pdf!='' and sub_item.pdf!=sub_pdp_data.pdf:
						os.remove(str(sub_item.pdf))

					if sub_item.geotif!='' and sub_item.geotif!=sub_pdp_data.geotif:
						os.remove(str(sub_item.geotif))

						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_item.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_item.layer_name)
					
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_item.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)

					sub_item.my_delete()

			if pdp_edit.grafik_malumot!='' and pdp.grafik_malumot!=pdp_edit.grafik_malumot:
				os.remove(str(pdp_edit.grafik_malumot))
			
			if pdp_edit.izohlovchi_malumot!='' and pdp.izohlovchi_malumot!=pdp_edit.izohlovchi_malumot:
				os.remove(str(pdp_edit.izohlovchi_malumot))

			pdp_edit.my_delete()

			for sub_item in sub_pdp_data:			
				sub_sub_pdp_data = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_pdp_data:
					sub_sub_item.status==0
					sub_sub_item.save()
				sub_item.status=0
				sub_item.save()
			pdp.status=0
			pdp.save()
			return HttpResponse(0)
	else:
		return HttpResponse('/save_edit_pdp')


def copy_table_pdp(pdp_id):

	pdp = Pdps.objects.filter(pk=pdp_id).first()
	pdp_edit = Pdps_edit.objects.create(
					aholi_punktining_nomi=pdp.aholi_punktining_nomi,
					pdp_id=pdp,
					id=pdp.id,
					mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =pdp.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
					aholi_punktining_tipi=pdp.aholi_punktining_tipi,
					aholi_punktining_maqomi=pdp.aholi_punktining_maqomi,
					respublika_viloyat =pdp.respublika_viloyat,
					tuman_shahar = pdp.tuman_shahar,
					loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =pdp.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
					shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =pdp.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
					shahar_chegarasi_loyihasini_tasdiqlangan_organ = pdp.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
					shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =pdp.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
					aholi_punktining_loyihaviy_maydoni_ga =pdp.aholi_punktining_loyihaviy_maydoni_ga,
					aholining_loyihaviy_soni = pdp.aholining_loyihaviy_soni,
					ishlab_chiqalgan_yili=pdp.ishlab_chiqalgan_yili,
					reja_qilingan_hujjat=pdp.reja_qilingan_hujjat,
					tasdiqlanganligi=pdp.tasdiqlanganligi,
					grafik_malumot=pdp.grafik_malumot,
					izohlovchi_malumot=pdp.izohlovchi_malumot,
					wkb_geometry=pdp.wkb_geometry,
					status =2
				)
	pdp.status=2
	pdp.save()

	sub_pdp_datas = Sub_pdp_data.objects.filter(pdp_id=pdp_id)
	for sub_item in sub_pdp_datas:
		sub_pdp_data_edit = Sub_pdp_data_edit.objects.create(
		pdp_id=pdp_edit,
		sub_pdp_id=sub_item.sub_pdp_id,
		layer_name=sub_item.layer_name,
		status=sub_item.status,
		geotif = sub_item.geotif,
		pdf = sub_item.pdf
					)
	
		sub_sub_pdp_datas = Sub_sub_pdp_data.objects.filter(
			Sub_pdp_data_id=sub_item.pk)
		for sub_sub_item in sub_sub_pdp_datas:
			sub_sub_pdp_data_edit = Sub_sub_pdp_data_edit.objects.create(
				Sub_pdp_data_id=sub_pdp_data_edit,
				sub_sub_pdp_id=sub_sub_item.sub_sub_pdp_id,
				status=sub_sub_item.status,
				file=sub_sub_item.file
				)
	return pdp_edit.pk 

def save_pdp(request):
	if request.method=='POST':
		pdp_id=request.POST.get('pdp_id')
		pdp_edit = Pdps_edit.objects.filter(id=pdp_id).first()
		if request.POST.get('confirm')=='1':
			if pdp_edit:
				if not pdp_edit.pdp_id:
					pdp = Pdps.objects.create(
						aholi_punktining_nomi=pdp_edit.aholi_punktining_nomi,
						id=pdp_edit.id,										
						mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =pdp_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
						aholi_punktining_tipi=pdp_edit.aholi_punktining_tipi,
						aholi_punktining_maqomi=pdp_edit.aholi_punktining_maqomi,
						respublika_viloyat =pdp_edit.respublika_viloyat,
						tuman_shahar = pdp_edit.tuman_shahar,
						loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =pdp_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
						shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =pdp_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
						shahar_chegarasi_loyihasini_tasdiqlangan_organ = pdp_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
						shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =pdp_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
						aholi_punktining_loyihaviy_maydoni_ga =pdp_edit.aholi_punktining_loyihaviy_maydoni_ga,
						aholining_loyihaviy_soni = pdp_edit.aholining_loyihaviy_soni,
						ishlab_chiqalgan_yili=pdp_edit.ishlab_chiqalgan_yili,
						reja_qilingan_hujjat=pdp_edit.reja_qilingan_hujjat,
						tasdiqlanganligi=pdp_edit.tasdiqlanganligi,
						grafik_malumot=pdp_edit.grafik_malumot,
						izohlovchi_malumot=pdp_edit.izohlovchi_malumot,
						wkb_geometry=pdp_edit.wkb_geometry,
						status=0,
					)

					sub_pdp_datas_edit = Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk)
					for sub_item in sub_pdp_datas_edit:
						sub_pdp_data = Sub_pdp_data.objects.create(
							pdp_id=pdp,
							sub_pdp_id=sub_item.sub_pdp_id,
							layer_name=sub_item.layer_name,
							geotif = sub_item.geotif,
							pdf = sub_item.pdf,
							status=0
						)
						sub_sub_pdp_datas_edit = Sub_sub_pdp_data_edit.objects.filter(
							Sub_pdp_data_id=sub_item.pk)
						for sub_sub_item in sub_sub_pdp_datas_edit:
							sub_sub_pdp_data = Sub_sub_pdp_data.objects.create(
		                            Sub_pdp_data_id=sub_pdp_data,
		                            sub_sub_pdp_id=sub_sub_item.sub_sub_pdp_id,
		                            file=sub_sub_item.file,
		                            status=0
		                        )
							sub_sub_item.my_delete()
						sub_item.my_delete()
					pdp.status = 0
					pdp.save()
					pdp_edit.my_delete()
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				return HttpResponse(0)
		else:
			if pdp_edit:
				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk)
				for item in sub_pdp_data:
					try:
						url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+item.layer_name+"/?recurse=true"
						r = requests.delete(url, auth=('admin', 'uzgashk'))
						r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+item.layer_name)
						url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+item.layer_name+".xml"
						r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
					except IOError:
						return HttpResponse(-11)
				pdp_edit.delete()
				return HttpResponse(2)
			else:
				return HttpResponse(3)
	else:
		return HttpResponse('/save_pdp')

def edit_pdp_dialog_tabs(request):
	
	if request.method=='POST':

		d=request.POST
		pdp_id=d.get('pdp_id')
		status=d.get('status')
		if status=='1':

			pdp_edit= Pdps_edit.objects.get(id=pdp_id)
			pdp_data= serializers.serialize('geojson', [pdp_edit,])

			sub_pdp_data_edit = Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk)
			sub_pdp = Sub_pdp.objects.all().values()
			sub_sub_pdp = Sub_sub_pdp.objects.all().values()
			sub_sub_pdp_datas_edit = list()
		
			for item in sub_pdp_data_edit:
				sub_sub_pdp_data_edit = Sub_sub_pdp_data_edit.objects.filter(
	                Sub_pdp_data_id=item.id).values()

				if sub_sub_pdp_data_edit:
					sub_sub_pdp_datas_edit.append(list(sub_sub_pdp_data_edit))
			return JsonResponse(
	            [{'pdp_id': pdp_edit.pk,
	              'status': 1,
	              'pdp_data':pdp_data,
	              'sub_pdps': list(sub_pdp),
	              'sub_pdp_data': list(sub_pdp_data_edit.values()),
	              'sub_sub_pdps': list(sub_sub_pdp),
	              'sub_sub_pdp_datas': sub_sub_pdp_datas_edit
	              }],
	            safe=False)
		elif status=='2':

			pdp_edit= Pdps_edit.objects.get(id=pdp_id)
			pdp_data= serializers.serialize('geojson', [pdp_edit,])

			sub_pdp_data_edit = Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk)
			sub_pdp = Sub_pdp.objects.all().values()
			sub_sub_pdp = Sub_sub_pdp.objects.all().values()
			sub_sub_pdp_datas_edit = list()
		
			for item in sub_pdp_data_edit:
				sub_sub_pdp_data_edit = Sub_sub_pdp_data_edit.objects.filter(
	                Sub_pdp_data_id=item.id).values()

				if sub_sub_pdp_data_edit:
					sub_sub_pdp_datas_edit.append(list(sub_sub_pdp_data_edit))
			return JsonResponse(
	            [{'pdp_id': pdp_edit.pk,
	              'status': 2,
	              'pdp_data':pdp_data,
	              'sub_pdps': list(sub_pdp),
	              'sub_pdp_data': list(sub_pdp_data_edit.values()),
	              'sub_sub_pdps': list(sub_sub_pdp),
	              'sub_sub_pdp_datas': sub_sub_pdp_datas_edit
	              }],
	            safe=False)
		elif status=='0':
			pdp_edit= Pdps_edit.objects.filter(id=pdp_id).first()
			if pdp_edit:
				pdp_data= serializers.serialize('geojson', [pdp_edit,])

				sub_pdp_data_edit = Sub_pdp_data_edit.objects.filter(pdp_id=pdp_edit.pk)
				sub_pdp = Sub_pdp.objects.all().values()
				sub_sub_pdp = Sub_sub_pdp.objects.all().values()
				sub_sub_pdp_datas_edit = list()
			
				for item in sub_pdp_data_edit:
					sub_sub_pdp_data_edit = Sub_sub_pdp_data_edit.objects.filter(
		                Sub_pdp_data_id=item.id).values()

					if sub_sub_pdp_data_edit:
						sub_sub_pdp_datas_edit.append(list(sub_sub_pdp_data_edit))
				return JsonResponse(
		            [{'pdp_id': pdp_edit.pk,
		              'status': 2,
		              'pdp_data':pdp_data,
		              'sub_pdps': list(sub_pdp),
		              'sub_pdp_data': list(sub_pdp_data_edit.values()),
		              'sub_sub_pdps': list(sub_sub_pdp),
		              'sub_sub_pdp_datas': sub_sub_pdp_datas_edit
		              }],
		            safe=False)
			else:
				pdp= Pdps.objects.filter(id=pdp_id).first()
				
				pdp_data= serializers.serialize('geojson', [pdp,])

				sub_pdp_data = Sub_pdp_data.objects.filter(pdp_id=pdp.pk)
				sub_pdp = Sub_pdp.objects.all().values()
				sub_sub_pdp = Sub_sub_pdp.objects.all().values()
				sub_sub_pdp_datas = list()
			
				for item in sub_pdp_data:
					sub_sub_pdp_data = Sub_sub_pdp_data.objects.filter(
		                Sub_pdp_data_id=item.id).values()

					if sub_sub_pdp_data:
						sub_sub_pdp_datas.append(list(sub_sub_pdp_data))
				return JsonResponse(
		            [{'pdp_id': pdp.pk,
		              'status': 0,
		              'pdp_data':pdp_data,
		              'sub_pdps': list(sub_pdp),
		              'sub_pdp_data': list(sub_pdp_data.values()),
		              'sub_sub_pdps': list(sub_sub_pdp),
		              'sub_sub_pdp_datas': sub_sub_pdp_datas
		              }],
		            safe=False)
		else:
			pdp= Pdps.objects.filter(id=pdp_id).first()
			pdp_data= serializers.serialize('geojson', [pdp,])

			sub_pdp_data = Sub_pdp_data.objects.filter(pdp_id=pdp.pk)
			sub_pdp = Sub_pdp.objects.all().values()
			sub_sub_pdp = Sub_sub_pdp.objects.all().values()
			sub_sub_pdp_datas = list()
			
			for item in sub_pdp_data:
				sub_sub_pdp_data = Sub_sub_pdp_data.objects.filter(
		                Sub_pdp_data_id=item.id).values()

				if sub_sub_pdp_data:
					sub_sub_pdp_datas.append(list(sub_sub_pdp_data))
			return JsonResponse(
		            [{'pdp_id': pdp.pk,
		              'status': 3,
		              'pdp_data':pdp_data,
		              'sub_pdps': list(sub_pdp),
		              'sub_pdp_data': list(sub_pdp_data.values()),
		              'sub_sub_pdps': list(sub_sub_pdp),
		              'sub_sub_pdp_datas': sub_sub_pdp_datas
		              }],
		            safe=False)
	else:
		return HttpResponse('/edit_pdp_dialog_tabs')


def create_pdp(request):
	if request.method=='POST':
		data=request.POST
		if data.get('pdp_id')=='-1':

			obj = Pdps_edit.objects.create(
	        	aholi_punktining_nomi=data.get('pdp_ahpn'),
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('pdp_soata'),
				aholi_punktining_tipi=data.get('pdp_apt'),
				aholi_punktining_maqomi=data.get('pdp_apm'),
				respublika_viloyat = data.get('pdp_vil'),
				tuman_shahar = data.get('pdp_tum_shah'),
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('pdp_lt'),
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('pdp_shchsj'),
				shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('pdp_to'),
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('pdp_lhr'),
				aholi_punktining_loyihaviy_maydoni_ga = data.get('pdp_aplm'),
				aholining_loyihaviy_soni = data.get('pdp_als'),
				ishlab_chiqalgan_yili=data.get('pdp_ichy'),
				reja_qilingan_hujjat=data.get('pdp_rqh'),
				tasdiqlanganligi=data.get('pdp_thm'),
				grafik_malumot=request.FILES.get('pdp_gm'),
				izohlovchi_malumot=request.FILES.get('pdp_im'),
	        	wkb_geometry=GEOSGeometry(data.get('geometry')),
	        	status=1)
			obj.id='pdp_'+str(obj.pk)
			obj.save()

			return JsonResponse({'status':1,'pdp_id':obj.pk})
		else:

			if data.get('status')=='1':

				obj=Pdps_edit.objects.get(pk=int(data.get('pdp_id')))
				obj.aholi_punktining_nomi=data.get('pdp_ahpn')
				obj.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('pdp_soata')
				obj.aholi_punktining_tipi=data.get('pdp_apt')
				obj.aholi_punktining_maqomi=data.get('pdp_apm')
				obj.respublika_viloyat = data.get('pdp_vil')
				obj.tuman_shahar = data.get('pdp_tum_shah')
				obj.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('pdp_lt')
				obj.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('pdp_shchsj')
				obj.shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('pdp_to')
				obj.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('pdp_lhr')
				obj.aholi_punktining_loyihaviy_maydoni_ga = data.get('pdp_aplm')
				obj.tasdiqlanganligi=data.get('pdp_thm')
				obj.aholining_loyihaviy_soni = data.get('pdp_als')
				obj.ishlab_chiqalgan_yili=data.get('pdp_ichy')
				obj.reja_qilingan_hujjat=data.get('pdp_rqh')

				if request.FILES.get('pdp_gm',False):
					if obj.grafik_malumot!='':
						os.remove(str(obj.grafik_malumot))
					obj.grafik_malumot=request.FILES.get('pdp_gm')

				if request.FILES.get('pdp_im',False):
					if obj.izohlovchi_malumot!='':
						os.remove(str(obj.izohlovchi_malumot))
					obj.izohlovchi_malumot=request.FILES.get('pdp_im')

				obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
				
				obj.save()

				return JsonResponse({'status':1,'pdp_id':data.get('pdp_id')})

			elif data.get('status')=='0' or data.get('status')=='2':


				if data.get('status')=='0':

					pdp_0 = Pdps.objects.get(pk=data.get('pdp_id'))
					pdp = Pdps_edit.objects.filter(pdp_id=pdp_0.pk).first()
					if not pdp:
						edit_pdp_id=copy_table_pdp(data.get('pdp_id'))
					else:
						edit_pdp_id=pdp.pk
				else:
					edit_pdp_id=data.get('pdp_id')

				obj = Pdps_edit.objects.filter(pk=edit_pdp_id).first()
				obj_0 = Pdps.objects.filter(pk=obj.pdp_id.pk).first()
					
				obj.aholi_punktining_nomi=data.get('pdp_ahpn')
				obj.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('pdp_soata')
				obj.aholi_punktining_tipi=data.get('pdp_apt')
				obj.aholi_punktining_maqomi=data.get('pdp_apm')
				obj.respublika_viloyat = data.get('pdp_vil')
				obj.tuman_shahar = data.get('pdp_tum_shah')
				obj.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('pdp_lt')
				obj.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('pdp_shchsj')
				obj.shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('pdp_to')
				obj.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('pdp_lhr')
				obj.aholi_punktining_loyihaviy_maydoni_ga = data.get('pdp_aplm')
				obj.aholining_loyihaviy_soni = data.get('pdp_als')
				obj.ishlab_chiqalgan_yili=data.get('pdp_ichy')
				obj.reja_qilingan_hujjat=data.get('pdp_rqh')
				obj.tasdiqlanganligi=data.get('pdp_thm')

				obj.wkb_geometry=GEOSGeometry(data.get('geometry'))

				if request.FILES.get('pdp_gm',False):
					if obj.grafik_malumot!='' and obj.grafik_malumot!=obj_0.grafik_malumot:
						os.remove(str(obj.grafik_malumot))
					obj.grafik_malumot=request.FILES.get('pdp_gm')
					print('grafik_malumot')

				if request.FILES.get('pdp_im',False):

					if obj.izohlovchi_malumot!='' and obj.izohlovchi_malumot!=obj_0.izohlovchi_malumot:
						os.remove(str(obj.izohlovchi_malumot))
					obj.izohlovchi_malumot=request.FILES.get('pdp_im')
					print('izohlovchi_malumot')

				obj.save()

				return JsonResponse({'status':2,'pdp_id':edit_pdp_id})

	else:
		return HttpResponse('/create_pdp')

def delete_pdp(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='first_delete':
			if data.get('pdp_id')!='-1':
				pdp = Pdps_edit.objects.filter(pk=data.get('pdp_id')).first()
				if pdp:
					sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=pdp.pk)
					for item in sub_pdp_data:
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+item.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+item.layer_name)
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+item.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)
					pdp.delete()
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				return HttpResponse(0)
		elif data.get('type')=='last_delete':

			pdp = Pdps.objects.filter(id=data.get('pdp_id')).first()
			pdp_0 = Pdps_edit.objects.filter(pdp_id=pdp.pk,status=3).first()

			if pdp_0:
				return HttpResponse(pdp_0.pk)
			else:
				pdp_edit = Pdps_edit.objects.create(
						aholi_punktining_nomi=pdp.aholi_punktining_nomi,
						pdp_id=pdp,
						id=pdp.id,			
						mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =pdp.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
						aholi_punktining_tipi=pdp.aholi_punktining_tipi,
						aholi_punktining_maqomi=pdp.aholi_punktining_maqomi,
						respublika_viloyat = pdp.respublika_viloyat,
						tuman_shahar = pdp.tuman_shahar,
						loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =pdp.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
						shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =pdp.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
						shahar_chegarasi_loyihasini_tasdiqlangan_organ = pdp.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
						shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =pdp.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
						aholi_punktining_loyihaviy_maydoni_ga =pdp.aholi_punktining_loyihaviy_maydoni_ga,
						aholining_loyihaviy_soni =pdp.aholining_loyihaviy_soni,
						ishlab_chiqalgan_yili=pdp.ishlab_chiqalgan_yili,
						reja_qilingan_hujjat=pdp.reja_qilingan_hujjat,
						tasdiqlanganligi=pdp.tasdiqlanganligi,
						grafik_malumot=pdp.grafik_malumot,
						izohlovchi_malumot=pdp.izohlovchi_malumot,
			        	wkb_geometry=pdp.wkb_geometry,
			        	status=3   
					)
				pdp.status=3
				pdp.save()

				return HttpResponse(0)	
		elif data.get('type')=='admin_delete':
			if data.get('confirm')=='1':
				pdp = Pdps.objects.filter(id=data.get('pdp_id'),status=4).first()
				if not pdp:
					pdp = Pdps.objects.filter(id=data.get('pdp_id')).first()
					pdp.status=4
					pdp.save()
					result=Pdps_edit.objects.filter(pdp_id=pdp.pk)
					for obj in result:
						obj.my_delete()
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				pdp = Pdps.objects.filter(id=data.get('pdp_id')).first()
				pdp_edit = Pdps_edit.objects.filter(pdp_id=pdp.pk,status=3).first()
				if pdp_edit:					
					pdp.status=0
					pdp.save()
					pdp_edit.my_delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)

	else:
		return HttpResponse('/delete_pdp')	

def delete_sub_sub_pdp_data(request):
	if request.method=='POST':
		data = request.POST
		status=data.get('status')
		if status=='1':
			if data.get('type')=='main_files':
				if data.get('file_type')=='gm':
					if data.get('pdp_id')!='-1':
						pdp_edit = Pdps_edit.objects.filter(pk=data.get('pdp_id')).first()
						if pdp_edit.grafik_malumot!='':
							os.remove(str(pdp_edit.grafik_malumot))
							pdp_edit.grafik_malumot=''
							pdp_edit.save()
						return JsonResponse({'status':1,'pdp_id':pdp_edit.pk, 'file_type': data.get('file_type')})
					else:
						return JsonResponse({'status':1,'pdp_id':data.get('pdp_id'), 'file_type': data.get('file_type')})
				if data.get('file_type')=='im':
					if data.get('pdp_id')!='-1':
						pdp_edit = Pdps_edit.objects.filter(pk=data.get('pdp_id')).first()
						if pdp_edit.izohlovchi_malumot!='':
							os.remove(str(pdp_edit.izohlovchi_malumot))
							pdp_edit.izohlovchi_malumot=''
							pdp_edit.save()
						return JsonResponse({'status':1,'pdp_id':pdp_edit.pk, 'file_type': data.get('file_type')})
					else:
						return JsonResponse({'status':1,'pdp_id':data.get('pdp_id'), 'file_type': data.get('file_type')})

			elif data.get('type')=='delete_sub_all':
				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=data.get('pdp_id'),
				sub_pdp_id=data.get('sub_pdp_id')).first()
				if sub_pdp_data:
					if sub_pdp_data.layer_name!='':
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_pdp_data.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_pdp_data.layer_name)
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_pdp_data.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)

					sub_pdp_data.delete()

					return JsonResponse({'status':1,'pdp_id':data.get('pdp_id'), 'sub_pdp_id': data.get('sub_pdp_id')})
				else:
					return HttpResponse(0)
			elif data.get('type')=='delete_pdf_file':
				
				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=data.get('pdp_id'),
					sub_pdp_id=data.get('sub_pdp_id')).first()
				if sub_pdp_data:
					if sub_pdp_data.pdf!='':
						if sub_pdp_data.pdf!='':
							os.remove(str(sub_pdp_data.pdf))
						sub_pdp_data.pdf=''
						sub_pdp_data.save()

						return JsonResponse({'status':1,'pdp_id':data.get('pdp_id'), 'sub_pdp_id': data.get('sub_pdp_id')})
					else:
						return HttpResponse(0)	
				else:
					return HttpResponse(0)

			elif data.get('type')=='sub_sub_pdp':

				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=data.get('pdp_id'),
					sub_pdp_id=data.get('sub_pdp_id')).first()
				if sub_pdp_data:
					sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk,
						sub_sub_pdp_id=data.get('sub_sub_pdp_id')).first()

					if sub_sub_pdp_data:
						sub_sub_pdp_data.delete()
						return JsonResponse({'status':1,'pdp_id':data.get('pdp_id'), 'sub_pdp_id': data.get('sub_pdp_id'), 'sub_sub_pdp_id': data.get('sub_sub_pdp_id')})
					else:
						return HttpResponse(0)
				else:
					return HttpResponse(0)
			elif data.get('type')=='sub_pdp':
				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=data.get('pdp_id'),sub_pdp_id=data.get('sub_pdp_id')).first()
				if sub_pdp_data:
					if sub_pdp_data.geotif!='':
						sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk)
						for obj in sub_sub_pdp_data:
							obj.delete()
						if sub_pdp_data.geotif!='':
							os.remove(str(sub_pdp_data.geotif))
							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_pdp_data.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_pdp_data.layer_name)
								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_pdp_data.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
							except IOError:
								return HttpResponse(-11)

						sub_pdp_data.geotif=''
						sub_pdp_data.layer_name=''
						sub_pdp_data.save()
						return JsonResponse({'status':1,'pdp_id':data.get('pdp_id'), 'sub_pdp_id': data.get('sub_pdp_id')})
					else:
						return HttpResponse(0)	
				else:
					return HttpResponse(0)
		elif status=='0' or status=='2':

			if status=='0':
				print(0)

				pdp_0 = Pdps.objects.get(pk=data.get('pdp_id'))
				pdp = Pdps_edit.objects.filter(pdp_id=pdp_0.pk).first()
				if not pdp:
					edit_pdp_id=copy_table_pdp(data.get('pdp_id'))
					print('kuchirildi!!')
					
				else:
					edit_pdp_id=pdp.pk
			else:
				edit_pdp_id=data.get('pdp_id')
			
			pdp = Pdps_edit.objects.filter(pk=edit_pdp_id).first()
			pdp_0 = Pdps.objects.filter(pk=pdp.pdp_id.pk).first()
			
			if data.get('type')=='main_files':
				if data.get('file_type')=='gm':
					if pdp.grafik_malumot!='' and pdp.grafik_malumot!=pdp_0.grafik_malumot:
						os.remove(str(pdp.grafik_malumot))
					pdp.grafik_malumot=''
					pdp.save()
					return JsonResponse({'status':2,'pdp_id':pdp.pk, 'file_type': data.get('file_type')})
				
				if data.get('file_type')=='im':
					if pdp.izohlovchi_malumot!='' and pdp.izohlovchi_malumot!=pdp_0.izohlovchi_malumot:
						os.remove(str(pdp.izohlovchi_malumot))
					pdp.izohlovchi_malumot=''
					pdp.save()
					return JsonResponse({'status':2,'pdp_id':pdp.pk, 'file_type': data.get('file_type')})

			elif data.get('type')=='delete_sub_all':
				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=edit_pdp_id,sub_pdp_id=data.get('sub_pdp_id')).first()
				sub_pdp_data_0 = Sub_pdp_data.objects.filter(pdp_id=pdp.pdp_id.pk,sub_pdp_id=data.get('sub_pdp_id')).first()

				if sub_pdp_data:

					if sub_pdp_data_0:
						sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk)
						for item in sub_sub_pdp_data:
							if item.status!=0 and item.status!=3:
								item.delete()
							else:
								item.my_delete()

						if sub_pdp_data_0.pdf!=sub_pdp_data.pdf and sub_pdp_data.pdf!='':
							os.remove(str(sub_pdp_data.pdf))

						if sub_pdp_data_0.geotif!=sub_pdp_data.geotif and sub_pdp_data.geotif!='':
							os.remove(str(sub_pdp_data.geotif))
							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_pdp_data.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_pdp_data.layer_name)
								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_pdp_data.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))			
							except IOError:
								return HttpResponse(-11)

						sub_pdp_data_0.status=3
						sub_pdp_data_0.save()
						sub_pdp_data.my_delete()

					else:
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_pdp_data.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_pdp_data.layer_name)
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_pdp_data.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)


						sub_pdp_data.delete()
					return JsonResponse({'status':2,'pdp_id':edit_pdp_id, 'sub_pdp_id': data.get('sub_pdp_id')})
				else:
					return HttpResponse(0)

			elif data.get('type')=='delete_pdf_file':
				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=edit_pdp_id,sub_pdp_id=data.get('sub_pdp_id')).first()
				sub_pdp_data_0 = Sub_pdp_data.objects.filter(pdp_id=pdp.pdp_id.pk,sub_pdp_id=data.get('sub_pdp_id')).first()


				if sub_pdp_data:
					
					if sub_pdp_data_0:
						if sub_pdp_data.pdf!='' and sub_pdp_data.pdf!=sub_pdp_data_0.pdf:
							os.remove(str(sub_pdp_data.pdf))
						sub_pdp_data.pdf=''
						sub_pdp_data.save()
						sub_pdp_data_0.status=2
						sub_pdp_data_0.save()
					else:
						if sub_pdp_data.pdf!='':
							os.remove(str(sub_pdp_data.pdf))
						sub_pdp_data.pdf=''
						sub_pdp_data.save()
					
					return JsonResponse({'status':2,'pdp_id':edit_pdp_id, 'sub_pdp_id': data.get('sub_pdp_id')})
				else:
					return HttpResponse(0)
			
			elif data.get('type')=='sub_sub_pdp':

				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=edit_pdp_id,
					sub_pdp_id=data.get('sub_pdp_id')).first()
				sub_pdp_data_0 = Sub_pdp_data.objects.filter(pdp_id=pdp.pdp_id.pk,
					sub_pdp_id=data.get('sub_pdp_id')).first()
				if sub_pdp_data:
					sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk,
						sub_sub_pdp_id=data.get('sub_sub_pdp_id')).first()
					if sub_pdp_data_0:
						sub_sub_pdp_data_0 = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=sub_pdp_data_0.pk,
						sub_sub_pdp_id=data.get('sub_sub_pdp_id')).first()

					if sub_sub_pdp_data:
						
						if sub_pdp_data_0:

							if sub_sub_pdp_data_0:
	
								sub_sub_pdp_data_0.status=3
								sub_sub_pdp_data_0.save()
								if sub_sub_pdp_data.status!=0:
									sub_sub_pdp_data.delete()
								else:
									sub_sub_pdp_data.my_delete()
							else:
								sub_sub_pdp_data.delete()
						else:
							sub_sub_pdp_data.delete()
						return JsonResponse({'status':2,'pdp_id':edit_pdp_id, 'sub_pdp_id': data.get('sub_pdp_id'), 'sub_sub_pdp_id': data.get('sub_sub_pdp_id')})
					else:
						return HttpResponse(0)
				return HttpResponse(0)
			elif data.get('type')=='sub_pdp':

				sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=edit_pdp_id,sub_pdp_id=data.get('sub_pdp_id')).first()
				sub_pdp_data_0 = Sub_pdp_data.objects.filter(pdp_id=pdp.pdp_id.pk,sub_pdp_id=data.get('sub_pdp_id')).first()
				if sub_pdp_data:
					if sub_pdp_data_0:
						sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk)
						for x in sub_sub_pdp_data:
							sub_sub_pdp_data_0 = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=sub_pdp_data_0.pk,
					     	sub_sub_pdp_id=x.sub_sub_pdp_id).first()
							if sub_sub_pdp_data_0:
								sub_sub_pdp_data_0.status=3
								sub_sub_pdp_data_0.save()
								if x.status!=0:
									x.delete()
								else:
									x.my_delete()
							else:
								x.delete()
						if sub_pdp_data_0.geotif!=sub_pdp_data.geotif and sub_pdp_data.geotif!='':
							os.remove(str(sub_pdp_data.geotif))
							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_pdp_data.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_pdp_data.layer_name)

								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_pdp_data.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
							except IOError:
								return HttpResponse(-11)
						sub_pdp_data.geotif=''
						sub_pdp_data.layer_name=''
						sub_pdp_data.save()
						sub_pdp_data_0.status=2
						sub_pdp_data_0.save()

					else:
						sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk)
						for x in sub_sub_pdp_data:
							x.delete()

						if sub_pdp_data.geotif!='':
							os.remove(str(sub_pdp_data.geotif))
						
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_pdp_data.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_pdp_data.layer_name)
						
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_pdp_data.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)

						sub_pdp_data.geotif=''
						sub_pdp_data.save()

					return JsonResponse({'status':2,'pdp_id':edit_pdp_id, 'sub_pdp_id': data.get('sub_pdp_id')})
				else:
					return HttpResponse(0)
			return HttpResponse(0)
	else:
		return HttpResponse('/delete_sub_sub_pdp_data')


	return HttpResponse(1)


def create_sub_sub_pdp_data(request):
	if request.method=='POST':
		data = request.POST
		geotif_file=request.FILES.get('geotif_file',False)
		pdf_file=request.FILES.get('pdf_file',False)
		status=data.get('status')
		pdf_check=0
		geotif_check=0
		items_index_check=0
		if status=='1':
			items_index=data.get('itemsIndex').split(',')
			pdp = Pdps_edit.objects.get(pk=data.get('pdp_id'))
			print(pdp)
			sub_pdp = Sub_pdp.objects.get(pk=data.get('sub_pdp_id'))

			sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=pdp.pk,sub_pdp_id=sub_pdp.pk).first()

			if not sub_pdp_data:
				if geotif_file:

					sub_pdp_data = Sub_pdp_data_edit.objects.create(
					pdp_id=pdp,
					sub_pdp_id=sub_pdp,
					status=1,
					geotif=geotif_file
					)
					try:
						headers = {'Content-type': 'image/tiff'}
						url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'/file.geotiff'
						r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
						if r.status_code!=201:
							return HttpResponse(-11)
							
					except IOError:
						return HttpResponse(-11)

					sub_pdp_data.layer_name=str(pdp.id)+'_'+str(data.get('sub_pdp_id'))
					sub_pdp_data.save()

					print('create layer')
					geotif_check=1

			else:
				if geotif_file:
					if sub_pdp_data.geotif!='':
						os.remove(str(sub_pdp_data.geotif))

					try:
						headers = {'Content-type': 'image/tiff'}
						url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'/file.geotiff'
						
						url2="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+"/?recurse=true"
						r2 = requests.delete(url2, auth=('admin', 'uzgashk'))
						r20 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+str(pdp.id)+'_'+str(data.get('sub_pdp_id')))
						
						url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+".xml"
						r3 = requests.delete(url3, auth=('admin', 'uzgashk'))


						r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
						if r.status_code!=201:
							return HttpResponse(-11)
					except IOError:
						return HttpResponse(-11)
					print('update layer')
					
					sub_pdp_data.geotif = geotif_file
					sub_pdp_data.layer_name=str(pdp.id)+'_'+str(data.get('sub_pdp_id'))
					sub_pdp_data.save()
					geotif_check=1

			sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=pdp.pk,sub_pdp_id=sub_pdp.pk).first()

			if not sub_pdp_data:
				if pdf_file:
					sub_pdp_data = Sub_pdp_data_edit.objects.create(
					pdp_id=pdp,
					sub_pdp_id=sub_pdp,
					status=1,
					pdf=pdf_file
					)
					pdf_check=1
					print('create layer with out geotif')
				else:
					return HttpResponse(-12)
			else:
				if pdf_file:
					if sub_pdp_data.pdf!='':
						os.remove(str(sub_pdp_data.pdf))
					sub_pdp_data.pdf = pdf_file
					sub_pdp_data.save()
					print('update layer pdf')
					pdf_check=1

			if sub_pdp_data.geotif!='':
				items_index_check=1
				for index in items_index:
					if index!='':
						sub_sub_pdp = Sub_sub_pdp.objects.get(pk=index)
						sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk,
						sub_sub_pdp_id=sub_sub_pdp.pk).first()

						if sub_sub_pdp_data:
			                # update
							print('update')
							print(sub_sub_pdp_data.file)
							os.remove(str(sub_sub_pdp_data.file))
							sub_sub_pdp_data.file = request.FILES['sub_pdp_' + index]
							sub_sub_pdp_data.save()

						else:
			                # create
							print('create')
							sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.create(
								Sub_pdp_data_id=sub_pdp_data,
								sub_sub_pdp_id=sub_sub_pdp,
								file=request.FILES['sub_pdp_' + index],
								status=1 
							  )


			return JsonResponse({'status':1,'pdp_id': data.get('pdp_id'), 'sub_pdp_id': data.get('sub_pdp_id'), 'pdf_check':pdf_check, 'geotif_check':geotif_check,'items_index_check':items_index_check, 'sub_sub_pdp_ids': items_index})

		elif status=='0' or status=='2':
			if status=='0':
				pdp_0 = Pdps.objects.get(pk=data.get('pdp_id'))
				pdp = Pdps_edit.objects.filter(pdp_id=pdp_0.pk).first()
				if not pdp:
					edit_pdp_id=copy_table_pdp(data.get('pdp_id'))
					print('kuchirildi!!')
				else:
					edit_pdp_id=pdp.pk
			elif status=='2':
				edit_pdp_id=data.get('pdp_id')

			items_index=data.get('itemsIndex').split(',')
			pdp = Pdps_edit.objects.get(pk=edit_pdp_id)
			sub_pdp = Sub_pdp.objects.get(pk=data.get('sub_pdp_id'))

			sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=pdp.pk,sub_pdp_id=sub_pdp.pk).first()
			sub_pdp_data_0=Sub_pdp_data.objects.filter(pdp_id=pdp.pdp_id.pk,sub_pdp_id=sub_pdp.pk).first()
			if sub_pdp_data_0 and sub_pdp_data:
				status=2
				sub_pdp_data_0.status =2
				sub_pdp_data_0.save()
			else:
				status=1
			if not sub_pdp_data:
				if geotif_file:
					sub_pdp_data = Sub_pdp_data_edit.objects.create(
					pdp_id=pdp,
					sub_pdp_id=sub_pdp,
					status=status,
					geotif=geotif_file
					)

					try:
						headers = {'Content-type': 'image/tiff'}
						url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(pdp.id)+'_'+data.get('sub_pdp_id')+'/file.geotiff'
						r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
						if r.status_code!=201:
							return HttpResponse(-11)
					except IOError:
						return HttpResponse(-11)

					sub_pdp_data.layer_name=str(pdp.id)+'_'+str(data.get('sub_pdp_id'))
					sub_pdp_data.save()

					geotif_check=1
					print('create layer')

			else:
				if geotif_file:
			
					if sub_pdp_data_0:
						if sub_pdp_data.geotif!='' and sub_pdp_data.geotif!=sub_pdp_data_0.geotif:
							os.remove(str(sub_pdp_data.geotif))

						try:
							headers = {'Content-type': 'image/tiff'}
							url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'_'+str(sub_pdp_data.pk)+'/file.geotiff'
							
							url2="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'_'+str(sub_pdp_data.pk)+"/?recurse=true"
							r2 = requests.delete(url2, auth=('admin', 'uzgashk'))
							r20 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'_'+str(sub_pdp_data.pk))
						
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'_'+str(sub_pdp_data.pk)+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))

							r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
							if r.status_code!=201:
								return HttpResponse(-11)
						except IOError:
							return HttpResponse(-11)

						sub_pdp_data.layer_name=str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'_'+str(sub_pdp_data.pk)
						sub_pdp_data.geotif = geotif_file
						sub_pdp_data.status = 2
						sub_pdp_data.save()
						sub_pdp_data_0.status =2
						sub_pdp_data_0.save()
					else:
						if sub_pdp_data.geotif!='':
							os.remove(str(sub_pdp_data.geotif))	

						try:
							headers = {'Content-type': 'image/tiff'}
							url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(pdp.id)+'_'+str(data.get('sub_pdp_id'))+'/file.geotiff'
							r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
							if r.status_code!=201:
								return HttpResponse(-11)
						except IOError:
							return HttpResponse(-11)

						sub_pdp_data.geotif = geotif_file
						sub_pdp_data.layer_name=str(pdp.id)+'_'+str(data.get('sub_pdp_id'))
						sub_pdp_data.status = 1
						sub_pdp_data.save()

					geotif_check=1
					print('update layer 2')
			sub_pdp_data = Sub_pdp_data_edit.objects.filter(pdp_id=pdp.pk,sub_pdp_id=sub_pdp.pk).first()

			if not sub_pdp_data:
				if pdf_file:
					sub_pdp_data = Sub_pdp_data_edit.objects.create(
					pdp_id=pdp,
					sub_pdp_id=sub_pdp,
					status=status,
					pdf=pdf_file
					)
					pdf_check=1
					print('create layer with out geotif')
				else:
					return HttpResponse(-12)
			else:
				if pdf_file:
					if sub_pdp_data.pdf!='' and sub_pdp_data.pdf!=sub_pdp_data_0.pdf:
						os.remove(str(sub_pdp_data.pdf))					
					if sub_pdp_data_0:
						sub_pdp_data.pdf = pdf_file
						sub_pdp_data.status = 2
						sub_pdp_data.save()
						sub_pdp_data_0.status =2
						sub_pdp_data_0.save()
					else:
						sub_pdp_data.pdf = pdf_file
						sub_pdp_data.status = 1
						sub_pdp_data.save()
					pdf_check=1

			if sub_pdp_data.geotif!='':
				items_index_check=1
				for index in items_index:
					if index!='':
						sub_sub_pdp = Sub_sub_pdp.objects.get(pk=index)
						sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=sub_pdp_data.pk,
						sub_sub_pdp_id=sub_sub_pdp.pk).first()

						if sub_sub_pdp_data:
			                # update
							print('update 2')
							if sub_sub_pdp_data.status!=0:
								os.remove(str(sub_sub_pdp_data.file))
							sub_sub_pdp_data.file = request.FILES['sub_pdp_' + index]

							if sub_pdp_data_0:
								sub_sub_pdp_data_0 = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=sub_pdp_data_0.pk,
								sub_sub_pdp_id=sub_sub_pdp.pk).first()
								if sub_sub_pdp_data_0:							
									sub_sub_pdp_data.status = 2  
									sub_sub_pdp_data_0.status=2
									sub_sub_pdp_data_0.save()

							sub_sub_pdp_data.save()

						else:
							print('create')
							sub_sub_pdp_data = Sub_sub_pdp_data_edit.objects.create(
								Sub_pdp_data_id=sub_pdp_data,
								sub_sub_pdp_id=sub_sub_pdp,
								status=1,
								file=request.FILES['sub_pdp_' + index],
							  )
			return JsonResponse({'status':2,'pdp_id':edit_pdp_id, 'sub_pdp_id': data.get('sub_pdp_id'), 'pdf_check':pdf_check, 'geotif_check':geotif_check,'items_index_check':items_index_check, 'sub_sub_pdp_ids': items_index})

		else:
			return HttpResponse(-10)
	else:
		return HttpResponse('/create_sub_sub_pdp_data')
def list_sub_pdp(request):
	if request.method=='POST':
		sub_pdps = Sub_pdp.objects.all().values()
		sub_sub_pdps = Sub_sub_pdp.objects.all().values()
		return JsonResponse([{'sub_pdps': list(sub_pdps), 'sub_sub_pdps': list(sub_sub_pdps)}],safe=False)
	else:
		return HttpResponse('/list_sub_pdp')







def pdp_dialog_view(request):
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
			data1=Sub_pdp_data.objects.filter(pdp_id__id=request.POST.get('id')).order_by('sub_pdp_id__zindex')
			text='['
			w=1
			for i in data1:
				
				if sessia['status']==-1:
					if i.sub_pdp_id.public_private=='1':
						text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
					if i.sub_pdp_id.public_private=='2':
						text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
					if i.sub_pdp_id.public_private=='3':
						text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"","data":['
					if i.sub_pdp_id.public_private=='4':
						text=text+'{"sub_name":"","pdf":"","zindex":"","layer_name":"","data":['
				else:
					text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
				

				data2=Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=i.id).order_by('sub_sub_pdp_id__index')
				z=1
				for x in data2:
					text=text+'{"nomi":"'+str(x.sub_sub_pdp_id)+'","file_name":"'+str(x.file)+'"}'
					if z!=len(data2):
						text=text+','
					z=z+1
				text=text+']}'
				if w!=len(data1):
					text=text+','
				w=w+1
			text=text+']'
			return JsonResponse([{'json':json.loads(text),'sessia':sessia}],safe=False)
		elif request.POST.get('status')=='1' or request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				data1=Sub_pdp_data.objects.filter(pdp_id__id=request.POST.get('id')).order_by('sub_pdp_id__zindex')
				text='['
				w=1
				for i in data1:

					if sessia['status']==-1:
						if i.sub_pdp_id.public_private=='1':
							text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
						if i.sub_pdp_id.public_private=='2':
							text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
						if i.sub_pdp_id.public_private=='3':
							text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"","data":['
						if i.sub_pdp_id.public_private=='4':
							text=text+'{"sub_name":"","pdf":"","zindex":"","layer_name":"","data":['
					else:
						text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
				
					data2=Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=i.id).order_by('sub_sub_pdp_id__index')
					z=1
					for x in data2:
						text=text+'{"nomi":"'+str(x.sub_sub_pdp_id)+'","file_name":"'+str(x.file)+'"}'
						if z!=len(data2):
							text=text+','
						z=z+1
					text=text+']}'
					if w!=len(data1):
						text=text+','
					w=w+1
				text=text+']'
			else:
				data1=Sub_pdp_data_edit.objects.filter(pdp_id__id=request.POST.get('id')).order_by('sub_pdp_id__zindex')
				text='['
				w=1
				for i in data1:

					text=text+'{"sub_name":"'+str(i.sub_pdp_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_pdp_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
					data2=Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=i.id).order_by('sub_sub_pdp_id__index')
					z=1
					for x in data2:
						text=text+'{"nomi":"'+str(x.sub_sub_pdp_id)+'","file_name":"'+str(x.file)+'"}'
						if z!=len(data2):
							text=text+','
						z=z+1
					text=text+']}'
					if w!=len(data1):
						text=text+','
					w=w+1
				text=text+']'
			
			return JsonResponse([{'json':json.loads(text),'sessia':sessia}],safe=False)

	else:
		return HttpResponse('/dialog_view')
