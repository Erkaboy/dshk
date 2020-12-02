from django.urls import path,re_path
from django.views.static import serve
from django.conf import settings

from . import views 
from . import genplan_views
from . import pdp_views
from . import apot_views
from . import reestr_views
from . import redline_views
from . import funk_genplan_views
from . import funk_apot_views
from . import geologik_rayon_views

from . import rest_api

urlpatterns = [


	path('dshk_rest_api/<slug:xizmat>/', rest_api.dshk_rest_api),	
	path('dshk_rest_api/<slug:xizmat>/obj_id=<str:obj_id>/', rest_api.dshk_rest_api),	


	re_path(r'^geologik_rayonlash_data$',geologik_rayon_views.geologik_rayonlash_data,name='geologik_rayonlash_data'),
	re_path(r'^delete_geo_ray$',geologik_rayon_views.delete_geo_ray,name='delete_geo_ray'),
	re_path(r'^save_edit_geo_ray$',geologik_rayon_views.save_edit_geo_ray,name='save_edit_geo_ray'),
	re_path(r'^save_edit_geo_ray_data$',geologik_rayon_views.save_edit_geo_ray_data,name='save_edit_geo_ray_data'),
	re_path(r'^edit_geo_ray_data_edit$',geologik_rayon_views.edit_geo_ray_data_edit,name='edit_geo_ray_data_edit'),
	re_path(r'^edit_geo_ray_data_data$',geologik_rayon_views.edit_geo_ray_data_data,name='edit_geo_ray_data_data'),
	re_path(r'^geo_ray_data_data$',geologik_rayon_views.geo_ray_data_data,name='geo_ray_data_data'),
	re_path(r'^save_geo_ray$',geologik_rayon_views.save_geo_ray,name='save_geo_ray'),
	re_path(r'^geologik_rayon/(?P<path>.*)', serve, {'document_root': 'geologik_rayon'}),
 	re_path(r'^geo_ray_data_dialog_view$',geologik_rayon_views.geo_ray_data_dialog_view,name='geo_ray_data_dialog_view'),
 	re_path(r'^edit_geo_ray$',geologik_rayon_views.edit_geo_ray,name='edit_geo_ray'),
 	re_path(r'^edit_geo_ray_data$',geologik_rayon_views.edit_geo_ray_data,name='edit_geo_ray_data'),
 	re_path(r'^geo_ray_dialog_view$',geologik_rayon_views.geo_ray_dialog_view,name='geo_ray_dialog_view'),
 	re_path(r'^create_geo_ray$',geologik_rayon_views.create_geo_ray,name='create_geo_ray'),

	re_path(r'^funk_apot_data$',funk_apot_views.funk_apot_data,name='funk_apot_data'),
	re_path(r'^save_edit_funk_apot$',funk_apot_views.save_edit_funk_apot,name='save_edit_funk_apot'),
	re_path(r'^delete_funk_apot$',funk_apot_views.delete_funk_apot,name='delete_funk_apot'),
	re_path(r'^save_funk_apot$',funk_apot_views.save_funk_apot,name='save_funk_apot'),
	re_path(r'^edit_funk_apot$',funk_apot_views.edit_funk_apot,name='edit_funk_apot'),
	re_path(r'^edit_funk_apot_data$',funk_apot_views.edit_funk_apot_data,name='edit_funk_apot_data'),
	re_path(r'^create_funk_apot$',funk_apot_views.create_funk_apot,name='create_funk_apot'),
	re_path(r'^funk_apot_tuman_data$',funk_apot_views.funk_apot_tuman_data,name='funk_apot_tuman_data'),
	re_path(r'^funk_apot_dialog_view$',funk_apot_views.funk_apot_dialog_view,name='funk_apot_dialog_view'),

	re_path(r'^create_funk_gen$',funk_genplan_views.create_funk_gen,name='create_funk_gen'),
	re_path(r'^funk_genplan_dialog_view$',funk_genplan_views.funk_genplan_dialog_view,name='funk_genplan_dialog_view'),
	re_path(r'^save_funk_gen$',funk_genplan_views.save_funk_gen,name='save_funk_gen'),
	re_path(r'^delete_funk_gen$',funk_genplan_views.delete_funk_gen,name='delete_funk_gen'),
	re_path(r'^edit_funk_gen_data$',funk_genplan_views.edit_funk_gen_data,name='edit_funk_gen_data'),
	re_path(r'^edit_funk_gen$',funk_genplan_views.edit_funk_gen,name='edit_funk_gen'),
	re_path(r'^save_edit_funk_gen$',funk_genplan_views.save_edit_funk_gen,name='save_edit_funk_gen'),
	re_path(r'^funk_gen_data$',funk_genplan_views.funk_gen_data,name='funk_gen_data'),


	re_path(r'^redline_data$',redline_views.redline_data,name='redline_data'),
	re_path(r'^edit_redline$',redline_views.edit_redline,name='edit_redline'),
	re_path(r'^create_redline$',redline_views.create_redline,name='create_redline'),
	re_path(r'^edit_redline_data$',redline_views.edit_redline_data,name='edit_redline_data'),
	re_path(r'^redline_dialog_view$',redline_views.redline_dialog_view,name='redline_dialog_view'),
	re_path(r'^save_redline$',redline_views.save_redline,name='save_redline'),
	re_path(r'^delete_redline$',redline_views.delete_redline,name='delete_redline'),
	re_path(r'^redline_genplans_data$',redline_views.redline_genplans_data,name='redline_genplans_data'),
	re_path(r'^save_edit_redline$',redline_views.save_edit_redline,name='save_edit_redline'),

	re_path(r'^chart_data$',views.chart_data,name='chart_data'),

	re_path(r'^apz_data', reestr_views.apz_data,name='apz_data'),
	re_path(r'^psd_data', reestr_views.psd_data,name='psd_data'),
	re_path(r'^psd_ind_data', reestr_views.psd_ind_data,name='psd_ind_data'),
	re_path(r'^perm_rec_data', reestr_views.perm_rec_data,name='perm_rec_data'),
	re_path(r'^smr_data', reestr_views.smr_data,name='smr_data'),
	re_path(r'^pexpl_data', reestr_views.pexpl_data,name='pexpl_data'),	
	re_path(r'^pexpl_ind_data', reestr_views.pexpl_ind_data,name='pexpl_ind_data'),	

	
	re_path(r'^buyurtmachi_data', reestr_views.buyurtmachi_data,name='buyurtmachi_data'),
	re_path(r'^loyihalovchi_data', reestr_views.loyihalovchi_data,name='loyihalovchi_data'),
	re_path(r'^pudratchi_data', reestr_views.pudratchi_data,name='pudratchi_data'),


	re_path(r'^sessia', views.sessia,name='sessia'),
	path('search_geolocation',views.search_geolocation,name='search_geolocation'),

	re_path(r'^geodata', views.geodata,name='geodata'),
	re_path(r'^geocache', views.geocache,name='geocache'),

	
	re_path(r'^apot_data/(?P<path>.*)', serve, {'document_root': 'apot_data'}),
	re_path(r'^list_sub_apot', apot_views.list_sub_apot,name='list_sub_apot'),
	re_path(r'^create_apot', apot_views.create_apot,name='create_apot'),
	re_path(r'^delete_apot_data', apot_views.delete_apot_data,name='delete_apot_data'),
	re_path(r'^delete_apot', apot_views.delete_apot,name='delete_apot'),
	re_path(r'^edit_apot_dialog', apot_views.edit_apot_dialog,name='edit_apot_dialog'),
	re_path(r'^save_apot', apot_views.save_apot,name='save_apot'),
	re_path(r'^save_edit_apot', apot_views.save_edit_apot,name='save_edit_apot'),
	re_path(r'^apots_data', apot_views.apots_data,name='apots_data'),
	re_path(r'^apot_dialog_view', apot_views.apot_dialog_view,name='apot_dialog_view'),	
	
	re_path(r'^rad_etish_genplan_edit', genplan_views.rad_etish_genplan_edit,name='rad_etish_genplan_edit'),
	re_path(r'^send_admin_genplan_edit', genplan_views.send_admin_genplan_edit,name='send_admin_genplan_edit'),
	re_path(r'^rad_etish_genplan_new', genplan_views.rad_etish_genplan_new,name='rad_etish_genplan_new'),
	re_path(r'^send_admin_genplan_new', genplan_views.send_admin_genplan_new,name='send_admin_genplan_new'),
	re_path(r'^create_genplan', genplan_views.create_genplan,name='create_genplan'),
	re_path(r'^list_sub_genplan', genplan_views.list_sub_genplan,name='list_sub_genplan'),
	re_path(r'^create_sub_sub_genplan_data', genplan_views.create_sub_sub_genplan_data,name='create_sub_sub_genplan_data'),
	re_path(r'^delete_sub_sub_genplan_data', genplan_views.delete_sub_sub_genplan_data,name='delete_sub_sub_genplan_data'),
	re_path(r'^delete_genplan', genplan_views.delete_genplan,name='delete_genplan'),
	re_path(r'^save_genplan', genplan_views.save_genplan, name='save_genplan'),
	re_path(r'^edit_genplan_dialog_tabs', genplan_views.edit_genplan_dialog_tabs, name='edit_genplan_dialog_tabs'),
	re_path(r'^save_edit_genplan', genplan_views.save_edit_genplan,name='save_edit_genplan'),
	re_path(r'^genplan_dialog_view', genplan_views.genplan_dialog_view,name='genplan_dialog_view'),
	re_path(r'^genplans_data', genplan_views.genplans_data,name='genplans_data'),
	re_path(r'^genplan_data/(?P<path>.*)', serve, {'document_root': 'genplan_data'}),


	re_path(r'^create_pdp', pdp_views.create_pdp,name='create_pdp'),
	re_path(r'^list_sub_pdp', pdp_views.list_sub_pdp,name='list_sub_pdp'),
	re_path(r'^create_sub_sub_pdp_data', pdp_views.create_sub_sub_pdp_data,name='create_sub_sub_pdp_data'),
	re_path(r'^delete_sub_sub_pdp_data', pdp_views.delete_sub_sub_pdp_data,name='delete_sub_sub_pdp_data'),
	re_path(r'^delete_pdp', pdp_views.delete_pdp,name='delete_pdp'),
	re_path(r'^save_pdp', pdp_views.save_pdp, name='save_pdp'),
	re_path(r'^edit_pdp_dialog_tabs', pdp_views.edit_pdp_dialog_tabs, name='edit_pdp_dialog_tabs'),
	re_path(r'^save_edit_pdp', pdp_views.save_edit_pdp,name='save_edit_pdp'),
	re_path(r'^pdp_dialog_view', pdp_views.pdp_dialog_view,name='pdp_dialog_view'),
	re_path(r'^pdps_data', pdp_views.pdps_data,name='pdps_data'),
	re_path(r'^pdp_data/(?P<path>.*)', serve, {'document_root': 'pdp_data'}),

	re_path(r'^admin_object_events', views.admin_object_events,name='admin_object_events'),
	re_path(r'^convert_data', views.convert_data,name='convert_data'),
	re_path(r'^subsistem/(?P<id>[1-9]{1})/$',views.subsistem,name='subsistem'),
	path('',views.index,name='index'),
	re_path(r'^contactform$',views.contactform,name='contactform'),
	re_path(r'^index$',views.index,name='index'),
	re_path(r'^old$',views.old,name='old'),
	re_path(r'^login_form$',views.login_form,name='login_form'),
	re_path(r'^mount$',views.mount,name='mount'),
	re_path(r'^main$',views.main_page,name='main_page'),
	re_path(r'^loginn$',views.loginn,name='loginn'),
	
	re_path(r'^logoutt$',views.logoutt,name='logoutt'),
	re_path(r'^map$',views.map,name='map'),

	re_path(r'^to_list$',views.to_list,name='to_list'),

	re_path(r'^documents$',views.documents,name='documents'),
	re_path(r'^proj/docs_for_pod9/(?P<path>.*)', serve, {'document_root': settings.DOCS_ROOT}),

	re_path(r'^load_pt$',views.load_pt,name='load_pt'),
	re_path(r'^info_maktab$',views.info_maktab,name='info_maktab'),
	re_path(r'^filtering$',views.filtering,name='filtering'),

	
]
