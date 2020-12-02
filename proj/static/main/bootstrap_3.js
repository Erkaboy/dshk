
function create_popup_genplan(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','orginal');
    $.ajax({
        url: '/genplan_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var result=data[0].json;
var sessia=data[0].sessia;
var admin_id=data[0].admin_id;
var send_admin=data[0].send_admin;

if(result.length!=0 && result[0].layer_name!=''){
map.removeLayer(genplan);
  
   for (var i = 0; i <50 ; i++) {
      if(map.hasLayer(genplan_geotiff[i]))
      map.removeLayer(genplan_geotiff[i]);
}

genplan_geotiff[result[0].zindex] = L.tileLayer.wms('/geocache', {
            opacity: 0.9,
            layers: 'dshk:'+result[0].layer_name,
            format: 'image/png',
            zIndex: result[0].zindex,
            maxZoom:20,
            transparent: true,
}).addTo(map);

     text+='<input type="checkbox" class="checkbox_geotiff_genplan" data-layer_name="'+result[0].layer_name+'" checked id="checkbox_geotiff_'+result[0].layer_name+'" data-layer_id="'+result[0].zindex+'" />';
     text+="<label for='checkbox_geotiff_"+result[0].layer_name+"' >"+result[0].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_genplan' data-layer_id='"+result[0].zindex+"'><br>";

text+="<ul class='click_modal_ul'>";
for (var i in result[0].data){
text+='<li data-magnify="gallery" data-caption="'+result[0].data[i].nomi+'"  href="'+result[0].data[i].file_name+'">'+result[0].data[i].nomi+'</li>';

}
text+="</ul>";


}
else{
 text+="<input type='range' min=0 max=10 value=8 class='change_opacity_genplan'><br>"; 
}
var i=0;
for(var res in result){
if(result[res].layer_name!='' && res!=0) {i++;}
}

if(i>0){
text+="<div data-status='0' class='open_close_secret_div_genplan open_close_secret_div'>Дополнительные слои <span id='span_open_close_genplan' > &#9660</span></div><div style='display:none' id='secret_div_genplan'>";
}
for(var res in result){
  if(res!=0){
    if(result[res].layer_name!=''){
    text+='<input type="checkbox" class="checkbox_geotiff_genplan" data-layer_name="'+result[res].layer_name+'" id="checkbox_geotiff_'+result[res].layer_name+'" data-layer_id="'+result[res].zindex+'" />';
     text+="<label for='checkbox_geotiff_"+result[res].layer_name+"' >"+result[res].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_genplan' data-layer_id='"+result[res].zindex+"'><br>";
  
text+="<ul class='click_modal_ul'>";
for (var i in result[res].data){
text+='<li data-magnify="gallery" data-caption="'+result[res].data[i].nomi+'"  href="'+result[res].data[i].file_name+'">'+result[res].data[i].nomi+'</li>';

}
text+="</ul>";
  }}
  }

text+="</div>";
if(sessia.service=='genplan' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'zgartirish</button>";
text+=`<button class='btn mybtn btn-danger button_delete_genplan' data-status='`+properties.status+`' data-genplan_id='`+properties.id+`'>O'chirishga junatish</button>
<textarea placeholder="Qisqacha izoh " style='display:none; margin-bottom:10px;' class='form-control' id='comment_gen' rows="3"></textarea>`;

}
if(properties.status=='2'){
if(admin_id==sessia.admin_id){
if(send_admin!=1){
text+="<button class='btn mybtn btn-info button_edit_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'zgartirish</button>";
}
else{
text+="<p>O'zgarish haqida adminga xabar junatilgan !</p>";

}
}
else{
text+="<p>Boshqa bir admin ob'yekt ustida ishlayapti !</p>";
}
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>';

if(sessia.service=='genplan'){
  text+='<tr><td colspan="2"><span class="obj_history" data-pod="genplan" data-title="'+properties.aholi_punktining_nomi+' - '+vil(parseInt(properties.respublika_viloyat)).disUz+'"  data-id="'+properties.id+'"><img width="25px" src="/static/img/info.png"> Adminlar tomonidan amalga oshirilgan ishlar</span></td></tr>';
  text+='<tr><td>ID</td><td>'+properties.id+'</td></tr>';

  }

  text+='<tr><td>Aholi punktining nomi</td><td>'+properties.aholi_punktining_nomi+'</td></tr>\
         <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(properties.respublika_viloyat)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+properties.tuman_shahar+'</td></tr>\
        <tr><td>Mamuriy hududiy birliklarni belgilash tizimi kodi</td><td>'+properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+'</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>'+properties.aholi_punktining_tipi+'</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>'+properties.aholi_punktining_maqomi+'</td></tr>\
     <tr><td>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquv</td><td>'+properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+'</td></tr>\
     <tr><td>Ishlab chiqalgan yili</td><td>'+properties.ishlab_chiqalgan_yili+'</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>'+properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+'</td></tr>';

if(properties.tasdiqlanganligi=='1'){
     text+='<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>'+properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+'</td></tr>\
      <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam san</td><td>'+properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+'</td></tr>';
}     
     text+='<tr><td>Aholi punktining loyihaviy maydoni ga</td><td>'+properties.aholi_punktining_loyihaviy_maydoni_ga+'</td></tr>\
     <tr><td>Aholining loyihaviy soni</td><td>'+properties.aholining_loyihaviy_soni+'</td></tr>';
 
for(var res in result){
if(result[res].pdf!=''){
text+=`<tr><td>`+result[res].sub_name+`</td><td><a class="button_pdf_viewer" data-filename="`+myencode(result[res].pdf)+`" >Открыть PDF</a></td></tr>`;
}
}

if(sessia.status!='-1'){
if(properties.grafik_malumot!=''){
text+="<tr><td>Grafik ma'lumotlar</td><td><p  data-filename='"+myencode(properties.grafik_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}
if(properties.izohlovchi_malumot!=''){
  text+="<tr><td>Izohlovchi ma'lumot</td><td><p  data-filename='"+myencode(properties.izohlovchi_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}
}


text+='</tbody></table>';

$('#popup_dialog_genplan').html(text);
$('#popup_dialog_genplan').dialog('open');
  document.getElementById("popup_dialog_genplan").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_genplan_edit(properties){

var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('type','edit');
data.append('id',properties.id);
data.append('status',properties.status);

    $.ajax({
        url: '/genplan_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var result=data[0].json;
var sessia=data[0].sessia;

if(result.length!=0 && result[0].layer_name!=''){
map.removeLayer(genplan_edit);
  
   for (var i = 0; i <50 ; i++) {
      if(map.hasLayer(genplan_edit_geotiff[i]))
      map.removeLayer(genplan_edit_geotiff[i]);
     }

genplan_edit_geotiff[result[0].zindex] = L.tileLayer.wms('/geocache', {
            opacity: 0.9,
            layers: 'dshk:'+result[0].layer_name,
            format: 'image/png',
            zIndex: result[0].zindex,
            maxZoom:20,
            transparent: true,
}).addTo(map);

    text+='<input type="checkbox" class="checkbox_geotiff_genplan_edit" data-layer_name="'+result[0].layer_name+'" checked id="checkbox_geotiff_edit_'+result[0].layer_name+'" data-layer_id="'+result[0].zindex+'" />';
     text+="<label for='checkbox_geotiff_edit_"+result[0].layer_name+"' >"+result[0].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_genplan_edit' data-layer_id='"+result[0].zindex+"'><br>";

text+="<ul class='click_modal_ul'>";
for (var i in result[0].data){
text+='<li data-magnify="gallery" data-caption="'+result[0].data[i].nomi+'"  href="'+result[0].data[i].file_name+'">'+result[0].data[i].nomi+'</li>';

}
text+="</ul>";

}
else{
 text+="<input type='range' min=0 max=10 value=8 class='change_opacity_genplan_edit'><br>"; 
}
var i=0;
for(var res in result){
if(result[res].layer_name!='' && res!=0) {i++;}
}

if(i>0){
text+="<div data-status='0' class='open_close_secret_div_genplan_edit open_close_secret_div'>Дополнительные слои <span id='span_open_close_genplan_edit' > &#9660</span></div><div style='display:none' id='secret_div_genplan_edit'>";
}
for(var res in result){
  if(res!=0){
    if(result[res].layer_name!=''){
    text+='<input type="checkbox" class="checkbox_geotiff_genplan_edit" data-layer_name="'+result[res].layer_name+'" id="checkbox_geotiff_edit_'+result[res].layer_name+'" data-layer_id="'+result[res].zindex+'" />';
     text+="<label for='checkbox_geotiff_edit_"+result[res].layer_name+"' >"+result[res].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_genplan_edit' data-layer_id='"+result[res].zindex+"'><br>";
  
text+="<ul class='click_modal_ul'>";
for (var i in result[res].data){
text+='<li data-magnify="gallery" data-caption="'+result[res].data[i].nomi+'"  href="'+result[res].data[i].file_name+'">'+result[res].data[i].nomi+'</li>';

}
text+="</ul>";
  }} 
  }

text+="</div>";

if(sessia.service=='genplan' && sessia.status=='2' ){

if(properties.status==1 ){
  if(properties.send_sdmin==1){
text+="<button class='btn mybtn btn-success button_save_new_genplan' data-confirm='1' data-genplan_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+=`<button class='btn mybtn btn-warning button_rad_etish_genplan_new' data-genplan_id='`+properties.id+`'>Saqlashni rad etish</button>
<textarea placeholder="Jad etish sababini ko'rsating!" style='display:none; margin-bottom:10px;' class='form-control' id='comment_gen' rows="3"></textarea>
`;}
else{
  text+='<p>Obyekt ustida ish olib borilayapti !</>';
}
}
if(properties.status==2){
  if(properties.send_sdmin==1){
text+="<button class='btn mybtn btn-success button_save_edit_genplan' data-confirm='1' data-genplan_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+=`<button class='btn mybtn btn-warning button_rad_etish_genplan_edit' data-genplan_id='`+properties.id+`'>O'zgarishni rad etish</button>
<textarea placeholder="Jad etish sababini ko'rsating!" style='display:none; margin-bottom:10px;' class='form-control' id='comment_gen' rows="3"></textarea>`;
}
else{
   text+='<p>Obyekt ustida ish olib borilayapti !</>'; 
}
}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_genplan_admin' data-confirm='1' data-genplan_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+=`<button class='btn mybtn btn-warning button_delete_genplan_admin' data-confirm='0' data-genplan_id='`+properties.id+`'>O'chirishni rad etish</button>
<textarea placeholder="Jad etish sababini ko'rsating!" style='display:none; margin-bottom:10px;' class='form-control' id='comment_gen' rows="3"></textarea>`;


}
}

if(sessia.service=='genplan' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
if(sessia.admin_id==properties.admin_id){
if(properties.send_sdmin!='1' && properties.status=='1'){
text+="<button class='btn mybtn btn-info button_edit_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_save_new_genplan' data-confirm='0' data-genplan_id='"+properties.id+"'>O'chirish</button>";
text+=`<button class='btn mybtn btn-success button_send_new_admin_genplan' data-genplan_id='`+properties.id+`'>Adminga xabar berish</button>
<textarea placeholder="Qisqacha izoh " style='display:none; margin-bottom:10px;' class='form-control' id='comment_gen' rows="3"></textarea>`;
}
else{
if(properties.send_sdmin!='1' && properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_save_edit_genplan' data-confirm='0' data-genplan_id='"+properties.id+"'>Bekor qilish</button>";
text+=`<button class='btn mybtn btn-success button_send_edit_admin_genplan' data-genplan_id='`+properties.id+`'>Adminga xabar berish</button>
<textarea placeholder="Qisqacha izoh " style='display:none; margin-bottom:10px;' class='form-control' id='comment_gen' rows="3"></textarea>`;
}
else{
text+="<p>Adminga tasqiqlash uchun xabar junatilgan !!</p>";
}
}
}
else{
  text+="<p>Boshqa bir admin obyekt ustida ishlayapti !</p>";
}
}}


text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>';
  
 if(sessia.service=='genplan'){
  text+='<tr><td colspan="2"><span class="obj_history" data-pod="genplan" data-title="'+properties.aholi_punktining_nomi+' - '+vil(parseInt(properties.respublika_viloyat)).disUz+'"  data-id="'+properties.id+'"><img width="25px" src="/static/img/info.png"> Adminlar tomonidan amalga oshirilgan ishlar tarixi</span></td></tr>';
  text+='<tr><td>ID</td><td>'+properties.id+'</td></tr>';

  }

  text+='<tr><td>Aholi punktining nomi</td><td>'+properties.aholi_punktining_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(properties.respublika_viloyat)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+properties.tuman_shahar+'</td></tr>\
    <tr><td>Mamuriy hududiy birliklarni belgilash tizimi kodi</td><td>'+properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+'</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>'+properties.aholi_punktining_tipi+'</td></tr>\
    <tr><td>Aholi punktining maqomi</td><td>'+properties.aholi_punktining_maqomi+'</td></tr>\
    <tr><td>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquv</td><td>'+properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+'</td></tr>\
    <tr><td>Ishlab chiqalgan yili</td><td>'+properties.ishlab_chiqalgan_yili+'</td></tr>\
    <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>'+properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+'</td></tr>';

 if(properties.tasdiqlanganligi=='1'){
     text+='<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>'+properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+'</td></tr>\
      <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam san</td><td>'+properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+'</td></tr>';
 }     
     text+='<tr><td>Aholi punktining loyihaviy maydoni ga</td><td>'+properties.aholi_punktining_loyihaviy_maydoni_ga+'</td></tr>\
     <tr><td>Aholining loyihaviy soni</td><td>'+properties.aholining_loyihaviy_soni+'</td></tr>';


for(var res in result){
if(result[res].pdf!=''){
text+=`<tr><td>`+result[res].sub_name+`</td><td><a class="button_pdf_viewer" data-filename="`+myencode(result[res].pdf)+`" >Открыть PDF</a></td></tr>`;
}
}

if(properties.grafik_malumot!=''){
text+="<tr><td>Grafik ma'lumotlar</td><td><p  data-filename='"+myencode(properties.grafik_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}
if(properties.izohlovchi_malumot!=''){
  text+="<tr><td>Izohlovchi ma'lumot</td><td><p  data-filename='"+myencode(properties.izohlovchi_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}


text+='</tbody></table>';

$('#popup_dialog_genplan_edit').html(text);
$('#popup_dialog_genplan_edit').dialog('open');
document.getElementById("popup_dialog_genplan_edit").scrollTop = 0;
},
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}

function create_popup_pdp(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','orginal');
    $.ajax({
        url: '/pdp_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var result=data[0].json;
var sessia=data[0].sessia;

if(sessia.status!=-1){

if(result.length!=0 && result[0].layer_name!=''){
map.removeLayer(pdp);
  
   for (var i = 0; i <50 ; i++) {
      if(map.hasLayer(pdp_geotiff[i]))
      map.removeLayer(pdp_geotiff[i]);
     }

pdp_geotiff[result[0].zindex] = L.tileLayer.wms('/geocache', {
            opacity: 0.9,
            layers: 'dshk:'+result[0].layer_name,
            format: 'image/png',
            zIndex: result[0].zindex,
            maxZoom:20,
            transparent: true,
}).addTo(map);

     text+='<input type="checkbox" class="checkbox_geotiff_pdp" data-layer_name="'+result[0].layer_name+'" checked id="checkbox_geotiff_'+result[0].layer_name+'" data-layer_id="'+result[0].zindex+'" />';
     text+="<label for='checkbox_geotiff_"+result[0].layer_name+"' >"+result[0].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_pdp' data-layer_id='"+result[0].zindex+"'><br>";

text+="<ul class='click_modal_ul'>";
for (var i in result[0].data){
text+='<li data-magnify="gallery" data-caption="'+result[0].data[i].nomi+'"  href="'+result[0].data[i].file_name+'">'+result[0].data[i].nomi+'</li>';

}
text+="</ul>";


}
else{
 text+="<input type='range' min=0 max=10 value=8 class='change_opacity_pdp'><br>"; 
}
var i=0;
for(var res in result){
if(result[res].layer_name!='' && res!=0) {i++;}
}

if(i>0){
text+="<div data-status='0' class='open_close_secret_div_pdp open_close_secret_div'>Дополнительные слои <span id='span_open_close_pdp' > &#9660</span></div><div style='display:none' id='secret_div_pdp'>";
}
for(var res in result){
  if(res!=0){
    if(result[res].layer_name!=''){
    text+='<input type="checkbox" class="checkbox_geotiff_pdp" data-layer_name="'+result[res].layer_name+'" id="checkbox_geotiff_'+result[res].layer_name+'" data-layer_id="'+result[res].zindex+'" />';
     text+="<label for='checkbox_geotiff_"+result[res].layer_name+"' >"+result[res].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_pdp' data-layer_id='"+result[res].zindex+"'><br>";
  
text+="<ul class='click_modal_ul'>";
for (var i in result[res].data){
text+='<li data-magnify="gallery" data-caption="'+result[res].data[i].nomi+'"  href="'+result[res].data[i].file_name+'">'+result[res].data[i].nomi+'</li>';

}
text+="</ul>";
  }}
  }

text+="</div>";
if(sessia.service=='pdp' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_pdp' data-status='"+properties.status+"' data-pdp_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_pdp' data-status='"+properties.status+"' data-pdp_id='"+properties.id+"'>O'chirish</button>";
}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_pdp' data-status='"+properties.status+"' data-pdp_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Aholi punktining nomi</td><td>'+properties.aholi_punktining_nomi+'</td></tr>\
         <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(properties.respublika_viloyat)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+properties.tuman_shahar+'</td></tr>\
    <tr><td>Mamuriy hududiy birliklarni belgilash tizimi kodi</td><td>'+properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+'</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>'+properties.aholi_punktining_tipi+'</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>'+properties.aholi_punktining_maqomi+'</td></tr>\
     <tr><td>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquv</td><td>'+properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+'</td></tr>\
     <tr><td>Ishlab chiqalgan yili</td><td>'+properties.ishlab_chiqalgan_yili+'</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>'+properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+'</td></tr>';

 if(properties.tasdiqlanganligi=='1'){
     text+='<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>'+properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+'</td></tr>\
      <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam san</td><td>'+properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+'</td></tr>';
 }     
     text+='<tr><td>Aholi punktining loyihaviy maydoni ga</td><td>'+properties.aholi_punktining_loyihaviy_maydoni_ga+'</td></tr>\
     <tr><td>Aholining loyihaviy soni</td><td>'+properties.aholining_loyihaviy_soni+'</td></tr>';


for(var res in result){
if(result[res].pdf!=''){
text+=`<tr><td>`+result[res].sub_name+`</td><td><a class="button_pdf_viewer" data-filename="`+myencode(result[res].pdf)+`" >Открыть PDF</a></td></tr>`;
}
}
if(sessia.status!='-1'){
if(properties.grafik_malumot!=''){
text+="<tr><td>Grafik ma'lumotlar</td><td><p  data-filename='"+myencode(properties.grafik_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}
if(properties.izohlovchi_malumot!=''){
  text+="<tr><td>Izohlovchi ma'lumot</td><td><p  data-filename='"+myencode(properties.izohlovchi_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}
}
text+='</tbody></table>';



$('#popup_dialog_pdp').html(text);
$('#popup_dialog_pdp').dialog('open');
document.getElementById("popup_dialog_pdp").scrollTop = 0;

}
},
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_pdp_edit(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('type','edit');
data.append('status',properties.status);
    $.ajax({
        url: '/pdp_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var result=data[0].json;
var sessia=data[0].sessia;
if(result.length!=0 && result[0].layer_name!=''){
map.removeLayer(pdp_edit);
  
   for (var i = 0; i <50 ; i++) {
      if(map.hasLayer(pdp_edit_geotiff[i]))
      map.removeLayer(pdp_edit_geotiff[i]);
     }

pdp_edit_geotiff[result[0].zindex] = L.tileLayer.wms('/geocache', {
            opacity: 0.9,
            layers: 'dshk:'+result[0].layer_name,
            format: 'image/png',
            zIndex: result[0].zindex,
            maxZoom:20,
            transparent: true,
}).addTo(map);

    text+='<input type="checkbox" class="checkbox_geotiff_pdp_edit" data-layer_name="'+result[0].layer_name+'" checked id="checkbox_geotiff_edit_'+result[0].layer_name+'" data-layer_id="'+result[0].zindex+'" />';
     text+="<label for='checkbox_geotiff_edit_"+result[0].layer_name+"' >"+result[0].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_pdp_edit' data-layer_id='"+result[0].zindex+"'><br>";

text+="<ul class='click_modal_ul'>";
for (var i in result[0].data){
text+='<li data-magnify="gallery" data-caption="'+result[0].data[i].nomi+'"  href="'+result[0].data[i].file_name+'">'+result[0].data[i].nomi+'</li>';

}
text+="</ul>";


}
else{
 text+="<input type='range' min=0 max=10 value=8 class='change_opacity_pdp_edit'><br>"; 
}
var i=0;
for(var res in result){
if(result[res].layer_name!='' && res!=0) {i++;}
}

if(i>0){
text+="<div data-status='0' class='open_close_secret_div_pdp_edit open_close_secret_div'>Дополнительные слои <span id='span_open_close_pdp_edit' > &#9660</span></div><div style='display:none' id='secret_div_pdp_edit'>";
}
for(var res in result){
  if(res!=0){
    if(result[res].layer_name!=''){
    text+='<input type="checkbox" class="checkbox_geotiff_pdp_edit" data-layer_name="'+result[res].layer_name+'" id="checkbox_geotiff_edit_'+result[res].layer_name+'" data-layer_id="'+result[res].zindex+'" />';
     text+="<label for='checkbox_geotiff_edit_"+result[res].layer_name+"' >"+result[res].sub_name+"</label><br>";
     text+="<input type='range' min=0 max=10 value=9 class='change_opacity_geotiff_pdp_edit' data-layer_id='"+result[res].zindex+"'><br>";
  
text+="<ul class='click_modal_ul'>";
for (var i in result[res].data){
text+='<li data-magnify="gallery" data-caption="'+result[res].data[i].nomi+'"  href="'+result[res].data[i].file_name+'">'+result[res].data[i].nomi+'</li>';

}
text+="</ul>";
  }}
  }

text+="</div>";

if(sessia.service=='pdp' && sessia.status=='2' ){

if(properties.status==1){
text+="<button class='btn mybtn btn-success button_save_new_pdp' data-confirm='1' data-pdp_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_pdp' data-confirm='0' data-pdp_id='"+properties.id+"'>Saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-success button_save_edit_pdp' data-confirm='1' data-pdp_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_pdp' data-confirm='0' data-pdp_id='"+properties.id+"'>O'zgarishni rad etish</button>";

}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_pdp_admin' data-confirm='1' data-pdp_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_pdp_admin' data-confirm='0' data-pdp_id='"+properties.id+"'>O'chirishni rad etish</button>";

}
}

if(sessia.service=='pdp' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info button_edit_pdp' data-status='"+properties.status+"' data-pdp_id='"+properties.id+"'>O'zgartirish</button>";
}}

text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Aholi punktining nomi</td><td>'+properties.aholi_punktining_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(properties.respublika_viloyat)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+properties.tuman_shahar+'</td></tr>\
    <tr><td>Mamuriy hududiy birliklarni belgilash tizimi kodi</td><td>'+properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+'</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>'+properties.aholi_punktining_tipi+'</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>'+properties.aholi_punktining_maqomi+'</td></tr>\
     <tr><td>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquv</td><td>'+properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+'</td></tr>\
     <tr><td>Ishlab chiqalgan yili</td><td>'+properties.ishlab_chiqalgan_yili+'</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>'+properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+'</td></tr>';

 if(properties.tasdiqlanganligi=='1'){
     text+='<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>'+properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+'</td></tr>\
      <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam san</td><td>'+properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+'</td></tr>';
 }     
     text+='<tr><td>Aholi punktining loyihaviy maydoni ga</td><td>'+properties.aholi_punktining_loyihaviy_maydoni_ga+'</td></tr>\
     <tr><td>Aholining loyihaviy soni</td><td>'+properties.aholining_loyihaviy_soni+'</td></tr>';


for(var res in result){
if(result[res].pdf!=''){
text+=`<tr><td>`+result[res].sub_name+`</td><td><a class="button_pdf_viewer" data-filename="`+myencode(result[res].pdf)+`" >Открыть PDF</a></td></tr>`;
}
}
if(properties.grafik_malumot!=''){
text+="<tr><td>Grafik ma'lumotlar</td><td><p  data-filename='"+myencode(properties.grafik_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}
if(properties.izohlovchi_malumot!=''){
  text+="<tr><td>Izohlovchi ma'lumot</td><td><p  data-filename='"+myencode(properties.izohlovchi_malumot)+"' class='tag_download_sec' >Yuklab olish</p></td></tr>";
}

text+='</tbody></table>'; 

$('#popup_dialog_pdp_edit').html(text);
$('#popup_dialog_pdp_edit').dialog('open');
  document.getElementById("popup_dialog_pdp_edit").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}
 
function create_popup_apot(properties){
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('type','orginal');
data.append('status',properties.status);
    $.ajax({
        url: '/apot_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var sub_apot=JSON.parse(data[0].data);

var sessia=data[0].sessia;
var text;
text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_apot' ><br>";

if(sessia.service=='apot' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_apot' data-status='"+properties.status+"' data-apot_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_apot' data-status='"+properties.status+"' data-apot_id='"+properties.id+"'>O'chirish</button>";
}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_apot' data-status='"+properties.status+"' data-apot_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<hr class='hr_popup' /><br>";

text+="<table class = 'table table-bordered table-striped'  style = 'font-size:15px; overflow-x: hidden !important;' >\
  <tbody>\
      <tr><td>Qishloq fuqarolar yig'ini nomi</td><td>"+properties.fuqarolar_yiginlari+"</td></tr>\
      <tr><td>Respublika, viloyat</td><td>"+vil(parseInt(properties.respublika_viloyat)).disUz+"</td></tr>\
    <tr><td>Tuman, shahar</td><td>"+properties.tuman_shahar+"</td></tr>\
    <tr><td>Mamuriy hududiy birliklarni  belgilash tizimi kodi</td><td>"+properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>"+properties.aholi_punktining_tipi+"</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>"+properties.aholi_punktining_maqomi+"</td></tr>\
     <tr><td>Loyihalash tashkiloti</td><td>"+properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>"+properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td></tr>";
     
if (properties.tasdiqlanganligi=='1'){
     text+="<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>"+properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+"</td></tr>\
     <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqami va sanasi</td><td>"+properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+"</td></tr>";
}

     text+="<tr><td>Aholi punktining loyihaviy maydoni (ga)</td><td>"+properties.aholi_punktining_loyihaviy_maydoni_ga+"</td></tr>\
      <tr><td>Aholining loyihaviy soni</td><td>"+properties.aholining_loyihaviy_soni+"</td></tr>\
      <tr><td>QFY markazi</td><td>"+properties.kfi_markazi+"</td></tr>\
      <tr><td>Bo'ysinuvchi aholi punktlari soni</td><td>"+properties.boysinuvchi_aholi_punktlari_soni+"</td></tr>\
      <tr><td>Ishlab chiqalgan yili</td><td>"+properties.ishlab_chiqalgan_yili+"</td></tr>\
      <tr><td>Ishlab_ chiqarish asosi</td><td>"+properties.ishlab_chiqarish_asosi+"</td></tr>\
     <tr><td>Shaharsozlik kengashi qarori</td><td>"+properties.shaharsozlik_kengashi_qarori+"</td></tr>\
     <tr><td>Aholi soni tip</td><td>"+properties.aholi_soni_tip+"</td></tr>";

for(var i in sub_apot){
if(sub_apot[i].fields.sub_apot_id.file_type=='1'){
text+=`<tr><td>`+sub_apot[i].fields.sub_apot_id.nomi+`</td><td><p  data-filename='`+myencode(sub_apot[i].fields.file)+`' class='tag_download_sec' >Yuklab olish</p></td></tr>`;
}
if(sub_apot[i].fields.sub_apot_id.file_type=='2'){

if(sub_apot[i].fields.file.split('.')[sub_apot[i].fields.file.split('.').length-1]=='pdf'||sub_apot[i].fields.file.split('.')[sub_apot[i].fields.file.split('.').length-1]=='PDF'){
text+=`<tr><td>`+sub_apot[i].fields.sub_apot_id.nomi+`</td><td><a class="button_pdf_viewer" data-filename="`+myencode(sub_apot[i].fields.file)+`" >Открыть PDF</a></td></tr>`;
}
else{
text+=`<tr><td>`+sub_apot[i].fields.sub_apot_id.nomi+`</td><td><p data-filename='`+myencode(sub_apot[i].fields.file)+`' data-caption='`+sub_apot[i].fields.sub_apot_id.nomi+`' class='sub_data_link' >Ko'rish</p></td></tr>`;
}
}
}
text+='</tbody></table>';

$('#popup_dialog_apot').html(text);
$('#popup_dialog_apot').dialog('open');
  document.getElementById("popup_dialog_apot").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_apot_edit(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','edit');

    $.ajax({
        url: '/apot_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var sub_apot=JSON.parse(data[0].data);

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_apot_edit' ><br>";

if(sessia.service=='apot' && sessia.status=='2' ){

if(properties.status==1){
text+="<button class='btn mybtn btn-success button_save_new_apot' data-confirm='1' data-apot_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_apot' data-confirm='0' data-apot_id='"+properties.id+"'>Saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-success button_save_edit_apot' data-confirm='1' data-apot_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_apot' data-confirm='0' data-apot_id='"+properties.id+"'>O'zgarishni rad etish</button>";

}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_apot_admin' data-confirm='1' data-apot_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_apot_admin' data-confirm='0' data-apot_id='"+properties.id+"'>O'chirishni rad etish</button>";

}
}

if(sessia.service=='apot' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info button_edit_apot' data-status='"+properties.status+"' data-apot_id='"+properties.id+"'>O'zgartirish</button>";
}}

text+="<hr class='hr_popup' /><br>";

text+="<table class = 'table table-bordered table-striped'  style = 'font-size:15px; overflow-x: hidden !important;' >\
  <tbody>\
      <tr><td>Qishloq fuqarolar yig'ini nomi</td><td>"+properties.fuqarolar_yiginlari+"</td></tr>\
      <tr><td>Respublika, viloyat</td><td>"+vil(parseInt(properties.respublika_viloyat)).disUz+"</td></tr>\
     <tr><td>Tuman, shahar</td><td>"+properties.tuman_shahar+"</td></tr>\
     <tr><td>Mamuriy hududiy birliklarni  belgilash tizimi kodi</td><td>"+properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td></tr>\
     <tr><td>Aholi punktining tipi</td><td>"+properties.aholi_punktining_tipi+"</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>"+properties.aholi_punktining_maqomi+"</td></tr>\
     <tr><td>Loyihalash tashkiloti</td><td>"+properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>"+properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td></tr>";
     
if (properties.tasdiqlanganligi=='1'){
     text+="<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>"+properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+"</td></tr>\
     <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqami va sanasi</td><td>"+properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+"</td></tr>";
}
     text+="<tr><td>Aholi punktining loyihaviy maydoni (ga)</td><td>"+properties.aholi_punktining_loyihaviy_maydoni_ga+"</td></tr>\
      <tr><td>Aholining loyihaviy soni</td><td>"+properties.aholining_loyihaviy_soni+"</td></tr>\
      <tr><td>QFY markazi</td><td>"+properties.kfi_markazi+"</td></tr>\
      <tr><td>Bo'ysinuvchi aholi punktlari soni</td><td>"+properties.boysinuvchi_aholi_punktlari_soni+"</td></tr>\
      <tr><td>Ishlab chiqalgan yili</td><td>"+properties.ishlab_chiqalgan_yili+"</td></tr>\
      <tr><td>Ishlab_ chiqarish asosi</td><td>"+properties.ishlab_chiqarish_asosi+"</td></tr>\
     <tr><td>Shaharsozlik kengashi qarori</td><td>"+properties.shaharsozlik_kengashi_qarori+"</td></tr>\
     <tr><td>Aholi soni tip</td><td>"+properties.aholi_soni_tip+"</td></tr>";

for(var i in sub_apot){
if(sub_apot[i].fields.sub_apot_id.file_type=='1'){
text+=`<tr><td>`+sub_apot[i].fields.sub_apot_id.nomi+`</td><td><p  data-filename='`+myencode(sub_apot[i].fields.file)+`' class='tag_download_sec' >Yuklab olish</p></td></tr>`;
}
if(sub_apot[i].fields.sub_apot_id.file_type=='2'){
if(sub_apot[i].fields.file.split('.')[sub_apot[i].fields.file.split('.').length-1]=='pdf'||sub_apot[i].fields.file.split('.')[sub_apot[i].fields.file.split('.').length-1]=='PDF'){
text+=`<tr><td>`+sub_apot[i].fields.sub_apot_id.nomi+`</td><td><a class="button_pdf_viewer" data-filename="`+myencode(sub_apot[i].fields.file)+`" >Открыть PDF</a></td></tr>`;
}
else{
text+=`<tr><td>`+sub_apot[i].fields.sub_apot_id.nomi+`</td><td><p data-filename='`+myencode(sub_apot[i].fields.file)+`' data-caption='`+sub_apot[i].fields.sub_apot_id.nomi+`' class='sub_data_link' >Ko'rish</p></td></tr>`;
}
}
}

text+='</tbody></table>'; 

$('#popup_dialog_apot_edit').html(text);
$('#popup_dialog_apot_edit').dialog('open');
  document.getElementById("popup_dialog_apot_edit").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_redline(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','orginal');
 
    $.ajax({
        url: '/redline_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_redline' ><br>";


if(sessia.service=='red_line' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_redline' data-status='"+properties.status+"' data-redline_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_redline' data-status='"+properties.status+"' data-redline_id='"+properties.id+"'>O'chirish</button>";
}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_redline' data-status='"+properties.status+"' data-redline_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Aholi punktining nomi</td><td>'+json_data.aholi_punktining_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(json_data.respublika_viloyat)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+json_data.tuman_shahar+'</td></tr>\
    <tr><td>Mamuriy hududiy birliklarni belgilash tizimi kodi</td><td>'+json_data.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+'</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>'+json_data.aholi_punktining_tipi+'</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>'+json_data.aholi_punktining_maqomi+'</td></tr>\
     <tr><td>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquv</td><td>'+json_data.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+'</td></tr>\
     <tr><td>Ishlab chiqalgan yili</td><td>'+json_data.ishlab_chiqalgan_yili+'</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>'+json_data.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+'</td></tr>';

 if(json_data.tasdiqlanganligi=='1'){
     text+='<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>'+json_data.shahar_chegarasi_loyihasini_tasdiqlangan_organ+'</td></tr>\
      <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam san</td><td>'+json_data.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+'</td></tr>';
 }     
     text+='<tr><td>Aholi punktining loyihaviy maydoni ga</td><td>'+json_data.aholi_punktining_loyihaviy_maydoni_ga+'</td></tr>\
     <tr><td>Aholining loyihaviy soni</td><td>'+json_data.aholining_loyihaviy_soni+'</td></tr>';


text+='</tbody></table>';

$('#popup_dialog_redline').html(text);
$('#popup_dialog_redline').dialog('open');
  document.getElementById("popup_dialog_redline").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_redline_edit(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','edit');
 
    $.ajax({
        url: '/redline_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
          // console.log(data);
var json_data=JSON.parse(data[0].data)[0]['fields'];

// console.log(json_data);

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_redline_edit' ><br>";

if(sessia.service=='red_line' && sessia.status=='2' ){

if(properties.status==1){
text+="<button class='btn mybtn btn-success button_save_new_redline' data-confirm='1' data-redline_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_redline' data-confirm='0' data-redline_id='"+properties.id+"'>Saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-success button_save_edit_redline' data-confirm='1' data-redline_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_redline' data-confirm='0' data-redline_id='"+properties.id+"'>O'zgarishni rad etish</button>";

}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_redline_admin' data-confirm='1' data-redline_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_redline_admin' data-confirm='0' data-redline_id='"+properties.id+"'>O'chirishni rad etish</button>";

}
}

if(sessia.service=='red_line' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info button_edit_redline' data-status='"+properties.status+"' data-redline_id='"+properties.id+"'>O'zgartirish</button>";
}}

text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Aholi punktining nomi</td><td>'+json_data.aholi_punktining_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(json_data.respublika_viloyat)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+json_data.tuman_shahar+'</td></tr>\
    <tr><td>Mamuriy hududiy birliklarni belgilash tizimi kodi</td><td>'+json_data.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+'</td></tr>\
    <tr><td>Aholi punktining tipi</td><td>'+json_data.aholi_punktining_tipi+'</td></tr>\
     <tr><td>Aholi punktining maqomi</td><td>'+json_data.aholi_punktining_maqomi+'</td></tr>\
     <tr><td>Loyihalash tashkiloti shahar chegarasi loyihasini ishlab chiquv</td><td>'+json_data.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+'</td></tr>\
     <tr><td>Ishlab chiqalgan yili</td><td>'+json_data.ishlab_chiqalgan_yili+'</td></tr>\
     <tr><td>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td><td>'+json_data.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+'</td></tr>';

 if(json_data.tasdiqlanganligi=='1'){
     text+='<tr><td>Shahar chegarasi loyihasini tasdiqlangan organ</td><td>'+json_data.shahar_chegarasi_loyihasini_tasdiqlangan_organ+'</td></tr>\
      <tr><td>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam san</td><td>'+json_data.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+'</td></tr>';
 }     
     text+='<tr><td>Aholi punktining loyihaviy maydoni ga</td><td>'+json_data.aholi_punktining_loyihaviy_maydoni_ga+'</td></tr>\
     <tr><td>Aholining loyihaviy soni</td><td>'+json_data.aholining_loyihaviy_soni+'</td></tr>';


text+='</tbody></table>';

$('#popup_dialog_redline_edit').html(text);
$('#popup_dialog_redline_edit').dialog('open');
  document.getElementById("popup_dialog_redline_edit").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}



function create_popup_funk_zones_po_genplan(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','orginal');
 
    $.ajax({
        url: '/funk_genplan_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_funk_zone_po_genplan' ><br>";


if(sessia.service=='funk_gen' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_funk_gen' data-status='"+properties.status+"' data-funk_gen_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_funk_gen' data-status='"+properties.status+"' data-type='one' data-funk_gen_id='"+properties.id+"'>O'chirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_funk_gen' data-status='"+properties.status+"' data-type='all' data-funk_gen_id='"+properties.id+"'>Barchasini o'chirish</button>";

}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_funk_gen' data-status='"+properties.status+"' data-funk_gen_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<br>";

text+=`<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>
<tr><td>Zonalarning nomi</td><td>`+json_data.zonalarning_nomi+`</td></tr>
<tr><td>Mavjud umoratlarning tavsifi(asosan)</td><td>`+json_data.mavjud_imoratlarning_tavsifi_asosan+`</td></tr>
<tr><td>Shaharsozlik faoliyatining ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</td></tr>
<tr><td>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</td></tr>
<tr><td>Shaharsozlik faoliyatining taqiqlangan turi</td><td>`+json_data.shaharsozlik_faoliyatining_taqiqlangan_turi+`</td></tr>
<tr><td>Funksional zonalarning maydoni(ga)</td><td>`+json_data.funktsional_zonalarning_maydoni_ga+`</td></tr>`;

text+='</tbody></table>';

$('#popup_dialog_funk_zones_po_genplan').html(text);
$('#popup_dialog_funk_zones_po_genplan').dialog('open');
  document.getElementById("popup_dialog_funk_zones_po_genplan").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_funk_zones_po_genplan_edit(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','edit');
 
    $.ajax({
        url: '/funk_genplan_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_funk_zone_po_genplan_edit' ><br>";

if(sessia.service=='funk_gen' && sessia.status=='2' ){

if(properties.status==1){
text+="<button class='btn mybtn btn-success button_save_new_funk_gen' data-type='one'  data-confirm='1' data-funk_gen_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-success button_save_new_funk_gen' data-type='all' data-confirm='1' data-funk_gen_id='"+properties.id+"'>Barchasini saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_funk_gen' data-type='one' data-confirm='0' data-funk_gen_id='"+properties.id+"'>Saqlashni rad etish</button>";
text+="<button class='btn mybtn btn-warning button_save_new_funk_gen' data-type='all' data-confirm='0' data-funk_gen_id='"+properties.id+"'>Barchasini saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-success button_save_edit_funk_gen' data-confirm='1' data-funk_gen_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_funk_gen' data-confirm='0' data-funk_gen_id='"+properties.id+"'>O'zgarishni rad etish</button>";

}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_funk_gen_admin' data-confirm='1' data-dtype='one' data-funk_gen_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-danger button_delete_funk_gen_admin' data-confirm='1' data-dtype='all' data-funk_gen_id='"+properties.id+"'>Barchasini o'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_funk_gen_admin' data-confirm='0' data-dtype='one' data-funk_gen_id='"+properties.id+"'>O'chirishni rad etish</button>";
text+="<button class='btn mybtn btn-warning button_delete_funk_gen_admin' data-confirm='0' data-dtype='all' data-funk_gen_id='"+properties.id+"'>Barchasini o'chirishni rad etish</button>";

}
}

if(sessia.service=='funk_gen' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info button_edit_funk_gen' data-status='"+properties.status+"' data-funk_gen_id='"+properties.id+"'>O'zgartirish</button>";
}}

text+="<br>";

text+=`<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>
<tr><td>Zonalarning nomi</td><td>`+json_data.zonalarning_nomi+`</td></tr>
<tr><td>Mavjud umoratlarning tavsifi(asosan)</td><td>`+json_data.mavjud_imoratlarning_tavsifi_asosan+`</td></tr>
<tr><td>Shaharsozlik faoliyatining ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</td></tr>
<tr><td>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</td></tr>
<tr><td>Shaharsozlik faoliyatining taqiqlangan turi</td><td>`+json_data.shaharsozlik_faoliyatining_taqiqlangan_turi+`</td></tr>
<tr><td>Funksional zonalarning maydoni(ga)</td><td>`+json_data.funktsional_zonalarning_maydoni_ga+`</td></tr>`;

text+='</tbody></table>';

$('#popup_dialog_funk_zones_po_genplan_edit').html(text);
$('#popup_dialog_funk_zones_po_genplan_edit').dialog('open');
  document.getElementById("popup_dialog_funk_zones_po_genplan_edit").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}












function create_popup_funk_zones_po_apot(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','orginal');
 
    $.ajax({
        url: '/funk_apot_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_funk_zone_po_apot' ><br>";


if(sessia.service=='funk_apot' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_funk_apot' data-status='"+properties.status+"' data-funk_apot_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_funk_apot' data-status='"+properties.status+"' data-type='one' data-funk_apot_id='"+properties.id+"'>O'chirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_funk_apot' data-status='"+properties.status+"' data-type='all' data-funk_apot_id='"+properties.id+"'>Barchasini o'chirish</button>";

}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_funk_apot' data-status='"+properties.status+"' data-funk_apot_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<br>";

text+=`<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>
<tr><td>Zonalarning nomi</td><td>`+json_data.zonalarning_nomi+`</td></tr>
<tr><td>Mavjud umoratlarning tavsifi(asosan)</td><td>`+json_data.mavjud_imoratlarning_tavsifi_asosan+`</td></tr>
<tr><td>Shaharsozlik faoliyatining ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</td></tr>
<tr><td>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</td></tr>
<tr><td>Shaharsozlik faoliyatining taqiqlangan turi</td><td>`+json_data.shaharsozlik_faoliyatining_taqiqlangan_turi+`</td></tr>
<tr><td>Funksional zonalarning maydoni(ga)</td><td>`+json_data.funktsional_zonalarning_maydoni_ga+`</td></tr>`;

text+='</tbody></table>';

$('#popup_dialog_funk_zones_po_apot').html(text);
$('#popup_dialog_funk_zones_po_apot').dialog('open');
  document.getElementById("popup_dialog_funk_zones_po_apot").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function create_popup_funk_zones_po_apot_edit(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','edit');
 
    $.ajax({
        url: '/funk_apot_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;

var text;
  text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=10 value=8  class='change_opacity_funk_zone_po_apot_edit' ><br>";

if(sessia.service=='funk_apot' && sessia.status=='2' ){

if(properties.status==1){
text+="<button class='btn mybtn btn-success button_save_new_funk_apot' data-type='one'  data-confirm='1' data-funk_apot_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-success button_save_new_funk_apot' data-type='all' data-confirm='1' data-funk_apot_id='"+properties.id+"'>Barchasini saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_funk_apot' data-type='one' data-confirm='0' data-funk_apot_id='"+properties.id+"'>Saqlashni rad etish</button>";
text+="<button class='btn mybtn btn-warning button_save_new_funk_apot' data-type='all' data-confirm='0' data-funk_apot_id='"+properties.id+"'>Barchasini saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-success button_save_edit_funk_apot' data-confirm='1' data-funk_apot_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_funk_apot' data-confirm='0' data-funk_apot_id='"+properties.id+"'>O'zgarishni rad etish</button>";

}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_funk_apot_admin' data-confirm='1' data-dtype='one' data-funk_apot_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-danger button_delete_funk_apot_admin' data-confirm='1' data-dtype='all' data-funk_apot_id='"+properties.id+"'>Barchasini o'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_funk_apot_admin' data-confirm='0' data-dtype='one' data-funk_apot_id='"+properties.id+"'>O'chirishni rad etish</button>";
text+="<button class='btn mybtn btn-warning button_delete_funk_apot_admin' data-confirm='0' data-dtype='all' data-funk_apot_id='"+properties.id+"'>Barchasini o'chirishni rad etish</button>";

}
}

if(sessia.service=='funk_apot' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info button_edit_funk_apot' data-status='"+properties.status+"' data-funk_apot_id='"+properties.id+"'>O'zgartirish</button>";
}}

text+="<br>";

text+=`<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>
<tr><td>Zonalarning nomi</td><td>`+json_data.zonalarning_nomi+`</td></tr>
<tr><td>Mavjud umoratlarning tavsifi(asosan)</td><td>`+json_data.mavjud_imoratlarning_tavsifi_asosan+`</td></tr>
<tr><td>Shaharsozlik faoliyatining ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</td></tr>
<tr><td>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</td><td>`+json_data.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</td></tr>
<tr><td>Shaharsozlik faoliyatining taqiqlangan turi</td><td>`+json_data.shaharsozlik_faoliyatining_taqiqlangan_turi+`</td></tr>
<tr><td>Funksional zonalarning maydoni(ga)</td><td>`+json_data.funktsional_zonalarning_maydoni_ga+`</td></tr>`;

text+='</tbody></table>';

$('#popup_dialog_funk_zones_po_apot_edit').html(text);
$('#popup_dialog_funk_zones_po_apot_edit').dialog('open');
  document.getElementById("popup_dialog_funk_zones_po_apot_edit").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


$(document).on('click','.create_popup_geo_ray_data_edit',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',$(this).attr('data-id'));
data.append('status',$(this).attr('data-status'));
data.append('type','edit');

    $.ajax({
        url: '/geo_ray_data_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data['data'])[0]['fields'];
var sessia=data['sessia'];

var text='';

if(sessia.service=='geo_ray' && sessia.status=='1' ){
  if(json_data.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
if(json_data.status==2 && data['edit']=='yes'){
text+="<button class='btn mybtn btn-info button_edit_geo_ray_data' data-status='"+json_data.status+"' data-id='"+json_data.id+"' data-geo_ray_id='"+data['id']+"' >O'zgartirish2</button>";
}
}}

text+='<br><table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Obyekt nomi</td><td>'+json_data.obyekt_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(json_data.vil_id)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+json_data.tuman+'</td></tr>\
    <tr><td>Joy nomi</td><td>'+json_data.joy_nomi+'</td></tr>\
    <tr><td>Invertar nomeri</td><td>'+json_data.inv_nomer+'</td></tr>\
     <tr><td>Bajaruvchi tashkilot</td><td>'+json_data.bajaruvchi_tashkilot+'</td></tr>\
     <tr><td>Bajaruvchi shaxs</td><td>'+json_data.bajaruvchi_shaxs+'</td></tr>\
     <tr><td>Buyurtmachi</td><td>'+json_data.buyurtmachi+'</td></tr>\
     <tr><td>Grifi</td><td>'+get_grif(json_data.grif)+'</td></tr>\
     <tr><td>Ish boshlangan vaqt</td><td>'+json_data.ish_boshlangan_vaqt+'</td></tr>\
     <tr><td>Ish yakunlangan vaqt</td><td>'+json_data.ish_yakunlangan_vaqt+'</td></tr>\
     <tr><td>Ish bajarilgan davr</td><td>'+json_data.ish_bajarilgan_davr+'</td></tr>\
     <tr><td>Koordinatalar tizimi</td><td>'+get_koor_tizim(json_data.koordinatalar_tizimi)+'</td></tr>\
     <tr><td>Masshtab</td><td>'+get_masshtab(json_data.masshtab)+'</td></tr>\
     <tr><td>Maydoni(ga)</td><td>'+json_data.maydoni_ga+'</td></tr>\
     <tr><td>Shartnoma nomeri</td><td>'+json_data.shartnoma_n+'</td></tr>\
     <tr><td>Shartnoma nomi</td><td>'+json_data.shartnoma_nomi+'</td></tr>\
     <tr><td>Soato</td><td>'+json_data.soato+'</td></tr>';
 
if(json_data.hisobot!=''){
text+=`<tr><td>Hisobot</td><td><a class="button_pdf_viewer" data-filename="`+myencode(json_data.hisobot)+`" >Ko'rish</a></td></tr>`;
}
if(json_data.grafik!=''){
text+=`<tr><td>Grafik ma'lumot</td><td><a class="button_pdf_viewer" data-filename="`+myencode(json_data.grafik)+`" >Ko'rish</a></td></tr>`;
}
text+='</tbody></table>';

$('#popup_dialog_geo_ray_data_edit').html(text);
$('#popup_dialog_geo_ray_data_edit').dialog('open');
document.getElementById("popup_dialog_geo_ray_data_edit").scrollTop = 0;
    },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });

});



$(document).on('click','.create_popup_geo_ray_data',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',$(this).attr('data-id'));
data.append('status',$(this).attr('data-status'));
data.append('type','orginal');

    $.ajax({
        url: '/geo_ray_data_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data['data'])[0]['fields'];

var sessia=data['sessia'];
var text='';
if(sessia.service=='geo_ray' && sessia.status=='1'){
if(json_data.status=='0'){
text+="<button class='btn mybtn btn-info button_edit_geo_ray_data' data-status='"+json_data.status+"' data-id='"+json_data.id+"' data-geo_ray_id='"+data['id']+"' >O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_geo_ray' data-type='data' data-status='"+json_data.status+"' data-geo_ray_id='"+data['id']+"'>O'chirish</button>";

}
if(json_data.status=='2' && data['edit']=='yes'){
text+="<button class='btn mybtn btn-info button_edit_geo_ray_data' data-status='"+json_data.status+"' data-id='"+json_data.id+"' data-geo_ray_id='"+data['id']+"'>O'zgartirish</button>";
}
if(json_data.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}



text+='<br><table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Obyekt nomi</td><td>'+json_data.obyekt_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+vil(parseInt(json_data.vil_id)).disUz+'</td></tr>\
    <tr><td>Tuman shahar</td><td>'+json_data.tuman+'</td></tr>\
    <tr><td>Joy nomi</td><td>'+json_data.joy_nomi+'</td></tr>\
    <tr><td>Invertar nomeri</td><td>'+json_data.inv_nomer+'</td></tr>\
     <tr><td>Bajaruvchi tashkilot</td><td>'+json_data.bajaruvchi_tashkilot+'</td></tr>\
     <tr><td>Bajaruvchi shaxs</td><td>'+json_data.bajaruvchi_shaxs+'</td></tr>\
     <tr><td>Buyurtmachi</td><td>'+json_data.buyurtmachi+'</td></tr>\
     <tr><td>Grifi</td><td>'+get_grif(json_data.grif)+'</td></tr>\
     <tr><td>Ish boshlangan vaqt</td><td>'+json_data.ish_boshlangan_vaqt+'</td></tr>\
     <tr><td>Ish yakunlangan vaqt</td><td>'+json_data.ish_yakunlangan_vaqt+'</td></tr>\
     <tr><td>Ish bajarilgan davr</td><td>'+json_data.ish_bajarilgan_davr+'</td></tr>\
     <tr><td>Koordinatalar tizimi</td><td>'+get_koor_tizim(json_data.koordinatalar_tizimi)+'</td></tr>\
     <tr><td>Masshtab</td><td>'+get_masshtab(json_data.masshtab)+'</td></tr>\
     <tr><td>Maydoni(ga)</td><td>'+json_data.maydoni_ga+'</td></tr>\
     <tr><td>Shartnoma nomeri</td><td>'+json_data.shartnoma_n+'</td></tr>\
     <tr><td>Shartnoma nomi</td><td>'+json_data.shartnoma_nomi+'</td></tr>\
     <tr><td>Soato</td><td>'+json_data.soato+'</td></tr>';
 
if(json_data.hisobot!=''){
text+=`<tr><td>Hisobot</td><td><a class="button_pdf_viewer" data-filename="`+myencode(json_data.hisobot)+`" >Ko'rish</a></td></tr>`;
}
if(json_data.grafik!=''){
text+=`<tr><td>Grafik ma'lumot</td><td><a class="button_pdf_viewer" data-filename="`+myencode(json_data.grafik)+`" >Ko'rish</a></td></tr>`;
}
text+='</tbody></table>';

$('#popup_dialog_geo_ray_data').html(text);
$('#popup_dialog_geo_ray_data').dialog('open');
document.getElementById("popup_dialog_geo_ray_data").scrollTop = 0;
    },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });

});




function create_popup_geologik_rayonlash(properties){
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','orginal');
     $.ajax({
        url: '/geo_ray_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;


var text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=100 value=80  class='change_opacity_geologik_rayonlash' >";


if(sessia.service=='geo_ray' && sessia.status=='1'){
if(properties.status=='0'){
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data' data-status='"+properties.status+"' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";
if(data[0].data_status!=3){
text+="<button class='btn mybtn btn-primary button_edit_geo_ray' data-status='"+properties.status+"' data-geo_ray_id='"+properties.id+"'>O'zgartirish</button>";
text+="<button class='btn mybtn btn-danger button_delete_geo_ray' data-status='"+properties.status+"' data-type='self' data-geo_ray_id='"+properties.id+"'>O'chirish</button>";
}
else{
  text+="<p class='p_dialog_alert' style='float:right;'>Asosiy ob'yekt o'chirishga berilgan</p>";  
}
}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data' data-status='"+properties.status+"' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";
text+="<button class='btn mybtn btn-primary button_edit_geo_ray' data-status='"+properties.status+"' data-geo_ray_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data' data-status='"+properties.status+"' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";
text+="<p class='p_dialog_alert' style='float:right;' >O'chirishga berilgan</p>";  
}
}
else{
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data' data-status='"+properties.status+"' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";

}

text+=`<br><table class = "table table-bordered table_geologik_rayonlash"  style = "font-size:15px; overflow-x: hidden !important;" >
<tr>
<td colspan='2'><b>Injenerlik geologik viloyat</b></td>
<td colspan='2'><b>Injenerlik geologik hudud</b></td>
<td colspan='2'><b>Injenerlik geologik kichik hududlar indeksi</b></td>
<td colspan='2'><b>Injenerlik geologik uchastka</b></td>
<td rowspan='2'><b>Hududlarning geologik genetik tavsifi</b></td>
<td rowspan='2'><b>Hududdagi geodinamik jarayonlar</b></td>
<td rowspan='2'><b>Tavsiya etiladigan injenerlik tadbirlari</b></td>
<td rowspan='2'><b>Gruntlarning seysmik xususiyatlari buyicha toifasi</b></td>
</tr>
<tr>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>

</tr>
<tr>
<td>`+check_null2(json_data.injenerlik_geologik_viloyat_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_viloyat_tavsifi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_hududlar_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_hududlar_tavsifi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_kichik_hududlar_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_kichik_hududlar_tavsifi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_uchastkalar_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_uchastkalar_tavsifi)+`</td>
<td>`+check_null2(json_data.hududlarning_geologik_genetik_tavsifi)+`</td>
<td>`+check_null2(json_data.hududdagi_geodinamik_jarayonlar)+`</td>
<td>`+check_null2(json_data.tavsiya_etiladigan_injenerlik_tadbirlari)+`</td>
<td>`+check_null2(json_data.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi)+`</td>

</tr>
</table>`;

$('#popup_dialog_geologik_rayonlash').html(text);
$('#popup_dialog_geologik_rayonlash').dialog('open');
document.getElementById("popup_dialog_geologik_rayonlash").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}






function create_popup_geologik_rayonlash_edit(properties){
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('id',properties.id);
data.append('status',properties.status);
data.append('type','edit');
 
    $.ajax({
        url: '/geo_ray_dialog_view',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json_data=JSON.parse(data[0].data)[0]['fields'];

var sessia=data[0].sessia;

var text="<p>Karta ko'rinish holatini sozlash </p>\
<input type='range' min=0 max=100 value=80  class='change_opacity_geologik_rayonlash_edit' >";


if(sessia.service=='geo_ray' && sessia.status=='2' ){

if(properties.status==1){
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data_edit' data-status='1' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";
text+="<button class='btn mybtn btn-success button_save_new_geo_ray' data-type='one'  data-confirm='1' data-geo_ray_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-success button_save_new_geo_ray' data-type='all' data-confirm='1' data-geo_ray_id='"+properties.id+"'>Barchasini saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_geo_ray' data-type='one' data-confirm='0' data-geo_ray_id='"+properties.id+"'>Saqlashni rad etish</button>";
text+="<button class='btn mybtn btn-warning button_save_new_geo_ray' data-type='all' data-confirm='0' data-geo_ray_id='"+properties.id+"'>Barchasini saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data_edit' data-status='2' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";

if(json_data.geolograyon_data_edit_id!=null){
text+="<button class='btn mybtn btn-success button_save_edit_geo_ray_data' data-confirm='1' data-geo_ray_id='"+json_data.id+"'>O'zgarishni tasqiqlash (asosiy ob'yektga qarang)</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_geo_ray_data' data-confirm='0' data-geo_ray_id='"+json_data.id+"'>O'zgarishni rad etish (asosiy ob'yektga qarang)</button>";

}else{
text+="<button class='btn mybtn btn-success button_save_edit_geo_ray' data-confirm='1' data-geo_ray_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_geo_ray' data-confirm='0' data-geo_ray_id='"+properties.id+"'>O'zgarishni rad etish</button>";


}

}
if (properties.status==3) {
  text+="<button class='btn mybtn btn-info create_popup_geo_ray_data_edit' data-status='2' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";

 if(data[0].data_status==3){
text+="<button class='btn mybtn btn-danger button_delete_geo_ray_admin' data-confirm='1' data-dtype='all' data-geo_ray_id='"+properties.id+"'>Barchasini o'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_geo_ray_admin' data-confirm='0' data-dtype='all' data-geo_ray_id='"+properties.id+"'>Barchasini o'chirishni rad etish</button>";
}
else{
text+="<button class='btn mybtn btn-danger button_delete_geo_ray_admin' data-confirm='1' data-dtype='one' data-geo_ray_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_geo_ray_admin' data-confirm='0' data-dtype='one' data-geo_ray_id='"+properties.id+"'>O'chirishni rad etish</button>";
}
}
}
if(sessia.service=='geo_ray' && sessia.status=='1' ){
  if(properties.status==3){
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data_edit' data-status='1' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";
text+="<p class='p_dialog_alert'  style='float:right;' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info create_popup_geo_ray_data_edit' data-status='"+properties.status+"' data-id='"+properties.id+"'>Asosiy obyektni ko'rish</button>";
text+="<button class='btn mybtn btn-primary button_edit_geo_ray' data-status='"+properties.status+"' data-geo_ray_id='"+properties.id+"'>O'zgartirish</button>";
}}

text+=`<br><table class = "table table-bordered table_geologik_rayonlash"  style = "font-size:15px; overflow-x: hidden !important;" >
<tr>
<td colspan='2'><b>Injenerlik geologik viloyat</b></td>
<td colspan='2'><b>Injenerlik geologik hudud</b></td>
<td colspan='2'><b>Injenerlik geologik kichik hududlar indeksi</b></td>
<td colspan='2'><b>Injenerlik geologik uchastka</b></td>
<td rowspan='2'><b>Hududlarning geologik genetik tavsifi</b></td>
<td rowspan='2'><b>Hududdagi geodinamik jarayonlar</b></td>
<td rowspan='2'><b>Tavsiya etiladigan injenerlik tadbirlari</b></td>
<td rowspan='2'><b>Gruntlarning seysmik xususiyatlari buyicha toifasi</b></td>
</tr>
<tr>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>
<td><b>indeksi</b></td>
<td><b>tavsifi</b></td>

</tr>
<tr>
<td>`+check_null2(json_data.injenerlik_geologik_viloyat_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_viloyat_tavsifi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_hududlar_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_hududlar_tavsifi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_kichik_hududlar_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_kichik_hududlar_tavsifi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_uchastkalar_indeksi)+`</td>
<td>`+check_null2(json_data.injenerlik_geologik_uchastkalar_tavsifi)+`</td>
<td>`+check_null2(json_data.hududlarning_geologik_genetik_tavsifi)+`</td>
<td>`+check_null2(json_data.hududdagi_geodinamik_jarayonlar)+`</td>
<td>`+check_null2(json_data.tavsiya_etiladigan_injenerlik_tadbirlari)+`</td>
<td>`+check_null2(json_data.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi)+`</td>

</tr>
</table>`;

$('#popup_dialog_geologik_rayonlash_edit').html(text);
$('#popup_dialog_geologik_rayonlash_edit').dialog('open');
document.getElementById("popup_dialog_geologik_rayonlash_edit").scrollTop = 0;

        },
        error: function () {
          console.log("Ajaxda xatolik")
        }
      });
}


function check_null2(a){ return a=='null'||a==null?'':a;}
