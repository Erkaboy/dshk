from django.contrib.gis.db import models
 

class Loyihalovchi(models.Model):
	id= models.AutoField(primary_key=True)
	nomi= models.TextField(null=True,blank=True)
	txtash=models.CharField(max_length=255,blank=True)
	inn=models.CharField(max_length=600,blank=True)
	adress=models.TextField(null=True,blank=True)
	location = models.PointField(srid=4326,blank=True,null=True)
	raxbar=models.CharField(max_length=255,blank=True)
	contact=models.TextField(blank=True)
	ifut=models.CharField(max_length=70,blank=True)
	ifut_kodi=models.CharField(max_length=30,blank=True)
	litsenziya=models.CharField(max_length=255,blank=True)
	litsenziya_sana=models.DateField(auto_now=False,auto_now_add=False,blank=True,null=True)
	litsenziya_muddat=models.CharField(max_length=255,blank=True,null=True)
	litsenziya_ft=models.CharField(max_length=200,blank=True)
	litsenziya_kshr=models.CharField(max_length=200,blank=True)
	litsenziya_kshr_sana=models.DateField(auto_now=False,auto_now_add=False,blank=True,null=True)
	litsenziyalangan_ishlar=models.CharField(max_length=255,blank=True)
	litsenziya_qro=models.CharField(max_length=255,blank=True)
	mulk_shakli=models.CharField(max_length=200,blank=True)
	viloyat=models.CharField(max_length=200,blank=True)
	tuman=models.CharField(max_length=200,blank=True)
	ap=models.CharField(max_length=200,blank=True)

	reestr_raqami=models.CharField(max_length=200,blank=True)	
	litsenziya_2=models.CharField(max_length=255,blank=True)
	litsenziya_muddat_2=models.CharField(max_length=255,blank=True)
	ashxkb=models.TextField(null=True,blank=True)

	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "Loyihalovchi tashkilotlar"


class Quruvchi(models.Model):
	id= models.AutoField(primary_key=True)
	nomi= models.TextField(null=True,blank=True)
	txtash=models.CharField(max_length=255,blank=True)
	inn=models.CharField(max_length=600,blank=True)
	adress=models.TextField(null=True,blank=True)
	location = models.PointField(srid=4326,blank=True,null=True)
	raxbar=models.CharField(max_length=255,blank=True)
	contact=models.TextField(blank=True)
	mulk_shakli=models.CharField(max_length=200,blank=True)
	viloyat=models.CharField(max_length=200,blank=True)
	tuman=models.CharField(max_length=200,blank=True)
	ap=models.CharField(max_length=200,blank=True)
	reestr_raqami=models.CharField(max_length=200,blank=True)	


	def __str__(self):
		return self.nomi
	class Meta:
		verbose_name_plural = "Pudratchi tashkilotlar"


class Buyurtmachi_fiz(models.Model):
	full_name= models.CharField('Ф.И.О',max_length=600,blank=True,null=True) #Ф.И.О
	tin= models.CharField('ИНН',max_length=600,blank=True,null=True) #ИНН
	email = models.CharField('Nomi',max_length=600,blank=True,null=True) #Электронная почта физического лица
	passport_number = models.CharField('Nomi',max_length=600,blank=True,null=True) #Серия и номер паспорта
	passport_issue_date = models.CharField('Nomi',max_length=600,blank=True,null=True) # Дата выдачи
	permit_address = models.TextField('Nomi',blank=True,null=True) #Адрес по прописке
	phone = models.CharField('Nomi',max_length=600,blank=True,null=True) #Номер телефона физического лица
	birthday = models.CharField('Nomi',max_length=600,blank=True,null=True) # Дата рождения
  
	def __str__(self):
		return self.full_name
	class Meta:
		verbose_name_plural = "Buyurtmachi_fiz"


class Buyurtmachi_yur(models.Model):
	
	legal_entity_phone_number = models.CharField('Nomi',max_length=600,blank=True,null=True)#Телефон юридического лица
	legal_head_tin = models.CharField('Nomi',max_length=600,blank=True,null=True)#ИНН руководителя
	legal_head_name = models.CharField('Nomi',max_length=600,blank=True,null=True)#Имя руководителя
	legal_entity_address = models.TextField('Nomi',blank=True,null=True)#Юридический адрес
	legal_entity_email = models.CharField('Nomi',max_length=600,blank=True,null=True)#Электронная почта юридического лица
	legal_entity_name = models.CharField('Nomi',max_length=600,blank=True,null=True)#Название юридического лица
	legal_entity_tin = models.CharField('Nomi',max_length=600,blank=True,null=True)#ИНН юридического лица
   

	def __str__(self):
		return self.legal_entity_name
	class Meta:
		verbose_name_plural = "Buyurtmachi_yur"



