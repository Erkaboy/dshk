var search_marker;
          $('#dialog_object_events').dialog({
  resizable: true,
  autoOpen:false,
  height: 720,
  width: 520,
  modal: false,
  dialogClass:'dialog_object_events',
         create:function(e){
$('.dialog_object_events').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },

  show:{
    effect:'slide',
    duration:200,
  },
  close:function(){},
    hide:{
    effect:'blind',
    duration:400,
  }
});

function get_event_type(type) {
  if(type==1){return "Yangi kiritish";}
  if(type==2){return "O'zgartirish";}
  if(type==3){return "O'chirish";}
 }
 function get_event_tas_type(type) {
 if(type==null){return ' - '}
 else{
  if(type==0){return "Tasdiqlanmagan";}
  else{ return "Tasdiqlangan"}}
}

function check_nulll(a){
  return a==null?' - ':a;
}
function represent_time(time){
  if(time!=null){
  var t=new Date(time);
  var day=t.getDate()<10?'0'+t.getDate():t.getDate();
  var month=t.getMonth()<9?'0'+(t.getMonth()+1):(t.getMonth()+1);
  var hour=t.getHours()<10?'0'+t.getHours():t.getHours();
  var min=t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes();
  var sec=t.getSeconds()<10?'0'+t.getSeconds():t.getSeconds();

  return day+'-'+month+'-'+t.getFullYear()+' '+hour+':'+min+':'+sec;}
  else{
    return ' - ';
  }
}

$(document).on('click','.obj_history',function(){

var data = new FormData();
data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
data.append('type',$(this).attr('data-pod'));
data.append('id',$(this).attr('data-id'));
var title=$(this).attr('data-title');
$.ajax({
        url: '/admin_object_events',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (result) {

         var data=JSON.parse(result['json']);
         var data2=JSON.parse(result['admin']);
         var admin=new Array();
         admin[null]=' - ';
         for(var i in data2){
         admin[data2[i].pk]=data2[i].fields['full_name'];
         }
$('#dialog_object_events').dialog({title: title});
var text='';
for(var i in data){
  d=data[i].fields;
text+=`
<p class="amaliyot_p">Amaliyot № `+(parseInt(i)+1)+` </p>
<table class="amaliyot_table table table-streped">
  <tr>
    <td>Admin:</td><td>`+admin[d['admin_id']]+`</td>
  </tr>
    <tr>
    <td>Amaliyot turi:</td><td><span class="edit_type_`+d['event_type']+`">`+get_event_type(d['event_type'])+`</span></td>
  </tr>
    <tr>
    <td>Sana:</td><td>`+represent_time(d['event_date'])+`</td>
  </tr>
    <tr>
    <td>Qisqacha izoh(admin):</td><td>`+d['event_dis']+`</td>
  </tr>
  <tr>
    <td>Superadmin:</td><td>`+admin[d['superadmin_id']]+`</td>
  </tr>
    <tr>
    <td>Tasdiqlanganligi:</td><td><span class="tas_type_`+d['event_ans_type']+`">`+get_event_tas_type(d['event_ans_type'])+`</span></td>
  </tr>
  <tr>
    <td>Sana:</td><td>`+represent_time(d['event_ans_date'])+`</td>
  </tr>
    <tr>
    <td>Qisqacha izoh(superadmin):</td><td>`+check_nulll(d['event_ans_dis'])+`</td>
  </tr>
  </table>
`;

}

$('#dialog_object_events').html(text);
$('#dialog_object_events').dialog('open');


        },
        error:function(){
          console.log('Axajda xatolik!!')
        }});

});

var masshtab_json=[
{ 'val':'200','dis':'1:200'},
{ 'val':'500','dis':'1:500'},
{ 'val':'1000','dis':'1:1000'},
{ 'val':'2000','dis':'1:2000'},
{ 'val':'5000','dis':'1:5000'},
{ 'val':'10000','dis':'1:10000'},
{ 'val':'25000','dis':'1:25000'},
{ 'val':'50000','dis':'1:50000'},
{ 'val':'100000','dis':'1:100000'}
];

function get_masshtab(t){
  let res=0;
  for (let i in masshtab_json){
    if(masshtab_json[i].val==t){
      res= masshtab_json[i];
     break;
   }
  }
    if(res!=0)
  return res.dis;
else{
  return t;
}
}


var grif_json=[
{ 'val':'maxfiy','dis':'Maxfiy'},
{ 'val':'XDFU','dis':'Xizmat doirasida foydalanish uchun'},
{ 'val':'mavjud_emas','dis':'Grif mavjud emas'}
];

function get_grif(t){
  let res=0;
  for (let i in grif_json){
    if(grif_json[i].val==t){
      res= grif_json[i];
     break;
   }
  }

   if(res!=0)
  return res.dis;
else{
  return t;
}
}

var koor_tizim_json=[
{ 'val':'Mahalliy','dis':'Mahalliy'},
{ 'val':'1942 yil koor. tizimi','dis':'1942 yil koordinatalar tizimi'},
{ 'val':'1963 yil koor. tizimi','dis':'1963 yil koordinatalar tizimi'},
{ 'val':'WGS-84','dis':'WGS-84'}
];

function get_koor_tizim(t){
  let res=0;
  for (let i in koor_tizim_json){
    if(koor_tizim_json[i].val==t){
      res= koor_tizim_json[i];
     break;
   }
  }
  if(res!=0)
  return res.dis;
else{
  return t;
}
}

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
    $('#load_alert_div3').css({'display':'none'});
  },
    hide:{
    effect:'blind',
    duration:400,
  }
});

});


function my_repath(path){
  if(path!=''){
  path=path.match(/[^\/\\]+$/)[0];
    return path;
  }
  else{
    return "NotFile"
  }

}
$(document).on('click','.tag_download_sec',function(){
 var filename=$(this).attr('data-filename');
 var link=document.createElement('a');
 link.setAttribute('href',mydecode(filename));
 link.setAttribute('target','blank');
 link.setAttribute('download',my_repath(mydecode(filename)));
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


var live_layer=0;
$('#live_layers').on('click',function(){
 if($(this).attr('data-val')=='0'){

live_layer=[
{'layer1':genplan,'layer2':genplan_click,'id':'checkbox_id_2_3_1','layer_name':"genplan",'dis':'Bosh rejalar'},
{'layer1':pdp,'layer2':pdp,'id':'checkbox_id_2_3_2','layer_name':"pdp",'dis':'Batafsil rejalashtirish loyihalari'},
{'layer1':apot,'layer2':apot_click,'id':'checkbox_id_2_2_1','layer_name':"apot",'dis':'Hududlarni arxitekturaviy rejalashtirishni tashkillashtirish loyihalari'},
{'layer1':funk_zones_po_genplan,'layer2':funk_zones_po_genplan,'id':'checkbox_id_1_1_1','layer_name':"funk_zones_po_genplan",'dis':"Bosh rejalar bo'yicha funksional zonalar" },
{'layer1':maktablar,'layer2':maktablar,'id':'maktablar_id','layer_name':"maktablar",'dis':'Maktablar'},

{'layer1':funk_zones_po_apot,'layer2':funk_zones_po_apot,'id':'checkbox_id_1_1_2','layer_name':"funk_zones_po_apot",'dis':"ARTL bo'yica funksiona zonalar"},

{'layer1':redline,'layer2':redline,'id':'checkbox_id_1_2_1','layer_name':"redline",'dis':'Qizil chiziqlar'},

{'layer1':geologik_rayonlash,'layer2':geologik_rayonlash,'id':'checkbox_id_1_3_1','layer_name':"geologik_rayonlash",'dis':'Geologik rayonlashtirish'},
{'layer1':apz,'layer2':apz,'id':'apz_id','layer_name':"apz",'dis':'ART'},
{'layer1':psd,'layer2':psd,'id':'psd_id','layer_name':"psd",'dis':'PSD'},
{'layer1':psd_ind,'layer2':psd_ind,'id':'psd_ind_id','layer_name':"psd_ind",'dis':'PSD_ind'},
{'layer1':perm_rec,'layer2':perm_rec,'id':'perm_rec_id','layer_name':"perm_rec",'dis':'perm_rec'},
{'layer1':smr,'layer2':smr,'id':'smr_id','layer_name':"smr",'dis':'smr'},
{'layer1':pexpl,'layer2':pexpl,'id':'pexpl_id','layer_name':"pexpl",'dis':'pexpl'},
{'layer1':pexpl_ind,'layer2':pexpl_ind,'id':'pexpl_ind_id','layer_name':"pexpl_ind",'dis':'pexpl_ind'},
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

$('#p_sub2menu').html("<i style='font-weight:100;'>"+$(this).attr('data-n')+"-quyi tizim</i><br>"+$(this).children('h4').text());
if($(this).attr('data-val')=='1'){

text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='11' ><td class='td_icon'></td><td>Funksional zonalash sxemalari</td></tr>
<tr class='tr2_sub2menu' data-val='12' ><td class='td_icon'></td><td>Qizil chiziqlar</td></tr>
<tr class='tr2_sub2menu' data-val='13' ><td class='td_icon'></td><td>Geologik rayonlashtirish </td></tr>
<tr class='tr2_sub2menu' data-val='14' ><td class='td_icon'></td><td>Kadastr ma'lumotlari</td></tr>
</table>`;

  $('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='2'){
text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='22' ><td class='td_icon'></td><td>Bosh rejalar</td></tr>
<tr class='tr2_sub2menu' data-val='23' ><td class='td_icon'></td><td>Batafsil rejalashtirish loyihalari</td></tr>
<tr class='tr2_sub2menu' data-val='21' ><td class='td_icon'></td><td>Hududlarni arxitekturaviy rejalashtirishni tashkillashtirish loyihalari (ARTL)</td></tr>
</table>`;


  $('#sub2menu_div').html(text);

}

if($(this).attr('data-val')=='3'){

 $('#sub2menu_div').html('В процессе подготовки !!');
}

if($(this).attr('data-val')=='4'){

text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='41'><td class='td_icon'></td><td>Openstreetmap resursi</td></tr>
<tr class='tr2_sub2menu' data-val='42'><td class='td_icon'></td><td>Google resursi</td></tr>
<tr class='tr2_sub2menu' data-val='43'><td class='td_icon'></td><td>Ortofotoplanlar</td></tr>
</table>`;

  $('#sub2menu_div').html(text);
}
if($(this).attr('data-val')=='5'){

text=`<table class='table_2'>
<tr class='tr2_sub2menu' data-val='51' ><td class='td_icon'></td><td>Openstreetmap resursidan izlash</td></tr>
<tr class='tr2_sub2menu' data-val='52' ><td class='td_icon'></td><td>Aholi punktilari nomi bo'yicha ichki bazadan izlash</td></tr>
</table>`;

  $('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='6'){

text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='apz' class='info_table'></td><td><img src='/static/img/imgs_pod_67/apz.png' class='img_label'></td><td><input type='checkbox' `+check_checked(apz)+` data-layer_name='apz' class='obj_sub_checkbox' id='apz_id'></td><td><label class='info_label' for='apz_id'>Arxitektura-rejalashtirish topshiriqlari reestri</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='psd' class='info_table'></td><td><img src='/static/img/imgs_pod_67/psd.png' class='img_label'></td><td><input type='checkbox' `+check_checked(psd)+` data-layer_name='psd' class='obj_sub_checkbox' id='psd_id'></td><td><label class='info_label' for='psd_id'>Binolar, inshootlar va boshqa obyektlar qurilishining loyiha-smeta hujjatlari reestri</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='psd_ind' class='info_table'></td><td><img src='/static/img/imgs_pod_67/psd_ind.png' class='img_label'></td><td><input type='checkbox' `+check_checked(psd_ind)+` data-layer_name='psd_ind' class='obj_sub_checkbox' id='psd_ind_id'></td><td><label class='info_label' for='psd_ind_id'>Yakka tartibda uy-joy qurishga (rekonstruktsiya qilishga) loyiha-smeta hujjatlari reestri</label></td><tr>

  </table>`;
$('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='7'){

text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='perm_rec' class='info_table'></td><td><img src='/static/img/imgs_pod_67/perm_rec.png' class='img_label'></td><td><input type='checkbox' `+check_checked(perm_rec)+` data-layer_name='perm_rec' class='obj_sub_checkbox' id='perm_rec_id'></td><td><label class='info_label' for='perm_rec_id'>Obyektni qayta ixtisoslashtirish va rekonstruktsiya qilish reestri</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='smr' class='info_table'></td><td><img src='/static/img/imgs_pod_67/smr.png' class='img_label'></td><td><input type='checkbox' `+check_checked(smr)+` data-layer_name='smr' class='obj_sub_checkbox' id='smr_id'></td><td><label class='info_label' for='smr_id'>Qurilish-montaj ishlarini amalga oshirish reestri</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pexpl' class='info_table'></td><td><img src='/static/img/imgs_pod_67/pexpl.png' class='img_label'></td><td><input type='checkbox' `+check_checked(pexpl)+` data-layer_name='pexpl' class='obj_sub_checkbox' id='pexpl_id'></td><td><label class='info_label' for='pexpl_id'>Turar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilishi reestri</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pexpl_ind' class='info_table'></td><td><img src='/static/img/imgs_pod_67/pexpl_ind.png' class='img_label'></td><td><input type='checkbox' `+check_checked(pexpl_ind)+` data-layer_name='pexpl_ind' class='obj_sub_checkbox' id='pexpl_ind_id'></td><td><label class='info_label' for='pexpl_ind_id'>Noturar joy obyekti hisoblangan bino va inshootni foydalanishga qabul qilish reestri</label></td><tr>

  </table>`;
$('#sub2menu_div').html(text);

}
if($(this).attr('data-val')=='8'){

text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='loy' class='info_table'></td><td><img src='/static/img/proektirovchiki.png' class='img_label'></td><td><input type='checkbox' `+check_checked(loy)+` data-layer_name='loy' class='obj_sub_checkbox' id='loy_id'></td><td><label class='info_label' for='loy_id'>Loyiha tashkilotlar</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pud' class='info_table'></td><td><img src='/static/img/zastroychiki.png' class='img_label' ></td><td><input type='checkbox' `+check_checked(pud)+` data-layer_name='pud'  class='obj_sub_checkbox' id='pud_id'></td><td><label class='info_label' for='pud_id'>Pudratchi tashkilotlar</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='bjs' class='info_table'></td><td colspan='3'><label data-layer_name='bjs' class='info_table_2  info_label'>Buyurtmachi (jismoniy shaxs)</label></td><tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='bys' class='info_table'></td><td colspan='3'><label  data-layer_name='bys' class='info_table_2 info_label'>Buyurtmachi (yuridik shaxs)</label></td><tr>
  </table>`;
$('#sub2menu_div').html(text);
}

if($(this).attr('data-val')=='00'){

text=`<p style='margin:10px;font-style:italic;'>Bu xizmatdan foydalanish uchun avtorizatsiyadan o'tish talab qilinadi !</p>`;
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


if($(mythis).attr('data-val')=='11'){
    text=`<table class='table_3'>
    <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(funk_zones_po_genplan)+` id='checkbox_id_1_1_1' ></td><td><label class='label_sub3menu'  for='checkbox_id_1_1_1'>Bosh rejalar bo'yicha</label></td><td><img class='info_png' data-layer_name='funk_zones_po_genplan' data-layer_dis="Bosh rejalar bo'yicha funksional zonalar"  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='funk_gen'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(funk_zones_po_genplan_edit)+`  id='checkbox_id_1_1_1_1'></td><td><label class='label_sub3menu'  for='checkbox_id_1_1_1_1'>Bosh rejalar bo'yicha funksional zonalar o'zgarishlar</label></td><td><img class='info_png' data-layer_name='funk_zones_po_genplan_edit' data-layer_dis="Bosh rejalar bo'yicha funksional zonala o'zgarishlar"  src='/static/img/info.png'></td></tr>`;
}

text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(funk_zones_po_apot)+` id='checkbox_id_1_1_2' ></td><td><label class='label_sub3menu'  for='checkbox_id_1_1_2'>Hududlarni arxitekturaviy rejalashtirishni tashkillashtirish loyihalari bo'yicha</label></td><td><img class='info_png' data-layer_name='funk_zones_po_apot' data-layer_dis="Hududlarni arxitekturaviy rejalashtirishni tashkillashtirish loyihalari bo'yicha qilingan funksional zonalar"  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='funk_apot'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(funk_zones_po_apot_edit)+`  id='checkbox_id_1_1_2_1'></td><td><label class='label_sub3menu'  for='checkbox_id_1_1_2_1'>ARTL bo'yicha funksional zonalar o'zgarishlar</label></td><td><img class='info_png' data-layer_name='funk_zones_po_apot_edit' data-layer_dis="ARTL bo'yicha funksional zonalar o'zgarishlar"  src='/static/img/info.png'></td></tr>`;
}

text+= `</table>`;
$('#sub3menu_div').html(text);
}

if($(mythis).attr('data-val')=='12'){

text=`<table class='table_4' style='width:100%;'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='redline' data-filter='-0'  class='info_table'></td><td><img src='/static/img/red_lines.png' class='img_label'></td><td><input type='checkbox' `+check_checked(redline)+` data-layer_name='redline' class='checkbox_sub3menu' id='checkbox_id_1_2_1'></td><td><label class='info_label' for='checkbox_id_1_2_1'>Qizil chiziqlar</label></td><td><img class='info_png' data-layer_name='redline' data-layer_dis="Qizil chiziqlar"  src='/static/img/info.png'></tr>
    `;

if(sessia.service=='red_line'){
text+=`<tr><td ><input type='checkbox' class='checkbox_sub3menu' `+check_checked(redline_edit)+`  id='checkbox_id_1_2_2'></td><td colspan='3'><label class='label_sub3menu'  for='checkbox_id_1_2_2'>Qizil chiziqlar o'zgarishlar</label></td><td><img class='info_png' data-layer_name='redline_edit' data-layer_dis="Qizil chiziqlar o'zgarishlar"  src='/static/img/info.png'></td></tr>`;
}

text+=`</table>`;

$('#sub3menu_div').html(text);
}


if($(mythis).attr('data-val')=='13'){
text=`<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='geologik_rayonlash'  data-filter='-0' class='info_table'></td><td><img src='/static/img/funk_zones.png' class='img_label'></td><td><input type='checkbox' `+check_checked(geologik_rayonlash)+` data-layer_name='geologik_rayonlash' class='checkbox_sub3menu' id='checkbox_id_1_3_1'></td><td><label class='info_label' for='checkbox_id_1_3_1'>Geologik rayonlashtirish</label></td><td><img class='info_png' data-layer_name='geologik_rayonlash' data-layer_dis="Geologik rayonlashtirish"  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='geo_ray'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(geologik_rayonlash_edit)+`  id='checkbox_id_1_3_1_1'></td><td colspan='3'><label class='label_sub3menu'  for='checkbox_id_1_3_1_1'>Geologik rayonlashtirish o'zgarish</label></td><td><img class='info_png' data-layer_name='geologik_rayonlash_edit' data-layer_dis="Geologik rayonlashtirish o'zgarish"  src='/static/img/info.png'></td></tr>`;

}
text+=`</table>`;

$('#sub3menu_div').html(text);
}


if($(mythis).attr('data-val')=='14'){

if(sessia.status!=-1){
text=`<table class='table_4' style='width:100%;'>
<tr><td><img src='/static/img/table-icon.png' data-layer_name='yer_uchaskalari' data-filter='-0'  class='info_table'></td><td><img src='/static/img/genplan_0.png' class='img_label'></td><td><input type='checkbox' `+check_checked(yer_uchaskalari)+` data-layer_name='yer_uchaskalari' class='checkbox_sub3menu' id='checkbox_id_1_4_1'></td><td><label class='info_label' for='checkbox_id_1_4_1'>Yer uchaskalari</label></td></tr>
    `;
text+=`</table>`;
}
else{
  text=`<p style='margin:10px;font-style:italic;'>Bu xizmatdan foydalanish uchun avtorizatsiyadan o'tish talab qilinadi !</p>`;

}
$('#sub3menu_div').html(text);
}




if($(mythis).attr('data-val')=='21'){
  text=`<table class='table_3'>
  <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(apot)+` id='checkbox_id_2_2_1' ></td><td><label class='label_sub3menu'  for='checkbox_id_2_2_1'>Hududlarni arxitekturaviy rejalashtirishni tashkillashtirish loyihalari</label></td><td><img class='info_png' data-layer_name='apot' data-layer_dis='Hududlarni arxitekturaviy rejalashtirishni tashkillashtirish loyihalari'  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='apot'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(apot_edit)+`  id='checkbox_id_2_2_1_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_2_1_1'>ARTL o'zgarishlar</label></td><td><img class='info_png' data-layer_name='apot_edit' data-layer_dis="ARTL o'zgarishlar"  src='/static/img/info.png'></td></tr>`;
}

 text+=`</table>`;
$('#sub3menu_div').html(text);
}
if($(mythis).attr('data-val')=='22'){
  text=`<table class='table_3'>
    <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(genplan)+`  id='checkbox_id_2_3_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_1'>Bosh rejalar</label></td><td><img class='info_png' data-layer_name='genplan' data-layer_dis='Bosh rejalar'  src='/static/img/info.png'></td></tr>`;

if(sessia.service=='genplan'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(genplan_edit)+`  id='checkbox_id_2_3_1_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_1_1'>Bosh rejalar o'zgarishlar</label></td><td><img class='info_png' data-layer_name='genplan_edit' data-layer_dis="Bosh rejalar o'zgarishlar"  src='/static/img/info.png'></td></tr>`;
}
text+=`</table>`;
  $('#sub3menu_div').html(text);
}
if($(mythis).attr('data-val')=='23'){
 text=`<table class='table_3'>
    <tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(pdp)+`  id='checkbox_id_2_3_2'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_2'>Batafsil rejalashtirish loyihalari</label></td><td><img class='info_png' data-layer_name='pdp' data-layer_dis='Batafsil rejalashtirish loyihalari'  src='/static/img/info.png'></td></tr>`;
if(sessia.service=='pdp'){
text+=`<tr><td><input type='checkbox' class='checkbox_sub3menu' `+check_checked(pdp_edit)+`  id='checkbox_id_2_3_2_1'></td><td><label class='label_sub3menu'  for='checkbox_id_2_3_2_1'>Batafsil rejalashtirish loyihalari o'zgarishlar</label></td><td><img class='info_png' data-layer_name='pdp_edit' data-layer_dis="Batafsil rejalashtirish loyihalari o'zgarishlar"  src='/static/img/info.png'></td></tr>`;
}

 text+=` </table>`;

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
    <tr><td><input type='checkbox' value='mytile' name='radio-group' class='checkbox_layer_change' id='test14' ></td><td><label class='label_sub3menu'  for='test14'>Uchuvchisiz uchish apparatidan olingan aerofotosuratlar ortofotoplanlari</label></td></tr>
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

$(document).on('click','.search_geolocation_polygon_li',function(){
var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:geolocation_polygon&outputFormat=application%2Fjson&cql_filter=id='"+$(this).attr('data-id')+"'";
$.getJSON(url, function(data)
{
if(data.features[0].geometry.type=='MultiPolygon'){
var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
}
if(data.features[0].geometry.type=='Polygon'){
var bounds=gsch.bbox(gsch.Polygon(data.features[0].geometry.coordinates));
}
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
});



});




$(document).on('keyup','#input_geosearch',function(e){
    if ( e.which == 13 ){
$('#main_geosearch_button')[0].click();}
});

$(document).on('keyup','#input_geosearch_from_our',function(e){
    if ($(this).val()!=''){
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
        data=JSON.parse(result['points']);
        data2=JSON.parse(result['polygons']);
let count=0;
text='';
if(data.features.length>0){
count++;
text+='<ul>';
for (var i in data.features)
{
if(lang==0){
text+=`<li class='search_geolocation_li' data-lat='`+data.features[i].geometry.coordinates[0]+`'
data-lng='`+data.features[i].geometry.coordinates[1]+`'>`+data.features[i].properties.name_ru+`, `+data.features[i].properties.name_ru+`, `+data.features[i].properties.regionname+`</li>`;
}
else{
text+=`<li class='search_geolocation_li' data-lat='`+data.features[i].geometry.coordinates[0]+`'
data-lng='`+data.features[i].geometry.coordinates[1]+`'>`+data.features[i].properties.name_uz+`, `+data.features[i].properties.name_uzb+`, `+data.features[i].properties.regionnameuz+`</li>`;
}
}
text+='</ul>';
}

if(data2.features.length>0){
text+='<ul>';
count++;
for (var i in data2.features)
{
if(lang==0){
text+=`<li class='search_geolocation_polygon_li' data-id='`+data2.features[i].properties.id+`'>`+data2.features[i].properties.distr_name+`, `+data2.features[i].properties.regionname+`</li>`;
}
else{
text+=`<li class='search_geolocation_polygon_li' data-id='`+data2.features[i].properties.id+`'>`+data2.features[i].properties.name_uzb+`, `+data2.features[i].properties.regionnameuz+`</li>`;
}
}
text+='</ul>';
}
if(count==0)
text='Topilmadi';

$('#geosearch_results_from_our').html(text);

        },
        error:function(){
          console.log('Ajaxda xatolik !!');
        }});
}
else{
$('#geosearch_results_from_our').html('');
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

if($(this).attr('data-layer_name')=='maktablar'){
  if($(this).prop('checked')){
     map.addLayer(maktablar);
  }
  else{
    map.removeLayer(maktablar);
  }
}

});








$(document).on('click','.info_table',function(){
  $(this).css({'cursor':'wait'});
$('#search-field').val('');

if($(this).attr('data-layer_name')=='apz'){
  $('#pagination-apz_div').html(`<ul id="pagination-apz" class="pagination-sm"></ul>`);
  load_apz_table(1,100,'date','-','','','','','','','');
}

if($(this).attr('data-layer_name')=='psd'){
  $('#pagination-psd_div').html(`<ul id="pagination-psd" class="pagination-sm"></ul>`);
  load_psd_table(1,100,'date','-','','','','','','','');
}
if($(this).attr('data-layer_name')=='psd_ind'){
  $('#pagination-psd_ind_div').html(`<ul id="pagination-psd_ind" class="pagination-sm"></ul>`);
  load_psd_ind_table(1,100,'date','-','','','','','','','');
}

if($(this).attr('data-layer_name')=='perm_rec'){
  $('#pagination-perm_rec_div').html(`<ul id="pagination-perm_rec" class="pagination-sm"></ul>`);
  load_perm_rec_table(1,100,'date','-','','','','','','','');
}

if($(this).attr('data-layer_name')=='smr'){
  $('#pagination-smr_div').html(`<ul id="pagination-smr" class="pagination-sm"></ul>`);
  load_smr_table(1,100,'date','-','','','','','','','');
}

if($(this).attr('data-layer_name')=='pexpl'){
  $('#pagination-pexpl_div').html(`<ul id="pagination-pexpl" class="pagination-sm"></ul>`);
  load_pexpl_table(1,100,'date','-','','','','','','','');
}

if($(this).attr('data-layer_name')=='pexpl_ind'){
  $('#pagination-pexpl_ind_div').html(`<ul id="pagination-pexpl_ind" class="pagination-sm"></ul>`);
  load_pexpl_ind_table(1,100,'date','-','','','','','','','');
}
if($(this).attr('data-layer_name')=='loy'){
  $('#pagination-loy_div').html(`<ul id="pagination-loy" class="pagination-sm"></ul>`);
  load_loy_table(1,100,'pk','','','','','','','','');
}

if($(this).attr('data-layer_name')=='pud'){
  $('#pagination-pud_div').html(`<ul id="pagination-pud" class="pagination-sm"></ul>`);
  load_pud_table(1,100,'pk','','','','','','','','');
}


if($(this).attr('data-layer_name')=='bjs'){
  $('#pagination-bjs_div').html(`<ul id="pagination-bjs" class="pagination-sm"></ul>`);
  load_bjs_table(1,100,'pk','','','','','','','','');
}

if($(this).attr('data-layer_name')=='bys'){
  $('#pagination-bys_div').html(`<ul id="pagination-bys" class="pagination-sm"></ul>`);
  load_bys_table(1,100,'pk','','','','','','','','');
}

});



$(document).on('click','.info_table_2',function(){
  $(this).css({'cursor':'wait'});
  if($(this).attr('data-layer_name')=='bjs'){
  $('#pagination-bjs_div').html(`<ul id="pagination-bjs" class="pagination-sm"></ul>`);
  load_bjs_table(1,100,'pk','','','','','','','','');
}

if($(this).attr('data-layer_name')=='bys'){
  $('#pagination-bys_div').html(`<ul id="pagination-bys" class="pagination-sm"></ul>`);
  load_bys_table(1,100,'pk','','','','','','','','');
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


var apz = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:apz',
            format: 'image/png',
            transparent: true,
        });

var psd = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:psd',
            format: 'image/png',
            transparent: true,
        });

var psd_ind = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:psd_ind',
            format: 'image/png',
            transparent: true,
        });

var perm_rec = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:perm_rec',
            format: 'image/png',
            transparent: true,
        });

var smr = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:smr',
            format: 'image/png',
            transparent: true,
        });

var pexpl = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:pexpl',
            format: 'image/png',
            transparent: true,
        });

var pexpl_ind = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:pexpl_ind',
            format: 'image/png',
            transparent: true,
        });

var loy = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:loy',
            format: 'image/png',
            transparent: true,
        });
var pud = L.nonTiledLayer.wms('/geodata/', {
            maxZoom: 22,
            minZoom: 1,
            zIndex: 2,
            opacity: 0.8,
            layers: 'dshk:pud',
            format: 'image/png',
            transparent: true,
        });


var apot = L.nonTiledLayer.wms();
var apot_edit = L.nonTiledLayer.wms();


var genplan = L.nonTiledLayer.wms();
var genplan_edit = L.nonTiledLayer.wms();
var genplan_geotiff=new Array();
var genplan_edit_geotiff=new Array();

var geologik_rayonlash= L.nonTiledLayer.wms();
var geologik_rayonlash_edit= L.nonTiledLayer.wms();

var funk_zones_po_genplan=L.nonTiledLayer.wms();
var funk_zones_po_genplan_edit=L.nonTiledLayer.wms();

var funk_zones_po_apot=L.nonTiledLayer.wms();
var funk_zones_po_apot_edit=L.nonTiledLayer.wms();

var pdp = L.nonTiledLayer.wms();
var pdp_edit = L.nonTiledLayer.wms();

var pdp_geotiff=new Array();
var pdp_edit_geotiff=new Array();


var redline = L.nonTiledLayer.wms();

var redline_edit = L.nonTiledLayer.wms();

var yer_uchaskalari = L.nonTiledLayer.wms();


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


$(document).on('change','.change_opacity_redline', function(e){
   if(map.hasLayer(redline))
  redline.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_redline_edit', function(e){
   if(map.hasLayer(redline_edit))
  redline_edit.setOpacity($(this).val()/10);
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

$(document).on('change','.change_opacity_funk_zone_po_genplan_edit', function(e){
   funk_zones_po_genplan_edit.setOpacity($(this).val()/10);
});

$(document).on('change','.change_opacity_geologik_rayonlash', function(e){
   geologik_rayonlash.setOpacity($(this).val()/100);
});

$(document).on('change','.change_opacity_geologik_rayonlash_edit', function(e){
   geologik_rayonlash_edit.setOpacity($(this).val()/100);
});

$(document).on('change','.change_opacity_funk_zone_po_apot', function(e){
   funk_zones_po_apot.setOpacity($(this).val()/10);
});
$(document).on('change','.change_opacity_funk_zone_po_apot_edit', function(e){
   funk_zones_po_apot_edit.setOpacity($(this).val()/10);
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
ms_url2="/geodata/?";
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




if(map.hasLayer(funk_zones_po_genplan)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:funk_zones_po_genplan&QUERY_LAYERS=dshk:funk_zones_po_genplan&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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
send_feature(data.features[0].properties.id,'funk_zones_po_genplan');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan funksional zonalar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='funk_zones_po_genplan' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.zonalarning_nomi+`</a>`;
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





if(map.hasLayer(funk_zones_po_genplan_edit)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:funk_zones_po_genplan_edit&QUERY_LAYERS=dshk:funk_zones_po_genplan_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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
send_feature(data.features[0].properties.id,'funk_zones_po_genplan_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan funksional zonalar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='funk_zones_po_genplan_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.zonalarning_nomi+`</a>`;
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







if(map.hasLayer(funk_zones_po_apot)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:funk_zones_po_apot&QUERY_LAYERS=dshk:funk_zones_po_apot&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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
send_feature(data.features[0].properties.id,'funk_zones_po_apot');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan funksional zonalar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='funk_zones_po_apot' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.zonalarning_nomi+`</a>`;
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


if(map.hasLayer(funk_zones_po_apot_edit)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:funk_zones_po_apot_edit&QUERY_LAYERS=dshk:funk_zones_po_apot_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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
send_feature(data.features[0].properties.id,'funk_zones_po_apot_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan funksional zonalar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='funk_zones_po_apot_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.zonalarning_nomi+`</a>`;
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



if(map.hasLayer(geologik_rayonlash)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:geologik_rayonlash&QUERY_LAYERS=dshk:geologik_rayonlash&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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
send_feature(data.features[0].properties.id,'geologik_rayonlash');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan geologik rayonlashtirish ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='geologik_rayonlash' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.injenerlik_geologik_viloyat_indeksi+`</a>`;
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



if(map.hasLayer(geologik_rayonlash_edit)){


var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:geologik_rayonlash_edit&QUERY_LAYERS=dshk:geologik_rayonlash_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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
send_feature(data.features[0].properties.id,'geologik_rayonlash_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan geologik rayonlashtirish ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='geologik_rayonlash_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.injenerlik_geologik_viloyat_indeksi+`</a>`;
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


if(map.hasLayer(yer_uchaskalari)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:yer_uchaskalari&QUERY_LAYERS=dshk:yer_uchaskalari&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

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


  var text=``;
  text+=`<h4><b>Yer uchaskasi haqida qisqacha ma'lumot</b></h4><hr class='my_hr'><table class='my_table table-striped' style="font-size:14px;">
  <tr><td width='100px'>Kadastr raqami</td><td>`+check_null(data.features[0].properties.nomi)+`</td></tr>
  <tr><td>Turi</td><td>`+check_null(data.features[0].properties.turi)+`</td></tr>
  <tr><td>Joylashgan joyi</td><td>`+check_null(data.features[0].properties.joyi)+`</td></tr>
  <tr><td>F.I.SH</td><td>`+check_null(data.features[0].properties.fio)+`</td></tr>
  <tr><td>Hujjat</td><td>`+check_null(data.features[0].properties.hujjat)+`</td></tr>
    <tr><td>Sana</td><td>`+check_null(data.features[0].properties.sana)+`</td></tr>
      <tr><td>Maydoni</td><td>`+check_null(data.features[0].properties.maydon)+` m<sup>2</sup></td></tr>
  </table>`;


popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(text)
    .openOn(map);
}

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



if(map.hasLayer(redline)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:redline&QUERY_LAYERS=dshk:redline&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data)
      {

if(data.features.length){

var bounds=gsch.bbox(gsch.multiLineString(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);


if(data.features.length==1){
send_feature(data.features[0].properties.id,'redline');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan qizil chiziqlar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='redline' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.nomi+`</a>`;
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


if(map.hasLayer(redline_edit)){

var URL1 = ms_url + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:redline_edit&QUERY_LAYERS=dshk:redline_edit&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;

$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data)
      {

if(data.features.length){

var bounds=gsch.bbox(gsch.multiLineString(data.features[0].geometry.coordinates));
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);


if(data.features.length==1){
send_feature(data.features[0].properties.id,'redline_edit');
}
else
{
var text=`
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">Topilgan qizil chiziqlar ro'yxati:
</a>`;
for(var i in data.features){
text+=`<a href="#" data-layer_name='redline_edit' data-layer_id='`+data.features[i].properties.id+`' class="list-group-item list-group-item-action a_feature_list ">`+data.features[i].properties.nomi+`</a>`;
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


if(map.hasLayer(apz)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:apz&QUERY_LAYERS=dshk:apz&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_apz_full_info(data.features[0].properties.apz);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}

if(map.hasLayer(psd)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:psd&QUERY_LAYERS=dshk:psd&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_psd_full_info(data.features[0].properties.psd);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}
if(map.hasLayer(psd_ind)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:psd_ind&QUERY_LAYERS=dshk:psd_ind&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_psd_ind_full_info(data.features[0].properties.psd_ind);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}

if(map.hasLayer(perm_rec)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:perm_rec&QUERY_LAYERS=dshk:perm_rec&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_perm_rec_full_info(data.features[0].properties.perm_rec);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}
if(map.hasLayer(smr)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:smr&QUERY_LAYERS=dshk:smr&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_smr_full_info(data.features[0].properties.smr);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}
if(map.hasLayer(pexpl)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:pexpl&QUERY_LAYERS=dshk:pexpl&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_pexpl_full_info(data.features[0].properties.pexpl);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}
if(map.hasLayer(pexpl_ind)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:pexpl_ind&QUERY_LAYERS=dshk:pexpl_ind&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data){
if(data.features.length){
create_pexpl_ind_full_info(data.features[0].properties.pexpl_ind);
}},
error:function(){ console.log('Ajaxda xatolik');}
});
}
if(map.hasLayer(loy)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:loy&QUERY_LAYERS=dshk:loy&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data)
      {
if(data.features.length){
create_loyihachi_full_info(data.features[0].properties.inn);
}
},
error:function(){
  console.log('Ajaxda xatolik');
}

});
}
if(map.hasLayer(pud)){
var URL1 = ms_url2 + 'SERVICE=WMS&VERSION=1.1.0&REQUEST=GetFeatureInfo&LAYERS=dshk:pud&QUERY_LAYERS=dshk:pud&BBOX='+BBOX+'&FEATURE_COUNT=100&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application/json&SRS=EPSG:4326&X='+X+'&Y='+Y;
$.ajax({
      url: URL1,
      dataType: "json",
      type: "GET",
      success: function(data)
      {
if(data.features.length){
create_pudratchi_full_info(data.features[0].properties.inn);
}
},
error:function(){
  console.log('Ajaxda xatolik');
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


if(layer_name=='geologik_rayonlash'){
create_popup_geologik_rayonlash(data.features[0].properties);
}

if(layer_name=='geologik_rayonlash_edit'){
create_popup_geologik_rayonlash_edit(data.features[0].properties);
}


if(layer_name=='funk_zones_po_genplan'){
create_popup_funk_zones_po_genplan(data.features[0].properties);
}


if(layer_name=='funk_zones_po_genplan_edit'){
create_popup_funk_zones_po_genplan_edit(data.features[0].properties);
}


if(layer_name=='funk_zones_po_apot'){
create_popup_funk_zones_po_apot(data.features[0].properties);
}

if(layer_name=='funk_zones_po_apot_edit'){
create_popup_funk_zones_po_apot_edit(data.features[0].properties);
}



if(layer_name=='redline'){
create_popup_redline(data.features[0].properties);
}

if(layer_name=='redline_edit'){
create_popup_redline_edit(data.features[0].properties);
}

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
});

function $_GET(param) {
  // alert(1)
  var vars = {};

  window.location.href.replace(location.hash, '' ).replace(/&amp;/gi,"&").replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    // console.log(vars);
    return vars[param] ? vars[param] : null;
  }
  return vars;

}

if ($_GET('sub')){
  map.flyToBounds([[$_GET('lng0'),$_GET('lat0')],[$_GET('lng1'),$_GET('lat1')]]);
  $('.menu-items[data-n='+$_GET('sub')+']')[0].click();
  $('.tr2_sub2menu[data-val='+$_GET('subs')+']')[0].click();

if ($_GET('subs')=='21')
  apot = L.nonTiledLayer.wms('/geodata', {
              maxZoom: 20,
              minZoom: 1,
              zIndex: 1,
              opacity: 0.8,
              layers: 'dshk:apots',
              format: 'image/png',
              transparent: true,
          }).addTo(map);

if ($_GET('subs')=='22')
            genplan = L.nonTiledLayer.wms('/geodata', {
                        maxZoom: 20,
                        minZoom: 1,
                        zIndex: 1,
                        opacity: 0.8,
                        layers: 'dshk:genplans',
                        format: 'image/png',
                        transparent: true,
}).addTo(map);


}
else{
  map.addLayer(uzb_vil);
}

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

$(document).on('click','.fly_to_bounds',function(){
var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:"+$(this).attr('data-layer_name')+"&outputFormat=application%2Fjson&cql_filter=id='"+$(this).attr('data-id')+"'";
$.getJSON(url, function(data)
{

if(data.features[0].geometry.type=='LineString'){
var bounds=gsch.bbox(gsch.lineString(data.features[0].geometry.coordinates));
}
if(data.features[0].geometry.type=='MultiLineString'){
var bounds=gsch.bbox(gsch.multiLineString(data.features[0].geometry.coordinates));
}

if(data.features[0].geometry.type=='MultiPolygon'){
var bounds=gsch.bbox(gsch.multiPolygon(data.features[0].geometry.coordinates));
}
if(data.features[0].geometry.type=='Polygon'){
var bounds=gsch.bbox(gsch.Polygon(data.features[0].geometry.coordinates));
}
map.flyToBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]]);
});
});


$(document).on('click','.fly_to_bounds_geo_ray',function(){
var url="/geodata?service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:"+$(this).attr('data-layer_name')+"&outputFormat=application%2Fjson&cql_filter="+$(this).attr('data-data_type')+"='"+$(this).attr('data-id')+"'";
$.getJSON(url, function(data)
{
map.flyToBounds(L.geoJson(data).getBounds());
});
});




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
<input type="text" id='search_data_input_begin' autocomplete="off" class = "form-control">
<div class="input-group-addon"> <label >--</label> </div>
<input type="text" id='search_data_input_end' autocomplete="off" class = "form-control">
<div class="input-group-addon" style='padding:0px 2px 0px 2px;'><button id='button_date_filter' class='btn btn-success' style='margin:2px; padding:3px;'>Qidirish</button></div>
<input type="text" id="search-field_pod9" style='display:none;'>
<div class="input-group-addon"> <label id="item-count_pod9" >`+$('#item-count_pod9').text()+`</label> </div>
`;

$('#search_data_div').html(text);

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
  if($('.leaflet-draw-actions-bottom li').last().attr('yes')==undefined){

  $('.leaflet-draw-actions-bottom li').last().attr('yes','1');
  $('.leaflet-draw-actions-bottom li').last().append(`<a class="draw_delete_all" href="#" title="Barchasini o'chirish">Barchasini o'chirish</a>`);
}
  $('#tab-action-draw').css({'top':'558px'});
});

$('#draw_edit').on('click',function(){
  $('.leaflet-draw-edit-edit')[0].click();
  $('#tab-action-draw').css({'top':'618px'});
});


$('.leaflet-draw-actions').appendTo('#tab-action-draw');

$(document).on('click','.draw_delete_all',function(){
 drawnItems.clearLayers();
($('.leaflet-draw-actions-bottom a').first())[0].click();
});
