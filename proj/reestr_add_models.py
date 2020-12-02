from django.contrib.gis.db import models
from datetime import datetime,date 
from hashids import Hashids

class Soata(models.Model):
	hudud_kodi = models.IntegerField(blank=True, null=True)
	tuman_sh_kodi = models.IntegerField(blank=True, null=True)
	hudud_nomi=models.CharField('Hudud nomi',max_length=200,blank=True,null=True)
	tuman_sh_nomi=models.CharField('Hudud nomi',max_length=200,blank=True,null=True)

	def __str__(self):
		return self.tuman_sh_nomi
	class Meta:
		verbose_name_plural = "Soata"


class Authority(models.Model):
	kod = models.IntegerField(blank=True, null=True)
	title=models.CharField('Title',max_length=200,blank=True,null=True)

	def __str__(self):
		return self.title
	class Meta:
		verbose_name_plural = "Bajaruvchi tashkilotlar(my.gov.uz)"


class Crontab_data(models.Model):
	service=models.CharField('Service',max_length=200,blank=True,null=True)
	date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Date")


	def __str__(self):
		return self.service
	class Meta:
		verbose_name_plural = "Crontab_data"

 


hashids = Hashids(salt="www.dshk.uz", min_length=16)

class Location_obj(models.Model):

	geoPoint = models.MultiPointField("Point qo'yish",srid=4326,blank=True,null=True)
	geoPolygon = models.MultiPolygonField("Polygon chizish",srid=4326,blank=True,null=True)

	our_id = models.CharField('our_id',max_length=200,blank=True,null=True)
	kadastr_id = models.CharField('kadastr_id',max_length=200,blank=True,null=True)
	adress=models.TextField('Manzil',blank=True,null=True)

	apz=models.CharField('apz',max_length=200,blank=True,null=True)
	psd=models.CharField('psd',max_length=200,blank=True,null=True)
	psd_ind=models.CharField('psd_ind',max_length=200,blank=True,null=True)
	perm_rec=models.CharField('perm_rec',max_length=200,blank=True,null=True)
	smr=models.CharField('smr',max_length=200,blank=True,null=True)
	pexpl=models.CharField('pexpl',max_length=200,blank=True,null=True)
	pexpl_ind=models.CharField('pexpl_ind',max_length=200,blank=True,null=True)

	which_geo_select = (
        ('0', 'Null'),
        ('1', 'Point'),
        ('2', 'Polygon'),
        ('3', 'Point and Polygon'),
        )
	which_geo = models.CharField(verbose_name='Which Geo', default='0', max_length=10,choices=which_geo_select)


	def save(self, *args, **kwargs):
		if self.geoPoint==None and self.geoPolygon==None:
			self.which_geo='0'
		if self.geoPoint!=None and self.geoPolygon!=None:
			self.which_geo='3'

		if self.geoPoint!=None and self.geoPolygon==None:
			self.which_geo='1'

		if self.geoPoint==None and self.geoPolygon!=None:
			self.which_geo='2'


		super(Location_obj, self).save(*args, **kwargs)
		
		if self.our_id==None:
			self.our_id=hashids.encode(self.pk,int(self.which_geo),datetime.now().day,datetime.now().month,datetime.now().year)
			
			super(Location_obj, self).save(*args, **kwargs)

		from proj.reestr_projects_models import Apz,Psd,Psd_ind
		from proj.reestr_objects_models import Perm_rec,Smr,Pexpl,Pexpl_ind
		
		data=Apz.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()
		data=Psd.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()
		data=Psd_ind.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()

		data=Perm_rec.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()

		data=Smr.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()

		data=Pexpl.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()

		data=Pexpl_ind.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo=self.which_geo
				i.mysave()
	def delete(self, *args, **kwargs):
		from proj.reestr_projects_models import Apz,Psd,Psd_ind
		from proj.reestr_objects_models import Perm_rec,Smr,Pexpl,Pexpl_ind
		data=Apz.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='0'
				i.our_id=None
				i.mysave()
		data=Psd.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='O'
				i.our_id=None
				i.mysave()
		data=Psd_ind.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='0'
				i.our_id=None
				i.mysave()

		data=Perm_rec.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='0'
				i.our_id=None
				i.mysave()

		data=Smr.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='0'
				i.our_id=None
				i.mysave()

		data=Pexpl.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='0'
				i.our_id=None
				i.mysave()

		data=Pexpl_ind.objects.filter(our_id=self.our_id)
		if data:
			for i in data:
				i.which_geo='0'
				i.our_id=None
				i.mysave()

		super(Location_obj, self).delete(*args, **kwargs)



	def __str__(self):
		return self.our_id
	class Meta:
		verbose_name_plural = "Ob'yektlarni xaritada belgilash"
		verbose_name="Ob'yekt"
