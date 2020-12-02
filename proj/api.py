from proj.reestr_projects_models import Apz,Psd,Psd_ind
from proj.reestr_objects_models import Perm_rec,Smr,Pexpl,Pexpl_ind
from proj.reestr_subjects_models import Buyurtmachi_fiz,Buyurtmachi_yur,Loyihalovchi,Quruvchi
import requests
from requests.auth import HTTPBasicAuth
import json 
from datetime import datetime,date,timedelta

from proj.reestr_add_models import Crontab_data


import requests

def telegram_bot_sendtext(bot_message):    
	try:
		bot_token = '1008081660:AAGrY_5oZiHR7IfqmcaJVRgtE5sTvu1CNRA'
		bot_chatID = '198935487'
		send_text = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message
		response = requests.get(send_text)
	except requests.exceptions.ConnectionError as e:
		print('Internetda uzulish (ichki)')


def run_api_apz(cron_type=True):

	if cron_type:
		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='apz'
		)

	data_cron=Crontab_data.objects.filter(service='apz').order_by('-date')

	for d in data_cron:
		try:
			url='https://my.gov.uz/development-architectural-planning-v2/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("apz-"+str(d.date))
			c=0
			for i in json.loads(data.content.decode('utf-8'))['data']:
				objid=i['id']
				print(objid)
	
				url='https://my.gov.uz/development-architectural-planning-v2/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['DevelopmentArchitecturalPlanning']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Apz.objects.filter(task_id=result2['id']).first()
				
				if not data_if:
					c=c+1

					if result['user_type']['real_value']=='I':

						if (result['tin']['value']).isnumeric():

							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['tin']['value'])).first()

							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									# passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value']
									# birthday=result['birthday']['value']
									)
						else:
							result['tin']['value']=0
					else:

						if (result['legal_entity_tin']['value']).isnumeric():

							data_b_if=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(result['legal_entity_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_yur.objects.create(
									legal_entity_phone_number = result['legal_entity_phone_number']['value'],
									legal_head_tin = result['legal_head_tin']['value'],
									# legal_head_name = result['legal_head_name']['value'],
									legal_entity_address = result['legal_entity_address']['value'],
									legal_entity_email = result['legal_entity_email']['value'],
									legal_entity_name =result['legal_entity_name']['value'],
									legal_entity_tin = result['legal_entity_tin']['value']
									)
						else:
							result['legal_entity_tin']['value']=0

					Apz.objects.create(

						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int					
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator

						user_type_real= result['user_type']['real_value'], #Тип пользователя    
						legal_entity_tin = result['legal_entity_tin']['value'],#ИНН юридического лица 
						tin= result['tin']['value'], #ИНН
						passport_number= result['passport_number']['value'], #Серия и номер паспорта

						term_service = result['term_service']['value'],#Срок получения услуги
						acception_consideration= result['acception_consideration']['value'], #Уведомление пользователю
						reject_reason = result['reject_reason']['value'],#Причина отказа
						settlement_account= result['settlement_account']['value'], #Утвержденный договор
						name_bank = result['name_bank']['value'],#Наименование обслуживающего банка
						name_building = result['name_building']['value'],#Наименование объекта
						location_building= result['location_building']['value'], #Месторасположение объекта (индекс, адрес, ориентир)
						requisites = result['requisites']['value'],#Реквизиты
						decision_state_authority = result['decision_state_authority']['value'],#Решение органа государственной власти на местах о предоставлении земельного участка для проектирования и строительства объекта, с приложением плана размещения земельного участка или акта выноса его границ в натуру
						decision_city_hokim = result['decision_city_hokim']['value'],#Решение хокима города (района) о переводе жилых помещений в категорию нежилых
						permissions_department = result['permissions_department']['value'],#Разрешение, соответственно, главного управления строительства г. Ташкента или отдела строительства района (города) на перепрофилирование и реконструкцию объекта.
						contract_cost= result['contract_cost']['value'], #Утвержденный договор и стоимость оплаты сбора
						apz= result['apz']['value'], #АПЗ
						purpose_construction_real= result['purpose_construction']['real_value'], #Цель проекта строительства или реконструкции
						region = result['region']['value'],#Регион
						district = result['district']['value'],#Район
						region_real = result['region']['real_value'],#Регион
						district_real = result['district']['real_value'],#Район
						file_water= result['file_water']['value'], #Технические условия (водоснабжения)
						file_light = result['file_light']['value'],#Технические условия (электрической энергии)
						file_gas = result['file_gas']['value'],#Технические условия (газ)
						authority_light = result['authority_light']['value'],#Региональный ЭСП
						district_file = result['district_file']['value'],#Район
						region_light = result['region_light']['value'],#Регион
						desired_water = result['desired_water']['value'],#Нужной водяной напряжение
						desired_water_real = result['desired_water']['real_value'],#Нужной водяной напряжение
						desired_gas = result['desired_gas']['value'],#Нужной газовый напряжение
						desired_gas_real = result['desired_gas']['real_value'],#Нужной газовый напряжение
						desired_electrical = result['desired_electrical']['value'],#Нужной электрический напряжение
						desired_electrical_real= result['desired_electrical']['real_value'], #Нужной электрический напряжение
						date=d.date
						)
					print("OK")
			Crontab_data.objects.filter(service='apz',date=d.date).delete()
			telegram_bot_sendtext(" ( -- apz -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- apz -- ) Sana : "+str(d.date))


def run_api_psd(cron_type=True):
	if cron_type:
	
		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='psd'
		)

	data_cron=Crontab_data.objects.filter(service='psd').order_by('-date')

	for d in data_cron:

		try:
			c=0
			url='https://my.gov.uz/approval-of-design-estimates-v1/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("psd-"+str(d.date))
			for i in json.loads(data.content.decode('utf-8'))['data']:
				objid=i['id']
				print(objid)
				url='https://my.gov.uz/approval-of-design-estimates-v1/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['ApprovalOfDesignEstimates']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Psd.objects.filter(task_id=result2['id']).first()

				if not data_if:
					c=c+1

					if result['user_type']['real_value']=='I':
						if (result['individual_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['individual_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['individual_tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value'],
									birthday=result['birthday']['value']
									)
						else:
							result['individual_tin']=0
					else:
						if (result['legal_entity_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(result['legal_entity_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_yur.objects.create(
									legal_entity_phone_number = result['legal_entity_phone_number']['value'],
									legal_head_tin = result['legal_head_tin']['value'],
									legal_head_name = result['legal_head_name']['value'],
									legal_entity_address = result['legal_entity_address']['value'],
									legal_entity_email = result['legal_entity_email']['value'],
									legal_entity_name =result['legal_entity_name']['value'],
									legal_entity_tin = result['legal_entity_tin']['value']
									)
						else:
							result['legal_entity_tin']['value']=0
					
					if (result['tin_project_org']['value']).isnumeric():
						data_l_if=Loyihalovchi.objects.filter(inn=str(result['tin_project_org']['value'])).first()
						if not data_l_if:
							Loyihalovchi.objects.create(
								contact = result['telephone_numb_project_org']['value']+' '+result['email_address_project_org']['value'],#Телефонный номер проектной организации
								adress= result['legal_address_project_organization']['value'], # Юридический адрес проектной организации
								inn= result['tin_project_org']['value'], #ИНН проектной организации
								nomi= result['name_project_organization']['value'] #Наименование проектной организации
								)
					else:
						result['tin_project_org']['value']=0
					Psd.objects.create(
						
						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int
 						
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator
						
						user_type_real = result['user_type']['real_value'],#Тип пользователя
						individual_tin = result['individual_tin']['value'],#ИНН
						legal_entity_tin = result['legal_entity_tin']['value'],#ИНН юридического лица
						passport_number = result['passport_number']['value'],#Серия и номер паспорта


						situation_plan_location_obj= result['situation_plan_location_obj']['value'],  #Ситуационный план размещения объекта
						general_plan_buildings_struct_other_obj= result['general_plan_buildings_struct_other_obj']['value'], #Генеральный план зданий, сооружений или другого объекта
						facades_main_side = result['facades_main_side']['value'],#Фасады (главные и боковые)
						requisites_architectural_planning_assignment= result['requisites_architectural_planning_assignment']['value'], #Реквизиты архитектурно-планировочного задания
						
						tin_project_org= result['tin_project_org']['value'], #ИНН проектной организации
						
						name_design_estimates= result['name_design_estimates']['value'], #Наименование проектно-сметной документации
						user_ds = result['user_ds']['value'],#ЭЦП заявителя
						doc_architectura = result['doc_architectura']['value'],#Документ (Согласования)
						region_id = result['region_id']['value'],# Регион
						region_id_real = result['region_id']['real_value'],# Регион
						user_ds_gov = result['user_ds_gov']['value'],#ЭЦП ответственного на заявку
						responsible_person_rejected = result['responsible_person_rejected']['value'],# Ответственное лицо
						responsible_person = result['responsible_person']['value'],#Ответственное лицо
						reject_reason = result['reject_reason']['value'],#Причина отказа
						acception_consideration = result['acception_consideration']['value'],#Уведомление пользователю
						district_id = result['district_id']['value'],# Район
						district_id_real = result['district_id']['real_value'],# Район
						file_main = result['file_main']['value'],#Проектно-сметная документация
						date=d.date
						)
					print("OK")
			Crontab_data.objects.filter(service='psd',date=d.date).delete()
			telegram_bot_sendtext(" ( -- psd -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- psd -- ) Sana : "+str(d.date))

def run_api_psd_ind(cron_type=True):
	if cron_type:

		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='psd_ind'
		)

	data_cron=Crontab_data.objects.filter(service='psd_ind').order_by('-date')

	for d in data_cron:		
		try:
			c=0
			url='https://my.gov.uz/permission-house-construction-v1/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("psd_ind-"+str(d.date))
			for i in json.loads(data.content.decode('utf-8'))['data']:
				objid=i['id']
				print(objid)
			
				url='https://my.gov.uz/permission-house-construction-v1/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))

				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['PermissionHouseConstruction']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Psd_ind.objects.filter(task_id=result2['id']).first()

				if not data_if:
					c=c+1

					if result['user_type']['real_value']=='I':
						if (result['tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									# passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value']
									# birthday=result['birthday']['value']
									)
						else:
							result['tin']['value']=0

					Psd_ind.objects.create(
 						
						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int
						
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator

						financial_calculation= result['financial_calculation']['value'], #Сметно-финансовый расчет (при получении кредита)
						ownership_documents = result['ownership_documents']['value'],#Документы, удостоверяющие право собственности на индивидуальный жилой дом
						technical_conclusion= result['technical_conclusion']['value'], #Техническое заключение (при необходимости)
						
						user_type_real = result['user_type']['real_value'],#Тип пользователя
						passport_number= result['passport_number']['value'], #Серия и номер паспорта
						tin = result['tin']['value'],#ИНН

						number_certificate_land = result['number_certificate_land']['value'],#Номер и дата свидетельства о государственной регистрации прав  на земельные участки (при строительстве жилого дома)
						date_certificate_land = result['date_certificate_land']['value'],#Номер и дата регистрации кадастрового дела (при реконструкции)
						object_name = result['object_name']['value'],#Наименование объекта
						object_adress = result['object_adress']['value'],#Месторасположение объекта (индекс, адрес, ориентир)
						plan_land_plot = result['plan_land_plot']['value'],#проект плана земельного участка, с отображением надземных и подземных инженерных коммуникаций
						foundation_plan = result['foundation_plan']['value'],#План фундаментов, подвалов, этажей, разрезов и фасадов индивидуального жилого дома
						construction_apartment = result['construction_apartment']['value'],#Cтроительство жилого дома
						house_reconstruction = result['house_reconstruction']['value'],#Реконструкция жилья
						treatment_purpose = result['treatment_purpose']['value'],#Цель обращения
						term_of_service = result['term_of_service']['value'],#Срок получения услуги
						department_architecture = result['department_architecture']['value'],#Отдел (управление) по архитектуре и строительству
						eds = result['eds']['value'],# ЭЦП заявителя
						user_notification = result['user_notification']['value'],#Уведомление заявителя
						reject_reason = result['reject_reason']['value'],#Обоснование отказа
						upload_file_ijs = result['upload_file_ijs']['value'],#Прикрепите согласованную проектно-сметную документацию ИЖС
						eds_gosorgan = result['eds_gosorgan']['value'],#ЭЦП уполномоченного лица
						region= result['region']['value'], #Регион
						region_real = result['region']['real_value'],#Регион
						district = result['district']['value'],#Район
						district_real = result['district']['real_value'],#Район
						design_estimate = result['design_estimate']['value'],#Проектно-сметная документация
						date=d.date

						)
					print("OK")
			Crontab_data.objects.filter(service='psd_ind',date=d.date).delete()
			telegram_bot_sendtext(" ( -- psd-ind -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- psd ind -- ) Sana : "+str(d.date))


def run_api_perm_rec(cron_type=True):
	if cron_type:
		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='perm_rec'
		)

	data_cron=Crontab_data.objects.filter(service='perm_rec').order_by('-date')

	for d in data_cron:	
		try:
			c=0
			url='https://my.gov.uz/permission-reconstruction-object-v1/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("perm_rec-"+str(d.date))
			for i in json.loads(data.content.decode('utf-8'))['data']:
				objid=i['id']
				print(objid)
			
				url='https://my.gov.uz/permission-reconstruction-object-v1/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
				
				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['PermissionReconstructionObject']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Perm_rec.objects.filter(task_id=result2['id']).first()
				
				if not data_if:
					c=c+1

					if result['user_type']['real_value']=='I':
						if (result['tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['tin']['value'])).first()

							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value'],
									birthday=result['birthday']['value']
									)
						else:
							result['tin']['value']=0
					else:
						if (result['legal_entity_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(result['legal_entity_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_yur.objects.create(
									legal_entity_phone_number = result['legal_entity_phone_number']['value'],
									legal_head_tin = result['legal_head_tin']['value'],
									legal_head_name = result['legal_head_name']['value'],
									legal_entity_address = result['legal_entity_address']['value'],
									legal_entity_email = result['legal_entity_email']['value'],
									legal_entity_name =result['legal_entity_name']['value'],
									legal_entity_tin = result['legal_entity_tin']['value']
									)
						else:
							result['legal_entity_tin']['value']=0

					Perm_rec.objects.create(
						
						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int
						
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator

						term_service=result['term_service']['value'],#Срок получения услуги
					   
					    legal_entity_tin =result['legal_entity_tin']['value'],#ИНН юридического лица
					    user_type_real=result['user_type']['real_value'], #Тип пользователя
					    passport_number =result['passport_number']['value'],#Серия и номер паспорта
					    tin =result['tin']['value'],#ИНН
					   
					    number_cadastral_case =result['number_cadastral_case']['value'],#Номер регистрации кадастрового дела
					    date_cadastral_case =result['date_cadastral_case']['value'],#Дата регистрации кадастрового дела
					    type_activity_in =result['type_activity_in']['value'],#Вид деятельности (для индивидуального предпринимателя)
					    type_activity_in_real =result['type_activity_in']['real_value'],#Вид деятельности (для индивидуального предпринимателя)

					    settlement_account =result['settlement_account']['value'],#Расчетный счет
					    name_bank =result['name_bank']['value'],#Наименование обслуживающего банка
					    type_activity =result['type_activity']['value'],#Вид деятельности
					    name_building =result['name_building']['value'],#Наименование здания и сооружения
					    building_location =result['building_location']['value'],#Месторасположение здания и сооружения (индекс, адрес, ориентир)
					    main_content_reprofiling=result['main_content_reprofiling']['value'], #Краткое содержание осуществляемого перепрофилирования и реконструкции объекта
					    eds =result['eds']['value'],# ЭЦП
					    user_notification =result['user_notification']['value'],#Уведомление заявителя
					    reason_refusual =result['reason_refusual']['value'],#Причина отказа
					    permission_reg_number =result['permission_reg_number']['value'],#Регистрационный номер разрешения
					    permission_reg_date =result['permission_reg_date']['value'],#Регистрационная дата разрешения
					    additional_special_conditions =result['additional_special_conditions']['value'],#Дополнительные особые условия
					    object_area =result['object_area']['value'],#Площадь объекта
					    select_region =result['select_region']['value'],#Select Region
					    eds_gos_cad =result['eds_gos_cad']['value'],#ЭЦП Уполномоченного лица (Кадастр)
					    legal_eds =result['legal_eds']['value'],#ЭЦП Уполномоченного лица
					    acceptance =result['acceptance']['value'],#"Копия плана стен, разреза (при наличии), фасада и кадастрового паспорта зданий и сооружений
					    reject_file=result['reject_file']['value'], #Файл отказа
					    district =result['district']['value'],#Район
					    district_real=result['district']['real_value'], #Район
					    responsible_person_arch=result['responsible_person_arch']['value'],  #ФИО и инициалы уполномоченного лица
					    responsible_person_cadastr=result['responsible_person_cadastr']['value'], #ФИО и инициалы уполномоченного лица
					    scanfile =result['scanfile']['value'],#Прикрепите скан разрешения
					    payment =result['payment']['value'],#Payment
					    department_architecture=result['department_architecture']['value'], #Отдел (управление) по архитектуре и строительству            
					    authorized_position=result['authorized_position']['value'], #Authorized Position
					    fio_authorized_person =result['fio_authorized_person']['value'],#Fio Authorized Person
					    permission_type=result['permission_type']['value'], #Permission Type
					    permission_type_real=result['permission_type']['real_value'], #Permission Type
					    location_building_structure_gos=result['location_building_structure_gos']['value'],#Location Building Structure Gos
					    legal_name_fio_ind_gos=result['legal_name_fio_ind_gos']['value'], #Legal Name Fio Ind Gos
					    notice=result['notice']['value'], #Notice

				       	date=d.date

				       )
					print("OK")
			Crontab_data.objects.filter(service='perm_rec',date=d.date).delete()
			telegram_bot_sendtext(" ( -- perm-rec -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- perm rec -- ) Sana : "+str(d.date))


def run_api_smr(cron_type=True):
	if cron_type:
		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='smr'
		)

	data_cron=Crontab_data.objects.filter(service='smr').order_by('-date')

	for d in data_cron:	
		try:
			c=0
			url='https://my.gov.uz/notice-beginning-construction-works-v2/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("smr-"+str(d.date))
			for i in json.loads(data.content.decode('utf-8'))['data']:
				objid=i['id']
				print(objid)
			
				url='https://my.gov.uz/notice-beginning-construction-works-v2/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['NoticeBeginningConstructionWorks']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Smr.objects.filter(task_id=result2['id']).first()
				
				if not data_if:
					c=c+1

					if result['user_type']['real_value']=='I':
						if (result['ind_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['ind_tin']['value'])).first()

							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['ind_tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value'],
									birthday=result['birthday']['value']
									)
						else:
							result['ind_tin']['value']=0
					else:
						if (result['legal_entity_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(result['legal_entity_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_yur.objects.create(
									legal_entity_phone_number = result['legal_entity_phone_number']['value'],
									legal_head_tin = result['legal_head_tin']['value'],
									legal_head_name = result['legal_head_name']['value'],
									legal_entity_address = result['legal_entity_address']['value'],
									legal_entity_email = result['legal_entity_email']['value'],
									legal_entity_name =result['legal_entity_name']['value'],
									legal_entity_tin = result['legal_entity_tin']['value']
									)
						else:
							result['legal_entity_tin']['value']=0

					Smr.objects.create(
						
						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int
						
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator							
				       	date=d.date,

				       	user_type_real =result['user_type']['real_value'],#Тип пользователя
					    legal_entity_tin =result['legal_entity_tin']['value'],#ИНН юридического лица
					    tin=result['ind_tin']['real_value'],
					    passport_number =result['passport_number']['value'],#Серия и номер паспорта
					    

				       	number_date_protocol =result['number_date_protocol']['value'],#Номер и дата протокола архитектурно-градостроительного совета
					    formed_publicoff=result['formed_publicoff']['value'], #Прикрепите сформированную публичную оферту
					    reject_reason =result['reject_reason']['value'],#Причина отказа
					    notice =result['notice']['value'],#Уведомление о принятии заявления на рассмотрение
					    parallel_designobjc=result['parallel_designobjc']['value'], #Для объектов параллельного проектирования (№ и дата правительственного постановления, протокола, указа, решения)
					    numdate_protocol=result['numdate_protocol']['value'], #Номер и дата заключения (протокола) Главного Управления Строительства
					    cost =result['cost']['value'],#Стоимость строительно-монтажных работ: согласно Сводному экспертному заключению (без НДС, оборудования и прочих затрат заказчика)
					    construction_works=result['construction_works']['value'],  #Вид строительно-монтажных работ
					    amount_apartments =result['amount_apartments']['value'],#Количество квартир
					    amount_houses =result['amount_houses']['value'],#Количество домов (блоки)
					    total_livingarea =result['total_livingarea']['value'],#Общая жилая площадь квартир (кв.м)
					    total_area=result['total_area']['value'], #Общая площадь (кв.м)
					    description =result['description']['value'],#Description
					    attic_mansard =result['attic_mansard']['value'],  #Наличие чердака или мансарды         
					    basement_techunderground=result['basement_techunderground']['value'], #Наличие подвала или технического подполья
					    construction_volume=result['construction_volume']['value'], #Объем строительства здания (куб.м)
					    floors=result['floors']['value'], #Этажность
					    info_supervisory =result['info_supervisory']['value'],#Информация о надзорных органах и ответственных лиц
					    eds =result['eds']['value'],#ЭЦП (заявителя)
					    district_id =result['district_id']['value'],#Район (город)
					    district_id_real =result['district_id']['real_value'],#Район (город)
					    region_id =result['region_id']['value'],#Регион
					    region_id_real =result['region_id']['real_value'],#Регион
					    nmdate_posconc =result['nmdate_posconc']['value'],# Номер и дата положительного заключения органов экспертизы о промышленной безопасности проектной документации – для опасных производственных объектов      
					    nmdate_licontr =result['nmdate_licontr']['value'],#Номер и дата лицензии подрядной организации – при осуществлении отдельных лицензируемых видов строительно-монтажных работ
					    nmdate_posopin =result['nmdate_posopin']['value'],#Номер и дата положительного заключения
					    name_expertise =result['name_expertise']['value'],#Наименование органа экспертизы
					    settlement_account =result['settlement_account']['value'],#Расчетный счет
					    location_building =result['location_building']['value'],#Месторасположение объекта (индекс, адрес, ориентир)
					    name_building =result['name_building']['value'],#Наименование объекта
					    category_object =result['category_object']['value'],#Категория сложности объекта
					    legal_opf =result['legal_opf']['value'],#Организационно-правовая форма
					    legal_opf_real =result['legal_opf']['real_value'],#Организационно-правовая форма

					    objects_stateprog =result['objects_stateprog']['value'],#Для объектов государственной программы (№ и дата правительственного постановления, протокола, указа, решения)
					    deskript =result['deskript']['value'],#Descript
					    requisites =result['requisites']['value'],#Реквизиты Инспекции
					    amount =result['amount']['value'],#Сумма за осуществление надзорных функций за качеством и полнотой выполнения строительно-монтажных работ
					    comments =result['comments']['value']# Комментария    				  
				       )
					print("OK")
			Crontab_data.objects.filter(service='smr',date=d.date).delete()
			telegram_bot_sendtext(" ( -- smr -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- smr -- ) Sana : "+str(d.date))
 
def run_api_pexpl(cron_type=True):
	if cron_type:
		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='pexpl'
		)

	data_cron=Crontab_data.objects.filter(service='pexpl').order_by('-date')

	for d in data_cron:	
	
		try:
			c=0
			url='https://my.gov.uz/acceptance-buildings-completed-construction-structures-v4/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("pexpl-"+str(d.date))
			for i in json.loads(data.content.decode('utf-8'))['data']:
				
				objid=i['id']
				print(objid)
				url='https://my.gov.uz/acceptance-buildings-completed-construction-structures-v4/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
				
				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['AcceptanceBuildingsCompletedConstructionStructures']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Pexpl.objects.filter(task_id=result2['id']).first()
				
				if not data_if:
					c=c+1
					if result['user_type']['real_value']=='I':
						if (result['individual_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['individual_tin']['value'])).first()

							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['individual_tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value'],
									birthday=result['birthday']['value']
									)
						else:
							result['individual_tin']['value']=0
					else:
						if (result['legal_entity_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(result['legal_entity_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_yur.objects.create(
									legal_entity_phone_number = result['legal_entity_phone_number']['value'],
									legal_head_tin = result['legal_head_tin']['value'],
									legal_head_name = result['legal_head_name']['value'],
									legal_entity_address = result['legal_entity_address']['value'],
									legal_entity_email = result['legal_entity_email']['value'],
									legal_entity_name =result['legal_entity_name']['value'],
									legal_entity_tin = result['legal_entity_tin']['value']
									)
						else:
							result['legal_entity_tin']['value']=0

					if (result['tin_project_organization']['value']).isnumeric():		
						data_l_if=Loyihalovchi.objects.filter(inn=str(result['tin_project_organization']['value'])).first()
						if not data_l_if:
							Loyihalovchi.objects.create(
								adress= result['legal_address_project_organization']['value'], # Юридический адрес проектной организации
								inn= result['tin_project_organization']['value'], #ИНН проектной организации
								nomi= result['name_project_organization']['value'] #Наименование проектной организации
								)
					else:
						result['tin_project_organization']['value']=0

					if (result['tin_contractor_organization']['value']).isnumeric():		
						data_q_if=Quruvchi.objects.filter(inn=str(result['tin_contractor_organization']['value'])).first()
						if not data_q_if:
							Quruvchi.objects.create(
								adress= result['juridical_address_contractor_organization']['value'], # Юридический адрес проектной организации
								inn= result['tin_contractor_organization']['value'], #ИНН проектной организации
								nomi= result['name_contractor_organization']['value'] #Наименование проектной организации
								)
					else:
						result['tin_contractor_organization']['value']=0

					Pexpl.objects.create(
						
						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int
						
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator							
				 		date=d.date,
					    
						district_id=result['district_id']['value'], #Район (город)
						district_id_real=result['district_id']['real_value'], #Район (город)
						region_id =result['region_id']['value'],#Регион
						region_id_real=result['region_id']['real_value'], #Регион
						type_building_structure =result['type_building_structure']['value'], #Тип здания или сооружения
					    type_building_structure_real =result['type_building_structure']['real_value'],#Тип здания или сооружения
					    user_ds_gov =result['user_ds_gov']['value'],#ЭЦП ответственного на заявку
					    responsible_person_rejected =result['responsible_person_rejected']['value'], #Ответственное лицо  
					    responsible_person =result['responsible_person']['value'],#Ответственное лицо
					    contract_file =result['contract_file']['value'],# Согласование 
					    reject_reason =result['reject_reason']['value'],#Причина отказа
					    acception_consideration =result['acception_consideration']['value'],#Уведомление пользователю
					    
 					    tin_contractor_org =result['tin_contractor_organization']['value'],#ИНН подрядной организации (при наличии)
					   
					    tin_project_org =result['tin_project_organization']['value'],#ИНН проектной организации           
					    
					    number_date_resignation_district_hokim =result['number_date_resignation_district_hokim']['value'],#Номер и дата решения хокима района (города) об отводе земельного участка (при первоначальном строительстве)
					    buildings_location =result['buildings_location']['value'],#Месторасположение здания и сооружения (индекс, адрес, ориентир)
					    buildings_name =result['buildings_name']['value'],#Наименование здания и сооружения           
					    user_ds =result['user_ds']['value'],#ЭЦП заявителя
					    kopf=result['kopf']['value'], #Организационно-правовая форма
					    kopf_real =result['kopf']['real_value'],#Организационно-правовая форма

					    tin  =result['individual_tin']['value'],#ИНН       
					    passport_number =result['passport_number']['value'],#Серия и номер паспорта
					    user_type_real =result['user_type']['real_value'],#Тип пользователя
					    legal_entity_tin =result['legal_entity_tin']['value'],#ИНН юридического лица

					    user_ds_gov_architectura=result['user_ds_gov_architectura']['value'], # ЭЦП ответственного на заявку (архитектура)       
					    user_ds_gov_gasn=result['user_ds_gov_gasn']['value'], #ЭЦП ответственного на заявку (гасн)         
					    user_ds_gov_sanitation =result['user_ds_gov_sanitation']['value'],#ЭЦП ответственного на заявку (санитария)
					    user_ds_gov_firefighters=result['user_ds_gov_firefighters']['value'], #ЭЦП ответственного на заявку (пожарные)
					    doc_architectura =result['doc_architectura']['value'], #Заключение отдела строительства     
					    doc_gasn=result['doc_gasn']['value'],  #Документ (гасн)   
					    doc_sanitation=result['doc_sanitation']['value'], #Документ (санитария)
					    doc_firefighters =result['doc_firefighters']['value'],#Документ (пожарные)
					    act_doc =result['act_doc']['value'], #Приложение к акту (Подробная информация о технической характеристике объекта а также, генеральный план земельного участка)      
					    name_owner_real_estate=result['name_owner_real_estate']['value'], #Название владельца (пользователя) недвижимимости
					    inn_owner_real_estate=result['inn_owner_real_estate']['value'], #ИНН владельца (пользователя) недвижимимости
					    property_location=result['property_location']['value'], #Месторасположение недвижимости
					    cadastral_number=result['cadastral_number']['value'], #Кадастровый номер
					    plot_area_according_legal_document =result['plot_area_according_legal_document']['value'],#Площадь земельного участка по правовому документу
					    legal_documents_real_estate =result['legal_documents_real_estate']['value'],#Правовые документы недвижимости
					    basic_documentation_construction=result['basic_documentation_construction']['value'], #Основательная документация в строительстве
					    name_building_according_project_documentation=result['name_building_according_project_documentation']['value'], #Название здания(сооружения) по проектной документации
					    number_main_buildingsaa =result['number_main_buildingsaa']['value'],#Количество основных зданий
					    number_additional_buildingsas=result['number_additional_buildingsas']['value'], #Количество дополнительных зданий (сооружений)
					    total_areaad =result['total_areaad']['value'],# Общая площадь
					    living_areaaf =result['living_areaaf']['value'],#  Жилая площадь
					    number_living_roomsag =result['number_living_roomsag']['value'],# Количество жилых комнат
					    info_about_floors_reconstructed_buildingsh =result['info_about_floors_reconstructed_buildingsh']['value'],#Характеристика здания.
					    number_main_buildingssa =result['number_main_buildingssa']['value'],#Количество основных зданий.
					    number_additional_buildingsss =result['number_additional_buildingsss']['value'],#Количество дополнительных зданий (сооружений).
					    total_areasd =result['total_areasd']['value'],# Общая площадь.
					    living_areasf =result['living_areasf']['value'],#Жилая площадь.
					    number_living_roomssg =result['number_living_roomssg']['value'],#Количество жилых комнат.
					    following_engineering_networks_connected_livingsj =result['following_engineering_networks_connected_livingsj']['value'],#В жилом помещении подключены следующие инженерно-коммуникационные сети.
					    date_beginning_constructionsk =result['date_beginning_constructionsk']['value'],#Дата начала стройки.
					    date_completion_constructionsl =result['date_completion_constructionsl']['value'],#Дата окончания стройки.
					    end_construction_work_building_percentsz=result['end_construction_work_building_percentsz']['value'], #Окончание строительных работ здания (сооружения) в процентах.
					    end_construction_work_building_percentsz_real =result['end_construction_work_building_percentsz']['real_value'],#Окончание строительных работ здания (сооружения) в процентах.
					    legal_documents_land_plot =result['legal_documents_land_plot']['value'],#Правовые документы земельного участка
					    legal_documents_building =result['legal_documents_building']['value'],#Правовые документы здания (сооружения)
					    number_constructionsad =result['number_constructionsad']['value'],#Количество сооружений
					    cadastral_amountaf =result['cadastral_amountaf']['value'],#Кадастровая сумма
					    
					    effective_areaah =result['effective_areaah']['value'],# Полезная площадь   
					    volume_buildingaj =result['volume_buildingaj']['value'],#Объем здания (сооружения)        
					    info_about_floors_reconstructedak =result['info_about_floors_reconstructedak']['value'],#   Сведения об этажах и реконструируемой части  
					    number_buildingsa =result['number_buildingsa']['value'],#Количество зданий           
					    number_parts_buildingsss =result['number_parts_buildingsss']['value'],#Количество части зданий.
					    number_structuressd =result['number_structuressd']['value'],#Количество сооружений.
					    usable_areasg =result['usable_areasg']['value'],#Полезная площадь.
					    volume_buildingsh =result['volume_buildingsh']['value'],#Объем здания (сооружения).
					    following_engineering_networks_connected_buildingsk =result['following_engineering_networks_connected_buildingsk']['value'],#В здании (сооружении) подключены следующие инженерно-коммуникационные сети.           
					    info_about_floors_reconstructed_buildingaj=result['info_about_floors_reconstructed_buildingaj']['value'],#Характеристика здания
					    number_parts_buildingsaa =result['number_parts_buildingsaa']['value'],#Количество части зданий
					    number_buildingsaab  =result['number_buildingsaab']['value'],#Количество зданий
					    registration_number_act =result['registration_number_act']['value'],#Регистрационный номер акта
					    registration_act_date =result['registration_act_date']['value'],#Регистрационная дата акта
					    city_area =result['city_area']['value'],#Город/район
					    name_organizer=result['name_organizer']['value'], #Название проектной организации
					    name_executing_organization =result['name_executing_organization']['value'],#Название подрядной организации
					    head_construction_department =result['head_construction_department']['value'], #Ф.И.О руководителя отдела по строительству
					    name_department_construction =result['name_department_construction']['value'],#Название отдела по строительству
					    name_head_cadastre_branch =result['name_head_cadastre_branch']['value'],# Ф.И.О руководителя филиала по кадастру 
					    name_branch_cadastre =result['name_branch_cadastre']['value'],#  Город\\район филиала по кадастру        
					  
					    conclusion_act =result['conclusion_act']['value'],# Заключение к акту 
					    meet_requirements_standards =result['meet_requirements_standards']['value'],# Соответствует ли требованиям и нормам?   
					    meet_requirements_standards_real=result['meet_requirements_standards']['real_value'], # Соответствует ли требованиям и нормам?   
					    authorized_person_sanitary=result['authorized_person_sanitary']['value'], #Укажите территорию (города  или района) центра санитарии
					    doctor_sanitary_epidemiological =result['doctor_sanitary_epidemiological']['value'],#Ф.И.О. врача районного (городского) санитарно-эпидемиологического надзора
					    post_authorized_person_gasn =result['post_authorized_person_gasn']['value'],#  Укажите территорию (Республика Каракалпакстан, область или г. Ташкент) инспекции ГАСН      
					    head_inspections_architectural_supervision =result['head_inspections_architectural_supervision']['value'],#Ф.И.О. руководителя территориальной инспекции Государственного архитектурно-строительного надзора
					    authorized_person_fireman =result['authorized_person_fireman']['value'],#Город/район отдела по пожарному безопасности     
					    head_fire_safety_department =result['head_fire_safety_department']['value'],#Ф.И.О. начальника отдела по пожарному безопасности
					    authorized_person_architecture =result['authorized_person_architecture']['value'],#Город район отдела строительства
					    head_district_construction_department =result['head_district_construction_department']['value'],#Ф.И.О. начальника районного (городского) отдела строительства
					    meet_requirements_standardsss =result['meet_requirements_standardsss']['value'],# Соответствует ли требованиям и нормам? 
					    meet_requirements_standardsss_real =result['meet_requirements_standardsss']['real_value'],# Соответствует ли требованиям и нормам?          
					    meet_requirements_standardsbb=result['meet_requirements_standardsbb']['value'],#Соответствует ли требованиям и нормам? 
					    meet_requirements_standardsbb_real =result['meet_requirements_standardsbb']['real_value'], #Соответствует ли требованиям и нормам?       
					    meet_requirements_standardsaa=result['meet_requirements_standardsaa']['value'],#Соответствует ли требованиям и нормам?   
					    meet_requirements_standardsaa_real =result['meet_requirements_standardsaa']['real_value'], #Соответствует ли требованиям и нормам?       
					    after_acceptance_building_objects_which_construction_reconstruc =result['after_acceptance_building_objects_which_construction_reconstruc']['value'],#   Полное право собственности на земельный участок , сдачи в эксплуатацию завершенных зданий и сооружений после строительства (реконструкции), (или других имущественных прав), структура зданий и сооружений должна включать следующее
					    info_buildings_facilities_accepted_operation =result['info_buildings_facilities_accepted_operation']['value'],#Сведения о зданиях или объектах, принимаемые в эксплуатацию       
					   
					    user_ds_gov_reject =result['user_ds_gov_reject']['value'],#ЭЦП ответственного на заявку
					    name_head_cadastre_branch_reject =result['name_head_cadastre_branch_reject']['value'],#Ф.И.О руководителя филиала по кадастру
					    name_branch_cadastre_reject=result['name_branch_cadastre_reject']['value'], #   Город район филиала по кадастру         
					    conclusion_act_reject =result['conclusion_act_reject']['value'],#Заключение к акту
					    
					    cause_ss=result['cause_ss']['value'], # Причина
					    cause_bb=result['cause_bb']['value'],   #Причина 
					    cause_aa=result['cause_aa']['value'],  #Причина
					    cause=result['cause']['value'], #Причина
					    extract_register_real_estate =result['extract_register_real_estate']['value'],#Выписка из госреестра о  регистрации права на объект недвижимости
					    volume_building_structure =result['volume_building_structure']['value'],#Объем здания (сооружения)
					    death_certificate =result['death_certificate']['value'],#Death Certificate
					    death_owner_check =result['death_owner_check']['value']# Death Owner Check
				       )
					print("OK")
			Crontab_data.objects.filter(service='pexpl',date=d.date).delete()
			telegram_bot_sendtext(" ( -- pexpl -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- pexpl -- ) Sana : "+str(d.date))
 

def run_api_pexpl_ind(cron_type=True):
	if cron_type:
		Crontab_data.objects.create(
			date=(datetime.now()-timedelta(hours=12)).strftime('%Y-%m-%d'),
			service='pexpl_ind'
		)
	data_cron=Crontab_data.objects.filter(service='pexpl_ind').order_by('-date')

	for d in data_cron:	
		try:
			c=0
			url='https://my.gov.uz/acceptance-buildings-completed-2-v2/rest-api/get-closed-task-list-by-date?last_update='+str(d.date)
			data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
			print("pexpl_ind-"+str(d.date))
			for i in json.loads(data.content.decode('utf-8'))['data']:
				objid=i['id']
				print(objid)
			
				url='https://my.gov.uz/acceptance-buildings-completed-2-v2/rest-api/get-task?id='+str(objid)
				data=requests.get(url,auth=HTTPBasicAuth('achilov.davronbek','7HH5xbmf&NBfL$MGDj5E27%6iP+=2ysh?5X&BqNg'))
				try:
					result=json.loads(data.content.decode('utf-8'))['entities']['AcceptanceBuildingsCompletedConstructionStructures']
					result2=json.loads(data.content.decode('utf-8'))['task']
				except KeyError:
					print('KeyError !!')
					continue

				data_if=Pexpl_ind.objects.filter(task_id=result2['id']).first()
				
				if not data_if:
					c=c+1

					if result['user_type']['real_value']=='I':

						if (result['individual_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_fiz.objects.filter(tin=str(result['individual_tin']['value'])).first()

							if not data_b_if:
								Buyurtmachi_fiz.objects.create(
									full_name=result['full_name']['value'],
									tin=result['individual_tin']['value'],
									email=result['email']['value'],
									passport_number=result['passport_number']['value'],
									passport_issue_date=result['passport_issue_date']['value'],
									permit_address=result['permit_address']['value'],
									phone=result['phone']['value'],
									birthday=result['birthday']['value']
									)
						else:
							result['individual_tin']['value']=0
					else:
						if (result['legal_entity_tin']['value']).isnumeric():
							data_b_if=Buyurtmachi_yur.objects.filter(legal_entity_tin=str(result['legal_entity_tin']['value'])).first()
							if not data_b_if:
								Buyurtmachi_yur.objects.create(
									legal_entity_phone_number = result['legal_entity_phone_number']['value'],
									legal_head_tin = result['legal_head_tin']['value'],
									legal_head_name = result['legal_head_name']['value'],
									legal_entity_address = result['legal_entity_address']['value'],
									legal_entity_email = result['legal_entity_email']['value'],
									legal_entity_name =result['legal_entity_name']['value'],
									legal_entity_tin = result['legal_entity_tin']['value']
									)
						else:
							result['legal_entity_tin']['value']=0
					if (result['tin_project_organization']['value']).isnumeric():
						data_l_if=Loyihalovchi.objects.filter(inn=str(result['tin_project_organization']['value'])).first()
						if not data_l_if:
							Loyihalovchi.objects.create(
								adress= result['legal_address_project_organization']['value'], # Юридический адрес проектной организации
								inn= result['tin_project_organization']['value'], #ИНН проектной организации
								nomi= result['name_project_organization']['value'] #Наименование проектной организации
								)
					else:
						result['tin_project_organization']['value']=0

					if (result['tin_contractor_organization']['value']).isnumeric():	
						data_q_if=Quruvchi.objects.filter(inn=str(result['tin_contractor_organization']['value'])).first()
						if not data_q_if:

							Quruvchi.objects.create(
								adress= result['juridical_address_contractor_organization']['value'], # Юридический адрес проектной организации
								inn= result['tin_contractor_organization']['value'], #ИНН проектной организации
								nomi= result['name_contractor_organization']['value'] #Наименование проектной организации
								)
					else:
						result['tin_contractor_organization']['value']=0


					Pexpl_ind.objects.create(
						
						obj_id = result['id']['value'],#ID int
						authority_id=result['authority_id']['value'], #Authority ID int
						
						task_id=result2['id'],
						operator_org=result2['operator_org'],#operator							
				 		date=d.date,
					    
						district_id=result['district_id']['value'], #Район (город)
						district_id_real=result['district_id']['real_value'], #Район (город)
						region_id =result['region_id']['value'],#Регион
						region_id_real=result['region_id']['real_value'], #Регион
						type_building_structure =result['type_building_structure']['value'], #Тип здания или сооружения
					    type_building_structure_real =result['type_building_structure']['real_value'],#Тип здания или сооружения
					    user_ds_gov =result['user_ds_gov']['value'],#ЭЦП ответственного на заявку
					    responsible_person_rejected =result['responsible_person_rejected']['value'], #Ответственное лицо  
					    responsible_person =result['responsible_person']['value'],#Ответственное лицо
					    contract_file =result['contract_file']['value'],# Согласование 
					    reject_reason =result['reject_reason']['value'],#Причина отказа
					    acception_consideration =result['acception_consideration']['value'],#Уведомление пользователю
					  
					    tin_contractor_org =result['tin_contractor_organization']['value'],#ИНН подрядной организации (при наличии)
					    
					    tin_project_org =result['tin_project_organization']['value'],#ИНН проектной организации           
					    
					    number_date_resignation_district_hokim =result['number_date_resignation_district_hokim']['value'],#Номер и дата решения хокима района (города) об отводе земельного участка (при первоначальном строительстве)
					    buildings_location =result['buildings_location']['value'],#Месторасположение здания и сооружения (индекс, адрес, ориентир)
					    buildings_name =result['buildings_name']['value'],#Наименование здания и сооружения           
					    user_ds =result['user_ds']['value'],#ЭЦП заявителя
					    kopf=result['kopf']['value'], #Организационно-правовая форма
					    kopf_real =result['kopf']['real_value'],#Организационно-правовая форма
					    
					    tin  =result['individual_tin']['value'],#ИНН       
					    passport_number =result['passport_number']['value'],#Серия и номер паспорта
					    user_type_real =result['user_type']['real_value'],#Тип пользователя

					    legal_entity_tin =result['legal_entity_tin']['value'],#ИНН юридического лица

					    user_ds_gov_architectura=result['user_ds_gov_architectura']['value'], # ЭЦП ответственного на заявку (архитектура)       
					    user_ds_gov_gasn=result['user_ds_gov_gasn']['value'], #ЭЦП ответственного на заявку (гасн)         
					    user_ds_gov_sanitation =result['user_ds_gov_sanitation']['value'],#ЭЦП ответственного на заявку (санитария)
					    user_ds_gov_firefighters=result['user_ds_gov_firefighters']['value'], #ЭЦП ответственного на заявку (пожарные)
					    doc_architectura =result['doc_architectura']['value'], #Заключение отдела строительства     
					    doc_gasn=result['doc_gasn']['value'],  #Документ (гасн)   
					    doc_sanitation=result['doc_sanitation']['value'], #Документ (санитария)
					    doc_firefighters =result['doc_firefighters']['value'],#Документ (пожарные)
					    act_doc =result['act_doc']['value'], #Приложение к акту (Подробная информация о технической характеристике объекта а также, генеральный план земельного участка)      
					    name_owner_real_estate=result['name_owner_real_estate']['value'], #Название владельца (пользователя) недвижимимости
					    inn_owner_real_estate=result['inn_owner_real_estate']['value'], #ИНН владельца (пользователя) недвижимимости
					    property_location=result['property_location']['value'], #Месторасположение недвижимости
					    cadastral_number=result['cadastral_number']['value'], #Кадастровый номер
					    plot_area_according_legal_document =result['plot_area_according_legal_document']['value'],#Площадь земельного участка по правовому документу
					    legal_documents_real_estate =result['legal_documents_real_estate']['value'],#Правовые документы недвижимости
					    basic_documentation_construction=result['basic_documentation_construction']['value'], #Основательная документация в строительстве
					    name_building_according_project_documentation=result['name_building_according_project_documentation']['value'], #Название здания(сооружения) по проектной документации
					    number_main_buildingsaa =result['number_main_buildingsaa']['value'],#Количество основных зданий
					    number_additional_buildingsas=result['number_additional_buildingsas']['value'], #Количество дополнительных зданий (сооружений)
					    total_areaad =result['total_areaad']['value'],# Общая площадь
					    living_areaaf =result['living_areaaf']['value'],#  Жилая площадь
					    number_living_roomsag =result['number_living_roomsag']['value'],# Количество жилых комнат
					    info_about_floors_reconstructed_buildingsh =result['info_about_floors_reconstructed_buildingsh']['value'],#Характеристика здания.
					    number_main_buildingssa =result['number_main_buildingssa']['value'],#Количество основных зданий.
					    number_additional_buildingsss =result['number_additional_buildingsss']['value'],#Количество дополнительных зданий (сооружений).
					    total_areasd =result['total_areasd']['value'],# Общая площадь.
					    living_areasf =result['living_areasf']['value'],#Жилая площадь.
					    number_living_roomssg =result['number_living_roomssg']['value'],#Количество жилых комнат.
					    following_engineering_networks_connected_livingsj =result['following_engineering_networks_connected_livingsj']['value'],#В жилом помещении подключены следующие инженерно-коммуникационные сети.
					    date_beginning_constructionsk =result['date_beginning_constructionsk']['value'],#Дата начала стройки.
					    date_completion_constructionsl =result['date_completion_constructionsl']['value'],#Дата окончания стройки.
					    end_construction_work_building_percentsz=result['end_construction_work_building_percentsz']['value'], #Окончание строительных работ здания (сооружения) в процентах.
					    end_construction_work_building_percentsz_real =result['end_construction_work_building_percentsz']['real_value'],#Окончание строительных работ здания (сооружения) в процентах.
					    legal_documents_land_plot =result['legal_documents_land_plot']['value'],#Правовые документы земельного участка
					    legal_documents_building =result['legal_documents_building']['value'],#Правовые документы здания (сооружения)
					    number_constructionsad =result['number_constructionsad']['value'],#Количество сооружений
					    cadastral_amountaf =result['cadastral_amountaf']['value'],#Кадастровая сумма
					    effective_areaah =result['effective_areaah']['value'],# Полезная площадь   
					    volume_buildingaj =result['volume_buildingaj']['value'],#Объем здания (сооружения)        
					    info_about_floors_reconstructedak =result['info_about_floors_reconstructedak']['value'],#   Сведения об этажах и реконструируемой части  
					    number_buildingsa =result['number_buildingsa']['value'],#Количество зданий           
					    number_parts_buildingsss =result['number_parts_buildingsss']['value'],#Количество части зданий.
					    number_structuressd =result['number_structuressd']['value'],#Количество сооружений.
					    usable_areasg =result['usable_areasg']['value'],#Полезная площадь.
					    volume_buildingsh =result['volume_buildingsh']['value'],#Объем здания (сооружения).
					    following_engineering_networks_connected_buildingsk =result['following_engineering_networks_connected_buildingsk']['value'],#В здании (сооружении) подключены следующие инженерно-коммуникационные сети.           
					    info_about_floors_reconstructed_buildingaj=result['info_about_floors_reconstructed_buildingaj']['value'],#Характеристика здания
					    number_parts_buildingsaa =result['number_parts_buildingsaa']['value'],#Количество части зданий
					    number_buildingsaab  =result['number_buildingsaab']['value'],#Количество зданий
					    registration_number_act =result['registration_number_act']['value'],#Регистрационный номер акта
					    registration_act_date =result['registration_act_date']['value'],#Регистрационная дата акта
					    head_construction_department =result['head_construction_department']['value'], #Ф.И.О руководителя отдела по строительству
					    name_department_construction =result['name_department_construction']['value'],#Название отдела по строительству
					    name_head_cadastre_branch =result['name_head_cadastre_branch']['value'],# Ф.И.О руководителя филиала по кадастру 
					    name_branch_cadastre =result['name_branch_cadastre']['value'],#  Город\\район филиала по кадастру        
					    conclusion_act =result['conclusion_act']['value'],# Заключение к акту 
					    meet_requirements_standards =result['meet_requirements_standards']['value'],# Соответствует ли требованиям и нормам?   
					    meet_requirements_standards_real=result['meet_requirements_standards']['real_value'], # Соответствует ли требованиям и нормам?   
					    authorized_person_sanitary=result['authorized_person_sanitary']['value'], #Укажите территорию (города  или района) центра санитарии
					    doctor_sanitary_epidemiological =result['doctor_sanitary_epidemiological']['value'],#Ф.И.О. врача районного (городского) санитарно-эпидемиологического надзора
					    post_authorized_person_gasn =result['post_authorized_person_gasn']['value'],#  Укажите территорию (Республика Каракалпакстан, область или г. Ташкент) инспекции ГАСН      
					    head_inspections_architectural_supervision =result['head_inspections_architectural_supervision']['value'],#Ф.И.О. руководителя территориальной инспекции Государственного архитектурно-строительного надзора
					    authorized_person_fireman =result['authorized_person_fireman']['value'],#Город/район отдела по пожарному безопасности     
					    head_fire_safety_department =result['head_fire_safety_department']['value'],#Ф.И.О. начальника отдела по пожарному безопасности
					    authorized_person_architecture =result['authorized_person_architecture']['value'],#Город район отдела строительства
					    head_district_construction_department =result['head_district_construction_department']['value'],#Ф.И.О. начальника районного (городского) отдела строительства
					    meet_requirements_standardsss =result['meet_requirements_standardsss']['value'],# Соответствует ли требованиям и нормам? 
					    meet_requirements_standardsss_real =result['meet_requirements_standardsss']['real_value'],# Соответствует ли требованиям и нормам?          
					    meet_requirements_standardsbb=result['meet_requirements_standardsbb']['value'],#Соответствует ли требованиям и нормам? 
					    meet_requirements_standardsbb_real =result['meet_requirements_standardsbb']['real_value'], #Соответствует ли требованиям и нормам?       
					    meet_requirements_standardsaa=result['meet_requirements_standardsaa']['value'],#Соответствует ли требованиям и нормам?   
					    meet_requirements_standardsaa_real =result['meet_requirements_standardsaa']['real_value'], #Соответствует ли требованиям и нормам?       
					    after_acceptance_building_objects_which_construction_reconstruc =result['after_acceptance_building_objects_which_construction_reconstruc']['value'],#   Полное право собственности на земельный участок , сдачи в эксплуатацию завершенных зданий и сооружений после строительства (реконструкции), (или других имущественных прав), структура зданий и сооружений должна включать следующее
					    info_buildings_facilities_accepted_operation =result['info_buildings_facilities_accepted_operation']['value'],#Сведения о зданиях или объектах, принимаемые в эксплуатацию       
					    user_ds_gov_reject =result['user_ds_gov_reject']['value'],#ЭЦП ответственного на заявку
					    name_head_cadastre_branch_reject =result['name_head_cadastre_branch_reject']['value'],#Ф.И.О руководителя филиала по кадастру
					    name_branch_cadastre_reject=result['name_branch_cadastre_reject']['value'], #   Город район филиала по кадастру         
					    conclusion_act_reject =result['conclusion_act_reject']['value'],#Заключение к акту
					    cause_ss=result['cause_ss']['value'], # Причина
					    cause_bb=result['cause_bb']['value'],   #Причина 
					    cause_aa=result['cause_aa']['value'],  #Причина
					    cause=result['cause']['value'], #Причина
					    extract_register_real_estate =result['extract_register_real_estate']['value'],#Выписка из госреестра о  регистрации права на объект недвижимости
					    volume_building_structure =result['volume_building_structure']['value'],#Объем здания (сооружения)
					    death_certificate =result['death_certificate']['value'],#Death Certificate
					    death_owner_check =result['death_owner_check']['value']# Death Owner Check
				       )
					print("OK")
			Crontab_data.objects.filter(service='pexpl_ind',date=d.date).delete()
			telegram_bot_sendtext(" ( -- pexpl-ind -- ) -- ( "+str(d.date)+" ) -- ( "+str(c)+" )")
		except requests.exceptions.ConnectionError as e:
			print("Internetda uzilish! Sana : "+str(d.date))
			telegram_bot_sendtext("Internetda uzilish! ( -- pexpl ind -- ) Sana : "+str(d.date))
 



