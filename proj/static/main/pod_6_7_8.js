var pp_cons=new Array();
pp_cons[1]=pp_cons[5]=pp_cons[6]=pp_cons[7]='Yangi qurilish';
pp_cons[2]=pp_cons[8]=pp_cons[9]=pp_cons[10]='Rekonstruksiya';
pp_cons[3]=pp_cons[11]=pp_cons[12]=pp_cons[13]='Qayta profillash, rekonstruktsiya qilish bilan birga';



function pp_cons_funk(pp_cons_real,task_id){
  let data=JSON.parse(pp_cons_real);
  let text='';
  for(let i in data){
text+=pp_cons[data[i]]+" ";
  }
  return text+"<br>"+task_id;
}

function yur_jis_shaxs(user_type,legal_entity_tin,tin,pas_ser){
  if(user_type=='J'){
    return "Yuridik shaxs <img data-t='J' data-inn='"+legal_entity_tin+"' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'><br>INN "+legal_entity_tin+" ";
  }
  else{
    return "Jismoniy shaxs <img data-t='I' data-inn='"+tin+"' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'><br>"+pas_ser+"";
  }
}


function loyiha_tash(tin){

  if(tin!='0'){

return tin+" <img data-inn='"+tin+"' class='info_loyihalovchi info_png_objects_inn' src='/static/img/info.png'>";}
else{
  return "Mavjud emas!"
}
}

function pudratchi_tash(tin){

  if(tin!='0'){

return tin+" <img data-inn='"+tin+"' class='info_pudratchi info_png_objects_inn' src='/static/img/info.png'>";}
else{
  return "Mavjud emas!"
}
}

function check_null(data){
  return data==null||data==''||data=='0'?'':data;
}

function create_loyihachi_full_info(inn){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("inn", inn);
data.append("type", 'full_info');

$.ajax({
        url: '/loyihalovchi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

    var data=(JSON.parse(result.data)).features[0].properties;

var text=`
<h4><b>Loyihalovchi tashkilot loyihasini qilgan ishlar</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='340px' >Buyurtmasidagi binolar, inshootlar va boshqa oby'ektlar qurilishining loyiha-smeta hujjatlari</td><td>[ `+result.psd_count+` ] <span class='filter_obj_by_inn' data-serv='psd' data-field='tin_project_org' data-inn='`+data.inn+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari </td><td>[ `+result.pexpl_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl' data-field='tin_project_org' data-inn='`+data.inn+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari</td><td>[ `+result.pexpl_ind_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl_ind' data-field='tin_project_org' data-inn='`+data.inn+`'>Ko'rish</span></td></tr>
</table>
`;
text+=`<hr class='my_hr'><h4><b>Loyihalovchi tashkilot ma'lumotlari</b></h4><table class='my_table table-striped'>
<tr><td width='300px'>Tashkilot nomi</td><td>`+check_null(data.nomi)+`</td></tr>
<tr><td>Tashkilotning tashkiliy-huquqiy shakli</td><td>`+check_null(data.txtash)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(data.inn)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(data.adress)+`</td></tr>
<tr><td>Viloyat</td><td>`+check_null(data.viloyat)+`</td></tr>
<tr><td>Tuman</td><td>`+check_null(data.tuman)+`</td></tr>
<tr><td>Aholi punkti</td><td>`+check_null(data.ap)+`</td></tr>
<tr><td>Raxbar F.I.O</td><td>`+check_null(data.raxbar)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(data.contact)+`</td></tr>
<tr><td>Asosiy faoliyat turi(IFUT)</td><td>`+check_null(data.ifut)+`</td></tr>
<tr><td>IFUT kodi</td><td>`+check_null(data.ifut_kodi)+`</td></tr>
<tr><tr><td>Litsenziya №</td><td>`+check_null(data.litsenziya_2)+`</td></tr>
<tr><td>Litsenziya muddati</td><td>`+check_null(data.litsenziya_muddat_2)+`</td></tr>
<tr><td>Reestr raqami</td><td>`+check_null(data.reestr_raqami)+`</td></tr>
<tr><td>Litsenziya berilgan sana</td><td>`+check_null(data.litsenziya_sana)+`</td></tr>
<tr><td>Litsenziyalangan faoliyat turi</td><td>`+check_null(data.litsenziya_ft)+`</td></tr>
<tr><td>Litsenziya kelishuv shartnoma raqami</td><td>`+check_null(data.litsenziya_kshr)+`</td></tr>
<tr><td>Litsenziya kelishuv shartnoma sanasi</td><td>`+check_null(data.litsenziya_kshr_sana)+`</td></tr>
<tr><td>Litsenziyagan ishlar turi</td><td>`+check_null(data.litsenziyalangan_ishlar)+`</td></tr>
<tr><td>Litsenziyani qayta ro'yxatga olish yoki chaqirib olish sababi</td><td>`+check_null(data.litsenziya_qro)+`</td></tr>
<tr><td>Mulkchilik shakli</td><td>`+check_null(data.mulk_shakli)+`</td></tr>
<tr><td>Arxitektura-shaharsozlik hujjatlari klassifikatori bo'yicha</td><td>`+check_null(data.ashxkb)+`</td></tr>
</table>`;


$('#dialog_loyihalovchi_full_info').html(text);
$('#dialog_loyihalovchi_full_info').dialog('open');


        },
        error:function(){
          console.log('Axajda xatolik');
        }})

}

$(document).on('click','.info_loyihalovchi',function(){
create_loyihachi_full_info($(this).attr('data-inn'));
});

function create_pudratchi_full_info(inn){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("inn", inn);
data.append("type", 'full_info');

$.ajax({
        url: '/pudratchi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

    var data=(JSON.parse(result.data)).features[0].properties;


var text=`
<h4><b>Pudratchi tashkilot qilgan ishlar</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='340px;'>Buyurtmasidagi turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari </td><td>[ `+result.pexpl_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl' data-field='tin_contractor_org' data-inn='`+data.inn+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari</td><td>[ `+result.pexpl_ind_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl_ind' data-field='tin_contractor_org' data-inn='`+data.inn+`'>Ko'rish</span></td></tr>
</table>
`;

text+=`<hr class='my_hr'><h4><b>Pudratchi tashkilot ma'lumotlari</b></h4><table class='my_table table-striped'>

<tr><td width='300px'>Tashkilot nomi</td><td>`+check_null(data.nomi)+`</td></tr>
<tr><td>Tashkilotning tashkiliy-huquqiy shakli</td><td>`+check_null(data.txtash)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(data.inn)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(data.adress)+`</td></tr>
<tr><td>Viloyat</td><td>`+check_null(data.viloyat)+`</td></tr>
<tr><td>Tuman</td><td>`+check_null(data.tuman)+`</td></tr>
<tr><td>Aholi punkti</td><td>`+check_null(data.ap)+`</td></tr>
<tr><td>Raxbar F.I.O</td><td>`+check_null(data.raxbar)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(data.contact)+`</td></tr>
<tr><td>Reestr raqami</td><td>`+check_null(data.reestr_raqami)+`</td></tr>
<tr><td>Mulkchilik shakli</td><td>`+check_null(data.mulk_shakli)+`</td></tr>
</table>`;

$('#dialog_pudratchi_full_info').html(text);
$('#dialog_pudratchi_full_info').dialog('open');


        },
        error:function(){
          console.log('Axajda xatolik');
        }})

}


$(document).on('click','.info_pudratchi',function(){
create_pudratchi_full_info($(this).attr('data-inn'));
});



function create_yur_jis_shaxs_full_info(type,inn){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("user_type", type);
data.append("inn", inn);
data.append("type", 'full_info');

$.ajax({
        url: '/buyurtmachi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

if(data.type=='I'){
var text=`<h4><b>Jismoniy shaxs ma'lumotlari</b></h4><hr class='my_hr'><table class='my_table table-striped '>
<tr><td width='150'>F.I.SH</td><td>`+check_null(data.data[0].full_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(data.data[0].permit_address)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(data.data[0].passport_number)+`</td></tr>
<tr><td>Qachon bergan</td><td>`+check_null(data.data[0].passport_issue_date)+`</td></tr>
<tr><td>Tug'ulgan sana</td><td>`+check_null(data.data[0].birthday)+`</td></tr>
<tr><td>STIR </td><td>`+check_null(data.data[0].tin)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(data.data[0].phone)+`</td></tr>
<tr><td>Email</td><td>`+check_null(data.data[0].email)+`</td></tr>
</table>`;

text+=`
<h4><b><hr class='my_hr'>Jismoniy shaxsning boshqa xizmatlari</b></h4><table class='my_table table-striped '>
<tr><td width='340px' >Buyurtmasidagi arxitektura-rejalashtirish topshiriqlari</td><td>[ `+data.apz_count+` ] <span class='filter_obj_by_inn' data-serv='apz' data-field='tin' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi binolar, inshootlar va boshqa oby'ektlar qurilishining loyiha-smeta hujjatlari</td><td>[ `+data.psd_count+` ] <span class='filter_obj_by_inn' data-serv='psd' data-field='tin' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjatlari</td><td>[ `+data.psd_ind_count+` ] <span class='filter_obj_by_inn' data-field='tin' data-serv='psd_ind' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish to'grisidagi hujjatlari</td><td>[ `+data.perm_rec_count+` ] <span class='filter_obj_by_inn' data-serv='perm_rec' data-field='tin' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi qurilish-montaj ishlarini amalga oshirish hujjatlari</td><td>[ `+data.smr_count+` ] <span class='filter_obj_by_inn' data-serv='smr' data-field='tin' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari </td><td>[ `+data.pexpl_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl' data-field='tin' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari</td><td>[ `+data.pexpl_ind_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl_ind' data-field='tin' data-inn='`+data.data[0].tin+`'>Ko'rish</span></td></tr>
</table>`;
}
else{
var text=`<h4><b>Yuridik shaxs ma'lumotlari</b></h4><hr class='my_hr'><table class='my_table table-striped '>
<tr><td width='150px'>Tashkilot nomi</td><td>`+check_null(data.data[0].legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(data.data[0].legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(data.data[0].legal_entity_tin)+`</td></tr>
<tr><td>Email</td><td>`+check_null(data.data[0].legal_entity_email)+`</td></tr>
<tr><td>Tashkilot tel nomeri </td><td>`+check_null(data.data[0].legal_entity_phone_number)+`</td></tr>
<tr><td>Raxbar F.I.SH</td><td>`+check_null(data.data[0].legal_head_name)+`</td></tr>
<tr><td>Raxbar STIR</td><td>`+check_null(data.data[0].legal_head_tin)+`</td></tr>

</table>`;
text+=`<hr class='my_hr'><h4><b>Yuridik shaxsning boshqa xizmatlari</b></h4><table class='my_table table-striped '>
<tr><td width='340px' >Buyurtmasidagi arxitektura-rejalashtirish topshiriqlari</td><td>[ `+data.apz_count+` ] <span class='filter_obj_by_inn' data-serv='apz'  data-field='legal_entity_tin' data-inn='`+data.data[0].legal_entity_tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi binolar, inshootlar va boshqa oby'ektlar qurilishining loyiha-smeta hujjatlari</td><td>[ `+data.psd_count+` ] <span class='filter_obj_by_inn' data-serv='psd' data-field='legal_entity_tin' data-inn='`+data.data[0].legal_entity_tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish to'grisidagi hujjatlari</td><td>[ `+data.perm_rec_count+` ] <span class='filter_obj_by_inn' data-serv='perm_rec' data-field='legal_entity_tin' data-inn='`+data.data[0].legal_entity_tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi qurilish-montaj ishlarini amalga oshirish hujjatlari</td><td>[ `+data.smr_count+` ] <span class='filter_obj_by_inn' data-serv='smr' data-field='legal_entity_tin' data-inn='`+data.data[0].legal_entity_tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari </td><td>[ `+data.pexpl_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl' data-field='legal_entity_tin' data-inn='`+data.data[0].legal_entity_tin+`'>Ko'rish</span></td></tr>
<tr><td >Buyurtmasidagi noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilinishi hujjatlari</td><td>[ `+data.pexpl_ind_count+` ] <span class='filter_obj_by_inn' data-serv='pexpl_ind' data-field='legal_entity_tin' data-inn='`+data.data[0].legal_entity_tin+`'>Ko'rish</span></td></tr>
</table>`;

}
$('#dialog_buyurtmachi_full_info').html(text);

$('#dialog_buyurtmachi_full_info').dialog('open');
document.getElementById("dialog_buyurtmachi_full_info").scrollTop = 0;


        },
         error:function(){
        console.log('Axajda xatolik');
}
      });


}

$(document).on('click','.info_yur_jis_shaxs',function(){
create_yur_jis_shaxs_full_info($(this).attr('data-t'),$(this).attr('data-inn'));
});



function load_apz_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/apz_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);



text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Qurulish ko'rinishi</td>
<td>Manzil</td>`;

if(search_field=='name_building'){
  text+=`<td width='100px'>Ob'yekt nomi</td>`;
}

text+=`<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>
<td width='200px'>Hujjatlar</td>
</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='apz' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+pp_cons_funk(json[i].fields.purpose_construction_real,json[i].fields.task_id)+`</td>`;
if(search_field=='name_building'){
text+=`<td>`+json[i].fields.name_building+`</td>`;  
}
text+=`<td>`;

if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='apz' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}
text+=json[i].fields.location_building+`</td>
<td>`+json[i].fields.region+`<br>`+json[i].fields.district+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.legal_entity_tin,json[i].fields.tin,json[i].fields.passport_number)+`</td>
<td>`+json[i].fields.date+`</td>
<td><a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.apz+`' download>
APZ 
<img class='img_down' src='/static/img/img/download-file.png'></a><br>

<a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.decision_city_hokim+`' download>
Yerni taqdim etish hujjati
<img class='img_down'  src='/static/img/img/download-file.png'></a></td>

</tr>`;
}

$('#apz_table').html(text);

$('#count_apz_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-apz_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}

var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_apz_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-apz');
pagination.twbsPagination(defaultOpts);

$("#dialog_apz_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("apz_table_div").scrollTop = 0;
var tablecont=document.querySelector('#apz_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}


$(document).on('change','#apz_id',function(){
if($(this).prop("checked")){ map.addLayer(apz); }
else { map.removeLayer(apz); }
});
$(document).on('change','#psd_id',function(){
if($(this).prop("checked")){ map.addLayer(psd); }
else { map.removeLayer(psd); }
});
$(document).on('change','#psd_ind_id',function(){
if($(this).prop("checked")){ map.addLayer(psd_ind); }
else { map.removeLayer(psd_ind); }
});
$(document).on('change','#perm_rec_id',function(){
if($(this).prop("checked")){ map.addLayer(perm_rec); }
else { map.removeLayer(perm_rec); }
});
$(document).on('change','#smr_id',function(){
if($(this).prop("checked")){ map.addLayer(smr); }
else { map.removeLayer(smr); }
});
$(document).on('change','#pexpl_id',function(){
if($(this).prop("checked")){ map.addLayer(pexpl); }
else { map.removeLayer(pexpl); }
});
$(document).on('change','#pexpl_ind_id',function(){
if($(this).prop("checked")){ map.addLayer(pexpl_ind); }
else { map.removeLayer(pexpl_ind); }
});

$(document).on('change','#loy_id',function(){
if($(this).prop("checked")){ map.addLayer(loy); }
else { map.removeLayer(loy); }
});
$(document).on('change','#pud_id',function(){
if($(this).prop("checked")){ map.addLayer(pud); }
else { map.removeLayer(pud); }
});


$(document).on('click','.fly_to_bounds_2',function(){
if($(this).attr('data-layer_name')=='loy'||$(this).attr('data-layer_name')=='pud') {
var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:"+$(this).attr('data-layer_name')+"&outputFormat=application%2Fjson&cql_filter=inn='"+$(this).attr('data-inn')+"'";
$.getJSON(url, function(data)
{
map.flyTo([data.features[0].geometry.coordinates[1],data.features[0].geometry.coordinates[0]],12);
});
}
else{
var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:"+$(this).attr('data-layer_name')+"&outputFormat=application%2Fjson&cql_filter="+$(this).attr('data-layer_name')+"='"+$(this).attr('data-id')+"'";

$.getJSON(url, function(data)
{
var d=data.features[0].properties;
  if(d.which_geo=='1'){
    var bounds=gsch.bbox(gsch.multiPoint(data.features[0].geometry.coordinates));  
  }
   if(d.which_geo=='2'||d.which_geo=='3'){
   var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].properties.geoPolygon.coordinates));  
  }
  map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
});
}
});




function load_psd_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/psd_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Ariza nomeri</td>
<td >Наименование проектно-сметной документации</td>
<td width='120px'>Loyihalovchi tashkilot INN</td>
<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>
<td width='200px'>Hujjatlar</td>
</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='psd' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+json[i].fields.task_id+`</td>
<td>`;

if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='psd' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}
text+=json[i].fields.name_design_estimates+`</td>
<td>`+loyiha_tash(json[i].fields.tin_project_org)+`</td>
<td>`+json[i].fields.region_id+`<br>`+json[i].fields.district_id+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.legal_entity_tin,json[i].fields.individual_tin,json[i].fields.passport_number)+`</td>
<td>`+json[i].fields.date+`</td>
<td><a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.file_main+`' download>
Проектно-сметная документация
<img class='img_down' src='/static/img/img/download-file.png'></a><br>

<a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.doc_architectura+`' download>
Документ (Согласования)
<img class='img_down'  src='/static/img/img/download-file.png'></a></td>

</tr>`;
}

$('#psd_table').html(text);

$('#count_psd_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-psd_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}

var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_psd_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-psd');
pagination.twbsPagination(defaultOpts);

$("#dialog_psd_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("psd_table_div").scrollTop = 0;
var tablecont=document.querySelector('#psd_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}




function load_psd_ind_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/psd_ind_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Qurulish ko'rinishi</td>
<td >Manzil</td>
<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>
<td width='200px'>Hujjatlar</td>
</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='psd_ind' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+json[i].fields.treatment_purpose+`<br>`+json[i].fields.task_id+`</td>
<td>`;

if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='psd_ind' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}

text+=json[i].fields.object_adress+`</td>
<td>`+json[i].fields.region+`<br>`+json[i].fields.district+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.tin,json[i].fields.tin,json[i].fields.passport_number)+`</td>
<td>`+json[i].fields.date+`</td>

<td><a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.design_estimate+`' download>
Проектно-сметная документация
<img class='img_down' src='/static/img/img/download-file.png'></a><br>

<a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.upload_file_ijs+`' download>
Документ (Согласования)
<img class='img_down'  src='/static/img/img/download-file.png'></a></td>
</tr>`;
}

$('#psd_ind_table').html(text);

$('#count_psd_ind_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-psd_ind_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}

var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_psd_ind_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-psd_ind');
pagination.twbsPagination(defaultOpts);

$("#dialog_psd_ind_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("psd_ind_table_div").scrollTop = 0;
var tablecont=document.querySelector('#psd_ind_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}




function load_perm_rec_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/perm_rec_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Ariza nomeri</td>
<td >Manzil</td>
<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>
<td width='200px'>Hujjatlar</td>
</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='perm_rec' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+json[i].fields.task_id+`</td>
<td>`;

if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='perm_rec' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}

text+=json[i].fields.building_location+`</td>
<td>`+check_null(json[i].fields.select_region)+`<br>`+json[i].fields.district+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.legal_entity_tin,json[i].fields.tin,json[i].fields.passport_number)+`</td>

<td>`+json[i].fields.date+`</td>

<td><a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.acceptance+`' download>
Кадастрового паспорта зданий и сооружений
<img class='img_down' src='/static/img/img/download-file.png'></a><br>

<a href='https://my.gov.uz/oz/get-service-file/`+json[i].fields.task_id+`/`+json[i].fields.scanfile+`' download>
Разрешения
<img class='img_down'  src='/static/img/img/download-file.png'></a></td>


</tr>`;
}



$('#perm_rec_table').html(text);

$('#count_perm_rec_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-perm_rec_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}

var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_perm_rec_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-perm_rec');
pagination.twbsPagination(defaultOpts);

$("#dialog_perm_rec_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("perm_rec_table_div").scrollTop = 0;
var tablecont=document.querySelector('#perm_rec_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}


function load_smr_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/smr_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Ariza nomeri</td>
<td width='100px'>Qurulish ko'rinishi</td>
<td>Manzil</td>
<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>

</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='smr' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+json[i].fields.task_id+`</td>
<td>`+json[i].fields.construction_works+`</td>
<td>`;

if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='smr' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}

text+=json[i].fields.location_building+`</td>
<td>`+json[i].fields.region_id+`<br>`+json[i].fields.district_id+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.legal_entity_tin,json[i].fields.tin,json[i].fields.passport_number)+`</td>
<td>`+json[i].fields.date+`</td>

</tr>`;
}

$('#smr_table').html(text);

$('#count_smr_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-smr_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}

var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_smr_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-smr');
pagination.twbsPagination(defaultOpts);

$("#dialog_smr_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("smr_table_div").scrollTop = 0;
var tablecont=document.querySelector('#smr_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}





function load_pexpl_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/pexpl_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Ariza nomeri</td>
<td>Manzil</td>
<td width='120px'>Pudratchi tashkilot (STIR)</td>
<td width='120px'>Loyihalovchi tashkilot (STIR)</td>
<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>

</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='pexpl' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+json[i].fields.task_id+`</td>
<td>`;
if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='pexpl' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}
text+=json[i].fields.buildings_location+`</td>
<td>`+pudratchi_tash(json[i].fields.tin_contractor_org)+`</td>
<td>`+loyiha_tash(json[i].fields.tin_project_org)+`</td>
<td>`+json[i].fields.region_id+`<br>`+json[i].fields.district_id+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.legal_entity_tin,json[i].fields.tin,json[i].fields.passport_number)+`</td>
<td>`+json[i].fields.date+`</td>

</tr>`;
}

$('#pexpl_table').html(text);

$('#count_pexpl_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-pexpl_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}

var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_pexpl_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-pexpl');
pagination.twbsPagination(defaultOpts);

$("#dialog_pexpl_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("pexpl_table_div").scrollTop = 0;
var tablecont=document.querySelector('#pexpl_table_div');
tablecont.addEventListener('scroll',scrollHendle);
},
          error:function(){
          console.log('ajax xatolik!');
}
});
}



function load_pexpl_ind_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);

data.append("date_begin",date_begin);
data.append("date_end",date_end);



$.ajax({
        url: '/pexpl_ind_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='30px'>№</td>
<td width='100px'>Ariza nomeri</td>
<td>Manzil</td>
<td width='120px'>Pudratchi tashkilot (STIR)</td>
<td width='120px'>Loyihalovchi tashkilot (STIR)</td>
<td width='100px'>Viloyat tuman, shahar</td>
<td width='140px'>Buyurtmachi</td>
<td width='100px'>Ariza ko'rilgan sana</td>

</tr>`;

for (let i in json){

text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br>
<i class="fa fa-folder-open-o full_info_objects" data-type='pexpl_ind' data-id='`+json[i].fields.task_id+`' ></i>
</td>
<td>`+json[i].fields.task_id+`</td>
<td>`;
if(json[i].fields.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='pexpl_ind' data-id='`+json[i].fields.task_id+`' class='loc_img fly_to_bounds_2'>`;
}
text+=json[i].fields.buildings_location+`</td>
<td>`+pudratchi_tash(json[i].fields.tin_contractor_org)+`</td>
<td>`+loyiha_tash(json[i].fields.tin_project_org)+`</td>
<td>`+json[i].fields.region_id+`<br>`+json[i].fields.district_id+`</td>
<td>`+yur_jis_shaxs(json[i].fields.user_type_real,json[i].fields.legal_entity_tin,json[i].fields.tin,json[i].fields.passport_number)+`</td>
<td>`+json[i].fields.date+`</td>

</tr>`;
}

$('#pexpl_ind_table').html(text);

$('#count_pexpl_ind_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-pexpl_ind_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>8){
  v_count=8;
}
var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_pexpl_ind_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type,date_begin,date_end);
        }
}
var pagination = $('#pagination-pexpl_ind');
pagination.twbsPagination(defaultOpts);

$("#dialog_pexpl_ind_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("pexpl_ind_table_div").scrollTop = 0;
var tablecont=document.querySelector('#pexpl_ind_table_div');
tablecont.addEventListener('scroll',scrollHendle);
},
          error:function(){
          console.log('ajax xatolik!');
}
});
}




function load_loy_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);


$.ajax({
        url: '/loyihalovchi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='40px'>№</td>
<td >Tashkilotning nomi</td>
<td>Manzil</td>
<td width='110px'>STIR</td>

</tr>`;

for (let i in json){
text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br><i class="fa fa-folder-open-o info_loyihalovchi full_info_objects" data-inn='`+json[i].fields.inn+`' ></i>
</td>

<td>`+check_null(json[i].fields.nomi)+`</td>
<td>`;

if(json[i].fields.location!=null){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='loy' data-inn='`+json[i].fields.inn+`' class='loc_img fly_to_bounds_2'>`;
}

text+=json[i].fields.adress+`</td>
<td>`+check_null(json[i].fields.inn)+`</td>

</tr>`;
}
$('#loy_table').html(text);

$('#count_loy_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-loy_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>4){
  v_count=4;
}
var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_loy_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type);
        }
}
var pagination = $('#pagination-loy');
pagination.twbsPagination(defaultOpts);

$("#dialog_loy_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("loy_table_div").scrollTop = 0;
var tablecont=document.querySelector('#loy_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}




function load_pud_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);


$.ajax({
        url: '/pudratchi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='40px'>№</td>
<td >Tashkilotning nomi</td>
<td>Manzil</td>
<td width='110px'>STIR</td>

</tr>`;

for (let i in json){
text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br><i class="fa fa-folder-open-o info_pudratchi full_info_objects" data-inn='`+json[i].fields.inn+`' ></i>
</td>

<td>`+check_null(json[i].fields.nomi)+`</td>
<td>`;

if(json[i].fields.location!=null){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='pud' data-inn='`+json[i].fields.inn+`' class='loc_img fly_to_bounds_2'>`;
}


text+=json[i].fields.adress+`</td>
<td>`+check_null(json[i].fields.inn)+`</td>

</tr>`;
}
$('#pud_table').html(text);

$('#count_pud_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-pud_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>4){
  v_count=4;
}
var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_pud_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type);
        }
}
var pagination = $('#pagination-pud');
pagination.twbsPagination(defaultOpts);

$("#dialog_pud_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});

document.getElementById("pud_table_div").scrollTop = 0;
var tablecont=document.querySelector('#pud_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}



function load_bjs_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("user_type", 'I');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);


$.ajax({
        url: '/buyurtmachi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='40px'>№</td>
<td >F.I.SH</td>
<td>Manzil</td>
<td width='110px'>Pasport numeri</td>
<td width='110px'>STIR</td>

</tr>`;

for (let i in json){
text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br><i class="fa fa-folder-open-o info_yur_jis_shaxs full_info_objects" data-t="I" data-inn="`+json[i].fields.tin+`" ></i>
</td>

<td>`+check_null(json[i].fields.full_name)+`</td>
<td>`+check_null(json[i].fields.permit_address)+`</td>
<td>`+json[i].fields.passport_number+`</td>
<td>`+check_null(json[i].fields.tin)+`</td>


</tr>`;
}
$('#bjs_table').html(text);

$('#count_bjs_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-bjs_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>4){
  v_count=4;
}
var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_bjs_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type);
        }
}
var pagination = $('#pagination-bjs');
pagination.twbsPagination(defaultOpts);

$("#dialog_bjs_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});
$('.info_table_2').css({'cursor':'pointer'});

document.getElementById("bjs_table_div").scrollTop = 0;
var tablecont=document.querySelector('#bjs_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}



function load_bys_table(num_page,page_size,sort_field,sort_type,search_text,search_field,search_type){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'table');
data.append("user_type", 'J');
data.append("page_num",num_page);
data.append("page_size",page_size);

data.append("sort_field",sort_field);
data.append("sort_type",sort_type);

data.append("search_text",search_text);
data.append("search_field",search_field);
data.append("search_type",search_type);


$.ajax({
        url: '/buyurtmachi_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
        
var json=JSON.parse(data.data);

text=`<tr id='table_head'>
<td width='40px'>№</td>
<td >Tashkilot nomi</td>
<td>Manzil</td>
<td width='110px'>STIR</td>

</tr>`;

for (let i in json){
text+=`<tr>
<td class='first_col'>`+((num_page-1)*page_size+parseInt(i)+1)+`<br><i class="fa fa-folder-open-o info_yur_jis_shaxs full_info_objects" data-t="J" data-inn="`+json[i].fields.legal_entity_tin+`" ></i>
</td>

<td>`+check_null(json[i].fields.legal_entity_name)+`</td>
<td>`+check_null(json[i].fields.legal_entity_address)+`</td>
<td>`+check_null(json[i].fields.legal_entity_tin)+`</td>


</tr>`;
}
$('#bys_table').html(text);

$('#count_bys_all').html("Ob'yektlar soni: "+data.count);
$('#pagination-bys_info').html("Sahifalar soni: "+data.num_pages);

let count=data.num_pages;


let v_count=Math.ceil(data.count/page_size);
if(v_count>4){
  v_count=4;
}
var defaultOpts={
        totalPages: count,
        first:"Boshiga qaytish",
        last:"Oxiriga o'tish",
        first:"Boshiga qaytish",
        prev:'Oldingi',
        next:'Kiyingi',
        visiblePages: v_count,
        onPageClick: function (event, page) {
         load_bys_table(page,page_size,sort_field,sort_type,search_text,search_field,search_type);
        }
}
var pagination = $('#pagination-bys');
pagination.twbsPagination(defaultOpts);

$("#dialog_bys_table").dialog('open');
$('.info_table').css({'cursor':'pointer'});
$('.info_table_2').css({'cursor':'pointer'});

document.getElementById("bys_table_div").scrollTop = 0;
var tablecont=document.querySelector('#bys_table_div');
tablecont.addEventListener('scroll',scrollHendle);

},
          error:function(){
          console.log('ajax xatolik!');

 }
      });

}


$(document).on('click','.filter_obj_by_inn',function(){

$('#pagination-'+$(this).attr('data-serv')+'_div').html(`<ul id="pagination-`+$(this).attr('data-serv')+`" class="pagination-sm"></ul>`);

if($(this).attr('data-serv')=='apz'){
load_apz_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}
if($(this).attr('data-serv')=='psd'){
load_psd_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}
if($(this).attr('data-serv')=='psd_ind'){
load_psd_ind_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}
if($(this).attr('data-serv')=='smr'){
load_smr_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}
if($(this).attr('data-serv')=='perm_rec'){
load_perm_rec_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}

if($(this).attr('data-serv')=='pexpl'){
load_pexpl_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}
if($(this).attr('data-serv')=='pexpl_ind'){
load_pexpl_ind_table(1,10,'date','-',$(this).attr('data-inn'),$(this).attr('data-field'),1,'','');
}
$('#search_text_'+$(this).attr('data-serv')+'').val($(this).attr('data-inn')); 
$('#search_field_'+$(this).attr('data-serv')+'').val($(this).attr('data-field')); 

});



function create_link(task_id,guid){
  if(guid==null || guid==''){
 return '';
  }
  else{
  return `<span class='span_down' data-href='https://my.gov.uz/oz/get-service-file/`+task_id+`/`+guid+`'>Yuklab olish</span>`;}
}
$(document).on('click','.span_down',function(e){

 var link=document.createElement('a');
 link.setAttribute('href' ,$(this).attr('data-href'));
 link.setAttribute('target','blank');
 link.setAttribute('download','file');
 link.click();

});


function create_con_link(id,type){
  if(id!=''){
    return "<p class='full_info_objects' data-type='"+type+"' data-id='"+id+"'>Ko'rish</p>";
  }
  else{
    return "";
  }
}

function create_apz_full_info(id){
var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/apz_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {
var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);

var text=``;

text+=`<h4><b>Arxitektura-rejalashtirish topshirig'i</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>



</table>`;
}

text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Ob'yektlar qurilishining loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_task_id,'psd')+`</td></tr>
<tr><td>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_ind_task_id,'psd_ind')+`</td></tr>
<tr><td>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</td><td>`+create_con_link(data.perm_rec_task_id,'perm_rec')+`</td></tr>
<tr><td>Qurilish-montaj ishlarini amalga oshirish</td><td>`+create_con_link(data.smr_task_id,'smr')+`</td></tr>
<tr><td>Turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilishi</td><td>`+create_con_link(data.pexpl_task_id,'pexpl')+`</td></tr>
<tr><td>Noturar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilish</td><td>`+create_con_link(data.pexpl_ind_task_id,'pexpl_ind')+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Arxitektura-rejalashtirish topshirig'i haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='400px'>Obyekt nomi</td><td>`+check_null(json.properties.name_building)+`</td></tr>
<tr><td>Joylashgan joyi</td><td>`+check_null(json.properties.location_building)+`</td></tr>
<tr><td>Ko'rinishi</td><td>`+pp_cons_funk(json.properties.purpose_construction_real,'')+`</td></tr>
<tr><td>Viloyat</td><td>`+check_null(json.properties.region)+`</td></tr>
<tr><td>Tuman, shahar</td><td>`+check_null(json.properties.district)+`</td></tr>
<tr><td>Срок получения услуги</td><td>`+check_null(json.properties.term_service)+`</td></tr>
<tr><td>Уведомление пользователю</td><td>`+check_null(json.properties.acception_consideration)+`</td></tr>
<tr><td>Причина отказа</td><td>`+check_null(json.properties.reject_reason)+`</td></tr>
<tr><td>Утвержденный договор</td><td>`+create_link(json.properties.task_id,json.properties.settlement_account)+`</td></tr>
<tr><td>Наименование обслуживающего банка</td><td>`+check_null(json.properties.name_bank)+`</td></tr>
<tr><td>Реквизиты</td><td>`+check_null(json.properties.requisites)+`</td></tr>
<tr><td>Решение органа государственной власти на местах о предоставлении земельного участка для проектирования и строительства объекта, с приложением плана размещения земельного участка или акта выноса его границ в натуру</td><td>`+create_link(json.properties.task_id,json.properties.decision_state_authority)+`</td></tr>
<tr><td>Решение хокима города (района) о переводе жилых помещений в категорию нежилых</td><td>`+create_link(json.properties.task_id,json.properties.decision_city_hokim)+`</td></tr>
<tr><td>Разрешение, соответственно, главного управления строительства г. Ташкента или отдела строительства района (города) на перепрофилирование и реконструкцию объекта.</td><td>`+create_link(json.properties.task_id,json.properties.permissions_department)+`</td></tr>
<tr><td>Утвержденный договор и стоимость оплаты сбора</td><td>`+create_link(json.properties.task_id,json.properties.contract_cost)+`</td></tr>
<tr><td>АПЗ</td><td>`+create_link(json.properties.task_id,json.properties.apz)+`</td></tr>
<tr><td>Технические условия (водоснабжения)</td><td>`+create_link(json.properties.task_id,json.properties.file_water)+`</td></tr>
<tr><td>Технические условия (электрической энергии)</td><td>`+create_link(json.properties.task_id,json.properties.file_light)+`</td></tr>
<tr><td>Технические условия (газ)</td><td>`+create_link(json.properties.task_id,json.properties.file_gas)+`</td></tr>
<tr><td>Региональный ЭСП</td><td>`+check_null(json.properties.authority_light)+`</td></tr>
<tr><td>Район</td><td>`+check_null(json.properties.district_file)+`</td></tr>
<tr><td>Регион</td><td>`+check_null(json.properties.region_light)+`</td></tr>
<tr><td>Нужной водяной напряжение</td><td>`+check_null(json.properties.desired_water)+`</td></tr>
<tr><td>Нужной газовый напряжение</td><td>`+check_null(json.properties.desired_gas)+`</td></tr>
<tr><td>Нужной газовый напряжение</td><td>`+check_null(json.properties.desired_electrical)+`</td></tr>
</table>`;

          $('#dialog_apz_full_info').html(text);
          $('#dialog_apz_full_info').dialog('open');
document.getElementById("dialog_apz_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });
}

function create_psd_full_info(id){
  var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/psd_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);
var loyihalovchi=JSON.parse(data.loyihalovchi);

var text=``;

text+=`<h4><b>Binolar, inshootlar va boshqa obyektlar qurilishining loyiha-smetasini ishlab chiqish</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>
</table>`;
}

text+=`<hr class='my_hr'><h4><b>Loyihalovchi tashkilot</b></h4><table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(loyihalovchi[0].fields.nomi)+`</td></tr>
<tr><td>Tashkilot manzili</td><td>`+check_null(loyihalovchi[0].fields.adress)+`</td></tr>
<tr><td>Tashkilot STIR</td><td>`+loyiha_tash(loyihalovchi[0].fields.inn)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(loyihalovchi[0].fields.contact)+`</td></tr>
</table>`;


text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Arxitektura-rejalashtirish topshirig'i</td><td>`+create_con_link(data.apz_task_id,'apz')+`</td></tr>
<tr><td>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_ind_task_id,'psd_ind')+`</td></tr>
<tr><td>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</td><td>`+create_con_link(data.perm_rec_task_id,'perm_rec')+`</td></tr>
<tr><td>Qurilish-montaj ishlarini amalga oshirish</td><td>`+create_con_link(data.smr_task_id,'smr')+`</td></tr>
<tr><td>Turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilishi</td><td>`+create_con_link(data.pexpl_task_id,'pexpl')+`</td></tr>
<tr><td>Noturar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilish</td><td>`+create_con_link(data.pexpl_ind_task_id,'pexpl_ind')+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Binolar, inshootlar va boshqa obyektlar qurilishining loyiha-smetasi  haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='350px'>Наименование проектно-сметной документации</td><td>`+check_null(json.properties.name_design_estimates)+`</td></tr>
<tr><td >Ситуационный план размещения объекта</td><td>`+check_null(json.properties.situation_plan_location_obj)+`</td></tr>
<tr><td>Документ (Согласования)</td><td>`+create_link(json.properties.task_id,json.properties.doc_architectura)+`</td></tr>
<tr><td>Проектно-сметная документация</td><td>`+create_link(json.properties.task_id,json.properties.file_main)+`</td></tr>

<tr><td>Viloyat</td><td>`+check_null(json.properties.region_id)+`</td></tr>
<tr><td>Tuman, shahar</td><td>`+check_null(json.properties.district_id)+`</td></tr>

<tr><td>Ситуационный план размещения объекта</td><td>`+check_null(json.properties.general_plan_buildings_struct_other_obj)+`</td></tr>
<tr><td>Фасады (главные и боковые)</td><td>`+check_null(json.properties.facades_main_side)+`</td></tr>
<tr><td>Реквизиты архитектурно-планировочного задания</td><td>`+check_null(json.properties.requisites_architectural_planning_assignment)+`</td></tr>
<tr><td>ЭЦП заявителя</td><td>`+check_null(json.properties.user_ds)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку</td><td>`+check_null(json.properties.user_ds_gov)+`</td></tr>
<tr><td>Ответственное лицо</td><td>`+check_null(json.properties.responsible_person_rejected)+`</td></tr>
<tr><td>Причина отказа</td><td>`+check_null(json.properties.reject_reason)+`</td></tr>
<tr><td>Уведомление пользователю</td><td>`+check_null(json.properties.acception_consideration)+`</td></tr>


</table>`;

          $('#dialog_psd_full_info').html(text);
          $('#dialog_psd_full_info').dialog('open');
document.getElementById("dialog_psd_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });
}


function create_psd_ind_full_info(id){


var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/psd_ind_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);

var text=``;

text+=`<h4><b>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>
</table>`;
}


text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Arxitektura-rejalashtirish topshirig'i</td><td>`+create_con_link(data.apz_task_id,'apz')+`</td></tr>
<tr><td >Ob'yektlar qurilishining loyiha-smeta hujjati</td><td >`+create_con_link(data.psd_task_id,'psd')+`</td></tr>
<tr><td>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</td><td>`+create_con_link(data.perm_rec_task_id,'perm_rec')+`</td></tr>
<tr><td>Qurilish-montaj ishlarini amalga oshirish</td><td>`+create_con_link(data.smr_task_id,'smr')+`</td></tr>
<tr><td>Turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilishi</td><td>`+create_con_link(data.pexpl_task_id,'pexpl')+`</td></tr>
<tr><td>Noturar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilish</td><td>`+create_con_link(data.pexpl_ind_task_id,'pexpl_ind')+`</td></tr>
</table>`;


text+=`<hr class='my_hr'><h4><b>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='350px'>Наименование объекта</td><td>`+check_null(json.properties.object_name)+`</td></tr>

<tr><td >`;

if(json.properties.which_geo!='0'){
text+=`<img src='/static/img/img/location-x.png' data-layer_name='psd' data-id='`+json.properties.task_id+`' class='loc_img fly_to_bounds_2'>`;
}

text+=`Месторасположение объекта (индекс, адрес, ориентир) </td><td>`+check_null(json.properties.object_adress)+`</td></tr>

<tr><td >Сметно-финансовый расчет (при получении кредита)</td><td>`+create_link(json.properties.task_id,json.properties.financial_calculation)+`</td></tr>
<tr><td >Документы, удостоверяющие право собственности на индивидуальный жилой дом</td><td>`+create_link(json.properties.task_id,json.properties.ownership_documents)+`</td></tr>
<tr><td >Техническое заключение (при необходимости)</td><td>`+create_link(json.properties.task_id,json.properties.technical_conclusion)+`</td></tr>
<tr><td >Номер и дата свидетельства о государственной регистрации прав  на земельные участки (при строительстве жилого дома)</td><td>`+check_null(json.properties.number_certificate_land)+`</td></tr>
<tr><td >Номер и дата регистрации кадастрового дела (при реконструкции)</td><td>`+check_null(json.properties.date_certificate_land)+`</td></tr>
<tr><td >Проектно-сметная документация</td><td>`+create_link(json.properties.task_id,json.properties.design_estimate)+`</td></tr>
<tr><td >проект плана земельного участка, с отображением надземных и подземных инженерных коммуникаций</td><td>`+create_link(json.properties.task_id,json.properties.plan_land_plot)+`</td></tr>
<tr><td >План фундаментов, подвалов, этажей, разрезов и фасадов индивидуального жилого дома</td><td>`+create_link(json.properties.task_id,json.properties.foundation_plan)+`</td></tr>
<tr><td >Cтроительство жилого дома</td><td>`+check_null(json.properties.construction_apartment)+`</td></tr>
<tr><td >Реконструкция жилья</td><td>`+check_null(json.properties.house_reconstruction)+`</td></tr>
<tr><td >Цель обращения</td><td>`+check_null(json.properties.treatment_purpose)+`</td></tr>
<tr><td >Срок получения услуги</td><td>`+check_null(json.properties.term_of_service)+`</td></tr>
<tr><td >Отдел (управление) по архитектуре и строительству</td><td>`+check_null(json.properties.department_architecture)+`</td></tr>
<tr><td >ЭЦП заявителя</td><td>`+check_null(json.properties.eds)+`</td></tr>
<tr><td >Уведомление заявителя</td><td>`+check_null(json.properties.user_notification)+`</td></tr>
<tr><td >Обоснование отказа</td><td>`+check_null(json.properties.reject_reason)+`</td></tr>
<tr><td >Согласованную проектно-сметную документацию ИЖС</td><td>`+create_link(json.properties.task_id,json.properties.upload_file_ijs)+`</td></tr>
<tr><td >ЭЦП уполномоченного лица</td><td>`+check_null(json.properties.eds_gosorgan)+`</td></tr>

</table>`;


            
          $('#dialog_psd_ind_full_info').html(text);
          $('#dialog_psd_ind_full_info').dialog('open');
document.getElementById("dialog_psd_ind_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });
}

function create_perm_rec_full_info(id){
  var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/perm_rec_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);

var text=``;

text+=`<h4><b>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>
</table>`;
}

text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Arxitektura-rejalashtirish topshirig'i</td><td>`+create_con_link(data.apz_task_id,'apz')+`</td></tr>
<tr><td >Ob'yektlar qurilishining loyiha-smeta hujjati</td><td >`+create_con_link(data.psd_task_id,'psd')+`</td></tr>
<tr><td>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_ind_task_id,'psd_ind')+`</td></tr>
<tr><td>Qurilish-montaj ishlarini amalga oshirish</td><td>`+create_con_link(data.smr_task_id,'smr')+`</td></tr>
<tr><td>Turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilishi</td><td>`+create_con_link(data.pexpl_task_id,'pexpl')+`</td></tr>
<tr><td>Noturar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilish</td><td>`+create_con_link(data.pexpl_ind_task_id,'pexpl_ind')+`</td></tr>
</table>`;



text+=`<hr class='my_hr'><h4><b>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='400px'>Наименование здания и сооружения</td><td>`+check_null(json.properties.name_building)+`</td></tr>
<tr><td>Месторасположение здания и сооружения (индекс, адрес, ориентир)</td><td>`+check_null(json.properties.building_location)+`</td></tr>
<tr><td>Краткое содержание осуществляемого перепрофилирования и реконструкции объекта</td><td>`+create_link(json.properties.task_id,json.properties.main_content_reprofiling)+`</td></tr>
<tr><td>Номер регистрации кадастрового дела</td><td>`+check_null(json.properties.number_cadastral_case)+`</td></tr>
<tr><td>Дата регистрации кадастрового дела</td><td>`+check_null(json.properties.date_cadastral_case)+`</td></tr>
<tr><td>Вид деятельности (для индивидуального предпринимателя)</td><td>`+check_null(json.properties.type_activity_in)+`</td></tr>
<tr><td>Расчетный счет</td><td>`+check_null(json.properties.settlement_account)+`</td></tr>
<tr><td>Наименование обслуживающего банка</td><td>`+check_null(json.properties.name_bank)+`</td></tr>
<tr><td>Вид деятельности</td><td>`+check_null(json.properties.type_activity)+`</td></tr>
<tr><td>ЭЦП</td><td>`+check_null(json.properties.eds)+`</td></tr>
<tr><td>Уведомление заявителя</td><td>`+check_null(json.properties.user_notification)+`</td></tr>
<tr><td>Причина отказа</td><td>`+check_null(json.properties.reason_refusual)+`</td></tr>
<tr><td>Регистрационный номер разрешения</td><td>`+check_null(json.properties.permission_reg_number)+`</td></tr>
<tr><td>Регистрационная дата разрешения</td><td>`+check_null(json.properties.permission_reg_date)+`</td></tr>
<tr><td>Дополнительные особые условия</td><td>`+check_null(json.properties.additional_special_conditions)+`</td></tr>
<tr><td>Площадь объекта</td><td>`+check_null(json.properties.object_area)+`</td></tr>
<tr><td>Region</td><td>`+check_null(json.properties.select_region)+`</td></tr>
<tr><td>ЭЦП Уполномоченного лица (Кадастр)</td><td>`+check_null(json.properties.eds_gos_cad)+`</td></tr>
<tr><td>ЭЦП Уполномоченного лица</td><td>`+check_null(json.properties.legal_eds)+`</td></tr>
<tr><td>Копия плана стен, разреза (при наличии), фасада и кадастрового паспорта зданий и сооружений</td><td>`+create_link(json.properties.task_id,json.properties.acceptance)+`</td></tr>
<tr><td>Файл отказа</td><td>`+create_link(json.properties.task_id,json.properties.reject_file)+`</td></tr>
<tr><td>Район</td><td>`+check_null(json.properties.district)+`</td></tr>
<tr><td>ФИО и инициалы уполномоченного лица</td><td>`+check_null(json.properties.responsible_person_arch)+`</td></tr>
<tr><td>ФИО и инициалы уполномоченного лица</td><td>`+check_null(json.properties.responsible_person_cadastr)+`</td></tr>
<tr><td>Прикрепите скан разрешения</td><td>`+create_link(json.properties.task_id,json.properties.scanfile)+`</td></tr>
<tr><td>payment</td><td>`+create_link(json.properties.task_id,json.properties.payment)+`</td></tr>
<tr><td>Срок получения услуги</td><td>`+check_null(json.properties.term_service)+`</td></tr>
<tr><td>Отдел (управление) по архитектуре и строительству</td><td>`+check_null(json.properties.department_architecture)+`</td></tr>
<tr><td>Authorized Position</td><td>`+check_null(json.properties.authorized_position)+`</td></tr>
<tr><td>Fio Authorized Person</td><td>`+check_null(json.properties.fio_authorized_person)+`</td></tr>
<tr><td>Permission Type</td><td>`+check_null(json.properties.permission_type)+`</td></tr>
<tr><td>Location Building Structure Gos</td><td>`+check_null(json.properties.location_building_structure_gos)+`</td></tr>
<tr><td>Legal Name Fio Ind Gos</td><td>`+check_null(json.properties.legal_name_fio_ind_gos)+`</td></tr>
<tr><td>Notice</td><td>`+check_null(json.properties.notice)+`</td></tr>

</table>`;

          $('#dialog_perm_rec_full_info').html(text);
          $('#dialog_perm_rec_full_info').dialog('open');
document.getElementById("dialog_perm_rec_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });

}

function create_smr_full_info(id){

  var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/smr_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);

var text=``;

text+=`<h4><b>Qurilish-montaj ishlarini amalga oshirish</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>
</table>`;
}

text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Arxitektura-rejalashtirish topshirig'i</td><td >`+create_con_link(data.apz_task_id,'apz')+`</td></tr>
<tr><td >Ob'yektlar qurilishining loyiha-smeta hujjati</td><td >`+create_con_link(data.psd_task_id,'psd')+`</td></tr>
<tr><td>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_ind_task_id,'psd_ind')+`</td></tr>
<tr><td>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</td><td>`+create_con_link(data.perm_rec_task_id,'perm_rec')+`</td></tr>
<tr><td>Turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilishi</td><td>`+create_con_link(data.pexpl_task_id,'pexpl')+`</td></tr>
<tr><td>Noturar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilish</td><td>`+create_con_link(data.pexpl_ind_task_id,'pexpl_ind')+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Qurilish-montaj ishlarini amalga oshirish haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='400px'>Наименование объекта</td><td>`+check_null(json.properties.name_building)+`</td></tr>
<tr><td>Месторасположение объекта (индекс, адрес, ориентир)</td><td>`+check_null(json.properties.location_building)+`</td></tr>
<tr><td>Вид строительно-монтажных работ</td><td>`+check_null(json.properties.construction_works)+`</td></tr>
<tr><td>Номер и дата протокола архитектурно-градостроительного совета</td><td>`+check_null(json.properties.number_date_protocol)+`</td></tr>
<tr><td>Прикрепите сформированную публичную оферту</td><td>`+create_link(json.properties.task_id,json.properties.formed_publicoff)+`</td></tr>
<tr><td>Причина отказа</td><td>`+check_null(json.properties.reject_reason)+`</td></tr>
<tr><td>ведомление о принятии заявления на рассмотрение</td><td>`+check_null(json.properties.notice)+`</td></tr>
<tr><td>Для объектов параллельного проектирования (№ и дата правительственного постановления, протокола, указа, решения)</td><td>`+check_null(json.properties.parallel_designobjc)+`</td></tr>
<tr><td>Номер и дата заключения (протокола) Главного Управления Строительства</td><td>`+check_null(json.properties.numdate_protocol)+`</td></tr>
<tr><td>Стоимость строительно-монтажных работ: согласно Сводному экспертному заключению (без НДС, оборудования и прочих затрат заказчика)</td><td>`+check_null(json.properties.cost)+`</td></tr>
<tr><td>Количество квартир</td><td>`+check_null(json.properties.amount_apartments)+`</td></tr>
<tr><td>Количество домов (блоки)</td><td>`+check_null(json.properties.amount_houses)+`</td></tr>
<tr><td>Общая жилая площадь квартир (кв.м)</td><td>`+check_null(json.properties.total_livingarea)+`</td></tr>
<tr><td>Общая площадь (кв.м)</td><td>`+check_null(json.properties.total_area)+`</td></tr>
<tr><td>Description</td><td>`+check_null(json.properties.description)+`</td></tr>
<tr><td>Наличие чердака или мансарды</td><td>`+check_null(json.properties.attic_mansard)+`</td></tr>
<tr><td>Наличие подвала или технического подполья</td><td>`+check_null(json.properties.basement_techunderground)+`</td></tr>
<tr><td>Объем строительства здания (куб.м)</td><td>`+check_null(json.properties.construction_volume)+`</td></tr>
<tr><td>Этажность</td><td>`+check_null(json.properties.floors)+`</td></tr>
<tr><td>Информация о надзорных органах и ответственных лиц </td><td>`+check_null(json.properties.info_supervisory)+`</td></tr>
<tr><td>ЭЦП (заявителя)</td><td>`+check_null(json.properties.eds)+`</td></tr>
<tr><td>Район (город)</td><td>`+check_null(json.properties.district_id)+`</td></tr>
<tr><td>Регион</td><td>`+check_null(json.properties.region_id)+`</td></tr>
<tr><td>Номер и дата положительного заключения органов экспертизы о промышленной безопасности проектной документации – для опасных производственных объектов</td><td>`+check_null(json.properties.nmdate_posconc)+`</td></tr>
<tr><td>Номер и дата лицензии подрядной организации – при осуществлении отдельных лицензируемых видов строительно-монтажных работ</td><td>`+check_null(json.properties.nmdate_licontr)+`</td></tr>
<tr><td>Номер и дата положительного заключения</td><td>`+check_null(json.properties.nmdate_posopin)+`</td></tr>
<tr><td>Наименование органа экспертизы</td><td>`+check_null(json.properties.name_expertise)+`</td></tr>
<tr><td>Расчетный счет</td><td>`+check_null(json.properties.settlement_account)+`</td></tr>
<tr><td>Категория сложности объекта</td><td>`+check_null(json.properties.category_object)+`</td></tr>
<tr><td>Организационно-правовая форма</td><td>`+check_null(json.properties.legal_opf)+`</td></tr>
<tr><td>Для объектов государственной программы (№ и дата правительственного постановления, протокола, указа, решения)</td><td>`+check_null(json.properties.objects_stateprog)+`</td></tr>
<tr><td>Descript</td><td>`+check_null(json.properties.deskript)+`</td></tr>
<tr><td>Реквизиты Инспекции</td><td>`+check_null(json.properties.requisites)+`</td></tr>
<tr><td>Сумма за осуществление надзорных функций за качеством и полнотой выполнения строительно-монтажных работ</td><td>`+check_null(json.properties.amount)+`</td></tr>
<tr><td>Комментария</td><td>`+check_null(json.properties.comments)+`</td></tr>

</table>`;


          $('#dialog_smr_full_info').html(text);
          $('#dialog_smr_full_info').dialog('open');
document.getElementById("dialog_smr_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });

}

function create_pexpl_full_info(id){
  var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/pexpl_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {



var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);
var loyihalovchi=JSON.parse(data.loyihalovchi);
var pudratchi=JSON.parse(data.pudratchi);

var text=``;

text+=`<h4><b>Turar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilish</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`;
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>
</table>`;
}

text+=`<hr class='my_hr'><h4><b>Loyihalovchi tashkilot</b></h4><table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(loyihalovchi[0].fields.nomi)+`</td></tr>
<tr><td>Tashkilot manzili</td><td>`+check_null(loyihalovchi[0].fields.adress)+`</td></tr>
<tr><td>Tashkilot STIR</td><td>`+loyiha_tash(loyihalovchi[0].fields.inn)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(loyihalovchi[0].fields.contact)+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Pudratchi tashkilot</b></h4><table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(pudratchi[0].fields.nomi)+`</td></tr>
<tr><td>Tashkilot manzili</td><td>`+check_null(pudratchi[0].fields.adress)+`</td></tr>
<tr><td>Tashkilot STIR</td><td>`+pudratchi_tash(pudratchi[0].fields.inn)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(pudratchi[0].fields.contact)+`</td></tr>
</table>`;


text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Arxitektura-rejalashtirish topshirig'i</td><td >`+create_con_link(data.apz_task_id,'apz')+`</td></tr>
<tr><td >Ob'yektlar qurilishining loyiha-smeta hujjati</td><td >`+create_con_link(data.psd_task_id,'psd')+`</td></tr>
<tr><td>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_ind_task_id,'psd_ind')+`</td></tr>
<tr><td>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</td><td>`+create_con_link(data.perm_rec_task_id,'perm_rec')+`</td></tr>
<tr><td>Qurilish-montaj ishlarini amalga oshirish</td><td>`+create_con_link(data.smr_task_id,'smr')+`</td></tr>
<tr><td>Noturar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilish</td><td>`+create_con_link(data.pexpl_ind_task_id,'pexpl_ind')+`</td></tr>
</table>`;


text+=`<hr class='my_hr'><h4><b>Turar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilishi haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='400px'>Наименование здания и сооружения</td><td>`+check_null(json.properties.buildings_name)+`</td></tr>
<tr><td>Месторасположение здания и сооружения (индекс, адрес, ориентир)</td><td>`+check_null(json.properties.buildings_location)+`</td></tr>
<tr><td>Район (город)</td><td>`+check_null(json.properties.district_id)+`</td></tr>
<tr><td>Регион</td><td>`+check_null(json.properties.region_id)+`</td></tr>
<tr><td>Тип здания или сооружения</td><td>`+check_null(json.properties.type_building_structure)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку</td><td>`+check_null(json.properties.user_ds_gov)+`</td></tr>
<tr><td>Ответственное лицо</td><td>`+check_null(json.properties.responsible_person_rejected)+`</td></tr>
<tr><td>Ответственное лицо</td><td>`+check_null(json.properties.responsible_person)+`</td></tr>
<tr><td>Согласование</td><td>`+check_null(json.properties.contract_file)+`</td></tr>
<tr><td>Причина отказа</td><td>`+check_null(json.properties.reject_reason)+`</td></tr>
<tr><td>Уведомление пользователю</td><td>`+check_null(json.properties.acception_consideration)+`</td></tr>
<tr><td>Номер и дата решения хокима района (города) об отводе земельного участка (при первоначальном строительстве)</td><td>`+check_null(json.properties.number_date_resignation_district_hokim)+`</td></tr>

<tr><td>ЭЦП заявителя</td><td>`+check_null(json.properties.user_ds)+`</td></tr>
<tr><td>Организационно-правовая форма</td><td>`+check_null(json.properties.kopf)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (архитектура)</td><td>`+check_null(json.properties.user_ds_gov_architectura)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (гасн)</td><td>`+check_null(json.properties.user_ds_gov_gasn)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (санитария)</td><td>`+check_null(json.properties.user_ds_gov_sanitation)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (пожарные)</td><td>`+check_null(json.properties.user_ds_gov_firefighters)+`</td></tr>
<tr><td>Заключение отдела строительства</td><td>`+create_link(json.properties.task_id,json.properties.doc_architectura)+`</td></tr>
<tr><td>Документ (гасн)</td><td>`+create_link(json.properties.task_id,json.properties.doc_gasn)+`</td></tr>
<tr><td>Документ (санитария)</td><td>`+create_link(json.properties.task_id,json.properties.doc_sanitation)+`</td></tr>
<tr><td>Документ (пожарные)</td><td>`+create_link(json.properties.task_id,json.properties.doc_firefighters)+`</td></tr>
<tr><td>Приложение к акту (Подробная информация о технической характеристике объекта а также, генеральный план земельного участка)      </td><td>`+create_link(json.properties.task_id,json.properties.act_doc)+`</td></tr>
<tr><td>Название владельца (пользователя) недвижимимости</td><td>`+check_null(json.properties.name_owner_real_estate)+`</td></tr>
<tr><td>ИНН владельца (пользователя) недвижимимости</td><td>`+check_null(json.properties.inn_owner_real_estate)+`</td></tr>
<tr><td>Месторасположение недвижимости</td><td>`+check_null(json.properties.property_location)+`</td></tr>
<tr><td>Кадастровый номер</td><td>`+check_null(json.properties.cadastral_number)+`</td></tr>


<tr><td>Площадь земельного участка по правовому документу</td><td>`+check_null(json.properties.plot_area_according_legal_document)+`</td></tr>
<tr><td>Правовые документы недвижимости</td><td>`+check_null(json.properties.legal_documents_real_estate)+`</td></tr>
<tr><td>Основательная документация в строительстве</td><td>`+check_null(json.properties.basic_documentation_construction)+`</td></tr>
<tr><td>Название здания(сооружения) по проектной документации</td><td>`+check_null(json.properties.name_building_according_project_documentation)+`</td></tr>
<tr><td>Количество основных зданий</td><td>`+check_null(json.properties.number_main_buildingsaa)+`</td></tr>
<tr><td>Количество дополнительных зданий (сооружений)</td><td>`+check_null(json.properties.number_additional_buildingsas)+`</td></tr>
<tr><td>Общая площадь</td><td>`+check_null(json.properties.total_areaad)+`</td></tr>
<tr><td>Жилая площадь</td><td>`+check_null(json.properties.living_areaaf)+`</td></tr>
<tr><td>Количество жилых комнат</td><td>`+check_null(json.properties.number_living_roomsag)+`</td></tr>
<tr><td>Характеристика здания.</td><td>`+check_null(json.properties.info_about_floors_reconstructed_buildingsh)+`</td></tr>
<tr><td>Количество основных зданий.</td><td>`+check_null(json.properties.number_main_buildingssa)+`</td></tr>
<tr><td>Количество дополнительных зданий (сооружений).</td><td>`+check_null(json.properties.number_additional_buildingsss)+`</td></tr>
<tr><td>Общая площадь.</td><td>`+check_null(json.properties.total_areasd)+`</td></tr>
<tr><td>Жилая площадь.</td><td>`+check_null(json.properties.living_areasf)+`</td></tr>
<tr><td>Количество жилых комнат.</td><td>`+check_null(json.properties.number_living_roomssg)+`</td></tr>
<tr><td>В жилом помещении подключены следующие инженерно-коммуникационные сети. </td><td>`+check_null(json.properties.following_engineering_networks_connected_livingsj)+`</td></tr>
<tr><td>Дата начала стройки.</td><td>`+check_null(json.properties.date_beginning_constructionsk)+`</td></tr>
<tr><td>Дата окончания стройки</td><td>`+check_null(json.properties.date_completion_constructionsl)+`</td></tr>
<tr><td>Окончание строительных работ здания (сооружения) в процентах.</td><td>`+check_null(json.properties.end_construction_work_building_percentsz)+`</td></tr>
<tr><td>Правовые документы земельного участка</td><td>`+check_null(json.properties.legal_documents_land_plot)+`</td></tr>
<tr><td>Правовые документы здания (сооружения)</td><td>`+check_null(json.properties.legal_documents_building)+`</td></tr>
<tr><td>Количество сооружений</td><td>`+check_null(json.properties.number_constructionsad)+`</td></tr>
<tr><td>Кадастровая сумма</td><td>`+check_null(json.properties.cadastral_amountaf)+`</td></tr>
<tr><td>Полезная площадь</td><td>`+check_null(json.properties.effective_areaah)+`</td></tr>
<tr><td>Объем здания (сооружения)  </td><td>`+check_null(json.properties.volume_buildingaj)+`</td></tr>
<tr><td>Сведения об этажах и реконструируемой части</td><td>`+check_null(json.properties.info_about_floors_reconstructedak)+`</td></tr>
<tr><td>Количество зданий</td><td>`+check_null(json.properties.number_buildingsa)+`</td></tr>
<tr><td>Количество части зданий.</td><td>`+check_null(json.properties.number_parts_buildingsss)+`</td></tr>
<tr><td>Количество сооружений.</td><td>`+check_null(json.properties.number_structuressd)+`</td></tr>
<tr><td>Полезная площадь.</td><td>`+check_null(json.properties.usable_areasg)+`</td></tr>
<tr><td>Объем здания (сооружения).</td><td>`+check_null(json.properties.volume_buildingsh)+`</td></tr>
<tr><td>В здании (сооружении) подключены следующие инженерно-коммуникационные сети.</td><td>`+check_null(json.properties.following_engineering_networks_connected_buildingsk)+`</td></tr>
<tr><td>Характеристика здания</td><td>`+check_null(json.properties.info_about_floors_reconstructed_buildingaj)+`</td></tr>
<tr><td>Количество части зданий</td><td>`+check_null(json.properties.number_parts_buildingsaa)+`</td></tr>
<tr><td>Количество зданий</td><td>`+check_null(json.properties.number_buildingsaab)+`</td></tr>
<tr><td>Регистрационный номер акта</td><td>`+check_null(json.properties.registration_number_act)+`</td></tr>
<tr><td>Регистрационная дата акта</td><td>`+check_null(json.properties.registration_act_date)+`</td></tr>
<tr><td>Ф.И.О руководителя отдела по строительству</td><td>`+check_null(json.properties.head_construction_department)+`</td></tr>
<tr><td>Название отдела по строительству</td><td>`+check_null(json.properties.name_department_construction)+`</td></tr>
<tr><td>Ф.И.О руководителя филиала по кадастру </td><td>`+check_null(json.properties.name_head_cadastre_branch)+`</td></tr>
<tr><td>Город район филиала по кадастру</td><td>`+check_null(json.properties.name_branch_cadastre)+`</td></tr>
<tr><td>Заключение к акту </td><td>`+check_null(json.properties.conclusion_act)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам?</td><td>`+check_null(json.properties.meet_requirements_standards)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам?</td><td>`+check_null(json.properties.meet_requirements_standards_real)+`</td></tr>
<tr><td>Укажите территорию (города  или района) центра санитарии</td><td>`+check_null(json.properties.authorized_person_sanitary)+`</td></tr>
<tr><td>Ф.И.О. врача районного (городского) санитарно-эпидемиологического надзора</td><td>`+check_null(json.properties.doctor_sanitary_epidemiological)+`</td></tr>
<tr><td>Укажите территорию (Республика Каракалпакстан, область или г. Ташкент) инспекции ГАСН </td><td>`+check_null(json.properties.post_authorized_person_gasn)+`</td></tr>
<tr><td>Ф.И.О. руководителя территориальной инспекции Государственного архитектурно-строительного надзора</td><td>`+check_null(json.properties.head_inspections_architectural_supervision)+`</td></tr>
<tr><td>Город район отдела по пожарному безопасности</td><td>`+check_null(json.properties.authorized_person_fireman)+`</td></tr>
<tr><td>Ф.И.О. начальника отдела по пожарному безопасности</td><td>`+check_null(json.properties.head_fire_safety_department)+`</td></tr>
<tr><td>Город район отдела строительства</td><td>`+check_null(json.properties.authorized_person_architecture)+`</td></tr>
<tr><td>Ф.И.О. начальника районного (городского) отдела строительства</td><td>`+check_null(json.properties.head_district_construction_department)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам? </td><td>`+check_null(json.properties.meet_requirements_standardsss)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам? </td><td>`+check_null(json.properties.meet_requirements_standardsbb)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам? </td><td>`+check_null(json.properties.meet_requirements_standardsaa)+`</td></tr>
<tr><td>Полное право собственности на земельный участок , сдачи в эксплуатацию завершенных зданий и сооружений после строительства (реконструкции), (или других имущественных прав), структура зданий и сооружений должна включать следующее</td><td>`+check_null(json.properties.after_acceptance_building_objects_which_construction_reconstruc)+`</td></tr>
<tr><td>Сведения о зданиях или объектах, принимаемые в эксплуатацию</td><td>`+check_null(json.properties.info_buildings_facilities_accepted_operation)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку</td><td>`+check_null(json.properties.user_ds_gov_reject)+`</td></tr>
<tr><td>Ф.И.О руководителя филиала по кадастру</td><td>`+check_null(json.properties.name_head_cadastre_branch_reject)+`</td></tr>
<tr><td>Город район филиала по кадастру</td><td>`+check_null(json.properties.name_branch_cadastre_reject)+`</td></tr>
<tr><td>Заключение к акту</td><td>`+check_null(json.properties.conclusion_act_reject)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause_ss)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause_bb)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause_aa)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause)+`</td></tr>
<tr><td>Выписка из госреестра о  регистрации права на объект недвижимости</td><td>`+check_null(json.properties.extract_register_real_estate)+`</td></tr>
<tr><td>Объем здания (сооружения)</td><td>`+check_null(json.properties.volume_building_structure)+`</td></tr>
<tr><td>Death Certificate</td><td>`+check_null(json.properties.death_certificate)+`</td></tr>
<tr><td>Death Owner Check</td><td>`+check_null(json.properties.death_owner_check)+`</td></tr>

</table>`;


          $('#dialog_pexpl_full_info').html(text);
          $('#dialog_pexpl_full_info').dialog('open');
document.getElementById("dialog_pexpl_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });

}


function create_pexpl_ind_full_info(id){
  var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append("type",'full_info');
data.append("id",id);
$.ajax({
        url: '/pexpl_ind_data',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (data) {

var json=JSON.parse(data.data).features[0];
var buyurtmachi=JSON.parse(data.buyurtmachi);
var loyihalovchi=JSON.parse(data.loyihalovchi);
var pudratchi=JSON.parse(data.pudratchi);

var text=``;

text+=`<h4><b>Noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilish</b></h4><hr class='my_hr'><table class='my_table table-striped'>
<tr><td width='180px'>Ariza nomeri</td><td>`+check_null(json.properties.task_id)+`</td></tr>
<tr><td>Bergan tashkilot</td><td>`+check_null(data.authority_title)+`</td></tr>
<tr><td>Berilgan sana</td><td>`+check_null(json.properties.date)+`</td></tr>
<tr><td>Operator</td><td>`+check_null(json.properties.operator_org)+`</td></tr>
<tr><td>Holati</td><td>`+check_null("Tugallangan")+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Buyurtmachi haqida ma'lumot (`+(json.properties.user_type_real=='I'?"Jismoniy shaxs":"Yuridik shaxs")+`)</b></h4>`
if(json.properties.user_type_real=='J'){
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_name)+`</td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_address)+`</td></tr>

<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.legal_entity_tin)+`<img data-t='J' data-inn='`+buyurtmachi[0].fields.legal_entity_tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>

<tr><td>Tashkilot tel nomeri </td><td>`+check_null(buyurtmachi[0].fields.legal_entity_phone_number)+`</td></tr>
</table>`;
}
else{
text+=`<table class='my_table table-striped'>
<tr><td width='250px'>F.I.O</td><td>`+check_null(buyurtmachi[0].fields.full_name)+`</td></tr>
<tr><td>Pasport seriyasi</td><td>`+check_null(buyurtmachi[0].fields.passport_number)+`</td></tr>
<tr><td>STIR</td><td>`+check_null(buyurtmachi[0].fields.tin)+`<img data-t='I' data-inn='`+buyurtmachi[0].fields.tin+`' class='info_yur_jis_shaxs info_png_objects_inn' src='/static/img/info.png'></td></tr>
<tr><td>Manzil</td><td>`+check_null(buyurtmachi[0].fields.permit_address)+`</td></tr>
<tr><td>Telefon</td><td>`+check_null(buyurtmachi[0].fields.phone)+`</td></tr>
</table>`;
}

text+=`<hr class='my_hr'><h4><b>Loyihalovchi tashkilot</b></h4><table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(loyihalovchi[0].fields.nomi)+`</td></tr>
<tr><td>Tashkilot manzili</td><td>`+check_null(loyihalovchi[0].fields.adress)+`</td></tr>
<tr><td>Tashkilot STIR</td><td>`+loyiha_tash(loyihalovchi[0].fields.inn)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(loyihalovchi[0].fields.contact)+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Pudratchi tashkilot</b></h4><table class='my_table table-striped'>
<tr><td width='250px'>Tashkilot nomi</td><td>`+check_null(pudratchi[0].fields.nomi)+`</td></tr>
<tr><td>Tashkilot manzili</td><td>`+check_null(pudratchi[0].fields.adress)+`</td></tr>
<tr><td>Tashkilot STIR</td><td>`+pudratchi_tash(pudratchi[0].fields.inn)+`</td></tr>
<tr><td>Bog'lanish</td><td>`+check_null(pudratchi[0].fields.contact)+`</td></tr>
</table>`;


text+=`<hr class='my_hr'><h4><b>Ushbu arxitektura-rejalashtirish topshiriqig'a bog'liq xizmatlar</b></h4><table class='my_table table-striped'>
<tr><td width='0%'>Arxitektura-rejalashtirish topshirig'i</td><td >`+create_con_link(data.apz_task_id,'apz')+`</td></tr>
<tr><td >Ob'yektlar qurilishining loyiha-smeta hujjati</td><td >`+create_con_link(data.psd_task_id,'psd')+`</td></tr>
<tr><td>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjati</td><td>`+create_con_link(data.psd_ind_task_id,'psd_ind')+`</td></tr>
<tr><td>Ob'yektni qayta ixtisoslashtirish va rekonstruktsiya qilish</td><td>`+create_con_link(data.perm_rec_task_id,'perm_rec')+`</td></tr>
<tr><td>Qurilish-montaj ishlarini amalga oshirish</td><td>`+create_con_link(data.smr_task_id,'smr')+`</td></tr>
<tr><td>Turar joy ob'yekti hisoblangan bino va inshootni foydalanishga qabul qilishi</td><td>`+create_con_link(data.pexpl_task_id,'pexpl')+`</td></tr>
</table>`;

text+=`<hr class='my_hr'><h4><b>Noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilish haqida to'liq ma'lumot</b></h4><table class='my_table table-striped'>
<tr><td width='400px'>Наименование здания и сооружения</td><td>`+check_null(json.properties.buildings_name)+`</td></tr>
<tr><td>Месторасположение здания и сооружения (индекс, адрес, ориентир)</td><td>`+check_null(json.properties.buildings_location)+`</td></tr>
<tr><td>Район (город)</td><td>`+check_null(json.properties.district_id)+`</td></tr>
<tr><td>Регион</td><td>`+check_null(json.properties.region_id)+`</td></tr>
<tr><td>Тип здания или сооружения</td><td>`+check_null(json.properties.type_building_structure)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку</td><td>`+check_null(json.properties.user_ds_gov)+`</td></tr>
<tr><td>Ответственное лицо  </td><td>`+check_null(json.properties.responsible_person_rejected)+`</td></tr>
<tr><td>Ответственное лицо</td><td>`+check_null(json.properties.responsible_person)+`</td></tr>
<tr><td>Согласование</td><td>`+create_link(json.properties.task_id,json.properties.contract_file)+`</td></tr>
<tr><td>Причина отказа</td><td>`+check_null(json.properties.reject_reason)+`</td></tr>
<tr><td>Уведомление пользователю</td><td>`+check_null(json.properties.acception_consideration)+`</td></tr>
<tr><td>test</td><td>`+check_null(json.properties.number_date_resignation_district_hokim)+`</td></tr>
<tr><td>Номер и дата решения хокима района (города) об отводе земельного участка (при первоначальном строительстве)</td><td>`+check_null(json.properties.test)+`</td></tr>
<tr><td>ЭЦП заявителя</td><td>`+check_null(json.properties.user_ds)+`</td></tr>
<tr><td>Организационно-правовая форма</td><td>`+check_null(json.properties.kopf)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (архитектура)</td><td>`+check_null(json.properties.user_ds_gov_architectura)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (гасн)</td><td>`+check_null(json.properties.user_ds_gov_gasn)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (санитария)</td><td>`+check_null(json.properties.user_ds_gov_sanitation)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку (пожарные)</td><td>`+check_null(json.properties.user_ds_gov_firefighters)+`</td></tr>
<tr><td>Заключение отдела строительства</td><td>`+check_null(json.properties.doc_architectura)+`</td></tr>
<tr><td>Документ (гасн)  </td><td>`+create_link(json.properties.task_id,json.properties.doc_gasn)+`</td></tr>
<tr><td>Документ (санитария)</td><td>`+create_link(json.properties.task_id,json.properties.doc_sanitation)+`</td></tr>
<tr><td>Приложение к акту (Подробная информация о технической характеристике объекта а также, генеральный план земельного участка)</td><td>`+create_link(json.properties.task_id,json.properties.act_doc)+`</td></tr>
<tr><td>Документ (пожарные)</td><td>`+create_link(json.properties.task_id,json.properties.doc_firefighters)+`</td></tr>
<tr><td>Название владельца (пользователя) недвижимимости</td><td>`+check_null(json.properties.name_owner_real_estate)+`</td></tr>
<tr><td>ИНН владельца (пользователя) недвижимимости</td><td>`+check_null(json.properties.inn_owner_real_estate)+`</td></tr>
<tr><td>Месторасположение недвижимости</td><td>`+check_null(json.properties.property_location)+`</td></tr>
<tr><td>Кадастровый номер</td><td>`+check_null(json.properties.cadastral_number)+`</td></tr>
<tr><td>Площадь земельного участка по правовому документу</td><td>`+check_null(json.properties.plot_area_according_legal_document)+`</td></tr>
<tr><td>Правовые документы недвижимости</td><td>`+create_link(json.properties.task_id,json.properties.legal_documents_real_estate)+`</td></tr>
<tr><td>Основательная документация в строительстве</td><td>`+check_null(json.properties.basic_documentation_construction)+`</td></tr>
<tr><td>Название здания(сооружения) по проектной документации</td><td>`+check_null(json.properties.name_building_according_project_documentation)+`</td></tr>
<tr><td>Количество основных зданий</td><td>`+check_null(json.properties.number_main_buildingsaa)+`</td></tr>
<tr><td>Количество дополнительных зданий (сооружений)</td><td>`+check_null(json.properties.number_additional_buildingsas)+`</td></tr>
<tr><td>Общая площадь</td><td>`+check_null(json.properties.total_areaad)+`</td></tr>
<tr><td>Жилая площадь</td><td>`+check_null(json.properties.living_areaaf)+`</td></tr>
<tr><td>Количество жилых комнат</td><td>`+check_null(json.properties.number_living_roomsag)+`</td></tr>
<tr><td>Характеристика здания.</td><td>`+check_null(json.properties.info_about_floors_reconstructed_buildingsh)+`</td></tr>
<tr><td>Количество основных зданий.</td><td>`+check_null(json.properties.number_main_buildingssa)+`</td></tr>
<tr><td>Количество дополнительных зданий (сооружений).</td><td>`+check_null(json.properties.number_additional_buildingsss)+`</td></tr>
<tr><td>Общая площадь.</td><td>`+check_null(json.properties.total_areasd)+`</td></tr>
<tr><td>Жилая площадь.</td><td>`+check_null(json.properties.living_areasf)+`</td></tr>
<tr><td>Количество жилых комнат.</td><td>`+check_null(json.properties.number_living_roomssg)+`</td></tr>
<tr><td>В жилом помещении подключены следующие инженерно-коммуникационные сети.</td><td>`+check_null(json.properties.following_engineering_networks_connected_livingsj)+`</td></tr>
<tr><td>Дата начала стройки.</td><td>`+check_null(json.properties.date_beginning_constructionsk)+`</td></tr>
<tr><td>Дата окончания стройки.</td><td>`+check_null(json.properties.date_completion_constructionsl)+`</td></tr>
<tr><td>Окончание строительных работ здания (сооружения) в процентах.</td><td>`+check_null(json.properties.end_construction_work_building_percentsz)+`</td></tr>
<tr><td>Окончание строительных работ здания (сооружения) в процентах.</td><td>`+check_null(json.properties.end_construction_work_building_percentsz_real)+`</td></tr>
<tr><td>Правовые документы земельного участка</td><td>`+create_link(json.properties.task_id,json.properties.legal_documents_land_plot)+`</td></tr>
<tr><td>Правовые документы здания (сооружения)</td><td>`+create_link(json.properties.task_id,json.properties.legal_documents_building)+`</td></tr>
<tr><td>Количество сооружений</td><td>`+check_null(json.properties.number_constructionsad)+`</td></tr>
<tr><td>Кадастровая сумма</td><td>`+check_null(json.properties.cadastral_amountaf)+`</td></tr>
<tr><td>Полезная площадь</td><td>`+check_null(json.properties.effective_areaah)+`</td></tr>
<tr><td>Объем здания (сооружения)</td><td>`+check_null(json.properties.volume_buildingaj)+`</td></tr>
<tr><td>Сведения об этажах и реконструируемой части</td><td>`+check_null(json.properties.info_about_floors_reconstructedak)+`</td></tr>
<tr><td>Количество зданий</td><td>`+check_null(json.properties.number_buildingsa)+`</td></tr>
<tr><td>Количество части зданий.</td><td>`+check_null(json.properties.number_parts_buildingsss)+`</td></tr>
<tr><td>Количество сооружений.</td><td>`+check_null(json.properties.number_structuressd)+`</td></tr>
<tr><td>Полезная площадь.</td><td>`+check_null(json.properties.usable_areasg)+`</td></tr>
<tr><td>Объем здания (сооружения).</td><td>`+check_null(json.properties.volume_buildingsh)+`</td></tr>
<tr><td>В здании (сооружении) подключены следующие инженерно-коммуникационные сети.</td><td>`+check_null(json.properties.following_engineering_networks_connected_buildingsk)+`</td></tr>
<tr><td>Характеристика здания</td><td>`+check_null(json.properties.info_about_floors_reconstructed_buildingaj)+`</td></tr>
<tr><td>Количество части зданий</td><td>`+check_null(json.properties.number_parts_buildingsaa)+`</td></tr>
<tr><td>Количество зданий</td><td>`+check_null(json.properties.number_buildingsaab)+`</td></tr>
<tr><td>Регистрационный номер акта</td><td>`+check_null(json.properties.registration_number_act)+`</td></tr>
<tr><td>Регистрационная дата акта</td><td>`+check_null(json.properties.registration_act_date)+`</td></tr>
<tr><td>Ф.И.О руководителя отдела по строительству</td><td>`+check_null(json.properties.head_construction_department)+`</td></tr>
<tr><td>Название отдела по строительству</td><td>`+check_null(json.properties.name_department_construction)+`</td></tr>
<tr><td>Ф.И.О руководителя филиала по кадастру</td><td>`+check_null(json.properties.name_head_cadastre_branch)+`</td></tr>
<tr><td>Город район филиала по кадастру</td><td>`+check_null(json.properties.name_branch_cadastre)+`</td></tr>
<tr><td>Заключение к акту</td><td>`+check_null(json.properties.conclusion_act)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам?</td><td>`+check_null(json.properties.meet_requirements_standards)+`</td></tr>
<tr><td>Укажите территорию (города  или района) центра санитарии</td><td>`+check_null(json.properties.authorized_person_sanitary)+`</td></tr>
<tr><td>Ф.И.О. врача районного (городского) санитарно-эпидемиологического надзора</td><td>`+check_null(json.properties.doctor_sanitary_epidemiological)+`</td></tr>
<tr><td>Укажите территорию (Республика Каракалпакстан, область или г. Ташкент) инспекции ГАСН</td><td>`+check_null(json.properties.post_authorized_person_gasn)+`</td></tr>
<tr><td>Ф.И.О. руководителя территориальной инспекции Государственного архитектурно-строительного надзора</td><td>`+check_null(json.properties.head_inspections_architectural_supervision)+`</td></tr>
<tr><td>Город/район отдела по пожарному безопасности </td><td>`+check_null(json.properties.authorized_person_fireman)+`</td></tr>
<tr><td>Ф.И.О. начальника отдела по пожарному безопасности</td><td>`+check_null(json.properties.head_fire_safety_department)+`</td></tr>
<tr><td>Город район отдела строительства</td><td>`+check_null(json.properties.authorized_person_architecture)+`</td></tr>
<tr><td>Ф.И.О. начальника районного (городского) отдела строительства</td><td>`+check_null(json.properties.head_district_construction_department)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам?</td><td>`+check_null(json.properties.meet_requirements_standardsss)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам? </td><td>`+check_null(json.properties.meet_requirements_standardsbb)+`</td></tr>
<tr><td>Соответствует ли требованиям и нормам?</td><td>`+check_null(json.properties.meet_requirements_standardsaa)+`</td></tr>
<tr><td>test</td><td>`+check_null(json.properties.after_acceptance_building_objects_which_construction_reconstruc)+`</td></tr>
<tr><td>Полное право собственности на земельный участок , сдачи в эксплуатацию завершенных зданий и сооружений после строительства (реконструкции), (или других имущественных прав), структура зданий и сооружений должна включать следующее</td><td>`+check_null(json.properties.test)+`</td></tr>
<tr><td>Сведения о зданиях или объектах, принимаемые в эксплуатацию</td><td>`+check_null(json.properties.info_buildings_facilities_accepted_operation)+`</td></tr>
<tr><td>ЭЦП ответственного на заявку</td><td>`+check_null(json.properties.user_ds_gov_reject)+`</td></tr>
<tr><td>Ф.И.О руководителя филиала по кадастру</td><td>`+check_null(json.properties.name_head_cadastre_branch_reject)+`</td></tr>
<tr><td>Город район филиала по кадастру</td><td>`+check_null(json.properties.name_branch_cadastre_reject)+`</td></tr>
<tr><td>Заключение к акту</td><td>`+check_null(json.properties.conclusion_act_reject)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause_ss)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause_bb)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause_aa)+`</td></tr>
<tr><td>Причина</td><td>`+check_null(json.properties.cause)+`</td></tr>
<tr><td>Выписка из госреестра о  регистрации права на объект недвижимости</td><td>`+check_null(json.properties.extract_register_real_estate)+`</td></tr>
<tr><td>Объем здания (сооружения)</td><td>`+check_null(json.properties.volume_building_structure)+`</td></tr>
<tr><td>Death Certificate</td><td>`+check_null(json.properties.death_certificate)+`</td></tr>
<tr><td>Death Owner Check</td><td>`+check_null(json.properties.death_owner_check)+`</td></tr>
</table>`;

          $('#dialog_pexpl_ind_full_info').html(text);
          $('#dialog_pexpl_ind_full_info').dialog('open');
document.getElementById("dialog_pexpl_ind_full_info").scrollTop = 0;
        },
        error:function(){
          console.log('Axajda xatolik');
        }
      });

}

$(document).on('click','.full_info_objects',function(e){
  if($(this).attr('data-type')=='apz'){
create_apz_full_info($(this).attr('data-id'));
}

if($(this).attr('data-type')=='psd'){
create_psd_full_info($(this).attr('data-id'));
}

if($(this).attr('data-type')=='psd_ind'){
create_psd_ind_full_info($(this).attr('data-id'));
}
if($(this).attr('data-type')=='perm_rec'){
create_perm_rec_full_info($(this).attr('data-id'));
}

if($(this).attr('data-type')=='smr'){
create_smr_full_info($(this).attr('data-id'));
}


if($(this).attr('data-type')=='pexpl'){
create_pexpl_full_info($(this).attr('data-id'));
}

if($(this).attr('data-type')=='pexpl_ind'){
create_pexpl_ind_full_info($(this).attr('data-id'));
}

});


$(document).on('change','#search_field_apz',function(e){
$('#pagination-apz_div').html(`<ul id="pagination-apz" class="pagination-sm"></ul>`);
load_apz_table(1,$('#page_size_apz').val(),$('#apz_sort_field').val(),$('#apz_sort_type').val(),'','','','','');


if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_apz' class = "form-control">
<div class="input-group-addon"> <label id="count_apz_all" >`+$('#count_apz_all').text()+`</label> </div>
`;
$('#search_data_div_apz').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_apz_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_apz_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_apz' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_apz" style='display:none;'>
<div class="input-group-addon"> <label id="count_apz_all" >`+$('#count_apz_all').text()+`</label> </div>
`;

$('#search_data_div_apz').html(text);

$('#search_date_apz_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_apz_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_apz_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_apz_end').datepicker('option','dateFormat','dd.mm.yy');
}
});


$(document).on('change','#search_field_psd',function(e){
$('#pagination-psd_div').html(`<ul id="pagination-psd" class="pagination-sm"></ul>`);
load_psd_table(1,$('#page_size_psd').val(),$('#psd_sort_field').val(),$('#psd_sort_type').val(),'','','','','');


if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_psd' class = "form-control">
<div class="input-group-addon"> <label id="count_psd_all" >`+$('#count_psd_all').text()+`</label> </div>
`;
$('#search_data_div_psd').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_psd_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_psd_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_psd' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_psd" style='display:none;'>
<div class="input-group-addon"> <label id="count_psd_all" >`+$('#count_psd_all').text()+`</label> </div>
`;

$('#search_data_div_psd').html(text);

$('#search_date_psd_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_psd_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_psd_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_psd_end').datepicker('option','dateFormat','dd.mm.yy');
}
});


$(document).on('change','#search_field_psd_ind',function(e){
$('#pagination-psd_ind_div').html(`<ul id="pagination-psd_ind" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_psd_ind').val(),$('#psd_ind_sort_field').val(),$('#psd_ind_sort_type').val(),'','','','','');


if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_psd_ind' class = "form-control">
<div class="input-group-addon"> <label id="count_psd_ind_all" >`+$('#count_psd_ind_all').text()+`</label> </div>
`;
$('#search_data_div_psd_ind').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_psd_ind_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_psd_ind_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_psd_ind' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_psd_ind" style='display:none;'>
<div class="input-group-addon"> <label id="count_psd_ind_all" >`+$('#count_psd_ind_all').text()+`</label> </div>
`;

$('#search_data_div_psd_ind').html(text);

$('#search_date_psd_ind_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_psd_ind_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_psd_ind_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_psd_ind_end').datepicker('option','dateFormat','dd.mm.yy');
}
});



$(document).on('change','#search_field_perm_rec',function(e){
$('#pagination-perm_rec_div').html(`<ul id="pagination-perm_rec" class="pagination-sm"></ul>`);
load_perm_rec_table(1,$('#page_size_perm_rec').val(),$('#perm_rec_sort_field').val(),$('#perm_rec_sort_type').val(),'','','','','');

if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_perm_rec' class = "form-control">
<div class="input-group-addon"> <label id="count_perm_rec_all" >`+$('#count_perm_rec_all').text()+`</label> </div>
`;
$('#search_data_div_perm_rec').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_perm_rec_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_perm_rec_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_perm_rec' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_perm_rec" style='display:none;'>
<div class="input-group-addon"> <label id="count_psd_ind_all" >`+$('#count_psd_ind_all').text()+`</label> </div>
`;

$('#search_data_div_perm_rec').html(text);

$('#search_date_perm_rec_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_perm_rec_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_perm_rec_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_perm_rec_end').datepicker('option','dateFormat','dd.mm.yy');
}
});



$(document).on('change','#search_field_smr',function(e){
$('#pagination-smr_div').html(`<ul id="pagination-smr" class="pagination-sm"></ul>`);
load_smr_table(1,$('#page_size_smr').val(),$('#smr_sort_field').val(),$('#smr_sort_type').val(),'','','','','');


if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_smr' class = "form-control">
<div class="input-group-addon"> <label id="count_smr_all" >`+$('#count_smr_all').text()+`</label> </div>
`;
$('#search_data_div_smr').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_smr_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_smr_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_smr' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_smr" style='display:none;'>
<div class="input-group-addon"> <label id="count_smr_all" >`+$('#count_smr_all').text()+`</label> </div>
`;

$('#search_data_div_smr').html(text);

$('#search_date_smr_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_smr_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_smr_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_smr_end').datepicker('option','dateFormat','dd.mm.yy');
}
});




$(document).on('change','#search_field_pexpl',function(e){

$('#pagination-pexpl_div').html(`<ul id="pagination-pexpl" class="pagination-sm"></ul>`);
load_pexpl_table(1,$('#page_size_pexpl').val(),$('#pexpl_sort_field').val(),$('#pexpl_sort_type').val(),'','','','','');


if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_pexpl' class = "form-control">
<div class="input-group-addon"> <label id="count_pexpl_all" >`+$('#count_pexpl_all').text()+`</label> </div>
`;
$('#search_data_div_pexpl').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_pexpl_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_pexpl_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_pexpl' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_pexpl" style='display:none;'>
<div class="input-group-addon"> <label id="count_pexpl_all" >`+$('#count_pexpl_all').text()+`</label> </div>
`;

$('#search_data_div_pexpl').html(text);

$('#search_date_pexpl_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_pexpl_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_pexpl_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_pexpl_end').datepicker('option','dateFormat','dd.mm.yy');
}
});


$(document).on('change','#search_field_pexpl_ind',function(e){

$('#pagination-pexpl_ind_div').html(`<ul id="pagination-pexpl_ind" class="pagination-sm"></ul>`);
load_pexpl_ind_table(1,$('#page_size_pexpl_ind').val(),$('#pexpl_ind_sort_field').val(),$('#pexpl_ind_sort_type').val(),'','','','','');

if($(this).val()!='betwen_date'){
var text=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" id='search_text_pexpl_ind' class = "form-control">
<div class="input-group-addon"> <label id="count_pexpl_ind_all" >`+$('#count_pexpl_ind_all').text()+`</label> </div>
`;
$('#search_data_div_pexpl_ind').html(text);

}
else{
var text=`
<div class="input-group-addon"> <label >Oqaliq sanani kiriting</label> </div>
<input type="text" id='search_date_pexpl_ind_begin' autocomplete="off"  class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_date_pexpl_ind_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter_pexpl_ind' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search_text_pexpl_ind" style='display:none;'>
<div class="input-group-addon"> <label id="count_pexpl_ind_all" >`+$('#count_pexpl_ind_all').text()+`</label> </div>
`;

$('#search_data_div_pexpl_ind').html(text);

$('#search_date_pexpl_ind_begin').datepicker({
  changeMonth:true,
  changeYear:true
});

$('#search_date_pexpl_ind_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_date_pexpl_ind_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_date_pexpl_ind_end').datepicker('option','dateFormat','dd.mm.yy');
}
});



$(document).on('click','#button_date_filter_apz',function(e){

let serv='apz';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_apz_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

})

$(document).on('click','#button_date_filter_psd',function(e){

let serv='psd';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

})

$(document).on('click','#button_date_filter_psd_ind',function(e){

$('#pagination-psd_ind_div').html(`<ul id="pagination-psd_ind" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_psd_ind').val(),$('#psd_ind_sort_field').val(),$('#psd_ind_sort_type').val(),$('#search_text_psd_ind').val(),$('#search_field_psd_ind').val(),$('#search_type_psd_ind').val(),$('#search_date_psd_ind_begin').val(),$('#search_date_psd_ind_end').val());

})

$(document).on('click','#button_date_filter_perm_rec',function(e){
  let serv='perm_rec';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

})

$(document).on('click','#button_date_filter_smr',function(e){
  let serv='smr';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_smr_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

})

$(document).on('click','#button_date_filter_pexpl',function(e){
  let serv='pexpl';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
})

$(document).on('click','#button_date_filter_pexpl_ind',function(e){
  let serv='pexpl_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
})



$(document).on('keypress','#page_size_apz',function(e){
    if ( e.which == 13 ){
let serv='apz';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_apz_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }

});

$(document).on('keypress','#page_size_psd',function(e){
    if ( e.which == 13 ){
let serv='psd';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }

});


$(document).on('keypress','#page_size_psd_ind',function(e){
    if ( e.which == 13 ){
let serv='psd_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }

});
$(document).on('keypress','#page_size_perm_rec',function(e){
    if ( e.which == 13 ){
let serv='perm_rec';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_perm_rec_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }

});

$(document).on('keypress','#page_size_smr',function(e){
    if ( e.which == 13 ){
let serv='smr';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_smr_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }

});

$(document).on('keypress','#page_size_pexpl',function(e){
    if ( e.which == 13 ){
let serv='pexpl';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }

});

$(document).on('keypress','#page_size_pexpl_ind',function(e){
    if ( e.which == 13 ){
let serv='pexpl_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
    }
});


$(document).on('keypress','#page_size_loy',function(e){
    if ( e.which == 13 ){
let serv='loy';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_loy_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
    }
});

$(document).on('keypress','#page_size_pud',function(e){
    if ( e.which == 13 ){
let serv='pud';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pud_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
    }
});



$(document).on('keypress','#page_size_bjs',function(e){
    if ( e.which == 13 ){
let serv='bjs';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bjs_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
    }
});

$(document).on('keypress','#page_size_bys',function(e){
    if ( e.which == 13 ){
let serv='bys';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bys_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
    }
});



$(document).on('change','#apz_sort_field',function(e){
let serv='apz';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_apz_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});

$(document).on('change','#psd_sort_field',function(e){
let serv='psd';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});

$(document).on('change','#psd_ind_sort_field',function(e){
let serv='psd_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});

$(document).on('change','#perm_rec_sort_field',function(e){
let serv='perm_rec';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_perm_rec_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});

$(document).on('change','#smr_sort_field',function(e){
let serv='smr';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_smr_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});



$(document).on('change','#pexpl_sort_field',function(e){
let serv='pexpl';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});

$(document).on('change','#pexpl_ind_sort_field',function(e){
let serv='pexpl_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());
});

$(document).on('change','#loy_sort_field',function(e){
let serv='loy';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_loy_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});


$(document).on('change','#pud_sort_field',function(e){
let serv='pud';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pud_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});


$(document).on('change','#bjs_sort_field',function(e){
let serv='bjs';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bjs_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});

$(document).on('change','#bys_sort_field',function(e){
let serv='bys';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bys_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});


$(document).on('change','#apz_sort_type',function(e){
let serv='apz';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_apz_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});

$(document).on('change','#psd_sort_type',function(e){
let serv='psd';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});

$(document).on('change','#psd_ind_sort_type',function(e){
let serv='psd_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});

$(document).on('change','#perm_rec_sort_type',function(e){
let serv='perm_rec';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_perm_rec_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});


$(document).on('change','#smr_sort_type',function(e){
let serv='smr';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_smr_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});


$(document).on('change','#pexpl_sort_type',function(e){
let serv='pexpl';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});

$(document).on('change','#pexpl_ind_sort_type',function(e){
let serv='pexpl_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),$('#search_date_'+serv+'_begin').val(),$('#search_date_'+serv+'_end').val());

});

$(document).on('change','#loy_sort_type',function(e){
let serv='loy';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_loy_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());

});

$(document).on('change','#pud_sort_type',function(e){
let serv='pud';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pud_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());

});

$(document).on('change','#bjs_sort_type',function(e){
let serv='bjs';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bjs_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());

});

$(document).on('change','#bys_sort_type',function(e){
let serv='bys';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bys_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());

});


$(document).on('keyup','#search_text_apz',function(e){

let serv='apz';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_apz_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});

$(document).on('keyup','#search_text_psd',function(e){

let serv='psd';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});

$(document).on('keyup','#search_text_psd_ind',function(e){
let serv='psd_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_psd_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});

$(document).on('keyup','#search_text_perm_rec',function(e){

let serv='perm_rec';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_perm_rec_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});

$(document).on('keyup','#search_text_smr',function(e){

let serv='smr';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_smr_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});


$(document).on('keyup','#search_text_pexpl',function(e){
let serv='pexpl';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});

$(document).on('keyup','#search_text_pexpl_ind',function(e){

let serv='pexpl_ind';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pexpl_ind_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val(),'','');
});

$(document).on('keyup','#search_text_loy',function(e){

let serv='loy';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_loy_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});

$(document).on('keyup','#search_text_pud',function(e){

let serv='pud';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_pud_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});


$(document).on('keyup','#search_text_bjs',function(e){

let serv='bjs';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bjs_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});

$(document).on('keyup','#search_text_bys',function(e){

let serv='bys';
$('#pagination-'+serv+'_div').html(`<ul id="pagination-`+serv+`" class="pagination-sm"></ul>`);
load_bys_table(1,$('#page_size_'+serv+'').val(),$('#'+serv+'_sort_field').val(),$('#'+serv+'_sort_type').val(),$('#search_text_'+serv+'').val(),$('#search_field_'+serv+'').val(),$('#search_type_'+serv+'').val());
});




// $(document).on('click','#button_load_table',function(){
// $('#pagination-bys_div').html(`<ul id="pagination-bys" class="pagination-sm"></ul>`);
//   load_bys_table(1,10,'pk','','','','','','','','');
// });


$("#dialog_apz_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_apz_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_apz_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_loy_table").dialog({
  width:900,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_loy_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_loy_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_bjs_table").dialog({
  width:900,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_bjs_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_bjs_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });


$("#dialog_bys_table").dialog({
  width:900,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_bys_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_bys_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });


$("#dialog_pud_table").dialog({
  width:900,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_pud_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_pud_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });


$("#dialog_psd_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_psd_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_psd_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_psd_ind_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_psd_ind_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_psd_ind_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_perm_rec_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_perm_rec_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_perm_rec_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_smr_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_smr_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_smr_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });



$("#dialog_pexpl_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_pexpl_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_pexpl_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });




$("#dialog_pexpl_ind_table").dialog({
  width:1100,
  height:815,
  autoOpen: false,
  dialogClass:'dialog_pexpl_ind_table',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_pexpl_ind_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_buyurtmachi_full_info").dialog({
  width:550,
  height:700,
  autoOpen: false,
  dialogClass:'dialog_buyurtmachi_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_buyurtmachi_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "blind",
          duration: 300,
        }
  });

$("#dialog_loyihalovchi_full_info").dialog({
  width:550,
  height:700,
  autoOpen: false,
  dialogClass:'dialog_loyihalovchi_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_loyihalovchi_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });

$("#dialog_pudratchi_full_info").dialog({
  width:550,
  height:700,
  autoOpen: false,
  dialogClass:'dialog_pudratchi_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_pudratchi_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });


$("#dialog_apz_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_apz_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_apz_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });

$("#dialog_smr_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_smr_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_smr_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });


$("#dialog_perm_rec_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_perm_rec_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_perm_rec_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });



$("#dialog_psd_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_psd_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_psd_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });

$("#dialog_psd_ind_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_psd_ind_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_psd_ind_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });


$("#dialog_pexpl_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_pexpl_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_pexpl_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });

$("#dialog_pexpl_ind_full_info").dialog({
  width:700,
  height:800,
  autoOpen: false,
  dialogClass:'dialog_pexpl_ind_full_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_pexpl_ind_full_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 200,
        },
        hide: {
          effect: "blind",
          duration: 200,
        }
  });

