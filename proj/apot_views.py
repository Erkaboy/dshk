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

from proj.apot_models import Apots,Apots_edit,Sub_apot,Sub_apot_data,Sub_apot_data_edit

from django.core import serializers

from django.db.models import Q

from .models import ApotOld



def delete_apot_data(request):
	if request.method=='POST':
		data = request.POST
		status=data.get('status')
		if status=='1':
			if data.get('apot_id')!='-1':
				sub_apot_data=Sub_apot_data_edit.objects.filter(apot_id=data.get('apot_id'),sub_apot_id=data.get('sub_apot_id')).first()
				if sub_apot_data:
					sub_apot_data.delete()
				return JsonResponse({'status':1,'apot_id':data.get('apot_id'), 'sub_apot_id': data.get('sub_apot_id')})
			else:
				return JsonResponse({'status':1,'apot_id':data.get('apot_id'), 'sub_apot_id': data.get('sub_apot_id')})
		elif status=='0' or status=='2':
			if status=='0':
				print(data.get('apot_id'))
				apot_edit = Apots_edit.objects.filter(apot_id=data.get('apot_id')).first()
				print(apot_edit)
				if not apot_edit:
					edit_apot_id=copy_table_apot(data.get('apot_id'))
		
				else:
					edit_apot_id=apot_edit.pk
			else:
				edit_apot_id=data.get('apot_id')
			
			apot_edit = Apots_edit.objects.filter(pk=edit_apot_id).first()
			
			sub_apot_data_edit=Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk,sub_apot_id=data.get('sub_apot_id')).first()
			sub_apot_data=Sub_apot_data.objects.filter(apot_id=apot_edit.apot_id.pk,sub_apot_id=data.get('sub_apot_id')).first()

			if sub_apot_data:
				if sub_apot_data_edit:
					if sub_apot_data_edit.file!='' and sub_apot_data.file!=sub_apot_data_edit.file:
						os.remove(str(sub_apot_data_edit.file))
					sub_apot_data_edit.my_delete()
					sub_apot_data.status=3
					sub_apot_data.save()
			else:
				if sub_apot_data_edit:
					sub_apot_data_edit.delete()
		return JsonResponse({'status':2,'apot_id':edit_apot_id, 'sub_apot_id': data.get('sub_apot_id')})
	else:
		return HttpResponse('/delete_apot_data')



def change():
	data= Apots.objects.filter(mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi='Hech kodi')
	for i in data:
		print(i.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi)

def copy():
	data= ApotOld.objects.filter(type=3)
	for apot in data:
		obj = Apots_edit.objects.create(
					fuqarolar_yiginlari=apot.fuqarolar_yiginlari,
					mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =apot.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
					aholi_punktining_tipi=apot.aholi_punktining_tipi,
					aholi_punktining_maqomi=apot.aholi_punktining_maqomi,
					respublika_viloyat = apot.vil_id,
					tuman_shahar = apot.tuman_shahar,
					loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =apot.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
					shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =apot.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
					shahar_chegarasi_loyihasini_tasdiqlangan_organ =apot.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
					shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =apot.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
					aholi_punktining_loyihaviy_maydoni_ga = apot.aholi_punktining_loyihaviy_maydoni_ga,
					aholining_loyihaviy_soni = apot.aholining_loyihaviy_soni,
					ishlab_chiqalgan_yili=apot.ishlab_chiqalgan_yili,
					ishlab_chiqarish_asosi=apot.ishlab_chiqarish_asosi,
					reja_qilingan_hujjat=apot.reja_qilingan_hujjat,
					tasdiqlanganligi=2,
					kfi_markazi=apot.kfi_markazi,
					boysinuvchi_aholi_punktlari_soni=apot.boysinuvchi_aholi_punktlari_soni,
					shaharsozlik_kengashi_qarori=apot.shaharsozlik_kengashi_qarori,
					aholi_soni_tip=apot.aholi_soni_tip,
					wkb_geometry=apot.wkb_geometry,
					status=1
					)
		obj.id='apot_'+str(obj.pk)
		obj.save()
	print("okay")


def copy_to_main():

	data= Apots_edit.objects.filter(tasdiqlanganligi=2)
	for apot_edit in data:
		apot = Apots.objects.create(
				fuqarolar_yiginlari=apot_edit.fuqarolar_yiginlari,
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =apot_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
				aholi_punktining_tipi=apot_edit.aholi_punktining_tipi,
				aholi_punktining_maqomi=apot_edit.aholi_punktining_maqomi,
				respublika_viloyat = apot_edit.respublika_viloyat,
				tuman_shahar = apot_edit.tuman_shahar,
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =apot_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =apot_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
				shahar_chegarasi_loyihasini_tasdiqlangan_organ =apot_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =apot_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
				aholi_punktining_loyihaviy_maydoni_ga = apot_edit.aholi_punktining_loyihaviy_maydoni_ga,
				aholining_loyihaviy_soni = apot_edit.aholining_loyihaviy_soni,
				ishlab_chiqalgan_yili=apot_edit.ishlab_chiqalgan_yili,
				ishlab_chiqarish_asosi=apot_edit.ishlab_chiqarish_asosi,
				reja_qilingan_hujjat=apot_edit.reja_qilingan_hujjat,
				tasdiqlanganligi=apot_edit.tasdiqlanganligi,
				kfi_markazi=apot_edit.kfi_markazi,
				boysinuvchi_aholi_punktlari_soni=apot_edit.boysinuvchi_aholi_punktlari_soni,
				shaharsozlik_kengashi_qarori=apot_edit.shaharsozlik_kengashi_qarori,
				aholi_soni_tip=apot_edit.aholi_soni_tip,
				wkb_geometry=apot_edit.wkb_geometry,
				id=apot_edit.id,
				status=0
				)
		apot_edit.my_delete()
	print('Okay !!')


def list_sub_apot(request):
	if request.method=='POST':
		sub_apot = Sub_apot.objects.all().values()
		return JsonResponse({'sub_apot': list(sub_apot)},safe=False)

	else:
		return HttpResponse('/list_sub_apot')
	
			# paginator = Paginator(data,post_data.get('page_size'))
			# result_data=paginator.get_page(post_data.get('page_num'))
 
def apots_data(request):
	data=request.POST
	if data.get('type')=='apot':
		if data.get('filter')=='-0':
			apot= Apots.objects.filter(~Q(status = 4)).order_by('pk')

			apot_data= serializers.serialize('json',apot,fields=[
					'fuqarolar_yiginlari',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'id',
					'tasdiqlanganligi',
					'status'
					])

			return JsonResponse({'data':apot_data})
		else:
			if data.get('filter_type')=='tas':
				apot= Apots.objects.filter(~Q(status = 4),Q(tasdiqlanganligi=data.get('filter')))
				apot_data= serializers.serialize('json',apot,fields=[
					'fuqarolar_yiginlari',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'id',
					'tasdiqlanganligi',
					'status'
					])
				return JsonResponse({'data':apot_data})
			elif data.get('filter_type')=='vil':
				apot= Apots.objects.filter(~Q(status = 4),Q(respublika_viloyat=data.get('filter')))
				apot_data= serializers.serialize('json',apot,fields=[
					'fuqarolar_yiginlari',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'id',
					'tasdiqlanganligi',
					'status'
					])
				return JsonResponse({'data':apot_data})
	elif data.get('type')=='apot_edit':
		print(11);
		if data.get('filter_type')=='status':
			apot= Apots_edit.objects.filter(status=data.get('filter'))
			apot_data= serializers.serialize('json',apot,fields=[
					'fuqarolar_yiginlari',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'id',
					'tasdiqlanganligi',
					'status'
					])
			return JsonResponse({'data':apot_data})
		elif data.get('filter_type')=='vil':
			apot= Apots_edit.objects.filter(respublika_viloyat=data.get('filter'))
			apot_data= serializers.serialize('json',apot,fields=[
					'fuqarolar_yiginlari',
					'mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi',
					'aholi_punktining_tipi',
					'respublika_viloyat',
					'tuman_shahar',
					'loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv',
					'shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy',
					'id',
					'tasdiqlanganligi',
					'status'
					])
			return JsonResponse({'data':apot_data})

def copy_table_apot(apot_id):
	apot = Apots.objects.filter(pk=apot_id).first()
	apot_edit = Apots_edit.objects.create(
				fuqarolar_yiginlari=apot.fuqarolar_yiginlari,
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =apot.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
				aholi_punktining_tipi=apot.aholi_punktining_tipi,
				aholi_punktining_maqomi=apot.aholi_punktining_maqomi,
				respublika_viloyat = apot.respublika_viloyat,
				tuman_shahar = apot.tuman_shahar,
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =apot.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =apot.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
				shahar_chegarasi_loyihasini_tasdiqlangan_organ =apot.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =apot.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
				aholi_punktining_loyihaviy_maydoni_ga = apot.aholi_punktining_loyihaviy_maydoni_ga,
				aholining_loyihaviy_soni = apot.aholining_loyihaviy_soni,
				ishlab_chiqalgan_yili=apot.ishlab_chiqalgan_yili,
				ishlab_chiqarish_asosi=apot.ishlab_chiqarish_asosi,
				reja_qilingan_hujjat=apot.reja_qilingan_hujjat,
				tasdiqlanganligi=apot.tasdiqlanganligi,
				kfi_markazi=apot.kfi_markazi,
				boysinuvchi_aholi_punktlari_soni=apot.boysinuvchi_aholi_punktlari_soni,
				shaharsozlik_kengashi_qarori=apot.shaharsozlik_kengashi_qarori,
				aholi_soni_tip=apot.aholi_soni_tip,
				wkb_geometry=apot.wkb_geometry,
				id=apot.id,
				apot_id=apot,
				status=2
				)
	apot.status=2
	apot.save()

	sub_apot_data = Sub_apot_data.objects.filter(apot_id=apot_id)
	for sub_item in sub_apot_data:
		sub_apot_data_edit = Sub_apot_data_edit.objects.create(
			apot_id=apot_edit,
			sub_apot_id=sub_item.sub_apot_id,
            status=sub_item.status,
			file = sub_item.file,
							)

	return apot_edit.pk

def edit_apot_dialog(request):
	if request.method=='POST':
		d=request.POST
		apot_id=d.get('apot_id')
		status=d.get('status')

		if status=='1':
			apot_edit= Apots_edit.objects.get(id=apot_id)
			apot_data= serializers.serialize('geojson', [apot_edit,])
			sub_apot = Sub_apot.objects.all().values()
			sub_apot_data = Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk).values('sub_apot_id')
			return JsonResponse([
				{
				'apot_id': apot_edit.pk,
				'status': 1,
				'sub_apot': list(sub_apot),
				'sub_apot_data': list(sub_apot_data),
				'apot_data':apot_data
				}],safe=False)
		
		elif status=='2':
			apot_edit= Apots_edit.objects.get(id=apot_id)
			apot_data= serializers.serialize('geojson', [apot_edit,])
			sub_apot = Sub_apot.objects.all().values()
			sub_apot_data = Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk).values('sub_apot_id')
			return JsonResponse([{
				'apot_id': apot_edit.pk,
				'status': 2,
				'sub_apot': list(sub_apot),
				'sub_apot_data': list(sub_apot_data),
				'apot_data':apot_data,
				 }],safe=False)

		elif status=='0':
			apot_edit= Apots_edit.objects.filter(id=apot_id,status=2).first()
			if apot_edit:
				apot_data= serializers.serialize('geojson', [apot_edit,])
				sub_apot = Sub_apot.objects.all().values()
				sub_apot_data = Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk).values('sub_apot_id')
				return JsonResponse([
					{
					'apot_id': apot_edit.pk,
					'status': 2,
					'sub_apot': list(sub_apot),
					'sub_apot_data': list(sub_apot_data),
					'apot_data':apot_data
					}],safe=False)
			else:
				apot= Apots.objects.filter(id=apot_id).first()				
				apot_data= serializers.serialize('geojson', [apot,])
				sub_apot = Sub_apot.objects.all().values()
				sub_apot_data = Sub_apot_data.objects.filter(apot_id=apot.pk).values('sub_apot_id')

				return JsonResponse([{
					'apot_id': apot.pk,
					'status': 0,
					'sub_apot': list(sub_apot),
					'sub_apot_data': list(sub_apot_data),
					'apot_data':apot_data,
					 }],safe=False)
	else:
		return HttpResponse('edit_apot_dialog')

def save_edit_apot(request):
	if request.method=='POST':
		data=request.POST
		apot_id=request.POST.get('apot_id')
		apot_edit = Apots_edit.objects.filter(id=data.get('apot_id')).first()
		apot = Apots.objects.filter(pk=apot_edit.apot_id.pk).first()
		if data.get('confirm')=='1':
			apot.fuqarolar_yiginlari=apot_edit.fuqarolar_yiginlari
			apot.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =apot_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi
			apot.aholi_punktining_tipi=apot_edit.aholi_punktining_tipi
			apot.aholi_punktining_maqomi=apot_edit.aholi_punktining_maqomi
			apot.respublika_viloyat = apot_edit.respublika_viloyat
			apot.tuman_shahar = apot_edit.tuman_shahar
			apot.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =apot_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv
			apot.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =apot_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy
			apot.shahar_chegarasi_loyihasini_tasdiqlangan_organ =apot_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ
			apot.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =apot_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san
			apot.aholi_punktining_loyihaviy_maydoni_ga = apot_edit.aholi_punktining_loyihaviy_maydoni_ga
			apot.aholining_loyihaviy_soni = apot_edit.aholining_loyihaviy_soni
			apot.ishlab_chiqalgan_yili=apot_edit.ishlab_chiqalgan_yili
			apot.ishlab_chiqarish_asosi=apot_edit.ishlab_chiqarish_asosi
			apot.reja_qilingan_hujjat=apot_edit.reja_qilingan_hujjat
			apot.tasdiqlanganligi=apot_edit.tasdiqlanganligi
			apot.kfi_markazi=apot_edit.kfi_markazi
			apot.boysinuvchi_aholi_punktlari_soni=apot_edit.boysinuvchi_aholi_punktlari_soni
			apot.shaharsozlik_kengashi_qarori=apot_edit.shaharsozlik_kengashi_qarori
			apot.aholi_soni_tip=apot_edit.aholi_soni_tip
			
			apot.wkb_geometry=apot_edit.wkb_geometry			
			apot.id=apot_edit.id
			apot.status=0
			apot.save()


			sub_apot_data_edit= Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk)
			sub_apot_data= Sub_apot_data.objects.filter(apot_id=apot.pk)

			for item in sub_apot_data:
				if item.status==3:
					item.delete()
				elif item.status==2:
					apot_edit_sub=Sub_apot_data_edit.objects.filter(sub_apot_id=item.sub_apot_id.pk,apot_id=apot_edit.pk).first()
					if item.file!='':
						os.remove(str(item.file))
					item.file=apot_edit_sub.file
					item.status=0
					item.save()

			
			for item in sub_apot_data_edit:
				if item.status==1:
					Sub_apot_data.objects.create(
					apot_id=apot,
					sub_apot_id=item.sub_apot_id,
					status=0,
					file = item.file,
				)
				item.my_delete()
			apot_edit.my_delete()

			return HttpResponse(1)

		else:
			sub_apot_data_edit= Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk)
			sub_apot_data= Sub_apot_data.objects.filter(apot_id=apot.pk)

			for item in sub_apot_data_edit:
				if item.status==1:
					item.delete()
				elif item.status==2:
					apot_sub=Sub_apot_data.objects.filter(sub_apot_id=item.sub_apot_id.pk,apot_id=apot.pk).first()
					if item.file!='' and item.file!=apot_sub.file:
						os.remove(str(item.file))
					item.my_delete()

			apot_edit.my_delete()

			for item in sub_apot_data:
				item.status==0
				item.save()

			apot.status=0
			apot.save()

			return HttpResponse(0)
	else:
		return HttpResponse('save_edit_apot')


def save_apot(request):
	if request.method=='POST':
		apot_id=request.POST.get('apot_id')
		apot_edit = Apots_edit.objects.filter(id=apot_id).first()
		if request.POST.get('confirm')=='1':
			if apot_edit:
				apot = Apots.objects.create(
				fuqarolar_yiginlari=apot_edit.fuqarolar_yiginlari,
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =apot_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
				aholi_punktining_tipi=apot_edit.aholi_punktining_tipi,
				aholi_punktining_maqomi=apot_edit.aholi_punktining_maqomi,
				respublika_viloyat = apot_edit.respublika_viloyat,
				tuman_shahar = apot_edit.tuman_shahar,
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =apot_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =apot_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
				shahar_chegarasi_loyihasini_tasdiqlangan_organ =apot_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =apot_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
				aholi_punktining_loyihaviy_maydoni_ga = apot_edit.aholi_punktining_loyihaviy_maydoni_ga,
				aholining_loyihaviy_soni = apot_edit.aholining_loyihaviy_soni,
				ishlab_chiqalgan_yili=apot_edit.ishlab_chiqalgan_yili,
				ishlab_chiqarish_asosi=apot_edit.ishlab_chiqarish_asosi,
				reja_qilingan_hujjat=apot_edit.reja_qilingan_hujjat,
				tasdiqlanganligi=apot_edit.tasdiqlanganligi,
				kfi_markazi=apot_edit.kfi_markazi,
				boysinuvchi_aholi_punktlari_soni=apot_edit.boysinuvchi_aholi_punktlari_soni,
				shaharsozlik_kengashi_qarori=apot_edit.shaharsozlik_kengashi_qarori,
				aholi_soni_tip=apot_edit.aholi_soni_tip,
				wkb_geometry=apot_edit.wkb_geometry,
				id=apot_edit.id,
				status=0
				)

				sub_apot_data_edit = Sub_apot_data_edit.objects.filter(apot_id=apot_edit.pk)
				
				for sub_item in sub_apot_data_edit:
					sub_apot_data = Sub_apot_data.objects.create(
						apot_id=apot,
						sub_apot_id=sub_item.sub_apot_id,
						status=0,
						file = sub_item.file,
						)
					sub_item.my_delete()

				apot_edit.my_delete()
				return HttpResponse(1)	
			else:
				return HttpResponse(0)
		else:
			if apot_edit:
				apot_edit.delete()
				return HttpResponse(2)
			else:
				return HttpResponse(3)
	else:
		return HttpResponse('/save_apot')



def create_apot(request):
	if request.method=='POST':
		data=request.POST
		items_index=data.get('itemsIndex').split(',')
		
		if data.get('apot_id')=='-1':
			print(data.get('apot_rqh'))

			apot = Apots_edit.objects.create(
				fuqarolar_yiginlari=data.get('apot_fy'),
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('apot_soata'),
				aholi_punktining_tipi=data.get('apot_apt'),
				aholi_punktining_maqomi=data.get('apot_apm'),
				respublika_viloyat = data.get('apot_vil'),
				tuman_shahar = data.get('apot_tum_shah'),
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('apot_lt'),
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('apot_shchsj'),
				shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('apot_to'),
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('apot_lhr'),
				aholi_punktining_loyihaviy_maydoni_ga = data.get('apot_aplm'),
				aholining_loyihaviy_soni = data.get('apot_als'),
				ishlab_chiqalgan_yili=data.get('apot_ichy'),
				ishlab_chiqarish_asosi=data.get('apot_icha'),
				reja_qilingan_hujjat=data.get('apot_rqh'),
				tasdiqlanganligi=data.get('apot_thm'),
				kfi_markazi=data.get('apot_qfym'),
				boysinuvchi_aholi_punktlari_soni=data.get('apot_baps'),
				shaharsozlik_kengashi_qarori=data.get('apot_shkq'),
				aholi_soni_tip=data.get('apot_ast'),

				wkb_geometry=GEOSGeometry(data.get('geometry')),
				status=1)

			apot.id='apot_'+str(apot.pk)
			apot.save()

			for index in items_index:
				if index!='':
					sub_apot = Sub_apot.objects.get(pk=index)
					sub_apot_data = Sub_apot_data_edit.objects.create(
					apot_id=apot,
					sub_apot_id=sub_apot,
					status=1,
					file=request.FILES['sub_apot_' + index],
					)

			return JsonResponse({'status':1,'apot_id':apot.pk,'sub_apot_ids': items_index})

		else:

			if data.get('status')=='1':

				
				obj=Apots_edit.objects.get(pk=int(data.get('apot_id')))

				obj.fuqarolar_yiginlari=data.get('apot_fy')
				obj.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('apot_soata')
				obj.aholi_punktining_tipi=data.get('apot_apt')
				obj.aholi_punktining_maqomi=data.get('apot_apm')
				obj.respublika_viloyat = data.get('apot_vil')
				obj.tuman_shahar = data.get('apot_tum_shah')
				obj.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('apot_lt')
				obj.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('apot_shchsj')
				obj.shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('apot_to')
				obj.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('apot_lhr')
				obj.aholi_punktining_loyihaviy_maydoni_ga = data.get('apot_aplm')
				obj.aholining_loyihaviy_soni = data.get('apot_als')
				obj.ishlab_chiqalgan_yili=data.get('apot_ichy')
				obj.ishlab_chiqarish_asosi=data.get('apot_icha')
				obj.reja_qilingan_hujjat=data.get('apot_rqh')
				obj.tasdiqlanganligi=data.get('apot_thm')
				obj.kfi_markazi=data.get('apot_qfym')
				obj.boysinuvchi_aholi_punktlari_soni=data.get('apot_baps')
				obj.shaharsozlik_kengashi_qarori=data.get('apot_shkq')
				obj.aholi_soni_tip=data.get('apot_ast')

				obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
				
				obj.save()

				for index in items_index:
					if index!='':

						sub_apot = Sub_apot.objects.get(pk=index)
						sub_apot_data = Sub_apot_data_edit.objects.filter(apot_id=obj.pk,					
						sub_apot_id=sub_apot.pk).first()

						if sub_apot_data:
							os.remove(str(sub_apot_data.file))
							sub_apot_data.file = request.FILES['sub_apot_' + index]
							sub_apot_data.save()

						else:
							sub_apot_data = Sub_apot_data_edit.objects.create(
							apot_id=obj,
							sub_apot_id=sub_apot,
							status=1,
							file=request.FILES['sub_apot_' + index],
							)

				return JsonResponse({'status':1,'apot_id':obj.pk,'sub_apot_ids': items_index})


			elif data.get('status')=='0' or data.get('status')=='2':

				if data.get('status')=='0':

					apot_0 = Apots.objects.get(pk=data.get('apot_id'))
					apot = Apots_edit.objects.filter(apot_id=apot_0.pk).first()
					if not apot:
						edit_apot_id=copy_table_apot(data.get('apot_id'))
					else:
						edit_apot_id=apot.pk
				else:
					edit_apot_id=data.get('apot_id')

				obj = Apots_edit.objects.filter(pk=edit_apot_id).first()
				obj_0 = Apots.objects.filter(pk=obj.apot_id.pk).first()
					
				obj.fuqarolar_yiginlari=data.get('apot_fy')
				obj.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('apot_soata')
				obj.aholi_punktining_tipi=data.get('apot_apt')
				obj.aholi_punktining_maqomi=data.get('apot_apm')
				obj.respublika_viloyat = data.get('apot_vil')
				obj.tuman_shahar = data.get('apot_tum_shah')
				obj.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('apot_lt')
				obj.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('apot_shchsj')
				obj.shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('apot_to')
				obj.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('apot_lhr')
				obj.aholi_punktining_loyihaviy_maydoni_ga = data.get('apot_aplm')
				obj.aholining_loyihaviy_soni = data.get('apot_als')
				obj.ishlab_chiqalgan_yili=data.get('apot_ichy')
				obj.ishlab_chiqarish_asosi=data.get('apot_icha')
				obj.reja_qilingan_hujjat=data.get('apot_rqh')
				obj.tasdiqlanganligi=data.get('apot_thm')
				obj.kfi_markazi=data.get('apot_qfym')
				obj.boysinuvchi_aholi_punktlari_soni=data.get('apot_baps')
				obj.shaharsozlik_kengashi_qarori=data.get('apot_shkq')
				obj.aholi_soni_tip=data.get('apot_ast')
				
				obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
				obj.save()

				for index in items_index:
					if index!='':
						sub_apot = Sub_apot.objects.get(pk=index)
						sub_apot_data = Sub_apot_data_edit.objects.filter(apot_id=edit_apot_id,sub_apot_id=sub_apot.pk).first()
						sub_apot_data_0 = Sub_apot_data.objects.filter(apot_id=obj_0.pk,sub_apot_id=sub_apot.pk).first()
						if sub_apot_data:

							if sub_apot_data.status!=0:
								os.remove(str(sub_apot_data.file))
							sub_apot_data.file = request.FILES['sub_apot_' + index]

							if sub_apot_data_0:
								sub_apot_data.status=2  
								sub_apot_data_0.status=2
								sub_apot_data_0.save()

							sub_apot_data.save()

						else:
							sub_apot_data = Sub_apot_data_edit.objects.create(
								apot_id=obj,
								sub_apot_id=sub_apot,
								status=1,
								file=request.FILES['sub_apot_' + index],
							  )
				
				return JsonResponse({'status':2,'apot_id':obj.pk,'sub_apot_ids': items_index})
	else:
		return HttpResponse('/create_apot')



 
def delete_apot(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='first_delete':
			if data.get('apot_id')!='-1':
				apot = Apots_edit.objects.filter(pk=data.get('apot_id')).first()
				if apot:
					sub_apot_data=Sub_apot_data_edit.objects.filter(apot_id=apot.pk)
					for item in sub_apot_data:
						item.delete()
					apot.delete()
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				return HttpResponse(0)

		elif data.get('type')=='last_delete':

			apot = Apots.objects.filter(id=data.get('apot_id')).first()
			apot_0 = Apots_edit.objects.filter(apot_id=apot.pk,status=3).first()

			if apot_0:
				return HttpResponse(apot_0.pk)
			else:
				apot_edit = Apots_edit.objects.create(
				fuqarolar_yiginlari=apot.fuqarolar_yiginlari,
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =apot.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
				aholi_punktining_tipi=apot.aholi_punktining_tipi,
				aholi_punktining_maqomi=apot.aholi_punktining_maqomi,
				respublika_viloyat = apot.respublika_viloyat,
				tuman_shahar = apot.tuman_shahar,
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =apot.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =apot.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
				shahar_chegarasi_loyihasini_tasdiqlangan_organ = apot.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =apot.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
				aholi_punktining_loyihaviy_maydoni_ga = apot.aholi_punktining_loyihaviy_maydoni_ga,
				aholining_loyihaviy_soni = apot.aholining_loyihaviy_soni,
				ishlab_chiqalgan_yili=apot.ishlab_chiqalgan_yili,
				ishlab_chiqarish_asosi=apot.ishlab_chiqarish_asosi,
				reja_qilingan_hujjat=apot.reja_qilingan_hujjat,
				tasdiqlanganligi=apot.tasdiqlanganligi,
				kfi_markazi=apot.kfi_markazi,
				boysinuvchi_aholi_punktlari_soni=apot.boysinuvchi_aholi_punktlari_soni,
				shaharsozlik_kengashi_qarori=apot.shaharsozlik_kengashi_qarori,
				aholi_soni_tip=apot.aholi_soni_tip,
				id=apot.id,
				apot_id=apot,
				wkb_geometry=apot.wkb_geometry,
				status=3)

				apot.status=3
				apot.save()

				return HttpResponse(0)	

		elif data.get('type')=='admin_delete':
			if data.get('confirm')=='1':
				apot = Apots.objects.filter(id=data.get('apot_id'),status=4).first()
				if not apot:
					apot = Apots.objects.filter(id=data.get('apot_id')).first()
					apot.status=4
					apot.save()
					result=Apots_edit.objects.filter(apot_id=apot.pk)
					for obj in result:
						obj.my_delete()
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				apot = Apots.objects.filter(id=data.get('apot_id')).first()
				apot_edit = Apots_edit.objects.filter(apot_id=apot.pk,status=3).first()
				if apot_edit:					
					apot.status=0
					apot.save()
					apot_edit.my_delete()
					return HttpResponse(2)
				else:
					return HttpResponse(3)
	else:
		return HttpResponse('/delete_apot')	




def apot_dialog_view(request):
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
			if sessia['status']==-1:
				data=serializers.serialize('json',Sub_apot_data.objects.filter(apot_id__id=request.POST.get('id'),sub_apot_id__public_private='1').order_by('sub_apot_id__zindex'),use_natural_foreign_keys=True)
			else:
				data=serializers.serialize('json',Sub_apot_data.objects.filter(apot_id__id=request.POST.get('id')).order_by('sub_apot_id__zindex'),use_natural_foreign_keys=True)
			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)
		
		elif request.POST.get('status')=='1' or request.POST.get('status')=='2':
			if request.POST.get('type')=='orginal':
				if sessia['status']==-1:
					data=serializers.serialize('json',Sub_apot_data.objects.filter(apot_id__id=request.POST.get('id'),sub_apot_id__public_private='1').order_by('sub_apot_id__zindex'),use_natural_foreign_keys=True)
				else:
					data=serializers.serialize('json',Sub_apot_data.objects.filter(apot_id__id=request.POST.get('id')).order_by('sub_apot_id__zindex'),use_natural_foreign_keys=True)
			else:
				data=serializers.serialize('json',Sub_apot_data_edit.objects.filter(apot_id__id=request.POST.get('id')).order_by('sub_apot_id__zindex'),use_natural_foreign_keys=True)
			return JsonResponse([{'data':data,'sessia':sessia}],safe=False)

	else:
		return HttpResponse('/dialog_view')
