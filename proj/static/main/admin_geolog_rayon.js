$(document).on('click','.button_save_edit_geo_ray',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('geo_ray_id',$(this).attr('data-geo_ray_id'));
    $.ajax({
        url: '/save_edit_geo_ray',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

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
$('.button_save_edit_geo_ray_data').prop('disabled','disabled');


        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });



$(document).on('click','.button_save_edit_geo_ray_data',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('geo_ray_id',$(this).attr('data-geo_ray_id'));
    $.ajax({
        url: '/save_edit_geo_ray_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

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
$('.button_save_edit_geo_ray_data').prop('disabled','disabled');


        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });



$(document).on('click','.button_delete_geo_ray',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('geo_ray_id',$(this).attr('data-geo_ray_id'));
  data.append('status',$(this).attr('data-status'));
  data.append('type','first_delete');
  data.append('dtype',$(this).attr('data-type'));
 

  
    $.ajax({
        url: '/delete_geo_ray',
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
$('#myalert_content').html(`<div class="alert alert-warning">
<p class="alert_p">Xatolik !</p>
</div>`);
$('#my_alert_modal')[0].click();
 } 
 $('.button_delete_geo_ray').prop('disabled','disabled');
 $('.button_edit_geo_ray_data').prop('disabled','disabled');
 $('.button_edit_geo_ray').prop('disabled','disabled');
           
},
      error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});




$(document).on('click','.button_delete_geo_ray_admin',function(){
 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('geo_ray_id',$(this).attr('data-geo_ray_id'));
  data.append('confirm',$(this).attr('data-confirm'));
  data.append('dtype',$(this).attr('data-dtype'));
  data.append('type','admin_delete');
    $.ajax({
        url: '/delete_geo_ray',
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
 $('.button_delete_geo_ray_admin').prop('disabled','disabled');
  
        },
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
});



$('#modal_create_geo_ray').dialog({
  resizable: false,
  autoOpen:false,
  height: 660,
  width: 700,
  modal: false,
  dialogClass:'modal_create_geo_ray',
   create:function(e){
$('.modal_create_geo_ray').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  close:function(){
drawnItems.clearLayers();
geo_ray_layer.clearLayers();
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

$('#modal_create_geo_ray_data').dialog({
  resizable: false,
  autoOpen:false,
  height: 750,
  width: 580,
  modal: false,
  dialogClass:'modal_create_geo_ray_data',
   create:function(e){
$('.modal_create_geo_ray_data').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  close:function(){
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
 
function check_kod(kod){
let kodt=kod.toString();
if(kodt.length==3){

  let k1=kodt.charAt(0);
  let k2=kodt.charAt(1);
  let k3=kodt.charAt(2);
  if((k1>=1)&&(k1<=5)&&(k2>=1)&&(k2<=5)&&(k3>=1)&&(k3<=5)){
   return 1; 
  }
  else{
    if((k1==4)&&(k2==0)&&(k3==0)){
    return 1; 
    }else{
    return 0;
  }
  }

}
else{
  return 0;
}
  
}

 
$(document).on('click','.button_create_geo_ray_data_dialog',function(){

  if($(this).attr('data-val')=='0'){

  let text=`
 <div style='overflow-x:hidden; overflow-y:auto; height:680px; padding:5px; padding-right:10px;' > 
<label for='vil_id3' class='label_admin_input'>Viloyatni tanlang <span style='color:red'>*</span></label> 
<select id="vil_id3" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}
text+=`</select>

<label for='tuman' class='label_admin_input'>Shahar, tuman <span style='color:red'>*</span></label> 
<input class='form-control' id='tuman' type='text' >

<label for='joy_nomi' class='label_admin_input'>Joy nomi <span style='color:red'>*</span></label> 
<input class='form-control' id='joy_nomi' type='text' >

<label for='obyekt_nomi' class='label_admin_input'>Obyekt nomi <span style='color:red'>*</span></label> 
<input class='form-control' id='obyekt_nomi' type='text' >

<label for='bajaruvchi_tashkilot' class='label_admin_input'>Bajaruvchi tashkilot <span style='color:red'>*</span></label> 
<input class='form-control' id='bajaruvchi_tashkilot' type='text' >

<label for='bajaruvchi_shaxs' class='label_admin_input'>Bajaruvchi shaxs</label> 
<input class='form-control' id='bajaruvchi_shaxs' type='text' >

<label for='buyurtmachi' class='label_admin_input'>Buyurtmachi</label> 
<input class='form-control' id='buyurtmachi' type='text' >

<label for='inv_nomer' class='label_admin_input'>Hisobotning arxivdagi inventar nomeri <span style='color:red'>*</span></label> 
<input class='form-control' id='inv_nomer' type='text' >

<label for='grif' class='label_admin_input'>Grif <span style='color:red'>*</span></label> 
<select id="grif" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in grif_json){
  text+=`<option value='`+grif_json[i].val+`'>`+grif_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='koor_tiz' class='label_admin_input'>Koordinatalar tizimi</label> 
<select id="koor_tiz" class = "form-control">
<option value='' selected >-----</option>`;

for(let i in koor_tizim_json){
  text+=`<option value='`+koor_tizim_json[i].val+`'>`+koor_tizim_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='masshtab' class='label_admin_input'>Masshtab</label>
<select id="masshtab" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in masshtab_json){
  text+=`<option value='`+masshtab_json[i].val+`' >`+masshtab_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='ish_bosh_vaqt' class='label_admin_input'>Ish boshlangan vaqt</label> 
<input class='form-control' autocomplete="off" id='ish_bosh_vaqt' type='text' >

<label for='ish_yak_vaqt' class='label_admin_input'>Ish yakunlangan vaqt</label> 
<input class='form-control' autocomplete="off" id='ish_yak_vaqt' type='text' >

<label for='ish_baj_davr' class='label_admin_input'>Ish bajarilgan davr</label> 
<input class='form-control' id='ish_baj_davr' type='text' >

<label for='maydoni_ga' class='label_admin_input'>Maydoni(ga)</label> 
<input class='form-control' id='maydoni_ga' type='number' >

<label for='shartnoma_n' class='label_admin_input'>Shartnoma №</label> 
<input class='form-control' id='shartnoma_n' type='text' >

<label for='shartnoma_nomi' class='label_admin_input'>Shartnoma nomi</label> 
<input class='form-control' id='shartnoma_nomi' type='text' >

<label for='soato' class='label_admin_input'>soato</label> 
<input class='form-control' id='soato' type='text' >


<table class="table dialog_table_main_tab">
<tr><td><label for='hisobot' class='label_admin_input'>Hisobot</label></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' data-del='no' class="input_file" id='hisobot'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>

</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_geo_ray_data_file" data-file_type='hisobot'  value='delete'>
</td></tr>

<tr><td><label for='grafik' class='label_admin_input'>Grafik ma'lumot</label> </td><td></td></tr>
<tr>
<td>
<label class='form-control'>
<input type='file' style='display:none;' data-del='no' class="input_file" id='grafik'>
<span class="span_admin_tab">Faylni tanlang</span>
</label>

</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_geo_ray_data_file"  data-file_type='grafik' value='delete'>
</td></tr>
</table>

<label for='izoh' class='label_admin_input'>Izoh</label> 
<textarea class='form-control' id='izoh' rows="3"></textarea>
<br>
<span style='color:red'>*</span> - Majburiy to'ldirilishi shart bo'lgan maydonlar
<br>
<br>
<input class='btn btn-success' type='button' value='Saqlash' id='create_button_geo_ray_data'>
<div id="load_alert_div2"></div>
</div>
`;

$('#modal_create_geo_ray_data').html(text);
}

$('#modal_create_geo_ray_data').dialog('open');

$('#ish_bosh_vaqt').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#ish_bosh_vaqt').datepicker('option','dateFormat','dd.mm.yy');

$('#ish_yak_vaqt').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#ish_yak_vaqt').datepicker('option','dateFormat','dd.mm.yy');

});




$(document).on('click','.delete_geo_ray_data_file',function(){

$('#'+$(this).attr('data-file_type')).val('');
$('#'+$(this).attr('data-file_type')).attr('data-del','yes');
$('#'+$(this).attr('data-file_type')).next().text('Faylni tanlang'); 
});
 



$(document).on('click','.edit_button_geo_ray_data_dialog',function(){
  if($(this).attr('data-val')=='0'){

 data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
 data.append('id',$(this).attr('data-id'));
 data.append('status',$(this).attr('data-status'));
    $.ajax({
        url: '/edit_geo_ray_data_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

let data=result['data'][0];

 let text=`
 <div style='overflow-x:hidden; overflow-y:auto; height:680px; padding:5px; padding-right:10px;' > 
<label for='vil_id3' class='label_admin_input'>Viloyatni tanlang <span style='color:red'>*</span></label> 
<select id="vil_id3" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}
text+=`</select>

<label for='tuman' class='label_admin_input'>Shahar, tuman <span style='color:red'>*</span></label> 
<input class='form-control' id='tuman' type='text' >

<label for='joy_nomi' class='label_admin_input'>Joy nomi <span style='color:red'>*</span></label> 
<input class='form-control' id='joy_nomi' type='text' >

<label for='obyekt_nomi' class='label_admin_input'>Obyekt nomi <span style='color:red'>*</span></label> 
<input class='form-control' id='obyekt_nomi' type='text' >

<label for='bajaruvchi_tashkilot' class='label_admin_input'>Bajaruvchi tashkilot <span style='color:red'>*</span></label> 
<input class='form-control' id='bajaruvchi_tashkilot' type='text' >

<label for='bajaruvchi_shaxs' class='label_admin_input'>Bajaruvchi shaxs</label> 
<input class='form-control' id='bajaruvchi_shaxs' type='text' >

<label for='buyurtmachi' class='label_admin_input'>Buyurtmachi</label> 
<input class='form-control' id='buyurtmachi' type='text' >



<label for='inv_nomer' class='label_admin_input'>Hisobotning arxivdagi inventar nomeri <span style='color:red'>*</span></label> 
<input class='form-control' id='inv_nomer' type='text' >

<label for='grif' class='label_admin_input'>Grif <span style='color:red'>*</span></label> 
<select id="grif" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in grif_json){
  text+=`<option value='`+grif_json[i].val+`'>`+grif_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='koor_tiz' class='label_admin_input'>Koordinatalar tizimi</label> 
<select id="koor_tiz" class = "form-control">
<option value='' selected >-----</option>`;

for(let i in koor_tizim_json){
  text+=`<option value='`+koor_tizim_json[i].val+`'>`+koor_tizim_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='masshtab' class='label_admin_input'>Masshtab</label>
<select id="masshtab" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in masshtab_json){
  text+=`<option value='`+masshtab_json[i].val+`' >`+masshtab_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='ish_bosh_vaqt' class='label_admin_input'>Ish boshlangan vaqt</label> 
<input class='form-control' autocomplete="off" id='ish_bosh_vaqt' type='text' >

<label for='ish_yak_vaqt' class='label_admin_input'>Ish yakunlangan vaqt</label> 
<input class='form-control' autocomplete="off" id='ish_yak_vaqt' type='text' >

<label for='ish_baj_davr' class='label_admin_input'>Ish bajarilgan davr</label> 
<input class='form-control' id='ish_baj_davr' type='text' >

<label for='maydoni_ga' class='label_admin_input'>Maydoni(ga)</label> 
<input class='form-control' id='maydoni_ga' type='number' >


<label for='shartnoma_n' class='label_admin_input'>Shartnoma №</label> 
<input class='form-control' id='shartnoma_n' type='text' >

<label for='shartnoma_nomi' class='label_admin_input'>Shartnoma nomi</label> 
<input class='form-control' id='shartnoma_nomi' type='text' >

<label for='soato' class='label_admin_input'>Soato</label> 
<input class='form-control' id='soato' type='text' >


<table class="table dialog_table_main_tab">
<tr><td><label for='hisobot' class='label_admin_input'>Hisobot</label></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' data-del='no' class="input_file" id='hisobot'>
<span class="span_admin_tab">`+repath2(data.hisobot)+`</span>
</label>

</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_geo_ray_data_file" data-file_type='hisobot'  value='delete'>
</td></tr>

<tr><td><label for='grafik' class='label_admin_input'>Grafik ma'lumot</label> </td><td></td></tr>
<tr>
<td>
<label class='form-control'>
<input type='file' style='display:none;' data-del='no' class="input_file" id='grafik'>
<span class="span_admin_tab">`+repath2(data.grafik)+`</span>
</label>

</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_geo_ray_data_file"  data-file_type='grafik' value='delete'>
</td></tr>
</table>




<label for='izoh' class='label_admin_input'>Izoh</label> 
<textarea class='form-control' id='izoh' rows="3">`+data.izoh+`</textarea>
<input type='hidden' id='geo_ray_data_id' value='`+data.ojb_id+`' >
<br>
<span style='color:red'>*</span> - Majburiy to'ldirilishi shart bo'lgan maydonlar
<br>
<br>
<input class='btn btn-success' type='button' value="O'zgartirish" id='create_button_geo_ray_data'>
<div id="load_alert_div2"></div>
</div>
`;

$('#modal_create_geo_ray_data').html(text);
$('#modal_create_geo_ray_data').dialog('open');

$('#ish_bosh_vaqt').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#ish_bosh_vaqt').datepicker('option','dateFormat','dd.mm.yy');

$('#ish_yak_vaqt').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#ish_yak_vaqt').datepicker('option','dateFormat','dd.mm.yy');



$('#tuman').val(data.tuman);
$('#joy_nomi').val(data.joy_nomi);
$('#obyekt_nomi').val(data.obyekt_nomi);
$('#bajaruvchi_tashkilot').val(data.bajaruvchi_tashkilot);
$('#bajaruvchi_shaxs').val(data.bajaruvchi_shaxs);
$('#buyurtmachi').val(data.buyurtmachi);
$('#inv_nomer').val(data.inv_nomer);

$('#grif option[value="'+data.grif+'"]').prop("selected",true);
$('#koor_tiz option[value="'+data.koordinatalar_tizimi+'"]').prop("selected",true);
$('#masshtab option[value="'+data.masshtab+'"]').prop("selected",true);

$('#ish_bosh_vaqt').val(data.ish_boshlangan_vaqt);
$('#ish_yak_vaqt').val(data.ish_yakunlangan_vaqt);
$('#ish_baj_davr').val(data.ish_bajarilgan_davr);
$('#maydoni_ga').val(data.maydoni_ga);
$('#shartnoma_n').val(data.shartnoma_n);
$('#shartnoma_nomi').val(data.shartnoma_nomi);
$('#soato').val(data.soato);

$('#vil_id3 option[value="'+data.vil_id+'"]').prop("selected",true);

        },
        error:function(){
          console.log('Ajaxda xatolik!');

        }

  });
}
else{
$('#modal_create_geo_ray_data').dialog('open');
}

});






$(document).on('click','#load_alert_div2 p',function(){
$(this).css({'display':'none'});
});


$(document).on('click','#create_button_geo_ray_data',function(){

if($('#vil_id3').val()!=-1 && $('#tuman').val()!='' && $('#joy_nomi').val()!='' && $('#bajaruvchi_tashkilot').val()!='' && $('#obyekt_nomi').val()!='' && $('#inv_nomer').val()!='' && $('#grif').val()!=-1 ){

$('.vil_id').val($('#vil_id3').val());
 $('.vil_id').prop('disabled',true);
$('.geo_ray_id').html("<option value='yes'>Yangi kiritilgan obyekt</option>");
$('.geo_ray_id').prop('disabled',true);

 $('.button_create_geo_ray_data_dialog').attr('data-val','1');
 $('.button_create_geo_ray_data_dialog').val("Ko'rish");
 $('.edit_button_geo_ray_data_dialog').attr('data-val','1');
 $('.edit_button_geo_ray_data_dialog').val("Ko'rish");
 $('#modal_create_geo_ray_data').dialog('close');
}
else{
$('#load_alert_div2').html("<p>Asosiy maydonlar to'ldirilmagan !</p>");
$('#load_alert_div2').css({'display':'block'});
$('#load_alert_div2 p').addClass('p_alert_admin_tab_warning');
}

});


$('#button_create_geo_ray_dialog').on('click',function(){

 let text=`

 <div id="ftabs">
 
  <ul style='background:#e9e9e9; height:40px;'>
    <li><a href="#ftabs-1">Tizimda turib hosil qilish</a></li>
    <li><a href="#ftabs-2">Fayldan yuklagan holda kiritish</a></li>
  </ul>
  <div id="ftabs-1" style='border:none;'>

<label for='vil_id' class='label_admin_input'>Viloyatni tanlang <span style='color:red'>*</span></label> 
<select id="vil_id" class = "form-control vil_id">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}



text+=`</select>

<label for='geo_ray_id' class='label_admin_input'>Geologik rayonlashtirish oby'ektini tanlang <span style='color:red'>*</span></label> 
<br>
<select id="geo_ray_id" class = "form-control geo_ray_id" style='width:83%;float:left;'>
<option value='-1'selected >----</option>
</select>

<input type="button"  data-val='0' style='width:15%;float:right;' class='btn btn-primary button_create_geo_ray_data_dialog' value="Qo'shish">

<label for='vil_ind' class='label_admin_input'>Injenerlik geologik viloyat indeksi</label> 
<input class='form-control' id='vil_ind' type='text' >

<label for='vil_tav' class='label_admin_input'>Injenerlik geologik viloyat tavsifi</label> 
<textarea class='form-control' id='vil_tav' rows="3"></textarea>

<label for='hud_ind' class='label_admin_input'>Injenerlik geologik hududlar indeksi</label> 
<input class='form-control' id='hud_ind' type='text' >

<label for='hud_tav' class='label_admin_input'>Injenerlik geologik hududlar tavsifi</label> 
<textarea class='form-control' id='hud_tav' rows="3"></textarea>

<label for='kich_hud_ind' class='label_admin_input'>Injenerlik geologik kichik hududlar indeksi</label> 
<input class='form-control' id='kich_hud_ind' type='text' >

<label for='kich_hud_tav' class='label_admin_input'>Injenerlik geologik kichik hududlar tavsifi</label> 
<textarea class='form-control' id='kich_hud_tav' rows="3"></textarea>

<label for='uch_ind' class='label_admin_input'>Injenerlik geologik uchastkalar indeksi</label> 
<input class='form-control' id='uch_ind' type='text' >

<label for='uch_tav' class='label_admin_input'>Injenerlik geologik uchastkalar tavsifi</label> 
<textarea class='form-control' id='uch_tav' rows="3"></textarea>


<label for='gen_tav' class='label_admin_input'>Hududlarning geologik genetik tavsifi</label> 
<textarea class='form-control' id='gen_tav' rows="3"></textarea>

<label for='geod_jar' class='label_admin_input'>Hududdagi geodinamik jarayonlar</label> 
<textarea class='form-control' id='geod_jar' rows="3"></textarea>

<label for='inj_tad' class='label_admin_input'>Tavsiya etiladigan injenerlik tadbirlari</label> 
<textarea class='form-control' id='inj_tad' rows="3"></textarea>

<label for='grund_tav' class='label_admin_input'>Gruntlarning seysmik xususiyatlari buyicha toifasi</label> 
<input class='form-control' id='grund_tav' type='text' >

<label for='kod' class='label_admin_input'>kod <span style='color:red'>*</span></label> 
<input class='form-control' id='kod' type='number' >

<input id='geo_ray_status' type='hidden' value='1'>


<br>
<span style='color:red'>*</span> - Majburiy to'ldirilishi shart bo'lgan maydonlar
<br>
<br>
<input type="button" id="create_geo_ray_button" class='btn btn-success' value="Saqlash">

  </div>
  <div id="ftabs-2" style='border:none;' >


<label for='vil_id2' class='label_admin_input'>Viloyatni tanlang <span style='color:red'>*</span></label> 
<select id="vil_id2" class = "form-control vil_id">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}



text+=`</select>

<label for='geo_ray_id2' class='label_admin_input'>Geologik rayonlashtirish oby'ektini tanlang <span style='color:red'>*</span></label> 
<br>
<select id="geo_ray_id2" class = "form-control geo_ray_id" style='width:83%;float:left;'>
<option value='-1'selected >----</option>
</select>

<input type="button" data-val='0' style='width:15%;float:right;' class='btn btn-primary button_create_geo_ray_data_dialog' value="Qo'shish">


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
<span style='color:red'>*</span> - Majburiy to'ldirilishi shart bo'lgan maydonlar
<br>
<br>
  <button class="btn btn-info" id="load_vector_files2">Oldindan ko'rish</button>
  <button class="btn btn-success" id="create_geo_ray_button2">Saqlash</button>

  </div>
</div>
<div id="load_alert_div"></div>
 `;

$('#modal_create_geo_ray').html(text);
$('#modal_create_geo_ray').dialog('open');
$('#ftabs').tabs();

});


$(document).on('click','#create_geo_ray_button2',function(){


if($('#vil_id2').val()!=-1 && $('#geo_ray_id2').val()!=-1){

$('#load_alert_div').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div').css({'display':'block'});


if(geo_ray_layer.toGeoJSON().features.length==0){
$('#load_alert_div').html("<p>Vektorli ma'lumotlar kiritilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');
}
else{

var cols=['Injenerlik_geologik_viloyat_indeksi','Injenerlik_geologik_viloyat_tavsifi','Injenerlik_geologik_hududlar_indeksi','Injenerlik_geologik_hududlar_tavsifi','Injenerlik_geologik_kichik_hududlar_indeksi','Injenerlik_geologik_kichik_hududlar_indeksi','Injenerlik_geologik_kichik_hududlar_tavsifi','Injenerlik_geologik_uchastkalar_indeksi','Injenerlik_geologik_uchastkalar_tavsifi','Hududlarning_geologik_genetik_tavsifi','Hududdagi_geodinamik_jarayonlar','Tavsiya_etiladigan_injenerlik_tadbirlari','Gruntlarning_seysmik_xususiyatlari_buyicha_toifasi','KOD'];
;


var cc=0;
for (let i in geo_ray_layer.toGeoJSON().features[0].properties){
if(cols.indexOf(i)!=-1){cc++;}
}


if(cc==13){
var c=0;
for (let i in geo_ray_layer.toGeoJSON().features){
if(geo_ray_layer.toGeoJSON().features[i].geometry.type!='MultiPolygon'){
  c++;
}
}
if(c==0){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('vil_id',$('#vil_id2').val());
data.append('layers',JSON.stringify(geo_ray_layer.toGeoJSON()));
data.append('geo_ray_id',$('#geo_ray_id2').val());
data.append('type','multiple');

if($('#geo_ray_id').val()=='yes'){
data.append('with','yes');

data.append('tuman',$('#tuman').val());
data.append('joy_nomi',$('#joy_nomi').val());
data.append('obyekt_nomi',$('#obyekt_nomi').val());
data.append('bajaruvchi_tashkilot',$('#bajaruvchi_tashkilot').val());
data.append('bajaruvchi_shaxs',$('#bajaruvchi_shaxs').val());
data.append('buyurtmachi',$('#buyurtmachi').val());
data.append('inv_nomer',$('#inv_nomer').val());
data.append('grif',$('#grif').val());
data.append('koor_tiz',$('#koor_tiz').val());
data.append('masshtab',$('#masshtab').val());
data.append('ish_bosh_vaqt',$('#ish_bosh_vaqt').val());
data.append('ish_yak_vaqt',$('#ish_yak_vaqt').val());
data.append('ish_baj_davr',$('#ish_baj_davr').val());
data.append('maydoni_ga',$('#maydoni_ga').val());
data.append('shartnoma_n',$('#shartnoma_n').val());
data.append('shartnoma_nomi',$('#shartnoma_nomi').val());
data.append('soato',$('#soato').val());
data.append('izoh',$('#izoh').val());
data.append('hisobot', $('#hisobot')[0].files[0]);
data.append('grafik', $('#grafik')[0].files[0]);
}
else{
data.append('with','no');
}


    $.ajax({
        url: '/create_geo_ray',
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

function funk_code(a){
  var d=parseInt(a)%100;

  return  d==0 ?'#ff0000':
          d==11?'#c71585':
          d==12?'#db7093':
          d==13?'#ff1493':
          d==14?'#ff69b4':
          d==15?'#ffb6c1':
          d==21?'#663399':
          d==22?'#483d8b':
          d==23?'#6a5acd':
          d==24?'#9370db':
          d==25?'#4b0082':
          d==31?'#7cfc00':
          d==32?'#32cd32':
          d==33?'#9acd32':
          d==34?'#6bcdaa':
          d==35?'#228b22':
          d==41?'#ffa500':
          d==42?'#ff8c00':
          d==43?'#ff7f50':
          d==44?'#ff6347':
          d==45?'#ffbf00':
          d==51?'#ffa07a':
          d==52?'#fa8072':
          d==53?'#f08080':
          d==54?'#cd5c5c':
          d==55?'#e26969':'';
  }



function style_kod(feature) {
  return {
        fillColor: funk_code(feature.properties.KOD),
        weight: 2,
        opacity: 0.6,
        color: '#000',
        dashArray: '2',
        fillOpacity: 0.8
  };
}

var geo_ray_layer = L.geoJson(null,{
  style:style_kod,
  onEachFeature: function (feature, layer) {
         layer.bindPopup('<p style="font-size:14px;">'+feature.properties.Injenerlik_geologik_uchastkalar_tavsifi+'</p>');
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
    geo_ray_layer.addData(data);
    map.flyToBounds(geo_ray_layer.getBounds());

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
        url: '/geo_ray_data_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {


 let text="<option value='-1'selected >----</option>";

if(result.data.length!=0){
if($('#geo_ray_status').val()=='1'){
text+= `<optgroup label="Asosiy ob'yektlar bazasidan:" ></optgroup>`;
}
for (let i in result.data){
text+=`<option value='1-`+result.data[i].pk+`'>`+result.data[i].obyekt_nomi+`</option>`;
}
}
if(result.data2.length!=0 && $('#geo_ray_status').val()=='1'){
text+=`<optgroup label="Yangi qo'shilgan ob'yektlar bazasidan:" ></optgroup>`;
for (let i in result.data2){
text+=`<option value='0-`+result.data2[i].pk+`'>`+result.data2[i].obyekt_nomi+`</option>`;
}}


$('#geo_ray_id').html(text);
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
        url: '/geo_ray_data_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {


let text="<option value='-1'selected >----</option>";
if(result.data.length!=0){
text+= `<optgroup label="Asosiy ob'yektlar bazasidan:" ></optgroup>`;
for (let i in result.data){
text+=`<option value='1-`+result.data[i].pk+`'>`+result.data[i].obyekt_nomi+`</option>`;
}
}
if(result.data2.length!=0){
text+=`<optgroup label="Yangi qo'shilgan ob'yektlar bazasidan:" ></optgroup>`;
for (let i in result.data2){
text+=`<option value='0-`+result.data2[i].pk+`'>`+result.data2[i].obyekt_nomi+`</option>`;
}}
$('#geo_ray_id2').html(text);
$('#load_alert_div').css({'display':'none'});
 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});
 
});


$(document).on('click','.button_edit_geo_ray',function(){

  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('geo_ray_id',$(this).attr('data-geo_ray_id'));
  data.append('status',$(this).attr('data-status'));
  
    $.ajax({
        url: '/edit_geo_ray_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
var json = JSON.parse(result['geo_ray_json']);
json.features[0].geometry.coordinates.forEach(function(corr,i){
var polygon={type:'Polygon',coordinates:corr};
L.geoJson(polygon,{
  onEachFeature:function(features,layer){
    drawnItems.addLayer(layer);
  }
});
});

var text=`
 <div style='overflow-x:hidden; overflow-y:auto; height:600px; padding:5px; padding-right:10px;' > 

<label for='vil_id' class='label_admin_input'>Viloyatni tanlang <span style='color:red'>*</span></label> 
<select id="vil_id" class = "form-control vil_id">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}

text+=`</select>

<label for='geo_ray_id' class='label_admin_input'>Geologik rayonlashtirish oby'ektini tanlang <span style='color:red'>*</span></label> 
<br>
<select id="geo_ray_id" class = "form-control geo_ray_id" style='width:83%;float:left;'>
<option value='-1'>----</option>`;

  for(let i in result['geo_ray_data']){
 text+=`<option value='`+result['geo_ray_data'][i].pk+`'>`+result['geo_ray_data'][i].obyekt_nomi+`</option>`;   
  }

text+=`</select>

<input type="button" data-val='0' style='width:15%;float:right;' data-status='1' data-id='`+json.features[0].properties.geolograyon_data_edit_id+`' class='btn btn-primary edit_button_geo_ray_data_dialog' value="Ko'rish">

<label for='vil_ind' class='label_admin_input'>Injenerlik geologik viloyat indeksi</label> 
<input class='form-control' id='vil_ind' type='text' >

<label for='vil_tav' class='label_admin_input'>Injenerlik geologik viloyat tavsifi</label> 
<textarea class='form-control'  id='vil_tav' rows="3">`+json.features[0].properties.injenerlik_geologik_viloyat_tavsifi+`</textarea>

<label for='hud_ind' class='label_admin_input'>Injenerlik geologik hududlar indeksi</label> 
<input class='form-control' id='hud_ind' type='text' >

<label for='hud_tav' class='label_admin_input'>Injenerlik geologik hududlar tavsifi</label> 
<textarea class='form-control' id='hud_tav' rows="3">`+json.features[0].properties.injenerlik_geologik_hududlar_tavsifi+`</textarea>

<label for='kich_hud_ind' class='label_admin_input'>Injenerlik geologik kichik hududlar indeksi</label> 
<input class='form-control' id='kich_hud_ind' type='text' >

<label for='kich_hud_tav' class='label_admin_input'>Injenerlik geologik kichik hududlar tavsifi</label> 
<textarea class='form-control' id='kich_hud_tav' rows="3">`+json.features[0].properties.injenerlik_geologik_kichik_hududlar_tavsifi+`</textarea>

<label for='uch_ind' class='label_admin_input'>Injenerlik geologik uchastkalar indeksi</label> 
<input class='form-control' id='uch_ind' type='text' >

<label for='uch_tav' class='label_admin_input'>Injenerlik geologik uchastkalar tavsifi</label> 
<textarea class='form-control' id='uch_tav' rows="3">`+json.features[0].properties.injenerlik_geologik_uchastkalar_tavsifi+`</textarea>

<label for='gen_tav' class='label_admin_input'>Hududlarning geologik genetik tavsifi</label> 
<textarea class='form-control'  id='gen_tav' rows="3">`+json.features[0].properties.hududlarning_geologik_genetik_tavsifi+`</textarea>

<label for='geod_jar' class='label_admin_input'>Hududdagi geodinamik jarayonlar</label> 
<textarea class='form-control' id='geod_jar' rows="3">`+json.features[0].properties.hududdagi_geodinamik_jarayonlar+`</textarea>

<label for='inj_tad' class='label_admin_input'>Tavsiya etiladigan injenerlik tadbirlari</label> 
<textarea class='form-control' id='inj_tad' rows="3">`+json.features[0].properties.tavsiya_etiladigan_injenerlik_tadbirlari+`</textarea>

<label for='grund_tav' class='label_admin_input'>Gruntlarning seysmik xususiyatlari buyicha toifasi</label> 
<input class='form-control' id='grund_tav' type='text' >

<label for='kod' class='label_admin_input'>kod <span style='color:red'>*</span></label> 
<input class='form-control' value='`+json.features[0].properties.kod+`' id='kod' type='text' >

<input id='geo_ray_status' type='hidden' value='`+json.features[0].properties.status+`'>
<input id='geolograyon_id' type='hidden' value='`+json.features[0].properties.pk+`'>

<br>
<span style='color:red'>*</span> - Majburiy to'ldirilishi shart bo'lgan maydonlar
<br>
<br>
<input type="button" id="edit_geo_ray_button" class='btn btn-success' value="O'zgartirish">
</div>
<div id="load_alert_div"></div>

`;


$('#modal_create_geo_ray').html(text);
$('#modal_create_geo_ray').dialog('open');

$('#vil_ind').val(json.features[0].properties.injenerlik_geologik_viloyat_indeksi);
$('#hud_ind').val(json.features[0].properties.injenerlik_geologik_hududlar_indeksi);
$('#kich_hud_ind').val(json.features[0].properties.injenerlik_geologik_kichik_hududlar_indeksi);
$('#uch_ind').val(json.features[0].properties.injenerlik_geologik_uchastkalar_indeksi);
$('#grund_tav').val(json.features[0].properties.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi);


$('#vil_id option[value="'+json.features[0].properties.vil_id+'"]').prop("selected",true);
if(json.features[0].properties.geolograyon_data_id){
$('#geo_ray_id option[value="'+json.features[0].properties.geolograyon_data_id+'"]').prop("selected",true);
$('.edit_button_geo_ray_data_dialog').prop('disabled',true);
}
else{
$('#vil_id').prop("disabled",true);
$('#geo_ray_id option[value='+json.features[0].properties.geolograyon_data_edit_id+']').prop("selected",true);
$('#geo_ray_id').prop("disabled",true);
}
if(json.features[0].properties.geolograyon_data_edit_id!=null){
$('#vil_id').prop("disabled",true);
$('#geo_ray_id option[value='+json.features[0].properties.geolograyon_data_edit_id+']').prop("selected",true);
$('#geo_ray_id').prop("disabled",true);


}




 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});

});


$(document).on('click','.button_edit_geo_ray_data',function(){

  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('id',$(this).attr('data-id'));
  data.append('status',$(this).attr('data-status'));
  var geo_ray_id=$(this).attr('data-geo_ray_id');
  
    $.ajax({
        url: '/edit_geo_ray_data_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

let data=result['data'][0];

 let text=`
 <div style='overflow-x:hidden; overflow-y:auto; height:680px; padding:5px; padding-right:10px;' > 
<label for='vil_id3' class='label_admin_input'>Viloyatni tanlang <span style='color:red'>*</span></label> 
<select id="vil_id3" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in viloyat){
  text+=`<option value='`+viloyat[i].id+`' >`+viloyat[i].disUz+`</option>`;
}
text+=`</select>

<label for='tuman' class='label_admin_input'>Shahar, tuman <span style='color:red'>*</span></label> 
<input class='form-control' id='tuman' type='text' >

<label for='joy_nomi' class='label_admin_input'>Joy nomi <span style='color:red'>*</span></label> 
<input class='form-control' id='joy_nomi' type='text' >

<label for='obyekt_nomi' class='label_admin_input'>Obyekt nomi <span style='color:red'>*</span></label> 
<input class='form-control' id='obyekt_nomi' type='text' >

<label for='bajaruvchi_tashkilot' class='label_admin_input'>Bajaruvchi tashkilot <span style='color:red'>*</span></label> 
<input class='form-control' id='bajaruvchi_tashkilot' type='text' >

<label for='bajaruvchi_shaxs' class='label_admin_input'>Bajaruvchi shaxs</label> 
<input class='form-control' id='bajaruvchi_shaxs' type='text' >

<label for='buyurtmachi' class='label_admin_input'>Buyurtmachi</label> 
<input class='form-control' id='buyurtmachi' type='text' >


<label for='inv_nomer' class='label_admin_input'>Hisobotning arxivdagi inventar nomeri <span style='color:red'>*</span></label> 
<input class='form-control' id='inv_nomer' type='text' >

<label for='grif' class='label_admin_input'>Grif <span style='color:red'>*</span></label> 
<select id="grif" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in grif_json){
  text+=`<option value='`+grif_json[i].val+`'>`+grif_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='koor_tiz' class='label_admin_input'>Koordinatalar tizimi</label> 
<select id="koor_tiz" class = "form-control">
<option value='' selected >-----</option>`;

for(let i in koor_tizim_json){
  text+=`<option value='`+koor_tizim_json[i].val+`'>`+koor_tizim_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='masshtab' class='label_admin_input'>Masshtab</label>
<select id="masshtab" class = "form-control">
<option value='-1' selected >-----</option>`;

for(let i in masshtab_json){
  text+=`<option value='`+masshtab_json[i].val+`' >`+masshtab_json[i].dis+`</option>`;
}

text+=`
</select>

<label for='ish_bosh_vaqt' class='label_admin_input'>Ish boshlangan vaqt</label> 
<input class='form-control' autocomplete="off" id='ish_bosh_vaqt' type='text' >

<label for='ish_yak_vaqt' class='label_admin_input'>Ish yakunlangan vaqt</label> 
<input class='form-control' autocomplete="off" id='ish_yak_vaqt' type='text' >

<label for='ish_baj_davr' class='label_admin_input'>Ish bajarilgan davr</label> 
<input class='form-control' id='ish_baj_davr' type='text' >

<label for='maydoni_ga' class='label_admin_input'>Maydoni(ga)</label> 
<input class='form-control' id='maydoni_ga' type='number' >


<label for='shartnoma_n' class='label_admin_input'>Shartnoma №</label> 
<input class='form-control' id='shartnoma_n' type='text' >

<label for='shartnoma_nomi' class='label_admin_input'>Shartnoma nomi</label> 
<input class='form-control' id='shartnoma_nomi' type='text' >

<label for='soato' class='label_admin_input'>Soato</label> 
<input class='form-control' id='soato' type='text' >


<table class="table dialog_table_main_tab">
<tr><td><label for='hisobot' class='label_admin_input'>Hisobot</label></td><td></td></tr>
<tr>
<td>

<label class='form-control'>
<input type='file' style='display:none;' data-del='no' class="input_file" id='hisobot'>
<span class="span_admin_tab">`+repath2(data.hisobot)+`</span>
</label>

</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_geo_ray_data_file" data-file_type='hisobot'  value='delete'>
</td></tr>

<tr><td><label for='grafik' class='label_admin_input'>Grafik ma'lumot</label> </td><td></td></tr>
<tr>
<td>
<label class='form-control'>
<input type='file' style='display:none;' data-del='no' class="input_file" id='grafik'>
<span class="span_admin_tab">`+repath2(data.grafik)+`</span>
</label>

</td>
<td style='width:70px;'>
<input type='button' class="btn btn-danger delete_geo_ray_data_file"  data-file_type='grafik' value='delete'>
</td></tr>
</table>
  
<label for='izoh' class='label_admin_input'>Izoh</label> 
<textarea class='form-control' id='izoh' rows="3">`+data.izoh+`</textarea>
<input type='hidden' id='geo_ray_id3' value='`+geo_ray_id+`' >
<input type='hidden' id='geo_ray_data_id' value='`+data.ojb_id+`' >
<input type='hidden' id='geo_ray_data_status' value='`+data.status+`' >
<br>
<span style='color:red'>*</span> - Majburiy to'ldirilishi shart bo'lgan maydonlar
<br>
<br>
<input class='btn btn-success' type='button' value="O'zgartirish" id='edit_button_geo_ray_data'>
<div id="load_alert_div2"></div>
</div>
`;

$('#modal_create_geo_ray_data').html(text);
$('#modal_create_geo_ray_data').dialog('open');

$('#ish_bosh_vaqt').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#ish_bosh_vaqt').datepicker('option','dateFormat','dd.mm.yy');

$('#ish_yak_vaqt').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#ish_yak_vaqt').datepicker('option','dateFormat','dd.mm.yy');



$('#tuman').val(data.tuman);
$('#joy_nomi').val(data.joy_nomi);
$('#obyekt_nomi').val(data.obyekt_nomi);
$('#bajaruvchi_tashkilot').val(data.bajaruvchi_tashkilot);
$('#bajaruvchi_shaxs').val(data.bajaruvchi_shaxs);
$('#buyurtmachi').val(data.buyurtmachi);
$('#inv_nomer').val(data.inv_nomer);

$('#grif option[value="'+data.grif+'"]').prop("selected",true);
$('#koor_tiz option[value="'+data.koordinatalar_tizimi+'"]').prop("selected",true);
$('#masshtab option[value="'+data.masshtab+'"]').prop("selected",true);

$('#ish_bosh_vaqt').val(data.ish_boshlangan_vaqt);
$('#ish_yak_vaqt').val(data.ish_yakunlangan_vaqt);
$('#ish_baj_davr').val(data.ish_bajarilgan_davr);
$('#maydoni_ga').val(data.maydoni_ga);
$('#shartnoma_n').val(data.shartnoma_n);
$('#shartnoma_nomi').val(data.shartnoma_nomi);
$('#soato').val(data.soato);

$('#vil_id3 option[value="'+data.vil_id+'"]').prop("selected",true);


 },
 error:function(){
    console.log('Ajaxda xatolik');
 }
});

});





$(document).on('click','#edit_button_geo_ray_data',function(){

if($('#vil_id3').val()!=-1 && $('#tuman').val()!='' && $('#joy_nomi').val()!='' && $('#bajaruvchi_tashkilot').val()!='' && $('#obyekt_nomi').val()!='' && $('#inv_nomer').val()!='' && $('#grif').val()!=-1 ){


$('#load_alert_div2').html("<img width='80px' height='80px' src='/static/img/processing.gif'>");
$('#load_alert_div2').css({'display':'block'});


var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);

data.append('vil_id',$('#vil_id3').val());
data.append('id',$('#geo_ray_data_id').val());
data.append('geo_ray_id',$('#geo_ray_id3').val());
data.append('status',$('#geo_ray_data_status').val());

data.append('tuman',$('#tuman').val());
data.append('joy_nomi',$('#joy_nomi').val());
data.append('obyekt_nomi',$('#obyekt_nomi').val());
data.append('bajaruvchi_tashkilot',$('#bajaruvchi_tashkilot').val());
data.append('bajaruvchi_shaxs',$('#bajaruvchi_shaxs').val());
data.append('buyurtmachi',$('#buyurtmachi').val());
data.append('inv_nomer',$('#inv_nomer').val());
data.append('grif',$('#grif').val());
data.append('koor_tiz',$('#koor_tiz').val());
data.append('masshtab',$('#masshtab').val());
data.append('ish_bosh_vaqt',$('#ish_bosh_vaqt').val());
data.append('ish_yak_vaqt',$('#ish_yak_vaqt').val());
data.append('ish_baj_davr',$('#ish_baj_davr').val());
data.append('maydoni_ga',$('#maydoni_ga').val());
data.append('shartnoma_n',$('#shartnoma_n').val());
data.append('shartnoma_nomi',$('#shartnoma_nomi').val());
data.append('soato',$('#soato').val());
data.append('izoh',$('#izoh').val());

if($('#hisobot')[0].files.length==0){
data.append('hisobot_del',$('#hisobot').attr('data-del'));  
}
data.append('hisobot', $('#hisobot')[0].files[0]);

if($('#grafik')[0].files.length==0){
data.append('grafik_del',$('#grafik').attr('data-del'));  
}
data.append('grafik', $('#grafik')[0].files[0]);

    $.ajax({
        url: '/edit_geo_ray_data_edit',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
           type: 'post',
        success: function (result) {
$('#load_alert_div2').html("<p>O'zgardi !!</p>");
$('#load_alert_div2').css({'display':'block'});
$('#load_alert_div2 p').addClass('p_alert_admin_tab_success');

$('#geo_ray_data_id').val(result['id']);
$('#geo_ray_data_status').val(result['status']);
},
      error:function(){
$('#load_alert_div2').html("<p>Xatolik !!</p>");
$('#load_alert_div2').css({'display':'block'});
$('#load_alert_div2 p').addClass('p_alert_admin_tab_error');
          console.log('Ajaxda xatolik!!');
        }
});


}
else{
$('#load_alert_div').html("<p>Asosiy maydonlar to'ldirilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
}
});


$(document).on('click','#edit_geo_ray_button',function(){

if($('#vil_id').val()!=-1 && $('#geo_ray_id').val()!=-1  && $('#kod').val()!=''){

  if(check_kod( $('#kod').val())==1){


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
data.append('geo_ray_data_id',$('#geo_ray_data_id').val());

data.append('vil_ind',$('#vil_ind').val());
data.append('vil_tav',$('#vil_tav').val());
data.append('hud_ind',$('#hud_ind').val());
data.append('hud_tav',$('#hud_tav').val());
data.append('kich_hud_ind',$('#kich_hud_ind').val());
data.append('kich_hud_tav',$('#kich_hud_tav').val());
data.append('uch_ind',$('#uch_ind').val());
data.append('uch_tav',$('#uch_tav').val());
data.append('gen_tav',$('#gen_tav').val());
data.append('geod_jar',$('#geod_jar').val());
data.append('inj_tad',$('#inj_tad').val());
data.append('grund_tav',$('#grund_tav').val());
data.append('kod',$('#kod').val());

data.append('status',$('#geo_ray_status').val());
data.append('id',$('#geolograyon_id').val());

if($('#geo_ray_id').val()=='yes'){
data.append('with','yes');

data.append('tuman',$('#tuman').val());
data.append('joy_nomi',$('#joy_nomi').val());
data.append('obyekt_nomi',$('#obyekt_nomi').val());
data.append('bajaruvchi_tashkilot',$('#bajaruvchi_tashkilot').val());
data.append('bajaruvchi_shaxs',$('#bajaruvchi_shaxs').val());
data.append('buyurtmachi',$('#buyurtmachi').val());
data.append('inv_nomer',$('#inv_nomer').val());
data.append('grif',$('#grif').val());
data.append('koor_tiz',$('#koor_tiz').val());
data.append('masshtab',$('#masshtab').val());
data.append('ish_bosh_vaqt',$('#ish_bosh_vaqt').val());
data.append('ish_yak_vaqt',$('#ish_yak_vaqt').val());
data.append('ish_baj_davr',$('#ish_baj_davr').val());
data.append('maydoni_ga',$('#maydoni_ga').val());
data.append('shartnoma_n',$('#shartnoma_n').val());
data.append('shartnoma_nomi',$('#shartnoma_nomi').val());
data.append('soato',$('#soato').val());
data.append('izoh',$('#izoh').val());
if($('#hisobot')[0].files.length==0){
data.append('hisobot_del',$('#hisobot').attr('data-del'));  
}
data.append('hisobot', $('#hisobot')[0].files[0]);

if($('#grafik')[0].files.length==0){
data.append('grafik_del',$('#grafik').attr('data-del'));  
}
data.append('grafik', $('#grafik')[0].files[0]);

}

else{
data.append('with','no');
}
 

data.append('geometry',json_str);

    $.ajax({
        url: '/edit_geo_ray',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
           type: 'post',
        success: function (result) {
$('#load_alert_div').html("<p>O'zgardi !!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_success');

$('#geolograyon_id').val(result['id']);
$('#geo_ray_status').val(result['status']);
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
}
else{
$('#load_alert_div').html("<p>KOD standart bo'yicha kiritilmagan!!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');

}
}
else{
$('#load_alert_div').html("<p>Asosiy maydonlar to'ldirilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
}
});




$(document).on('click','#create_geo_ray_button',function(){

if($('#vil_id').val()!=-1 && $('#geo_ray_id').val()!=-1  && $('#kod').val()!=''){

  if(check_kod( $('#kod').val())==1){


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
data.append('geo_ray_id',$('#geo_ray_id').val());
data.append('type','one');

data.append('vil_ind',$('#vil_ind').val());
data.append('vil_tav',$('#vil_tav').val());
data.append('hud_ind',$('#hud_ind').val());
data.append('hud_tav',$('#hud_tav').val());
data.append('kich_hud_ind',$('#kich_hud_ind').val());
data.append('kich_hud_tav',$('#kich_hud_tav').val());
data.append('uch_ind',$('#uch_ind').val());
data.append('uch_tav',$('#uch_tav').val());
data.append('gen_tav',$('#gen_tav').val());
data.append('geod_jar',$('#geod_jar').val());
data.append('inj_tad',$('#inj_tad').val());
data.append('grund_tav',$('#grund_tav').val());
data.append('kod',$('#kod').val());

if($('#geo_ray_id').val()=='yes'){
data.append('with','yes');

data.append('tuman',$('#tuman').val());
data.append('joy_nomi',$('#joy_nomi').val());
data.append('obyekt_nomi',$('#obyekt_nomi').val());
data.append('bajaruvchi_tashkilot',$('#bajaruvchi_tashkilot').val());
data.append('bajaruvchi_shaxs',$('#bajaruvchi_shaxs').val());
data.append('buyurtmachi',$('#buyurtmachi').val());
data.append('inv_nomer',$('#inv_nomer').val());
data.append('grif',$('#grif').val());
data.append('koor_tiz',$('#koor_tiz').val());
data.append('masshtab',$('#masshtab').val());
data.append('ish_bosh_vaqt',$('#ish_bosh_vaqt').val());
data.append('ish_yak_vaqt',$('#ish_yak_vaqt').val());
data.append('ish_baj_davr',$('#ish_baj_davr').val());
data.append('maydoni_ga',$('#maydoni_ga').val());
data.append('shartnoma_n',$('#shartnoma_n').val());
data.append('shartnoma_nomi',$('#shartnoma_nomi').val());
data.append('soato',$('#soato').val());
data.append('izoh',$('#izoh').val());
data.append('hisobot', $('#hisobot')[0].files[0]);
data.append('grafik', $('#grafik')[0].files[0]);
}
else{
data.append('with','no');
}


data.append('geometry',json_str);

    $.ajax({
        url: '/create_geo_ray',
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
}else{

$('#load_alert_div').html("<p>KOD standart bo'yicha kiritilmagan!!</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning');

}
}
else{
$('#load_alert_div').html("<p>Asosiy maydonlar to'ldirilmagan</p>");
$('#load_alert_div').css({'display':'block'});
$('#load_alert_div p').addClass('p_alert_admin_tab_warning'); 
}


});


$(document).on('click','.button_save_new_geo_ray',function(){
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('geo_ray_id',$(this).attr('data-geo_ray_id'));
  data.append('type',$(this).attr('data-type'));
  data.append('confirm',$(this).attr('data-confirm'));
    $.ajax({
        url: '/save_geo_ray',
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

$('.button_save_new_geo_ray').prop('disabled','disabled');
$('.create_popup_geo_ray_data').prop('disabled','disabled');
},
        error:function(){
console.log('Ajaxda xatolik!!'); 
        }
      });
  });
