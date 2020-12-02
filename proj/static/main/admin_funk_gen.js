$(document).on('click','.button_save_edit_funk_gen',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('funk_gen_id',$(this).attr('data-funk_gen_id'));
    $.ajax({
        url: '/save_edit_funk_gen',
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
$('.button_save_edit_funk_gen').prop('disabled','disabled');

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



$(document).on('click','.button_delete_funk_gen',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('funk_gen_id',$(this).attr('data-funk_gen_id'));
  data.append('status',$(this).attr('data-status'));
  data.append('type','last_delete');
  data.append('dtype',$(this).attr('data-type'));
    $.ajax({
        url: '/delete_funk_gen',
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
 $('.button_delete_funk_gen').prop('disabled','disabled');
 $('.button_delete_funk_gen').prop('disabled','disabled');            
},
      error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});




$(document).on('click','.button_delete_funk_gen_admin',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('funk_gen_id',$(this).attr('data-funk_gen_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('dtype',$(this).attr('data-dtype'));
  data.append('type','admin_delete');
    $.ajax({
        url: '/delete_funk_gen',
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
 $('.button_delete_funk_gen_admin').prop('disabled','disabled');
  
        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});



$('#modal_create_funk_gen').dialog({
  resizable: false,
  autoOpen:false,
  height: 660,
  width: 700,
  modal: false,
  dialogClass:'modal_create_funk_gen',
   create:function(e){
$('.modal_create_funk_gen').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  close:function(){
drawnItems.clearLayers();
funk_zone_layer.clearLayers();
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
 

$('#button_create_funk_gen_dialog').on('click',function(){

 let text=`

 <div id="ftabs">
 
  <ul style='background:#e9e9e9; height:40px;'>
    <li><a href="#ftabs-1">Tizimda turib hosil qilish</a></li>
    <li><a href="#ftabs-2">Fayldan yuklagan holda kiritish</a></li>
  </ul>
  <div id="ftabs-1" style='border:none;'>
<div class='row'>
<div class='col-12 col-lg-6 col-sm-6 col-md-6'>
<label for='vil_id' class='label_admin_input'>Viloyatni tanlang</label> 
<select id="vil_id" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}



text+=`</select>
</div>
<div class='col-12 col-lg-6 col-sm-6 col-md-6'>
<label for='genplan_id' class='label_admin_input'>Bosh rejani tanlang</label> 
<select id="genplan_id" class = "form-control">
<option value='-1'selected >----</option>
</select>
</div>
</div>

<label for='funk_zone_type' class='label_admin_input'>Funksional zonani turini tanlang</label> 
<select id="funk_zone_type" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in zone_type){
  if(zone_type[i].yesgenplan=='True'){
  text+=`<option value='`+zone_type[i].type+`' >`+zone_type[i].disUz+`</option>`;
}
}

text+=`</select>

<label for='mut' class='label_admin_input'>Mavjud umoratlarning tavsifi(asosan)</label> 
<textarea class='form-control' id='mut' rows="4"></textarea>

<label for='shfret' class='label_admin_input'>Shaharsozlik faoliyatining ruxsat etilgan turi</label> 
<textarea class='form-control' id='shfret' rows="4"></textarea>

<label for='shfmsharet' class='label_admin_input'>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</label> 
<textarea class='form-control' id='shfmsharet' rows="4"></textarea>

<label for='shftt' class='label_admin_input'>Shaharsozlik faoliyatining taqiqlangan turi</label> 
<textarea class='form-control' id='shftt' rows="4"></textarea>

<label for='fzm' class='label_admin_input'>Funksional zonaning maydoni(ga)</label> 
<input class='form-control' id='fzm' type='text' >

<br>
<input type="button" id="create_funk_gen_button" class='btn btn-success' value="Saqlash">

  </div>
  <div id="ftabs-2" style='border:none;' >

  <div class='row'>
<div class='col-12 col-lg-6 col-sm-6 col-md-6'>
<label for='vil_id2' class='label_admin_input'>Viloyatni tanlang</label> 
<select id="vil_id2" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}



text+=`</select>
</div>
<div class='col-12 col-lg-6 col-sm-6 col-md-6'>
<label for='genplan_id2' class='label_admin_input'>Bosh rejani tanlang</label> 
<select id="genplan_id2" class = "form-control">
<option value='-1'selected >----</option>
</select>
</div>
</div>

  <label for="vec_file_type2" class='label_admin_input'>Fayl turini tanlang</label>
   <select id='vec_file_type2' class="form-control">
    <option value="gdb">GDB file</option>
  </select>

<label for="vec_file_proj2" class='label_admin_input'>Fayl proeksiyasini tanlang</label>
   <select id='vec_file_proj2' class="form-control">
    <option value = "4326" selected>WGS 84</option>
    <option value = "28469">Pulkovo_1942_GK_Zone_9N</option>
    <option value = "28470">Pulkovo_1942_GK_Zone_10N</option>
    <option value = "28471">Pulkovo_1942_GK_Zone_11N</option>
    <option value = "28472">Pulkovo_1942_GK_Zone_12N</option>
    <option value = "28473">Pulkovo_1942_GK_Zone_13N</option>
    <option value = "28474">Pulkovo_1942_GK_Zone_14N</option>
    <option value = "32640">WGS_1984_UTM_Zone_40N</option>
    <option value = "32641">WGS_1984_UTM_Zone_41N</option>
    <option value = "32642">WGS_1984_UTM_Zone_42N</option>
    <option value = "32643">WGS_1984_UTM_Zone_43N</option>
</select>

<label for="upload_files_id2" class='label_admin_input' >Faylni biriktirish</label>
<label class="form-control">
<input type='file' id="upload_files_id2" webkitdirectory directory multiple style='display:none;' class="input_vec_file" >
<span class="span_admin_tab">Faylni tanlang</span>
</label>
<br>
  <button class="btn btn-info" id="load_vector_files2">Oldindan ko'rish</button>
  <button class="btn btn-success" id="create_funk_gen_button2">Saqlash</button>


  </div>
</div><div id="load_alert_div"></div>
 `;

$('#modal_create_funk_gen').html(text);
$('#modal_create_funk_gen').dialog('open');
$('#ftabs').tabs();

});


$(document).on('click','#create_funk_gen_button2',function(){


if($('#vil_id2').val()!=-1 && $('#genplan_id2').val()!=-1){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});


if(funk_zone_layer.toGeoJSON().features.length==0){
$('#load_alert_div').html("<p>Vektorli ma'lumotlar kiritilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');
}
else{

var cols=['Zonalarning_nomi','Funktsional_zonalarning_maydoni_ga','Mavjud_imoratlarning_tavsifi_asosan','Shaharsozlik_faoliyatining_ruxsat_berilgan_turi','Shaharsozlik_faoliyatining_taqiqlangan_turi','Shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_rux' ,'Type'];

var cc=0;
for (let i in funk_zone_layer.toGeoJSON().features[0].properties){
if(cols.indexOf(i)!=-1){cc++;}
}


if(cc==7){
var c=0;
for (let i in funk_zone_layer.toGeoJSON().features){
if(funk_zone_layer.toGeoJSON().features[i].geometry.type!='MultiPolygon'){
  c++;
}
}
if(c==0){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('vil_id',$('#vil_id2').val());
data.append('layers',JSON.stringify(funk_zone_layer.toGeoJSON()));
data.append('genplan_id',$('#genplan_id2').val());
data.append('type','multiple');

    $.ajax({
        url: '/create_funk_gen',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
if(result==1){
$('#load_alert_div').html("<p>Saqlandi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');
}
else{
$('#load_alert_div').html("<p>Xatolik !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_error');
}
},
        error:function(){
        $('#load_alert_div').css({'display':'none'});
        $('#load_alert_div').html("<p>Yuklashda xatolik !!</p>");
        $('#load_alert_div').css({'display':'block'});
        $('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
        }
});


}
else{


$('#load_alert_div').html("<p>Vektorli ma'lumotda MultiPolygon bo'lmagan ob'yekt bor!!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');

}
}
else{

$('#load_alert_div').html(`<p>Vektorli ma'lumotda ustunlar nomi mos emas!!</p>`);

$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 

}

}
}
else{
$('#load_alert_div').html("<p>Asosiy maydonlar to'ldirilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
}


});


function style_funk_type(feature) {
  return {
        fillColor: funk_zone(feature.properties.Type).color,
        weight: 2,
        opacity: 0.6,
        color: '#000',
        dashArray: '2',
        fillOpacity: 0.8
  };
}

var funk_zone_layer = L.geoJson(null,{
  style:style_funk_type,
  onEachFeature: function (feature, layer) {
         layer.bindPopup('<p style="font-size:14px;">'+feature.properties.Zonalarning_nomi+'</p>');
       }
}).addTo(map);


$(document).on('click','#load_vector_files2',function(){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});
 
    var data = new FormData();
    $.each($('#upload_files_id2')[0].files, function(i, file) {
        data.append("file", file);
    });
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
    data.append('file-type',$('#vec_file_type2').val());
    data.append("epsg",$('#vec_file_proj2').val());
    if($('#upload_files_id2')[0].files.length!=0)
    {
    $.ajax({
        url: '/convert_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        beforeSend: function () {
        },
        success: function (data_res) {
          if(data_res==1){
  $('#load_alert_div').css({'display':'none'});

$.getJSON("/static/folder_for_download/result.json", function (data) {
    funk_zone_layer.addData(data);
    map.flyToBounds(funk_zone_layer.getBounds());

});
}
        },
        error: function () {
        $('#load_alert_div').css({'display':'none'});
        $('#load_alert_div').html("<p>Vektorli fayli yuklashda xatolik !!</p>");
        $('#load_alert_div').css({'display':'block'});
        $('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
          console.log("Error uploading file")
        }
      });
}
else{
$('#load_alert_div').html("<p>Vektorli fayl kiritilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');

}
});



$(document).on('change','#vil_id',function(){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});

 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
 data.append('vil_id',$(this).val());
    $.ajax({
        url: '/redline_genplans_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

 // console.log(result);
 let text="<option value='-1'selected >----</option>";
 for (let i in result.genplan_data){
  // console.log(result.genplan_data[i].aholi_punktining_nomi);
text+=`<option value='`+result.genplan_data[i].pk+`'>`+result.genplan_data[i].aholi_punktining_nomi+`</option>`;
}

$('#genplan_id').html(text);
$('#load_alert_div').css({'display':'none'});
 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});
 

});


$(document).on('change','#vil_id2',function(){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});

 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
 data.append('vil_id',$(this).val());
    $.ajax({
        url: '/redline_genplans_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

 let text="<option value='-1'selected >----</option>";
 for (let i in result.genplan_data){
text+=`<option value='`+result.genplan_data[i].pk+`'>`+result.genplan_data[i].aholi_punktining_nomi+`</option>`;
}

$('#genplan_id2').html(text);
$('#load_alert_div').css({'display':'none'});
 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});
 

});


$(document).on('click','.button_edit_funk_gen',function(){

  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('funk_gen_id',$(this).attr('data-funk_gen_id'));
  data.append('status',$(this).attr('data-status'));
  
    $.ajax({
        url: '/edit_funk_gen_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
var json = JSON.parse(result['funk_gen_json']);
json.features[0].geometry.coordinates.forEach(function(corr,i){
var polygon={type:'Polygon',coordinates:corr};
L.geoJson(polygon,{
  onEachFeature:function(features,layer){
    drawnItems.addLayer(layer);
  }
});
});


text=`
<div id='div_funk_gen'>
<label for='vil_id' class='label_admin_input'>Viloyatni tanlang</label> 
<select id="vil_id" class = "form-control">`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}

text+=`</select>


<label for='genplan_id' class='label_admin_input'>Bosh rejani tanlang</label> 
<select id="genplan_id" class = "form-control">`;

for(let i in result['genplan_data']){
  text+=`<option value='`+result['genplan_data'][i].pk+`'>`+result['genplan_data'][i].aholi_punktining_nomi+`</option>`;
}

text+=`</select>
<label for='funk_zone_type' class='label_admin_input'>Funksional zonani turini tanlang</label> 
<select id="funk_zone_type" class = "form-control">`;

for(let i in zone_type){
  if(zone_type[i].yesgenplan=='True'){
  text+=`<option value='`+zone_type[i].type+`' >`+zone_type[i].disUz+`</option>`;
}
}

text+=`</select>

<label for='mut' class='label_admin_input'>Mavjud umoratlarning tavsifi(asosan)</label> 
<textarea class='form-control' id='mut' rows="4">`+json.features[0].properties.mavjud_imoratlarning_tavsifi_asosan+`</textarea>

<label for='shfret' class='label_admin_input'>Shaharsozlik faoliyatining ruxsat etilgan turi</label> 
<textarea class='form-control'  id='shfret' rows="4">`+json.features[0].properties.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</textarea>

<label for='shfmsharet' class='label_admin_input'>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</label> 
<textarea class='form-control'id='shfmsharet' rows="4">`+json.features[0].properties.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</textarea>

<label for='shftt' class='label_admin_input'>Shaharsozlik faoliyatining taqiqlangan turi</label> 
<textarea class='form-control'  id='shftt' rows="4">`+json.features[0].properties.shaharsozlik_faoliyatining_taqiqlangan_turi+`</textarea>

<label for='fzm' class='label_admin_input'>Funksional zonaning maydoni(ga)</label> 
<input class='form-control'  id='fzm' type='text' >

<br>

<input type='hidden' id='funk_gen_status' value='`+result['status']+`'>
<input type='hidden' id='funk_gen_id' value='`+result['funk_gen_id']+`'>
<input type="button" id="edit_funk_gen_button" class='btn btn-success' value="O'zgartirish">
<div id="load_alert_div"></div>
</div>
`;


$('#modal_create_funk_gen').html(text);
$('#modal_create_funk_gen').dialog('open');


$('#fzm').val(json.features[0].properties.funktsional_zonalarning_maydoni_ga);
$('#vil_id option[value='+json.features[0].properties.vil_id+']').prop("selected",true);
$('#funk_zone_type option[value='+json.features[0].properties.type+']').prop("selected",true);
$('#genplan_id option[value='+json.features[0].properties.genplan_id+']').prop("selected",true);

 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});

});


$(document).on('click','#create_funk_gen_button',function(){

if($('#vil_id').val()!=-1 && $('#genplan_id').val()!=-1 && $('#funk_zone_type').val()!=-1){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});


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
data.append('vil_id',$('#vil_id').val());
data.append('genplan_id',$('#genplan_id').val());
data.append('funk_zone_id',$('#funk_zone_type').val());
data.append('mut',$('#mut').val());
data.append('shfret',$('#shfret').val());
data.append('shfmsharet',$('#shfmsharet').val());
data.append('shftt',$('#shftt').val());
data.append('fzm',$('#fzm').val());
data.append('type','one');
data.append('geometry',json_str);

    $.ajax({
        url: '/create_funk_gen',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
if(result==1){
$('#load_alert_div').html("<p>Saqlandi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');
}
else{
$('#load_alert_div').html("<p>Xatolik !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_error');
}
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
}
else{
$('#load_alert_div').html("<p>Asosiy maydonlar to'ldirilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
}


});



$(document).on('click','#edit_funk_gen_button',function(){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});


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
data.append('status',$('#funk_gen_status').val());
data.append('vil_id',$('#vil_id').val());
data.append('genplan_id',$('#genplan_id').val());
data.append('funk_gen_id',$('#funk_gen_id').val());
data.append('funk_zone_id',$('#funk_zone_type').val());
data.append('mut',$('#mut').val());
data.append('shfret',$('#shfret').val());
data.append('shfmsharet',$('#shfmsharet').val());
data.append('shftt',$('#shftt').val());
data.append('fzm',$('#fzm').val());
data.append('geometry',json_str);

    $.ajax({
        url: '/edit_funk_gen',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
$('#load_alert_div').html("<p>O'zgardi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

$('#funk_gen_id').val(result['funk_gen_id']);
$('#funk_gen_status').val(result['status']);
          },
      error:function(){
$('#load_alert_div').html("<p>Xatolik !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_error');
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






$(document).on('click','.button_save_new_funk_gen',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('funk_gen_id',$(this).attr('data-funk_gen_id'));
  data.append('type',$(this).attr('data-type'));
  data.append('confirm',$(this).attr('data-confirm'));
    $.ajax({
        url: '/save_funk_gen',
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

$('.button_save_new_funk_gen').prop('disabled','disabled');
},
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });
