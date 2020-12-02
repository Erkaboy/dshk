$(document).on('click','.button_delete_pdp',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('pdp_id',$(this).attr('data-pdp_id'));
  data.append('status',$(this).attr('data-status'));
  data.append('type','last_delete');
    $.ajax({
        url: '/delete_pdp',
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

 $('.button_delete_pdp').prop('disabled','disabled');
 $('.button_edit_pdp').prop('disabled','disabled');            

},
      error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});

$(document).on('click','.button_delete_pdp_admin',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('pdp_id',$(this).attr('data-pdp_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('type','admin_delete');
    $.ajax({
        url: '/delete_pdp',
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
 $('.button_delete_pdp_admin').prop('disabled','disabled');
  


        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});


$(document).on('click','.button_save_new_pdp',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('pdp_id',$(this).attr('data-pdp_id'));
  data.append('confirm',$(this).attr('data-confirm'));
    $.ajax({
        url: '/save_pdp',
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

$('.button_save_new_pdp').prop('disabled','disabled');
},
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });

$(document).on('click','.button_save_edit_pdp',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('pdp_id',$(this).attr('data-pdp_id'));
    $.ajax({
        url: '/save_edit_pdp',
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
$('.button_save_edit_pdp').prop('disabled','disabled');

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

$(document).on('click','.button_edit_pdp',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('pdp_id',$(this).attr('data-pdp_id'));
  data.append('status',$(this).attr('data-status'));
    $.ajax({
        url: '/edit_pdp_dialog_tabs',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
 var pdp_data = JSON.parse(result[0].pdp_data);
 var data = pdp_data.features[0].properties;
 
pdp_data.features[0].geometry.coordinates.forEach(function(coor,i){
var polygon={type:'Polygon',coordinates:coor};
L.geoJson(polygon,{
  onEachFeature:function(features,layer){
    drawnItems.addLayer(layer);
  }
});
});



var text=`<div id="tabs">
  <ul data-layer_id='`+result[0].pdp_id+`' data-layer_status='`+result[0].status+`' id="ul_dialog_tab_create">
    <li data-val='`+result[0].pdp_id+`' ><a href="#tabs-00">Умумий маълумотлар</a></li>`;
 
    for(var i in result[0].sub_pdps){
      text+=`<li><a href="#tabs-`+(result[0].sub_pdps)[i].id+`"> `+(result[0].sub_pdps)[i].nomi+`</a></li>`;
    }
  text+=`</ul>


<div id="tabs-00">
    <h2 class='title_sub_main'>Умумий маълумотлар</h2>
    <hr class='hr_admin_tab'>

<label for='pdp_ahpn' class='label_admin_input'><span >Aholi punktining nomi:</span></label> 
<input id="pdp_ahpn"  type="text" class = "form-control">

<label for='pdp_soata' class='label_admin_input'><span>Mamuriy hududiy_birliklarni belgilash tizimi kodi:</span></label> 
<input id="pdp_soata"  type="text" class = "form-control">

<label for='pdp_apt' class='label_admin_input'><span>Aholi punktining tipi:</span></label> 
<input id="pdp_apt"  type="text" class = "form-control">

<label for='pdp_apm' class='label_admin_input'><span>Aholi punktining maqomi:</span></label> 
<input id="pdp_apm"  type="text" class = "form-control">

<label for='pdp_vil' class='label_admin_input'><span>Viloyat:</span></label> 
<select id="pdp_vil" class = "form-control">
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
<label for='pdp_tum_shah' class='label_admin_input'><span >Tuman,shahar nomi:</span></label> 
<input id="pdp_tum_shah" type="text" class = "form-control">

<label for='pdp_lt' class='label_admin_input'><span>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquvchi:</span></label>
<input id="pdp_lt"  type="text" class = "form-control">

<label for='pdp_ichy' class='label_admin_input'><span>Ishlab chiqalgan yil:</span></label> 
<input id="pdp_ichy" value="`+data.ishlab_chiqalgan_yili+`" type="text" class = "form-control">
<label for='pdp_shchsj' class='label_admin_input'><span>Shahar chegarasi loyihasi hujjatlari saqlandigan joy:</span></label> 
<input id="pdp_shchsj"  type="text" class = "form-control">

<label for='pdp_aplm' class='label_admin_input'><span>Aholi punktining loyihaviy maydoni ga:</span></label> 
<input id="pdp_aplm" type="text" class = "form-control">

<label for='pdp_als' class='label_admin_input'><span>Aholining loyihaviy soni:</span></label> 
<input id="pdp_als"  type="text" class = "form-control">

<label for='pdp_thm' class='label_admin_input'><span>Tasdiqlanganlik holati</span></label> 

<select id="pdp_thm" class = "form-control secret_inputs_checkbox">`;

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

<label for='pdp_to' class='label_admin_input'><span>Shahar chegarasi loyihasini tasdiqlangan organ:</span></label> 
<input id="pdp_to"  type="text" class = "form-control">

<label for='pdp_lhr' class='label_admin_input'><span >Shahar chegarasi loyiha tasdiqlash to'g'risidagi hujjat raqami va sanasi:</span></label> 
<input id="pdp_lhr"  type="text" class = "form-control">
</div>`;

if(data.tasdiqlanganligi=='3'){
text+=`<div id='secret_inputs_div_plan' style='display:block;'>`;
}
else{
text+=`<div id='secret_inputs_div_plan' style='display:none;'>`;
}

text+=`

<label for='pdp_rqh' class='label_admin_input'><span>Qaysi hujjat asosida reja qilingan::</span></label> 
<input id="pdp_rqh"  type="text" class = "form-control">

</div>

<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">Grafik ma'lumotlar:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='pdp_gm'>
<span class="span_admin_tab">`+repath(data.grafik_malumot)+`</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_pdp_main_files" data-file_type='gm'  value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Izohlovchi ma'lumot:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='pdp_im'>
<span class="span_admin_tab">`+repath(data.izohlovchi_malumot)+`</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_pdp_main_files"  data-file_type='im' value='delete'>
</td></tr>
</table>

<br>
    <input type="button" id="create_pdp_button" class='btn btn-primary' value="O'zgartirish">
   </div>`;


for(var i in result[0].sub_pdps){
  text+=`<div class='tabs_main' id="tabs-`+(result[0].sub_pdps)[i].id+`" data-sub_pdp_id='`+(result[0].sub_pdps)[i].id+`' data-id='-1'>
<h2 class='title_sub_main'>`+(result[0].sub_pdps)[i].nomi+`</h2>
 <hr class='hr_admin_tab'>
  `;
  text+=`
<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">PDF:</span></td><td></td></tr>
<tr>
<td><label class="form-control">

<input type='file' style='display:none;' class="input_file" id='pdf_file_`+(result[0].sub_pdps)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger" id='delete_pdf_file_`+(result[0].sub_pdps)[i].id+`' value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Geotif:</span></td><td></td></tr>
<tr>
<td> <label class="form-control">
<input type='file' style='display:none;' class="input_file" id='geotiff_file_`+(result[0].sub_pdps)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button'  class="btn btn-danger" id='delete_sub_pdp_`+(result[0].sub_pdps)[i].id+`' value='delete'>
</td></tr>`;
 
  for(var j in result[0].sub_sub_pdps){

    text+=`
<tr><td><span class="head_admin_tab">`+(result[0].sub_sub_pdps)[j].nomi+`:</span></td><td></td></tr>
<tr><td><label class="form-control">
<input type="file" data-val_sub_sub_data_id='`+(result[0].sub_sub_pdps)[j].id+`' id='sub_sub_`+(result[0].sub_pdps)[i].id+`_`+(result[0].sub_sub_pdps)[j].id+`' class="input_file"  style="display: none;" >
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td><td style='width:70px;'>
<input type="button" value="delete" id='delete_sub_sub_`+(result[0].sub_pdps)[i].id+`_`+(result[0].sub_sub_pdps)[j].id+`' class="btn btn-danger">
</td></tr>`;
  }
text+=`
</table>

<input type='button' style='float:left;' class='admin_pdp_btn btn btn-primary' data-sub_pdp_id='`+(result[0].sub_pdps)[i].id+`' value="O'zgartirish">
<input type='button' class="btn btn-danger" style='float:left; margin-left:10px;' id='delete_sub_pdp_all_`+(result[0].sub_pdps)[i].id+`' value='Delete all'>
 </div>`; 
 }
text+=`
<div id="load_alert_div"></div>
</div>`;
$('#modal_create_pdp').html(text);
$('#modal_create_pdp').dialog('open');

 
$('#pdp_ahpn').val(data.aholi_punktining_nomi);
$('#pdp_soata').val(data.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi);
$('#pdp_apt').val(data.aholi_punktining_tipi);
$('#pdp_apm').val(data.aholi_punktining_maqomi);
$('#pdp_tum_shah').val(data.tuman_shahar);
$('#pdp_lt').val(data.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv);
$('#pdp_ichy').val(data.ishlab_chiqalgan_yili);
$('#pdp_shchsj').val(data.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy);
$('#pdp_aplm').val(data.aholi_punktining_loyihaviy_maydoni_ga);
$('#pdp_als').val(data.aholining_loyihaviy_soni);
$('#pdp_to').val(data.shahar_chegarasi_loyihasini_tasdiqlangan_organ);
$('#pdp_lhr').val(data.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san);
 
 $('#pdp_rqh').val(data.reja_qilingan_hujjat);
 

$("#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
$("#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
$("a[href='#tabs-00']").parent().addClass('bg-success');
for (var i in result[0].sub_pdp_data){

if(result[0].sub_pdp_data[i].geotif!=""){
$("input[id='geotiff_file_"+result[0].sub_pdp_data[i].sub_pdp_id_id+"']").parent().addClass('bg-success');
$("input[id='geotiff_file_"+result[0].sub_pdp_data[i].sub_pdp_id_id+"']").next().text('Fayl biriktirilgan');
}

if(result[0].sub_pdp_data[i].pdf!=""){
$("input[id='pdf_file_"+result[0].sub_pdp_data[i].sub_pdp_id_id+"']").parent().addClass('bg-success');
$("input[id='pdf_file_"+result[0].sub_pdp_data[i].sub_pdp_id_id+"']").next().text('Fayl biriktirilgan');
}

$("a[href='#tabs-"+result[0].sub_pdp_data[i].sub_pdp_id_id+"']").parent().addClass('bg-success');
$('input[id^="sub_sub_' + result[0].sub_pdp_data[i].sub_pdp_id_id + '_"]').each(function(e)
{

$(this).attr('data-val_sub_sub_data_id',$(this).attr('data-val_sub_sub_data_id')+'_'+result[0].sub_pdp_data[i].id);
});

}



for (var i in result[0].sub_sub_pdp_datas){
  for (var j in result[0].sub_sub_pdp_datas[i]){


$('input[data-val_sub_sub_data_id="' + result[0].sub_sub_pdp_datas[i][j].sub_sub_pdp_id_id+ '_'+result[0].sub_sub_pdp_datas[i][j].Sub_pdp_data_id_id +'"]').next().text("Fayl biriktirilgan ");
$('input[data-val_sub_sub_data_id="' + result[0].sub_sub_pdp_datas[i][j].sub_sub_pdp_id_id+ '_'+result[0].sub_sub_pdp_datas[i][j].Sub_pdp_data_id_id +'"]').parent().addClass('bg-success');
   }
}

         },
            error:function(){

               console.log('Ajaxda xatolik!!'); 
             }
    }); 
});


$('#button_create_pdp_dialog').on('click',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
    $.ajax({
        url: '/list_sub_pdp',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

var text=`<div id="tabs">
  <ul data-layer_id='-1' data-layer_status='1' id="ul_dialog_tab_create">
    <li data-val='-1' ><a href="#tabs-00">Умумий маълумотлар</a></li>`;
 
    for(var i in result[0].sub_pdps){
      text+=`<li><a href="#tabs-`+(result[0].sub_pdps)[i].id+`"> `+(result[0].sub_pdps)[i].nomi+`</a></li>`;
    }
  text+=`</ul>
<div id="tabs-00">
    <h2 class='title_sub_main'>Умумий маълумотлар</h2>
    <hr class='hr_admin_tab'>

<label for='pdp_ahpn' class='label_admin_input'><span >Aholi punktining nomi:</span></label> 
<input id="pdp_ahpn" type="text" class = "form-control">

<label for='pdp_soata' class='label_admin_input'><span>Mamuriy hududiy_birliklarni belgilash tizimi kodi:</span></label> 
<input id="pdp_soata" type="text" class = "form-control">

<label for='pdp_apt' class='label_admin_input'><span>Aholi punktining tipi:</span></label> 
<input id="pdp_apt" type="text" class = "form-control">

<label for='pdp_apm' class='label_admin_input'><span>Aholi punktining maqomi:</span></label> 
<input id="pdp_apm" type="text" class = "form-control">

<label for='pdp_vil' class='label_admin_input'><span>Viloyat:</span></label> 
<select id="pdp_vil" class = "form-control">
`
for (var vil in viloyat){
  text+= `<option value='`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</option>`
}

text+=`
</select>
<label for='pdp_tum_shah' class='label_admin_input'><span >Tuman,shahar nomi:</span></label> 
<input id="pdp_tum_shah" type="text" class = "form-control">

<label for='pdp_lt' class='label_admin_input'><span>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquvchi:</span></label>
<input id="pdp_lt" type="text" class = "form-control">

<label for='pdp_ichy' class='label_admin_input'><span>Ishlab chiqalgan yil:</span></label> 
<input id="pdp_ichy" type="text" class = "form-control">

<label for='pdp_shchsj' class='label_admin_input'><span>Shahar chegarasi loyihasi hujjatlari saqlandigan joy:</span></label> 
<input id="pdp_shchsj" type="text" class = "form-control">


<label for='pdp_aplm' class='label_admin_input'><span>Aholi punktining loyihaviy maydoni ga:</span></label> 
<input id="pdp_aplm" type="text" class = "form-control">

<label for='pdp_als' class='label_admin_input'><span>Aholining loyihaviy soni:</span></label> 
<input id="pdp_als" type="text" class = "form-control">

<label for='pdp_thm' class='label_admin_input'><span>Tasdiqlanganlik holati</span></label> 

<select id="pdp_thm" class = "form-control secret_inputs_checkbox">
<option value='1' >Tasdiqlangan</option>
<option value='0' selected>Tasdiqlanmagan</option>
<option value='3' >Rejalashtirilgan</option>
</select>
 
<div  id='secret_inputs_div' style='display:none;'>

<label for='pdp_to' class='label_admin_input'><span>Shahar chegarasi loyihasini tasdiqlangan organ:</span></label> 
<input id="pdp_to" type="text" class = "form-control">

<label for='pdp_lhr' class='label_admin_input'><span >Shahar chegarasi loyiha tasdiqlash to'g'risidagi hujjat raqami va sanasi:</span></label> 
<input id="pdp_lhr" type="text" class = "form-control">
</div>

<div  id='secret_inputs_div_plan' style='display:none;'>

<label for='pdp_rqh' class='label_admin_input'><span>Qaysi hujjat asosida reja qilingan:</span></label> 
<input id="pdp_rqh" type="text" class = "form-control ">

</div>


<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">Grafik ma'lumotlar:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='pdp_gm'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_pdp_main_files" data-file_type='gm'  value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Izohlovchi ma'lumot:</span></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' class="input_file" id='pdp_im'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_pdp_main_files"  data-file_type='im' value='delete'>
</td></tr>
</table>

<br>
    <input type="button" id="create_pdp_button" class='btn btn-success' value="Saqlash">
    <input type="button" id="delete_pdp_button" class='btn btn-danger' value="Delete all">
  </div>`;


 for(var i in result[0].sub_pdps){
  text+=`<div class='tabs_main' id="tabs-`+(result[0].sub_pdps)[i].id+`" data-sub_pdp_id='`+(result[0].sub_pdps)[i].id+`' data-id='-1'>
<h2 class='title_sub_main'>`+(result[0].sub_pdps)[i].nomi+`</h2>
 <hr class='hr_admin_tab'>
  `;
  text+=`
<table class="table dialog_table_main_tab">

<tr><td><span class="head_admin_tab">PDF:</span></td><td></td></tr>
<tr>
<td><label class="form-control">

<input type='file' style='display:none;' class="input_file" id='pdf_file_`+(result[0].sub_pdps)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger" id='delete_pdf_file_`+(result[0].sub_pdps)[i].id+`' value='delete'>
</td></tr>

<tr><td><span class="head_admin_tab">Geotif:</span></td><td></td></tr>
<tr>
<td> <label class="form-control">
<input type='file' style='display:none;' class="input_file" id='geotiff_file_`+(result[0].sub_pdps)[i].id+`'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td>
<td style='width:70px;'>
<input type='button'  class="btn btn-danger" id='delete_sub_pdp_`+(result[0].sub_pdps)[i].id+`' value='delete'>
</td></tr>`;
 
  for(var j in result[0].sub_sub_pdps){

    text+=`
<tr><td><span class="head_admin_tab">`+(result[0].sub_sub_pdps)[j].nomi+`:</span></td><td></td></tr>
<tr><td><label class="form-control">
<input type="file" id='sub_sub_`+(result[0].sub_pdps)[i].id+`_`+(result[0].sub_sub_pdps)[j].id+`' class="input_file"  style="display: none;" >
<span class="span_admin_tab">Faylni tanlang</span>
</label>
</td><td style='width:70px;'>
<input type="button" value="delete" id='delete_sub_sub_`+(result[0].sub_pdps)[i].id+`_`+(result[0].sub_sub_pdps)[j].id+`' class="btn btn-danger">
</td></tr>`;

  }
text+=`
</table>

<input type='button' style='float:left;' class='admin_pdp_btn btn btn-success' data-sub_pdp_id='`+(result[0].sub_pdps)[i].id+`' value='Saqlash'>
<input type='button' class="btn btn-danger" style='float:left; margin-left:10px;' id='delete_sub_pdp_all_`+(result[0].sub_pdps)[i].id+`' value='Delete all'>
 </div>`; 
 }
text+=`
<div id="load_alert_div"></div>
</div>`;

$('#modal_create_pdp').html(text);
$('#modal_create_pdp').dialog('open');
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

$(document).on('click','.delete_pdp_main_files',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('type','main_files');
data.append('file_type',$(this).attr('data-file_type'));

    $.ajax({
        url: '/delete_sub_sub_pdp_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
$('#pdp_'+result.file_type).val('');
$('#pdp_'+result.file_type).next().text('Faylni tanlang');   
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);      

},
        error: function(){
          console.log('Ajaxda xatolik !!');
        }});
});


$(document).on('click','.admin_pdp_btn',function(){

$('#load_alert_div').html("<img width='100px' height='100px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});


var formData = new FormData()
var itemsIndex = new Array();
$("input[id^='sub_sub_"+$(this).attr('data-sub_pdp_id')+"']").each(function (index, value) {
                if (value.files[0]) {
                    itemsIndex.push($(this).attr('id').split('_')[3]);
                    formData.append('sub_pdp_' + $(this).attr('id').split('_')[3], value.files[0])
                }
            });
 
formData.append('geotif_file', $('#geotiff_file_'+$(this).attr('data-sub_pdp_id')+'')[0].files[0]);
formData.append('pdf_file', $('#pdf_file_'+$(this).attr('data-sub_pdp_id')+'')[0].files[0]);
formData.append('itemsIndex', itemsIndex.toString());
formData.append('pdp_id', $('#ul_dialog_tab_create').attr('data-layer_id'));
formData.append('status', $('#ul_dialog_tab_create').attr('data-layer_status'));
formData.append('sub_pdp_id',$(this).attr('data-sub_pdp_id'));
formData.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);

    $.ajax({
        url: '/create_sub_sub_pdp_data',
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
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id)
$('a[href="#tabs-' + result.sub_pdp_id + '"]').parent().addClass('bg-success');

if(result.pdf_check==1){
 $('input[id="pdf_file_' + result.sub_pdp_id+'"]').parent().addClass('bg-success'); 
 $('input[id="pdf_file_' + result.sub_pdp_id+'"]').val('');
 $('input[id="pdf_file_' + result.sub_pdp_id+'"]').next().text('Fayl biriktirilgan')
}
if(result.geotif_check==1){
 $('input[id="geotiff_file_' + result.sub_pdp_id+'"]').parent().addClass('bg-success'); 
  $('input[id="geotiff_file_' + result.sub_pdp_id+'"]').val('');
 $('input[id="geotiff_file_' + result.sub_pdp_id+'"]').next().text('Fayl biriktirilgan')
}

if(result.items_index_check==1){
for (var i in result.sub_sub_pdp_ids){
$('input[id="sub_sub_' + result.sub_pdp_id + '_'+result.sub_sub_pdp_ids[i]+'"]').parent().addClass('bg-success');
 $('input[id="sub_sub_' + result.sub_pdp_id + '_'+result.sub_sub_pdp_ids[i]+'"]').val('');
 $('input[id="sub_sub_' + result.sub_pdp_id + '_'+result.sub_sub_pdp_ids[i]+'"]').next().text('Fayl biriktirilgan')
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



$('#modal_create_pdp').dialog({
  resizable: false,
  autoOpen:false,
  height: 700,
  width: 950,
  modal: false,
  dialogClass:'modal_create_pdp',
   create:function(e){
$('.modal_create_pdp').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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



$(document).on('click',"input[id^='delete_sub_pdp_all_']",function(){
  
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_pdp_id',$(this).attr('id').split('_')[4]);
data.append('type','delete_sub_all');

    $.ajax({
        url: '/delete_sub_sub_pdp_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id^='pdf_file_"+result.sub_pdp_id+"']").val('');
$("input[id^='pdf_file_"+result.sub_pdp_id+"']").next().text('Faylni tanlang');
$("input[id^='pdf_file_"+result.sub_pdp_id+"']").parent().removeClass('bg-success');

$("input[id^='geotiff_file_"+result.sub_pdp_id+"']").val('');
$("input[id^='geotiff_file_"+result.sub_pdp_id+"']").next().text('Faylni tanlang');
$("input[id^='geotiff_file_"+result.sub_pdp_id+"']").parent().removeClass('bg-success');

$("input[id^='sub_sub_"+result.sub_pdp_id+"_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});

$('a[href="#tabs-' + result.sub_pdp_id + '"]').parent().removeClass('bg-success');


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
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_pdp_id',$(this).attr('id').split('_')[3]);
data.append('sub_sub_pdp_id',$(this).attr('id').split('_')[4]);
data.append('type','sub_sub_pdp');

    $.ajax({
        url: '/delete_sub_sub_pdp_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
        if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id='sub_sub_"+result.sub_pdp_id+"_"+result.sub_sub_pdp_id+"']").val('');
$("input[id='sub_sub_"+result.sub_pdp_id+"_"+result.sub_sub_pdp_id+"']").next().text('Faylni tanlang');
$("input[id='sub_sub_"+result.sub_pdp_id+"_"+result.sub_sub_pdp_id+"']").parent().removeClass('bg-success');

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
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_pdp_id',$(this).attr('id').split('_')[3]);
data.append('type','delete_pdf_file');

    $.ajax({
        url: '/delete_sub_sub_pdp_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
          if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id^='pdf_file_"+result.sub_pdp_id+"']").val('');
$("input[id^='pdf_file_"+result.sub_pdp_id+"']").next().text('Faylni tanlang');
$("input[id^='pdf_file_"+result.sub_pdp_id+"']").parent().removeClass('bg-success');
}
        },
 
      error:function(){
          console.log('Ajaxda xatolik!!');
        }
});
});


$(document).on('click',"input[id^='delete_sub_pdp']",function(){
  
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('type','sub_pdp');
data.append('status',$('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('sub_pdp_id',$(this).attr('id').split('_')[3]);
    $.ajax({
        url: '/delete_sub_sub_pdp_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

if(result!=0){
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id);
$('#ul_dialog_tab_create').attr('data-layer_status',result.status);

$("input[id^='sub_sub_"+result.sub_pdp_id+"_']").each(function(){
$(this).val('');
$(this).next().text('Faylni tanlang');
$(this).parent().removeClass('bg-success');
});
$("input[id^='geotiff_file_"+result.sub_pdp_id+"']").val('');
$("input[id^='geotiff_file_"+result.sub_pdp_id+"']").next().text('Faylni tanlang');
$("input[id^='geotiff_file_"+result.sub_pdp_id+"']").parent().removeClass('bg-success');
}
 
 },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
});




});


$(document).on('click','#delete_pdp_button',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('type','first_delete');
    $.ajax({
        url: '/delete_pdp',
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

$(document).on('click','#create_pdp_button',function(){
  
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

for (var i in drawnItems.toGeoJSON().features){
json_str+=JSON.stringify(drawnItems.toGeoJSON().features[i].geometry.coordinates);
if(i!=drawnItems.toGeoJSON().features.length-1)
json_str+=',';
}
json_str+=']}';

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('pdp_id',$('#ul_dialog_tab_create').attr('data-layer_id'));
data.append('status', $('#ul_dialog_tab_create').attr('data-layer_status'));
data.append('geometry',json_str);
data.append('pdp_vil',$('#pdp_vil').val());
data.append('pdp_thm',$('#pdp_thm').val());


data.append('pdp_gm', $('#pdp_gm')[0].files[0]);
data.append('pdp_im', $('#pdp_im')[0].files[0]);

$("#tabs-00 input[type='text']").each(function(){
data.append($(this).attr('id'),$(this).val());
});


    $.ajax({
        url: '/create_pdp',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

$('#pdp_gm').val('');
$('#pdp_im').val('');

$('#load_alert_div').html("<p>Saqlandi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

$("#tabs").tabs("option","disabled", []);
$('a[href="#tabs-00"]').parent().addClass('bg-success');
$('#ul_dialog_tab_create').attr('data-layer_id',result.pdp_id);
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



