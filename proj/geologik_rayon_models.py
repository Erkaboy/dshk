from django.contrib.gis.db import models 

  
class GeologRayon_data(models.Model):
	ojb_id = models.AutoField(primary_key=True)
	obyekt_nomi=models.CharField(max_length=350,blank=True, null=True)
	bajaruvchi_tashkilot=models.CharField(max_length=255,blank=True, null=True)
	bajaruvchi_shaxs=models.CharField(max_length=255,blank=True, null=True)
	buyurtmachi=models.CharField(max_length=255,blank=True, null=True)
	inv_nomer=models.CharField(max_length=255,blank=True, null=True)
	grif=models.CharField(max_length=100,blank=True, null=True)
	koordinatalar_tizimi=models.CharField(max_length=255,blank=True, null=True)
	masshtab=models.CharField(max_length=255,blank=True, null=True)
	ish_boshlangan_vaqt=models.CharField(max_length=255,blank=True, null=True)
	ish_yakunlangan_vaqt=models.CharField(max_length=255,blank=True, null=True)
	ish_bajarilgan_davr=models.CharField(max_length=255,blank=True, null=True)
	maydoni_ga=models.CharField(max_length=255,blank=True, null=True)
	shartnoma_n=models.CharField(max_length=255,blank=True, null=True)
	shartnoma_nomi=models.CharField(max_length=255,blank=True, null=True)
	vil_id=models.IntegerField(blank=True, null=True,default=0)
	tuman=models.CharField(max_length=255,blank=True, null=True)
	joy_nomi=models.CharField(max_length=255,blank=True, null=True)
	izoh=models.TextField(blank=True, null=True)
	id=models.CharField(max_length=100,blank=True, null=True)
	soato=models.CharField(max_length=100,blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)

	hisobot=models.FileField(upload_to='geologik_rayon/hisobot/',default='',blank=True)
	grafik=models.FileField(upload_to='geologik_rayon/grafik/',default='',blank=True)

	def delete(self, *args, **kwargs):
		self.hisobot.delete(save=False)
		self.grafik.delete(save=False)
		super(GeologRayon_data, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(GeologRayon_data, self).delete(*args, **kwargs)	
 	
	def __str__(self):
		return self.id

	class Meta:
		verbose_name_plural = "Geologik rayonlashtirish data"
		db_table = 'geolograyon_data'

	def natural_key(self):
		return dict([(attr,getattr(self,attr)) for attr in[f.name for f in self._meta.fields if f.name!='hisobot' and f.name!='grafik' and f.name!='wkb_geometry']])


 

class GeologRayon_data_edit(models.Model):
	ojb_id = models.AutoField(primary_key=True)
	geolograyon_data_id = models.ForeignKey(GeologRayon_data, on_delete=models.CASCADE, blank=True, null=True)
	obyekt_nomi=models.CharField(max_length=350,blank=True, null=True)
	bajaruvchi_tashkilot=models.CharField(max_length=255,blank=True, null=True)
	bajaruvchi_shaxs=models.CharField(max_length=255,blank=True, null=True)
	buyurtmachi=models.CharField(max_length=255,blank=True, null=True)
	inv_nomer=models.CharField(max_length=255,blank=True, null=True)
	grif=models.CharField(max_length=100,blank=True, null=True)
	koordinatalar_tizimi=models.CharField(max_length=255,blank=True, null=True)
	masshtab=models.CharField(max_length=255,blank=True, null=True)
	ish_boshlangan_vaqt=models.CharField(max_length=255,blank=True, null=True)
	ish_yakunlangan_vaqt=models.CharField(max_length=255,blank=True, null=True)
	ish_bajarilgan_davr=models.CharField(max_length=255,blank=True, null=True)
	maydoni_ga=models.CharField(max_length=255,blank=True, null=True)
	shartnoma_n=models.CharField(max_length=255,blank=True, null=True)
	shartnoma_nomi=models.CharField(max_length=255,blank=True, null=True)
	vil_id=models.IntegerField(blank=True, null=True,default=0)
	tuman=models.CharField(max_length=255,blank=True, null=True)
	joy_nomi=models.CharField(max_length=255,blank=True, null=True)
	izoh=models.TextField(blank=True, null=True)
	id=models.CharField(max_length=100,blank=True, null=True)
	soato=models.CharField(max_length=100,blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)

	hisobot=models.FileField(upload_to='geologik_rayon/hisobot/',default='',blank=True)
	grafik=models.FileField(upload_to='geologik_rayon/grafik/',default='',blank=True)

	def delete(self, *args, **kwargs):
		self.hisobot.delete(save=False)
		self.grafik.delete(save=False)
		super(GeologRayon_data_edit, self).delete(*args, **kwargs)

	def my_delete(self, *args, **kwargs):
		super(GeologRayon_data_edit, self).delete(*args, **kwargs)	
 
	def __str__(self):
		return self.id

	class Meta:
		verbose_name_plural = "Geologik rayonlashtirish data"
		db_table = 'geolograyon_data_edit'

	def natural_key(self):
		return dict([(attr,getattr(self,attr)) for attr in[f.name for f in self._meta.fields if f.name!='hisobot' and f.name!='grafik' and f.name!='wkb_geometry']])



class GeologRayon(models.Model):
	ojb_id = models.AutoField(primary_key=True)
	geolograyon_data_id = models.ForeignKey(GeologRayon_data, on_delete=models.CASCADE, blank=True, null=True)
	vil_id = models.IntegerField(blank=True, null=True,default=0)
	injenerlik_geologik_viloyat_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_viloyat_tavsifi=models.TextField(blank=True, null=True)
	injenerlik_geologik_hududlar_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_hududlar_tavsifi=models.TextField(blank=True, null=True)
	injenerlik_geologik_kichik_hududlar_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_kichik_hududlar_tavsifi=models.TextField(blank=True, null=True)
	injenerlik_geologik_uchastkalar_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_uchastkalar_tavsifi=models.TextField(blank=True, null=True)
	hududlarning_geologik_genetik_tavsifi=models.TextField(blank=True, null=True)
	hududdagi_geodinamik_jarayonlar=models.TextField(blank=True, null=True)
	tavsiya_etiladigan_injenerlik_tadbirlari=models.TextField(blank=True, null=True)
	gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=models.CharField(max_length=255, blank=True, null=True)
	kod=models.CharField(max_length=50, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	id=models.CharField(max_length=100,blank=True, null=True)
	wkb_geometry= models.MultiPolygonField(blank=True, null=True)

	def __str__(self):
		return self.id

	class Meta:
		verbose_name_plural = "Geologik rayonlashtirish polygon"
		db_table = 'geolograyon'

  
class GeologRayon_edit(models.Model):
	ojb_id = models.AutoField(primary_key=True)
	geolograyon_data_id = models.ForeignKey(GeologRayon_data, on_delete=models.CASCADE, blank=True, null=True)
	geolograyon_data_edit_id = models.ForeignKey(GeologRayon_data_edit, on_delete=models.CASCADE, blank=True, null=True)
	geolograyon_id = models.ForeignKey(GeologRayon, on_delete=models.CASCADE, blank=True, null=True)
	vil_id = models.IntegerField(blank=True, null=True,default=0)
	injenerlik_geologik_viloyat_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_viloyat_tavsifi=models.TextField(blank=True, null=True)
	injenerlik_geologik_hududlar_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_hududlar_tavsifi=models.TextField(blank=True, null=True)
	injenerlik_geologik_kichik_hududlar_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_kichik_hududlar_tavsifi=models.TextField(blank=True, null=True)
	injenerlik_geologik_uchastkalar_indeksi=models.CharField(max_length=255, blank=True, null=True)
	injenerlik_geologik_uchastkalar_tavsifi=models.TextField(blank=True, null=True)
	hududlarning_geologik_genetik_tavsifi=models.TextField(blank=True, null=True)
	hududdagi_geodinamik_jarayonlar=models.TextField(blank=True, null=True)
	tavsiya_etiladigan_injenerlik_tadbirlari=models.TextField(blank=True, null=True)
	gruntlarning_seysmik_xususiyatlari_buyicha_toifasi=models.CharField(max_length=255, blank=True, null=True)
	kod=models.CharField(max_length=50, blank=True, null=True)
	id=models.CharField(max_length=100,blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry= models.MultiPolygonField(blank=True, null=True)

	def __str__(self):
		return self.id

	class Meta:
		verbose_name_plural = "Geologik rayonlashtirish polygon edit"
		db_table = 'geolograyon_edit'



class adminsGeologRayon(models.Model):
	status_admin = (
		('1', 'Admin'),
		('2', 'Super admin'),
		)
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(verbose_name='login', default='gr_', max_length=40)
	password = models.CharField(verbose_name='parol',max_length=40)
	status = models.CharField(verbose_name='status',max_length=10,choices=status_admin)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)
	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Admin GeologRayon"
