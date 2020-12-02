from django.contrib.gis.db import models
from datetime import datetime,date


from proj.reestr_projects_models import Apz,Psd,Psd_ind
from proj.reestr_objects_models import Perm_rec,Smr,Pexpl,Pexpl_ind
from proj.reestr_subjects_models import Loyihalovchi,Buyurtmachi_fiz,Buyurtmachi_yur,Quruvchi
from proj.reestr_add_models import Soata,Authority


from proj.redline_models import  Redlines
from proj.funk_genplan_models import  FunkGenplans
from proj.funk_apot_models import  FunkApots
from proj.geologik_rayon_models import  GeologRayon


class GeolocationPoint(models.Model):
	ogc_fid = models.AutoField(primary_key=True)
	name_ru = models.CharField(max_length=30, blank=True, null=True)
	name_uz = models.CharField(max_length=50, blank=True, null=True)
	regionname = models.CharField(max_length=30, blank=True, null=True)
	regionnameuz = models.CharField(max_length=30, blank=True, null=True)
	distr_name = models.CharField(max_length=80, blank=True, null=True)
	name_uzb = models.CharField(max_length=80, blank=True, null=True)
	wkb_geometry = models.PointField(blank=True, null=True)

	class Meta:
		managed = False
		db_table = 'geolocation_point'


class GeolocationPolygon(models.Model):
	ogc_fid = models.AutoField(primary_key=True)
	distr_name = models.CharField(max_length=80, blank=True, null=True)
	name_uzb = models.CharField(max_length=80, blank=True, null=True)
	id=models.CharField(max_length=80, blank=True, null=True)
	regionname = models.CharField(max_length=30, blank=True, null=True)
	regionnameuz = models.CharField(max_length=30, blank=True, null=True)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)

	class Meta:
		managed = False
		db_table = 'geolocation_polygon'


class Genplan1601(models.Model):
	objectid = models.AutoField(primary_key=True)
	aholi_punktining_nomi = models.CharField(max_length=200, blank=True, null=True)
	mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi = models.CharField(max_length=100, blank=True, null=True)
	aholi_punktining_tipi = models.CharField(max_length=100, blank=True, null=True)
	aholi_punktining_maqomi = models.CharField(max_length=100, blank=True, null=True)
	respublika_viloyat = models.CharField(max_length=100, blank=True, null=True)
	tuman_shahar = models.CharField(max_length=200, blank=True, null=True)
	loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv = models.CharField(max_length=200, blank=True, null=True)
	shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy = models.CharField(max_length=200, blank=True, null=True)
	shahar_chegarasi_loyihasini_tasdiqlangan_organ = models.CharField(max_length=200, blank=True, null=True)
	shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san = models.CharField(max_length=200, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=50, blank=True, null=True)
	aholining_loyihaviy_soni = models.CharField(max_length=50, blank=True, null=True)
	ishlab_chiqalgan_yili = models.FloatField(blank=True, null=True)
	grafik_malumotlar = models.CharField(max_length=250, blank=True, null=True)
	tshuntirish_hati = models.CharField(max_length=250, blank=True, null=True)
	shape_length = models.FloatField(blank=True, null=True)
	shape_area = models.FloatField(blank=True, null=True)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)

	class Meta:
		managed = False
		db_table = 'genplan_16_01'


class ApotOld(models.Model):
	ogc_fid = models.AutoField(primary_key=True)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)
	mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_tipi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_maqomi = models.CharField(max_length=255, blank=True, null=True)
	respublika_viloyat = models.CharField(max_length=255, blank=True, null=True)
	tuman_shahar = models.CharField(max_length=255, blank=True, null=True)
	fuqarolar_yiginlari = models.CharField(max_length=255, blank=True, null=True)
	loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasini_tasdiqlangan_organ = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholining_loyihaviy_soni = models.CharField(max_length=255, blank=True, null=True)
	kfi_markazi = models.CharField(max_length=255, blank=True, null=True)
	boysinuvchi_aholi_punktlari_soni = models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqalgan_yili = models.FloatField(blank=True, null=True)
	ishlab_chiqarish_asosi = models.CharField(max_length=255, blank=True, null=True)
	shaharsozlik_kengashi_qarori = models.CharField(max_length=255, blank=True, null=True)
	chegarani_chizish_turi = models.CharField(max_length=255, blank=True, null=True)
	soato = models.FloatField(blank=True, null=True)
	aholi_soni_tip = models.CharField(max_length=255, blank=True, null=True)
	izoh = models.CharField(max_length=255, blank=True, null=True)
	type = models.IntegerField(blank=True, null=True)
	id = models.CharField(max_length=255, blank=True, null=True)
	vil_id = models.IntegerField(blank=True, null=True)
	shape_length = models.FloatField(blank=True, null=True)
	shape_area = models.FloatField(blank=True, null=True)
	folder = models.CharField(max_length=255, blank=True, null=True)

	class Meta:
		managed = False
		db_table = 'apot_old'





class Users(models.Model):
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(default='uz_', max_length=40)
	password = models.CharField(max_length=40)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)


	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Users"



class Viloyat(models.Model):
	vil_id = models.IntegerField(blank=True, null=True)
	disUz=models.CharField('Nomi Uzb',max_length=70,blank=True)
	disRu=models.CharField('Nomi Rus',max_length=70,blank=True)
	color_chart=models.CharField('color_chart',max_length=70,blank=True)
	shortUz=models.CharField('short_uz',max_length=70,blank=True)
	shortRu=models.CharField('short_Ru',max_length=70,blank=True)

	def __str__(self):
		return self.disUz
	class Meta:
		verbose_name_plural = "Viloyat"

class Tuman(models.Model):
	nomi=models.CharField('Nomi',max_length=70)
	viloyat=models.ForeignKey(Viloyat,on_delete=models.CASCADE,default=-1)
	disUz=models.CharField('Nomi Uzb',max_length=70,blank=True)
	disRu=models.CharField('Nomi Rus',max_length=70,blank=True)

	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "Tuman"



class Tip_documents(models.Model):
	id= models.AutoField(primary_key=True)
	tip_dis=models.CharField("Hujjatlar guruhining nomi",max_length=200,blank=True)
	def __str__(self):
		return self.tip_dis
	class Meta:
		verbose_name_plural = "Hujjatlar guruhi"

class Sub_tip_documents(models.Model):
	id= models.AutoField(primary_key=True)
	tip_doc=models.ForeignKey(Tip_documents,on_delete=models.CASCADE,default=-1,verbose_name="Hujjatlar guruhi nomi")
	sub_tip_dis=models.CharField("Hujjat turi",max_length=200,blank=True)
	def __str__(self):
		return self.sub_tip_dis
	class Meta:
		verbose_name_plural = "Hujjat turi"

class Documents(models.Model):
	id= models.AutoField(primary_key=True)
	tip_doc=models.ForeignKey(Tip_documents,on_delete=models.CASCADE,default=-1,verbose_name="Hujjatlar guruhi nomi")
	sub_tip_doc=models.ForeignKey(Sub_tip_documents,on_delete=models.CASCADE,default=1,verbose_name="Hujjat turi")
	nomer_doc=models.CharField("Hujjat raqami",max_length=70,blank=True)
	data=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Qabul qilingan sana")
	file_doc=models.FileField("Hujjat fayli",upload_to='proj/docs_for_pod9',blank=True)
	doc_nomi=models.CharField("Hujjat nomi",max_length=255,blank=True)
	link_doc=models.CharField("Hujjat havolasi",max_length=255,blank=True)
	def __str__(self):
		return self.doc_nomi
	class Meta:
		verbose_name_plural = "Barcha hujjatlar"
