$(document).on('click','.button_rad_etish_genplan_new',function(){

if($('#comment_gen').val()==""){
  $('#comment_gen').css({'display':'block'});
 }
 else{
  $(this).css({'cursor':'wait'});
 var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$(this).attr('data-genplan_id'));
data.append('comment',$('#comment_gen').val());
$.ajax({
        url: '/rad_etish_genplan_new',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
          if (result==1){

$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etish muoffaqqiyatli amalga oshirildi!</p>
</div>`);
$('#my_alert_modal')[0].click();

 $('.button_save_new_genplan').prop('disabled','disabled');
 $('.button_rad_etish_genplan_new').prop('disabled','disabled');   
 $('.button_rad_etish_genplan_new').css({'cursor':'no-drop'});  

}
else{
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">Rad etishda xatolik sodir bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
}
}
});
}});


$(document).on('click','.button_rad_etish_genplan_edit',function(){

if($('#comment_gen').val()==""){
  $('#comment_gen').css({'display':'block'});
 }
 else{
  $(this).css({'cursor':'wait'});
 var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$(this).attr('data-genplan_id'));
data.append('comment',$('#comment_gen').val());
$.ajax({
        url: '/rad_etish_genplan_edit',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
          if (result==1){

$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etish muoffaqqiyatli amalga oshirildi!</p>
</div>`);
$('#my_alert_modal')[0].click();

 $('.button_save_edit_genplan').prop('disabled','disabled');
 $('.button_rad_etish_genplan_edit').prop('disabled','disabled');   
 $('.button_rad_etish_genplan_edit').css({'cursor':'no-drop'});  
}

else{
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">Rad etishda xatolik sodir bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
}
}
});
}});


$(document).on('click','.button_send_new_admin_genplan',function(){

if($('#comment_gen').val()==""){
$('#comment_gen').css({'display':'block'});
}

else{
$(this).css({'cursor':'wait'});

var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:genplans_edit&outputFormat=application%2Fjson&cql_filter=id='"+$(this).attr('data-genplan_id')+"'";
var genplan_id=$(this).attr('data-genplan_id');
$.getJSON(url, function(result)
{
var bounds=gsch.bbox(gsch.multiPolygon(result.features[0].geometry.coordinates));
var data = new FormData();
data.append('x0',bounds[0]);
data.append('y0',bounds[1]);
data.append('x1',bounds[2]);
data.append('y1',bounds[3]);
data.append('comment',$('#comment_gen').val());

data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',genplan_id);
  $.ajax({
        url: '/send_admin_genplan_new',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
          if (result==1){
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Adminga xabar muoffaqqiyatli junatildi!</p>
</div>`);
$('#my_alert_modal')[0].click();

 $('.button_edit_genplan').prop('disabled','disabled');
 $('.button_save_new_genplan').prop('disabled','disabled');     
 $('.button_send_new_admin_genplan').prop('disabled','disabled');  
 $('.button_send_new_admin_genplan').css({'cursor':'no-drop'});  
}
else{
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">Xabar junatishda xatolik bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
}
}
});
}
);
}
});



$(document).on('click','.button_send_edit_admin_genplan',function(){

if($('#comment_gen').val()==""){
$('#comment_gen').css({'display':'block'});
}

else{
$(this).css({'cursor':'wait'});

var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:genplans_edit&outputFormat=application%2Fjson&cql_filter=id='"+$(this).attr('data-genplan_id')+"'";
var genplan_id=$(this).attr('data-genplan_id');
$.getJSON(url, function(result)
{
var bounds=gsch.bbox(gsch.multiPolygon(result.features[0].geometry.coordinates));
var data = new FormData();
data.append('x0',bounds[0]);
data.append('y0',bounds[1]);
data.append('x1',bounds[2]);
data.append('y1',bounds[3]);
data.append('comment',$('#comment_gen').val());

data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',genplan_id);
  $.ajax({
        url: '/send_admin_genplan_edit',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
          if (result==1){
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Adminga xabar muoffaqqiyatli junatildi!</p>
</div>`);
$('#my_alert_modal')[0].click();

 $('.button_edit_genplan').prop('disabled','disabled');
 $('.button_send_edit_admin_genplan').prop('disabled','disabled'); 
 $('.button_save_edit_genplan').prop('disabled','disabled');    

 $('.button_send_edit_admin_genplan').css({'cursor':'no-drop'});  
}
else{
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">Xabar junatishda xatolik bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
}
}
});
}
);
}
});


$(document).on('click','.button_delete_genplan',function(){

if($('#comment_gen').val()==""){
  $('#comment_gen').css({'display':'block'});
}
else{
  $(this).css({'cursor':'wait'});

var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:genplans&outputFormat=application%2Fjson&cql_filter=id='"+$(this).attr('data-genplan_id')+"'";
var genplan_id=$(this).attr('data-genplan_id');
var genplan_status=$(this).attr('data-genplan_id');
$.getJSON(url, function(result)
{

var bounds=gsch.bbox(gsch.multiPolygon(result.features[0].geometry.coordinates));
var data = new FormData();
data.append('x0',bounds[0]);
data.append('y0',bounds[1]);
data.append('x1',bounds[2]);
data.append('y1',bounds[3]);
data.append('comment',$('#comment_gen').val());

 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
 data.append('genplan_id',genplan_id);
 data.append('status',genplan_status);
 data.append('type','last_delete');
    $.ajax({
        url: '/delete_genplan',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

 if (result==-1){
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">O'chirish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }
if (result>-1) {
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">O'chirishga xabar junatishda xatolik sodir bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
 } 
 $('.button_delete_genplan').prop('disabled','disabled');
 $('.button_delete_genplan').css({'cursor':'no-drop'});
 $('.button_edit_genplan').prop('disabled','disabled');            
},
      error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });

   } 
});

$(document).on('click','.button_delete_genplan_admin',function(){
  
if($(this).attr('data-confirm')==1){
$(this).css({'cursor':'wait'});
 var data = new FormData();
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('genplan_id',$(this).attr('data-genplan_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('type','admin_delete');
    $.ajax({
        url: '/delete_genplan',
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
if (result==0) {
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">O'chirishda xatolik sodir bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
 } 
$('.button_delete_genplan_admin').prop('disabled','disabled');
$('.button_delete_genplan_admin').css({'cursor':'no-drop'});
  
        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  }
  else{

if($('#comment_gen').val()==""){
$('#comment_gen').css({'display':'block'});
}
else{
$(this).css({'cursor':'wait'});
var data = new FormData();
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('genplan_id',$(this).attr('data-genplan_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('type','admin_delete');
  data.append('comment',$('#comment_gen').val());
    $.ajax({
        url: '/delete_genplan',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 if (result==1) {
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }
if (result==0) {
$('#myalert_content').html(`<div class="alert alert-success">
<p class="alert_p">Rad etishda xatolik sodir bo'ldi. Qaytadan urinib ko'ring!</p>
</div>`);
$('#my_alert_modal')[0].click();
 } 
 $('.button_delete_genplan_admin').prop('disabled','disabled');
 $('.button_delete_genplan_admin').css({'cursor':'no-drop'});
  },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });

}

  }
});

$(document).on('click','.button_save_new_genplan',function(){
  $(this).css({'cursor':'wait'});
  var data = new FormData();
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('genplan_id',$(this).attr('data-genplan_id'));
  data.append('confirm',$(this).attr('data-confirm'));
    $.ajax({
        url: '/save_genplan',
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
<p class="alert_p">O'chirish muoffaqqiyatli amalga oshirildi. Oynani yangilang!</p>
</div>`);
$('#my_alert_modal')[0].click();
 }

$('.button_save_new_genplan').prop('disabled','disabled');
$('.button_save_new_genplan').css({'cursor':'no-drop'});
$('.button_rad_etish_genplan_new').prop('disabled','disabled');
$('.button_edit_genplan').prop('disabled','disabled');

},
error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });

$(document).on('click','.button_save_edit_genplan',function(){
  $(this).css({'cursor':'wait'});
  var data = new FormData();
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('genplan_id',$(this).attr('data-genplan_id'));
    $.ajax({
        url: '/save_edit_genplan',
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
<p class="alert_p">Bekor qilindi. Oynani yangilang !</p>
</div>`);
}

$('#my_alert_modal')[0].click();
$('.button_save_edit_genplan').prop('disabled','disabled');
$('.button_save_edit_genplan').css({'cursor':'no-drop'});

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

$(document).on('click','.button_edit_genplan',function(){
  var data = new FormData();
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('genplan_id',$(this).attr('data-genplan_id'));
  data.append('status',$(this).attr('data-status'));
    $.ajax({
        url: '/edit_genplan_dialog_tabs',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 var genplan_data = JSON.parse(result[0].genplan_data);
 var data = genplan_data.features[0].properties;

genplan_data.features[0].geometry.coordinates.forEach(function(corr,i){
var polygon={type:'Polygon',coordinates:corr};
L.geoJson(polygon,{
  onEachFeature:function(features,layer){
    drawnItems.addLayer(layer);
  }
});

}); 

var text=`<div id="tabs">
  <ul data-layer_id='`+result[0].genplan_id+`' data-layer_status='`+result[0].status+`' id="ul_dialog_tab_create">
    <li data-val='`+result[0].genplan_id+`' ><a href="#tabs-00">Умумий маълумотлар</a></li>`;
 
    for(var i in result[0].sub_genplans){
      text+=`<li><a href="#tabs-`+(result[0].sub_genplans)[i].id+`"> `+(result[0].sub_genplans)[i].nomi+`</a></li>`;
    }
  text+=`</ul>


<div id="tabs-00">
    <h2 class='title_sub_main'>Умумий маълумотлар</h2>
    <hr class='hr_admin_tab'>

<label for='genplan_ahpn' class='label_admin_input'><span >Aholi punktining nomi:</span></label> 
<input id="genplan_ahpn"  type="text" class = "form-control">

<label for='genplan_soata' class='label_admin_input'><span>Mamuriy hududiy_birliklarni belgilash tizimi kodi:</span></label> 
<input id="genplan_soata"  type="text" class = "form-control">

<label for='genplan_apt' class='label_admin_input'><span>Aholi punktining tipi:</span></label> 
<input id="genplan_apt"  type="text" class = "form-control">

<label for='genplan_apm' class='label_admin_input'><span>Aholi punktining maqomi:</span></label> 
<input id="genplan_apm"  type="text" class = "form-control">

<label for='genplan_vil' class='label_admin_input'><span>Viloyat:</span></label> 
<select id="genplan_vil" class = "form-control">
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
<label for='genplan_tum_shah' class='label_admin_input'><span >Tuman,shahar nomi:</span></label> 
<input id="genplan_tum_shah"  type="text" class = "form-control">

<label for='genplan_lt' class='label_admin_input'><span>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquvchi:</span></label>
<input id="genplan_lt"  type="text" class = "form-control">

<label for='genplan_ichy' class='label_admin_input'><span>Ishlab chiqalgan yil:</span></label> 
<input id="genplan_ichy"  type="text" class = "form-control">

<label for='genplan_shchsj' class='label_admin_input'><span>Shahar chegarasi loyihasi hujjatlari saqlandigan joy:</span></label> 
<input id="genplan_shchsj"  type="text" class = "form-control">

<label for='genplan_aplm' class='label_admin_input'><span>Aholi punktining loyihaviy maydoni ga:</span></label> 
<input id="genplan_aplm"  type="text" class = "form-control">

<label for='genplan_als' class='label_admin_input'><span>Aholining loyihaviy soni:</span></label> 
<input id="genplan_als" type="text" class = "form-control">

<label for='genplan_thm' class='label_admin_input'><span>Tasdiqlanganlik holati</span></label> 

<select id="genplan_thm" class = "form-control secret_inputs_checkbox">`;

if(data.tasdiqlanganligi=='1'){
text+=`<option value='1'selected >Tasdiqlangan</option>
       <option value='0'>Tasdiqlanmagan</option>
       <option value='3'>Rejalashtirilgan</option>`;
}
else{
  if(data.tasdiqlanganligi=='0'){
text+=`<option value='1' >Tasdiqlangan</option>
       <option value='0' selected>Tasdiqlanmagan</option>
       <option value='3' >Rejalashtirilgan</option>`;
}
else{
  text+=`<option value='1' >Tasdiqlangan</option>
         <option value='0' >Tasdiqlanmagan</option>
         <option value='3' selected>Rejalashtirilgan</option>`;

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

<label for='genplan_to' class='label_admin_input'><span>Shahar chegarasi loyihasini tasdiqlangan organ:</span></label> 
<input id="genplan_to"  type="text" class = "form-control">

<label for='genplan_lhr' class='label_admin_input'><span >Shahar chegarasi loyiha tasdiqlash to'g'risidagi hujjat raqami va sanasi:</span></label> 
<input id="genplan_lhr"  type="text" class = "form-control">
</div>`;


if(data.tasdiqlanganligi=='3'){
text+=`<div id='secret_inputs_div_plan' style='display:block;'>`;
}
else{
text+=`<div id='secret_inputs_div_plan' style='display:none;'>`;
}

text+=`

<label for='genplan_rqh' class='label_admin_input'><span>Qaysi hujjat asosida reja qilingan::</span></label> 
<input id="genplan_rqh"  type="text" class = "form-control">

</div>




<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">Grafik ma'lumotlar:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='genplan_gm'>
<span class="span_admin_tab">`+repath(data.grafik_malumot)+`</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_genplan_main_files" data-file_type='gm'  value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Izohlovchi ma'lumot:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='genplan_im'>
<span class="span_admin_tab">`+repath(data.izohlovchi_malumot)+`</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_genplan_main_files"  data-file_type='im' value='delete'>
</td></tr>
</table>

<br>
    <input type="button" id="create_genplan_button" class='btn btn-primary' value="O'zgartirish">
   </div>`;


for(var i in result[0].sub_genplans){
  text+=`<div class='tabs_main' id="tabs-`+(result[0].sub_genplans)[i].id+`" data-sub_genplan_id='`+(result[0].sub_genplans)[i].id+`' data-id='-1'>
<h2 class='title_sub_main'>`+(result[0].sub_genplans)[i].nomi+`</h2>
 <hr class='hr_admin_tab'>
  `;
  text+=`
<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">PDF:</span></td><td></td></tr>
<tr>
<td><label class="form-control">

<input type='file' style='display:none;' class="input_file" id='pdf_file_`+(result[0].sub_genplans)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger" id='delete_pdf_file_`+(result[0].sub_genplans)[i].id+`' value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Geotif:</span></td><td></td></tr>
<tr>
<td> <label class="form-control">
<input type='file' style='display:none;' class="input_file" id='geotiff_file_`+(result[0].sub_genplans)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button'  class="btn btn-danger" id='delete_sub_genplan_`+(result[0].sub_genplans)[i].id+`' value='delete'>
</td></tr>`;
 
  for(var j in result[0].sub_sub_genplans){

    text+=`
<tr><td><span class="head_admin_tab">`+(result[0].sub_sub_genplans)[j].nomi+`:</span></td><td></td></tr>
<tr><td><label class="form-control">
<input type="file" data-val_sub_sub_data_id='`+(result[0].sub_sub_genplans)[j].id+`' id='sub_sub_`+(result[0].sub_genplans)[i].id+`_`+(result[0].sub_sub_genplans)[j].id+`' class="input_file"  style="display: none;" >
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td><td style='width:70px;'>
<input type="button" value="delete" id='delete_sub_sub_`+(result[0].sub_genplans)[i].id+`_`+(result[0].sub_sub_genplans)[j].id+`' class="btn btn-danger">
</td></tr>`;
  }
text+=`
</table>

<input type='button' style='float:left;' class='admin_genplan_btn btn btn-primary' data-sub_genplan_id='`+(result[0].sub_genplans)[i].id+`' value="O'zgartirish">
<input type='button' class="btn btn-danger" style='float:left; margin-left:10px;' id='delete_sub_all_`+(result[0].sub_genplans)[i].id+`' value='Delete all'>
 </div>`; 
 }
text+=`
<div id="load_alert_div"></div>
</div>`;
$('#modal_create_genplan').html(text);
$('#modal_create_genplan').dialog('open');

$('#genplan_ahpn').val(data.aholi_punktining_nomi);
$('#genplan_soata').val(data.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi);
$('#genplan_apt').val(data.aholi_punktining_tipi);
$('#genplan_apm').val(data.aholi_punktining_maqomi);
$('#genplan_tum_shah').val(data.tuman_shahar);
$('#genplan_lt').val(data.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv);
$('#genplan_ichy').val(data.ishlab_chiqalgan_yili);
$('#genplan_shchsj').val(data.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy);
$('#genplan_aplm').val(data.aholi_punktining_loyihaviy_maydoni_ga);
$('#genplan_als').val(data.aholining_loyihaviy_soni);
$('#genplan_to').val(data.shahar_chegarasi_loyihasini_tasdiqlangan_organ);
$('#genplan_lhr').val(data.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san);

$('#genplan_rqh').val(data.reja_qilingan_hujjat); 
 
$("#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
$("#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
$("a[href='#tabs-00']").parent().addClass('bg-success');
for (var i in result[0].sub_genplan_data){

if(result[0].sub_genplan_data[i].geotif!=""){
$("input[id='geotiff_file_"+result[0].sub_genplan_data[i].sub_genplan_id_id+"']").parent().addClass('bg-success');
$("input[id='geotiff_file_"+result[0].sub_genplan_data[i].sub_genplan_id_id+"']").next().text('Fayl biriktirilgan');
}

if(result[0].sub_genplan_data[i].pdf!=""){
$("input[id='pdf_file_"+result[0].sub_genplan_data[i].sub_genplan_id_id+"']").parent().addClass('bg-success');
$("input[id='pdf_file_"+result[0].sub_genplan_data[i].sub_genplan_id_id+"']").next().text('Fayl biriktirilgan');
}

$("a[href='#tabs-"+result[0].sub_genplan_data[i].sub_genplan_id_id+"']").parent().addClass('bg-success');
$('input[id^="sub_sub_' + result[0].sub_genplan_data[i].sub_genplan_id_id + '_"]').each(function(e)
{

$(this).attr('data-val_sub_sub_data_id',$(this).attr('data-val_sub_sub_data_id')+'_'+result[0].sub_genplan_data[i].id);
});

}



for (var i in result[0].sub_sub_genplan_datas){
  for (var j in result[0].sub_sub_genplan_datas[i]){


$('input[data-val_sub_sub_data_id="' + result[0].sub_sub_genplan_datas[i][j].sub_sub_genplan_id_id+ '_'+result[0].sub_sub_genplan_datas[i][j].Sub_genplan_data_id_id +'"]').next().text("Fayl biriktirilgan ");
$('input[data-val_sub_sub_data_id="' + result[0].sub_sub_genplan_datas[i][j].sub_sub_genplan_id_id+ '_'+result[0].sub_sub_genplan_datas[i][j].Sub_genplan_data_id_id +'"]').parent().addClass('bg-success');
   }
}

         },
            error:function(){

               console.log('Ajaxda xatolik!!'); 
             }
    }); 
});


$('#button_create_genplan_dialog').on('click',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
    $.ajax({
        url: '/list_sub_genplan',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

var text=`<div id="tabs">
  <ul data-layer_id='-1' data-layer_status='1' id="ul_dialog_tab_create">
    <li data-val='-1' ><a href="#tabs-00">Умумий маълумотлар</a></li>`;
 
    for(var i in result[0].sub_genplans){
      text+=`<li><a href="#tabs-`+(result[0].sub_genplans)[i].id+`"> `+(result[0].sub_genplans)[i].nomi+`</a></li>`;
    }
  text+=`</ul>
<div id="tabs-00">
    <h2 class='title_sub_main'>Умумий маълумотлар</h2>
    <hr class='hr_admin_tab'>

<label for='genplan_ahpn' class='label_admin_input'><span >Aholi punktining nomi:</span></label> 
<input id="genplan_ahpn" type="text" class = "form-control">

<label for='genplan_soata' class='label_admin_input'><span>Mamuriy hududiy_birliklarni belgilash tizimi kodi:</span></label> 
<input id="genplan_soata" type="text" class = "form-control">

<label for='genplan_apt' class='label_admin_input'><span>Aholi punktining tipi:</span></label> 
<input id="genplan_apt" type="text" class = "form-control">

<label for='genplan_apm' class='label_admin_input'><span>Aholi punktining maqomi:</span></label> 
<input id="genplan_apm" type="text" class = "form-control">

<label for='genplan_vil' class='label_admin_input'><span>Viloyat:</span></label> 
<select id="genplan_vil" class = "form-control">
`
for (var vil in viloyat){
  text+= `<option value='`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</option>`
}

text+=`
</select>
<label for='genplan_tum_shah' class='label_admin_input'><span >Tuman,shahar nomi:</span></label> 
<input id="genplan_tum_shah" type="text" class = "form-control">

<label for='genplan_lt' class='label_admin_input'><span>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquvchi:</span></label>
<input id="genplan_lt" type="text" class = "form-control">

<label for='genplan_ichy' class='label_admin_input'><span>Ishlab chiqalgan yil:</span></label> 
<input id="genplan_ichy" type="text" class = "form-control">

<label for='genplan_shchsj' class='label_admin_input'><span>Shahar chegarasi loyihasi hujjatlari saqlandigan joy:</span></label> 
<input id="genplan_shchsj" type="text" class = "form-control">

<label for='genplan_aplm' class='label_admin_input'><span>Aholi punktining loyihaviy maydoni ga:</span></label> 
<input id="genplan_aplm" type="text" class = "form-control">

<label for='genplan_als' class='label_admin_input'><span>Aholining loyihaviy soni:</span></label> 
<input id="genplan_als" type="text" class = "form-control">

<label for='genplan_thm' class='label_admin_input'><span>Tasdiqlanganlik holati</span></label> 

<select id="genplan_thm" class = "form-control secret_inputs_checkbox">
<option value='1' >Tasdiqlangan</option>
<option value='0' selected>Tasdiqlanmagan</option>
<option value='3' >Rejalashtirilgan</option>
</select>
 
<div  id='secret_inputs_div' style='display:none;'>

<label for='genplan_to' class='label_admin_input'><span>Shahar chegarasi loyihasini tasdiqlangan organ:</span></label> 
<input id="genplan_to" type="text" class = "form-control ">

<label for='genplan_lhr' class='label_admin_input'><span >Shahar chegarasi loyiha tasdiqlash to'g'risidagi hujjat raqami va sanasi:</span></label> 
<input id="genplan_lhr" type="text"  class = "form-control">
</div>


<div  id='secret_inputs_div_plan' style='display:none;'>

<label for='genplan_rqh' class='label_admin_input'><span>Qaysi hujjat asosida reja qilingan:</span></label> 
<input id="genplan_rqh" type="text" class = "form-control ">

</div>


<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">Grafik ma'lumotlar:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='genplan_gm'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_genplan_main_files" data-file_type='gm'  value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Izohlovchi ma'lumot:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='genplan_im'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_genplan_main_files"  data-file_type='im' value='delete'>
</td></tr>
</table>

<br>
    <input type="button" id="create_genplan_button" class='btn btn-success' value="Saqlash">
    <input type="button" id="delete_genplan_button" class='btn btn-danger' value="Delete all">
  </div>`;


 for(var i in result[0].sub_genplans){
  text+=`<div class='tabs_main' id="tabs-`+(result[0].sub_genplans)[i].id+`" data-sub_genplan_id='`+(result[0].sub_genplans)[i].id+`' data-id='-1'>
<h2 class='title_sub_main'>`+(result[0].sub_genplans)[i].nomi+`</h2>
 <hr class='hr_admin_tab'>
  `;
  text+=`
<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">PDF:</span></td><td></td></tr>
<tr>
<td><label class="form-control">

<input type='file' style='display:none;' class="input_file" id='pdf_file_`+(result[0].sub_genplans)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger" id='delete_pdf_file_`+(result[0].sub_genplans)[i].id+`' value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Geotif:</span></td><td></td></tr>
<tr>
<td> <label class="form-control">
<input type='file' style='display:none;' class="input_file" id='geotiff_file_`+(result[0].sub_genplans)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button'  class="btn btn-danger" id='delete_sub_genplan_`+(result[0].sub_genplans)[i].id+`' value='delete'>
</td></tr>`;
 
  for(var j in result[0].sub_sub_genplans){

    text+=`
<tr><td><span class="head_admin_tab">`+(result[0].sub_sub_genplans)[j].nomi+`:</span></td><td></td></tr>
<tr><td><label class="form-control">
<input type="file" id='sub_sub_`+(result[0].sub_genplans)[i].id+`_`+(result[0].sub_sub_genplans)[j].id+`' class="input_file"  style="display: none;" >
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td><td style='width:70px;'>
<input type="button" value="delete" id='delete_sub_sub_`+(result[0].sub_genplans)[i].id+`_`+(result[0].sub_sub_genplans)[j].id+`' class="btn btn-danger">
</td></tr>`;

  }
text+=`
</table>

<input type='button' style='float:left;' class='admin_genplan_btn btn btn-success' data-sub_genplan_id='`+(result[0].sub_genplans)[i].id+`' value='Saqlash'>
<input type='button' class="btn btn-danger" style='float:left; margin-left:10px;' id='delete_sub_all_`+(result[0].sub_genplans)[i].id+`' value='Delete all'>
 </div>`; 
 }
text+=`
<div id="load_alert_div"></div>
</div>`;

$('#modal_create_genplan').html(text);
$('#modal_create_genplan').dialog('open');
$("#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
$("#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
var x=Array();
for(var i=1; i<=50;i++){
x.push(i);
}
$("#tabs").tabs("option","disabled", x);
        },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});

});

$(document).on('click','.delete_genplan_main_files',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('type','main_files');
data.append('file_type',$(this).attr('data-file_type'));

    $.ajax({
        url: '/delete_sub_sub_genplan_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
$('#genplan_'+result.file_type).val('');
$('#genplan_'+result.file_type).next().text('Faylni tanlang');   
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);      

},
        error: function(){
          console.log('Ajaxda xatolik !!');
        }});
});

$(document).on('click','.admin_genplan_btn',function(){

$('#load_alert_div').html("<img width='100px' height='100px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});


var formData = new FormData()
var itemsIndex = new Array();
$("input[id^='sub_sub_"+$(this).attr('data-sub_genplan_id')+"']").each(function (index, value) {
                if (value.files[0]) {
                    itemsIndex.push($(this).attr('id').split('_')[3]);
                    formData.append('sub_genplan_' + $(this).attr('id').split('_')[3], value.files[0])
                }
            });
 
formData.append('geotif_file', $('#geotiff_file_'+$(this).attr('data-sub_genplan_id')+'')[0].files[0]);
formData.append('pdf_file', $('#pdf_file_'+$(this).attr('data-sub_genplan_id')+'')[0].files[0]);
formData.append('itemsIndex', itemsIndex.toString());
formData.append('genplan_id', $('#ul_dialog_tab_create').attr('data-layer_id'));
formData.append('status', $('#ul_dialog_tab_create').attr('data-layer_status'));
formData.append('sub_genplan_id',$(this).attr('data-sub_genplan_id'));
formData.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);

    $.ajax({
        url: '/create_sub_sub_genplan_data',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

if(result==-11){ 

$('#load_alert_div').html("<p>Publikatsiya qilishda munammo !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_error');

}

 if(result!=-11&&result!=-12){ 


$('#load_alert_div').html("<p>Saqlandi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');


$('#ul_dialog_tab_create').attr('data-layer_status',result.status)
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id)
$('a[href="#tabs-' + result.sub_genplan_id + '"]').parent().addClass('bg-success');

if(result.pdf_check==1){
 $('input[id="pdf_file_' + result.sub_genplan_id+'"]').parent().addClass('bg-success'); 
 $('input[id="pdf_file_' + result.sub_genplan_id+'"]').val('');
 $('input[id="pdf_file_' + result.sub_genplan_id+'"]').next().text('Fayl biriktirilgan')
}
if(result.geotif_check==1){
 $('input[id="geotiff_file_' + result.sub_genplan_id+'"]').parent().addClass('bg-success'); 
  $('input[id="geotiff_file_' + result.sub_genplan_id+'"]').val('');
 $('input[id="geotiff_file_' + result.sub_genplan_id+'"]').next().text('Fayl biriktirilgan')
}

if(result.items_index_check==1){
for (var i in result.sub_sub_genplan_ids){
$('input[id="sub_sub_' + result.sub_genplan_id + '_'+result.sub_sub_genplan_ids[i]+'"]').parent().addClass('bg-success');
 $('input[id="sub_sub_' + result.sub_genplan_id + '_'+result.sub_sub_genplan_ids[i]+'"]').val('');
 $('input[id="sub_sub_' + result.sub_genplan_id + '_'+result.sub_sub_genplan_ids[i]+'"]').next().text('Fayl biriktirilgan')
}
}
}
else{

$('#load_alert_div').html("<p>Sub layer hosil qilinmagan !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');
}
},
error:function(){
console.log('Ajaxda xatolik !!');
}});



});



$('#modal_create_genplan').dialog({
  resizable: false,
  autoOpen:false,
  height: 700,
  width: 950,
  modal: false,
  dialogClass:'modal_create_genplan',
   create:function(e){
$('.modal_create_genplan').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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



$(document).on('click',"input[id^='delete_sub_all_']",function(){
  
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_genplan_id',$(this).attr('id').split('_')[3]);
data.append('type','delete_sub_all');

    $.ajax({
        url: '/delete_sub_sub_genplan_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id^='pdf_file_"+result.sub_genplan_id+"']").val('');
$("input[id^='pdf_file_"+result.sub_genplan_id+"']").next().text('Faylni tanlang');
$("input[id^='pdf_file_"+result.sub_genplan_id+"']").parent().removeClass('bg-success');

$("input[id^='geotiff_file_"+result.sub_genplan_id+"']").val('');
$("input[id^='geotiff_file_"+result.sub_genplan_id+"']").next().text('Faylni tanlang');
$("input[id^='geotiff_file_"+result.sub_genplan_id+"']").parent().removeClass('bg-success');

$("input[id^='sub_sub_"+result.sub_genplan_id+"_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});

$('a[href="#tabs-' + result.sub_genplan_id + '"]').parent().removeClass('bg-success');


}
 },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});
});


$(document).on('click',"input[id^='delete_sub_sub_']",function(){
  
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_genplan_id',$(this).attr('id').split('_')[3]);
data.append('sub_sub_genplan_id',$(this).attr('id').split('_')[4]);
data.append('type','sub_sub_genplan');

    $.ajax({
        url: '/delete_sub_sub_genplan_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
        if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id='sub_sub_"+result.sub_genplan_id+"_"+result.sub_sub_genplan_id+"']").val('');
$("input[id='sub_sub_"+result.sub_genplan_id+"_"+result.sub_sub_genplan_id+"']").next().text('Faylni tanlang');
$("input[id='sub_sub_"+result.sub_genplan_id+"_"+result.sub_sub_genplan_id+"']").parent().removeClass('bg-success');

        }
 
 },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});
});


$(document).on('click',"input[id^='delete_pdf_file_']",function(){
  
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_genplan_id',$(this).attr('id').split('_')[3]);
data.append('type','delete_pdf_file');

    $.ajax({
        url: '/delete_sub_sub_genplan_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
          if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id^='pdf_file_"+result.sub_genplan_id+"']").val('');
$("input[id^='pdf_file_"+result.sub_genplan_id+"']").next().text('Faylni tanlang');
$("input[id^='pdf_file_"+result.sub_genplan_id+"']").parent().removeClass('bg-success');
}
        },
 
      error:function(){
          console.log('Ajaxda xatolik!!');
        }
});
});


$(document).on('click',"input[id^='delete_sub_genplan']",function(){
  
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('type','sub_genplan');
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_genplan_id',$(this).attr('id').split('_')[3]);
    $.ajax({
        url: '/delete_sub_sub_genplan_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id^='sub_sub_"+result.sub_genplan_id+"_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});
$("input[id^='geotiff_file_"+result.sub_genplan_id+"']").val('');
$("input[id^='geotiff_file_"+result.sub_genplan_id+"']").next().text('Faylni tanlang');
$("input[id^='geotiff_file_"+result.sub_genplan_id+"']").parent().removeClass('bg-success');
}
 
 },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});




});


$(document).on('click','#delete_genplan_button',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('type','first_delete');
    $.ajax({
        url: '/delete_genplan',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

          if(result==1){
$('#ul_dialog_tab_create').attr('data-layer_id',-1);

$("input[id^='pdf_file_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});
$("input[id^='geotiff_file_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});

$("input[id^='sub_sub_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});

$("a[href^='#tabs-']").each(function(){
$(this).parent().removeClass('bg-success');
});

var x=Array();
for(var i=1;i<50;i++){
  x.push(i);
}
$("#tabs").tabs("option","disabled", x);
   }
   },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});

});

$(document).on('click','#create_genplan_button',function(){
  
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
data.append('genplan_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status', $('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('geometry',json_str);
data.append('genplan_vil',$('#genplan_vil').val());
data.append('genplan_thm',$('#genplan_thm').val());

data.append('genplan_gm', $('#genplan_gm')[0].files[0]);
data.append('genplan_im', $('#genplan_im')[0].files[0]);

$("#tabs-00 input[type='text']").each(function(){
data.append($(this).attr('id'),$(this).val());
});
 

    $.ajax({
        url: '/create_genplan',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

$('#genplan_gm').val('');
$('#genplan_im').val('');

$('#load_alert_div').html("<p>Saqlandi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

$("#tabs").tabs("option","disabled", []);
$('a[href="#tabs-00"]').parent().addClass('bg-success');
$('#ul_dialog_tab_create').attr('data-layer_id',result.genplan_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

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


  




