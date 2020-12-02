var search_marker;

$('#draw_edit').on('click',function(){
  $('.leaflet-draw-edit-edit')[0].click();
  $('#tab-action-draw').css({'top':'500px'});
});

$('#draw_load').on('click',function(){
$('#dialog_load_vector').dialog({
  resizable: false,
  autoOpen:true,
  height: 320,
  width: 320,
  modal: true,
  show:{
    effect:'slide',
    duration:200,
  },
  close:function(){
    $('#vec_file_type').val('shp');
    $('#vec_file_proj').val('4326');
    $('#upload_files_id').val('');
     $('#upload_files_id').next().text('Faylni tanlang');
  },
    hide:{
    effect:'blind',
    duration:400,
  }
});

});

$(document).on('click','.tag_download_sec',function(){
 var filename=$(this).attr('data-filename');
 var link=document.createElement('a');
 link.setAttribute('href',mydecode(filename));
 link.setAttribute('target','blank');
 link.setAttribute('download',mydecode(filename));
 link.click();
});

$(document).on('click','.sub_data_link',function(){
  var filename=$(this).attr('data-filename');
  $('#a_magnify').attr('href',mydecode(filename));
  $('#a_magnify')[0].click();
});

function myencode(str){
  return btoa(encodeURI(str));
}
function mydecode(str){
  return decodeURI(atob(str));
}


function sortTable(n,m=0) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table-info");
  switching = true;

if(n!=0){

  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }}
  else{
    while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[m];
      y = rows[i + 1].getElementsByTagName("TD")[m];
      if (Number(x.innerHTML) > Number(y.innerHTML)) {

        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  }
}

$(document).on('click','.save_list',function(){

var tableObj=[];
$.each($('#'+$(this).attr('data-table_id')+' tr'), function(){

  var row=$(this);
  var rowObj={};
 if(row.css('display')!='none'){


var i=0;
$.each($('td',row),function(){
  col=$(this);

  rowObj[i]=col.text();
  i++;
   
})
tableObj.push(rowObj);
}

});
var data=new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('type',$(this).attr('type'));
data.append('dtype',$(this).attr('dtype'));
data.append('tableObj',JSON.stringify(tableObj));
$.ajax({
        url: "/to_list",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
 var link=document.createElement('a');
if(data=='list.pdf'){
 link.setAttribute('href','/static/folder_for_download/genplan_list.pdf');
}
else{
  if(data=='list.xlsx')
   link.setAttribute('href','/static/folder_for_download/xlsx.xlsx');
}

 link.setAttribute('target','blank');
 link.setAttribute('download',data);
 link.click();

}

});

});



$('#all_maps').on('click',function(){
if($(this).attr('data-val')=='0'){
  $('#layer_control').css({'width':'460px','height':'245px','border':'1px solid rgba(0,0,0,.25)','padding':'20px'});
$(this).attr('data-val','1');
}
else{
  $('#layer_control').css({'width':'0px','height':'0px','border':'0px solid rgba(0,0,0,.25)','padding':'0px'});
$(this).attr('data-val','0'); 
}
});


var viloyat=[
{'id':1,'disUz':'Andijon viloyati','disRu':'Andijon vil'},
{'id':2,'disUz':'Buxoro viloyati','disRu':'Buxoro vil'},
{'id':3,'disUz':"Farg'ona viloyati",'disRu':"Farg'ona vil"},
{'id':4,'disUz':"Jizzax viloyati",'disRu':"Jizzax vil"},
{'id':5,'disUz':"Namangan viloyati",'disRu':"Namangan vil"},
{'id':6,'disUz':"Navoiy viloyati",'disRu':"Navoiy vil"},
{'id':7,'disUz':"Qashqadaryo viloyati",'disRu':"Qashqadaryo vil"},
{'id':8,'disUz':"Qoraqalpog'iston Respublikasi",'disRu':"Qoraqalpog'iston Respublikasi"},
{'id':9,'disUz':'Samarqand viloyati','disRu':'Samarqand vil'},
{'id':10,'disUz':"Sirdaryo viloyati",'disRu':"Sirdaryo vil"},
{'id':11,'disUz':"Surxondaryo viloyati",'disRu':"Surxondaryo vil"},
{'id':12,'disUz':"Toshkent viloyati",'disRu':"Toshkent vil"},
{'id':13,'disUz':"Xorazm viloyati",'disRu':"Xorazm vil"},
];

var live_layer=0;
$('#live_layers').on('click',function(){
 if($(this).attr('data-val')=='0'){

live_layer=[
{'layer1':genplan,'layer2':genplan_click,'id':'checkbox_id_2_3_1','layer_name':"genplan",'dis':'Генеральные планы населенных пунктов'},
{'layer1':pdp,'layer2':pdp,'id':'checkbox_id_2_3_2','layer_name':"pdp",'dis':'Проект детальной планировки'},
{'layer1':apot,'layer2':apot_click,'id':'checkbox_id_2_2_1','layer_name':"apot",'dis':'Архитектурно-планировочных организаций территорий'},
{'layer1':funk_zones_po_genplan,'layer2':funk_zones_po_genplan,'id':'checkbox_id_1_1_1','layer_name':"funk_zones_po_genplan",'dis':'Функциональные зоны по Генеральным планам'},
{'layer1':proekti,'layer2':proekti,'id':'proekti_id','layer_name':"proekti",'dis':'proekti'},
{'layer1':objecti,'layer2':objecti,'id':'objecti_id','layer_name':"objecti",'dis':'objecti'},
{'layer1':proektirovchiki,'layer2':proektirovchiki,'id':'proektirovchiki_id','layer_name':"proektirovchiki",'dis':'proektirovchiki'},
{'layer1':zastroychiki,'layer2':zastroychiki,'id':'zastroychiki_id','layer_name':"zastroychiki",'dis':'zastroychiki'},
{'layer1':maktablar,'layer2':maktablar,'id':'maktablar_id','layer_name':"maktablar",'dis':'Maktablar'},

{'layer1':funk_zones_po_apot,'layer2':funk_zones_po_apot,'id':'checkbox_id_1_1_2','layer_name':"funk_zones_po_apot",'dis':'Функциональные зоны по АПОТам'},

{'layer1':red_lines,'layer2':red_lines,'id':'checkbox_id_1_2_1','layer_name':"red_lines",'dis':'Красные линии'},

{'layer1':geologik_rayonlash,'layer2':geologik_rayonlash,'id':'checkbox_id_1_3_1','layer_name':"geologik_rayonlash",'dis':'Геологическое районирование'},
  
];

var text='';

for (var i in live_layer){
  if(map.hasLayer(live_layer[i].layer1)||map.hasLayer(live_layer[i].layer2))
 text+="<tr ><td><input type='checkbox' checked id='live_layer_"+i+"' data-layer_name='"+live_layer[i].layer_name+"' class='live_layers_checkbox'></td><td><label for='live_layer_"+i+"'>"+live_layer[i].dis+"</label></td></tr>";
}

$('#live_layer_table').html(text);

$('#live_layer_control').css({'width':'250px','height':'auto','border':'1px solid rgba(0,0,0,.25)','padding':'10px'});
$(this).attr('data-val','1');
}
else{
  live_layer=0;
  $('#live_layer_control').css({'width':'0px','height':'0px','border':'0px solid rgba(0,0,0,.25)','padding':'0px'});
$(this).attr('data-val','0'); 
}
});


$(document).on('click','.live_layers_checkbox',function(){
  if($(this).prop('checked')){

for(var i in live_layer){
  if($(this).attr('data-layer_name')==live_layer[i].layer_name){
    map.addLayer(live_layer[i].layer1);
    $('#'+live_layer[i].id+'').prop('checked',true);
  }
}

   }
  else{

for(var i in live_layer){
  if($(this).attr('data-layer_name')==live_layer[i].layer_name){
    map.addLayer(live_layer[i].layer1);
    $('#'+live_layer[i].id+'').prop('checked',false);
    map.removeLayer(live_layer[i].layer1);
    map.removeLayer(live_layer[i].layer2);
  }
}

  }

});

$(document).on('click','.checkbox_layer_change',function(){
  // "openstreetmap": openstreetmap,
//     "googleStreets": googleStreets,
//     "googleHybrid": googleHybrid,
//     "googleSat": googleSat,
//     "googleTerrain": googleTerrain,
if($(this).val()!='mytile'){

  if(map.hasLayer(openstreetmap))
    map.removeLayer(openstreetmap);

  if(map.hasLayer(openstreetmap_topo))
    map.removeLayer(openstreetmap_topo);

  if(map.hasLayer(googleStreets))
    map.removeLayer(googleStreets);
  if(map.hasLayer(googleHybrid))
    map.removeLayer(googleHybrid);
  if(map.hasLayer(googleSat))
    map.removeLayer(googleSat);
  if(map.hasLayer(googleTerrain))
    map.removeLayer(googleTerrain);

  if($(this).val()=='openstreetmap_topo')
  map.addLayer(openstreetmap_topo);

  if($(this).val()=='openstreetmap_mapnik')
  map.addLayer(openstreetmap);

  if($(this).val()=='openstreetmap')
  map.addLayer(openstreetmap);

  if($(this).val()=='googleStreets')
  map.addLayer(googleStreets);
  if($(this).val()=='googleHybrid')
  map.addLayer(googleHybrid);
  if($(this).val()=='googleSat')
  map.addLayer(googleSat);
  if($(this).val()=='googleTerrain')
  map.addLayer(googleTerrain);
}
else{
  if($(this).prop('checked')){
    map.addLayer(mytile);
  }
  else{
 map.removeLayer(mytile);
  }
}

});


function check_checked(layer){
  if(map.hasLayer(layer))
  return "checked";
else
  return "";
}

$('#contol_zoom_plus').on('click',function(){
map.setZoom(map.getZoom()+1);

});
$('#contol_zoom_minus').on('click',function(){
map.setZoom(map.getZoom()-1);

});

$('#close_sub2menu').on('click',function(){
   $('#sub2menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});
});



$(document).on('click','.menu-items',function(){
  if(map.hasLayer(uzb_vil)){
  map.removeLayer(uzb_vil);
  map.addLayer(uzb_res);
}

var text;
   $('#sub2menu').css({'height':'380px', 'border': '1px solid rgba(0,0,0,.25)',
  'padding':'10px'});
  $('#sub3menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});

$('#p_sub2menu').text($(this).children('h4').text());
if($(this).attr('data-val')=='1'){

text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='11' ><td class='td_icon'></td><td>Функциональные зоны</td></tr>
<tr class='tr2_sub2menu' data-val='12' ><td class='td_icon'></td><td>Красные линии</td></tr>
<tr class='tr2_sub2menu' data-val='13' ><td class='td_icon'></td><td>Геологическое районирование</td></tr>
</table>`;

  $('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='2'){
text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='21' ><td class='td_icon'></td><td>Архитектурно-планировочных организаций территорий</td></tr>
<tr class='tr2_sub2menu' data-val='22' ><td class='td_icon'></td><td>Генеральные планы населенных пунктов</td></tr>
<tr class='tr2_sub2menu' data-val='23' ><td class='td_icon'></td><td>ПДП</td></tr>
</table>`;


  $('#sub2menu_div').html(text);

}

if($(this).attr('data-val')=='3'){

 $('#sub2menu_div').html('В процессе подготовки !!');
}

if($(this).attr('data-val')=='4'){

text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='41'><td class='td_icon'></td><td>Openstreetmap</td></tr>
<tr class='tr2_sub2menu' data-val='42'><td class='td_icon'></td><td>Google</td></tr>
<tr class='tr2_sub2menu' data-val='43'><td class='td_icon'></td><td>DSHK ortofoto</td></tr>
</table>`;

  $('#sub2menu_div').html(text);
}
if($(this).attr('data-val')=='5'){

text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='51' ><td class='td_icon'></td><td>Openstreetmap dan izlash</td></tr>
<tr class='tr2_sub2menu' data-val='52' ><td class='td_icon'></td><td>DSHK bazasidan izlash</td></tr>
</table>`;

  $('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='6'){

text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='proekti' class='info_table'></td><td><img src='/static/img/proekti.png' class='img_label'></td><td><input type='checkbox' `+check_checked(proekti)+` data-layer_name='proekti' class='obj_sub_checkbox' id='proekti_id'></td><td><label class='info_label' for='proekti_id'>Ro'yxatda o'tkazilgan proektlar</label></td><tr>

  </table>`;
$('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='7'){

text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='objecti' class='info_table'></td><td><img src='/static/img/objecti.png' class='img_label'></td><td><input type='checkbox' `+check_checked(objecti)+` data-layer_name='objecti' class='obj_sub_checkbox' id='objecti_id'></td><td><label class='info_label' for='objecti_id'>Ro'yxatda o'tkazilgan va qurulayotgan obyektlar</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='maktablar' class='info_table'></td><td><img src='/static/img/school.png' class='img_label'></td><td><input type='checkbox' `+check_checked(maktablar)+` data-layer_name='maktablar' class='obj_sub_checkbox' id='maktablar_id'></td><td><label class='info_label' for='maktablar_id'>Qurulib topshitilgan maktablar</label></td><tr>
  </table>`;
$('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='8'){

text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='proektirovchiki' class='info_table'></td><td><img src='/static/img/proektirovchiki.png' class='img_label'></td><td><input type='checkbox' `+check_checked(proektirovchiki)+` data-layer_name='proektirovchiki' class='obj_sub_checkbox' id='proektirovchiki_id'></td><td><label class='info_label' for='proektirovchiki_id'>Проектуровщики</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='zastroychiki' class='info_table'></td><td><img src='/static/img/zastroychiki.png' class='img_label' ></td><td><input type='checkbox' `+check_checked(zastroychiki)+` data-layer_name='zastroychiki'  class='obj_sub_checkbox' id='zastroychiki_id'></td><td><label class='info_label' for='zastroychiki_id'>Застройщики</label></td><tr>
  </table>`;
$('#sub2menu_div').html(text);
}

if($(this).attr('data-val')=='9'){


var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append('query_type','docs_type');
  
var myUrl='/documents';
$.ajax({
        url: myUrl,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {

var text="<table class='table_2'>";

          for(var i in data['list']){
text+="<tr class='tr2_sub2menu_pod9' data-tip_doc='"+data['list'][i]['id']+"' ><td class='td_icon'></td><td>"+data['list'][i]['tip_dis']+"</td></tr>";
          
          }

text+='</table>';
$('#sub2menu_div').html(text);
                   },
            error:function(){
              console.log('Ajaxda xatolik!!');
            }
  });
}
});





var doc_type=new Array();

function update_data(a){
  var d=a.split('-');
  return d[2]+'.'+d[1]+'.'+d[0];
}

function create_table_pod9(tip_id,sub_tip_id=-1,date_begin=0,date_end=0,filter_date=0){
   var text='';
   text+=`<tr id='table_head'>
   <td >№</td>
   <td >Info</td>
   <td >Hujjat turi(guruh) </td> 
   <td >Hujjat turi</td>
   <td >Hujjat nomi</td>   
   <td >Sana</td>
   <td >Hujjat raqami</td>
   </tr>`;
 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'docs_list');
  data.append("docs_tip_id",tip_id);
  data.append("docs_sub_tip_id",sub_tip_id);
  data.append("filter_date",filter_date);  
  data.append("date_begin",date_begin);
  data.append("date_end",date_end);

$.ajax({
        url: "/documents",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {

var sub_tip = new Array();
var k=data[0]['sub_doc'];
var select_items="<option value='-1'>Все</option>";
 for(var x in k){
  sub_tip[k[x]['id']]=k[x]['sub_tip_dis'];
  select_items+="<option value='"+k[x]['id']+"'>"+k[x]['sub_tip_dis']+"</option>";
 }

if(sub_tip_id==-1)
$('#search-type_hujjat_pod9').html(select_items);

       var itr=1;
        var d=data[0]['list'];
           for(var x in d){

      text+=`<tr>
      <td style='text-align:center; vertical-align:middle;'>`+itr+`</td>`;

if(d[x]['file_doc']==''||d[x]['file_doc']==null){

 text+=`<td style='vertical-align:middle;'><a href='`+d[x]['link_doc']+`' target='blank'><button class='btn'>Ko'rish</button></a></td>`;
}
else{
      text+=`<td style='vertical-align:middle;'><a href='`+d[x]['file_doc']+`' target='blank'><button class='btn'>Ko'rish</button></a></td>`;
  
}
      text+=`<td style='vertical-align:middle;'>`+doc_type[d[x]['tip_doc_id']]+`</td>
      <td style='vertical-align:middle;'>`+sub_tip[d[x]['sub_tip_doc_id']]+`</td>
      <td style='vertical-align:middle;'>`+d[x]['doc_nomi']+`</td>
      <td style='vertical-align:middle;'>`+update_data(d[x]['data'])+`</td>
      <td style='vertical-align:middle;'>`+d[x]['nomer_doc']+`</td>
      <td style='display:none;' >`+d[x]['tip_doc']+`</td>
      </tr>`;
      itr++;
        }
var text2
if(filter_date==0){
text2=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" data-input_id='search-field_pod9'  data-count='item-count_pod9' data-type_id='search-type_pod9'  data-maydon_id='search-field-id_pod9'  data-table_id='table-info_pod9' id="search-field_pod9" class = "form-control search_input">
<div class="input-group-addon"> <label id="item-count_pod9" ></label> </div>
`;
$('#search_data_div').html(text2);
}

$('#button_date_filter').on('click',function(){
  var begin=$('#search_data_input_begin').val();
  var end=$('#search_data_input_end').val();  
create_table_pod9($('#search-type_tip_pod9').val(),$('#search-type_hujjat_pod9').val(),begin,end,1);
});


$('#item-count_pod9').html("Barcha hujjatlar soni:"+(itr-1)+"<br>");
$('#table-info_pod9').html(text);
document.getElementById("table-info-div-id_pod9").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id_pod9');
tablecont.addEventListener('scroll',scrollHendle);
      
        },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
  
  });
}






$(document).on('click','.tr2_sub2menu_pod9',function(){
  var select_items_tip="<option value='-1'>Все</option>";
  $('.tr2_sub2menu_pod9').each(function(){
    select_items_tip+="<option value='"+$(this).attr('data-tip_doc')+"'>"+$(this).children().last().text()+"</option>";
    doc_type[$(this).attr('data-tip_doc')]=$(this).children().last().text();
  });

$('#search-type_tip_pod9').html(select_items_tip);
var select_items=`<option selected value='-1'>Barcha ustunlardan</option>
                  <option value='4'>Hujjat nomi bo'yicha</option>
                  <option value='5'>Qabul qilingan aniq sana bo'yicha</option>
                  <option value='-2'>Qabul qilingan oraliq sana bo'yicha</option>
                  <option value='6'>Hujjat raqami bo'yicha</option>`;

var tip_id=$(this).attr('data-tip_doc');

$('#search-field-id_pod9').html(select_items);

  $("#dialog_documents_info").dialog({
   title:"Нормативно-правовая основа",

       autoOpen: true,
       dialogClass:'dialog_documents_info',

  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_documents_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 700,
        width: 1000
  });
$("#search-type_tip_pod9").val(tip_id);
$('#search-field_pod9').val('');
create_table_pod9(tip_id);
});



$(document).on('change','.search-pod9_tip',function(){
  $('#search-field-id_pod9').val(-1);
  $('#search-type_pod9').val(1);
  $('#search-field_pod9').val('');

  create_table_pod9($(this).val());
});

$(document).on('change','.search-pod9_hujjat',function(){
  $('#search-field-id_pod9').val(-1);
  $('#search-type_pod9').val(1);
  $('#search-field_pod9').val('');
  create_table_pod9($('#search-type_tip_pod9').val(),$(this).val());
});


function create_table_object(element,query_type,filter,pro_or_obj,inn,myUrl,title){

element.css({'cursor':'wait'});
$('#search-field').val('');

 var text='';
   text+=`<tr id='table_head'>
   <td >№</td>
   <td >Info</td>
   <td >Registratsiya sanasi</td>
   <td >Identifikator</td>
   <td >Nomi</td>
   <td >Manzil</td>
   </tr>`;

 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",query_type);
  data.append("filter",filter);
  data.append("pro_or_obj",pro_or_obj);
  data.append('inn',inn);
  

$.ajax({
        url: myUrl,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
          var itr=1;
        var d=data['list'];
           for(var x in d){
      text+=`<tr>
      <td style='text-align:center'>`+itr+`
    <br><img src='/static/img/img/location.png' class='click_set_object' data-dtype='setObject' data-ltype='/proekti' data-id='`+d[x]['id']+`'></td>
      <td><button class='btn full_info_object' data-stype='obj_proj' data-ptype='object' data-id='`+d[x]['id']+`'>Ko'rish</button></td>
      <td>`+d[x]['guas_registr_sana']+`</td>
      <td>`+d[x]['identifikator']+`</td>
      <td>`+d[x]['nomi']+`</td>
      <td>`+d[x]['adress']+`</td>
      </tr>`;
      itr++;
        }


$('#item-count2').html("Barcha ob'yektlar soni:"+data['list'].length+"<br>");
$('#to_pdf2').attr('dtype','proekti');
$('#to_xlsx2').attr('dtype','proekti');
$('#title_table2').html(title);

var select_items=`<option selected value='-1'>Barcha ustunlardan</option>
                  <option value='2'>Regsitratsita sanani bo'yicha</option>
                  <option value='3'>Idintifikator bo'yicha</option>
                  <option value='4'>Nomi bo'yicha</option>
                  <option value='5'>Manzil bo'yicha</option>`;


$('#search-field-id2').html(select_items);
$('#table-info2').html(text);

  $("#dialog_table2").dialog({
dialogClass:'dialog_table2',
       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table2').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 700,
        width: 1000
  });
document.getElementById("table-info-div-id2").scrollTop = 0;
element.css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id2');
tablecont.addEventListener('scroll',scrollHendle);
      
        },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
      });

}

function create_table_proekt(element,query_type,filter,pro_or_obj,inn,myUrl,title){

element.css({'cursor':'wait'});
$('#search-field').val('');

 var text='';
   text+=`<tr id='table_head'>
   <td >№</td>
   <td >Info</td>
   <td >Registratsiya sanasi</td>
   <td >Identifikator</td>
   <td >Nomi</td>
   <td >Manzil</td>
   </tr>`;

 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",query_type);
  data.append("filter",filter);
  data.append("pro_or_obj",pro_or_obj);
  data.append("inn",inn);
  

$.ajax({
        url: myUrl,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
             var itr=1;
        var d=data['list'];
           for(var x in d){
      text+=`<tr>
      <td style='text-align:center;'>`+itr+`
    <br><img src='/static/img/img/location.png' data-dtype='setObject' data-ltype='/proekti' class='click_set_object' data-id='`+d[x]['id']+`'></td>
      <td><button class='btn full_info_object' data-stype='obj_proj' data-ptype='proekti' data-id='`+d[x]['id']+`'>Ko'rish</button></td>
      <td>`+d[x]['guas_registr_sana']+`</td>
      <td>`+d[x]['identifikator']+`</td>
      <td>`+d[x]['nomi']+`</td>
      <td>`+d[x]['adress']+`</td>
      </tr>`;
      itr++;
        }

$('#item-count1').html("Barcha ob'yektlar soni:"+data['list'].length+"<br>");
$('#to_pdf1').attr('dtype','proekti');
$('#to_xlsx1').attr('dtype','proekti');
if(filter=='all'){
$('#title_table1').html("Ro'yxatdan o'tkazilgan proektlar ro'yxati");
}
else{
$('#title_table1').html(title);
}

var select_items=`<option selected value='-1'>Barcha ustunlardan</option>
                  <option value='2'>Regsitratsita sanani bo'yicha</option>
                  <option value='3'>Idintifikator bo'yicha</option>
                  <option value='4'>Nomi bo'yicha</option>
                  <option value='5'>Manzil bo'yicha</option>`;


$('#search-field-id1').html(select_items);
$('#table-info1').html(text);

  $("#dialog_table1").dialog({
dialogClass:'dialog_table1',
       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table1').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 700,
        width: 1000
  });
document.getElementById("table-info-div-id1").scrollTop = 0;

element.css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id1');
tablecont.addEventListener('scroll',scrollHendle);
      
        },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
      });
} 


$(document).on('click','.img_mini_maxi',function(){
  if($(this).attr('data-val')=='0'){
$(this).parent().parent().css({'height':'auto'}); 
$(this).parent().next().css({'display':'none'});
$(this).html('-X-');
$(this).attr('data-val','1');
}
else{

 $(this).parent().next().css({'display':'block'});
 $(this).html('-x-');
$(this).attr('data-val','0'); 
}
});

$(document).on('click','.tr2_sub2menu',function(){

var mythis=this;

var data = new FormData(); 
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
$.ajax({
        url: '/sessia',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function (data ) {
          sessia=data[0].sessia;
var text='';
$('#p_sub3menu').text($(mythis).text());
$('#sub3menu').css({'height':'380px','border': '1px solid rgba(0,0,0,.25)',
  'padding':'10px'});

if(sessia.status!=-1){

if($(mythis).attr('data-val')=='11'){
    text=`<table class='table_3'>
    <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(funk_zones_po_genplan)+` id='checkbox_id_1_1_1' ></td><td><label class='label_sub3menu'  for='checkbox_id_1_1_1'>Генеральные планы населенных пунктов</label></td><td><img class='info_png' data-layer_name='funk_zones_po_genplan' data-layer_dis='Функциональные зоны по Генеральным планам'  src='/static/img/info.png'></td></tr>
     <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(funk_zones_po_apot)+` id='checkbox_id_1_1_2' ></td><td><label class='label_sub3menu'  for='checkbox_id_1_1_2'>Архитектурно-планировочных организаций территорий</label></td><td><img class='info_png' data-layer_name='funk_zones_po_apot' data-layer_dis='Функциональные зоны по АПОТам'  src='/static/img/info.png'></td></tr>
    </table>`;
$('#sub3menu_div').html(text);
}

if($(mythis).attr('data-val')=='12'){
 
text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='red_lines' class='info_table'></td><td><img src='/static/img/red_lines.png' class='img_label'></td><td><input type='checkbox' `+check_checked(red_lines)+` data-layer_name='red_lines' class='checkbox_sub3menu' id='checkbox_id_1_2_1'></td><td><label class='info_label' for='checkbox_id_1_2_1'>Красные линии</label></td><tr>
    </table>`;
// $('#sub2menu_div').html(text);

$('#sub3menu_div').html(text);
}


if($(mythis).attr('data-val')=='13'){
text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='geologik_rayonlash' class='info_table'></td><td><img src='/static/img/funk_zones.png' class='img_label'></td><td><input type='checkbox' `+check_checked(geologik_rayonlash)+` data-layer_name='geologik_rayonlash' class='checkbox_sub3menu' id='checkbox_id_1_3_1'></td><td><label class='info_label' for='checkbox_id_1_3_1'>Геологическое районирование</label></td><tr>
    </table>`;
// $('#sub2menu_div').html(text);

$('#sub3menu_div').html(text);
}

if($(mythis).attr('data-val')=='21'){
  text=`<table class='table_3'>
  <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(apot)+` id='checkbox_id_2_2_1' ></td><td><label class='label_sub3menu'  for='checkbox_id_2_2_1'>Архитектурно-планировочных организаций территорий</label></td><td><img class='info_png' data-layer_name='apot' data-layer_dis='Архитектурно-планировочных организаций территорий'  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='apot'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(apot_edit)+`  id='checkbox_id_2_2_1_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_2_1_1'>Apot uzgarishlar</label></td><td><img class='info_png' data-layer_name='apot_edit' data-layer_dis='Apot uzgarishlar'  src='/static/img/info.png'></td></tr>`;
}

 text+=`</table>`;
$('#sub3menu_div').html(text);
}
if($(mythis).attr('data-val')=='22'){
  text=`<table class='table_3'>
    <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(genplan)+`  id='checkbox_id_2_3_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_1'>Генеральные планы населенных пунктов</label></td><td><img class='info_png' data-layer_name='genplan' data-layer_dis='Генеральные планы населенных пунктов'  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='genplan'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(genplan_edit)+`  id='checkbox_id_2_3_1_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_1_1'>Genplan uzgarishlar</label></td><td><img class='info_png' data-layer_name='genplan_edit' data-layer_dis='Genplan uzgarishlar'  src='/static/img/info.png'></td></tr>`;
}
text+=`</table>`;
  $('#sub3menu_div').html(text);
}
if($(mythis).attr('data-val')=='23'){
 text=`<table class='table_3'>
    <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(pdp)+`  id='checkbox_id_2_3_2'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_2'>Проект детальной планировки</label></td><td><img class='info_png' data-layer_name='pdp' data-layer_dis='ПДП'  src='/static/img/info.png'></td></tr>`;
if(sessia.service=='pdp'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(pdp_edit)+`  id='checkbox_id_2_3_2_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_2_1'>ПДП uzgarishlar</label></td><td><img class='info_png' data-layer_name='pdp_edit' data-layer_dis='ПДП uzgarishlar'  src='/static/img/info.png'></td></tr>`;
}

 text+=` </table>`;

  $('#sub3menu_div').html(text);
}
}
else{

text=`<table class='table_3'>
    <tr><td> Oldin autorizatsiaydan o'ting!!</td></tr>
  </table>`;
  $('#sub3menu_div').html(text);



}

if($(mythis).attr('data-val')=='41'){
    text=`<table class='table_3'>
    <tr><td><input type='radio' value='openstreetmap_mapnik' name='radio-group' class='checkbox_layer_change' id='test8' ></td><td><label class='label_sub3menu'  for='test8'>Openstreetmap Mapnik</label></td></tr>
    <tr><td><input type='radio' value='openstreetmap_topo' name='radio-group' class='checkbox_layer_change' id='test9' ></td><td><label class='label_sub3menu'  for='test9'>Openstreetmap Topology</label></td></td></tr>
    </table>`;
$('#sub3menu_div').html(text);
}



if($(mythis).attr('data-val')=='42'){
    text=`<table class='table_3'>
    <tr><td><input type='radio' value='googleStreets' name='radio-group' class='checkbox_layer_change' id='test10' ></td><td><label class='label_sub3menu'  for='test10'>googleStreets</label></td></tr>
    <tr><td><input type='radio' value='googleTerrain' name='radio-group' class='checkbox_layer_change' id='test11' ></td><td><label class='label_sub3menu'  for='test11'>googleTerrain</label></td></td></tr>
    <tr><td><input type='radio' value='googleSat' name='radio-group' class='checkbox_layer_change' id='test12' ></td><td><label class='label_sub3menu'  for='test12'>googleSat</label></td></td></tr>
    <tr><td><input type='radio' value='googleHybrid' name='radio-group' class='checkbox_layer_change' id='test13' ></td><td><label class='label_sub3menu'  for='test13'>googleHybrid</label></td></td></tr>
    </table>`;
$('#sub3menu_div').html(text);
}

if($(mythis).attr('data-val')=='43'){
    text=`<table class='table_3'>
    <tr><td><input type='checkbox' value='mytile' name='radio-group' class='checkbox_layer_change' id='test14' ></td><td><label class='label_sub3menu'  for='test14'>Ortofoto</label></td></tr>
    </table>`;
$('#sub3menu_div').html(text);
}



if($(mythis).attr('data-val')=='51'){
text=`<input type='search' id='input_geosearch' placeholder="Adresni kiriting"></input>
<div id='geosearch_results'></div>
`;
  $('#sub3menu_div').html(text);
}

if($(mythis).attr('data-val')=='52'){
text=`<input type='search' id='input_geosearch_from_our' placeholder="Adresni kiriting"></input>
<div id='geosearch_results_from_our'></div>
`;
  $('#sub3menu_div').html(text);
}


},
        error:function(){
          console.log("Ajaxda xatolik!!");
      }
      }); 
});


$(document).on('click','.geosearch_result_li',function(){
if(map.hasLayer(search_marker))
map.removeLayer(search_marker);
search_marker=L.marker([$(this).attr('data-lng'),$(this).attr('data-lat')]).bindPopup('<div class="search_popup">'+$(this).text()+'</div>').addTo(map).openPopup();

map.flyToBounds([[$(this).attr('data-bounds-1'),$(this).attr('data-bounds-2')],[$(this).attr('data-bounds-3'),$(this).attr('data-bounds-4')]]);

});



$(document).on('keypress','#input_geosearch',function(e){
    if ( e.which == 13 ){
$('#main_geosearch_button')[0].click();}
});

$(document).on('keypress','#input_geosearch_from_our',function(e){
    if ( e.which == 13 ){
var text = $(this).val();
var rforeign = /[^\u0000-\u007f]/;
var lang;
if (rforeign.test(text)) {
  lang=0;
} else {
  lang=1; 
}


var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('text',text)
data.append('lang',lang);
    $.ajax({
        url: '/search_geolocation',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {
        data=JSON.parse(result['result']);
var text='<ul>';
for (var i in data.features)
{
  text+=`<li class='search_geolocation_li' data-lat='`+data.features[i].geometry.coordinates[0][0]+`'
             data-lng='`+data.features[i].geometry.coordinates[0][1]+`'

   >`+data.features[i].properties.nomi+`</li>`;
}
text+='</ul>';

$('#geosearch_results_from_our').html(text);

        },
        error:function(){
          console.log('Ajaxda xatolik !!');
        }});
}
});

$(document).on('click','.search_geolocation_li',function(){
if(map.hasLayer(search_marker))
map.removeLayer(search_marker);
search_marker=L.marker([$(this).attr('data-lng'),$(this).attr('data-lat')]).bindPopup('<div class="search_popup">'+$(this).text()+'</div>').addTo(map).openPopup();
map.flyTo([$(this).attr('data-lng'),$(this).attr('data-lat')],12);

});


$('#close_sub3menu').on('click',function(){
   $('#sub3menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});
});

$('#close_sub4menu').on('click',function(){
   $('#sub4menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});
});

$('#menu').on('click',function(){
  if($(this).attr('data-val')=='0'){
 $('#submenu').css({'height':'380px', 'border': '1px solid rgba(0,0,0,.25)',
  'padding':'10px'});
    $(this).attr('data-val','1');
 }
  else{
  $('#submenu').css({'height':'0px', 'border': '0px',
  'padding':'0px'});
    $(this).attr('data-val','0');

   $('#sub2menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});

   $('#sub3menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});

    $('#sub4menu').css({'height':'0px','border': '0px solid rgba(0,0,0,.25)',
  'padding':'0px'});

  }

});


$('#pdf_viewer').dialog({
  resizable: true,
  autoOpen:false,
  height: 600,
  width: 900,
  // modal: true,
  show:{
    effect:'slide',
    duration:300,
  },
    hide:{
    effect:'blind',
    duration:300,
  }

});


$(document).on('click','.obj_sub_checkbox',function(){

if($(this).attr('data-layer_name')=='proekti'){
  if($(this).prop('checked')){
     map.addLayer(proekti);
  }
  else{
    map.removeLayer(proekti);
  }
}

if($(this).attr('data-layer_name')=='maktablar'){
  if($(this).prop('checked')){
     map.addLayer(maktablar);
  }
  else{
    map.removeLayer(maktablar);
  }
}

if($(this).attr('data-layer_name')=='objecti'){
  if($(this).prop('checked')){
     map.addLayer(objecti);
  }
  else{
    map.removeLayer(objecti);
  }
}
if($(this).attr('data-layer_name')=='proektirovchiki'){
  if($(this).prop('checked')){
     map.addLayer(proektirovchiki);
  }
  else{
    map.removeLayer(proektirovchiki);
  }
}

if($(this).attr('data-layer_name')=='zastroychiki'){
  if($(this).prop('checked')){
     map.addLayer(zastroychiki);
  }
  else{
    map.removeLayer(zastroychiki);
  }
}


});





function create_info_dialog_proektrovchik(id){
  var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'full_info');
  data.append("id",id);

$.ajax({
        url: "/proektirovchiki",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
        d=JSON.parse(data[0]['full_info']).features[0].properties;

text=`<button  class='btn select_proekt' data-own_inn='proektirovchik' data-tash_nomi="`+d.nomi+' '+d.txtash+`" data-inn='`+d.inn+`'>Ishtroki Реестр проектов </button>
<button class='btn select_object' data-own_inn='proektirovchik'  data-tash_nomi="`+d.nomi+' '+d.txtash+`" data-inn='`+d.inn+`'>Ishtroki Реестр объектов градостроительной</button>
<h4 style='text-align: center;''>LOYIHALOVCHI TASHKILOT HAQIDA BARCHA MA'LUMOTLAR</h4>
  <table class='table table-bordered full_info_table'>
<thead>
     <tr>
      <th>Tashkilot nomi</th>
      <th>Tashkilotning tashkiliy-huquqiy shakli</th>
      <th>Raxbar F.I.O</th>
      <th>STIR</th>
      <th colspan='2'>Yuridik manzil</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.nomi+`</td>
       <td>`+d.txtash+`</td>
       <td>`+d.raxbar+`</td>
       <td>`+d.inn+`</td>
       <td><img src='/static/img/img/location.png' data-dtype='setObject' data-ltype='/proektirovchiki' class='click_set_object' data-id='`+d.pk+`'></td>
       <td>`+d.adress+`</td>
       
    </tr>
  </tbody>
</table>
<table class='table table-bordered full_info_table'>
  <thead>
    <tr>
      <th>Kontakt</th>
      <th>Asosiy faoliyat turi</th>
      <th>IFUT kodi</th>
      <th>Mulkchilik shakli</th>   
      <th>Viloyat</th> 
      <th>Tuman</th>  
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.contact+`</td>
       <td>`+d.ifut+`</td>
       <td>`+d.ifut_kodi+`</td>
       <td>`+d.mulk_shakli+`</td>
       <td>`+d.viloyat+`</td>
       <td>`+d.tuman+`</td>
    </tr>
  </tbody>
</table> 
<table class='table table-bordered full_info_table'>
  <thead>
    <tr>
      <th colspan='4'>Litsenziya ma'lumorlari</th>  
    </tr>
    <tr>
      <th>Raqami</th>
      <th>Berilgan sana</th>
      <th>Amal qilish muddati</th>
      <th>Faoliyat turi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.litsenziya+`</td>
       <td>`+d.litsenziya_sana+`</td>
       <td>`+d.litsenziya_muddat+`</td>
       <td>`+d.litsenziya_ft+`</td>
    </tr>
  </tbody>
</table> 
<table class='table table-bordered full_info_table'>
  <thead>
    <tr>
      <th colspan='4'>Litsenziya ma'lumorlari</th> 
    </tr>
    <tr>
      <th>Kelishuv shartomasi raqami</th>
      <th>kelishuv shartnomasi sanasi</th>
      <th>Litsenziyalangan ishlar turi</th>
      <th>Qayta ro'yxatdan o'tkazish yoki chaqirib olish sababi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.litsenziya_kshr+`</td>
       <td>`+d.litsenziya_kshr_sana+`</td>
       <td>`+d.litsenziyalangan_ishlar+`</td>
       <td>`+d.litsenziya_qro+`</td>
    </tr>
  </tbody>
</table>`;


$('#dialog_table_info_all_p').html(text);

  $("#dialog_table_info_all_p").dialog({

       autoOpen: true,
       dialogClass:'dialog_table_info_all_p',
              resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table_info_all_p').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 600,
        width: 900
  });

        },
        error:function(){
          console.log("Ajaxda xatolik !!");
        }
      });
}
function create_info_dialog_zastroychik(id){
var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'full_info');
  data.append("id",id);
$.ajax({
        url: "/zastroychiki",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
        d=JSON.parse(data[0]['full_info']).features[0].properties;

text=`<button  class='btn select_proekt' data-own_inn='zastroychik' data-tash_nomi="`+d.nomi+' '+d.txtash+`" data-inn='`+d.inn+`'>Ishtroki Реестр проектов </button>
<button class='btn select_object' data-own_inn='zastroychik' data-tash_nomi="`+d.nomi+' '+d.txtash+`" data-inn='`+d.inn+`'>Ishtroki Реестр объектов градостроительной</button>

<h4 style='text-align: center;''>QURUVCHI TASHKILOT HAQIDA BARCHA MA'LUMOTLAR</h4>
  <table class='table table-bordered full_info_table'>
<thead>
     <tr>
      <th>Tashkilot nomi</th>
      <th>Tashkilotning tashkiliy-huquqiy shakli</th>
      <th>Raxbar F.I.O</th>
      <th>STIR</th>
      <th colspan='2'>Yuridik manzil</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.nomi+`</td>
       <td>`+d.txtash+`</td>
       <td>`+d.raxbar+`</td>
       <td>`+d.inn+`</td>
       <td><img src='/static/img/img/location.png' data-dtype='setObject' data-ltype='/zastroychiki' class='click_set_object' data-id='`+d.pk+`'></td>
       <td>`+d.adress+`</td>
       
    </tr>
  </tbody>
</table>
<table class='table table-bordered full_info_table'>
  <thead>
    <tr>
      <th>Kontakt</th>
      <th>Asosiy faoliyat turi</th>
      <th>IFUT kodi</th>
      <th>Mulkchilik shakli</th>   
      <th>Viloyat</th> 
      <th>Tuman</th>  
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.contact+`</td>
       <td>`+d.ifut+`</td>
       <td>`+d.ifut_kodi+`</td>
       <td>`+d.mulk_shakli+`</td>
       <td>`+d.viloyat+`</td>
       <td>`+d.tuman+`</td>
    </tr>
  </tbody>
</table> 
<table class='table table-bordered full_info_table'>
  <thead>
    <tr>
      <th colspan='4'>Litsenziya ma'lumorlari</th>  
    </tr>
    <tr>
      <th>Raqami</th>
      <th>Berilgan sana</th>
      <th>Amal qilish muddati</th>
      <th>Faoliyat turi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.litsenziya+`</td>
       <td>`+d.litsenziya_sana+`</td>
       <td>`+d.litsenziya_muddat+`</td>
       <td>`+d.litsenziya_ft+`</td>
    </tr>
  </tbody>
</table> 
<table class='table table-bordered full_info_table'>
  <thead>
    <tr>
      <th colspan='4'>Litsenziya ma'lumorlari</th> 
    </tr>
    <tr>
      <th>Kelishuv shartomasi raqami</th>
      <th>kelishuv shartnomasi sanasi</th>
      <th>Litsenziyalangan ishlar turi</th>
      <th>Qayta ro'yxatdan o'tkazish yoki chaqirib olish sababi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>`+d.litsenziya_kshr+`</td>
       <td>`+d.litsenziya_kshr_sana+`</td>
       <td>`+d.litsenziyalangan_ishlar+`</td>
       <td>`+d.litsenziya_qro+`</td>
    </tr>
  </tbody>
</table>`;


$('#dialog_table_info_all_z').html(text);

  $("#dialog_table_info_all_z").dialog({

       autoOpen: true,
       dialogClass:'dialog_table_info_all_z',
                     resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table_info_all_z').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 600,
        width: 900
  });

        },
        error:function(){
          console.log("Ajaxda xatolik !!");
        }
      });
}
$(document).on('click','.full_info_object',function(){
if($(this).attr('data-stype')=='proektirovchiki'){
create_info_dialog_proektrovchik($(this).attr('data-id'));
}
else if($(this).attr('data-stype')=='zastroychiki'){
  create_info_dialog_zastroychik($(this).attr('data-id'));
}
else if($(this).attr('data-stype')=='obj_proj'){

create_dialog_proj_obj($(this).attr('data-id'),$(this).attr('data-ptype'));

}  

});

function create_dialog_proj_obj(id,ptype){
  var data = new FormData();

  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'full_info');
  data.append("id",id);
  
$.ajax({
        url: "/proekti",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {

       d=JSON.parse(data[0]['full_info']).features[0].properties;
       p=JSON.parse(data[0]['proektrovchik']).features[0].properties;
       z=JSON.parse(data[0]['zastroychik']).features[0].properties;
            

text=`<h4 style='text-align:center;'>SUB'YEKTLAR HAQIDA MA'LUMOTLAR</h4>
<table class='table table-bordered full_info_table'>
<thead>
     <tr>
      <th>Tashkilot</th>
      <th>Nomi</th>
      <th>Tashkilotning tashkiliy-huquqiy shakli</th>
      <th>Raxbar F.I.O</th>
      <th>STIR</th>
      <th>Yuridik manzil</th> 
      <th>To'liq</th>     
    </tr>
    <tr>
    
    </tr>
  </thead>
  <tbody>
    <tr>
       <td class='th' ><b>Loyihalovchi</b></td>       
       <td>`+p.nomi+`</td>
       <td>`+p.txtash+`</td>
       <td>`+p.raxbar+`</td>
       <td>`+p.inn+`</td>
       <td>`+p.adress+`</td>
       <td><button class='btn full_info_object' data-stype='proektirovchiki' data-id='`+p.pk+`'>Ko'rish</button></td>
    </tr>
      <tr>
       <td class='th' ><b>Quruvchi</b></td>       
       <td>`+z.nomi+`</td>
       <td>`+z.txtash+`</td>
       <td>`+z.raxbar+`</td>
       <td>`+z.inn+`</td>
       <td>`+z.adress+`</td>
       <td><button class='btn full_info_object' data-stype='zastroychiki' data-id='`+z.pk+`'>Ko'rish</button></td>
    </tr>
  </tbody>
</table>

<h4 style='text-align:center;'>PROEKT HAQIDA TO'LIQ MA'LUMOTLAR</h4>
<table class='table table-bordered full_info_table'>
<thead>
     <tr>
      <th>Tashkilot nomi</th>
      <th colspan='2'>Manzil</th>
      <th>Qurulish turi</th> 
      <th>Qurulish usuli</th> 
      <th>ШКН bilan mosligi</th>      
    </tr>
    <tr>
    
    </tr>
  </thead>
  <tbody>
      <tr>
       <td>`+d.nomi+`</td>
       
       <td><img src="/static/img/img/location.png" data-dtype="setObject" data-ltype="/proekti" class="click_set_object" data-id="`+d.pk+`"></td>
       <td>`+d.adress+`</td>
       <td>`+d.qurulish_turi+`</td>
       <td>`+d.qurulish_kurinishi+`</td>
       <td>`+d.psd_muofiqligi+`</td>
      </tr>
  </tbody>
</table>

<table class='table table-bordered full_info_table'>
<thead>
     <tr>
       <th>Homimiyat qarori</th>
      <th>АПЗ nomeri va sanasi</th>
      <th>АПЗ ijrochi</th>
      <th>Pratakol sovet</th>
      <th>Ekspert xulosasi</th>
      <th>ПСД davri</th> 
 
    </tr>
    <tr>
    
    </tr>
  </thead>
  <tbody>
      <tr>
       <td>`+d.hokimiyat_qarori+`</td>
       <td>`+d.apz_sana+`</td>
       <td>`+d.apz_ijrochisi+`</td>
       <td>`+d.pratakol_davlat_qurulish+`</td>
       <td>`+d.ekspert_xulosasi+`</td>
       <td>`+d.psd_ishlab_chiqiligan_sana+`</td>
    </tr>
  </tbody>
</table>

<table class='table table-bordered full_info_table'>
<thead>
     <tr>
      <th colspan='8'>Texnik iqtisodiy ko'rsatgichlar</th>      
    </tr>
    <tr>
      <th rowspan='2'>Loyiha quvvati</th> 
      <th colspan='3'>Maydon</th>
      <th rowspan='2'>Qurulish hajmi (m3)</th>
      <th colspan='3'>Smeta narxi</th>
    </tr>
    <tr>
     <th>uchatka (ga)</th> 
     <th>zastroyka (m2)</th> 
     <th>polezniya (m2)</th> 
     <th>obshaya (mln.sum)</th> 
     <th>1 m2 narxi (ming sum)</th> 
     <th>1 m3 narxi (ming sum)</th> 
    </tr>
  </thead>
  <tbody>
      <tr>
       <td>`+d.quvvati+`</td>
       <td>`+d.uchastka_maydoni+`</td>
       <td>`+d.zastroyki_maydoni+`</td>
       <td>`+d.poleznay_maydoni+`</td>
       <td>`+d.bino_qurulish_obyomi+`</td>
       <td>`+d.umumiy_narx+`</td>
       <td>`+d.m2_narxi+`</td>
       <td>`+d.m3_narxi+`</td>
    </tr>
  </tbody>
</table>

<table class='table table-bordered full_info_table'>
<thead>
     <tr>
      <th colspan='6'>Asosiy kanstruktsiya yechimlari</th>      
    </tr>
    <tr>
      <th rowspan='2'>Etajlar soni </th> 
      <th rowspan='2'>Padval borligi</th>
      <th colspan='4'>Konstruktivniy tipi</th>

    </tr>
    <tr>
     <th>Tom</th> 
     <th>Poydevor</th> 
     <th>Devor</th> 
     <th>Fasad</th> 
    </tr>
  </thead>
  <tbody>
      <tr>
       <td>`+d.qavatlar_soni+`</td>
       <td>`+d.padval+`</td>
       <td>`+d.tom+`</td>
       <td>`+d.poydevor+`</td>
       <td>`+d.devor+`</td>
       <td>`+d.devor_sirti+`</td>
    </tr>
  </tbody>
</table>`;

if(ptype=='object'){
text+=`<h4 style='text-align:center;'>PROEKTNING MOLIYAVIY MA'LUMOTLARI</h4>
<table class='table table-bordered full_info_table'>
<thead>
    <tr>
      <th>Yerga bulgan huquqi</th> 
      <th>Smeta narxi (mln.sum)</th> 
      <th>СМР narxi (mln.sum)</th>
      <th >Yil bo'yicha СМР bashorati (mln.sum)</th>
      <th >Moliya manbasi (KFS)</th>
      <th >Kontrakt narxi (mln.sum)</th>

    </tr>
  </thead>
  <tbody>
      <tr>
       <td>`+d.yer_huquqi+`</td>
       <td>`+d.umumiy_narx+`</td>
       <td>`+d.smp_narxi+`</td>
       <td>`+d.smpning_yildagi_pragnozi+`</td>
       <td>`+d.kfs_buyicha_maliya_manbasi+`</td>
       <td>`+d.kontrak_narxi+`</td>
    </tr>
  </tbody>
</table>

<table class='table table-bordered full_info_table'>
<thead>
<tr>
<th colspan='4'> Nomer i data resheniya</th>
</tr>
    <tr>
      <th>Instruksiya po realizatsiya invest.proekt</th> 
      <th>Yer ajratish bo'yicha  hokimiyat qarori</th> 
      <th>Ha perellelnoe proektrivanie</th>
      <th >Tendor komissiyasi</th>
    </tr>
  </thead>
  <tbody>
      <tr>
       <td>`+d.investetsiya_loyihasi+`</td>
       <td>`+d.hokimiyat_qarori+`</td>
       <td>`+d.perellel_proyekt+`</td>
       <td>`+d.tender_komessiya+`</td>
    </tr>
  </tbody>
</table>

<table class='table table-bordered full_info_table'>
<thead>
    <tr>
      <th>Mas'ul shaxslar</th> 
      <th>FIO</th> 
      <th>Kontakt</th>
      <th>Qaror</th>
    </tr>
  </thead>
  <tbody>
      <tr>
       <td class='th'>Texnadzor zakazchik</td>
       <td>`+d.zakazchik_texnadzor_fio+`</td>
       <td>`+d.zakazchik_texnadzor_tel+`</td>
       <td>`+d.zakazchik_texnadzor_buyruq+`</td>
    </tr>
          <tr>
       <td class='th'>Avtorskiy nadzor</td>
       <td>`+d.avtorskiy_nadzor_fio+`</td>
       <td>`+d.avtorskiy_nadzor_tel+`</td>
       <td>`+d.avtorskiy_nadzor_buyruq+`</td>
    </tr>
          <tr>
       <td class='th'>Proezvodetel rabor</td>
       <td>`+d.quruvchi_fio+`</td>
       <td>`+d.quruvchi_tel+`</td>
       <td>`+d.quruvchi_buyruq+`</td>
    </tr>
          <tr>
       <td class='th'>Inspektor GASN</td>
       <td>`+d.inspektor_gasn_fio+`</td>
       <td>`+d.inspektor_gasn_tel+`</td>
       <td>`+d.inspektor_gasn_buyruq+`</td>
    </tr>
  </tbody>
</table>
`;

$('#dialog_table_info_obj_all').html(text);
    

$("#dialog_table_info_obj_all").dialog({

       autoOpen: true,
       dialogClass:'dialog_table_info_obj_all',
                     resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table_info_obj_all').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 800,
        width: 1100
  });

}
else{

$('#dialog_table_info_proj_all').html(text);
    

$("#dialog_table_info_proj_all").dialog({

       autoOpen: true,
       dialogClass:'dialog_table_info_proj_all',
                     resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table_info_proj_all').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 800,
        width: 1100
  });


}

        },
          error:function(){
            console.log('Ajaxda xatolik!!');
          }
        });

}



$(document).on('click','.select_proekt',function(){

var title=$(this).attr('data-tash_nomi')+" ---";

create_table_proekt($(this),'for_list',$(this).attr('data-own_inn'),'proekt',$(this).attr('data-inn'),"/proekti",title);

});


$(document).on('click','.select_object',function(){

var title=$(this).attr('data-tash_nomi')+" ----------objects";
create_table_object($(this),'for_list',$(this).attr('data-own_inn'),'object',$(this).attr('data-inn'),"/proekti",title);

});



$(document).on('click','.info_table',function(){
  $(this).css({'cursor':'wait'});
$('#search-field').val('');

if($(this).attr('data-layer_name')=='proekti'){
var title="Ro'yxatdan o'tgan proektlar ro'yxati";
create_table_proekt($(this),'for_list','all','proekt','inn',"/proekti",title);
}
else if($(this).attr('data-layer_name')=='objecti'){
var title="Ro'yxatdan o'tgan va qurulayaotgan obyektlar ro'yxati";
create_table_object($(this),'for_list','all','object','inn',"/proekti",title);
}
else if($(this).attr('data-layer_name')=='proektirovchiki'){

 var text='';
   text+=`<tr id='table_head'>
   <td >№</td>
   <td >Info</td>
   <td >Tashkilot nomi</td>
   <td >Tashkilotning tashkiliy-huquqiy shakli</td>
   <td >STIR</td>
   <td >Manzili</td>
   <td >Viloyat</td>
   </tr>`;

 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'for_list');

$.ajax({
        url: "/proektirovchiki",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
          var itr=1;
        var d=data['list'];
           for(var x in d){
      text+=`<tr>
      <td style='text-align:center;'>`+itr+`
    <br><img src='/static/img/img/location.png' data-dtype='setObject' data-ltype='/proektirovchiki' class='click_set_object' data-id='`+d[x]['id']+`'></td>
      <td><button class='btn full_info_object' data-stype='proektirovchiki' data-id='`+d[x]['id']+`'>Ko'rish</button></td>
      <td>`+d[x]['nomi']+`</td>
      <td>`+d[x]['txtash']+`</td>
      <td>`+d[x]['inn']+`</td>
      <td>`+d[x]['adress']+`</td>
      <td>`+d[x]['viloyat']+`</td>
      <td style='display:none;' >`+itr+`</td>
      </tr>`;
      itr++;
        }


$('#item-count0').html("Barcha ob'yektlar soni:"+data['list'].length+"<br>");
$('#to_pdf0').attr('dtype','proektirovchiki');
$('#to_xlsx0').attr('dtype','proektirovchiki');
$('#title_table0').html("Списка проектуровщики");
var select_items=`<option selected value='-1'>Barcha ustunlardan</option>
                  <option value='2'>Nomi bo'yicha</option>
                  <option value='4'>INN nomeri bo'yicha</option>
                  <option value='5'>Manzil bo'yicha</option>
                  <option value='6'>Viloyat bo'yicha</option>`;


$('#search-field-id0').html(select_items);
$('#table-info0').html(text);

  $("#dialog_table0").dialog({
    title:"Списка проектуровщики",

       autoOpen: true,
       dialogClass:'dialog_table0',

      resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table0').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 700,
        width: 1000
  });
document.getElementById("table-info-div-id0").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id0');
tablecont.addEventListener('scroll',scrollHendle);
      
        },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
      });
 }

if($(this).attr('data-layer_name')=='zastroychiki'){

 var text='';
   text+=`<tr id='table_head'>
   <td >№</td>
   <td >Info</td>
   <td >Tashkilot nomi</td>
   <td >Tashkilotning tashkiliy-huquqiy shakli</td>
   <td >STIR</td>
   <td >Manzili</td>
   <td >Viloyat</td>
   </tr>`;

 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'for_list');

$.ajax({
        url: "/zastroychiki",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
          var itr=1;
        var d=data['list'];
           for(var x in d){
      text+=`<tr>
      <td style='text-align:center;'>`+itr+`
    <br><img src='/static/img/img/location.png' data-dtype='setObject' data-ltype='/zastroychiki' class='click_set_object' data-id='`+d[x]['id']+`'></td>
      <td><button class='btn full_info_object' data-stype='zastroychiki' data-id='`+d[x]['id']+`'>Ko'rish</button></td>
      <td>`+d[x]['nomi']+`</td>
      <td>`+d[x]['txtash']+`</td>
      <td>`+d[x]['inn']+`</td>
      <td>`+d[x]['adress']+`</td>
      <td>`+d[x]['viloyat']+`</td>
      <td style='display:none;' >`+itr+`</td>
      </tr>`;
      itr++;
        }


$('#item-count0').html("Barcha ob'yektlar soni:"+data['list'].length+"<br>");
$('#to_pdf0').attr('dtype','zastroychiki');
$('#to_xlsx0').attr('dtype','zastroychiki');
$('#title_table0').html("Списка zastroychiki");

var select_items=`<option selected value='-1'>Barcha ustunlardan</option>
                  <option value='2'>Nomi bo'yicha</option>
                  <option value='4'>INN nomeri bo'yicha</option>
                  <option value='5'>Manzil bo'yicha</option>
                  <option value='6'>Viloyat bo'yicha</option>`;


$('#search-field-id0').html(select_items);
$('#table-info0').html(text);

  $("#dialog_table0").dialog({
    title:"zastroychiki",
    dialogClass:'dialog_table0',

       autoOpen: true,
                     resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table0').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        },
        height: 700,
        width: 1000
  });

  document.getElementById("table-info-div-id0").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id0');
tablecont.addEventListener('scroll',scrollHendle);
      
        },
        error:function(){
          console.log('Ajaxda xatolik!!');
        }
      });



 }


});



$("#dialog_maktab_info").dialog({
  width:400,
  height:640,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen: false,
  dialogClass:'dialog_maktab_info',
  resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_maktab_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
        show: {
          effect: "blind",
          duration: 300,
        },
        hide: {
          effect: "slide",
          duration: 300,
        }
  });


$("#dialog_maktab_qur_info").dialog({
  width:900,
  height:640,
  autoOpen:false,
  dialogClass:'dialog_maktab_qur_info',

  create:function(e)
  {
    $('.dialog_maktab_qur_info').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
  },
    show: {
          effect: "blind",
          duration: 300,
          },
    hide: {
          effect: "slide",
          duration: 300,
          }
});



   var openstreetmap = new L.TileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');

// map.options.crs=L.CRS.EPSG3395;
// map.options.crs=L.CRS.EPSG3857;

// var yandex=L.tileLayer('http://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU', {
//     subdomains: ['01', '02', '03', '04'],
//     attribution: '<a http="yandex.ru" target="_blank">Яндекс</a>',
//     reuseTiles: true,
//     updateWhenIdle: false
//   }
// );

      var  googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
           });

         var googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
              maxZoom: 20,
              subdomains:['mt0','mt1','mt2','mt3']
          });
        var  googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
              maxZoom: 20,
              subdomains:['mt0','mt1','mt2','mt3']
          });

        var  googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
        maxZoom: 20,
         subdomains:['mt0','mt1','mt2','mt3']
          });


var openstreetmap_topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
});



map.addLayer(googleStreets);

var mytile= L.tileLayer.wms("/geocache/", {

        layers: 'dshk:orto_yangibozor',
        format: 'image/png',
        maxZoom: 20,
        minZoom: 1,
        zIndex:2,
        transparent: true,
    });

L.Control.boxzoom({ position:'topleft' }).addTo(map);


var maktablar = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:maktablar',
            format: 'image/png',
            transparent: true,
          
        });

var red_lines= L.nonTiledLayer.wms("/geodata/", {
        layers: 'dshk:red_lines',
        format: 'image/png',
        maxZoom: 20,
        minZoom: 1,
        zIndex: 2,
        opacity: 0.8,        
        transparent: true,
    });


  

var geologik_rayonlash= L.tileLayer.wms("/geodata/", {
        layers: 'dshk:geologik_rayonlash',
        format: 'image/png',
        maxZoom: 20,
        minZoom: 1,
        opacity: 0.8,
        zIndex:2,
        transparent: true
    });


var apot = L.nonTiledLayer.wms();
var apot_edit = L.nonTiledLayer.wms();
var funk_zones_po_apot=L.nonTiledLayer.wms(); 

var genplan = L.nonTiledLayer.wms();
var genplan_edit = L.nonTiledLayer.wms();
var genplan_geotiff=new Array();
var genplan_edit_geotiff=new Array();

var funk_zones_po_genplan=L.nonTiledLayer.wms(); 

var pdp = L.nonTiledLayer.wms();
var pdp_edit = L.nonTiledLayer.wms();
var pdp_geotiff=new Array();
var pdp_edit_geotiff=new Array();



for (var i=0;i<50;i++){
genplan_geotiff[i]=L.tileLayer.wms();
genplan_edit_geotiff[i]=L.tileLayer.wms();

pdp_geotiff[i]=L.tileLayer.wms();
pdp_edit_geotiff[i]=L.tileLayer.wms();
}

$(document).on('click','.view_pdf_file',function(){

var folder = $(this).attr('data-folder') 
var filename=$(this).attr('data-file');
  $('#myIframe').attr("src","/static/pdf_viewer/web/viewer.html?file=/static/"+folder+"/"+filename+"");
  $('#pdf_viewer').dialog('open');
 
});



// $(document).on('click','.checkbox_geotiff', function(){


// if($(this).prop("checked")){
//   if(map.hasLayer(genplan)){
//     map.removeLayer(genplan);
//   }
//   console.log($(this).attr('data-layer_id'));

// genplan_geotiff[$(this).attr('data-layer_id')] = L.nonTiledLayer.wms('/geodata/', {
//             opacity: $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").val()/10,
//             layers: 'dshk:'+$(this).attr('data-layer_name'),
//             format: 'image/png',
//             zIndex: $(this).attr('data-layer_id'),
//             maxZoom:20,
//             transparent: true,
//         }).addTo(map);

// $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",false);


// }
// else{
//   $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",true);
//   map.removeLayer(genplan_geotiff[$(this).attr('data-layer_id')]);
//   var c=0;
 
//    $('.checkbox_geotiff').each(function(){
//   if($(this).prop('checked'))
//     c++;
// });
//    if(c==0){
//     map.addLayer(genplan);
//    }
// }

// });


$(document).on('click','.checkbox_geotiff_pdp', function(){


if($(this).prop("checked")){
  if(map.hasLayer(pdp)){
    map.removeLayer(pdp);
  }

pdp_geotiff[$(this).attr('data-layer_id')] = L.tileLayer.wms('/geocache', {
            opacity: $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").val()/10,
            layers: 'dshk:'+$(this).attr('data-layer_name'),
            format: 'image/png',
            zIndex: $(this).attr('data-layer_id'),
            maxZoom:20,
            transparent: true,
        }).addTo(map);

$("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",false);


}
else{
  $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",true);
  map.removeLayer(pdp_geotiff[$(this).attr('data-layer_id')]);
  var c=0;
 
   $('.checkbox_geotiff_pdp').each(function(){
  if($(this).prop('checked'))
    c++;
});
   if(c==0&&$('#checkbox_id_2_3_2').prop('checked')){
    map.addLayer(pdp);
   }
}

});


$(document).on('click','.checkbox_geotiff_pdp_edit', function(){

if($(this).prop("checked"))
{
  if(map.hasLayer(pdp_edit)){
    map.removeLayer(pdp_edit);
}
pdp_edit_geotiff[$(this).attr('data-layer_id')] = L.tileLayer.wms('/geocache', {

            opacity: $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").val()/10,
            layers: 'dshk:'+$(this).attr('data-layer_name'),
            format: 'image/png',
            zIndex: $(this).attr('data-layer_id'),
            maxZoom:20,
            transparent: true,
        }).addTo(map);

$("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",false);

}
else{
  $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",true);
  map.removeLayer(pdp_edit_geotiff[$(this).attr('data-layer_id')]);
  var c=0;
 
   $('.checkbox_geotiff_pdp_edit').each(function(){
  if($(this).prop('checked'))
    c++;
});
   if(c==0&&$('#checkbox_id_2_3_2_1').prop('checked')){
    map.addLayer(pdp_edit);
   }
}

});



$(document).on('click','.checkbox_geotiff_genplan', function(){


if($(this).prop("checked")){
  if(map.hasLayer(genplan)){
    map.removeLayer(genplan);
  }

genplan_geotiff[$(this).attr('data-layer_id')] = L.tileLayer.wms('/geocache', {
            opacity: $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").val()/10,
            layers: 'dshk:'+$(this).attr('data-layer_name'),
            format: 'image/png',
            zIndex: $(this).attr('data-layer_id'),
            maxZoom:20,
            transparent: true,
        }).addTo(map);

$("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",false);


}
else{
  $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",true);
  map.removeLayer(genplan_geotiff[$(this).attr('data-layer_id')]);
  var c=0;
 
   $('.checkbox_geotiff_genplan').each(function(){
  if($(this).prop('checked'))
    c++;
});
   if(c==0&&$('#checkbox_id_2_3_1').prop('checked')){
    map.addLayer(genplan);
}
}

});


$(document).on('click','.checkbox_geotiff_genplan_edit', function(){


if($(this).prop("checked")){
  if(map.hasLayer(genplan_edit)){
    map.removeLayer(genplan_edit);
  }

genplan_edit_geotiff[$(this).attr('data-layer_id')] = L.tileLayer.wms('/geocache', {
            opacity: $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").val()/10,
            layers: 'dshk:'+$(this).attr('data-layer_name'),
            format: 'image/png',
            zIndex: $(this).attr('data-layer_id'),
            maxZoom:20,
            transparent: true,
        }).addTo(map);

$("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",false);


}
else{
  $("input[data-layer_id='"+$(this).attr('data-layer_id')+"'][type='range']").attr("disabled",true);
  map.removeLayer(genplan_edit_geotiff[$(this).attr('data-layer_id')]);
  var c=0;
 
   $('.checkbox_geotiff_genplan_edit').each(function(){
  if($(this).prop('checked'))
    c++;
});
   if(c==0&&$('#checkbox_id_2_3_1_1').prop('checked')){
    map.addLayer(genplan_edit);
   }
}

});








$(document).on('click','.button_pdf_viewer', function(){
  var filename=$(this).attr('data-filename');
$('#myIframe').attr("src","/static/pdf_viewer/web/viewer.html?file=/"+mydecode(filename)+"");
  $('#pdf_viewer').dialog('open');
});


$(document).on('change','.change_opacity_pdp', function(e){
  if(map.hasLayer(pdp))
  pdp.setOpacity($(this).val()/10);
// if(map.hasLayer(genplan_click))
//   genplan_click.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_pdp_edit', function(e){
  if(map.hasLayer(pdp_edit))
  pdp_edit.setOpacity($(this).val()/10);
// if(map.hasLayer(genplan_click))
//   genplan_click.setOpacity($(this).val()/10);
});


$(document).on('change','.change_opacity_geotiff_pdp', function(e){
  pdp_geotiff[$(this).attr('data-layer_id')].setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_geotiff_pdp_edit', function(e){
  pdp_edit_geotiff[$(this).attr('data-layer_id')].setOpacity($(this).val()/10);
});



$(document).on('change','.change_opacity_genplan', function(e){
  if(map.hasLayer(genplan))
  genplan.setOpacity($(this).val()/10);
// if(map.hasLayer(genplan_click))
//   genplan_click.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_genplan_edit', function(e){
  if(map.hasLayer(genplan_edit))
  genplan_edit.setOpacity($(this).val()/10);
// if(map.hasLayer(genplan_click))
//   genplan_click.setOpacity($(this).val()/10);
});


$(document).on('change','.change_opacity_geotiff_genplan', function(e){
  genplan_geotiff[$(this).attr('data-layer_id')].setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_geotiff_genplan_edit', function(e){
  genplan_edit_geotiff[$(this).attr('data-layer_id')].setOpacity($(this).val()/10);
});



$(document).on('change','.change_opacity_apot', function(e){
   if(map.hasLayer(apot))
  apot.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_apot_edit', function(e){
   if(map.hasLayer(apot_edit))
  apot_edit.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_funk_zone_po_genplan', function(e){
   funk_zones_po_genplan.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_geologik_rayonlash', function(e){
   geologik_rayonlash.setOpacity($(this).val()/10);
});


$(document).on('change','.change_opacity_funk_zone_po_apot', function(e){
   funk_zones_po_apot.setOpacity($(this).val()/10);
});


$(document).on('click','.info_maktab_qur_mal',function(){

  var data = new FormData();
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("kod",$(this).attr('data-kod'));

$.ajax({
        url: 'info_maktab',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        beforeSend: function () {
        },
        success: function (data) {
          if(data!=0){
          var text=`<table class='table table-bordered table-striped'>
          <tr><td>ajratilgan_yer_maydoni_ga</td><td>`+data['ajratilgan_yer_maydoni_ga']+`</td></tr>
          <tr><td>art_1_2_nomi_raqami_va_sanasi</td><td>`+data['art_1_2_nomi_raqami_va_sanasi']+`</td></tr>
          <tr><td>arxitektura_kengashi_raqami_va_sanasi</td><td>`+data['arxitektura_kengashi_raqami_va_sanasi']+`</td></tr>
          <tr><td>bino_korpus_nomi_yoki_raqami</td><td>`+data['bino_korpus_nomi_yoki_raqami']+`</td></tr>
          <tr><td>binoning_foydali_maydoni_m_kv</td><td>`+data['binoning_foydali_maydoni_m_kv']+`</td></tr>
          <tr><td>binoning_qurilish_maydoni_m_kv</td><td>`+data['binoning_qurilish_maydoni_m_kv']+`</td></tr>
          <tr><td>binoning_qurilish_xajmi_m_kub</td><td>`+data['binoning_qurilish_xajmi_m_kub']+`</td></tr>
          <tr><td>bosh_pudratshi</td><td>`+data['bosh_pudratshi']+`</td></tr>
          <tr><td>daqnning_ruxsatnoma_raqami_va_sanasi</td><td>`+data['daqnning_ruxsatnoma_raqami_va_sanasi']+`</td></tr>
          <tr><td>devor_konstruktsiyasi</td><td>`+data['devor_konstruktsiyasi']+`</td></tr>
          <tr><td>ekspertiza_xulosasining_raqami_va_sanasi</td><td>`+data['ekspertiza_xulosasining_raqami_va_sanasi']+`</td></tr>
          <tr><td>ertula_mavjudligi</td><td>`+data['ertula_mavjudligi']+`</td></tr>
          <tr><td>foydalanishga_qabul_qilish_togrisidagi_qaror_raqami_va_sanasi</td><td>`+data['foydalanishga_qabul_qilish_togrisidagi_qaror_raqami_va_sanasi']+`</td></tr>
          <tr><td>loyiha_smeta_nomi_va_raqami</td><td>`+data['loyiha_smeta_nomi_va_raqami']+`</td></tr>
<tr><td>muassasaning_tuliq_nomi</td><td>`+data['muassasaning_tuliq_nomi']+`</td></tr>
<tr><td>obektning_kadastr_raqami</td><td>`+data['obektning_kadastr_raqami']+`</td></tr>
<tr><td>obektning_loyixa_quvvati</td><td>`+data['obektning_loyixa_quvvati']+`</td></tr>
<tr><td>poydevor_turi</td><td>`+data['poydevor_turi']+`</td></tr>
<tr><td>qavatlar_soni</td><td>`+data['qavatlar_soni']+`</td></tr>
<tr><td>qurilgan_rek_ya_qilingan_yili</td><td>`+data['qurilgan_rek_ya_qilingan_yili']+`</td></tr>
 <tr><td>qurilish_turi_yangi_qurilish_rekonstruktsiya</td><td>`+data['qurilish_turi_yangi_qurilish_rekonstruktsiya']+`</td></tr>
<tr><td>qurilishni_moliyalashtirish_manbai</td><td>`+data['qurilishni_moliyalashtirish_manbai']+`</td></tr>
<tr><td>qurilishni_umumiy_qiymati_mln_som</td><td>`+data['qurilishni_umumiy_qiymati_mln_som']+`</td></tr>
<tr><td>shundan_byudjet_mablaglari_mln_som</td><td>`+data['shundan_byudjet_mablaglari_mln_som']+`</td></tr>
 <tr><td>tashqi_pardoz_turi</td><td>`+data['tashqi_pardoz_turi']+`</td></tr>
<tr><td>tom_yopma_turi</td><td>`+data['tom_yopma_turi']+`</td></tr>
<tr><td>xokim_yer_ajratish_tugrisidagi_qaror_raqami_va_sanasi</td><td>`+data['xokim_yer_ajratish_tugrisidagi_qaror_raqami_va_sanasi']+`</td></tr>

          </table>`;


          $('#dialog_maktab_qur_info').html(text);

          $('#dialog_maktab_qur_info').dialog('open');
          document.getElementById("dialog_maktab_qur_info").scrollTop = 0;
        }
        else{
alert("Qurulish ma'lumoti berilmagan !!");
        }
        }});

});
ms_url="/geodata/?";
ms_url2="/geodata?";
var popup=L.popup();

map.on('click',function(e){

$('#layer_control').css({'width':'0px','height':'0px','border':'0px solid rgba(0,0,0,.25)','padding':'0px'});
$('#all_maps').attr('data-val','0');



var latlngStr = '(' + e.latlng.lat.toFixed(5) + ', ' +e.latlng.lng.toFixed(5) + ')';

var BBOX =map.getBounds()._southWest.lng+","+map.getBounds()._southWest.lat+","+map.getBounds()._northEast.lng+","
+map.getBounds()._northEast.lat;

var WIDTH= map.getSize().x;
var HEIGHT = map.getSize().y;
var X = map.layerPointToContainerPoint(e.layerPoint).x;
var Y = map.layerPointToContainerPoint(e.layerPoint).y;

if(map.hasLayer(maktablar)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:maktablar&QUERY_LAYERS=dshk:maktablar&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
if(data.features.length){

var text=`<p style='font-size:16px; color:rgba(0,0,0,0.7); font-weight:bold;text-align:center;'>`+data.features[0].properties.uquv_muassasasining_tuliq_nomi+`</p>
<table class='table table-bordered table-striped'>
<tr><td>O'quv muassasasi nomi</td><td>`+data.features[0].properties.uquv_muassasasining_tuliq_nomi+`</td></tr>
<tr><td>Viloyat</td><td>`+data.features[0].properties.viloyat_nomi+`</td></tr>
<tr><td>Tuman, shahar nomi</td><td>`+data.features[0].properties.tuman_shahar_nomi+`</td></tr>
<tr><td>Joylashgan manzili</td><td>`+data.features[0].properties.joylashgan_joyi_manzili+`</td></tr>
<tr><td>O'quv muassasasining turi</td><td>`+data.features[0].properties.uquv_muassasasining_turi+`</td></tr>
<tr><td>O'quv muassasasining tashkil topgan yili</td><td>`+data.features[0].properties.uquv_muassasasining_tashkil_topgan_yili+`</td></tr>
<tr><td>Qurilgan yili</td><td>`+data.features[0].properties.qurilgan_yili+`</td></tr>
<tr><td>Loyihaviy quvvati</td><td>`+data.features[0].properties.loyihaviy_quvvati+`</td></tr>
<tr><td>O'quv_smenlari_soni</td><td>`+data.features[0].properties.uquv_smenlari_soni+`</td></tr>
<tr><td>Ixtisoslashtirilgan yo'nalishi</td><td>`+data.features[0].properties.ixtisoslashtirilgan_yunalishi+`</td></tr>
<tr><td>Loyihani ko'rish</td><td>`+data.features[0].properties.loyihani_kurish+`</td></tr>
<tr><td>Qurulish ma'lumotlari</td><td><p class='info_maktab_qur_mal btn btn-success'  data-kod='`+data.features[0].properties.kod+`'>Ko'rish</p></td></tr>

</table>

`;

$("#dialog_maktab_info").html(text);

$("#dialog_maktab_info").dialog('open');
document.getElementById("dialog_maktab_info").scrollTop = 0;

      }

      }
   });
}


if(map.hasLayer(proektirovchiki)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:proekterovchiki_dshk&QUERY_LAYERS=dshk:proekterovchiki_dshk&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
if(data.features.length){
create_info_dialog_proektrovchik((data.features[0].id).split('.')[1]);
      }

      }
    });
}

if(map.hasLayer(zastroychiki)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:zastroychiki_dshk&QUERY_LAYERS=dshk:zastroychiki_dshk&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
if(data.features.length){
create_info_dialog_zastroychik((data.features[0].id).split('.')[1]);
      }

      }
    });
}


if(map.hasLayer(objecti)||map.hasLayer(proekti)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:proekti_dshk&QUERY_LAYERS=dshk:proekti_dshk&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
if(data.features.length){
  if(data.features[0].properties.gasn_registr_sana!=null){
create_dialog_proj_obj((data.features[0].id).split('.')[1],'object');
}
else{
create_dialog_proj_obj((data.features[0].id).split('.')[1],'proekti');
}
      }

      }
    });
}

if(map.hasLayer(funk_zones_po_genplan)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:funk_zones_po_genplan&QUERY_LAYERS=dshk:funk_zones_po_genplan&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
        if(data.features.length){
text=`<p>Karta ko'rinish holatini sozlash </p>
<input type='range' min=0 max=10 value=8 class='change_opacity_funk_zone_po_genplan' ><br>`;

text+=`<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >
<tr><td>Zonalarning nomi</td><td>`+data.features[0].properties.zonalarning_nomi+`</td></tr>
<tr><td>Mavjud umoratlarning tavsifi(asosan)</td><td>`+data.features[0].properties.mavjud_imoratlarning_tavsifi_asosan+`</td></tr>
<tr><td>Shaharsozlik faoliyatining ruxsat etilgan turi</td><td>`+data.features[0].properties.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</td></tr>
<tr><td>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</td><td>`+data.features[0].properties.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</td></tr>
<tr><td>Shaharsozlik faoliyatining taqiqlangan turi</td><td>`+data.features[0].properties.shaharsozlik_faoliyatining_taqiqlangan_turi+`</td></tr>
<tr><td>Funksional zonalarning maydoni(ga)</td><td>`+data.features[0].properties.funktsional_zonalarning_maydoni_ga+`</td></tr>
</table>`;

$('#popup_dialog_funk_zones_po_genplan').html(text);

  $('#popup_dialog_funk_zones_po_genplan').dialog('open');
    document.getElementById("popup_dialog_funk_zones_po_genplan").scrollTop = 0;
      }
      }
    });
}
if(map.hasLayer(geologik_rayonlash)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:geologik_rayonlash&QUERY_LAYERS=dshk:geologik_rayonlash&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
        if(data.features.length){
text=`<p>Karta ko'rinish holatini sozlash </p>
<input type='range' min=0 max=10 value=8 class='change_opacity_geologik_rayonlash' ><br>`;

text+=`<table class = "table table-bordered table_geologik_rayonlash"  style = "font-size:15px; overflow-x: hidden !important;" >
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
<td>`+data.features[0].properties.injenerlik_geologik_viloyat_indeksi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_viloyat_tavsifi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_hududlar_indeksi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_hududlar_tavsifi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_kichik_hududlar_indeksi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_kichik_hududlar_tavsifi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_uchastkalar_indeksi+`</td>
<td>`+data.features[0].properties.injenerlik_geologik_uchastkalar_tavsifi+`</td>
<td>`+data.features[0].properties.hududlarning_geologik_genetik_tavsifi+`</td>
<td>`+data.features[0].properties.hududdagi_geodinamik_jarayonlar+`</td>
<td>`+data.features[0].properties.tavsiya_etiladigan_injenerlik_tadbirlari+`</td>
<td>`+data.features[0].properties.gruntlarning_seysmik_xususiyatlari_buyicha_toifasi+`</td>

</tr>
</table>`;

$('#popup_dialog_geologik_rayonlash').html(text);

  $('#popup_dialog_geologik_rayonlash').dialog('open');
    document.getElementById("popup_dialog_geologik_rayonlash").scrollTop = 0;
      }
      }
    });
}



if(map.hasLayer(funk_zones_po_apot)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:funk_zones_po_apot&QUERY_LAYERS=dshk:funk_zones_po_apot&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
        if(data.features.length){
text=`<p>Karta ko'rinish holatini sozlash </p>
<input type='range' min=0 max=10 value=8 data-layer_name=`+data.features[0].id.split('_')[0]+` class='change_opacity_funk_zone_po_apot' ><br>`;

text+=`<table class = "table table-bordered table-striped"  style = "font-size:15px; overflow-x: hidden !important;" >
<tr><td>Zonalarning nomi</td><td>`+data.features[0].properties.zonalarning_nomi+`</td></tr>
<tr><td>Mavjud umoratlarning tavsifi(asosan)</td><td>`+data.features[0].properties.mavjud_imoratlarning_tavsifi_asosan+`</td></tr>
<tr><td>Shaharsozlik faoliyatining ruxsat etilgan turi</td><td>`+data.features[0].properties.shaharsozlik_faoliyatining_ruxsat_berilgan_turi+`</td></tr>
<tr><td>Shaharsozlik faoliyatining muayyan shartlar asosida ruxsat etilgan turi</td><td>`+data.features[0].properties.shaharsozlik_faoliyatining_muayyan_shartlarni_bajargan_holda_ru+`</td></tr>
<tr><td>Shaharsozlik faoliyatining taqiqlangan turi</td><td>`+data.features[0].properties.shaharsozlik_faoliyatining_taqiqlangan_turi+`</td></tr>
<tr><td>Funksional zonalarning maydoni(ga)</td><td>`+data.features[0].properties.funktsional_zonalarning_maydoni_ga+`</td></tr>
</table>`;

$('#popup_dialog_funk_zones_po_apot').html(text);

  $('#popup_dialog_funk_zones_po_apot').dialog('open');
    document.getElementById("popup_dialog_funk_zones_po_apot").scrollTop = 0;
      }
      }
    });
}


if(map.hasLayer(genplan)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:genplans&QUERY_LAYERS=dshk:genplans&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
if(data.features.length){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
if(data.features.length==1){
send_feature(data.features[0].properties.id,'genplans');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan genplanlar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='genplans' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.aholi_punktining_nomi+`</a>`;
}
text+=`</div>`;

popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

}
}
});
}

if(map.hasLayer(genplan_edit)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:genplans_edit&QUERY_LAYERS=dshk:genplans_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {

if(data.features.length){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
if(data.features.length==1){
send_feature(data.features[0].properties.id,'genplans_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan genplanlar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='genplans_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.aholi_punktining_nomi+`</a>`;
}
text+=`</div>`;

popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

}
}
});
}

if(map.hasLayer(pdp)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:pdp&QUERY_LAYERS=dshk:pdp&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {
console.log(1);
        
if(data.features.length){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
if(data.features.length==1){
send_feature(data.features[0].properties.id,'pdp');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan pdplar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='pdp' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.aholi_punktining_nomi+`</a>`;
}
text+=`</div>`;

popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

}
}
});
}

if(map.hasLayer(pdp_edit)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:pdp_edit&QUERY_LAYERS=dshk:pdp_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {

if(data.features.length){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
if(data.features.length==1){
send_feature(data.features[0].properties.id,'pdp_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan pdplar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='pdp_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.aholi_punktining_nomi+`</a>`;
}
text+=`</div>`;

popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

}
}

});
}

if(map.hasLayer(apot)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:apots&QUERY_LAYERS=dshk:apots&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {

if(data.features.length){
var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
if(data.features.length==1){
send_feature(data.features[0].properties.id,'apots');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan APOT lar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='apots' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.fuqarolar_yiginlari+`</a>`;
}
text+=`</div>`;

popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}
}}});
}

if(map.hasLayer(apot_edit)){
var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:apots_edit&QUERY_LAYERS=dshk:apots_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data) 
      {

if(data.features.length){
var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
if(data.features.length==1){
send_feature(data.features[0].properties.id,'apots_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan APOT lar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='apots_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.fuqarolar_yiginlari+`</a>`;
}
text+=`</div>`;

popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

}
}

});
}



});





 $('[data-magnify]').magnify({
    fixedContent: false,
  });
  $('#login_logo').on('click',function(){
    if($(this).attr('click')=='1'){
    $('#login_logout').css({'width':'0','padding':'0','border':'0px'});
    $(this).attr('click','0');
  }
    else{
    $('#login_logout').css({'width':'auto','padding':'9','border':'1px solid rgba(0,0,0,0.25)'});
    $(this).attr('click','1');
  }
    
  }); 

$(document).on('click','.a_feature_list',function(){
  map.removeLayer(popup);
  send_feature($(this).attr('data-layer_id'),$(this).attr('data-layer_name'));
});


function send_feature(id,layer_name){
var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:"+layer_name+"&outputFormat=application%2Fjson&cql_filter=id='"+id+"'";
$.getJSON(url, function (data) {

if(layer_name=='genplans'){
create_popup_genplan(data.features[0].properties);
}
if(layer_name=='genplans_edit'){
create_popup_genplan_edit(data.features[0].properties);
}

if(layer_name=='pdp'){
create_popup_pdp(data.features[0].properties);
}
if(layer_name=='pdp_edit'){
create_popup_pdp_edit(data.features[0].properties);
}

if(layer_name=='apots'){
create_popup_apot(data.features[0].properties);
}
if(layer_name=='apots_edit'){
create_popup_apot_edit(data.features[0].properties);
}
});  
}






$('#logout_button').on('click',function(){

  var data = new FormData();
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);

$.ajax({
        url: 'logoutt',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        beforeSend: function () {
        },
        success: function (data) {

if(data==1){
window.location.href='/main';
}
else{
console.log(data)
}
        },
error: function () {
console.log('ajax da xatolik !!');
         
}
      });
});

$('#login_button').on('click',function(){

window.location.href='/login_form?page=main';

});

function get_style_vil(d){
    return d == "Qoraqalpog'iston Respublikasi" ? '#ffed7b' :
           d == "Xorazm viloyati"  ? '#FF0500' :
           d == "Navoiy viloyati"  ? '#7FFF00' :
           d == "Buxoro viloyati"  ? '#00ffff' :
           d == "Samarqand viloyati"  ? '#FF4500' :
           d == "Qashqadaryo viloyati"  ? '#ffed7b' :
           d == "Surxondaryo viloyati"  ? '#D2691E' :
           d == "Jizzax viloyati"  ? '#ff7f50' :
           d == "Sirdaryo viloyati"  ? '#D2691E' :
           d == "Toshkent viloyati"  ? '#ff1443' :
           d == "Namangan viloyati"  ? '#FFA500' : 
           d == "Farg'ona viloyati"  ? '#009900' : 
           d == "Andijon viloyati"  ? '#7FFF00' : '';                     
}


function style_vil(feature) {
  return {
        fillColor: get_style_vil(feature.properties.RegionNa_1),
        weight: 3,
        opacity: 0.6,
        color: '#000',
        dashArray: '2',
        fillOpacity: 0.7
  };
}

function onEachFeature_vil(feature, layer){
    layer.on({
        mouseover: mouseover_vil,
        mouseout: mouseout_vil,
        click: click_vil,
    });
}

function click_vil(e) {
    uzb_vil.resetStyle(e.target);
    map.fitBounds(e.target.getBounds());
    var layer = e.target;
    layer.setStyle({
    fillOpacity:0,
           });
    }
function mouseover_vil(e) {
  
    var layer = e.target;
    layer.setStyle({
        fillColor:'#fff',
        weight: 4,
        opacity: 0.8,
        color: '#000',
        dashArray: '0.1',
        fillOpacity: 0.6,
    });
layer.bindTooltip(layer.feature.properties.RegionNa_1,{
                      // permanent: true,   
                      direction:"top",
                      className :'tooltip_vil',
                      offset: [0,-10],
                      sticky:true,
                      opacity:0.9,  
                   }).openTooltip();;
   }
function mouseout_vil(e) {
    uzb_vil.resetStyle(e.target);
}


var uzb_vil = L.geoJson(null,{
  style:style_vil,
  onEachFeature:onEachFeature_vil,
}).addTo(map);

$.getJSON("/static/uzb.json", function (data) {
    uzb_vil.addData(data);

});

var uzb_res = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: -1, 
            opacity: 0.8,
            layers: 'dshk:uzb',
            format: 'image/png',
            transparent: true,
        });

var objecti = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:proekti_dshk',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:"gasn_registr_sana is not NULL",
        });

var proekti = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:proekti_dshk',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:"gasn_registr_sana is  NULL",
        });
var proektirovchiki = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:proekterovchiki_dshk',
            format: 'image/png',
            transparent: true,
        });

var zastroychiki = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:zastroychiki_dshk',
            format: 'image/png',
            transparent: true,
        });




var genplan_click = L.nonTiledLayer.wms();
var apot_click = L.nonTiledLayer.wms();


var setObject = L.geoJson(null,{
style : {
          color : 'orange',
          fillOpacity: 0.5,
        },

       pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
          radius: 8, 
          fillOpacity: 0.85,
        });
      }
    }
);

$(document).on('click','.click_set_object',function(){

  if($(this).attr('data-dtype')=='setObject'){
   var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("query_type",'location');
  data.append("id",$(this).attr('data-id'));
  var myUrl=$(this).attr('data-ltype');
$.ajax({
        url: myUrl,
        data: data,
        processData: false,
        contentType: false, 
        cache: false,
        type: 'post',
        success: function ( data ) {
setObject.clearLayers();
  

if (myUrl=='/proekti'){
setObject.addData(JSON.parse(data[0]['points']).features[0]);
setObject.addData(JSON.parse(data[0]['polygons']).features[0]);

}
else{
setObject.addData(JSON.parse(data[0]['full_info']).features[0]);
}
setObject.addTo(map);
map.flyToBounds(setObject.getBounds(),{maxZoom: 15});

          },
          error:function(){
console.log('Ajaxda xatolik!!!');
          }});
  }
  else{
  
map.flyToBounds([[$(this).attr('data-bounds-1'),$(this).attr('data-bounds-0')],[$(this).attr('data-bounds-3'),$(this).attr('data-bounds-2')]]);
}

});

function searchFromTable(input_id,type_id,maydon_id,table_id,count){
    var input, filter, table, tr, td, i,j;
    var max_coumns = 25;
    input = document.getElementById(input_id);
    var col_id = $('#'+maydon_id+'').val();  
    var full_search = true;
    if($('#'+type_id+'').val()==1)full_search = false;
    filter = input.value.toUpperCase();
      table = document.getElementById(table_id); 
      tr = table.getElementsByTagName("tr");
      var cnt = 0;
      if(col_id > -1)max_coumns = 1;
      for (i = 0; i < tr.length; i++) {
        if(i == 0)continue;
        var found = false;
        for(j = 0; j < max_coumns; j++){
          col_t_id = j;
          if(max_coumns == 1)col_t_id = col_id;
          td = tr[i].getElementsByTagName("td")[col_t_id];
          var str = filter;
          if(!full_search)str = '^' + str;
          var exx = new RegExp(str,'i');
          if (td) {
              if (td.innerHTML.search(exx) > -1) {
                found = true;
                break;
              } 
          }
        }
      if(found){
          tr[i].style.display = "";
            cnt ++;
        }
        else {
          tr[i].style.display = "none";
        }   
      }
if(count!='item-count_pod9'){

      $('#'+count+'').html('Topilgan obyektlar soni: ' + cnt);
    }
    else{
      $('#'+count+'').html('Topilgan hujjatlar soni: ' + cnt);
    }
  }

  $(document).on('keyup','.search_input',function(){

searchFromTable($(this).attr('data-input_id'),$(this).attr('data-type_id'),$(this).attr('data-maydon_id'),$(this).attr('data-table_id'),$(this).attr('data-count'));
  });

$(document).on('change','.search-type',function(){
    searchFromTable($(this).attr('data-input_id'),$(this).attr('data-type_id'),$(this).attr('data-maydon_id'),$(this).attr('data-table_id'),$(this).attr('data-count'));
  });

$(document).on('change','.search-field-id',function(){


    searchFromTable($(this).attr('data-input_id'),$(this).attr('data-type_id'),$(this).attr('data-maydon_id'),$(this).attr('data-table_id'),$(this).attr('data-count'));
});



$(document).on('change','.search-field-id_pod9',function(){

if($(this).val()!=-2){
$('#'+$(this).attr('data-input_id')+'').val('');
searchFromTable($(this).attr('data-input_id'),$(this).attr('data-type_id'),$(this).attr('data-maydon_id'),$(this).attr('data-table_id'),$(this).attr('data-count'));

var text0=`
<div class="input-group-addon"> <label >Qidiriluvchi so'z</label> </div>
<input type="text" data-input_id='search-field_pod9'  data-count='item-count_pod9' data-type_id='search-type_pod9'  data-maydon_id='search-field-id_pod9'  data-table_id='table-info_pod9' id="search-field_pod9" class = "form-control search_input">
<div class="input-group-addon"> <label id="item-count_pod9" >`+$('#item-count_pod9').text()+`</label> </div>
`;
$('#search_data_div').html(text0);

}
else{
  $('#'+$(this).attr('data-input_id')+'').val('');
searchFromTable($(this).attr('data-input_id'),$(this).attr('data-type_id'),$(this).attr('data-maydon_id'),$(this).attr('data-table_id'),$(this).attr('data-count'));

var text=`
<div class="input-group-addon"> <label >Oqaliq sani kiriting</label> </div>
<input type="text" id='search_data_input_begin' class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_data_input_end' class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search-field_pod9" style='display:none;'>
<div class="input-group-addon"> <label id="item-count_pod9" >`+$('#item-count_pod9').text()+`</label> </div>
`;
$('#search_data_div').html(text);
// mannon

$('#search_data_input_begin').datepicker({
  changeMonth:true,
  changeYear:true
});
$('#search_data_input_begin').datepicker('option','dateFormat','dd.mm.yy');
$('#search_data_input_end').datepicker({
  changeMonth:true,
  changeYear:true
}); 
$('#search_data_input_end').datepicker('option','dateFormat','dd.mm.yy');


$('#button_date_filter').on('click',function(){
  var begin=$('#search_data_input_begin').val();
  var end=$('#search_data_input_end').val();  
create_table_pod9($('#search-type_tip_pod9').val(),$('#search-type_hujjat_pod9').val(),begin,end,1);
});

}
});

$(document).on('click','.open_close_secret_div_pdp',function(){

if($(this).attr('data-status')=='0'){  
$(this).attr('data-status','1');

$('#secret_div_pdp').css({'display':'block'});
$('#span_open_close_pdp').html('&#9650');

}
else{
  $(this).attr('data-status','0');
  $('#secret_div_pdp').css({'display':'none'});
  $('#span_open_close_pdp').html('&#9660');

}
  });


$(document).on('click','.open_close_secret_div_pdp_edit',function(){

if($(this).attr('data-status')=='0'){  
$(this).attr('data-status','1');

$('#secret_div_pdp_edit').css({'display':'block'});
$('#span_open_close_pdp_edit').html('&#9650');

}
else{
  $(this).attr('data-status','0');
  $('#secret_div_pdp_edit').css({'display':'none'});
  $('#span_open_close_pdp_edit').html('&#9660');

}
  });


$(document).on('click','.open_close_secret_div_genplan',function(){

if($(this).attr('data-status')=='0'){  
$(this).attr('data-status','1');

$('#secret_div_genplan').css({'display':'block'});
$('#span_open_close_genplan').html('&#9650');
}
else{
  $(this).attr('data-status','0');
  $('#secret_div_genplan').css({'display':'none'});
  $('#span_open_close_genplan').html('&#9660');

}
  });


$(document).on('click','.open_close_secret_div_genplan_edit',function(){

if($(this).attr('data-status')=='0'){  
$(this).attr('data-status','1');

$('#secret_div_genplan_edit').css({'display':'block'});
$('#span_open_close_genplan_edit').html('&#9650');
}
else{
  $(this).attr('data-status','0');
  $('#secret_div_genplan_edit').css({'display':'none'});
  $('#span_open_close_genplan_edit').html('&#9660');
}
});



var scale=new Array(21);
scale=['1:500,000,000','1:250,000,000','1:150,000,000','1:70,000,000','1:35,000,000','1:15,000,000','1:10,000,000','1:4,000,000','1:2,000,000','1:1,000,000','1:500.000','1:250.000','1:150,000','1:70,000','1:35,000','1:15,000','1:8,000','1:4,000','1:2,000','1:1,000','1:500'];

map.on('zoomend',function(){
  $('#contol_zoom_view').text(map.getZoom());
  $('#scale_div').html('[ '+scale[map.getZoom()]+' ]');
});


drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems); 
const drawControl = new L.Control.Draw({
  position: 'bottomright',
  draw: {
    polyline: {
      metric: true,
      shapeOptions: {
        color: '#000',
      },
    },
    polygon: {
      allowIntersection: false,
      showArea: true,
      drawError: {
        color: '#ff0000',
        timeout: 1000,
      },
      shapeOptions: {
        color: '#0000ff',
      },
    },
    circle: {
      shapeOptions: {
        color: '#662d91',
      },
    },
    marker: true,
  },
  edit: {
    featureGroup: drawnItems,
    remove: true,
    buffer: {
      replacePolylines: false,
      separateBuffer: false,
    },
  },
});

map.addControl(drawControl);
var _round = function(num, len) {
  return Math.round(num*(Math.pow(10, len)))/(Math.pow(10, len));
};
var strLatLng = function(latlng) {
  return "("+_round(latlng.lat, 8)+", "+_round(latlng.lng, 8)+")";
};

var getPopupContent = function(layer) {
  if(layer instanceof L.Marker) {
    return strLatLng(layer.getLatLng());
  } 
  else if(layer instanceof L.Circle) {
    var center = layer.getLatLng(),
    radius = layer.getRadius();
    return "Markaz: " + strLatLng(center) + "<br />" + "Radius: " + _round(radius, 2) + " m";
  } else if(layer instanceof L.Polygon) {
    var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
    area = L.GeometryUtil.geodesicArea(latlngs);
    return "Maydon: "+L.GeometryUtil.readableArea(area, true);
  } else if (layer instanceof L.Polyline) {
    var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
    distance = 0;
    if (latlngs.length < 2) {
      return "Masofa: N/A";
    } else {
      for (var i = 0; i < latlngs.length-1; i++) {
        distance += latlngs[i].distanceTo(latlngs[i+1]);
      }
      L.popup().setContent("Masofa: "+_round(distance, 2)+" m").setLatLng(latlngs[latlngs.length-1]).openOn(map);
      return "Masofa: "+_round(distance, 2)+" m";
    }
  }
  return null;
};


map.on(L.Draw.Event.CREATED, function(event) {
  var layer = event.layer;
  var content = getPopupContent(layer);
  if (content !== null) {
    layer.bindPopup(content);
  }
  drawnItems.addLayer(layer);
});

map.on(L.Draw.Event.EDITED, function(event) {
  var layers = event.layers,
  content = null;
  layers.eachLayer(function(layer) {
    content = getPopupContent(layer);
    if (content !== null) {
      layer.setPopupContent(content);
    }
  });
});
 
$('#contol_box_zoom').on('click',function(){
  $('.leaflet-control-boxzoom')[0].click();
   
});

$('#draw_point').on('click',function(){
  $('.leaflet-draw-draw-marker')[0].click();
  $('#tab-action-draw').css({'top':'378px'});
});
$('#draw_polyline').on('click',function(){
  $('.leaflet-draw-draw-polyline')[0].click();
  $('#tab-action-draw').css({'top':'438px'});
});
$('#draw_polygon').on('click',function(){
  $('.leaflet-draw-draw-polygon')[0].click();
  $('#tab-action-draw').css({'top':'498px'});
});

$('#draw_delete').on('click',function(){
  map.removeLayer(setObject);
  $('.leaflet-draw-edit-remove')[0].click();
  $('#tab-action-draw').css({'top':'558px'});
});

$('.leaflet-draw-actions').appendTo('#tab-action-draw');


