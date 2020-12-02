from django.contrib.gis.db import models 
from datetime import datetime,date
from proj.reestr_add_models import Location_obj

class Apz(models.Model):

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)
    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.TextField('Nomi',blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")

#buyurtmachi

    user_type_real= models.CharField('Тип пользователя',max_length=600,blank=True,null=True) #Тип пользователя

    legal_entity_tin = models.CharField('ИНН юридического лица',max_length=600,blank=True,null=True)#ИНН юридического лица 
    tin= models.CharField('ИНН',max_length=600,blank=True,null=True) #ИНН
    passport_number = models.CharField('Серия и номер паспорта',max_length=600,blank=True,null=True)#Серия и номер паспорта

    term_service = models.TextField('Срок получения услуги',blank=True,null=True)#Срок получения услуги
    acception_consideration= models.TextField('Уведомление пользователю',blank=True,null=True) #Уведомление пользователю
    reject_reason = models.TextField('Причина отказа',max_length=600,null=True)#Причина отказа
    settlement_account= models.TextField('Утвержденный договор',blank=True,null=True) #Утвержденный договор
    name_bank = models.TextField('Наименование обслуживающего банка',blank=True,null=True)#Наименование обслуживающего банка
    
    name_building = models.TextField('Наименование объекта',blank=True,null=True)#Наименование объекта
    location_building= models.TextField('Месторасположение объекта (индекс, адрес, ориентир)',blank=True,null=True) #Месторасположение объекта (индекс, адрес, ориентир)

    requisites = models.TextField('Реквизиты',blank=True,null=True)#Реквизиты
    decision_state_authority = models.TextField('Решение органа государственной власти на местах о предоставлении земельного участка для проектирования и строительства объекта, с приложением плана размещения земельного участка или акта выноса его границ в натуру',blank=True,null=True)#Решение органа государственной власти на местах о предоставлении земельного участка для проектирования и строительства объекта, с приложением плана размещения земельного участка или акта выноса его границ в натуру
    decision_city_hokim = models.TextField('Решение хокима города (района) о переводе жилых помещений в категорию нежилых',blank=True,null=True)#Решение хокима города (района) о переводе жилых помещений в категорию нежилых
    permissions_department = models.TextField('Разрешение, соответственно, главного управления строительства г. Ташкента или отдела строительства района (города) на перепрофилирование и реконструкцию объекта.',blank=True,null=True)#Разрешение, соответственно, главного управления строительства г. Ташкента или отдела строительства района (города) на перепрофилирование и реконструкцию объекта.
    contract_cost= models.TextField('Утвержденный договор и стоимость оплаты сбора',blank=True,null=True) #Утвержденный договор и стоимость оплаты сбора
    apz= models.TextField('АПЗ',max_length=600,blank=True,null=True) #АПЗ
    purpose_construction_real= models.TextField('Цель проекта строительства или реконструкции_real',blank=True,null=True) #Цель проекта строительства или реконструкции

    region = models.CharField('Регион',max_length=600,blank=True,null=True)#Регион
    district = models.CharField('Район',max_length=600,blank=True,null=True)#Район
 
    region_real = models.CharField('Регион_real',max_length=600,blank=True,null=True)#Регион
    district_real = models.CharField('Район_real',max_length=600,blank=True,null=True)#Район
 
    file_water= models.TextField('Технические условия (водоснабжения)',blank=True,null=True) #Технические условия (водоснабжения)
    file_light = models.TextField('Технические условия (электрической энергии)',blank=True,null=True)#Технические условия (электрической энергии)
    file_gas = models.TextField('Технические условия (газ)',blank=True,null=True)#Технические условия (газ)
    authority_light = models.TextField('Региональный ЭСП',blank=True,null=True)#Региональный ЭСП
    district_file = models.TextField('district_file',blank=True,null=True)#Район
    region_light = models.TextField('region_light',blank=True,null=True)#Регион
    desired_water = models.TextField('Нужной водяной напряжение',blank=True,null=True)#Нужной водяной напряжение
    desired_water_real = models.TextField('Нужной водяной напряжение',blank=True,null=True)#Нужной водяной напряжение
    desired_gas = models.TextField('Нужной газовый напряжение',blank=True,null=True)#Нужной газовый напряжение
    desired_gas_real = models.TextField('Нужной газовый напряжение',blank=True,null=True)#Нужной газовый напряжение
    desired_electrical = models.TextField('Нужной электрический напряжение',blank=True,null=True)#Нужной электрический напряжение
    desired_electrical_real= models.TextField('Нужной электрический напряжение',blank=True,null=True) #Нужной электрический напряжение


    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)



    def __str__(self):
        return self.name_building
    class Meta:
        verbose_name="Arxitektura-rejalashtirish topshirig'i"
        verbose_name_plural = "Arxitektura-rejalashtirish topshiriqlari reestri"


    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.apz=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Apz, self).save(*args, **kwargs)

    def mysave(self, *args, **kwargs):
        super(Apz, self).save(*args, **kwargs)



class Psd(models.Model):

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)

    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.CharField('operator',max_length=600,blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int

    situation_plan_location_obj= models.TextField('Nomi',blank=True,null=True)  #Ситуационный план размещения объекта
    general_plan_buildings_struct_other_obj= models.TextField('Nomi',blank=True,null=True) #Генеральный план зданий, сооружений или другого объекта
    facades_main_side = models.TextField('Nomi',blank=True,null=True)#Фасады (главные и боковые)
    requisites_architectural_planning_assignment= models.TextField('Nomi',blank=True,null=True) #Реквизиты архитектурно-планировочного задания
  

  #loyihachi
    tin_project_org= models.TextField('ИНН проектной организации',blank=True,null=True) #ИНН проектной организации
    
    name_design_estimates= models.TextField('Наименование проектно-сметной документации',blank=True,null=True) #Наименование проектно-сметной документации
    user_ds = models.TextField('Nomi',blank=True,null=True)#ЭЦП заявителя
    doc_architectura = models.TextField('Nomi',blank=True,null=True)#Документ (Согласования)
    region_id = models.TextField('Регион',blank=True,null=True)# Регион
    region_id_real = models.TextField('Nomi',blank=True,null=True)# Регион
    user_ds_gov = models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку
    responsible_person_rejected = models.TextField('Nomi',blank=True,null=True)# Ответственное лицо
    responsible_person = models.TextField('Nomi',blank=True,null=True)#Ответственное лицо
    reject_reason = models.TextField('Nomi',blank=True,null=True)#Причина отказа
    acception_consideration = models.TextField('Nomi',blank=True,null=True)#Уведомление пользователю
 
#buyurtmachi
    user_type_real = models.TextField('Nomi',blank=True,null=True)#Тип пользователя
    legal_entity_tin = models.TextField('ИНН юридического лица',blank=True,null=True)#ИНН юридического лица
    individual_tin = models.TextField('ИНН',blank=True,null=True)#ИНН
    passport_number = models.CharField('Серия и номер паспорта',max_length=600,blank=True,null=True)#Серия и номер паспорта

    district_id = models.TextField('Район',blank=True,null=True)# Район
    district_id_real = models.TextField('Nomi',blank=True,null=True)# Район
    file_main = models.TextField('Nomi',blank=True,null=True)#Проектно-сметная документация
   
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")

    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)


    def __str__(self):
        return self.name_design_estimates
    
    class Meta:
        verbose_name="Loyiha-smeta hujjati"
        verbose_name_plural = "Binolar, inshootlar va boshqa obyektlar qurilishining loyiha-smeta hujjatlari reestri"



    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.psd=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Psd, self).save(*args, **kwargs)
    def mysave(self, *args, **kwargs):
        super(Psd, self).save(*args, **kwargs)



class Psd_ind(models.Model):

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)

    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.TextField('Nomi',blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int

    financial_calculation= models.TextField('Nomi',blank=True,null=True) #Сметно-финансовый расчет (при получении кредита)
    ownership_documents = models.TextField('Nomi',blank=True,null=True)#Документы, удостоверяющие право собственности на индивидуальный жилой дом
    technical_conclusion= models.TextField('Nomi',blank=True,null=True) #Техническое заключение (при необходимости)
    
#buyurtmachi
    passport_number= models.TextField('Серия и номер паспорта',blank=True,null=True) #Серия и номер паспорта
    tin = models.TextField('ИНН',blank=True,null=True)#ИНН


    number_certificate_land = models.TextField('Nomi',blank=True,null=True)#Номер и дата свидетельства о государственной регистрации прав  на земельные участки (при строительстве жилого дома)
    date_certificate_land = models.TextField('Nomi',blank=True,null=True)#Номер и дата регистрации кадастрового дела (при реконструкции)
    object_name = models.TextField('Наименование объекта',blank=True,null=True)
    object_adress = models.TextField('Месторасположение объекта (индекс, адрес, ориентир)',blank=True,null=True)
    plan_land_plot = models.TextField('Nomi',blank=True,null=True)#проект плана земельного участка, с отображением надземных и подземных инженерных коммуникаций
    foundation_plan = models.TextField('Nomi',blank=True,null=True)#План фундаментов, подвалов, этажей, разрезов и фасадов индивидуального жилого дома
    construction_apartment = models.TextField('Nomi',blank=True,null=True)#Cтроительство жилого дома
    house_reconstruction = models.TextField('Nomi',blank=True,null=True)#Реконструкция жилья
    treatment_purpose = models.TextField('Nomi',blank=True,null=True)#Цель обращения
    term_of_service = models.TextField('Nomi',blank=True,null=True)#Срок получения услуги
    department_architecture = models.TextField('Nomi',blank=True,null=True)#Отдел (управление) по архитектуре и строительству
    eds = models.TextField('Nomi',blank=True,null=True)# ЭЦП заявителя
    user_notification = models.TextField('Nomi',blank=True,null=True)#Уведомление заявителя
    reject_reason = models.TextField('Nomi',blank=True,null=True)#Обоснование отказа
    upload_file_ijs = models.TextField('Nomi',blank=True,null=True)#Прикрепите согласованную проектно-сметную документацию ИЖС
    eds_gosorgan = models.TextField('Nomi',blank=True,null=True)#ЭЦП уполномоченного лица
    user_type_real = models.TextField('Nomi',blank=True,null=True)#Тип пользователя
    region= models.TextField('Регион',blank=True,null=True) #Регион
    region_real = models.TextField('Nomi',blank=True,null=True)#Регион
    district = models.TextField('Район',blank=True,null=True)#Район
    district_real = models.TextField('Nomi',blank=True,null=True)#Район
    design_estimate = models.TextField('Nomi',blank=True,null=True)#Проектно-сметная документация
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")


    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)


    def __str__(self):
        return self.object_adress
    
    class Meta:
        verbose_name="Loyiha-smeta hujjati"
        verbose_name_plural = "Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjatlari reestri"


    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.psd_ind=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Psd_ind, self).save(*args, **kwargs)

    def mysave(self, *args, **kwargs):
        super(Psd_ind, self).save(*args, **kwargs)


