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
import csv
import urllib
import codecs


from datetime import datetime,date
from django.core.files.storage import default_storage
import json
from django.contrib.gis.geos import GEOSGeometry

from django.core import serializers


import requests
from requests.auth import HTTPBasicAuth

from proj.reestr_projects_models import Apz,Psd,Psd_ind
from proj.reestr_objects_models import Perm_rec,Smr,Pexpl,Pexpl_ind
from proj.reestr_subjects_models import Buyurtmachi_fiz,Buyurtmachi_yur,Loyihalovchi,Quruvchi
from proj.reestr_add_models import Authority


def apz_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Apz.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Apz.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Apz.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Apz.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Apz.objects.filter(tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='name_building':
						data=Apz.objects.filter(name_building__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Apz.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Apz.objects.filter(task_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region':
						data=Apz.objects.filter(region__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district':
						data=Apz.objects.filter(district__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Apz.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Apz.objects.filter(tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='name_building':
						data=Apz.objects.filter(name_building__icontains=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='passport_number':
						data=Apz.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Apz.objects.filter(task_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region':
						data=Apz.objects.filter(region__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district':
						data=Apz.objects.filter(district__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			apz_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'purpose_construction_real',
				'user_type_real',
				'location_building',
				'name_building',
				'apz',
				'decision_city_hokim',
				'legal_entity_tin',
				'tin',
				'region',
				'district',
				'which_geo',
				'passport_number'
				])
 
			return JsonResponse({'data':apz_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Apz.objects.filter(task_id=request.POST.get('id'))

			one=Apz.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.tin))
			else:
				buyurtmachi_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(one.legal_entity_tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			
			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				psd=Psd.objects.filter(our_id=one.our_id).first()
				if psd:
					psd_task_id=psd.task_id
				else:
					psd_task_id=''
				psd_ind=Psd_ind.objects.filter(our_id=one.our_id).first()
				if psd_ind:
					psd_ind_task_id=psd_ind.task_id
				else:
					psd_ind_task_id=''
				perm_rec=Perm_rec.objects.filter(our_id=one.our_id).first()
				if perm_rec:
					perm_rec_task_id=perm_rec.task_id
				else:
					perm_rec_task_id=''
				smr=Smr.objects.filter(our_id=one.our_id).first()
				if smr:
					smr_task_id=smr.task_id
				else:
					smr_task_id=''					
				pexpl=Pexpl.objects.filter(our_id=one.our_id).first()
				if pexpl:
					pexpl_task_id=pexpl.task_id
				else:
					pexpl_task_id=''
				pexpl_ind=Pexpl_ind.objects.filter(our_id=one.our_id).first()
				if pexpl_ind:
					pexpl_ind_task_id=pexpl_ind.task_id
				else:
					pexpl_ind_task_id=''
			else:
				psd_task_id=''
				psd_ind_task_id=''
				perm_rec_task_id=''
				smr_task_id=''
				pexpl_task_id=''
				pexpl_ind_task_id=''

			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)

			return JsonResponse({
				'data':full_data,
				'buyurtmachi':buyurtmachi,
				'authority_title':authority_title,
				'psd_task_id':psd_task_id,
				'psd_ind_task_id':psd_ind_task_id,
				'perm_rec_task_id':perm_rec_task_id,
				'smr_task_id':smr_task_id,
				'pexpl_task_id':pexpl_task_id,
				'pexpl_ind_task_id':pexpl_ind_task_id
				})

	else:
		return HttpResponse('/apz_data')



def psd_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Psd.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Psd.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Psd.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Psd.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Psd.objects.filter(individual_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='name_design_estimates':
						data=Psd.objects.filter(name_design_estimates__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Psd.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Psd.objects.filter(task_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_project_org':
						data=Psd.objects.filter(tin_project_org__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Psd.objects.filter(region_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Psd.objects.filter(district_id__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Psd.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Psd.objects.filter(individual_tin__icontains=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='name_design_estimates':
						data=Psd.objects.filter(name_design_estimates__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Psd.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Psd.objects.filter(task_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_project_org':
						data=Psd.objects.filter(tin_project_org__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Psd.objects.filter(region_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Psd.objects.filter(district_id__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			psd_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'user_type_real',
				'name_design_estimates',
				'tin_project_org',
				'doc_architectura',
				'file_main',
				'legal_entity_tin',
				'individual_tin',
				'region_id',
				'which_geo',
				'district_id',
				'passport_number'
				])
 
			return JsonResponse({'data':psd_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Psd.objects.filter(task_id=request.POST.get('id'))

			one=Psd.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.individual_tin))
			else:
				buyurtmachi_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(one.legal_entity_tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)
			loyihalovchi_data=Loyihalovchi.objects.filter(inn=one.tin_project_org)
			loyihalovchi= serializers.serialize('json',loyihalovchi_data)

			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				apz=Apz.objects.filter(our_id=one.our_id).first()
				if apz:
					apz_task_id=apz.task_id
				else:
					apz_task_id=''
				psd_ind=Psd_ind.objects.filter(our_id=one.our_id).first()
				if psd_ind:
					psd_ind_task_id=psd_ind.task_id
				else:
					psd_ind_task_id=''
				perm_rec=Perm_rec.objects.filter(our_id=one.our_id).first()
				if perm_rec:
					perm_rec_task_id=perm_rec.task_id
				else:
					perm_rec_task_id=''
				smr=Smr.objects.filter(our_id=one.our_id).first()
				if smr:
					smr_task_id=smr.task_id
				else:
					smr_task_id=''					
				pexpl=Pexpl.objects.filter(our_id=one.our_id).first()
				if pexpl:
					pexpl_task_id=pexpl.task_id
				else:
					pexpl_task_id=''
				pexpl_ind=Pexpl_ind.objects.filter(our_id=one.our_id).first()
				if pexpl_ind:
					pexpl_ind_task_id=pexpl_ind.task_id
				else:
					pexpl_ind_task_id=''
			else:
				apz_task_id=''
				psd_ind_task_id=''
				perm_rec_task_id=''
				smr_task_id=''
				pexpl_task_id=''
				pexpl_ind_task_id=''

			print(apz_task_id)
			return JsonResponse({
				'data':full_data,
				'loyihalovchi':loyihalovchi,
				'buyurtmachi':buyurtmachi,
				'authority_title':Authority_title.title,
				'apz_task_id':apz_task_id,
				'psd_ind_task_id':psd_ind_task_id,
				'perm_rec_task_id':perm_rec_task_id,
				'smr_task_id':smr_task_id,
				'pexpl_task_id':pexpl_task_id,
				'pexpl_ind_task_id':pexpl_ind_task_id

				});

	else:
		return HttpResponse('/psd_data')



def psd_ind_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Psd_ind.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Psd_ind.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Psd_ind.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='object_adress':
						data=Psd_ind.objects.filter(object_adress__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region':
						data=Psd_ind.objects.filter(region__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district':
						data=Psd_ind.objects.filter(district__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Psd_ind.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Psd_ind.objects.filter(tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Psd_ind.objects.filter(task_id__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='object_adress':
						data=Psd_ind.objects.filter(object_adress__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region':
						data=Psd_ind.objects.filter(region__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Psd_ind.objects.filter(tin__icontains=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='district':
						data=Psd_ind.objects.filter(district__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Psd_ind.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Psd_ind.objects.filter(task_id__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			psd_ind_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'user_type_real',
				'tin',
				'object_name',
				'object_adress',
				'treatment_purpose',
				'region',
				'district',
				'which_geo',
				'upload_file_ijs',
				'design_estimate',
				'passport_number'
				])
 
			return JsonResponse({'data':psd_ind_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Psd_ind.objects.filter(task_id=request.POST.get('id'))

			one=Psd_ind.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)


			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				apz=Apz.objects.filter(our_id=one.our_id).first()
				if apz:
					apz_task_id=apz.task_id
				else:
					apz_task_id=''
				psd=Psd.objects.filter(our_id=one.our_id).first()
				if psd:
					psd_task_id=psd.task_id
				else:
					psd_task_id=''
				perm_rec=Perm_rec.objects.filter(our_id=one.our_id).first()
				if perm_rec:
					perm_rec_task_id=perm_rec.task_id
				else:
					perm_rec_task_id=''
				smr=Smr.objects.filter(our_id=one.our_id).first()
				if smr:
					smr_task_id=smr.task_id
				else:
					smr_task_id=''					
				pexpl=Pexpl.objects.filter(our_id=one.our_id).first()
				if pexpl:
					pexpl_task_id=pexpl.task_id
				else:
					pexpl_task_id=''
				pexpl_ind=Pexpl_ind.objects.filter(our_id=one.our_id).first()
				if pexpl_ind:
					pexpl_ind_task_id=pexpl_ind.task_id
				else:
					pexpl_ind_task_id=''
			else:
				apz_task_id=''
				psd_task_id=''
				perm_rec_task_id=''
				smr_task_id=''
				pexpl_task_id=''
				pexpl_ind_task_id=''

			return JsonResponse({
				'data':full_data,
				'buyurtmachi':buyurtmachi,
				'authority_title':Authority_title.title,
				'apz_task_id':apz_task_id,
				'psd_task_id':psd_task_id,
				'perm_rec_task_id':perm_rec_task_id,
				'smr_task_id':smr_task_id,
				'pexpl_task_id':pexpl_task_id,
				'pexpl_ind_task_id':pexpl_ind_task_id

				});

	else:
		return HttpResponse('/psd_ind_data')








def perm_rec_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Perm_rec.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Perm_rec.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Perm_rec.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Perm_rec.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='building_location':
						data=Perm_rec.objects.filter(building_location__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Perm_rec.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Perm_rec.objects.filter(task_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Perm_rec.objects.filter(tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district':
						data=Perm_rec.objects.filter(district__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Perm_rec.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='building_location':
						data=Perm_rec.objects.filter(building_location__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Perm_rec.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Perm_rec.objects.filter(task_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Perm_rec.objects.filter(tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district':
						data=Perm_rec.objects.filter(district__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			perm_rec_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'user_type_real',
				'legal_entity_tin',
				'tin',
				'scanfile',
				'building_location',
				'acceptance',
				'select_region',
				'which_geo',
				'district',
				'passport_number'
				])
 
			return JsonResponse({'data':perm_rec_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Perm_rec.objects.filter(task_id=request.POST.get('id'))

			one=Perm_rec.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.tin))
			else:
				buyurtmachi_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(one.legal_entity_tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)

			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				apz=Apz.objects.filter(our_id=one.our_id).first()
				if apz:
					apz_task_id=apz.task_id
				else:
					apz_task_id=''

				psd=Psd.objects.filter(our_id=one.our_id).first()
				if psd:
					psd_task_id=psd.task_id
				else:
					psd_task_id=''
				psd_ind=Psd_ind.objects.filter(our_id=one.our_id).first()
				if psd_ind:
					psd_ind_task_id=psd_ind.task_id
				else:
					psd_ind_task_id=''
				smr=Smr.objects.filter(our_id=one.our_id).first()
				if smr:
					smr_task_id=smr.task_id
				else:
					smr_task_id=''					
				pexpl=Pexpl.objects.filter(our_id=one.our_id).first()
				if pexpl:
					pexpl_task_id=pexpl.task_id
				else:
					pexpl_task_id=''
				pexpl_ind=Pexpl_ind.objects.filter(our_id=one.our_id).first()
				if pexpl_ind:
					pexpl_ind_task_id=pexpl_ind.task_id
				else:
					pexpl_ind_task_id=''
			else:
				apz_task_id=''
				psd_task_id=''
				psd_ind_task_id=''
				smr_task_id=''
				pexpl_task_id=''
				pexpl_ind_task_id=''

			return JsonResponse({
				'data':full_data,
				'buyurtmachi':buyurtmachi,
				'authority_title':Authority_title.title,
				'apz_task_id':apz_task_id,
				'psd_task_id':psd_task_id,
				'psd_ind_task_id':psd_ind_task_id,
				'smr_task_id':smr_task_id,
				'pexpl_task_id':pexpl_task_id,
				'pexpl_ind_task_id':pexpl_ind_task_id

				});

	else:
		return HttpResponse('/perc_data')



def smr_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Smr.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Smr.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Smr.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Smr.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='location_building':
						data=Smr.objects.filter(location_building__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Smr.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Smr.objects.filter(tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Smr.objects.filter(task_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Smr.objects.filter(region_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Smr.objects.filter(district_id__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Smr.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='location_building':
						data=Smr.objects.filter(location_building__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Smr.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Smr.objects.filter(tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Smr.objects.filter(task_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Smr.objects.filter(region_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Smr.objects.filter(district_id__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			smr_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'user_type_real',
				'legal_entity_tin',
				'construction_works',
				'location_building',
				'tin',
				'name_building',
				'which_geo',
				'region_id',
				'district_id',
				'passport_number'
				])
 
			return JsonResponse({'data':smr_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Smr.objects.filter(task_id=request.POST.get('id'))

			one=Smr.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.tin))
			else:
				buyurtmachi_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(one.legal_entity_tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)
			
			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				apz=Apz.objects.filter(our_id=one.our_id).first()
				if apz:
					apz_task_id=apz.task_id
				else:
					apz_task_id=''

				psd=Psd.objects.filter(our_id=one.our_id).first()
				if psd:
					psd_task_id=psd.task_id
				else:
					psd_task_id=''
				psd_ind=Psd_ind.objects.filter(our_id=one.our_id).first()
				if psd_ind:
					psd_ind_task_id=psd_ind.task_id
				else:
					psd_ind_task_id=''
				perm_rec=Perm_rec.objects.filter(our_id=one.our_id).first()
				if perm_rec:
					perm_rec_task_id=perm_rec.task_id
				else:
					perm_rec_task_id=''					
				pexpl=Pexpl.objects.filter(our_id=one.our_id).first()
				if pexpl:
					pexpl_task_id=pexpl.task_id
				else:
					pexpl_task_id=''
				pexpl_ind=Pexpl_ind.objects.filter(our_id=one.our_id).first()
				if pexpl_ind:
					pexpl_ind_task_id=pexpl_ind.task_id
				else:
					pexpl_ind_task_id=''
			else:
				apz_task_id=''
				psd_task_id=''
				psd_ind_task_id=''
				perm_rec_task_id=''
				pexpl_task_id=''
				pexpl_ind_task_id=''
			return JsonResponse({
				'data':full_data,
				'buyurtmachi':buyurtmachi,
				'authority_title':Authority_title.title,
				'apz_task_id':apz_task_id,
				'psd_task_id':psd_task_id,
				'psd_ind_task_id':psd_ind_task_id,
				'perm_rec_task_id':perm_rec_task_id,
				'pexpl_task_id':pexpl_task_id,
				'pexpl_ind_task_id':pexpl_ind_task_id
				});

	else:
		return HttpResponse('/smr_data')

 

def pexpl_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Pexpl.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Psd.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Pexpl.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Pexpl.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Pexpl.objects.filter(tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='buildings_location':
						data=Pexpl.objects.filter(buildings_location__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Pexpl.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Pexpl.objects.filter(task_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_project_org':
						data=Pexpl.objects.filter(tin_project_org__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_contractor_org':
						data=Pexpl.objects.filter(tin_contractor_org__istartswith=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='region_id':
						data=Pexpl.objects.filter(region_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Pexpl.objects.filter(district_id__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Pexpl.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Pexpl.objects.filter(tin__icontains=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='buildings_location':
						data=Pexpl.objects.filter(buildings_location__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Pexpl.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Pexpl.objects.filter(task_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_project_org':
						data=Pexpl.objects.filter(tin_project_org__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_contractor_org':
						data=Pexpl.objects.filter(tin_contractor_org__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Pexpl.objects.filter(region_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Pexpl.objects.filter(district_id__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			pexpl_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'user_type_real',
				'buildings_location',
				'legal_entity_tin',
				'tin_contractor_org',
				'tin_project_org',
				'tin',
				'region_id',
				'which_geo',
				'district_id',
				'passport_number'
				])
 
			return JsonResponse({'data':pexpl_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Pexpl.objects.filter(task_id=request.POST.get('id'))

			one=Pexpl.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.tin))
			else:
				buyurtmachi_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(one.legal_entity_tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)
			loyihalovchi_data=Loyihalovchi.objects.filter(inn=one.tin_project_org)
			loyihalovchi= serializers.serialize('json',loyihalovchi_data)

			pudratchi_data=Quruvchi.objects.filter(inn=one.tin_contractor_org)
			pudratchi= serializers.serialize('json',pudratchi_data)
			
			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				apz=Apz.objects.filter(our_id=one.our_id).first()
				if apz:
					apz_task_id=apz.task_id
				else:
					apz_task_id=''

				psd=Psd.objects.filter(our_id=one.our_id).first()
				if psd:
					psd_task_id=psd.task_id
				else:
					psd_task_id=''
				psd_ind=Psd_ind.objects.filter(our_id=one.our_id).first()
				if psd_ind:
					psd_ind_task_id=psd_ind.task_id
				else:
					psd_ind_task_id=''
				perm_rec=Perm_rec.objects.filter(our_id=one.our_id).first()
				if perm_rec:
					perm_rec_task_id=perm_rec.task_id
				else:
					perm_rec_task_id=''					
				smr=Smr.objects.filter(our_id=one.our_id).first()
				if smr:
					smr_task_id=smr.task_id
				else:
					smr_task_id=''
				pexpl_ind=Pexpl_ind.objects.filter(our_id=one.our_id).first()
				if pexpl_ind:
					pexpl_ind_task_id=pexpl_ind.task_id
				else:
					pexpl_ind_task_id=''
			else:
				apz_task_id=''
				psd_task_id=''
				psd_ind_task_id=''
				perm_rec_task_id=''
				smr_task_id=''
				pexpl_ind_task_id=''
			return JsonResponse({
				'data':full_data,
				'loyihalovchi':loyihalovchi,
				'pudratchi':pudratchi,
				'buyurtmachi':buyurtmachi,
				'authority_title':Authority_title.title,
				'apz_task_id':apz_task_id,
				'psd_task_id':psd_task_id,
				'psd_ind_task_id':psd_ind_task_id,
				'perm_rec_task_id':perm_rec_task_id,
				'smr_task_id':smr_task_id,
				'pexpl_ind_task_id':pexpl_ind_task_id
				});

	else:
		return HttpResponse('/psd_data')




def pexpl_ind_data(request):
	if request.method=='POST':
		if request.POST.get('type')=='table':
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				if request.POST.get('search_field')!='betwen_date':
					data=Pexpl_ind.objects.all()
				else:
					try:
						date_b=datetime.strptime(request.POST.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(request.POST.get('date_end'),'%d.%m.%Y')
						data=Pexpl_ind.objects.filter(date__range=(date_b,date_e))
					except ValueError:
						data=Pexpl_ind.objects.all()
			else:
				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Pexpl_ind.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Pexpl_ind.objects.filter(tin__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='buildings_location':
						data=Pexpl_ind.objects.filter(buildings_location__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Pexpl_ind.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Pexpl_ind.objects.filter(task_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_project_org':
						data=Pexpl_ind.objects.filter(tin_project_org__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_contractor_org':
						data=Pexpl_ind.objects.filter(tin_contractor_org__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Pexpl_ind.objects.filter(region_id__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='district_id':
						data=Pexpl_ind.objects.filter(district_id__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_tin':
						data=Pexpl_ind.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Pexpl_ind.objects.filter(tin__icontains=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='buildings_location':
						data=Pexpl_ind.objects.filter(buildings_location__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Pexpl_ind.objects.filter(passport_number__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='task_id':
						data=Pexpl_ind.objects.filter(task_id__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_project_org':
						data=Pexpl_ind.objects.filter(tin_project_org__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin_contractor_org':
						data=Pexpl_ind.objects.filter(tin_contractor_org__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='region_id':
						data=Pexpl_ind.objects.filter(region_id__icontains=request.POST.get('search_text'))

					elif request.POST.get('search_field')=='district_id':
						data=Pexpl_ind.objects.filter(district_id__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			pexpl_ind_data= serializers.serialize('json',result_data,fields=[
				'task_id',
				'date',
				'user_type_real',
				'buildings_location',
				'legal_entity_tin',
				'tin_contractor_org',
				'tin_project_org',
				'tin',
				'region_id',
				'which_geo',
				'district_id',
				'passport_number'
				])
 
			return JsonResponse({'data':pexpl_ind_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			data=Pexpl_ind.objects.filter(task_id=request.POST.get('id'))

			one=Pexpl_ind.objects.filter(task_id=request.POST.get('id')).first()
			if one.user_type_real=='I':
				buyurtmachi_data=Buyurtmachi_fiz.objects.filter(tin=str(one.tin))
			else:
				buyurtmachi_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(one.legal_entity_tin))

			Authority_title=Authority.objects.filter(kod=one.authority_id).first()
			full_data= serializers.serialize('geojson',data)
			buyurtmachi= serializers.serialize('json',buyurtmachi_data)
			loyihalovchi_data=Loyihalovchi.objects.filter(inn=one.tin_project_org)
			loyihalovchi= serializers.serialize('json',loyihalovchi_data)

			pudratchi_data=Quruvchi.objects.filter(inn=one.tin_contractor_org)
			pudratchi= serializers.serialize('json',pudratchi_data)

			
			if Authority_title:
				authority_title=Authority_title.title
			else:
				authority_title=one.authority_id

			if one.our_id!='' and one.our_id!=None :
				apz=Apz.objects.filter(our_id=one.our_id).first()
				if apz:
					apz_task_id=apz.task_id
				else:
					apz_task_id=''

				psd=Psd.objects.filter(our_id=one.our_id).first()
				if psd:
					psd_task_id=psd.task_id
				else:
					psd_task_id=''
				psd_ind=Psd_ind.objects.filter(our_id=one.our_id).first()
				if psd_ind:
					psd_ind_task_id=psd_ind.task_id
				else:
					psd_ind_task_id=''
				perm_rec=Perm_rec.objects.filter(our_id=one.our_id).first()
				if perm_rec:
					perm_rec_task_id=perm_rec.task_id
				else:
					perm_rec_task_id=''					
				smr=Smr.objects.filter(our_id=one.our_id).first()
				if smr:
					smr_task_id=smr.task_id
				else:
					smr_task_id=''
				pexpl=Pexpl.objects.filter(our_id=one.our_id).first()
				if pexpl:
					pexpl_task_id=pexpl.task_id
				else:
					pexp_task_id=''
			else:
				apz_task_id=''
				psd_task_id=''
				psd_ind_task_id=''
				perm_rec_task_id=''
				smr_task_id=''
				pexpl_task_id=''
			return JsonResponse({
				'data':full_data,
				'loyihalovchi':loyihalovchi,
				'pudratchi':pudratchi,
				'buyurtmachi':buyurtmachi,
				'authority_title':Authority_title.title,
				'apz_task_id':apz_task_id,
				'psd_task_id':psd_task_id,
				'psd_ind_task_id':psd_ind_task_id,
				'perm_rec_task_id':perm_rec_task_id,
				'smr_task_id':smr_task_id,
				'pexpl_task_id':pexpl_task_id,
				});

	else:
		return HttpResponse('/psd_data')


def buyurtmachi_data(request):
	if request.method=='POST':
		data=request.POST

		if request.POST.get('type')=='table' and request.POST.get('user_type')=='I':
			
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				data=Buyurtmachi_fiz.objects.all()

			else:

				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='full_name':
						data=Buyurtmachi_fiz.objects.filter(full_name__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='permit_address':
						data=Buyurtmachi_fiz.objects.filter(permit_address__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Buyurtmachi_fiz.objects.filter(passport_number__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Buyurtmachi_fiz.objects.filter(tin__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='full_name':
						data=Buyurtmachi_fiz.objects.filter(full_name__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='tin':
						data=Buyurtmachi_fiz.objects.filter(tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='permit_address':
						data=Buyurtmachi_fiz.objects.filter(permit_address__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='passport_number':
						data=Buyurtmachi_fiz.objects.filter(passport_number__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			buyurtmachi_data= serializers.serialize('json',result_data,fields=[
				'tin',
				'full_name',
				'passport_number',
				'permit_address',

				])
 
			return JsonResponse({'data':buyurtmachi_data,'count':paginator.count,'num_pages':paginator.num_pages})
		
		elif request.POST.get('type')=='table' and request.POST.get('user_type')=='J':
			
			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				data=Buyurtmachi_yur.objects.all()

			else:

				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='legal_entity_name':
						data=Buyurtmachi_yur.objects.filter(legal_entity_name__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='legal_entity_address':
						data=Buyurtmachi_yur.objects.filter(legal_entity_address__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='legal_entity_tin':
						data=Buyurtmachi_yur.objects.filter(legal_entity_tin__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='legal_entity_name':
						data=Buyurtmachi_yur.objects.filter(legal_entity_name__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='legal_entity_tin':
						data=Buyurtmachi_yur.objects.filter(legal_entity_tin__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='legal_entity_address':
						data=Buyurtmachi_yur.objects.filter(legal_entity_address__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			buyurtmachi_data= serializers.serialize('json',result_data,fields=[
				'legal_entity_tin',
				'legal_entity_name',
				'legal_entity_address',

				])
 
			return JsonResponse({'data':buyurtmachi_data,'count':paginator.count,'num_pages':paginator.num_pages})


		elif request.POST.get('type')=='full_info':
			print(data.get('type'))

			if data.get('user_type')=='I':
				context_data=Buyurtmachi_fiz.objects.filter(tin=str(data.get('inn'))).values()

				apz_count=Apz.objects.filter(tin=str(data.get('inn'))).count()
				psd_count=Psd.objects.filter(individual_tin=str(data.get('inn'))).count()
				psd_ind_count=Psd_ind.objects.filter(tin=str(data.get('inn'))).count()
				perc_rec_count=Perm_rec.objects.filter(tin=str(data.get('inn'))).count()
				smr_count=Smr.objects.filter(tin=str(data.get('inn'))).count()
				pexpl_count=Pexpl.objects.filter(tin=str(data.get('inn'))).count()
				pexpl_ind_count=Pexpl_ind.objects.filter(tin=str(data.get('inn'))).count()


				return JsonResponse({'type':'I',
					'data':list(context_data),
					'apz_count':apz_count,
					'psd_count':psd_count,
					'psd_ind_count':psd_ind_count,
					'perm_rec_count':perc_rec_count,
					'smr_count':smr_count,
					'pexpl_count':pexpl_count,
					'pexpl_ind_count':pexpl_ind_count
					})
			else:
				context_data=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(data.get('inn'))).values()
				
				apz_count=Apz.objects.filter(legal_entity_tin=str(data.get('inn'))).count()
				psd_count=Psd.objects.filter(legal_entity_tin=str(data.get('inn'))).count()
				perc_rec_count=Perm_rec.objects.filter(legal_entity_tin=str(data.get('inn'))).count()
				smr_count=Smr.objects.filter(legal_entity_tin=str(data.get('inn'))).count()
				pexpl_count=Pexpl.objects.filter(legal_entity_tin=str(data.get('inn'))).count()
				pexpl_ind_count=Pexpl_ind.objects.filter(legal_entity_tin=str(data.get('inn'))).count()

				return JsonResponse({'type':'J',
					'data':list(context_data),
					'apz_count':apz_count,
					'psd_count':psd_count,
					'perm_rec_count':perc_rec_count,
					'smr_count':smr_count,
					'pexpl_count':pexpl_count,
					'pexpl_ind_count':pexpl_ind_count
					})
	else:
		return HttpResponse('/buyurtmachi_data')

 
def loyihalovchi_data(request):
	if request.method=='POST':
		data=request.POST

		if request.POST.get('type')=='table':

			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				data=Loyihalovchi.objects.all()

			else:

				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='nomi':
						data=Loyihalovchi.objects.filter(nomi__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='adress':
						data=Loyihalovchi.objects.filter(adress__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='inn':
						data=Loyihalovchi.objects.filter(inn__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='nomi':
						data=Loyihalovchi.objects.filter(nomi__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='inn':
						data=Loyihalovchi.objects.filter(inn__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='adress':
						data=Loyihalovchi.objects.filter(adress__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			loyihalovchilar_data= serializers.serialize('json',result_data,fields=[
				'nomi',
				'adress',
				'inn',
				'location'
				])
 
			return JsonResponse({'data':loyihalovchilar_data,'count':paginator.count,'num_pages':paginator.num_pages})

		elif request.POST.get('type')=='full_info':		
			context_data=Loyihalovchi.objects.filter(inn=str(data.get('inn')))
			lohiyahachi_tash_info= serializers.serialize('geojson',context_data)
			psd_count=Psd.objects.filter(tin_project_org=str(data.get('inn'))).count()
			pexpl_count=Pexpl.objects.filter(tin_project_org=str(data.get('inn'))).count()
			pexpl_ind_count=Pexpl_ind.objects.filter(tin_project_org=str(data.get('inn'))).count()


			return JsonResponse({'data':lohiyahachi_tash_info,
					'psd_count':psd_count,
					'pexpl_count':pexpl_count,
					'pexpl_ind_count':pexpl_ind_count
				})

	else:
		return HttpResponse('/loyihalovchi_data')


def pudratchi_data(request):
	if request.method=='POST':
		data=request.POST	

		if request.POST.get('type')=='table':	

			page_num=request.POST.get('page_num')
			page_size=request.POST.get('page_size')

			if request.POST.get('search_text')=='':
				data=Quruvchi.objects.all()

			else:

				if request.POST.get('search_type')=='1':
					if request.POST.get('search_field')=='nomi':
						data=Quruvchi.objects.filter(nomi__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='adress':
						data=Quruvchi.objects.filter(adress__istartswith=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='inn':
						data=Quruvchi.objects.filter(inn__istartswith=request.POST.get('search_text'))

				else:
					if request.POST.get('search_field')=='nomi':
						data=Quruvchi.objects.filter(nomi__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='inn':
						data=Quruvchi.objects.filter(inn__icontains=request.POST.get('search_text'))
					elif request.POST.get('search_field')=='adress':
						data=Quruvchi.objects.filter(adress__icontains=request.POST.get('search_text'))

			data=data.order_by(request.POST.get('sort_type')+request.POST.get('sort_field'))
			
			paginator = Paginator(data,page_size)
			result_data=paginator.get_page(page_num)

			quruvchilar_data= serializers.serialize('json',result_data,fields=[
				'nomi',
				'adress',
				'location',
				'inn'
				])
 
			return JsonResponse({'data':quruvchilar_data,'count':paginator.count,'num_pages':paginator.num_pages})
		elif request.POST.get('type')=='full_info':

			context_data=Quruvchi.objects.filter(inn=str(data.get('inn')))
			pudratchi_tash_info= serializers.serialize('geojson',context_data)
			pexpl_count=Pexpl.objects.filter(tin_contractor_org=str(data.get('inn'))).count()
			pexpl_ind_count=Pexpl_ind.objects.filter(tin_contractor_org=str(data.get('inn'))).count()

			return JsonResponse({'data':pudratchi_tash_info,
					'pexpl_count':pexpl_count,
					'pexpl_ind_count':pexpl_ind_count
				})

	else:
		return HttpResponse('/pudratchi_data')


 
