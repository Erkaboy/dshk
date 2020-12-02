from django.contrib.gis.db import models 
 
class Pdps(models.Model):
	objectid = models.AutoField(primary_key=True)
	aholi_punktining_nomi = models.CharField(max_length=255, blank=True, null=True)
	mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_tipi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_maqomi = models.CharField(max_length=255, blank=True, null=True)
	respublika_viloyat = models.CharField(max_length=255, blank=True, null=True)
	tuman_shahar = models.CharField(max_length=255, blank=True, null=True)
	loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasini_tasdiqlangan_organ = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholining_loyihaviy_soni = models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqalgan_yili=models.CharField(max_length=255, blank=True, null=True)
	tasdiqlanganligi=models.IntegerField(blank=True, null=True)
	reja_qilingan_hujjat=models.CharField(max_length=255, blank=True, null=True)
	grafik_malumot=models.FileField(upload_to='pdp_data/main_data/',default='')
	izohlovchi_malumot=models.FileField(upload_to='pdp_data/main_data/',default='')
	id = models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)

	def __str__(self):
		# return self.aholi_punktining_nomi+''+self.objectid
		return '%s %s' % (self.aholi_punktining_nomi, self.objectid)
	class Meta:
		verbose_name_plural = "Pdps"
		db_table = 'pdp'
	def delete(self, *args, **kwargs):
		self.grafik_malumot.delete(save=False)
		self.izohlovchi_malumot.delete(save=False)
		objects = Sub_pdp_data.objects.filter(pdp_id=self)
		for obj in objects:
			obj.delete()
		super(Pdps, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Pdps, self).delete(*args, **kwargs)

 
class Pdps_edit(models.Model):
	objectid = models.AutoField(primary_key=True)
	aholi_punktining_nomi = models.CharField(max_length=255, blank=True, null=True)
	mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_tipi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_maqomi = models.CharField(max_length=255, blank=True, null=True)
	respublika_viloyat = models.CharField(max_length=255, blank=True, null=True)
	tuman_shahar = models.CharField(max_length=255, blank=True, null=True)
	loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasini_tasdiqlangan_organ = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholining_loyihaviy_soni = models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqalgan_yili=models.CharField(max_length=255, blank=True, null=True)
	tasdiqlanganligi=models.IntegerField(blank=True, null=True)
	reja_qilingan_hujjat=models.CharField(max_length=255, blank=True, null=True)
	grafik_malumot=models.FileField(upload_to='pdp_data/main_data/',default='')
	izohlovchi_malumot=models.FileField(upload_to='pdp_data/main_data/',default='')
	id = models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)
	pdp_id = models.ForeignKey(Pdps, on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		# return self.aholi_punktining_nomi+''+self.objectid
		return '%s %s' % (self.aholi_punktining_nomi, self.objectid)
	class Meta:
		verbose_name_plural = "Pdps_edit"
		db_table = 'pdp_edit'
	def delete(self, *args, **kwargs):
		self.grafik_malumot.delete(save=False)
		self.izohlovchi_malumot.delete(save=False)
		objects = Sub_pdp_data_edit.objects.filter(pdp_id=self)
		for obj in objects:
			obj.delete()
		super(Pdps_edit, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Pdps_edit, self).delete(*args, **kwargs)

class Sub_pdp(models.Model):
	id= models.AutoField(primary_key=True)
	nomi=models.CharField(max_length=255)
	zindex = models.IntegerField(blank=True, null=True)
	user_type = (
		('1', 'Umumiy ochiq'),
		('2', "Faqat geotif ochiq"),
		('3', "Faqat pdf ochiq"),
		('4', "Maxfiy"),
	)
	public_private = models.CharField(verbose_name='Ochiq yoki maxfiy', default='4',max_length=10,choices=user_type)

	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "sub_pdp"
		ordering=["zindex"]
# 
class Sub_sub_pdp(models.Model):
	id= models.AutoField(primary_key=True)
	nomi=models.CharField(max_length=255)
	zindex = models.IntegerField(blank=True, null=True)

	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "sub_sub_pdp"
		ordering=["zindex"]

class Sub_pdp_data(models.Model):
	id= models.AutoField(primary_key=True)
	pdp_id=models.ForeignKey(Pdps,on_delete=models.CASCADE,default=-1)
	sub_pdp_id=models.ForeignKey(Sub_pdp,on_delete=models.CASCADE,default=-1)
	layer_name=models.CharField(max_length=255)
	status = models.IntegerField(blank=True, null=True,default=0)
	geotif = models.FileField(upload_to='pdp_data/geotifs/',default='')
	pdf = models.FileField(upload_to='pdp_data/pdfs/',default='')
	def __str__(self):
		return self.layer_name
	class Meta:
		verbose_name_plural = "Sub_pdp_data"

	def delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		self.pdf.delete(save=False)

		objects = Sub_sub_pdp_data.objects.filter(Sub_pdp_data_id=self)
		for obj in objects:
			obj.delete()
		super(Sub_pdp_data, self).delete(*args, **kwargs)
	
	def self_delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		super(Sub_pdp_data, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(Sub_pdp_data, self).delete(*args, **kwargs)

class Sub_pdp_data_edit(models.Model):
	id= models.AutoField(primary_key=True)
	pdp_id=models.ForeignKey(Pdps_edit,on_delete=models.CASCADE, default=-1)
	sub_pdp_id=models.ForeignKey(Sub_pdp,on_delete=models.CASCADE,default=-1)
	layer_name=models.CharField(max_length=255)
	status = models.IntegerField(blank=True, null=True,default=0)
	geotif = models.FileField(upload_to='pdp_data/geotifs/',default='')
	pdf = models.FileField(upload_to='pdp_data/pdfs/',default='')
	def __str__(self):
		return self.layer_name
	class Meta:
		verbose_name_plural = "Sub_pdp_data_edit"

	def delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		self.pdf.delete(save=False)

		objects = Sub_sub_pdp_data_edit.objects.filter(Sub_pdp_data_id=self)
		for obj in objects:
			obj.delete()
		super(Sub_pdp_data_edit, self).delete(*args, **kwargs)
	
	def self_delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		super(Sub_pdp_data_edit, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(Sub_pdp_data_edit, self).delete(*args, **kwargs)


class Sub_sub_pdp_data(models.Model):
	id= models.AutoField(primary_key=True)
	Sub_pdp_data_id=models.ForeignKey(Sub_pdp_data,on_delete=models.CASCADE,default=-1)
	sub_sub_pdp_id=models.ForeignKey(Sub_sub_pdp,on_delete=models.CASCADE,default=-1)
	status = models.IntegerField(blank=True, null=True,default=0)
	file = models.FileField(upload_to='pdp_data/data/',default='')
	
	def __str__(self):
		return str(self.id)
	class Meta:
		verbose_name_plural = "Sub_sub_pdp_data"

	def delete(self, *args, **kwargs):
		self.file.delete(save=False)

		super(Sub_sub_pdp_data, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Sub_sub_pdp_data, self).delete(*args, **kwargs)

class Sub_sub_pdp_data_edit(models.Model):
	id= models.AutoField(primary_key=True)
	Sub_pdp_data_id=models.ForeignKey(Sub_pdp_data_edit,on_delete=models.CASCADE,default=-1)
	sub_sub_pdp_id=models.ForeignKey(Sub_sub_pdp,on_delete=models.CASCADE,default=-1)
	status = models.IntegerField(blank=True, null=True,default=0)
	file = models.FileField(upload_to='pdp_data/data/',default='')
	
	def __str__(self):
		return str(self.id)
	class Meta:
		verbose_name_plural = "Sub_sub_pdp_data_edit"

	def delete(self, *args, **kwargs):
		self.file.delete(save=False)
		super(Sub_sub_pdp_data_edit, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Sub_sub_pdp_data_edit, self).delete(*args, **kwargs)


 
class adminsPdp(models.Model):
	status_admin = (
		('1', 'Admin'),
		('2', 'Super admin'),
		)
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(verbose_name='login', default='pdp_', max_length=40)
	password = models.CharField(verbose_name='parol',max_length=40)
	status = models.CharField(verbose_name='status',max_length=10,choices=status_admin)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)


	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Admin Pdp"
		
