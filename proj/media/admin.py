from django.contrib import admin

from .models import Users


# Register your models here.

admin.site.site_header='Administrations'
admin.site.site_title= 'Administrations'

#new admin models

class UsersAdmin(admin.ModelAdmin):
	list_display = ['full_name','login','status']
	search_fields = ['login']
	ordering = ['status']

admin.site.register(Users, UsersAdmin)