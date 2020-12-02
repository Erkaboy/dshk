$(document).on('click','.button_save_edit_apot',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('apot_id',$(this).attr('data-apot_id'));
    $.ajax({
        url: '/save_edit_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 if (result!=-11) {
if(result==1){
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">O'zgartirish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
}
else{
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">O'zgartirish rad etildi. Oynani yangilang !</p>
</div>`);
}

$('#my_alert_modal')[0].click();
$('.button_save_edit_apot').prop('disabled','disabled');

}
else{
  console.log("Xatolik!!");
}
       


        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });


$(document).on('click','.button_save_new_apot',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('apot_id',$(this).attr('data-apot_id'));
  data.append('confirm',$(this).attr('data-confirm'));
    $.ajax({
        url: '/save_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

 if (result==1) {

$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Saqlash muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }
 if (result==2) {        
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }

$('.button_save_new_apot').prop('disabled','disabled');
},
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });


$(document).on('click','.button_delete_apot',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('apot_id',$(this).attr('data-apot_id'));
  data.append('status',$(this).attr('data-status'));
  data.append('type','last_delete');
    $.ajax({
        url: '/delete_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

 if (result==0) {
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">O'chirish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }
if (result>0) {
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 } 
 $('.button_delete_apot').prop('disabled','disabled');
 $('.button_edit_apot').prop('disabled','disabled');            
},
      error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});

$(document).on('click','.button_delete_apot_admin',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('apot_id',$(this).attr('data-apot_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('type','admin_delete');
    $.ajax({
        url: '/delete_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 if (result==1) {
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">O'chirish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }
if (result==2) {
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 } 
 $('.button_delete_apot_admin').prop('disabled','disabled');
  


        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});


 $('#button_create_apot_dialog').on('click',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
    $.ajax({
        url: '/list_sub_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 
var text=`
<div class='apot_edit_div' id='apot_edit_div_id' data-layer_id='-1' data-layer_status='1'>
    <h2 class='title_sub_main'>Умумий маълумотлар</h2>

    <hr class='hr_admin_tab'>

<label for='apot_fy' class='label_admin_input'><span >Qishloq fuqarolar yig'ini nomi:</span></label> 
<input id="apot_fy" type="text" class = "form-control">

<label for='apot_vil' class='label_admin_input'><span>Viloyat:</span></label> 
<select id="apot_vil" class = "form-control">
`
for (var vil in viloyat){
  text+= `<option value='`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</option>`
}
text+=`</select>
<label for='apot_tum_shah' class='label_admin_input'><span >Tuman,shahar nomi:</span></label> 
<input id="apot_tum_shah" type="text" class = "form-control">

<label for='apot_soata' class='label_admin_input'><span>Mamuriy hududiy_birliklarni belgilash tizimi kodi:</span></label> 
<input id="apot_soata" type="text" class = "form-control">

<label for='apot_apt' class='label_admin_input'><span>Aholi punktining tipi:</span></label> 
<input id="apot_apt" type="text" class = "form-control">

<label for='apot_apm' class='label_admin_input'><span>Aholi punktining maqomi:</span></label> 
<input id="apot_apm" type="text" class = "form-control">

<label for='apot_lt' class='label_admin_input'><span>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquvchi:</span></label>
<input id="apot_lt" type="text" class = "form-control">

<label for='apot_shchsj' class='label_admin_input'><span>Shahar chegarasi loyihasi hujjatlari saqlandigan joy:</span></label> 
<input id="apot_shchsj" type="text" class = "form-control">


<label for='apot_aplm' class='label_admin_input'><span>Aholi punktining loyihaviy maydoni ga:</span></label> 
<input id="apot_aplm" type="text" class = "form-control">

<label for='apot_als' class='label_admin_input'><span>Aholining loyihaviy soni:</span></label> 
<input id="apot_als" type="text" class = "form-control">

<label for='apot_qfym' class='label_admin_input'><span>QFY markazi:</span></label> 
<input id="apot_qfym" type="text" class = "form-control">

<label for='apot_baps' class='label_admin_input'><span>Bo'ysinuvchi aholi punktlari soni:</span></label> 
<input id="apot_baps" type="text" class = "form-control">

<label for='apot_ichy' class='label_admin_input'><span>Ishlab chiqalgan yil:</span></label> 
<input id="apot_ichy" type="text" class = "form-control">

<label for='apot_icha' class='label_admin_input'><span>Ishlab_ chiqarish asosi:</span></label> 
<input id="apot_icha" type="text" class = "form-control">

<label for='apot_shkq' class='label_admin_input'><span>Shaharsozlik kengashi qarori:</span></label> 
<input id="apot_shkq" type="text" class = "form-control">

<label for='apot_ast' class='label_admin_input'><span>Aholi soni tip:</span></label> 
<input id="apot_ast" type="text" class = "form-control">

<label for='apot_thm' class='label_admin_input'><span>Tasdiqlanganlik holati</span></label> 

<select id="apot_thm" class = "form-control secret_inputs_checkbox">
<option value='1' >Tasdiqlangan</option>
<option value='0' >Tasdiqlanmagan</option>
<option value='3' >Rejalashtirilgan</option>
<option value='2' selected >Ma'lumot yo'q</option>
</select>

<div  id='secret_inputs_div_plan' style='display:none;'>

<label for='apot_rqh' class='label_admin_input'><span>Qaysi hujjat asosida reja qilingan:</span></label> 
<input id="apot_rqh" type="text" class = "form-control ">

</div>

<div  id='secret_inputs_div' style='display:none;'>

<label for='apot_to' class='label_admin_input'><span>Shahar chegarasi loyihasini tasdiqlangan organ:</span></label> 
<input id="apot_to" type="text" class = "form-control ">

<label for='apot_lhr' class='label_admin_input'><span >Shahar chegarasi loyiha tasdiqlash to'g'risidagi hujjat raqami va sanasi:</span></label> 
<input id="apot_lhr" type="text"  class = "form-control">
</div>

<table class="table dialog_table_main_tab">`;

for(var i in result.sub_apot){
 
text+=`<tr><td><span class="head_admin_tab">`+result.sub_apot[i].nomi+`</span></td><td></td></tr>
<tr>
<td>
<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='apot_sub_file_`+result.sub_apot[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger" id='delete_apot_sub_file_`+result.sub_apot[i].id+`' value='delete'>
</td>
</tr>`;
}
text+=`

</table>

<br>
    <input type="button" id="create_apot_button" class='btn btn-success' value="Saqlash">
    <input type="button" id="delete_apot_button" class='btn btn-danger' value="Delete">
  <div id="load_alert_div"></div>
</div>`;

$('#modal_create_apot').html(text);
$('#modal_create_apot').dialog('open');




        },
        error:function(){
          console.log("Ajaxda xatolik!!");
        }
      });

});


$(document).on('click','.button_edit_apot',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('apot_id',$(this).attr('data-apot_id'));
  data.append('status',$(this).attr('data-status'));
    $.ajax({
        url: '/edit_apot_dialog',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 var apot_data = JSON.parse(result[0].apot_data);
 var data = apot_data.features[0].properties;

apot_data.features[0].geometry.coordinates.forEach(function(corr,i){
var polygon={type:'Polygon',coordinates:corr};
L.geoJson(polygon,{
  onEachFeature:function(features,layer){
    drawnItems.addLayer(layer);
  }
});
});

var text=`
<div class='apot_edit_div' id='apot_edit_div_id' data-layer_id='`+result[0].apot_id+`' data-layer_status='`+result[0].status+`'>
    <h2 class='title_sub_main'>Умумий маълумотлар</h2>
    <hr class='hr_admin_tab'>

<label for='apot_fy' class='label_admin_input'><span >Qishloq fuqarolar yig'ini nomi:</span></label> 
<input id="apot_fy"  type="text" class = "form-control">

<label for='apot_vil' class='label_admin_input'><span>Viloyat:</span></label> 
<select id="apot_vil" class = "form-control">
`
for (var vil in viloyat){
  if(data.respublika_viloyat==viloyat[vil].id){
  text+=`<option selected value="`+viloyat[vil].id+`" >`+viloyat[vil].disUz+`</option>`;
}
else{
text+=`<option value="`+viloyat[vil].id+`" >`+viloyat[vil].disUz+`</option>`
}
}
text+=`
</select>
<label for='apot_tum_shah' class='label_admin_input'><span >Tuman,shahar nomi:</span></label> 
<input id="apot_tum_shah"  type="text" class = "form-control">

<label for='apot_soata' class='label_admin_input'><span>Mamuriy hududiy_birliklarni belgilash tizimi kodi:</span></label> 
<input id="apot_soata"  type="text" class = "form-control">

<label for='apot_apt' class='label_admin_input'><span>Aholi punktining tipi:</span></label> 
<input id="apot_apt"  type="text" class = "form-control">

<label for='apot_apm' class='label_admin_input'><span>Aholi punktining maqomi:</span></label> 
<input id="apot_apm"  type="text" class = "form-control">

<label for='apot_lt' class='label_admin_input'><span>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquvchi:</span></label>
<input id="apot_lt"  type="text" class = "form-control">
<label for='apot_shchsj' class='label_admin_input'><span>Shahar chegarasi loyihasi hujjatlari saqlandigan joy:</span></label> 
<input id="apot_shchsj"  type="text" class = "form-control">

<label for='apot_aplm' class='label_admin_input'><span>Aholi punktining loyihaviy maydoni ga:</span></label> 
<input id="apot_aplm"  type="text" class = "form-control">

<label for='apot_als' class='label_admin_input'><span>Aholining loyihaviy soni:</span></label> 
<input id="apot_als"  type="text" class = "form-control">

<label for='apot_qfym' class='label_admin_input'><span>QFY markazi:</span></label> 
<input id="apot_qfym"  type="text" class = "form-control">

<label for='apot_baps'  class='label_admin_input'><span>Bo'ysinuvchi aholi punktlari soni:</span></label> 
<input id="apot_baps"  type="text" class = "form-control">

<label for='apot_ichy' class='label_admin_input'><span>Ishlab chiqalgan yil:</span></label> 
<input id="apot_ichy"  type="text" class = "form-control">

<label for='apot_icha' class='label_admin_input'><span>Ishlab_ chiqarish asosi:</span></label> 
<input id="apot_icha"  type="text" class = "form-control">

<label for='apot_shkq' class='label_admin_input'><span>Shaharsozlik kengashi qarori:</span></label> 
<input id="apot_shkq"  type="text" class = "form-control">

<label for='apot_ast' class='label_admin_input'><span>Aholi soni tip:</span></label> 
<input id="apot_ast"  type="text" class = "form-control">


<label for='apot_thm' class='label_admin_input'><span>Tasdiqlanganlik holati</span></label> 
<select id="apot_thm" class = "form-control secret_inputs_checkbox">`;
if(data.tasdiqlanganligi=='1'){
text+=`<option value='1'selected >Tasdiqlangan</option>
       <option value='0'>Tasdiqlanmagan</option>
       <option value='3'>Rejalashtirilgan</option>
       <option value='2' >Ma'lumot yo'q</option>`;
}
else 
{
if(data.tasdiqlanganligi=='0'){
text+=`<option value='1' >Tasdiqlangan</option>
      <option value='0' selected >Tasdiqlanmagan</option>
      <option value='3'>Rejalashtirilgan</option>
      <option value='2' >Ma'lumot yo'q</option>`;
}
else{
  if(data.tasdiqlanganligi=='3'){

text+=`<option value='1' >Tasdiqlangan</option>
       <option value='0' >Tasdiqlanmagan</option>
       <option value='3' selected >Rejalashtirilgan</option>
       <option value='2' >Ma'lumot yo'q</option>`;

  }
  else{
text+=`<option value='1' >Tasdiqlangan</option>
       <option value='0' >Tasdiqlanmagan</option>
       <option value='3'  >Rejalashtirilgan</option>
       <option value='2' selected >Ma'lumot yo'q</option>`;
}
}
}

text+=`</select>`
if(data.tasdiqlanganligi=='1'){
text+=`<div id='secret_inputs_div' style='display:block;'>`;
}
else{
text+=`<div id='secret_inputs_div' style='display:none;'>`;
}

text+=`

<label for='apot_to' class='label_admin_input'><span>Shahar chegarasi loyihasini tasdiqlangan organ:</span></label> 
<input id="apot_to"  type="text" class = "form-control ">

<label for='apot_lhr' class='label_admin_input'><span >Shahar chegarasi loyiha tasdiqlash to'g'risidagi hujjat raqami va sanasi:</span></label> 
<input id="apot_lhr"  type="text"  class = "form-control">
</div>`;


if(data.tasdiqlanganligi=='3'){
text+=`<div id='secret_inputs_div_plan' style='display:block;'>`;
}
else{
text+=`<div id='secret_inputs_div_plan' style='display:none;'>`;
}

text+=`
<label for='apot_rqh' class='label_admin_input'><span>Qaysi hujjat asosida reja qilingan:</span></label> 
<input id="apot_rqh" type="text" class = "form-control ">

</div>


<table class="table dialog_table_main_tab">`;

for(var i in result[0].sub_apot){

text+=`<tr><td><span class="head_admin_tab">`+result[0].sub_apot[i].nomi+`</span></td><td></td></tr>
<tr>
<td>
<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='apot_sub_file_`+result[0].sub_apot[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger" id='delete_apot_sub_file_`+result[0].sub_apot[i].id+`' value='delete'>
</td>
</tr>`;
}

text+=`

</table>
<br>
    <input type="button" id="create_apot_button" class='btn btn-success' value="O'zgartirish">
  <div id="load_alert_div"></div>
</div>`;

$('#modal_create_apot').html(text);
$('#modal_create_apot').dialog('open');

$('#apot_fy').val(data.fuqarolar_yiginlari);
$('#apot_tum_shah').val(data.tuman_shahar);
$('#apot_soata').val(data.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi);
$('#apot_apt').val(data.aholi_punktining_tipi);
$('#apot_apm').val(data.aholi_punktining_maqomi);
$('#apot_lt').val(data.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv);
$('#apot_shchsj').val(data.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy);
$('#apot_aplm').val(data.aholi_punktining_loyihaviy_maydoni_ga);
$('#apot_als').val(data.aholining_loyihaviy_soni);
$('#apot_qfym').val(data.kfi_markazi);
$('#apot_baps').val(data.boysinuvchi_aholi_punktlari_soni);
$('#apot_ichy').val(data.ishlab_chiqalgan_yili);
$('#apot_icha').val(data.ishlab_chiqarish_asosi);
$('#apot_shkq').val(data.shaharsozlik_kengashi_qarori);
$('#apot_ast').val(data.aholi_soni_tip);
$('#apot_to').val(data.shahar_chegarasi_loyihasini_tasdiqlangan_organ);
$('#apot_lhr').val(data.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san);

$('#apot_rqh').val(data.reja_qilingan_hujjat);


for( var i in result[0].sub_apot_data){
  $('#apot_sub_file_'+result[0].sub_apot_data[i].sub_apot_id).parent().addClass('bg-success');
   $('#apot_sub_file_'+result[0].sub_apot_data[i].sub_apot_id).next().text('Fayl biriktirilgan');
}
  },
      error:function(){
      console.log('Ajaxda xatolik!!');
        }
      });

  });


 

$(document).on('click','#delete_apot_button',function(){
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('apot_id',$('#apot_edit_div_id').attr('data-layer_id'));
data.append('type','first_delete');
    $.ajax({
        url: '/delete_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
        
if(result==1){
$('#apot_edit_div_id').attr('data-layer_id',-1);

$("#apot_edit_div_id input[type='text']").each(function(){
$(this).val('');
});

$("input[id^='apot_sub_file_']").each(function(){
$(this).val('');
$(this).parent().removeClass('bg-success');
$(this).next().text('Faylni tanlang');
});

$('#load_alert_div').html("<p>O'chirildi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

}
        },
 error:function(){}

      });

});

$(document).on('click',"input[id^='delete_apot_sub_file_']",function(){
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('apot_id',$('#apot_edit_div_id').attr('data-layer_id'));
data.append('status',$('#apot_edit_div_id').attr('data-layer_status'));
data.append('sub_apot_id',$(this).attr('id').split('_')[4]);

   $.ajax({
        url: '/delete_apot_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
$('#apot_edit_div_id').attr('data-layer_id',result.apot_id);
$('#apot_edit_div_id').attr('data-layer_status',result.status);     
$('input[id="apot_sub_file_' +result.sub_apot_id+'"]').parent().removeClass('bg-success');
$('input[id="apot_sub_file_' +result.sub_apot_id+'"]').val('');
$('input[id="apot_sub_file_' +result.sub_apot_id+'"]').next().text('Faylni tanlang')
},
        error: function(){
          console.log('Ajaxda xatolik !!');
        }});


});

$(document).on('click','.delete_apot_main_files',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('apot_id',$('#apot_edit_div_id').attr('data-layer_id'));
data.append('status',$('#apot_edit_div_id').attr('data-layer_status'));
data.append('type','main_files');
data.append('file_type',$(this).attr('data-file_type'));

    $.ajax({
        url: '/delete_apot_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
$('#apot_'+result.file_type).val('');
$('#apot_'+result.file_type).next().text('Faylni tanlang');   
$('#apot_edit_div_id').attr('data-layer_id',result.apot_id);
$('#apot_edit_div_id').attr('data-layer_status',result.status);      

},
        error: function(){
          console.log('Ajaxda xatolik !!');
        }});
});




$('#modal_create_apot').dialog({
  resizable: false,
  autoOpen:false,
  height: 700,
  width: 550,
  modal: false,
  dialogClass:'modal_create_apot',
   create:function(e){
$('.modal_create_apot').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  close:function(){
drawnItems.clearLayers();

  },
  show:{
    effect:'blind',
    duration:200,
  },
    hide:{
    effect:'blind',
    duration:200,
  }
});



$(document).on('click','#create_apot_button',function(){
  
$('#load_alert_div').css({'display':'none'});

if(drawnItems.toGeoJSON().features.length==0){
$('#load_alert_div').html("<p>Vektorli ma'lumotlar kiritilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');
}
else{

var layer_type=drawnItems.toGeoJSON().features[0].geometry.type;
var json_str;

if(layer_type=='Polygon'){
 json_str='{"type": "MultiPolygon","coordinates":['; 
 layer_type='polygon';

for (var i in drawnItems.toGeoJSON().features){
json_str+=JSON.stringify(drawnItems.toGeoJSON().features[i].geometry.coordinates);
if(i!=drawnItems.toGeoJSON().features.length-1)
json_str+=',';
}
json_str+=']}';

var data = new FormData();

data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('apot_id',$('#apot_edit_div_id').attr('data-layer_id'));
data.append('status', $('#apot_edit_div_id').attr('data-layer_status'));
data.append('geometry',json_str);

data.append('apot_vil',$('#apot_vil').val());
data.append('apot_thm',$('#apot_thm').val());

var itemsIndex = new Array();
$("input[id^='apot_sub_file_']").each(function (index, value) {
                if (value.files[0]) {
                    itemsIndex.push($(this).attr('id').split('_')[3]);
                    data.append('sub_apot_' + $(this).attr('id').split('_')[3], value.files[0])
                }
            });
data.append('itemsIndex', itemsIndex.toString());

$("#apot_edit_div_id input[type='text']").each(function(){
data.append($(this).attr('id'),$(this).val());
});
 
    $.ajax({
        url: '/create_apot',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

for (var i in result.sub_apot_ids){
$('input[id="apot_sub_file_' +result.sub_apot_ids[i]+'"]').parent().addClass('bg-success');
$('input[id="apot_sub_file_' +result.sub_apot_ids[i]+'"]').val('');
$('input[id="apot_sub_file_' +result.sub_apot_ids[i]+'"]').next().text('Fayl biriktirilgan')
}

$('#load_alert_div').html("<p>Saqlandi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

$('#apot_edit_div_id').attr('data-layer_id',result.apot_id);
$('#apot_edit_div_id').attr('data-layer_status',result.status);


},
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});

}
else{

$('#load_alert_div').html("<p>Vektorli ma'lumotda xatolik bor!!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');

}

}
}); 


  





