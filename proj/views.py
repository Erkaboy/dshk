from __future__ import unicode_literals
from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse 

import os 
import json
from subprocess import call
from django.contrib.auth import authenticate,login,logout
from .models import Users,Documents,Tip_documents,Sub_tip_documents
import pdfkit
from pyvirtualdisplay import Display
import xlsxwriter
from django.core.serializers import serialize
from django.core.paginator import Paginator
import geodaisy.converters as convert
# wkb_json=convert.geojson_to_wkt(geojson)
import psycopg2
import requests
import csv
import urllib
import codecs

from django.core.files.storage import default_storage


from proj.reestr_subjects_models import Loyihalovchi
from proj.reestr_add_models import Soata,Authority


from proj.pdp_models import adminsPdp
from proj.genplan_models import adminsGenplan,genplansEvent
from proj.apot_models import adminsApot


from datetime import datetime,date,timedelta 
from proj.reestr_add_models import Crontab_data

from proj.redline_models import adminsRedline,Redlines
from proj.funk_genplan_models import adminsFunkGenplans,FunkZones,FunkGenplans
from proj.funk_apot_models import adminsFunkApots,FunkApots
from proj.geologik_rayon_models import adminsGeologRayon,GeologRayon


from proj.reestr_projects_models import Apz,Psd,Psd_ind
from proj.reestr_objects_models import Perm_rec,Smr,Pexpl,Pexpl_ind
from proj.genplan_models import Genplans
from proj.apot_models import Apots
from proj.pdp_models import Pdps
from django.db.models import Q


from django.core.mail import send_mail
from smtplib import SMTPException
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


from .models import Viloyat



# Buyurtmachi_fiz.objects.all().delete()
# Buyurtmachi_yur.objects.all().delete()

# Psd.objects.all().delete()
# Apz.objects.all().delete()

# Psd_ind.objects.all().delete()

# Perm_rec.objects.all().delete()
# Smr.objects.all().delete()
# Pexpl.objects.all().delete()
# Pexpl_ind.objects.all().delete()

# from .models import Documents

# date=datetime.strptime('2019-12-10','%Y-%m-%d')
# print(date)

#date=['2019-12-09','2019-12-10','2019-12-11']
date=['2019-12-18']
from proj import api

#api.run_api_apz(date)
 

#api.run_api_psd(date)
#api.run_api_psd_ind(date)
#api.run_api_perm_rec(date)

#api.run_api_smr(date)
#api.run_api_pexpl(date)
#api.run_api_pexpl_ind(date)





from .models import GeolocationPoint,GeolocationPolygon,Viloyat

from django.core import serializers





def contactform(request):
	print(request)
	data=request.POST
	subject=data.get('subject')
	text_content = "DSHK.UZ ga murojaat"
	html_content = '''
	<p><b>Xabar junatuvchi ismi:</b> '''+data.get('name')+'''</p>
	<p><b>Qayta aloqa uchun email:</b> '''+data.get('email')+'''</p>
	<p><b>Xabar mazmuni:</b> '''+data.get('message')+'''</p>
	'''
	try:
		msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, ['ravotcha@mail.ru'])
		msg.attach_alternative(html_content, "text/html")
		msg.send()
		return HttpResponse('OK')

	except SMTPException as e:
		return HttpResponse("Xatolik sodir bo'ldi. Qaytadan urinib ko'ring");


def admin_object_events(request):
	if request.method=='POST':
		if request.POST.get('type')=="genplan":
			obj=genplansEvent.objects.filter(genplan_id=request.POST.get('id'))
			obj2=adminsGenplan.objects.all()
			json=serializers.serialize('json',obj)
			admins=serializers.serialize('json',obj2,fields=['full_name'])
			return JsonResponse({'json':json,'admin':admins})

	else:
		return HttpResponse('admin_object_events')


def dshk_rest_api(request,slug,obj_id):

	return HttpResponse(slug+'--'+str(obj_id))


def geodata(request):
	check=request.COOKIES.get('csrftoken','null')

	if check!='null':
		url="http://192.168.1.114:8073/geoserver/dshk/wms"
		url += '?' + urllib.parse.urlencode(request.GET)
		return HttpResponse(requests.get(url),content_type=request.GET.get('format'))
	else:
		with open('proj/static/img/logo_tile.png','rb') as f:
			return HttpResponse(f.read(),content_type='image/png')


def geocache(request):
	check=request.COOKIES.get('csrftoken','null')

	if check!='null':
		url="http://192.168.1.114:8073/geoserver/gwc/service/wms"
		url += '?' + urllib.parse.urlencode(request.GET)
		return HttpResponse(requests.get(url),content_type=request.GET.get('format'))
	else:
		with open('proj/static/img/logo_tile.png','rb') as f:
			return HttpResponse(f.read(),content_type='image/png')




def search_geolocation(request):
	if request.method=='POST':
		
		if request.POST.get('lang')=='0':
			data=GeolocationPoint.objects.filter(name_ru__istartswith=request.POST.get('text'))
			json=serializers.serialize('geojson',data)

			data2=GeolocationPolygon.objects.filter(distr_name__istartswith=request.POST.get('text'))
			json2=serializers.serialize('geojson',data2,fields=['id','distr_name','regionname'])
			return JsonResponse({'points':json,'polygons':json2})

		elif request.POST.get('lang')=='1':
			data=GeolocationPoint.objects.filter(name_uz__istartswith=request.POST.get('text'))
			json=serializers.serialize('geojson',data)

			data2=GeolocationPolygon.objects.filter(name_uzb__istartswith=request.POST.get('text'))
			json2=serializers.serialize('geojson',data2,fields=['id','name_uzb','regionnameuz'])
			return JsonResponse({'points':json,'polygons':json2})
	else:
		return HttpResponse('/search_geolocation')

def sessia(request):
	if request.method=='POST':
		try:
			if request.session['authenticate']:
				sessia={
				'service':request.session['service'],
				'status':request.session['status']
				}
			else:
				sessia={
				'service':'null',
				'status':-1
				}
		except KeyError:
			sessia={
				'service':'null',
				'status':-1
			}
		return JsonResponse([{'sessia':sessia}],safe=False)
	else:
		return HttpResponse('/sessia')


def convert_data(request):

	if request.method == 'POST':

		filetype = request.POST.get("file-type")
		epsg = request.POST.get("epsg","4326");

	
		folder = 'proj/static/folder_for_upload/' + filetype + "." + filetype
		result_folder = 'proj/static/folder_for_download/result.json'
		
		if os.path.exists(result_folder):
			os.remove(result_folder)
			
		if os.path.isdir(folder):
			for the_file in os.listdir(folder):
				file_path = os.path.join(folder, the_file)
				try:
					if os.path.isfile(file_path):
						os.unlink(file_path)
					elif os.path.isdir(file_path):
						shutil.rmtree(file_path)
				except Exception as e:
					return HttpResponse(e)
		if 0:
			f = request.FILES['file']
			filename = folder
			with default_storage.open(filename, 'wb') as destination:
				for chunk in f.chunks():
					destination.write(chunk)
		else :
			for f in request.FILES.getlist('file'):
				name = f.name;
				filename = folder + "/" + name
				with default_storage.open(filename, 'wb') as destination:
					for chunk in f.chunks():
						destination.write(chunk)

		call('/home/www/venv/bin/ogr2ogr -f "GeoJSON" /home/www/dshk/' + result_folder + ' /home/www/dshk/' + folder +' -s_srs epsg:'+epsg+' -t_srs epsg:4326 -overwrite -skipfailures',shell = True)

			
		return HttpResponse(1)






def filtering(request):
	if request.method=='POST':
		data=request.POST
		
		if data.get('sub_tip_documents')=='sub_tip_documents':
			sub_doc=Sub_tip_documents.objects.filter(tip_doc=data.get('id')).values()
			return JsonResponse({'list': list(sub_doc)})
	
	else:
		return HttpResponse('filtering')

def subsistem(request,id):
	return render(request,'pod'+id+'.html',{})


def documents(request):
	if request.method=='POST':
		query_type=request.POST
		if query_type.get('query_type')=='docs_type':
			data=Tip_documents.objects.all().values()
			return JsonResponse({'list': list(data)})
		elif query_type.get('query_type')=='docs_list':
			if query_type.get('docs_tip_id')!='-1':
				if query_type.get('docs_sub_tip_id')!='-1':
					if query_type.get('filter_date')=='1':
						date_b=datetime.strptime(query_type.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(query_type.get('date_end'),'%d.%m.%Y')
						data=Documents.objects.filter(data__range=(date_b,date_e),tip_doc=query_type.get('docs_tip_id'),sub_tip_doc=query_type.get('docs_sub_tip_id')).order_by('-data').values()
						sub_doc=Sub_tip_documents.objects.filter(tip_doc=query_type.get('docs_tip_id')).values()
					else:
						data=Documents.objects.filter(tip_doc=query_type.get('docs_tip_id'),sub_tip_doc=query_type.get('docs_sub_tip_id')).order_by('-data').values()
						sub_doc=Sub_tip_documents.objects.filter(tip_doc=query_type.get('docs_tip_id')).values()
				else:
					if query_type.get('filter_date')=='1':
						date_b=datetime.strptime(query_type.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(query_type.get('date_end'),'%d.%m.%Y')
						data=Documents.objects.filter(data__range=(date_b,date_e),tip_doc=query_type.get('docs_tip_id')).order_by('-data').values()
						sub_doc=Sub_tip_documents.objects.filter(tip_doc=query_type.get('docs_tip_id')).values()
					else:
						data=Documents.objects.filter(tip_doc=query_type.get('docs_tip_id')).order_by('-data').values()
						sub_doc=Sub_tip_documents.objects.filter(tip_doc=query_type.get('docs_tip_id')).values()
			else:
				if query_type.get('docs_sub_tip_id')!='-1':
					if query_type.get('filter_date')=='1':
						date_b=datetime.strptime(query_type.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(query_type.get('date_end'),'%d.%m.%Y')
						data=Documents.objects.filter(data__range=(date_b,date_e),sub_tip_doc=query_type.get('docs_sub_tip_id')).order_by('data').values()
						sub_doc=Sub_tip_documents.objects.all().values()
					else:
						data=Documents.objects.filter(sub_tip_doc=query_type.get('docs_sub_tip_id')).order_by('data').values()
						sub_doc=Sub_tip_documents.objects.all().values()
				else:
					if query_type.get('filter_date')=='1':
						date_b=datetime.strptime(query_type.get('date_begin'),'%d.%m.%Y')
						date_e=datetime.strptime(query_type.get('date_end'),'%d.%m.%Y')
						data=Documents.objects.filter(data__range=(date_b,date_e)).order_by('-data').values()
						sub_doc=Sub_tip_documents.objects.all().values()
					else:
						data=Documents.objects.all().order_by('-data').values()
						sub_doc=Sub_tip_documents.objects.all().values()				

			return JsonResponse([{'list': list(data),'sub_doc':list(sub_doc)}],safe=False)

	else:
		return HttpResponse('/documents')



def info_maktab(request):
	if request.method=='POST':
		data=request.POST
		try:
			connection = psycopg2.connect(  user = "postgres",
											password = 'gashk_123$uz',
											host = '192.168.1.113',
											port = "2354",
											database = "dshk")
			cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
			
			sql_select_query = "SELECT * FROM maktablar_qur_mal WHERE kod="+data.get('kod')+""
			cursor.execute(sql_select_query)
			record = cursor.fetchone()
			# print(record)
			temp ={}
			for col in cursor.description:
				temp[col[0]]=str(record[col[0]])

			return JsonResponse(temp)

		except (Exception, psycopg2.Error) as error :
			# print ("Error while connecting to PostgreSQL", error)
			return HttpResponse(0)

		finally:
			if(connection):
				cursor.close()
				connection.close()

	else:
		return HttpResponse('/info_maktab')

def load_pt(request):


	#reader = csv.reader(open("/home/www/authority.csv"), dialect='excel')
	#for row in reader:
	#	event=Authority(
	##	kod = row[0],
	#	title = row[1]
	#		)
	#	event.save()


	#reader = csv.reader(open("/home/pt.csv"), dialect='excel')
	#for row in reader:
	#	event=Praekterovchiki(nomi=row[1],txtash=row[2],inn=row[3],adress=row[4],raxbar=row[5],contact=row[6],viloyat=row[18],tuman=row[19],ap=row[20])
	#	event.save()


	# Loyihalovchi.objects.all().delete()
	# reader = csv.reader(open("/home/www/lt.csv"), dialect='excel')
	# for row in reader:
	# 	print(row[1])
	# 	event=Loyihalovchi(
	# 		nomi=row[1],
	# 		txtash=row[2],
	# 		inn=row[3],
	# 		adress=row[4],
	# 		raxbar=row[5],
	# 		contact=row[6],
	# 		ifut=row[7],
	# 		ifut_kodi=row[8],
	# 		# litsenziya=row[9],
	# 		# litsenziya_sana=row[10],
	# 		# litsenziya_muddat=row[11],
	# 		# litsenziya_ft=row[12],
	# 		# litsenziya_kshr=row[13],
	# 		# litsenziya_kshr_sana=row[14],
	# 		# litsenziyalangan_ishlar=row[15],
	# 		# litsenziya_qro=row[16],
	# 		# mulk_shakli=row[17],
	# 		viloyat=row[18],
	# 		tuman=row[19],
	# 		ap=row[20],
	# 		reestr_raqami=row[21],
	# 		litsenziya_2=row[22],
	# 		litsenziya_muddat_2=row[23],
	# 		ashxkb=row[24]
	# 		)
	# 	event.save()
	return HttpResponse('OK')


def login_form(request):
	try:
		if request.session['authenticate']:
			return redirect('main_page')
		else:
			return render(request,'login_form.html',{})
	except KeyError:
		return render(request,'login_form.html',{})
	
	
def loginn(request):
	if request.method=='POST':
		data=request.POST
		login=data.get('login')
		parol=data.get('parol')
		remember_me=data.get('remember_me')
		
		prefiks=login.split('_')[0]
		if prefiks=='uz':
			try:
				result = Users.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=0
					request.session['service']='all'
					if remember_me:
						request.session.set_expiry(0)					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)
		elif prefiks=='pdp':
			try:
				result = adminsPdp.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='pdp'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)

		elif prefiks=='apot':
			try:
				result = adminsApot.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='apot'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)
		
		elif prefiks=='gen':
			try:
				result = adminsGenplan.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='genplan'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)
 
			except:
				return HttpResponse(0)
		elif prefiks=='rl':
			try:
				result = adminsRedline.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='red_line'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)
		elif prefiks=='fg':
			try:
				result = adminsFunkGenplans.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='funk_gen'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)


		elif prefiks=='fa':
			try:
				result = adminsFunkApots.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='funk_apot'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)

		elif prefiks=='gr':
			try:
				result = adminsGeologRayon.objects.get(login = login)
				if result.password==parol:
					request.session['authenticate']=True
					request.session['id']=result.pk
					request.session['login']=result.login
					request.session['full_name']=result.full_name
					request.session['status']=result.status
					request.session['service']='geo_ray'
					
					return HttpResponse(1)
					
				else:
					return HttpResponse(0)

			except:
				return HttpResponse(0)
		else:
			return HttpResponse(0)

	else:
		return HttpResponse('loginn')



def logoutt(request):
	if request.method=='POST':
		if request.session['authenticate']:
			del request.session['authenticate']
			del request.session['login']
			del request.session['id']
			del request.session['full_name']
			del request.session['status']

			return HttpResponse(1)
		else:
			return HttpResponse("Didn't authenticated !!")
	else:
		return HttpResponse('logoutt')



def chart_data(request):
	if request.method=='POST':
		data=Viloyat.objects.all().order_by('vil_id')

		if request.POST.get('service')=='pod1':

			fg_static_json=[]
			for i in data:
				fg_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'count':FunkGenplans.objects.filter(Q(vil_id=i.vil_id),~Q(status=4)).distinct('genplan_id').count(),
					}
					)
			fa_static_json=[]
			for i in data:
				fa_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'count':FunkApots.objects.filter(Q(vil_id=i.vil_id),~Q(status=4)).distinct('apot_id').count(),
					}
					)

			redline_static_json=[]
			for i in data:
				redline_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'count':Redlines.objects.filter(Q(vil_id=i.vil_id),~Q(status=4)).count(),
					}
					)
			gr_static_json=[]
			for i in data:
				gr_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'count':GeologRayon.objects.filter(Q(vil_id=i.vil_id),~Q(status=4)).distinct('geolograyon_data_id').count(),
					}
					)
			return JsonResponse({'fg':fg_static_json,'fa':fa_static_json,'redline':redline_static_json,'gr':gr_static_json,},safe=False)

		elif request.POST.get('service')=='pod2':
			data=Viloyat.objects.all().order_by('vil_id')
			
			genplan_static_json=[]
			for i in data:
				genplan_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'tas':Genplans.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=1),~Q(status=4)).count(),
					'not_tas':Genplans.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=0),~Q(status=4)).count(),
					'plan':Genplans.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=3),~Q(status=4)).count()
					}
					)

			pdp_static_json=[]
			for i in data:
				pdp_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'tas':Pdps.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=1),~Q(status=4)).count(),
					'not_tas':Pdps.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=0),~Q(status=4)).count(),
					'plan':Pdps.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=3),~Q(status=4)).count()
					}
					)
	 
			apot_static_json=[]
			for i in data:
				apot_static_json.append(
					{
					'vil_id':i.vil_id,
					'disUz':i.disUz,
					'disRu':i.disRu,
					'shortUz':i.shortUz,
					'shortRu':i.shortRu,
					'color':i.color_chart,
					'tas':Apots.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=1),~Q(status=4)).count(),
					'not_tas':Apots.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=0),~Q(status=4)).count(),
					'plan':Apots.objects.filter(Q(respublika_viloyat=i.vil_id),Q(tasdiqlanganligi=3),~Q(status=4)).count()
					}
					)
	 
			return JsonResponse({'genplan':genplan_static_json,'pdp':pdp_static_json,'apot':apot_static_json},safe=False)

		elif request.POST.get('service')=='pod6':

			apz_json=[]
			date=datetime.today()
			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Apz.objects.filter(date__year=year,date__month=month).count())
				apz_json.append({year:inner_json})
			
			psd_json=[]

			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Psd.objects.filter(date__year=year,date__month=month).count())
				psd_json.append({year:inner_json})

			psd_ind_json=[]

			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Psd_ind.objects.filter(date__year=year,date__month=month).count())
				psd_ind_json.append({year:inner_json})
			return JsonResponse({'apz':apz_json,'psd':psd_json,'psd_ind':psd_ind_json},safe=False)

		elif request.POST.get('service')=='pod7':

			perm_rec_json=[]
			date=datetime.today()
			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Perm_rec.objects.filter(date__year=year,date__month=month).count())
				perm_rec_json.append({year:inner_json})
			
			smr_json=[]

			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Smr.objects.filter(date__year=year,date__month=month).count())
				smr_json.append({year:inner_json})

			pexpl_json=[]

			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Pexpl.objects.filter(date__year=year,date__month=month).count())
				pexpl_json.append({year:inner_json})

			pexpl_ind_json=[]

			for year in range(2018,date.year+1):
				inner_json=[]
				for month in range(1,13):
					inner_json.append(Pexpl_ind.objects.filter(date__year=year,date__month=month).count())
				pexpl_ind_json.append({year:inner_json})

			return JsonResponse({'perm_rec':perm_rec_json,'smr':smr_json,'pexpl':pexpl_json,'pexpl_ind':pexpl_ind_json},safe=False)


		else:
			return HttpResponse(22)
	else:		
		return HttpResponse('chart_data')


def index(request):
	content={
	'genplan':Genplans.objects.filter(~Q(status = 4),~Q(tasdiqlanganligi=3)).count(),
	'apot':Apots.objects.filter(~Q(status = 4),~Q(tasdiqlanganligi=2),~Q(tasdiqlanganligi=3)).count(),
	'pdp':Pdps.objects.filter(~Q(status = 4),~Q(tasdiqlanganligi=3)).count(),
	'redline':Redlines.objects.filter(~Q(status = 4)).count(),
	'funk_zone_genplan':FunkGenplans.objects.filter(~Q(status = 4)).distinct('genplan_id').count(),
	'funk_zone_apot':FunkApots.objects.filter(~Q(status = 4)).distinct('apot_id').count(),
	'geologik_ray':GeologRayon.objects.filter(~Q(status = 4)).distinct('geolograyon_data_id').count(),
	'apz':Apz.objects.all().count(),
	'psd':Psd.objects.all().count(),
	'psd_ind':Psd_ind.objects.all().count(),
	'perm_rec':Perm_rec.objects.all().count(),
	'smr':Smr.objects.all().count(),
	'pexpl':Pexpl.objects.all().count(),
	'pexpl_ind':Pexpl_ind.objects.all().count(),
	}

	return render(request,'index.html',content)

def to_list(request):
	if request.method=="POST":
		data=request.POST
		js=json.loads(data.get('tableObj'))
		head=js[0]
		body=js[1:]
		dtype=data.get('dtype')
		if dtype=='genplan':
			need_col=['1','2','3','6','13','9','10','11','12']
		elif dtype=='apot':
			need_col=['1','2','3','4','5','6','7']
		elif dtype=='proektirovchiki':
			need_col=['2','3','4','5','6']

		ftype=data.get('type','no')
		if ftype=='pdf':

			context='<!DOCTYPE html><html><head>\
			<meta charset="utf-8">\
			<style>.tr_td{ text-align:center; } .head_tr td{ background-color:#dcdcdc; font-weight:bold; text-align:center; } table { border-collapse:collapse; } td{ border:1px solid #808080; padding:8px; } tr:nth-child(even){ background-color:#f2f2f2; } \
			</style>\
			</head>\
			<body>\
			<table ><tr class="head_tr">\
			 <td class="tr_td" >T/р</td>';
			 
			for i in need_col:
				context+='<td>'+head[i]+'</td>';

			context+='</tr>';

			count=1;
			for td in body:
				context+='<tr><td class="tr_td">'+str(count)+'</td>';

				for i in need_col:
					context+='<td>'+td[i]+'</td>';
				
				context+='</tr>';
				count+=1

			context+='</tabel></body></html>';
			options={
			'page-size':'A4',	
			'encoding' : "UTF-8",
			'margin-top': '0.2in',
			'margin-right': '0.2in',
			'margin-bottom': '0.2in',
			'margin-left': '0.2in',
			'orientation':'Landscape',
			}
			display=Display(visible=0,size=(600,600)).start()
			pdfkit.from_string(context,'proj/static/folder_for_download/genplan_list.pdf',options)
			return HttpResponse('list.pdf')

		elif ftype=='xlsx':

			workbook = xlsxwriter.Workbook('proj/static/folder_for_download/xlsx.xlsx')
			worksheet = workbook.add_worksheet()
			row = 1
			col = 1
			style=workbook.add_format({'bold': True, 'border':2,'bg_color':'#f4f4f4','align':'center','font_size':'12'})
			style2=workbook.add_format({'border':1})
			style3=workbook.add_format({'border':1,'align':'center'})
			worksheet.set_row(0,25)
			worksheet.set_column(0,0,6)
			for i in range(len(need_col)):
				worksheet.set_column(i+1,i+1,30)


			worksheet.write(0, 0, '№', style)


			for i in need_col:
				worksheet.write(0, col, head[i], style)
				col+=1

			for td in body:
				worksheet.write(row, 0, row,style3)
				col=1
				for i in need_col:
					worksheet.write(row, col, td[i],style2)
					col+=1
				row+=1
		
			worksheet.autofilter(1,1,0,len(need_col))
			worksheet.freeze_panes(1, 0)
			workbook.close()
		return HttpResponse('list.xlsx')
	else:
		return HttpResponse('/to_list')

def old(request):
	return render(request,'old.html',{})

def map(request):
	return render(request,'map.html',{})


 
def main_page(request):

	context={
	'viloyat':Viloyat.objects.all().order_by('vil_id'),
	'funk_zone':FunkZones.objects.all().order_by('type')
	}
	return render(request,'main_page.html',context)



def mount(request):
	mount=call('mount.cifs //Uzg-Fs01/DC01 /home/www/dshk/proj/static/Dc01 -o username=mannon,password=3210,domain=uzgashk.svr,ip=192.168.10.7',shell=True)
	return HttpResponse(mount);




