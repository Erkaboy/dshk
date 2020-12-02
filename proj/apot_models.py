from django.contrib.gis.db import models 

class Sub_apot(models.Model):
	id= models.AutoField(primary_key=True)
	nomi=models.CharField(max_length=255)
	type_sub = (
		('1', 'Yuklab olinadigan'),
		('2', "Ko'rish uchun"),
		)

	user_type = (
		('1', 'Ochiq'),
		('2', "Maxfiy"),
	)
	public_private = models.CharField(verbose_name='Ochiq yoki maxfiy', default='2',max_length=10,choices=user_type)

	zindex = models.IntegerField(blank=True, null=True)
	file_type = models.CharField(verbose_name='file_type',max_length=10,choices=type_sub)

	def __str__(self):
		return self.nomi

	class Meta:
		verbose_name_plural = "Sub_apot"
		ordering=["zindex"]

	def natural_key(self):
		return dict([(attr,getattr(self,attr)) for attr in[f.name for f in self._meta.fields]])


class Apots(models.Model):
	objectid = models.AutoField(primary_key=True)
	fuqarolar_yiginlari = models.CharField(max_length=255, blank=True, null=True)
	mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi = models.CharField(max_length=255, blank=True, null=True)
	respublika_viloyat = models.CharField(max_length=255, blank=True, null=True)
	tuman_shahar = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_tipi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_maqomi = models.CharField(max_length=255, blank=True, null=True)
	loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasini_tasdiqlangan_organ = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholining_loyihaviy_soni = models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqalgan_yili=models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqarish_asosi=models.CharField(max_length=255, blank=True, null=True)
	kfi_markazi=models.CharField(max_length=255, blank=True, null=True)
	boysinuvchi_aholi_punktlari_soni=models.CharField(max_length=255, blank=True, null=True)
	shaharsozlik_kengashi_qarori=models.CharField(max_length=255, blank=True, null=True)
	aholi_soni_tip=models.CharField(max_length=255, blank=True, null=True)
	reja_qilingan_hujjat=models.CharField(max_length=255, blank=True, null=True)
 
	tasdiqlanganligi=models.IntegerField(blank=True, null=True)

	id = models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)


	def __str__(self):
		return '%s %s' % (self.fuqarolar_yiginlari, self.objectid)
	class Meta:
		verbose_name_plural = "APOTs"
		db_table = 'apots'
	def delete(self, *args, **kwargs):
   
		super(Apots, self).delete(*args, **kwargs)

	def natural_key(self):
		return dict([(attr,getattr(self,attr)) for attr in[f.name for f in self._meta.fields if f.name!='wkb_geometry']])



class Apots_edit(models.Model):
	objectid = models.AutoField(primary_key=True)
	fuqarolar_yiginlari = models.CharField(max_length=255, blank=True, null=True)
	mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi = models.CharField(max_length=255, blank=True, null=True)
	respublika_viloyat = models.CharField(max_length=255, blank=True, null=True)
	tuman_shahar = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_tipi = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_maqomi = models.CharField(max_length=255, blank=True, null=True)
	loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyihasini_tasdiqlangan_organ = models.CharField(max_length=255, blank=True, null=True)
	shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholi_punktining_loyihaviy_maydoni_ga = models.CharField(max_length=255, blank=True, null=True)
	aholining_loyihaviy_soni = models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqalgan_yili=models.CharField(max_length=255, blank=True, null=True)
	ishlab_chiqarish_asosi=models.CharField(max_length=255, blank=True, null=True)
	kfi_markazi=models.CharField(max_length=255, blank=True, null=True)
	boysinuvchi_aholi_punktlari_soni=models.CharField(max_length=255, blank=True, null=True)
	shaharsozlik_kengashi_qarori=models.CharField(max_length=255, blank=True, null=True)
	aholi_soni_tip=models.CharField(max_length=255, blank=True, null=True)
	reja_qilingan_hujjat=models.CharField(max_length=255, blank=True, null=True)
 
	tasdiqlanganligi=models.IntegerField(blank=True, null=True)
 
	id = models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)
	apot_id = models.ForeignKey(Apots, on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		return '%s %s' % (self.fuqarolar_yiginlari, self.objectid)
	class Meta:
		verbose_name_plural = "Apots_edit"
		db_table = 'apots_edit'

	def my_delete(self, *args, **kwargs):
		super(Apots_edit, self).delete(*args, **kwargs)

	def delete(self, *args, **kwargs):
		objects = Sub_apot_data_edit.objects.filter(apot_id=self)
		for obj in objects:
			obj.delete()	
		super(Apots_edit, self).delete(*args, **kwargs)


class Sub_apot_data(models.Model):
	id= models.AutoField(primary_key=True)
	apot_id=models.ForeignKey(Apots,on_delete=models.CASCADE,default=-1)
	sub_apot_id=models.ForeignKey(Sub_apot,on_delete=models.CASCADE,default=-1)
	status = models.IntegerField(blank=True, null=True,default=0)
	file = models.FileField(upload_to='apot_data/data/',default='')
	def __str__(self):
		return str(self.sub_apot_id)
	class Meta:
		verbose_name_plural = "Sub_apot_data"

	def delete(self, *args, **kwargs):
		self.file.delete(save=False)
		super(Sub_apot_data, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(Sub_apot_data, self).delete(*args, **kwargs)

class Sub_apot_data_edit(models.Model):
	id= models.AutoField(primary_key=True)
	apot_id=models.ForeignKey(Apots_edit,on_delete=models.CASCADE,default=-1)
	sub_apot_id=models.ForeignKey(Sub_apot,on_delete=models.CASCADE,default=-1)
	status = models.IntegerField(blank=True, null=True,default=0)
	file = models.FileField(upload_to='apot_data/data/',default='')
	def __str__(self):
		return str(self.sub_apot_id)
	class Meta:
		verbose_name_plural = "Sub_apot_data_edit"

	def delete(self, *args, **kwargs):
		self.file.delete(save=False)
		super(Sub_apot_data_edit, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(Sub_apot_data_edit, self).delete(*args, **kwargs)

class adminsApot(models.Model):
	status_admin = (
		('1', 'Admin'),
		('2', 'Super admin'),
		)
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(verbose_name='login', default='apot_', max_length=40)
	password = models.CharField(verbose_name='parol',max_length=40)
	status = models.CharField(verbose_name='status',max_length=10,choices=status_admin)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)
	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Admin apot"
		
