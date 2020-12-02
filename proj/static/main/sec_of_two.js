function create_popup_genplan(properties){
var text='';
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
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
text+="<button class='btn mybtn btn-danger button_delete_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'chirish</button>";
}
if(properties.status=='2'){
text+="<button class='btn mybtn btn-info button_edit_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'zgartirish</button>";
}
if(properties.status=='3'){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
}
}

text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Aholi punktining nomi</td><td>'+properties.aholi_punktining_nomi+'</td></tr>\
         <tr><td>Respublika, viloyat</td><td>'+viloyat[(parseInt(properties.respublika_viloyat)-1)].disUz+'</td></tr>\
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

if(properties.status=='3'){
data.append('id',properties.id);
}
else{
data.append('id',properties.id);
}
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

if(properties.status==1){
text+="<button class='btn mybtn btn-success button_save_new_genplan' data-confirm='1' data-genplan_id='"+properties.id+"'>Saqlashni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_new_genplan' data-confirm='0' data-genplan_id='"+properties.id+"'>Saqlashni rad etish</button>";

}
if(properties.status==2){
text+="<button class='btn mybtn btn-success button_save_edit_genplan' data-confirm='1' data-genplan_id='"+properties.id+"'>O'zgarishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_save_edit_genplan' data-confirm='0' data-genplan_id='"+properties.id+"'>O'zgarishni rad etish</button>";

}
if (properties.status==3) {
text+="<button class='btn mybtn btn-danger button_delete_genplan_admin' data-confirm='1' data-genplan_id='"+properties.id+"'>O'chirishni tasqiqlash</button>";
text+="<button class='btn mybtn btn-warning button_delete_genplan_admin' data-confirm='0' data-genplan_id='"+properties.id+"'>O'chirishni rad etish</button>";

}
}

if(sessia.service=='genplan' && sessia.status=='1' ){
  if(properties.status==3){
text+="<p class='p_dialog_alert' >O'chirishga berilgan</p>";  
  }
  else{
text+="<button class='btn mybtn btn-info button_edit_genplan' data-status='"+properties.status+"' data-genplan_id='"+properties.id+"'>O'zgartirish</button>";
}}


text+="<hr class='hr_popup' /><br>";

text+='<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >\
  <tbody>\
    <tr><td>Aholi punktining nomi</td><td>'+properties.aholi_punktining_nomi+'</td></tr>\
    <tr><td>Respublika, viloyat</td><td>'+viloyat[(parseInt(properties.respublika_viloyat)-1)].disUz+'</td></tr>\
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
         <tr><td>Respublika, viloyat</td><td>'+viloyat[(parseInt(properties.respublika_viloyat)-1)].disUz+'</td></tr>\
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

$('#popup_dialog_pdp').html(text);
$('#popup_dialog_pdp').dialog('open');
  document.getElementById("popup_dialog_pdp").scrollTop = 0;

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

if(properties.status=='3'){
data.append('id',properties.id);
}
else{
data.append('id',properties.id);
}
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
    <tr><td>Respublika, viloyat</td><td>'+viloyat[(parseInt(properties.respublika_viloyat)-1)].disUz+'</td></tr>\
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
      <tr><td>Respublika, viloyat</td><td>"+viloyat[(parseInt(properties.respublika_viloyat)-1)].disUz+"</td></tr>\
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
      <tr><td>Respublika, viloyat</td><td>"+viloyat[(parseInt(properties.respublika_viloyat)-1)].disUz+"</td></tr>\
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



