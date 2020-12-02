from django.contrib.gis.db import models 

from proj.genplan_models import Genplans


class FunkZones(models.Model):
	type=models.IntegerField(default=-1,blank=True)
	disUz=models.CharField('Nomi Uzb',max_length=70,blank=True)
	disRu=models.CharField('Nomi Rus',max_length=70,blank=True)
	yesGenplan=models.BooleanField('Genplanda bormi?',default=False)
	yesApot=models.BooleanField('Apotda bormi?',default=False)
	color=models.CharField('color',default='',max_length=70,blank=True)

	def __str__(self):
		return self.disUz
	class Meta:
		verbose_name_plural = "FunkZones"
 
class FunkGenplans(models.Model):
	obj_id = models.AutoField(primary_key=True)
	genplan_id = models.ForeignKey(Genplans, on_delete=models.CASCADE, blank=True, null=True)
	funk_zone = models.ForeignKey(FunkZones, on_delete=models.CASCADE, blank=True, null=True)
	vil_id=models.IntegerField(blank=True, null=True,default=0)
	zonalarning_nomi = models.CharField(max_length=200, blank=True, null=True)
	funktsional_zonalarning_maydoni_ga = models.CharField(max_length=50,blank=True, null=True)
	mavjud_imoratlarning_tavsifi_asosan = models.TextField(blank=True, null=True)
	shaharsozlik_faoliyatining_ruxsat_berilgan_turi = models.TextField(blank=True, null=True)
	shaharsozlik_faoliyatining_taqiqlangan_turi = models.TextField(blank=True, null=True)
	shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru = models.TextField(blank=True, null=True)
	type = models.SmallIntegerField(blank=True, null=True)
	id=models.CharField(max_length=255, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)

	def __str__(self):
		return self.zonalarning_nomi

	class Meta:
		verbose_name_plural = "Bosh rejalar bo'yicha funksioan zonalar"
		db_table = 'funkgenplans'

 
class FunkGenplans_edit(models.Model):
	obj_id = models.AutoField(primary_key=True)
	genplan_id = models.ForeignKey(Genplans, on_delete=models.CASCADE, blank=True, null=True)
	funk_zone = models.ForeignKey(FunkZones, on_delete=models.CASCADE, blank=True, null=True)
	vil_id=models.IntegerField(blank=True, null=True,default=0)
	funkgenplan_id = models.ForeignKey(FunkGenplans, on_delete=models.CASCADE, blank=True, null=True)
	zonalarning_nomi = models.CharField(max_length=200, blank=True, null=True)
	funktsional_zonalarning_maydoni_ga = models.CharField(max_length=50,blank=True, null=True)
	mavjud_imoratlarning_tavsifi_asosan = models.TextField(blank=True, null=True)
	shaharsozlik_faoliyatining_ruxsat_berilgan_turi = models.TextField(blank=True, null=True)
	shaharsozlik_faoliyatining_taqiqlangan_turi = models.TextField(blank=True, null=True)
	shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru = models.TextField(blank=True, null=True)
	type = models.SmallIntegerField(blank=True, null=True)
	id=models.CharField(max_length=255, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiPolygonField(blank=True, null=True)


	def __str__(self):
		return self.zonalarning_nomi

	class Meta:
		verbose_name_plural = "Bosh rejalar bo'yicha funksioan zonalar edit"
		db_table = 'funkgenplans_edit'



class adminsFunkGenplans(models.Model):
	status_admin = (
		('1', 'Admin'),
		('2', 'Super admin'),
		)
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(verbose_name='login', default='fg_', max_length=40)
	password = models.CharField(verbose_name='parol',max_length=40)
	status = models.CharField(verbose_name='status',max_length=10,choices=status_admin)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)
	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Admin FunkGenplans"
