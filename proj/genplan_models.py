from django.contrib.gis.db import models

class adminsGenplan(models.Model):
	status_admin = (
		('1', 'Admin'),
		('2', 'Super admin'),
		)
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(verbose_name='login', default='gen_', max_length=40)
	password = models.CharField(verbose_name='parol',max_length=40)
	status = models.CharField(verbose_name='status',max_length=10,choices=status_admin)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)


	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Admin genplan"




class Genplans(models.Model):
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
	qizil_chiziq=models.IntegerField(blank=True, null=True,default=0)
	funk_zone=models.IntegerField(blank=True, null=True,default=0)
	grafik_malumot=models.FileField(upload_to='genplan_data/main_data/',default='')
	izohlovchi_malumot=models.FileField(upload_to='genplan_data/main_data/',default='')
	id = models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)

	def __str__(self):
		# return self.aholi_punktining_nomi+''+self.objectid
		return '%s %s' % (self.aholi_punktining_nomi, self.objectid)
	class Meta:
		verbose_name_plural = "Genplans"
		db_table = 'genplan'
	def delete(self, *args, **kwargs):
		self.grafik_malumot.delete(save=False)
		self.izohlovchi_malumot.delete(save=False)

		objects = Sub_genplan_data.objects.filter(genplan_id=self)
		for obj in objects:
			obj.delete()
		super(Genplans, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Genplans, self).delete(*args, **kwargs)

	def natural_key(self):
		return dict([(attr,getattr(self,attr)) for attr in[f.name for f in self._meta.fields if f.name!='grafik_malumot' and f.name!='izohlovchi_malumot' and f.name!='wkb_geometry']])



class Genplans_edit(models.Model):
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
	grafik_malumot=models.FileField(upload_to='genplan_data/main_data/',default='')
	izohlovchi_malumot=models.FileField(upload_to='genplan_data/main_data/',default='')
	tasdiqlanganligi=models.IntegerField(blank=True, null=True)
	reja_qilingan_hujjat=models.CharField(max_length=255, blank=True, null=True)
	id = models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)
	genplan_id = models.ForeignKey(Genplans, on_delete=models.CASCADE, blank=True, null=True)

	admin_id=models.IntegerField(blank=True, null=True,default=0)
	send_sdmin=models.IntegerField(blank=True, null=True,default=0)
	event_id=models.IntegerField(blank=True, null=True,default=-1)


	def __str__(self):
		# return self.aholi_punktining_nomi+''+self.objectid
		return '%s %s' % (self.aholi_punktining_nomi, self.objectid)
	class Meta:
		verbose_name_plural = "Genplans_edit"
		db_table = 'genplan_edit'
	def delete(self, *args, **kwargs):
		self.grafik_malumot.delete(save=False)
		self.izohlovchi_malumot.delete(save=False)
		objects = Sub_genplan_data_edit.objects.filter(genplan_id=self)
		for obj in objects:
			obj.delete()
		super(Genplans_edit, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Genplans_edit, self).delete(*args, **kwargs)

	def natural_key(self):
		return dict([(attr,getattr(self,attr)) for attr in[f.name for f in self._meta.fields if f.name!='grafik_malumot' and f.name!='izohlovchi_malumot' and f.name!='wkb_geometry']])


class Sub_genplan(models.Model):
	id= models.AutoField(primary_key=True)
	nomi=models.CharField(max_length=255)

	zindex = models.IntegerField(blank=True, null=True)
	user_type = (
		('1', 'Umumiy ochiq'),
		('2', "Faqat geotif ochiq"),
		('3', "Faqat pdf ochiq"),
		('4', "Maxfiy"),
	)
	public_private = models.CharField(verbose_name='Ochiq yoki maxfiy', default='2',max_length=10,choices=user_type)

	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "sub_genplan"
		ordering=["zindex"]

class Sub_sub_genplan(models.Model):
	id= models.AutoField(primary_key=True)
	nomi=models.CharField(max_length=255)
	zindex = models.IntegerField(blank=True, null=True)

	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "sub_sub_genplan"
		ordering=["zindex"]

class Sub_genplan_data(models.Model):
	id= models.AutoField(primary_key=True)
	genplan_id=models.ForeignKey(Genplans,on_delete=models.CASCADE,default=-1)
	sub_genplan_id=models.ForeignKey(Sub_genplan,on_delete=models.CASCADE,default=-1)
	layer_name=models.CharField(max_length=255)
	status = models.IntegerField(blank=True, null=True,default=0)
	geotif = models.FileField(upload_to='genplan_data/geotifs/',default='')
	pdf = models.FileField(upload_to='genplan_data/pdfs/',default='')
	def __str__(self):
		return self.layer_name
	class Meta:
		verbose_name_plural = "Sub_genplan_data"

	def delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		self.pdf.delete(save=False)

		objects = Sub_sub_genplan_data.objects.filter(Sub_genplan_data_id=self)
		for obj in objects:
			obj.delete()
		super(Sub_genplan_data, self).delete(*args, **kwargs)


	def self_delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		super(Sub_genplan_data, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(Sub_genplan_data, self).delete(*args, **kwargs)

class Sub_genplan_data_edit(models.Model):
	id= models.AutoField(primary_key=True)
	genplan_id=models.ForeignKey(Genplans_edit,on_delete=models.CASCADE, default=-1)
	sub_genplan_id=models.ForeignKey(Sub_genplan,on_delete=models.CASCADE,default=-1)
	layer_name=models.CharField(max_length=255)
	status = models.IntegerField(blank=True, null=True,default=0)
	geotif = models.FileField(upload_to='genplan_data/geotifs/',default='')
	pdf = models.FileField(upload_to='genplan_data/pdfs/',default='')
	def __str__(self):
		return self.layer_name
	class Meta:
		verbose_name_plural = "Sub_genplan_data_edit"

	def delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		self.pdf.delete(save=False)

		objects = Sub_sub_genplan_data_edit.objects.filter(Sub_genplan_data_id=self)
		for obj in objects:
			obj.delete()
		super(Sub_genplan_data_edit, self).delete(*args, **kwargs)

	def self_delete(self, *args, **kwargs):
		self.geotif.delete(save=False)
		super(Sub_genplan_data_edit, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(Sub_genplan_data_edit, self).delete(*args, **kwargs)


class Sub_sub_genplan_data(models.Model):
	id= models.AutoField(primary_key=True)
	Sub_genplan_data_id=models.ForeignKey(Sub_genplan_data,on_delete=models.CASCADE,default=-1)
	sub_sub_genplan_id=models.ForeignKey(Sub_sub_genplan,on_delete=models.CASCADE,default=-1)
	status = models.IntegerField(blank=True, null=True,default=0)
	file = models.FileField(upload_to='genplan_data/data/',default='')

	def __str__(self):
		return str(self.id)
	class Meta:
		verbose_name_plural = "Sub_sub_genplan_data"

	def delete(self, *args, **kwargs):
		self.file.delete(save=False)

		super(Sub_sub_genplan_data, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Sub_sub_genplan_data, self).delete(*args, **kwargs)

class Sub_sub_genplan_data_edit(models.Model):
	id= models.AutoField(primary_key=True)
	Sub_genplan_data_id=models.ForeignKey(Sub_genplan_data_edit,on_delete=models.CASCADE,default=-1)
	sub_sub_genplan_id=models.ForeignKey(Sub_sub_genplan,on_delete=models.CASCADE,default=-1)
	status = models.IntegerField(blank=True, null=True,default=0)
	file = models.FileField(upload_to='genplan_data/data/',default='')

	def __str__(self):
		return str(self.id)
	class Meta:
		verbose_name_plural = "Sub_sub_genplan_data_edit"

	def delete(self, *args, **kwargs):
		self.file.delete(save=False)
		super(Sub_sub_genplan_data_edit, self).delete(*args, **kwargs)
	def my_delete(self, *args, **kwargs):
		super(Sub_sub_genplan_data_edit, self).delete(*args, **kwargs)




class genplansEvent(models.Model):
	genplan_id=models.CharField(max_length=255)
	admin_id=models.IntegerField(blank=True, null=True)
	event_type=models.IntegerField(blank=True, null=True) # 1-yangi, 2-o'zgarish, 3-uchirish
	object_box=models.TextField(blank=True, null=True)
	event_dis=models.TextField(blank=True, null=True)
	event_date=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)

	superadmin_id=models.IntegerField(blank=True, null=True)
	event_ans_type=models.IntegerField(blank=True, null=True) # 0-rad etish, 1-tasdiqlash
	event_ans_dis=models.TextField(blank=True, null=True)
	event_ans_date=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)

	def __str__(self):
		return str(self.genplan_id)
	class Meta:
		verbose_name_plural = "genplansEvent"
