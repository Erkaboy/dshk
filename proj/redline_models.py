from django.contrib.gis.db import models 

from proj.genplan_models import Genplans
 
class Redlines(models.Model):
	obj_id = models.AutoField(primary_key=True)
	genplan_id = models.ForeignKey(Genplans, on_delete=models.CASCADE, blank=True, null=True)
	vil_id=models.IntegerField(blank=True, null=True,default=0)
	nomi=models.CharField(max_length=255, blank=True, null=True)
	id=models.CharField(max_length=255, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiLineStringField(blank=True, null=True)

	def __str__(self):
		return self.nomi

	class Meta:
		verbose_name_plural = "Qizil chiziqlar"
		db_table = 'redlines'

 
class Redlines_edit(models.Model):
	obj_id = models.AutoField(primary_key=True)
	genplan_id = models.ForeignKey(Genplans, on_delete=models.CASCADE, blank=True, null=True)
	vil_id=models.IntegerField(blank=True, null=True,default=0)
	redline_id = models.ForeignKey(Redlines, on_delete=models.CASCADE, blank=True, null=True)
	nomi =models.CharField(max_length=255, blank=True, null=True)
	id=models.CharField(max_length=255, blank=True, null=True)
	status = models.IntegerField(blank=True, null=True,default=0)
	wkb_geometry = models.MultiLineStringField(blank=True, null=True)

	def __str__(self):
		return self.nomi

	class Meta:
		verbose_name_plural = "Qizil chiziqlar edit"
		db_table = 'redlines_edit'



class adminsRedline(models.Model):
	status_admin = (
		('1', 'Admin'),
		('2', 'Super admin'),
		)
	full_name = models.CharField(verbose_name='Full name',max_length=250)
	email= models.EmailField(verbose_name='email',max_length=250,blank=True)
	contact=models.CharField(verbose_name='contact',max_length=250,blank=True)
	login = models.CharField(verbose_name='login', default='rl_', max_length=40)
	password = models.CharField(verbose_name='parol',max_length=40)
	status = models.CharField(verbose_name='status',max_length=10,choices=status_admin)
	active_time=models.DateTimeField(auto_now=False,auto_now_add=False,blank=True,null=True)
	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Admin redline"
