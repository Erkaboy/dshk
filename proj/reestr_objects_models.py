from django.contrib.gis.db import models 
from datetime import datetime,date
from proj.reestr_add_models import Location_obj
class Perm_rec(models.Model):

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)


    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.TextField('Nomi',blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")

    term_service=models.TextField('Nomi',blank=True,null=True)#Срок получения услуги

#buyurtmachi
    user_type_real =models.TextField('Nomi',blank=True,null=True)#Тип пользователя
    legal_entity_tin =models.TextField('ИНН юридического лица',blank=True,null=True)#ИНН юридического лица
    passport_number =models.TextField('Серия и номер паспорта',blank=True,null=True)#Серия и номер паспорта
    tin =models.TextField('ИНН',blank=True,null=True)#ИНН


    number_cadastral_case =models.TextField('Nomi',blank=True,null=True)#Номер регистрации кадастрового дела
    date_cadastral_case =models.TextField('Nomi',blank=True,null=True)#Дата регистрации кадастрового дела
    type_activity_in =models.TextField('Nomi',blank=True,null=True)#Вид деятельности (для индивидуального предпринимателя)
    type_activity_in_real =models.TextField('Nomi',blank=True,null=True)#Вид деятельности (для индивидуального предпринимателя)
    
    settlement_account =models.TextField('Nomi',blank=True,null=True)#Расчетный счет
    name_bank =models.TextField('Nomi',blank=True,null=True)#Наименование обслуживающего банка
    
    type_activity =models.TextField('Nomi',blank=True,null=True)#Вид деятельности
    name_building =models.TextField('Наименование здания и сооружения',blank=True,null=True)#Наименование здания и сооружения
    building_location =models.TextField('Месторасположение здания и сооружения (индекс, адрес, ориентир)',blank=True,null=True)#Месторасположение здания и сооружения (индекс, адрес, ориентир)
    main_content_reprofiling=models.TextField('Nomi',blank=True,null=True) #Краткое содержание осуществляемого перепрофилирования и реконструкции объекта
    eds =models.TextField('Nomi',blank=True,null=True)# ЭЦП
    user_notification =models.TextField('Nomi',blank=True,null=True)#Уведомление заявителя
    reason_refusual =models.TextField('Nomi',blank=True,null=True)#Причина отказа
    permission_reg_number =models.TextField('Nomi',blank=True,null=True)#Регистрационный номер разрешения
    permission_reg_date =models.TextField('Nomi',blank=True,null=True)#Регистрационная дата разрешения
    additional_special_conditions =models.TextField('Nomi',blank=True,null=True)#Дополнительные особые условия
    object_area =models.TextField('Nomi',blank=True,null=True)#Площадь объекта
    select_region =models.TextField('Nomi',blank=True,null=True)#Select Region
    eds_gos_cad =models.TextField('Nomi',blank=True,null=True)#ЭЦП Уполномоченного лица (Кадастр)
    legal_eds =models.TextField('Nomi',blank=True,null=True)#ЭЦП Уполномоченного лица
    acceptance =models.TextField('Nomi',blank=True,null=True)#"Копия плана стен, разреза (при наличии), фасада и кадастрового паспорта зданий и сооружений
    reject_file=models.TextField('Nomi',blank=True,null=True) #Файл отказа
    district =models.TextField('Район',blank=True,null=True)#Район
    district_real=models.TextField('Nomi',blank=True,null=True) #Район
    responsible_person_arch=models.TextField('Nomi',blank=True,null=True)  #ФИО и инициалы уполномоченного лица
    responsible_person_cadastr=models.TextField('Nomi',blank=True,null=True) #ФИО и инициалы уполномоченного лица
    scanfile =models.TextField('Nomi',blank=True,null=True)#Прикрепите скан разрешения
    payment =models.TextField('Nomi',blank=True,null=True)#Payment
    department_architecture=models.TextField('Nomi',blank=True,null=True) #Отдел (управление) по архитектуре и строительству            
    authorized_position=models.TextField('Nomi',blank=True,null=True) #Authorized Position
    fio_authorized_person =models.TextField('Nomi',blank=True,null=True)#Fio Authorized Person
    permission_type=models.TextField('Nomi',blank=True,null=True) #Permission Type
    permission_type_real=models.TextField('Nomi',blank=True,null=True) #Permission Type
    location_building_structure_gos=models.TextField('Nomi',blank=True,null=True)#Location Building Structure Gos
    legal_name_fio_ind_gos=models.TextField('Nomi',blank=True,null=True) #Legal Name Fio Ind Gos
    notice=models.TextField('Nomi',blank=True,null=True) #Notice


    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)

    def __str__(self):
        return self.name_building
    class Meta:
        verbose_name="Ixtisoslashtirish va rekonstruktsiya qilish"
        verbose_name_plural = "Obyektni qayta ixtisoslashtirish va rekonstruktsiya qilish reestri"


    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.perm_rec=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Perm_rec, self).save(*args, **kwargs)

    def mysave(self, *args, **kwargs):
        super(Perm_rec, self).save(*args, **kwargs)

class Smr(models.Model):

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)

    
    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.TextField('Nomi',blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")
 
    number_date_protocol =models.TextField('Nomi',blank=True,null=True)#Номер и дата протокола архитектурно-градостроительного совета
    formed_publicoff=models.TextField('Nomi',blank=True,null=True) #Прикрепите сформированную публичную оферту
    reject_reason =models.TextField('Nomi',blank=True,null=True)#Причина отказа
    notice =models.TextField('Nomi',blank=True,null=True)#Уведомление о принятии заявления на рассмотрение
    parallel_designobjc=models.TextField('Nomi',blank=True,null=True) #Для объектов параллельного проектирования (№ и дата правительственного постановления, протокола, указа, решения)
    numdate_protocol=models.TextField('Nomi',blank=True,null=True) #Номер и дата заключения (протокола) Главного Управления Строительства
    cost =models.TextField('Nomi',blank=True,null=True)#Стоимость строительно-монтажных работ: согласно Сводному экспертному заключению (без НДС, оборудования и прочих затрат заказчика)
    construction_works=models.TextField('Nomi',blank=True,null=True)  #Вид строительно-монтажных работ
    amount_apartments =models.TextField('Nomi',blank=True,null=True)#Количество квартир
    amount_houses =models.TextField('Nomi',blank=True,null=True)#Количество домов (блоки)
    total_livingarea =models.TextField('Nomi',blank=True,null=True)#Общая жилая площадь квартир (кв.м)
    total_area=models.TextField('Nomi',blank=True,null=True) #Общая площадь (кв.м)
    description =models.TextField('Nomi',blank=True,null=True)#Description
    attic_mansard =models.TextField('Nomi',blank=True,null=True)  #Наличие чердака или мансарды         
    basement_techunderground=models.TextField('Nomi',blank=True,null=True) #Наличие подвала или технического подполья
    construction_volume=models.TextField('Nomi',blank=True,null=True) #Объем строительства здания (куб.м)
    floors=models.TextField('Nomi',blank=True,null=True) #Этажность
    info_supervisory =models.TextField('Nomi',blank=True,null=True)#Информация о надзорных органах и ответственных лиц
    eds =models.TextField('Nomi',blank=True,null=True)#ЭЦП (заявителя)
    district_id =models.TextField('Район (город)',blank=True,null=True)#Район (город)
    district_id_real =models.TextField('Nomi',blank=True,null=True)#Район (город)
    region_id =models.TextField('Регион',blank=True,null=True)#Регион
    region_id_real =models.TextField('Nomi',blank=True,null=True)#Регион
    nmdate_posconc =models.TextField('Nomi',blank=True,null=True)# Номер и дата положительного заключения органов экспертизы о промышленной безопасности проектной документации – для опасных производственных объектов      
    nmdate_licontr =models.TextField('Nomi',blank=True,null=True)#Номер и дата лицензии подрядной организации – при осуществлении отдельных лицензируемых видов строительно-монтажных работ
    nmdate_posopin =models.TextField('Nomi',blank=True,null=True)#Номер и дата положительного заключения
    name_expertise =models.TextField('Nomi',blank=True,null=True)#Наименование органа экспертизы
    settlement_account =models.TextField('Nomi',blank=True,null=True)#Расчетный счет
    location_building =models.TextField('Месторасположение объекта (индекс, адрес, ориентир)',blank=True,null=True)#Месторасположение объекта (индекс, адрес, ориентир)
    name_building =models.TextField('Наименование объекта',blank=True,null=True)#Наименование объекта
    category_object =models.TextField('Nomi',blank=True,null=True)#Категория сложности объекта
    legal_opf =models.TextField('Nomi',blank=True,null=True)#Организационно-правовая форма
    legal_opf_real =models.TextField('Nomi',blank=True,null=True)#Организационно-правовая форма
    tin=models.CharField('INN',max_length=200,blank=True,null=True) #INN
    passport_number =models.TextField('Серия и номер паспорта',blank=True,null=True)#Серия и номер паспорта
    user_type_real =models.TextField('Nomi',blank=True,null=True)#Тип пользователя
    legal_entity_tin =models.TextField('ИНН юридического лица',blank=True,null=True)#ИНН юридического лица
    objects_stateprog =models.TextField('Nomi',blank=True,null=True)#Для объектов государственной программы (№ и дата правительственного постановления, протокола, указа, решения)
    deskript =models.TextField('Nomi',blank=True,null=True)#Descript
    requisites =models.TextField('Nomi',blank=True,null=True)#Реквизиты Инспекции
    amount =models.TextField('Nomi',blank=True,null=True)#Сумма за осуществление надзорных функций за качеством и полнотой выполнения строительно-монтажных работ
    comments =models.TextField('Nomi',blank=True,null=True)# Комментария     
  
          
       

    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)


    def __str__(self):
        return self.name_building
    class Meta:
        verbose_name="Qurilish-montaj ishlari"
        verbose_name_plural = "Qurilish-montaj ishlarini amalga oshirish reestri"


    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.smr=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Smr, self).save(*args, **kwargs)

    def mysave(self, *args, **kwargs):
        super(Smr, self).save(*args, **kwargs)




class Pexpl(models.Model): 

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)


    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.TextField('Nomi',blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")

    district_id=models.TextField('Район (город)',blank=True,null=True) #Район (город)
    district_id_real=models.TextField('Nomi',blank=True,null=True) #Район (город)
    region_id =models.TextField('Регион',blank=True,null=True)#Регион
    region_id_real=models.TextField('Nomi',blank=True,null=True) #Регион
    type_building_structure =models.TextField('Nomi',blank=True,null=True)#Тип здания или сооружения
    type_building_structure_real =models.TextField('Nomi',blank=True,null=True)#Тип здания или сооружения
    user_ds_gov =models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку
    responsible_person_rejected =models.TextField('Nomi',blank=True,null=True) #Ответственное лицо  
    responsible_person =models.TextField('Nomi',blank=True,null=True)#Ответственное лицо
    contract_file =models.TextField('Nomi',blank=True,null=True)# Согласование 
    reject_reason =models.TextField('Nomi',blank=True,null=True)#Причина отказа
    acception_consideration =models.TextField('Nomi',blank=True,null=True)#Уведомление пользователю
    
    tin_contractor_org =models.TextField('ИНН подрядной организации (при наличии)',blank=True,null=True)#ИНН подрядной организации (при наличии)

    tin_project_org =models.TextField('ИНН проектной организации  ',blank=True,null=True)#ИНН проектной организации           

    number_date_resignation_district_hokim =models.TextField('Nomi',blank=True,null=True)#Номер и дата решения хокима района (города) об отводе земельного участка (при первоначальном строительстве)
    buildings_location =models.TextField('Месторасположение здания и сооружения (индекс, адрес, ориентир)',blank=True,null=True)#Месторасположение здания и сооружения (индекс, адрес, ориентир)
    buildings_name =models.TextField('Наименование здания и сооружения',blank=True,null=True)#Наименование здания и сооружения           
    user_ds =models.TextField('Nomi',blank=True,null=True)#ЭЦП заявителя
    kopf=models.TextField('Nomi',blank=True,null=True) #Организационно-правовая форма
    kopf_real =models.TextField('Nomi',blank=True,null=True)#Организационно-правовая форма
    
    tin  =models.TextField('ИНН ',blank=True,null=True)#ИНН       
    passport_number =models.TextField('Серия и номер паспорта',blank=True,null=True)#Серия и номер паспорта
    user_type_real =models.TextField('Nomi',blank=True,null=True)#Тип пользователя
    legal_entity_tin =models.TextField('ИНН юридического лица',blank=True,null=True)#ИНН юридического лица
    
    user_ds_gov_architectura=models.TextField('Nomi',blank=True,null=True) # ЭЦП ответственного на заявку (архитектура)       
    user_ds_gov_gasn=models.TextField('Nomi',blank=True,null=True) #ЭЦП ответственного на заявку (гасн)         
    user_ds_gov_sanitation =models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку (санитария)
    user_ds_gov_firefighters=models.TextField('Nomi',blank=True,null=True) #ЭЦП ответственного на заявку (пожарные)
    doc_architectura =models.TextField('Nomi',blank=True,null=True) #Заключение отдела строительства     
    doc_gasn=models.TextField('Nomi',blank=True,null=True)  #Документ (гасн)   
    doc_sanitation=models.TextField('Nomi',blank=True,null=True) #Документ (санитария)
    doc_firefighters =models.TextField('Nomi',blank=True,null=True)#Документ (пожарные)
    act_doc =models.TextField('Nomi',blank=True,null=True) #Приложение к акту (Подробная информация о технической характеристике объекта а также, генеральный план земельного участка)      
    name_owner_real_estate=models.TextField('Nomi',blank=True,null=True) #Название владельца (пользователя) недвижимимости
    inn_owner_real_estate=models.TextField('Nomi',blank=True,null=True) #ИНН владельца (пользователя) недвижимимости
    property_location=models.TextField('Nomi',blank=True,null=True) #Месторасположение недвижимости
    cadastral_number=models.TextField('Nomi',blank=True,null=True) #Кадастровый номер
    plot_area_according_legal_document =models.TextField('Nomi',blank=True,null=True)#Площадь земельного участка по правовому документу
    legal_documents_real_estate =models.TextField('Nomi',blank=True,null=True)#Правовые документы недвижимости
    basic_documentation_construction=models.TextField('Nomi',blank=True,null=True) #Основательная документация в строительстве
    name_building_according_project_documentation=models.TextField('Nomi',blank=True,null=True) #Название здания(сооружения) по проектной документации
    number_main_buildingsaa =models.TextField('Nomi',blank=True,null=True)#Количество основных зданий
    number_additional_buildingsas=models.TextField('Nomi',blank=True,null=True) #Количество дополнительных зданий (сооружений)
    total_areaad =models.TextField('Nomi',blank=True,null=True)# Общая площадь
    living_areaaf =models.TextField('Nomi',blank=True,null=True)#  Жилая площадь
    number_living_roomsag =models.TextField('Nomi',blank=True,null=True)# Количество жилых комнат
    info_about_floors_reconstructed_buildingsh =models.TextField('Nomi',blank=True,null=True)#Характеристика здания.
    number_main_buildingssa =models.TextField('Nomi',blank=True,null=True)#Количество основных зданий.
    number_additional_buildingsss =models.TextField('Nomi',blank=True,null=True)#Количество дополнительных зданий (сооружений).
    total_areasd =models.TextField('Nomi',blank=True,null=True)# Общая площадь.
    living_areasf =models.TextField('Nomi',blank=True,null=True)#Жилая площадь.
    number_living_roomssg =models.TextField('Nomi',blank=True,null=True)#Количество жилых комнат.
    following_engineering_networks_connected_livingsj =models.TextField('Nomi',blank=True,null=True)#В жилом помещении подключены следующие инженерно-коммуникационные сети.
    date_beginning_constructionsk =models.TextField('Nomi',blank=True,null=True)#Дата начала стройки.
    date_completion_constructionsl =models.TextField('Nomi',blank=True,null=True)#Дата окончания стройки.
    end_construction_work_building_percentsz=models.TextField('Nomi',blank=True,null=True) #Окончание строительных работ здания (сооружения) в процентах.
    end_construction_work_building_percentsz_real =models.TextField('Nomi',blank=True,null=True)#Окончание строительных работ здания (сооружения) в процентах.
    legal_documents_land_plot =models.TextField('Nomi',blank=True,null=True)#Правовые документы земельного участка
    legal_documents_building =models.TextField('Nomi',blank=True,null=True)#Правовые документы здания (сооружения)
    number_constructionsad =models.TextField('Nomi',blank=True,null=True)#Количество сооружений
    cadastral_amountaf =models.TextField('Nomi',blank=True,null=True)#Кадастровая сумма
    effective_areaah =models.TextField('Nomi',blank=True,null=True)# Полезная площадь   
    volume_buildingaj =models.TextField('Nomi',blank=True,null=True)#Объем здания (сооружения)        
    info_about_floors_reconstructedak =models.TextField('Nomi',blank=True,null=True)#   Сведения об этажах и реконструируемой части  
    number_buildingsa =models.TextField('Nomi',blank=True,null=True)#Количество зданий           
    number_parts_buildingsss =models.TextField('Nomi',blank=True,null=True)#Количество части зданий.
    number_structuressd =models.TextField('Nomi',blank=True,null=True)#Количество сооружений.
    usable_areasg =models.TextField('Nomi', blank=True,null=True)#Полезная площадь.
    volume_buildingsh =models.TextField('Nomi',blank=True,null=True)#Объем здания (сооружения).
    following_engineering_networks_connected_buildingsk =models.TextField('Nomi',blank=True,null=True)#В здании (сооружении) подключены следующие инженерно-коммуникационные сети.           
    info_about_floors_reconstructed_buildingaj=models.TextField('Nomi',blank=True,null=True)#Характеристика здания
    number_parts_buildingsaa =models.TextField('Nomi',blank=True,null=True)#Количество части зданий
    number_buildingsaab  =models.TextField('Nomi',blank=True,null=True)#Количество зданий
    registration_number_act =models.TextField('Nomi',blank=True,null=True)#Регистрационный номер акта
    registration_act_date =models.TextField('Nomi',blank=True,null=True)#Регистрационная дата акта
    city_area =models.TextField('Nomi',blank=True,null=True)#Город/район
    name_organizer=models.TextField('Nomi',blank=True,null=True) #Название проектной организации
    name_executing_organization =models.TextField('Nomi',blank=True,null=True)#Название подрядной организации
    head_construction_department =models.TextField('Nomi',blank=True,null=True) #Ф.И.О руководителя отдела по строительству
    name_department_construction =models.TextField('Nomi',blank=True,null=True)#Название отдела по строительству
    name_head_cadastre_branch =models.TextField('Nomi',blank=True,null=True)# Ф.И.О руководителя филиала по кадастру 
    name_branch_cadastre =models.TextField('Nomi',blank=True,null=True)#  Город\\район филиала по кадастру        
    conclusion_act =models.TextField('Nomi',blank=True,null=True)# Заключение к акту 
    meet_requirements_standards =models.TextField('Nomi',blank=True,null=True)# Соответствует ли требованиям и нормам?   
    meet_requirements_standards_real=models.TextField('Nomi',blank=True,null=True) # Соответствует ли требованиям и нормам?   
    authorized_person_sanitary=models.TextField('Nomi',blank=True,null=True) #Укажите территорию (города  или района) центра санитарии
    doctor_sanitary_epidemiological =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. врача районного (городского) санитарно-эпидемиологического надзора
    post_authorized_person_gasn =models.TextField('Nomi',blank=True,null=True)#  Укажите территорию (Республика Каракалпакстан, область или г. Ташкент) инспекции ГАСН      
    head_inspections_architectural_supervision =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. руководителя территориальной инспекции Государственного архитектурно-строительного надзора
    authorized_person_fireman =models.TextField('Nomi',blank=True,null=True)#Город/район отдела по пожарному безопасности     
    head_fire_safety_department =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. начальника отдела по пожарному безопасности
    authorized_person_architecture =models.TextField('Nomi',blank=True,null=True)#Город район отдела строительства
    head_district_construction_department =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. начальника районного (городского) отдела строительства
    meet_requirements_standardsss =models.TextField('Nomi',blank=True,null=True)# Соответствует ли требованиям и нормам? 
    meet_requirements_standardsss_real =models.TextField('Nomi',blank=True,null=True)# Соответствует ли требованиям и нормам?          
    meet_requirements_standardsbb=models.TextField('Nomi',blank=True,null=True)#Соответствует ли требованиям и нормам? 
    meet_requirements_standardsbb_real =models.TextField('Nomi',blank=True,null=True) #Соответствует ли требованиям и нормам?       
    meet_requirements_standardsaa=models.TextField('Nomi',blank=True,null=True)#Соответствует ли требованиям и нормам?   
    meet_requirements_standardsaa_real =models.TextField('Nomi',blank=True,null=True) #Соответствует ли требованиям и нормам?       
    after_acceptance_building_objects_which_construction_reconstruc =models.TextField('Nomi',blank=True,null=True)#   Полное право собственности на земельный участок , сдачи в эксплуатацию завершенных зданий и сооружений после строительства (реконструкции), (или других имущественных прав), структура зданий и сооружений должна включать следующее
    info_buildings_facilities_accepted_operation =models.TextField('Nomi',blank=True,null=True)#Сведения о зданиях или объектах, принимаемые в эксплуатацию       
    user_ds_gov_reject =models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку
    name_head_cadastre_branch_reject =models.TextField('Nomi',blank=True,null=True)#Ф.И.О руководителя филиала по кадастру
    name_branch_cadastre_reject=models.TextField('Nomi',blank=True,null=True) #   Город район филиала по кадастру         
    conclusion_act_reject =models.TextField('Nomi',blank=True,null=True)#Заключение к акту
    cause_ss=models.TextField('Nomi',blank=True,null=True) # Причина
    cause_bb=models.TextField('Nomi',blank=True,null=True)   #Причина 
    cause_aa=models.TextField('Nomi',blank=True,null=True)  #Причина
    cause=models.TextField('Nomi',blank=True,null=True) #Причина
    extract_register_real_estate =models.TextField('Nomi',blank=True,null=True)#Выписка из госреестра о  регистрации права на объект недвижимости
    volume_building_structure =models.TextField('Nomi',blank=True,null=True)#Объем здания (сооружения)
    death_certificate =models.TextField('Nomi',blank=True,null=True)#Death Certificate
    death_owner_check =models.TextField('Nomi',blank=True,null=True)# Death Owner Check

    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)


    def __str__(self):
        return self.buildings_name
    class Meta:
        verbose_name="Bino va inshootni foydalanishga qabul qilish"
        verbose_name_plural = "Turar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilishi reestri"


    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.pexpl=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Pexpl, self).save(*args, **kwargs)

    def mysave(self, *args, **kwargs):
        super(Pexpl, self).save(*args, **kwargs)
         
    

class Pexpl_ind(models.Model):  

    our_id=models.CharField('Idintifikarot',max_length=200,blank=True,null=True)


    task_id=models.IntegerField(blank=True, null=True)
    operator_org=models.TextField('Nomi',blank=True,null=True)#operator
    
    obj_id = models.IntegerField(blank=True, null=True)
    authority_id= models.IntegerField(blank=True, null=True) #Authority ID int
    date=models.DateField(auto_now=False,auto_now_add=False,blank=True,default=datetime.today, verbose_name="Sana")

    district_id=models.TextField('Район (город)',blank=True,null=True) #Район (город)
    district_id_real=models.TextField('Nomi',blank=True,null=True) #Район (город)
    region_id =models.TextField('Регион',blank=True,null=True)#Регион
    region_id_real=models.TextField('Nomi',blank=True,null=True) #Регион
    type_building_structure =models.TextField('Nomi',blank=True,null=True)#Тип здания или сооружения
    type_building_structure_real =models.TextField('Nomi',blank=True,null=True)#Тип здания или сооружения
    user_ds_gov =models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку
    responsible_person_rejected =models.TextField('Nomi',blank=True,null=True) #Ответственное лицо  
    responsible_person =models.TextField('Nomi',blank=True,null=True)#Ответственное лицо
    contract_file =models.TextField('Nomi',blank=True,null=True)# Согласование 
    reject_reason =models.TextField('Nomi',blank=True,null=True)#Причина отказа
    acception_consideration =models.TextField('Nomi',blank=True,null=True)#Уведомление пользователю

    tin_contractor_org =models.TextField('ИНН подрядной организации (при наличии)',blank=True,null=True)#ИНН подрядной организации (при наличии)
    tin_project_org =models.TextField('ИНН проектной организации ',blank=True,null=True)#ИНН проектной организации           

    number_date_resignation_district_hokim =models.TextField('Nomi',blank=True,null=True)#Номер и дата решения хокима района (города) об отводе земельного участка (при первоначальном строительстве)
    buildings_location =models.TextField('#Месторасположение здания и сооружения (индекс, адрес, ориентир)',blank=True,null=True)#Месторасположение здания и сооружения (индекс, адрес, ориентир)
    buildings_name =models.TextField('Наименование здания и сооружения  ',blank=True,null=True)#         
    user_ds =models.TextField('Nomi',blank=True,null=True)#ЭЦП заявителя
    kopf=models.TextField('Nomi',blank=True,null=True) #Организационно-правовая форма
    kopf_real =models.TextField('Nomi',blank=True,null=True)#Организационно-правовая форма
    
    tin  =models.TextField('ИНН',blank=True,null=True)#ИНН       
    passport_number =models.TextField('Серия и номер паспорта',blank=True,null=True)#Серия и номер паспорта
    user_type_real =models.TextField('Nomi',blank=True,null=True)#Тип пользователя
    legal_entity_tin =models.TextField('ИНН юридического лица',blank=True,null=True)#ИНН юридического лица
   
    user_ds_gov_architectura=models.TextField('Nomi',blank=True,null=True) # ЭЦП ответственного на заявку (архитектура)       
    user_ds_gov_gasn=models.TextField('Nomi',blank=True,null=True) #ЭЦП ответственного на заявку (гасн)         
    user_ds_gov_sanitation =models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку (санитария)
    user_ds_gov_firefighters=models.TextField('Nomi',blank=True,null=True) #ЭЦП ответственного на заявку (пожарные)
    doc_architectura =models.TextField('Nomi',blank=True,null=True) #Заключение отдела строительства     
    doc_gasn=models.TextField('Nomi',blank=True,null=True)  #Документ (гасн)   
    doc_sanitation=models.TextField('Nomi',blank=True,null=True) #Документ (санитария)
    doc_firefighters =models.TextField('Nomi',blank=True,null=True)#Документ (пожарные)
    act_doc =models.TextField('Nomi',blank=True,null=True) #Приложение к акту (Подробная информация о технической характеристике объекта а также, генеральный план земельного участка)      
    name_owner_real_estate=models.TextField('Nomi',blank=True,null=True) #Название владельца (пользователя) недвижимимости
    inn_owner_real_estate=models.TextField('Nomi',blank=True,null=True) #ИНН владельца (пользователя) недвижимимости
    property_location=models.TextField('Nomi',blank=True,null=True) #Месторасположение недвижимости
    cadastral_number=models.TextField('Nomi',blank=True,null=True) #Кадастровый номер
    plot_area_according_legal_document =models.TextField('Nomi',blank=True,null=True)#Площадь земельного участка по правовому документу
    legal_documents_real_estate =models.TextField('Nomi',blank=True,null=True)#Правовые документы недвижимости
    basic_documentation_construction=models.TextField('Nomi',blank=True,null=True)#Основательная документация в строительстве
    name_building_according_project_documentation=models.TextField('Nomi',blank=True,null=True) #Название здания(сооружения) по проектной документации
    number_main_buildingsaa =models.TextField('Nomi',blank=True,null=True)#Количество основных зданий
    number_additional_buildingsas=models.TextField('Nomi',blank=True,null=True) #Количество дополнительных зданий (сооружений)
    total_areaad =models.TextField('Nomi',blank=True,null=True)# Общая площадь
    living_areaaf =models.TextField('Nomi',blank=True,null=True)#  Жилая площадь
    number_living_roomsag =models.TextField('Nomi',blank=True,null=True)# Количество жилых комнат
    info_about_floors_reconstructed_buildingsh =models.TextField('Nomi',blank=True,null=True)#Характеристика здания.
    number_main_buildingssa =models.TextField('Nomi',blank=True,null=True)#Количество основных зданий.
    number_additional_buildingsss =models.TextField('Nomi',blank=True,null=True)#Количество дополнительных зданий (сооружений).
    total_areasd =models.TextField('Nomi',blank=True,null=True)# Общая площадь.
    living_areasf =models.TextField('Nomi',blank=True,null=True)#Жилая площадь.
    number_living_roomssg =models.TextField('Nomi',blank=True,null=True)#Количество жилых комнат.
    following_engineering_networks_connected_livingsj =models.TextField('Nomi',blank=True,null=True)#В жилом помещении подключены следующие инженерно-коммуникационные сети.
    date_beginning_constructionsk =models.TextField('Nomi',blank=True,null=True)#Дата начала стройки.
    date_completion_constructionsl =models.TextField('Nomi',blank=True,null=True)#Дата окончания стройки.
    end_construction_work_building_percentsz=models.TextField('Nomi',blank=True,null=True) #Окончание строительных работ здания (сооружения) в процентах.
    end_construction_work_building_percentsz_real =models.TextField('Nomi',blank=True,null=True)#Окончание строительных работ здания (сооружения) в процентах.
    legal_documents_land_plot =models.TextField('Nomi',blank=True,null=True)#Правовые документы земельного участка
    legal_documents_building =models.TextField('Nomi',blank=True,null=True)#Правовые документы здания (сооружения)
    number_constructionsad =models.TextField('Nomi',blank=True,null=True)#Количество сооружений
    cadastral_amountaf =models.TextField('Nomi',blank=True,null=True)#Кадастровая сумма
    effective_areaah =models.TextField('Nomi',blank=True,null=True)# Полезная площадь   
    volume_buildingaj =models.TextField('Nomi',blank=True,null=True)#Объем здания (сооружения)        
    info_about_floors_reconstructedak =models.TextField('Nomi',blank=True,null=True)#   Сведения об этажах и реконструируемой части  
    number_buildingsa =models.TextField('Nomi',blank=True,null=True)#Количество зданий           
    number_parts_buildingsss =models.TextField('Nomi',blank=True,null=True)#Количество части зданий.
    number_structuressd =models.TextField('Nomi',blank=True,null=True)#Количество сооружений.
    usable_areasg =models.TextField('Nomi',blank=True,null=True)#Полезная площадь.
    volume_buildingsh =models.TextField('Nomi',blank=True,null=True)#Объем здания (сооружения).
    following_engineering_networks_connected_buildingsk =models.TextField('Nomi',blank=True,null=True)#В здании (сооружении) подключены следующие инженерно-коммуникационные сети.           
    info_about_floors_reconstructed_buildingaj=models.TextField('Nomi',blank=True,null=True)#Характеристика здания
    number_parts_buildingsaa =models.TextField('Nomi',blank=True,null=True)#Количество части зданий
    number_buildingsaab  =models.TextField('Nomi',blank=True,null=True)#Количество зданий
    registration_number_act =models.TextField('Nomi',blank=True,null=True)#Регистрационный номер акта
    registration_act_date =models.TextField('Nomi',blank=True,null=True)#Регистрационная дата акта
    head_construction_department =models.TextField('Nomi',blank=True,null=True) #Ф.И.О руководителя отдела по строительству
    name_department_construction =models.TextField('Nomi',blank=True,null=True)#Название отдела по строительству
    name_head_cadastre_branch =models.TextField('Nomi',blank=True,null=True)# Ф.И.О руководителя филиала по кадастру 
    name_branch_cadastre =models.TextField('Nomi',blank=True,null=True)#  Город\\район филиала по кадастру        
    conclusion_act =models.TextField('Nomi',blank=True,null=True)# Заключение к акту 
    meet_requirements_standards =models.TextField('Nomi',blank=True,null=True)# Соответствует ли требованиям и нормам?   
    meet_requirements_standards_real=models.TextField('Nomi',blank=True,null=True) # Соответствует ли требованиям и нормам?   
    authorized_person_sanitary=models.TextField('Nomi',blank=True,null=True) #Укажите территорию (города  или района) центра санитарии
    doctor_sanitary_epidemiological =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. врача районного (городского) санитарно-эпидемиологического надзора
    post_authorized_person_gasn =models.TextField('Nomi',blank=True,null=True)#  Укажите территорию (Республика Каракалпакстан, область или г. Ташкент) инспекции ГАСН      
    head_inspections_architectural_supervision =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. руководителя территориальной инспекции Государственного архитектурно-строительного надзора
    authorized_person_fireman =models.TextField('Nomi',blank=True,null=True)#Город/район отдела по пожарному безопасности     
    head_fire_safety_department =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. начальника отдела по пожарному безопасности
    authorized_person_architecture =models.TextField('Nomi',blank=True,null=True)#Город район отдела строительства
    head_district_construction_department =models.TextField('Nomi',blank=True,null=True)#Ф.И.О. начальника районного (городского) отдела строительства
    meet_requirements_standardsss =models.TextField('Nomi',blank=True,null=True)# Соответствует ли требованиям и нормам? 
    meet_requirements_standardsss_real =models.TextField('Nomi',blank=True,null=True)# Соответствует ли требованиям и нормам?          
    meet_requirements_standardsbb=models.TextField('Nomi',blank=True,null=True)#Соответствует ли требованиям и нормам? 
    meet_requirements_standardsbb_real =models.TextField('Nomi',blank=True,null=True) #Соответствует ли требованиям и нормам?       
    meet_requirements_standardsaa=models.TextField('Nomi',blank=True,null=True)#Соответствует ли требованиям и нормам?   
    meet_requirements_standardsaa_real =models.TextField('Nomi',blank=True,null=True) #Соответствует ли требованиям и нормам?       
    after_acceptance_building_objects_which_construction_reconstruc =models.TextField('Nomi',blank=True,null=True)#   Полное право собственности на земельный участок , сдачи в эксплуатацию завершенных зданий и сооружений после строительства (реконструкции), (или других имущественных прав), структура зданий и сооружений должна включать следующее
    info_buildings_facilities_accepted_operation =models.TextField('Nomi',blank=True,null=True)#Сведения о зданиях или объектах, принимаемые в эксплуатацию       
    user_ds_gov_reject =models.TextField('Nomi',blank=True,null=True)#ЭЦП ответственного на заявку
    name_head_cadastre_branch_reject =models.TextField('Nomi',blank=True,null=True)#Ф.И.О руководителя филиала по кадастру
    name_branch_cadastre_reject=models.TextField('Nomi',blank=True,null=True) #   Город район филиала по кадастру         
    conclusion_act_reject =models.TextField('Nomi',blank=True,null=True)#Заключение к акту
    cause_ss=models.TextField('Nomi',blank=True,null=True) # Причина
    cause_bb=models.TextField('Nomi',blank=True,null=True)   #Причина 
    cause_aa=models.TextField('Nomi',blank=True,null=True) #Причина
    cause=models.TextField('Nomi',blank=True,null=True) #Причина
    extract_register_real_estate =models.TextField('Nomi',blank=True,null=True)#Выписка из госреестра о  регистрации права на объект недвижимости
    volume_building_structure =models.TextField('Nomi',blank=True,null=True)#Объем здания (сооружения)
    death_certificate =models.TextField('Nomi',blank=True,null=True)#Death Certificate
    death_owner_check =models.TextField('Nomi',blank=True,null=True)# Death Owner Check


    which_geo = models.CharField(verbose_name='Which Geo',default='0',max_length=10, blank=True,null=True)

    def __str__(self):
        return self.buildings_name
    class Meta:
        verbose_name="Noturar bino va inshootni foydalanishga qabul qilish"
        verbose_name_plural = "Noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilish reestri"


    def save(self, *args, **kwargs):

        if self.our_id!=None:
            data=Location_obj.objects.filter(our_id=self.our_id).first()
            if data:
                data.pexpl_ind=self.task_id
                
                self.which_geo=data.which_geo
                
                data.save()

        super(Pexpl_ind, self).save(*args, **kwargs)

    def mysave(self, *args, **kwargs):
        super(Pexpl_ind, self).save(*args, **kwargs)

    
    

