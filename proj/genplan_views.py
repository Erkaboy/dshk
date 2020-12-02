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

from proj.genplan_models import genplansEvent,adminsGenplan,Genplans,Genplans_edit,Sub_genplan,Sub_sub_genplan,Sub_genplan_data,Sub_genplan_data_edit,Sub_sub_genplan_data,Sub_sub_genplan_data_edit

from django.core import serializers

#from .models import Genplan1601

from django.db.models import Q
from .models import Viloyat


from django.core.mail import send_mail
from smtplib import SMTPException
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

def set_event():
	for i in Genplans.objects.filter(Q(status=0),~Q(status=4)):
		event=genplansEvent.objects.create(
			genplan_id=i.id,
			admin_id=1,
			event_type= 1,
			object_box=' - ',
			event_dis=' - ',
			event_date=datetime(2019, 1, 1),
			superadmin_id=2,
			event_ans_type=1,
			event_ans_dis=' - ',
			event_ans_date=datetime(2019, 1, 2),
			)

	for i in Genplans_edit.objects.filter(Q(status=3)):
		event=genplansEvent.objects.create(
			genplan_id=i.id,
			admin_id=1,
			event_type= 3,
			object_box=' - ',
			event_dis=' - ',
			event_date=datetime(2020, 1, 1),
			)
		i.admin_id=1
		i.send_sdmin=1
		i.event_id=event.pk

	for i in Genplans_edit.objects.filter(Q(status=1)):
		i.admin_id=1
		i.send_sdmin=0
		i.save()

	for i in Genplans_edit.objects.filter(Q(status=2)):
		i.admin_id=1
		i.save()
	print('OK')


def revome():
	data=Genplans_edit.objects.filter(~Q(status=1))
	for i in data:
		i.delete()

	data2=Sub_genplan_data.objects.all()
	for j in data2:
		j.delete()
def rad_etish_genplan_edit(request):
	if request.method=='POST':
		data=request.POST
		genplan_edit = Genplans_edit.objects.filter(id=data.get('genplan_id')).first()
		if genplan_edit:

			admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
			vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
			admin_email=adminsGenplan.objects.filter(pk=genplan_edit.admin_id).first().email

			subject="Bosh rejalar. O'zgartirish"
			text_content = "O'zgartirish"
			html_content = '''
			<p>ID: <b>'''+genplan_edit.id+'''</b></p>
			<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
			<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
			<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
			<p>Tasdiqlovchi:  <b>'''+admin.full_name+'''</b></p>
			<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
			<p>Ob'yekt statusi: <b style='background-color:red; color:white;'>O'zgartirish tasdiqlanmadi !</b></p>
			<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
			<p>Qisqacha izoh: "'''+data.get('comment')+'''"</p>
			'''

			try:
				msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [admin_email])
				msg.attach_alternative(html_content, "text/html")
				msg.send()

				event=genplansEvent.objects.filter(pk=genplan_edit.event_id).first()
				event.superadmin_id=admin.pk
				event.event_ans_type=0
				event.event_ans_dis=data.get('comment')
				event.event_ans_date=datetime.now()
				event.save()

				genplan_edit.send_sdmin=0
				genplan_edit.save()
				return HttpResponse(1)

			except SMTPException as e:
				return HttpResponse(0)

		else:
			return HttpResponse(1)
	else:
		return HttpResponse('/rad_etish_genplan_edit')



def rad_etish_genplan_new(request):
	if request.method=='POST':
		data=request.POST

		genplan_edit = Genplans_edit.objects.filter(id=data.get('genplan_id')).first()
		if genplan_edit:
			# print(request.session['id'])
			admin=adminsGenplan.objects.filter(pk=request.session['id']).first()

			vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
			admin_email=adminsGenplan.objects.filter(pk=genplan_edit.admin_id).first().email


			subject="Bosh rejalar. Yangi ob'yekt qo'shish"
			text_content = "Yangi ob'yekt qo'shish"
			html_content = '''
			<p>ID: <b>'''+genplan_edit.id+'''</b></p>
			<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
			<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
			<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
			<p>Tasdiqlovchi:  <b>'''+admin.full_name+'''</b></p>
			<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
			<p>Ob'yekt statusi: <b style='background-color:red; color:white;'> Tasdiqlanmadi!</b></p>
			<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
			<p>Qisqacha izoh: "'''+data.get('comment')+'''"</p>
			'''

			try:
				msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [admin_email])
				msg.attach_alternative(html_content, "text/html")
				msg.send()

				event=genplansEvent.objects.filter(pk=genplan_edit.event_id).first()
				print(event)

				event.superadmin_id=admin.pk
				event.event_ans_type=0
				event.event_ans_dis=data.get('comment')
				event.event_ans_date=datetime.now()

				event.save()


				genplan_edit.send_sdmin=0
				genplan_edit.save()
				return HttpResponse(1)

			except SMTPException as e:
				return HttpResponse(0)
		else:
			return HttpResponse(1)

	else:
		return HttpResponse('/rad_etish_genplan_new')


# for i in genplansEvent.objects.all():
# 	print(i.event_ans_dis)

def send_admin_genplan_new(request):
	if request.method=='POST':
		data=request.POST
		genplan_edit = Genplans_edit.objects.filter(id=data.get('genplan_id')).first()
		if genplan_edit:
			admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
			superadmin_email=adminsGenplan.objects.filter(status=2).first().email
			vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()

			subject="Bosh rejalar. Yangi ob'yekt qo'shish"
			text_content = "Yangi ob'yekt qo'shish"
			html_content = '''
			<p>ID: <b>'''+genplan_edit.id+'''</b></p>
			<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
			<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
			<p>Tuman, shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
			<p>Kirituvchi:  <b>'''+admin.full_name+'''</b></p>
			<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
			<p>Ob'yekt statusi: <b style='background-color:green; color:white;'>Yangi kiritishni tasdiqlash</b></p>
			<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
			<p>Qisqacha izoh: "'''+data.get('comment')+'''"</p>
			Geoportalda ob'yekt joylashuvini ko'rish: <a href='https://dshk.uz/main?sub=2&subs=22&lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1'))+'''&z=-1' target='blank'>https://dshk.uz/main?sub=2&subs=22&lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1'))+'''&z=-1</a>
			'''

			try:
				msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [superadmin_email])
				msg.attach_alternative(html_content, "text/html")
				msg.send()
				
				event=genplansEvent.objects.create(
					genplan_id=genplan_edit.id,
					admin_id=admin.pk,
					event_type= 1,
					object_box='''lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1')),
					event_dis=data.get('comment'),
					event_date=datetime.now()
					)

				if genplan_edit:
					genplan_edit.send_sdmin=1
					genplan_edit.event_id=event.pk
					genplan_edit.save()
					return HttpResponse(1)
			except SMTPException as e:
				return HttpResponse(0)

		else:
			return HttpResponse(1)

	else:
		return HttpResponse('/send_admin_genplan_new')



def send_admin_genplan_edit(request):
	if request.method=='POST':
		data=request.POST
		genplan_edit = Genplans_edit.objects.filter(id=data.get('genplan_id')).first()
		if genplan_edit:
			admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
			vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
			superadmin_email=adminsGenplan.objects.filter(status=2).first().email

			subject="Bosh rejalar. O'zgartirish"
			text_content = "O'zgartirish"
			html_content = '''
			<p>ID: <b>'''+genplan_edit.id+'''</b></p>
			<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
			<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
			<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
			<p>O'zgartiruvchi:  <b>'''+admin.full_name+'''</b></p>
			<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
			<p>Ob'yekt statusi: <b style='background-color:orange; color:white;'>O'zgartirishni tasdiqlash</b></p>
			<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
			<p>Qisqacha izoh: "'''+data.get('comment')+'''"</p>
			Geoportalda ob'yekt joylashuvini ko'rish: <a href='https://dshk.uz/main?sub=2&subs=22&lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1'))+'''&z=-1' target='blank'>https://dshk.uz/main?sub=2&subs=22&lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1'))+'''&z=-1</a>
			'''

			try:
				msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [superadmin_email])
				msg.attach_alternative(html_content, "text/html")
				msg.send()
				if genplan_edit:

					event=genplansEvent.objects.create(
					genplan_id=genplan_edit.id,
					admin_id=admin.pk,
					event_type= 2,
					object_box='''lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1')),
					event_dis=data.get('comment'),
					event_date=datetime.now()
					)

					genplan_edit.send_sdmin=1
					genplan_edit.event_id=event.pk
					genplan_edit.save()
					return HttpResponse(1)
			except SMTPException as e:
				return HttpResponse(0)
		else:
			return HttpResponse(1)

		
	else:
		return HttpResponse('/send_admin_genplan_edit')








def genplans_data(request):
	data=request.POST
	if data.get('type')=='genplan':
		if data.get('filter')=='-0':
			genplan= Genplans.objects.filter(~Q(status = 4))
			genplan_data= serializers.serialize('json',genplan,fields=[
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

			return JsonResponse({'data':genplan_data})
		else:
			if data.get('filter_type')=='tas':
				genplan= Genplans.objects.filter(~Q(status = 4),Q(tasdiqlanganligi=data.get('filter')))
				genplan_data= serializers.serialize('json',genplan,fields=[
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
				return JsonResponse({'data':genplan_data})
			elif data.get('filter_type')=='vil':
				genplan= Genplans.objects.filter(~Q(status = 4),Q(respublika_viloyat=data.get('filter')))
				genplan_data= serializers.serialize('json',genplan,fields=[
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
				return JsonResponse({'data':genplan_data})
	elif data.get('type')=='genplan_edit':
		if data.get('filter_type')=='status':
			genplan= Genplans_edit.objects.filter(status=data.get('filter'))
			genplan_data= serializers.serialize('json',genplan,fields=[
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
			return JsonResponse({'data':genplan_data})
		elif data.get('filter_type')=='vil':
			genplan= Genplans_edit.objects.filter(respublika_viloyat=data.get('filter'))
			genplan_data= serializers.serialize('json',genplan,fields=[
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
			return JsonResponse({'data':genplan_data})

def save_edit_genplan(request):
	if request.method=='POST':
		data=request.POST
		genplan_edit = Genplans_edit.objects.filter(id=data.get('genplan_id')).first()
		genplan = Genplans.objects.filter(pk=genplan_edit.genplan_id.pk).first()

		sub_genplan_data= Sub_genplan_data.objects.filter(genplan_id=genplan.pk)
		sub_genplan_data_0= Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk)

		if data.get('confirm')=='1':
			try:
				admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
				vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
				admin_email=adminsGenplan.objects.filter(pk=genplan_edit.admin_id).first().email
				subject="Bosh rejalar. O'zgartirish"
				text_content = "O'zgartirish"
				html_content = '''
				<p>ID: <b>'''+genplan_edit.id+'''</b></p>
				<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
				<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
				<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
				<p>Tasdiqlovchi:  <b>'''+admin.full_name+'''</b></p>
				<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
				<p>Ob'yekt statusi: <b style='background-color:green; color:white;'>O'zgartirish tasdiqlandi !</b></p>
				<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
				'''
				msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [admin_email])
				msg.attach_alternative(html_content, "text/html")
				msg.send()


				event=genplansEvent.objects.filter(pk=genplan_edit.event_id).first()
				event.superadmin_id=admin.pk
				event.event_ans_type=1
				event.event_ans_date=datetime.now()
				event.save()

				for sub_item in sub_genplan_data:
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
						# print('uchirildi')

					elif sub_item.status==2:
						sub_sub_genplan_data = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=sub_item.pk)
						sub_genplan_data_edit=Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk,sub_genplan_id=sub_item.sub_genplan_id.pk).first()

						for sub_sub_item in sub_sub_genplan_data:
							if sub_sub_item.status==3:
								sub_sub_item.delete()
							elif sub_sub_item.status==2:
								sub_sub_genplan_data_edit=Sub_sub_genplan_data_edit.objects.filter(sub_sub_genplan_id=sub_sub_item.sub_sub_genplan_id.pk,Sub_genplan_data_id=sub_genplan_data_edit.pk).first()
								if sub_sub_item.file!=sub_sub_genplan_data_edit.file:
									if sub_sub_item.file!='':
										os.remove(str(sub_sub_item.file))
									sub_sub_item.file=sub_sub_genplan_data_edit.file
									sub_sub_item.save()							

						if sub_item.pdf!='' and sub_item.pdf!=sub_genplan_data_edit.pdf:
							os.remove(str(sub_item.pdf))
						sub_item.pdf=sub_genplan_data_edit.pdf

						if sub_item.geotif!='' and sub_item.geotif!=sub_genplan_data_edit.geotif:
							os.remove(str(sub_item.geotif))

							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_item.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_item.layer_name)
								
								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_item.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
							except IOError:
								return HttpResponse(-11)

						sub_item.geotif=sub_genplan_data_edit.geotif
						sub_item.layer_name=sub_genplan_data_edit.layer_name
						sub_item.save()
					
						if sub_item.geotif=='' and sub_item.pdf=='':
							sub_item.delete()

				for sub_item in sub_genplan_data_0:
					if sub_item.status==1:
						Sub_genplan_data.objects.create(
						genplan_id=genplan,
						sub_genplan_id=sub_item.sub_genplan_id,
						layer_name=sub_item.layer_name,
						status=0,
						geotif = sub_item.geotif,
						pdf = sub_item.pdf
					)
				for sub_item in sub_genplan_data_0:			
					sub_sub_genplan_data_0 = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_item.pk)
					for sub_sub_item in sub_sub_genplan_data_0:
						if sub_sub_item.status==1:
							sub_genplan_data_main= Sub_genplan_data.objects.filter(genplan_id=genplan.pk,sub_genplan_id=sub_item.sub_genplan_id.pk).first()
							Sub_sub_genplan_data.objects.create(
							Sub_genplan_data_id=sub_genplan_data_main,
							sub_sub_genplan_id=sub_sub_item.sub_sub_genplan_id,
							status=0,
							file=sub_sub_item.file
					)

				for sub_item in sub_genplan_data_0:	
					sub_sub_genplan_data_0 = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_item.pk)
					for sub_sub_item in sub_sub_genplan_data_0:
						sub_sub_item.my_delete()
					sub_item.my_delete()

				genplan.aholi_punktining_nomi=genplan_edit.aholi_punktining_nomi
				genplan.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =genplan_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi
				genplan.aholi_punktining_tipi=genplan_edit.aholi_punktining_tipi
				genplan.aholi_punktining_maqomi=genplan_edit.aholi_punktining_maqomi
				genplan.respublika_viloyat =genplan_edit.respublika_viloyat
				genplan.tuman_shahar = genplan_edit.tuman_shahar
				genplan.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =genplan_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv
				genplan.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =genplan_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy
				genplan.shahar_chegarasi_loyihasini_tasdiqlangan_organ =genplan_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ
				genplan.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =genplan_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san
				genplan.aholi_punktining_loyihaviy_maydoni_ga =genplan_edit.aholi_punktining_loyihaviy_maydoni_ga
				genplan.tasdiqlanganligi=genplan_edit.tasdiqlanganligi
				genplan.aholining_loyihaviy_soni =genplan_edit.aholining_loyihaviy_soni
				genplan.ishlab_chiqalgan_yili=genplan_edit.ishlab_chiqalgan_yili
				genplan.reja_qilingan_hujjat=genplan_edit.reja_qilingan_hujjat
				genplan.wkb_geometry=genplan_edit.wkb_geometry
	 
				if genplan.grafik_malumot!='' and genplan.grafik_malumot!=genplan_edit.grafik_malumot:
					os.remove(str(genplan.grafik_malumot))
				genplan.grafik_malumot=genplan_edit.grafik_malumot
				
				if genplan.izohlovchi_malumot!='' and genplan.izohlovchi_malumot!=genplan_edit.izohlovchi_malumot:
					os.remove(str(genplan.izohlovchi_malumot))
				genplan.izohlovchi_malumot=genplan_edit.izohlovchi_malumot

				sub_genplan_data= Sub_genplan_data.objects.filter(genplan_id=genplan.pk)
				for sub_item in sub_genplan_data:			
					sub_sub_genplan_data = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=sub_item.pk)
					for sub_sub_item in sub_sub_genplan_data:
						sub_sub_item.status==0
						sub_sub_item.save()
					sub_item.status=0
					sub_item.save()
				genplan.status=0
				genplan.id=genplan_edit.id
				genplan.save()

				genplan_edit.my_delete()
				return HttpResponse(1)

			except SMTPException as e:
				return HttpResponse(0)
		else:
			for sub_item in sub_genplan_data_0:			
				sub_sub_genplan_data_0 = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_genplan_data_0:
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
					sub_genplan_data=Sub_genplan_data.objects.filter(genplan_id=genplan.pk,sub_genplan_id=sub_item.sub_genplan_id.pk).first()
					if sub_genplan_data:
						if sub_item.pdf!='' and sub_item.pdf!=sub_genplan_data.pdf:
							os.remove(str(sub_item.pdf))

						if sub_item.geotif!='' and sub_item.geotif!=sub_genplan_data.geotif:
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

			if genplan_edit.grafik_malumot!='' and genplan.grafik_malumot!=genplan_edit.grafik_malumot:
				os.remove(str(genplan_edit.grafik_malumot))
			
			if genplan_edit.izohlovchi_malumot!='' and genplan.izohlovchi_malumot!=genplan_edit.izohlovchi_malumot:
				os.remove(str(genplan_edit.izohlovchi_malumot))

			genplan_edit.my_delete()

			for sub_item in sub_genplan_data:			
				sub_sub_genplan_data = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=sub_item.pk)
				for sub_sub_item in sub_sub_genplan_data:
					sub_sub_item.status==0
					sub_sub_item.save()
				sub_item.status=0
				sub_item.save()
			genplan.status=0
			genplan.save()
			return HttpResponse(0)
	else:
		return HttpResponse('/save_edit_genplan')


def copy_table_genplan(genplan_id,admin_id):

	genplan = Genplans.objects.filter(pk=genplan_id).first()
	genplan_edit = Genplans_edit.objects.create(
					aholi_punktining_nomi=genplan.aholi_punktining_nomi,
					genplan_id=genplan,
					id=genplan.id,
					mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =genplan.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
					aholi_punktining_tipi=genplan.aholi_punktining_tipi,
					aholi_punktining_maqomi=genplan.aholi_punktining_maqomi,
					respublika_viloyat =genplan.respublika_viloyat,
					tuman_shahar = genplan.tuman_shahar,
					loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =genplan.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
					shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =genplan.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
					shahar_chegarasi_loyihasini_tasdiqlangan_organ = genplan.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
					shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =genplan.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
					aholi_punktining_loyihaviy_maydoni_ga =genplan.aholi_punktining_loyihaviy_maydoni_ga,
					tasdiqlanganligi=genplan.tasdiqlanganligi,
					aholining_loyihaviy_soni = genplan.aholining_loyihaviy_soni,
					ishlab_chiqalgan_yili=genplan.ishlab_chiqalgan_yili,
					reja_qilingan_hujjat=genplan.reja_qilingan_hujjat,
					grafik_malumot=genplan.grafik_malumot,
					izohlovchi_malumot=genplan.izohlovchi_malumot,
					wkb_geometry=genplan.wkb_geometry,
					admin_id=admin_id,
					status =2
				)
	genplan.status=2
	genplan.save()

	sub_genplan_datas = Sub_genplan_data.objects.filter(genplan_id=genplan_id)
	for sub_item in sub_genplan_datas:
		sub_genplan_data_edit = Sub_genplan_data_edit.objects.create(
		genplan_id=genplan_edit,
		sub_genplan_id=sub_item.sub_genplan_id,
		layer_name=sub_item.layer_name,
		status=sub_item.status,
		geotif = sub_item.geotif,
		pdf = sub_item.pdf
		)
	
		sub_sub_genplan_datas = Sub_sub_genplan_data.objects.filter(
			Sub_genplan_data_id=sub_item.pk)
		for sub_sub_item in sub_sub_genplan_datas:
			sub_sub_genplan_data_edit = Sub_sub_genplan_data_edit.objects.create(
				Sub_genplan_data_id=sub_genplan_data_edit,
				sub_sub_genplan_id=sub_sub_item.sub_sub_genplan_id,
				status=sub_sub_item.status,
				file=sub_sub_item.file
				)
	return genplan_edit.pk 

def save_genplan(request):
	if request.method=='POST':
		genplan_id=request.POST.get('genplan_id')
		genplan_edit = Genplans_edit.objects.filter(id=genplan_id).first()
		if request.POST.get('confirm')=='1':

			if genplan_edit:
				if not genplan_edit.genplan_id:
					try:
						admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
						vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
						admin_email=adminsGenplan.objects.filter(pk=genplan_edit.admin_id).first().email
						print(admin_email)

						subject="Bosh rejalar. Yangi ob'yekt qo'shish"
						text_content = "Yangi ob'yekt qo'shish"
						html_content = '''
						<p>ID: <b>'''+genplan_edit.id+'''</b></p>
						<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
						<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
						<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
						<p>Tasdiqlovchi:  <b>'''+admin.full_name+'''</b></p>
						<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
						<p>Ob'yekt statusi: <b style='background-color:green; color:white;'> Tasdiqlandi!</b></p>
						<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
						'''

						msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [admin_email])
						msg.attach_alternative(html_content, "text/html")
						msg.send()

						event=genplansEvent.objects.filter(pk=genplan_edit.event_id).first()
						event.superadmin_id=admin.pk
						event.event_ans_type=1
						event.event_ans_date=datetime.now()
						event.save()


						genplan = Genplans.objects.create(
							aholi_punktining_nomi=genplan_edit.aholi_punktining_nomi,
							id=genplan_edit.id,										
							mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =genplan_edit.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
							aholi_punktining_tipi=genplan_edit.aholi_punktining_tipi,
							aholi_punktining_maqomi=genplan_edit.aholi_punktining_maqomi,
							respublika_viloyat =genplan_edit.respublika_viloyat,
							tuman_shahar = genplan_edit.tuman_shahar,
							loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =genplan_edit.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
							shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =genplan_edit.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
							shahar_chegarasi_loyihasini_tasdiqlangan_organ = genplan_edit.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
							shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =genplan_edit.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
							aholi_punktining_loyihaviy_maydoni_ga =genplan_edit.aholi_punktining_loyihaviy_maydoni_ga,
							tasdiqlanganligi=genplan_edit.tasdiqlanganligi,
							aholining_loyihaviy_soni = genplan_edit.aholining_loyihaviy_soni,
							ishlab_chiqalgan_yili=genplan_edit.ishlab_chiqalgan_yili,
							reja_qilingan_hujjat=genplan_edit.reja_qilingan_hujjat,
							grafik_malumot=genplan_edit.grafik_malumot,
							izohlovchi_malumot=genplan_edit.izohlovchi_malumot,
							wkb_geometry=genplan_edit.wkb_geometry,
							status=0,
						)

						sub_genplan_datas_edit = Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk)
						for sub_item in sub_genplan_datas_edit:
							sub_genplan_data = Sub_genplan_data.objects.create(
								genplan_id=genplan,
								sub_genplan_id=sub_item.sub_genplan_id,
								layer_name=sub_item.layer_name,
								geotif = sub_item.geotif,
								pdf = sub_item.pdf,
								status=0
							)
							sub_sub_genplan_datas_edit = Sub_sub_genplan_data_edit.objects.filter(
								Sub_genplan_data_id=sub_item.pk)
							for sub_sub_item in sub_sub_genplan_datas_edit:
								sub_sub_genplan_data = Sub_sub_genplan_data.objects.create(
			                            Sub_genplan_data_id=sub_genplan_data,
			                            sub_sub_genplan_id=sub_sub_item.sub_sub_genplan_id,
			                            file=sub_sub_item.file,
			                            status=0
			                        )
								sub_sub_item.my_delete()
							sub_item.my_delete()
						genplan.status = 0
						genplan.save()

						genplan_edit.my_delete()
						return HttpResponse(1)
					except SMTPException as e:
						return HttpResponse(0)

				else:
					return HttpResponse(0)
			else:
				return HttpResponse(0)
		else:
			if genplan_edit:
				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk)
				for item in sub_genplan_data:
					try:
						url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+item.layer_name+"/?recurse=true"
						r = requests.delete(url, auth=('admin', 'uzgashk'))
						r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+item.layer_name)
						url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+item.layer_name+".xml"
						r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
					except IOError:
						return HttpResponse(-11)
				genplan_edit.delete()
				return HttpResponse(2)
			else:
				return HttpResponse(3)
	else:
		return HttpResponse('/save_genplan')

def edit_genplan_dialog_tabs(request):
	
	if request.method=='POST':

		d=request.POST
		genplan_id=d.get('genplan_id')
		status=d.get('status')
		if status=='1':

			genplan_edit= Genplans_edit.objects.get(id=genplan_id)
			genplan_data= serializers.serialize('geojson', [genplan_edit,])

			sub_genplan_data_edit = Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk)
			sub_genplan = Sub_genplan.objects.all().values()
			sub_sub_genplan = Sub_sub_genplan.objects.all().values()
			sub_sub_genplan_datas_edit = list()
		
			for item in sub_genplan_data_edit:
				sub_sub_genplan_data_edit = Sub_sub_genplan_data_edit.objects.filter(
	                Sub_genplan_data_id=item.id).values()

				if sub_sub_genplan_data_edit:
					sub_sub_genplan_datas_edit.append(list(sub_sub_genplan_data_edit))
			return JsonResponse(
	            [{'genplan_id': genplan_edit.pk,
	              'status': 1,
	              'genplan_data':genplan_data,
	              'sub_genplans': list(sub_genplan),
	              'sub_genplan_data': list(sub_genplan_data_edit.values()),
	              'sub_sub_genplans': list(sub_sub_genplan),
	              'sub_sub_genplan_datas': sub_sub_genplan_datas_edit
	              }],
	            safe=False)
		elif status=='2':

			genplan_edit= Genplans_edit.objects.get(id=genplan_id)
			genplan_data= serializers.serialize('geojson', [genplan_edit,])

			sub_genplan_data_edit = Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk)
			sub_genplan = Sub_genplan.objects.all().values()
			sub_sub_genplan = Sub_sub_genplan.objects.all().values()
			sub_sub_genplan_datas_edit = list()
		
			for item in sub_genplan_data_edit:
				sub_sub_genplan_data_edit = Sub_sub_genplan_data_edit.objects.filter(
	                Sub_genplan_data_id=item.id).values()

				if sub_sub_genplan_data_edit:
					sub_sub_genplan_datas_edit.append(list(sub_sub_genplan_data_edit))
			return JsonResponse(
	            [{'genplan_id': genplan_edit.pk,
	              'status': 2,
	              'genplan_data':genplan_data,
	              'sub_genplans': list(sub_genplan),
	              'sub_genplan_data': list(sub_genplan_data_edit.values()),
	              'sub_sub_genplans': list(sub_sub_genplan),
	              'sub_sub_genplan_datas': sub_sub_genplan_datas_edit
	              }],
	            safe=False)
		elif status=='0':
			genplan_edit= Genplans_edit.objects.filter(id=genplan_id).first()
			if genplan_edit:
				genplan_data= serializers.serialize('geojson', [genplan_edit,])

				sub_genplan_data_edit = Sub_genplan_data_edit.objects.filter(genplan_id=genplan_edit.pk)
				sub_genplan = Sub_genplan.objects.all().values()
				sub_sub_genplan = Sub_sub_genplan.objects.all().values()
				sub_sub_genplan_datas_edit = list()
			
				for item in sub_genplan_data_edit:
					sub_sub_genplan_data_edit = Sub_sub_genplan_data_edit.objects.filter(
		                Sub_genplan_data_id=item.id).values()

					if sub_sub_genplan_data_edit:
						sub_sub_genplan_datas_edit.append(list(sub_sub_genplan_data_edit))
				return JsonResponse(
		            [{'genplan_id': genplan_edit.pk,
		              'status': 2,
		              'genplan_data':genplan_data,
		              'sub_genplans': list(sub_genplan),
		              'sub_genplan_data': list(sub_genplan_data_edit.values()),
		              'sub_sub_genplans': list(sub_sub_genplan),
		              'sub_sub_genplan_datas': sub_sub_genplan_datas_edit
		              }],
		            safe=False)
			else:
				genplan= Genplans.objects.filter(id=genplan_id).first()
				
				genplan_data= serializers.serialize('geojson', [genplan,])

				sub_genplan_data = Sub_genplan_data.objects.filter(genplan_id=genplan.pk)
				sub_genplan = Sub_genplan.objects.all().values()
				sub_sub_genplan = Sub_sub_genplan.objects.all().values()
				sub_sub_genplan_datas = list()
			
				for item in sub_genplan_data:
					sub_sub_genplan_data = Sub_sub_genplan_data.objects.filter(
		                Sub_genplan_data_id=item.id).values()

					if sub_sub_genplan_data:
						sub_sub_genplan_datas.append(list(sub_sub_genplan_data))
				return JsonResponse(
		            [{'genplan_id': genplan.pk,
		              'status': 0,
		              'genplan_data':genplan_data,
		              'sub_genplans': list(sub_genplan),
		              'sub_genplan_data': list(sub_genplan_data.values()),
		              'sub_sub_genplans': list(sub_sub_genplan),
		              'sub_sub_genplan_datas': sub_sub_genplan_datas
		              }],
		            safe=False)
		else:
			genplan= Genplans.objects.filter(id=genplan_id).first()
			genplan_data= serializers.serialize('geojson', [genplan,])

			sub_genplan_data = Sub_genplan_data.objects.filter(genplan_id=genplan.pk)
			sub_genplan = Sub_genplan.objects.all().values()
			sub_sub_genplan = Sub_sub_genplan.objects.all().values()
			sub_sub_genplan_datas = list()
			
			for item in sub_genplan_data:
				sub_sub_genplan_data = Sub_sub_genplan_data.objects.filter(
		                Sub_genplan_data_id=item.id).values()

				if sub_sub_genplan_data:
					sub_sub_genplan_datas.append(list(sub_sub_genplan_data))
			return JsonResponse(
		            [{'genplan_id': genplan.pk,
		              'status': 3,
		              'genplan_data':genplan_data,
		              'sub_genplans': list(sub_genplan),
		              'sub_genplan_data': list(sub_genplan_data.values()),
		              'sub_sub_genplans': list(sub_sub_genplan),
		              'sub_sub_genplan_datas': sub_sub_genplan_datas
		              }],
		            safe=False)
	else:
		return HttpResponse('/edit_genplan_dialog_tabs')


def create_genplan(request):
	if request.method=='POST':
		data=request.POST 
		if data.get('genplan_id')=='-1':
			obj = Genplans_edit.objects.create(
	        	aholi_punktining_nomi=data.get('genplan_ahpn'),
				mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('genplan_soata'),
				aholi_punktining_tipi=data.get('genplan_apt'),
				aholi_punktining_maqomi=data.get('genplan_apm'),
				respublika_viloyat = data.get('genplan_vil'),
				tuman_shahar = data.get('genplan_tum_shah'),
				loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('genplan_lt'),
				shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('genplan_shchsj'),
				shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('genplan_to'),
				shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('genplan_lhr'),
				aholi_punktining_loyihaviy_maydoni_ga = data.get('genplan_aplm'),
				aholining_loyihaviy_soni = data.get('genplan_als'),
				ishlab_chiqalgan_yili=data.get('genplan_ichy'),
				reja_qilingan_hujjat=data.get('genplan_rqh'),
				tasdiqlanganligi=data.get('genplan_thm'),
				grafik_malumot=request.FILES.get('genplan_gm'),
				izohlovchi_malumot=request.FILES.get('genplan_im'),
	        	wkb_geometry=GEOSGeometry(data.get('geometry')),
	        	admin_id=request.session['id'],
	        	status=1)
			obj.id='genplan_'+str(obj.pk)
			obj.save()
 
			return JsonResponse({'status':1,'genplan_id':obj.pk})
		else:

			if data.get('status')=='1':

				obj=Genplans_edit.objects.get(pk=int(data.get('genplan_id')))

				obj.aholi_punktining_nomi=data.get('genplan_ahpn')
				obj.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('genplan_soata')
				obj.aholi_punktining_tipi=data.get('genplan_apt')
				obj.aholi_punktining_maqomi=data.get('genplan_apm')
				obj.respublika_viloyat = data.get('genplan_vil')
				obj.tuman_shahar = data.get('genplan_tum_shah')
				obj.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('genplan_lt')
				obj.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('genplan_shchsj')
				obj.shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('genplan_to')
				obj.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('genplan_lhr')
				obj.aholi_punktining_loyihaviy_maydoni_ga = data.get('genplan_aplm')
				obj.tasdiqlanganligi= data.get('genplan_thm')
				obj.aholining_loyihaviy_soni = data.get('genplan_als')
				obj.ishlab_chiqalgan_yili=data.get('genplan_ichy')
				obj.reja_qilingan_hujjat=data.get('genplan_rqh')

				if request.FILES.get('genplan_gm',False):
					if obj.grafik_malumot!='':
						os.remove(str(obj.grafik_malumot))
					obj.grafik_malumot=request.FILES.get('genplan_gm')

				if request.FILES.get('genplan_im',False):
					if obj.izohlovchi_malumot!='':
						os.remove(str(obj.izohlovchi_malumot))
					obj.izohlovchi_malumot=request.FILES.get('genplan_im')

				obj.wkb_geometry=GEOSGeometry(data.get('geometry'))
				
				obj.save()

				return JsonResponse({'status':1,'genplan_id':data.get('genplan_id')})

			elif data.get('status')=='0' or data.get('status')=='2':


				if data.get('status')=='0':

					genplan_0 = Genplans.objects.get(pk=data.get('genplan_id'))
					genplan = Genplans_edit.objects.filter(genplan_id=genplan_0.pk).first()
					if not genplan:
						edit_genplan_id=copy_table_genplan(data.get('genplan_id'),request.session['id'])
					else:
						edit_genplan_id=genplan.pk
				else:
					edit_genplan_id=data.get('genplan_id')

				obj = Genplans_edit.objects.filter(pk=edit_genplan_id).first()
				obj_0 = Genplans.objects.filter(pk=obj.genplan_id.pk).first()
					
				obj.aholi_punktining_nomi=data.get('genplan_ahpn')
				obj.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =data.get('genplan_soata')
				obj.aholi_punktining_tipi=data.get('genplan_apt')
				obj.aholi_punktining_maqomi=data.get('genplan_apm')
				obj.respublika_viloyat = data.get('genplan_vil')
				obj.tuman_shahar = data.get('genplan_tum_shah')
				obj.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =data.get('genplan_lt')
				obj.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =data.get('genplan_shchsj')
				obj.shahar_chegarasi_loyihasini_tasdiqlangan_organ = data.get('genplan_to')
				obj.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =data.get('genplan_lhr')
				obj.aholi_punktining_loyihaviy_maydoni_ga = data.get('genplan_aplm')
				obj.tasdiqlanganligi= data.get('genplan_thm')
				obj.aholining_loyihaviy_soni = data.get('genplan_als')
				obj.ishlab_chiqalgan_yili=data.get('genplan_ichy')
				obj.reja_qilingan_hujjat=data.get('genplan_rqh')

				obj.wkb_geometry=GEOSGeometry(data.get('geometry'))

				if request.FILES.get('genplan_gm',False):
					if obj.grafik_malumot!='' and obj.grafik_malumot!=obj_0.grafik_malumot:
						os.remove(str(obj.grafik_malumot))
					obj.grafik_malumot=request.FILES.get('genplan_gm')
					print('grafik_malumot')

				if request.FILES.get('genplan_im',False):

					if obj.izohlovchi_malumot!='' and obj.izohlovchi_malumot!=obj_0.izohlovchi_malumot:
						os.remove(str(obj.izohlovchi_malumot))
					obj.izohlovchi_malumot=request.FILES.get('genplan_im')
					print('izohlovchi_malumot')

				obj.save()

				return JsonResponse({'status':2,'genplan_id':edit_genplan_id})

	else:
		return HttpResponse('/create_genplan')

def delete_genplan(request):
	if request.method=='POST':
		data=request.POST
		if data.get('type')=='first_delete':
			if data.get('genplan_id')!='-1':
				genplan = Genplans_edit.objects.filter(pk=data.get('genplan_id')).first()
				if genplan:
					sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=genplan.pk)
					for item in sub_genplan_data:
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+item.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+item.layer_name)
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+item.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)
					genplan.delete()
					return HttpResponse(1)
				else:
					return HttpResponse(0)
			else:
				return HttpResponse(0)
		elif data.get('type')=='last_delete':

			genplan = Genplans.objects.filter(id=data.get('genplan_id')).first()
			genplan_0 = Genplans_edit.objects.filter(genplan_id=genplan.pk,status=3).first()

			if genplan_0:
				return HttpResponse(genplan_0.pk)
			else:

				try:

					admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
					vil=Viloyat.objects.filter(vil_id=genplan.respublika_viloyat).first()
					superadmin_email=adminsGenplan.objects.filter(status=2).first().email


					subject="Bosh rejalar. O'chirish"
					text_content = "O'chirish"
					html_content = '''
					<p>ID: <b>'''+genplan.id+'''</b></p>
					<p>Aholi punktininng nomi: <b>'''+genplan.aholi_punktining_nomi+'''</b></p>
					<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
					<p>Tuman,shahar: <b>'''+genplan.tuman_shahar+'''</b></p>
					<p>O'chiruvchi:  <b>'''+admin.full_name+'''</b></p>
					<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
					<p>Ob'yekt statusi: <b style='background-color:red; color:white;'>O'chirishni tasdiqlash</b></p>
					<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
					<p>Qisqacha izoh: "'''+data.get('comment')+'''"</p>
					Geoportalda ob'yekt joylashuvini ko'rish: <a href='https://dshk.uz/main?sub=2&subs=22&lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1'))+'''&z=-1' target='blank'>https://dshk.uz/main?sub=2&subs=22&lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1'))+'''&z=-1</a>
					'''
					msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [superadmin_email])
					msg.attach_alternative(html_content, "text/html")
					msg.send()


					event=genplansEvent.objects.create(
						genplan_id=genplan.id,
						admin_id=admin.pk,
						event_type= 3,
						object_box='''lat0='''+str(data.get('x0'))+'''&lng0='''+str(data.get('y0'))+'''&lat1='''+str(data.get('x1'))+'''&lng1='''+str(data.get('y1')),
						event_dis=data.get('comment'),
						event_date=datetime.now()
						)

					genplan_edit = Genplans_edit.objects.create(
							aholi_punktining_nomi=genplan.aholi_punktining_nomi,
							genplan_id=genplan,
							id=genplan.id,			
							mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi =genplan.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi,
							aholi_punktining_tipi=genplan.aholi_punktining_tipi,
							aholi_punktining_maqomi=genplan.aholi_punktining_maqomi,
							respublika_viloyat = genplan.respublika_viloyat,
							tuman_shahar = genplan.tuman_shahar,
							loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv =genplan.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv,
							shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy =genplan.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy,
							shahar_chegarasi_loyihasini_tasdiqlangan_organ = genplan.shahar_chegarasi_loyihasini_tasdiqlangan_organ,
							shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san =genplan.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san,
							aholi_punktining_loyihaviy_maydoni_ga =genplan.aholi_punktining_loyihaviy_maydoni_ga,
							tasdiqlanganligi=genplan.tasdiqlanganligi,
							aholining_loyihaviy_soni =genplan.aholining_loyihaviy_soni,
							ishlab_chiqalgan_yili=genplan.ishlab_chiqalgan_yili,
							reja_qilingan_hujjat=genplan.reja_qilingan_hujjat,
							grafik_malumot=genplan.grafik_malumot,
							izohlovchi_malumot=genplan.izohlovchi_malumot,
							wkb_geometry=genplan.wkb_geometry,
							admin_id=request.session['id'],
							event_id=event.pk,
							status=3   
						)
					genplan.status=3
					genplan.save()
					return HttpResponse(-1)	
				except SMTPException as e:
					return HttpResponse(10)

				
		elif data.get('type')=='admin_delete':
			if data.get('confirm')=='1':
				genplan = Genplans.objects.filter(id=data.get('genplan_id'),status=4).first()
				if not genplan:
					try:
						genplan = Genplans.objects.filter(id=data.get('genplan_id')).first()
						result=Genplans_edit.objects.filter(genplan_id=genplan.pk)
						genplan_edit=result.first()

						admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
						vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
		
						admin_email=adminsGenplan.objects.filter(pk=genplan_edit.admin_id).first().email

						subject="Bosh rejalar. O'chirish"
						text_content = "O'chirish"
						html_content = '''
						<p>ID: <b>'''+genplan_edit.id+'''</b></p>
						<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
						<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
						<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
						<p>Tasdiqlovchi:  <b>'''+admin.full_name+'''</b></p>
						<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
						<p>Ob'yekt statusi: <b style='background-color:green; color:white;'>O'chirish tasdiqlandi !</b></p>
						<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
						'''

						msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [admin_email])
						msg.attach_alternative(html_content, "text/html")
						msg.send()

						event=genplansEvent.objects.filter(pk=genplan_edit.event_id).first()
						event.superadmin_id=admin.pk
						event.event_ans_type=1
						event.event_ans_dis=data.get('comment')
						event.event_ans_date=datetime.now()
						event.save()


						genplan.status=4
						genplan.save()

						
						for obj in result:
							obj.my_delete()
						return HttpResponse(1)

					except SMTPException as e:
						return HttpResponse(0)
				else:
					return HttpResponse(1)
			else:
				genplan = Genplans.objects.filter(id=data.get('genplan_id')).first()
				genplan_edit = Genplans_edit.objects.filter(genplan_id=genplan.pk,status=3).first()
				try:

					admin=adminsGenplan.objects.filter(pk=request.session['id']).first()
					vil=Viloyat.objects.filter(vil_id=genplan_edit.respublika_viloyat).first()
					admin_email=adminsGenplan.objects.filter(pk=genplan_edit.admin_id).first().email

					subject="Bosh rejalar. O'chirish"
					text_content = "O'chirish"
					html_content = '''
					<p>ID: <b>'''+genplan_edit.id+'''</b></p>
					<p>Aholi punktininng nomi: <b>'''+genplan_edit.aholi_punktining_nomi+'''</b></p>
					<p>Respublika, viloyat: <b>'''+vil.disUz+'''</b></p>
					<p>Tuman,shahar: <b>'''+genplan_edit.tuman_shahar+'''</b></p>
					<p>Tasdiqlovchi:  <b>'''+admin.full_name+'''</b></p>
					<p>Bog'lanish: <b>'''+admin.contact+''' </b> '''+admin.email+'''</p>
					<p>Ob'yekt statusi: <b style='background-color:red; color:white;'>O'chirish tasdiqlanmadi!</b></p>
					<p>Xabar jo'natilgan vaqt: <b>'''+datetime.now().strftime('%d-%m-%Y %H:%M:%S')+'''</b></p>
					<p>Qisqacha izoh: "'''+data.get('comment')+'''"</p>
					'''

					msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [admin_email])
					msg.attach_alternative(html_content, "text/html")
					msg.send()

					event=genplansEvent.objects.filter(pk=genplan_edit.event_id).first()
					event.superadmin_id=admin.pk
					event.event_ans_type=0
					event.event_ans_date=datetime.now()
					event.save()


					genplan.status=0
					genplan.save()
					genplan_edit.my_delete()
					return HttpResponse(1)

				except SMTPException as e:
					return HttpResponse(0)
	
	else:
		return HttpResponse('/delete_genplan')	

def delete_sub_sub_genplan_data(request):
	if request.method=='POST':
		data = request.POST
		status=data.get('status')
		if status=='1':
			if data.get('type')=='main_files':
				if data.get('file_type')=='gm':
					if data.get('genplan_id')!='-1':
						genplan_edit = Genplans_edit.objects.filter(pk=data.get('genplan_id')).first()
						if genplan_edit.grafik_malumot!='':
							os.remove(str(genplan_edit.grafik_malumot))
							genplan_edit.grafik_malumot=''
							genplan_edit.save()
						return JsonResponse({'status':1,'genplan_id':genplan_edit.pk, 'file_type': data.get('file_type')})
					else:
						return JsonResponse({'status':1,'genplan_id':data.get('genplan_id'), 'file_type': data.get('file_type')})
				if data.get('file_type')=='im':
					if data.get('genplan_id')!='-1':
						genplan_edit = Genplans_edit.objects.filter(pk=data.get('genplan_id')).first()
						if genplan_edit.izohlovchi_malumot!='':
							os.remove(str(genplan_edit.izohlovchi_malumot))
							genplan_edit.izohlovchi_malumot=''
							genplan_edit.save()
						return JsonResponse({'status':1,'genplan_id':genplan_edit.pk, 'file_type': data.get('file_type')})
					else:
						return JsonResponse({'status':1,'genplan_id':data.get('genplan_id'), 'file_type': data.get('file_type')})

			elif data.get('type')=='delete_sub_all':
				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=data.get('genplan_id'),
				sub_genplan_id=data.get('sub_genplan_id')).first()
				if sub_genplan_data:
					if sub_genplan_data.layer_name!='':
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_genplan_data.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_genplan_data.layer_name)
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_genplan_data.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)
					sub_genplan_data.delete()

					return JsonResponse({'status':1,'genplan_id':data.get('genplan_id'), 'sub_genplan_id': data.get('sub_genplan_id')})
				else:
					return HttpResponse(0)
			elif data.get('type')=='delete_pdf_file':
				
				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=data.get('genplan_id'),
					sub_genplan_id=data.get('sub_genplan_id')).first()
				if sub_genplan_data:
					if sub_genplan_data.pdf!='':
						if sub_genplan_data.pdf!='':
							os.remove(str(sub_genplan_data.pdf))
						sub_genplan_data.pdf=''
						sub_genplan_data.save()

						return JsonResponse({'status':1,'genplan_id':data.get('genplan_id'), 'sub_genplan_id': data.get('sub_genplan_id')})
					else:
						return HttpResponse(0)	
				else:
					return HttpResponse(0)

			elif data.get('type')=='sub_sub_genplan':

				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=data.get('genplan_id'),
					sub_genplan_id=data.get('sub_genplan_id')).first()
				if sub_genplan_data:
					sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk,
						sub_sub_genplan_id=data.get('sub_sub_genplan_id')).first()

					if sub_sub_genplan_data:
						sub_sub_genplan_data.delete()
						return JsonResponse({'status':1,'genplan_id':data.get('genplan_id'), 'sub_genplan_id': data.get('sub_genplan_id'), 'sub_sub_genplan_id': data.get('sub_sub_genplan_id')})
					else:
						return HttpResponse(0)
				else:
					return HttpResponse(0)
			elif data.get('type')=='sub_genplan':
				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=data.get('genplan_id'),sub_genplan_id=data.get('sub_genplan_id')).first()
				if sub_genplan_data:
					if sub_genplan_data.geotif!='':
						sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk)
						for obj in sub_sub_genplan_data:
							obj.delete()
						if sub_genplan_data.geotif!='':
							os.remove(str(sub_genplan_data.geotif))
							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_genplan_data.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_genplan_data.layer_name)
								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_genplan_data.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
							except IOError:
								return HttpResponse(-11)

						sub_genplan_data.geotif=''
						sub_genplan_data.layer_name=''
						sub_genplan_data.save()
						return JsonResponse({'status':1,'genplan_id':data.get('genplan_id'), 'sub_genplan_id': data.get('sub_genplan_id')})
					else:
						return HttpResponse(0)	
				else:
					return HttpResponse(0)
		elif status=='0' or status=='2':

			if status=='0':

				genplan_0 = Genplans.objects.get(pk=data.get('genplan_id'))
				genplan = Genplans_edit.objects.filter(genplan_id=genplan_0.pk).first()
				if not genplan:
					edit_genplan_id=copy_table_genplan(data.get('genplan_id'),request.session['id'])
					
				else:
					edit_genplan_id=genplan.pk
			else:
				edit_genplan_id=data.get('genplan_id')
			
			genplan = Genplans_edit.objects.filter(pk=edit_genplan_id).first()
			genplan_0 = Genplans.objects.filter(pk=genplan.genplan_id.pk).first()
			
			if data.get('type')=='main_files':
				if data.get('file_type')=='gm':
					if genplan.grafik_malumot!='' and genplan.grafik_malumot!=genplan_0.grafik_malumot:
						os.remove(str(genplan.grafik_malumot))
					genplan.grafik_malumot=''
					genplan.save()
					return JsonResponse({'status':2,'genplan_id':genplan.pk, 'file_type': data.get('file_type')})
				
				if data.get('file_type')=='im':
					if genplan.izohlovchi_malumot!='' and genplan.izohlovchi_malumot!=genplan_0.izohlovchi_malumot:
						os.remove(str(genplan.izohlovchi_malumot))
					genplan.izohlovchi_malumot=''
					genplan.save()
					return JsonResponse({'status':2,'genplan_id':genplan.pk, 'file_type': data.get('file_type')})

			elif data.get('type')=='delete_sub_all':
				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=edit_genplan_id,sub_genplan_id=data.get('sub_genplan_id')).first()
				sub_genplan_data_0 = Sub_genplan_data.objects.filter(genplan_id=genplan.genplan_id.pk,sub_genplan_id=data.get('sub_genplan_id')).first()


				if sub_genplan_data:

					if sub_genplan_data_0:
						sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk)
						for item in sub_sub_genplan_data:
							if item.status!=0 and item.status!=3:
								item.delete()
							else:
								item.my_delete()

						if sub_genplan_data_0.pdf!=sub_genplan_data.pdf and sub_genplan_data.pdf!='':
							os.remove(str(sub_genplan_data.pdf))

						if sub_genplan_data_0.geotif!=sub_genplan_data.geotif and sub_genplan_data.geotif!='':
							os.remove(str(sub_genplan_data.geotif))
							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_genplan_data.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_genplan_data.layer_name)
								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_genplan_data.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))			
							except IOError:
								return HttpResponse(-11)

						sub_genplan_data_0.status=3
						sub_genplan_data_0.save()
						sub_genplan_data.my_delete()

					else:
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_genplan_data.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_genplan_data.layer_name)
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_genplan_data.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
						except IOError:
							return HttpResponse(-11)


						sub_genplan_data.delete()
					return JsonResponse({'status':2,'genplan_id':edit_genplan_id, 'sub_genplan_id': data.get('sub_genplan_id')})
				else:
					return HttpResponse(0)

			elif data.get('type')=='delete_pdf_file':
				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=edit_genplan_id,sub_genplan_id=data.get('sub_genplan_id')).first()
				sub_genplan_data_0 = Sub_genplan_data.objects.filter(genplan_id=genplan.genplan_id.pk,sub_genplan_id=data.get('sub_genplan_id')).first()


				if sub_genplan_data:
					
					if sub_genplan_data_0:
						if sub_genplan_data.pdf!='' and sub_genplan_data.pdf!=sub_genplan_data_0.pdf:
							os.remove(str(sub_genplan_data.pdf))
						sub_genplan_data.pdf=''
						sub_genplan_data.save()
						sub_genplan_data_0.status=2
						sub_genplan_data_0.save()
					else:
						if sub_genplan_data.pdf!='':
							os.remove(str(sub_genplan_data.pdf))
						sub_genplan_data.pdf=''
						sub_genplan_data.save()
					
					return JsonResponse({'status':2,'genplan_id':edit_genplan_id, 'sub_genplan_id': data.get('sub_genplan_id')})
				else:
					return HttpResponse(0)
			
			elif data.get('type')=='sub_sub_genplan':

				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=edit_genplan_id,
					sub_genplan_id=data.get('sub_genplan_id')).first()
				sub_genplan_data_0 = Sub_genplan_data.objects.filter(genplan_id=genplan.genplan_id.pk,
					sub_genplan_id=data.get('sub_genplan_id')).first()
				if sub_genplan_data:
					sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk,
						sub_sub_genplan_id=data.get('sub_sub_genplan_id')).first()
					if sub_genplan_data_0:
						sub_sub_genplan_data_0 = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=sub_genplan_data_0.pk,
						sub_sub_genplan_id=data.get('sub_sub_genplan_id')).first()

					if sub_sub_genplan_data:
						
						if sub_genplan_data_0:

							if sub_sub_genplan_data_0:
	
								sub_sub_genplan_data_0.status=3
								sub_sub_genplan_data_0.save()
								if sub_sub_genplan_data.status!=0:
									sub_sub_genplan_data.delete()
								else:
									sub_sub_genplan_data.my_delete()
							else:
								sub_sub_genplan_data.delete()
						else:
							sub_sub_genplan_data.delete()
						return JsonResponse({'status':2,'genplan_id':edit_genplan_id, 'sub_genplan_id': data.get('sub_genplan_id'), 'sub_sub_genplan_id': data.get('sub_sub_genplan_id')})
					else:
						return HttpResponse(0)
				return HttpResponse(0)
			elif data.get('type')=='sub_genplan':

				sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=edit_genplan_id,sub_genplan_id=data.get('sub_genplan_id')).first()
				sub_genplan_data_0 = Sub_genplan_data.objects.filter(genplan_id=genplan.genplan_id.pk,sub_genplan_id=data.get('sub_genplan_id')).first()
				if sub_genplan_data:
					if sub_genplan_data_0:
						sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk)
						for x in sub_sub_genplan_data:
							sub_sub_genplan_data_0 = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=sub_genplan_data_0.pk,
					     	sub_sub_genplan_id=x.sub_sub_genplan_id).first()
							if sub_sub_genplan_data_0:
								sub_sub_genplan_data_0.status=3
								sub_sub_genplan_data_0.save()
								if x.status!=0:
									x.delete()
								else:
									x.my_delete()
							else:
								x.delete()
						if sub_genplan_data_0.geotif!=sub_genplan_data.geotif and sub_genplan_data.geotif!='':
							os.remove(str(sub_genplan_data.geotif))
							try:
								url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_genplan_data.layer_name+"/?recurse=true"
								r = requests.delete(url, auth=('admin', 'uzgashk'))
								r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_genplan_data.layer_name)

								url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_genplan_data.layer_name+".xml"
								r3 = requests.delete(url3, auth=('admin', 'uzgashk'))
							
							except IOError:
								return HttpResponse(-11)
						sub_genplan_data.geotif=''
						sub_genplan_data.layer_name=''
						sub_genplan_data.save()
						sub_genplan_data_0.status=2
						sub_genplan_data_0.save()

					else:
						sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk)
						for x in sub_sub_genplan_data:
							x.delete()

						if sub_genplan_data.geotif!='':
							os.remove(str(sub_genplan_data.geotif))
						
						try:
							url="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+sub_genplan_data.layer_name+"/?recurse=true"
							r = requests.delete(url, auth=('admin', 'uzgashk'))
							r2 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+sub_genplan_data.layer_name)
						
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+sub_genplan_data.layer_name+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))

						except IOError:
							return HttpResponse(-11)

						sub_genplan_data.geotif=''
						sub_genplan_data.save()

					return JsonResponse({'status':2,'genplan_id':edit_genplan_id, 'sub_genplan_id': data.get('sub_genplan_id')})
				else:
					return HttpResponse(0)
			return HttpResponse(0)
	else:
		return HttpResponse('/delete_sub_sub_genplan_data')


	return HttpResponse(1)


def create_sub_sub_genplan_data(request):
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
			genplan = Genplans_edit.objects.get(pk=data.get('genplan_id'))
			sub_genplan = Sub_genplan.objects.get(pk=data.get('sub_genplan_id'))

			sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=genplan.pk,sub_genplan_id=sub_genplan.pk).first()

			if not sub_genplan_data:
				if geotif_file:
					sub_genplan_data = Sub_genplan_data_edit.objects.create(
					genplan_id=genplan,
					sub_genplan_id=sub_genplan,
					status=1,
					geotif=geotif_file
					)
					try:
						headers = {'Content-type': 'image/tiff'}
						url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'/file.geotiff'
						r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
						if r.status_code!=201:
							return HttpResponse(-11)
					except IOError:
						return HttpResponse(-11)

					sub_genplan_data.layer_name=str(genplan.id)+'_'+str(data.get('sub_genplan_id'))
					sub_genplan_data.save()

					print('create layer')
					geotif_check=1

			else:
				if geotif_file:
					if sub_genplan_data.geotif!='':
						os.remove(str(sub_genplan_data.geotif))

					try:
						headers = {'Content-type': 'image/tiff'}
						url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'/file.geotiff'
						
						url2="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+"/?recurse=true"
						r2 = requests.delete(url2, auth=('admin', 'uzgashk'))
						r20 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+str(genplan.id)+'_'+str(data.get('sub_genplan_id')))
						
						url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+".xml"
						r3 = requests.delete(url3, auth=('admin', 'uzgashk'))


						r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))

						if r.status_code!=201:
							return HttpResponse(-11)
					except IOError:
						return HttpResponse(-11)
					print('update layer')
					
					sub_genplan_data.geotif = geotif_file
					sub_genplan_data.layer_name=str(genplan.id)+'_'+str(data.get('sub_genplan_id'))
					sub_genplan_data.save()
					geotif_check=1

			sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=genplan.pk,sub_genplan_id=sub_genplan.pk).first()

			if not sub_genplan_data:
				if pdf_file:
					sub_genplan_data = Sub_genplan_data_edit.objects.create(
					genplan_id=genplan,
					sub_genplan_id=sub_genplan,
					status=1,
					pdf=pdf_file
					)
					pdf_check=1
					print('create layer with out geotif')
				else:
					return HttpResponse(-12)
			else:
				if pdf_file:
					if sub_genplan_data.pdf!='':
						os.remove(str(sub_genplan_data.pdf))
					sub_genplan_data.pdf = pdf_file
					sub_genplan_data.save()
					print('update layer pdf')
					pdf_check=1

			if sub_genplan_data.geotif!='':
				items_index_check=1
				for index in items_index:
					if index!='':
						sub_sub_genplan = Sub_sub_genplan.objects.get(pk=index)
						sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk,
						sub_sub_genplan_id=sub_sub_genplan.pk).first()

						if sub_sub_genplan_data:
			                # update
							print('update')
							print(sub_sub_genplan_data.file)
							os.remove(str(sub_sub_genplan_data.file))
							sub_sub_genplan_data.file = request.FILES['sub_genplan_' + index]
							sub_sub_genplan_data.save()

						else:
			                # create
							print('create')
							sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.create(
								Sub_genplan_data_id=sub_genplan_data,
								sub_sub_genplan_id=sub_sub_genplan,
								file=request.FILES['sub_genplan_' + index],
								status=1 
							  )


			return JsonResponse({'status':1,'genplan_id': data.get('genplan_id'), 'sub_genplan_id': data.get('sub_genplan_id'), 'pdf_check':pdf_check, 'geotif_check':geotif_check,'items_index_check':items_index_check, 'sub_sub_genplan_ids': items_index})

		elif status=='0' or status=='2':
			if status=='0':
				genplan_0 = Genplans.objects.get(pk=data.get('genplan_id'))
				genplan = Genplans_edit.objects.filter(genplan_id=genplan_0.pk).first()
				if not genplan:
					edit_genplan_id=copy_table_genplan(data.get('genplan_id'),request.session['id'])
				else:
					edit_genplan_id=genplan.pk
			elif status=='2':
				edit_genplan_id=data.get('genplan_id')

			items_index=data.get('itemsIndex').split(',')
			genplan = Genplans_edit.objects.get(pk=edit_genplan_id)
			sub_genplan = Sub_genplan.objects.get(pk=data.get('sub_genplan_id'))

			sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=genplan.pk,sub_genplan_id=sub_genplan.pk).first()
			sub_genplan_data_0=Sub_genplan_data.objects.filter(genplan_id=genplan.genplan_id.pk,sub_genplan_id=sub_genplan.pk).first()
			if sub_genplan_data_0 and sub_genplan_data:
				status=2
				sub_genplan_data_0.status =2
				sub_genplan_data_0.save()
			else:
				status=1
			if not sub_genplan_data:
				if geotif_file:
					sub_genplan_data = Sub_genplan_data_edit.objects.create(
					genplan_id=genplan,
					sub_genplan_id=sub_genplan,
					status=status,
					geotif=geotif_file
					)

					try:
						headers = {'Content-type': 'image/tiff'}
						url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(genplan.id)+'_'+data.get('sub_genplan_id')+'/file.geotiff'
						r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))

						if r.status_code!=201:
							return HttpResponse(-11)
					except IOError:
						return HttpResponse(-11)

					sub_genplan_data.layer_name=str(genplan.id)+'_'+str(data.get('sub_genplan_id'))
					sub_genplan_data.save()

					geotif_check=1

			else:
				if geotif_file:
			
					if sub_genplan_data_0:
						if sub_genplan_data.geotif!='' and sub_genplan_data.geotif!=sub_genplan_data_0.geotif:

							os.remove(str(sub_genplan_data.geotif))

						try:
							headers = {'Content-type': 'image/tiff'}
							url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'_'+str(sub_genplan_data.pk)+'/file.geotiff'
							
							url2="http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/"+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'_'+str(sub_genplan_data.pk)+"/?recurse=true"
							r2 = requests.delete(url2, auth=('admin', 'uzgashk'))
							r20 = requests.get("http://192.168.1.114:5665/delete_geoserver_data/"+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'_'+str(sub_genplan_data.pk))
						
							url3="http://192.168.1.114:8073/geoserver/gwc/rest/layers/dshk:"+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'_'+str(sub_genplan_data.pk)+".xml"
							r3 = requests.delete(url3, auth=('admin', 'uzgashk'))


							r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))

							if r.status_code!=201:
								return HttpResponse(-11)
						except IOError:
							return HttpResponse(-11)

						sub_genplan_data.layer_name=str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'_'+str(sub_genplan_data.pk)
						sub_genplan_data.geotif = geotif_file
						sub_genplan_data.status = 2
						sub_genplan_data.save()
						sub_genplan_data_0.status =2
						sub_genplan_data_0.save()
					else:
						if sub_genplan_data.geotif!='':
							os.remove(str(sub_genplan_data.geotif))	

						try:
							headers = {'Content-type': 'image/tiff'}
							url='http://192.168.1.114:8073/geoserver/rest/workspaces/dshk/coveragestores/'+str(genplan.id)+'_'+str(data.get('sub_genplan_id'))+'/file.geotiff'
							r = requests.put(url, data=geotif_file, headers=headers, auth=('admin', 'uzgashk'))
							if r.status_code!=201:
								return HttpResponse(-11)
						except IOError:
							return HttpResponse(-11)

						sub_genplan_data.geotif = geotif_file
						sub_genplan_data.layer_name=str(genplan.id)+'_'+str(data.get('sub_genplan_id'))
						sub_genplan_data.status = 1
						sub_genplan_data.save()

					geotif_check=1
					print('update layer 2')
			sub_genplan_data = Sub_genplan_data_edit.objects.filter(genplan_id=genplan.pk,sub_genplan_id=sub_genplan.pk).first()

			if not sub_genplan_data:
				if pdf_file:
					sub_genplan_data = Sub_genplan_data_edit.objects.create(
					genplan_id=genplan,
					sub_genplan_id=sub_genplan,
					status=status,
					pdf=pdf_file
					)
					pdf_check=1
					print('create layer with out geotif')
				else:
					return HttpResponse(-12)
			else:
				if pdf_file:
					if sub_genplan_data.pdf!='' and sub_genplan_data.pdf!=sub_genplan_data_0.pdf:
						os.remove(str(sub_genplan_data.pdf))					
					if sub_genplan_data_0:
						sub_genplan_data.pdf = pdf_file
						sub_genplan_data.status = 2
						sub_genplan_data.save()
						sub_genplan_data_0.status =2
						sub_genplan_data_0.save()
					else:
						sub_genplan_data.pdf = pdf_file
						sub_genplan_data.status = 1
						sub_genplan_data.save()
					pdf_check=1

			if sub_genplan_data.geotif!='':
				items_index_check=1
				for index in items_index:
					if index!='':
						sub_sub_genplan = Sub_sub_genplan.objects.get(pk=index)
						sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=sub_genplan_data.pk,
						sub_sub_genplan_id=sub_sub_genplan.pk).first()

						if sub_sub_genplan_data:
			                # update
							print('update 2')
							if sub_sub_genplan_data.status!=0:
								os.remove(str(sub_sub_genplan_data.file))
							sub_sub_genplan_data.file = request.FILES['sub_genplan_' + index]

							if sub_genplan_data_0:
								sub_sub_genplan_data_0 = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=sub_genplan_data_0.pk,
								sub_sub_genplan_id=sub_sub_genplan.pk).first()
								if sub_sub_genplan_data_0:							
									sub_sub_genplan_data.status = 2  
									sub_sub_genplan_data_0.status=2
									sub_sub_genplan_data_0.save()

							sub_sub_genplan_data.save()

						else:
							print('create')
							sub_sub_genplan_data = Sub_sub_genplan_data_edit.objects.create(
								Sub_genplan_data_id=sub_genplan_data,
								sub_sub_genplan_id=sub_sub_genplan,
								status=1,
								file=request.FILES['sub_genplan_' + index],
							  )
			return JsonResponse({'status':2,'genplan_id':edit_genplan_id, 'sub_genplan_id': data.get('sub_genplan_id'), 'pdf_check':pdf_check, 'geotif_check':geotif_check,'items_index_check':items_index_check, 'sub_sub_genplan_ids': items_index})

		else:
			return HttpResponse(-10)
	else:
		return HttpResponse('/create_sub_sub_genplan_data')
def list_sub_genplan(request):
	if request.method=='POST':
		sub_genplans = Sub_genplan.objects.all().values()
		sub_sub_genplans = Sub_sub_genplan.objects.all().values()
		return JsonResponse([{'sub_genplans': list(sub_genplans), 'sub_sub_genplans': list(sub_sub_genplans)}],safe=False)
	else:
		return HttpResponse('/list_sub_genplan')


def genplan_dialog_view(request):
	if request.method=='POST':
		try:
			if request.session['authenticate']:
				sessia={
				'service':request.session['service'],
				'admin_id':request.session['id'],
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
			
			data1=Sub_genplan_data.objects.filter(genplan_id__id=request.POST.get('id')).order_by('sub_genplan_id__zindex')
			text='['
			w=1
			for i in data1:

				if sessia['status']==-1:
					if i.sub_genplan_id.public_private=='1':
						text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
					if i.sub_genplan_id.public_private=='2':
						text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
					if i.sub_genplan_id.public_private=='3':
						text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"","data":['
					if i.sub_genplan_id.public_private=='4':
						text=text+'{"sub_name":"","pdf":"","zindex":"","layer_name":"","data":['
				else:
					text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['

				data2=Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=i.id).order_by('sub_sub_genplan_id__index')
				z=1
				for x in data2:
					text=text+'{"nomi":"'+str(x.sub_sub_genplan_id)+'","file_name":"'+str(x.file)+'"}'
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

			if Genplans_edit.objects.filter(genplan_id__id=request.POST.get('id'),status=2).first():
				admin_id=Genplans_edit.objects.filter(genplan_id__id=request.POST.get('id'),status=2).first().admin_id
				send_admin=Genplans_edit.objects.filter(genplan_id__id=request.POST.get('id'),status=2).first().send_sdmin

			else:
				admin_id=-1
				send_admin=-1


			if request.POST.get('type')=='orginal':

				data1=Sub_genplan_data.objects.filter(genplan_id__id=request.POST.get('id')).order_by('sub_genplan_id__zindex')
				text='['
				w=1
				for i in data1:

					if sessia['status']==-1:
						if i.sub_genplan_id.public_private=='1':
							text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
						if i.sub_genplan_id.public_private=='2':
							text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
						if i.sub_genplan_id.public_private=='3':
							text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"","data":['
						if i.sub_genplan_id.public_private=='4':
							text=text+'{"sub_name":"","pdf":"","zindex":"","layer_name":"","data":['
					else:
						text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['

					data2=Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=i.id).order_by('sub_sub_genplan_id__index')
					z=1
					for x in data2:
						text=text+'{"nomi":"'+str(x.sub_sub_genplan_id)+'","file_name":"'+str(x.file)+'"}'
						if z!=len(data2):
							text=text+','
						z=z+1
					text=text+']}'
					if w!=len(data1):
						text=text+','
					w=w+1
				text=text+']'
			else:
				data1=Sub_genplan_data_edit.objects.filter(genplan_id__id=request.POST.get('id')).order_by('sub_genplan_id__zindex')
				text='['
				w=1
				for i in data1:
					# print(i.sub_genplan_id.zindex)
					text=text+'{"sub_name":"'+str(i.sub_genplan_id.nomi)+'","pdf":"'+str(i.pdf)+'","zindex":"'+str(i.sub_genplan_id.zindex)+'","layer_name":"'+str(i.layer_name)+'","data":['
					data2=Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=i.id).order_by('sub_sub_genplan_id__index')
					z=1
					for x in data2:
						text=text+'{"nomi":"'+str(x.sub_sub_genplan_id)+'","file_name":"'+str(x.file)+'"}'
						if z!=len(data2):
							text=text+','
						z=z+1
					text=text+']}'
					if w!=len(data1):
						text=text+','
					w=w+1
				text=text+']'

			return JsonResponse([{'json':json.loads(text),'sessia':sessia,'admin_id':admin_id,'send_admin':send_admin}],safe=False)

	else:
		return HttpResponse('/dialog_view')
 

