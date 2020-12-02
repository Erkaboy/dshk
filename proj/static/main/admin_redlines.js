
$(document).on('click','.button_save_edit_redline',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('redline_id',$(this).attr('data-redline_id'));
    $.ajax({
        url: '/save_edit_redline',
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



$(document).on('click','.button_delete_redline',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('redline_id',$(this).attr('data-redline_id'));
  data.append('status',$(this).attr('data-status'));
  data.append('type','last_delete');
    $.ajax({
        url: '/delete_redline',
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
 $('.button_delete_redline').prop('disabled','disabled');
 $('.button_edit_redline').prop('disabled','disabled');            
},
      error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});




$(document).on('click','.button_delete_redline_admin',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('redline_id',$(this).attr('data-redline_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('type','admin_delete');
    $.ajax({
        url: '/delete_redline',
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
 $('.button_delete_redline_admin').prop('disabled','disabled');
  
        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});



$('#modal_create_redline').dialog({
  resizable: false,
  autoOpen:false,
  height: 280,
  width: 450,
  modal: false,
  dialogClass:'modal_create_redline',
   create:function(e){
$('.modal_create_redline').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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


$('#button_create_redline_dialog').on('click',function(){

 let text=`
<div id="load_alert_div"></div>

<label for='vil_id' class='label_admin_input'>Viloyatni tanlang</label> 
<select id="vil_id" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}


text+=`</select>

<label for='redline_genplan' class='label_admin_input'>Bosh rejani tanlang</label> 
<select id="redline_genplan" class = "form-control">
<option value='-1'selected >----</option>
</select>
<br>
<div id='load_alert_tag'></div>
<input type="button" id="create_redline_button" class='btn btn-success' value="Saqlash">
`;

$('#modal_create_redline').html(text);
$('#modal_create_redline').dialog('open');

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

$('#redline_genplan').html(text);
$('#load_alert_div').css({'display':'none'});
 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});
 

});

$(document).on('click','.button_edit_redline',function(){

  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('redline_id',$(this).attr('data-redline_id'));
  data.append('status',$(this).attr('data-status'));
  
    $.ajax({
        url: '/edit_redline_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
// console.log(result);
var json = JSON.parse(result['redlines_json']);
json.features[0].geometry.coordinates.forEach(function(corr,i){
var polyline={type:'LineString',coordinates:corr};
L.geoJson(polyline,{
  onEachFeature:function(features,layer){
    drawnItems.addLayer(layer);
  }
});
});


let text=`
<div id="load_alert_div"></div>
<label for='vil_id' class='label_admin_input'>Viloyatni tanlang</label> 
<select id="vil_id" class = "form-control">`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}

text+=`</select>

<label for='redline_genplan' class='label_admin_input'>Bosh rejani tanlang</label> 
<select id="redline_genplan" class = "form-control">`;

for(let i in result['genplan_data']){
  text+=`<option value='`+result['genplan_data'][i].pk+`'>`+result['genplan_data'][i].aholi_punktining_nomi+`</option>`;
}

text+=`</select>
<br>

<input type='hidden' id='redline_status' value='`+result['status']+`'>
<input type='hidden' id='redline_id' value='`+result['redline_id']+`'>

<input type="button" id="edit_redline_button" class='btn btn-success' value="O'zgartirish">
`;

$('#modal_create_redline').html(text);
$('#modal_create_redline').dialog('open');


$('#vil_id option[value='+json.features[0].properties.vil_id+']').prop("selected",true);
$('#redline_genplan option[value='+json.features[0].properties.genplan_id+']').prop("selected",true);


 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});

});


$(document).on('click','#create_redline_button',function(){

if($('#vil_id').val()!=-1 && $('#redline_genplan').val()!=-1){

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

if(layer_type=='LineString'){

 json_str='{"type": "MultiLineString","coordinates":['; 

for (var i in drawnItems.toGeoJSON().features){
json_str+=JSON.stringify(drawnItems.toGeoJSON().features[i].geometry.coordinates);
if(i!=drawnItems.toGeoJSON().features.length-1)
json_str+=',';
}
json_str+=']}';

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('vil_id',$('#vil_id').val());
data.append('genplan_id',$('#redline_genplan').val());
data.append('geometry',json_str);

    $.ajax({
        url: '/create_redline',
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
$('#load_alert_div').html("<p>Maydonlar to'ldirilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
}


});




$(document).on('click','#edit_redline_button',function(){

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

if(layer_type=='LineString'){

 json_str='{"type": "MultiLineString","coordinates":['; 

for (var i in drawnItems.toGeoJSON().features){
json_str+=JSON.stringify(drawnItems.toGeoJSON().features[i].geometry.coordinates);
if(i!=drawnItems.toGeoJSON().features.length-1)
json_str+=',';
}
json_str+=']}';

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('vil_id',$('#vil_id').val());
data.append('redline_id',$('#redline_id').val());
data.append('status',$('#redline_status').val());
data.append('genplan_id',$('#redline_genplan').val());
data.append('geometry',json_str);

    $.ajax({
        url: '/edit_redline',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
$('#load_alert_div').html("<p>O'zgardi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

$('#redline_id').val(result['redline_id']);
$('#redline_status').val(result['status']);

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






$(document).on('click','.button_save_new_redline',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('redline_id',$(this).attr('data-redline_id'));
  data.append('confirm',$(this).attr('data-confirm'));
    $.ajax({
        url: '/save_redline',
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

$('.button_save_new_redline').prop('disabled','disabled');
},
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });
