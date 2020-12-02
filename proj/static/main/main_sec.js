 $(document).on('click','#checkbox_id_2_3_2',function(){
    if($(this).prop('checked')&&map.hasLayer(pdp)==false){
        pdp = L.nonTiledLayer.wms('/geodata', {
            zIndex: 1,
            maxZoom: 20,
            minZoom: 1,             
            opacity: 0.8,
            layers: 'dshk:pdp',
            format: 'image/png',
            transparent: true,
        }).addTo(map);
  
 
}
else{
        map.removeLayer(pdp);
    }
});

$(document).on('click','#checkbox_id_2_3_2_1',function(){
    if($(this).prop('checked')&&map.hasLayer(pdp_edit)==false){
     pdp_edit = L.nonTiledLayer.wms('/geodata', {
            zIndex: 1,
            maxZoom: 20,
            minZoom: 1,             
            opacity: 0.8,
            layers: 'dshk:pdp_edit',
            format: 'image/png',
            transparent: true,
            }).addTo(map);

$('.pdp_edit_checkbox').each(function(){
  $(this).prop('checked',true);
});
}
else{
        map.removeLayer(pdp_edit);
        $('.pdp_edit_checkbox').each(function(){
        $(this).prop('checked',false);
});
    }
});

$(document).on('click','#checkbox_id_2_3_1',function(){
    if($(this).prop('checked')&&map.hasLayer(genplan)==false){
        genplan = L.nonTiledLayer.wms('/geodata',
         {
            zIndex: 1,
            maxZoom: 20,
            minZoom: 1,             
            opacity: 0.8,
            layers: 'dshk:genplans',
            format: 'image/png',
            transparent: true,
        }).addTo(map);
  
  $('.genplan_checkbox').each(function(){
  $(this).prop('checked',true);
});
 $('.genplan_vil_checkbox').each(function(){
  $(this).prop('checked',true);
});
    
}
else{
        map.removeLayer(genplan);
    $('.genplan_checkbox').each(function(){
  $(this).prop('checked',false);
});
 $('.genplan_vil_checkbox').each(function(){
  $(this).prop('checked',false);
});
    }
});


$(document).on('click','#checkbox_id_2_3_1_1',function(){
    if($(this).prop('checked')&&map.hasLayer(genplan_edit)==false){
     genplan_edit = L.nonTiledLayer.wms('/geodata', {
            zIndex: 1,
            maxZoom: 20,
            minZoom: 1,             
            opacity: 0.8,
            layers: 'dshk:genplans_edit',
            format: 'image/png',
            transparent: true,
            }).addTo(map);

$('.genplan_edit_checkbox').each(function(){
  $(this).prop('checked',true);
});
}
else{
        map.removeLayer(genplan_edit);
        $('.genplan_edit_checkbox').each(function(){
        $(this).prop('checked',false);
});
    }
});


$(document).on('click','#checkbox_id_2_2_1_1',function(){
    if($(this).prop('checked')){
     apot_edit = L.nonTiledLayer.wms('/geodata', {
            zIndex: 1,
            maxZoom: 20,
            minZoom: 1,             
            opacity: 0.8,
            layers: 'dshk:apots_edit',
            format: 'image/png',
            transparent: true,
            }).addTo(map);

$('.apot_edit_checkbox').each(function(){
  $(this).prop('checked',true);
});
}
else{
        map.removeLayer(apot_edit);
        $('.apot_edit_checkbox').each(function(){
        $(this).prop('checked',false);
});
    }
});


$(document).on('click','#checkbox_id_2_2_1',function(){
if($(this).prop('checked')){
apot = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:apots',
            format: 'image/png',
            transparent: true,
        }).addTo(map);

$('.apot_checkbox').each(function(){
  $(this).prop('checked',true);
});
$('.apot_vil_checkbox').each(function(){
  $(this).prop('checked',true);
});
  }
  else{
    map.removeLayer(apot);
   $('.apot_checkbox').each(function(){
  $(this).prop('checked',false);
});
   $('.apot_vil_checkbox').each(function(){
  $(this).prop('checked',false);
});
  }
});

$(document).on('click','#checkbox_id_1_1_1',function(){

if($(this).prop('checked')){
funk_zones_po_genplan = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:funk_zones_po_genplan',
            format: 'image/png',
            transparent: true,
        }).addTo(map);
$('.funk_zones_po_genplan_checkbox').each(function(){
  $(this).prop('checked',true);
});

  }
  else{
    map.removeLayer(funk_zones_po_genplan);
       $('.funk_zones_po_genplan_checkbox').each(function(){
  $(this).prop('checked',false);
});

  }

});

$(document).on('click','#checkbox_id_1_2_1',function(){
if($(this).prop('checked')){
  map.addLayer(red_lines);
  }
  else{
    map.removeLayer(red_lines);
      
  }
});


$(document).on('click','#checkbox_id_1_3_1',function(){
if($(this).prop('checked')){
  map.addLayer(geologik_rayonlash);
  }
  else{
    map.removeLayer(geologik_rayonlash);
      
  }
});

$(document).on('click','#checkbox_id_1_1_2',function(){
if($(this).prop('checked')){
funk_zones_po_apot = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 2, 
            opacity: 0.8,
            layers: 'dshk:funk_zones_po_apot',
            format: 'image/png',
            transparent: true,
        }).addTo(map);
$('.funk_zones_po_apot_checkbox').each(function(){
  $(this).prop('checked',true);
});

  }
  else{
    map.removeLayer(funk_zones_po_apot);
       $('.funk_zones_po_apot_checkbox').each(function(){
  $(this).prop('checked',false);
});

  }
});


$(document).on('click','.info_png',function(){

  $('#p_sub4menu').html($(this).attr('data-layer_dis'));
$('#sub4menu_div').html('');
var text;

if($(this).attr('data-layer_name')=='funk_zones_po_genplan'){

var zone_type=[
{'type':"Avtomabil yo'llari",'filter':'1'},
{'type':"Harbiy ob'yektlar va rejimli hududlar zonalari",'filter':'2'},
{'type':"Ijtimoiy amaliy zonalar",'filter':'3'},
{'type':"Ishlab chiqarish zonalari",'filter':'4'},
{'type':"Maxsus maqsadlarga mo'ljallangan zonalar",'filter':'5'},
{'type':"Muhandislik va transportga oid infratuzulmalar",'filter':'6'},
{'type':"Rekreatsion zonalar",'filter':'7'},
{'type':"Turar joy zonalari",'filter':'8'},
{'type':"Qishloq xo'jaligi maqsadlarida foydalaniladigan zonalar",'filter':'9'},
{'type':"Shahar atrofi zonalari",'filter':'10'},
];


  text=`<table class='table_4'>
<tr><td><img src='/static/img/table-icon.png' data-layer_name='funk_zones_po_genplan' class='info_table'></td><td colspan='2' >Barcha funk zonalar ro'yxati</td></tr>
  `;



for(var zone in zone_type){
   text+=`<tr><td><img src='/static/img/img_funk_zones/funk_zone_`+zone_type[zone].filter+`.png' class='img_label'></td><td><input type='checkbox' class='funk_zones_po_genplan_checkbox' data-filter='`+zone_type[zone].filter+`' id='fzpg_info_`+zone+`'></td><td><label class='info_label' for='fzpg_info_`+zone+`'>`+zone_type[zone].type+`</label></td><tr>`; 
  }
  
   text+="</table>";
$('#sub4menu_div').html(text);
}


if($(this).attr('data-layer_name')=='funk_zones_po_apot'){

var zone_type=[
{'type':"Harbiy ob'yektlar va rejimli hududlar zonalari",'filter':'2'},
{'type':"Ijtimoiy amaliy zonalar",'filter':'3'},
{'type':"Ishlab chiqarish zonalari",'filter':'4'},
{'type':"Maxsus maqsadlarga mo'ljallangan zonalar",'filter':'5'},
{'type':"Muhandislik va transportga oid infratuzulmalar",'filter':'6'},
{'type':"Rekreatsion zonalar",'filter':'7'},
{'type':"Turar joy zonalari",'filter':'8'},
{'type':"Qishloq xo'jaligi maqsadlarida foydalaniladigan zonalar",'filter':'9'},
];


  text=`<table class='table_4'>
<tr><td><img src='/static/img/table-icon.png' data-layer_name='funk_zones_po_apot' class='info_table'></td><td colspan='2' >Barcha funk zonalar ro'yxati</td></tr>
  `;

for(var zone in zone_type){
   text+=`<tr><td><img src='/static/img/img_funk_zones/funk_zone_`+zone_type[zone].filter+`.png' class='img_label'></td><td><input type='checkbox' class='funk_zones_po_apot_checkbox' data-filter='`+zone_type[zone].filter+`' id='fzpa_info_`+zone+`'></td><td><label class='info_label' for='fzpa_info_`+zone+`'>`+zone_type[zone].type+`</label></td></tr>`; 
  }
  
   text+="</table>";
$('#sub4menu_div').html(text);
}


if($(this).attr('data-layer_name')=='apot'){
  text=`
<table class='table_4'>
<tr><td><img src='/static/img/table-icon.png' data-layer_name='apot' data-filter='-0' class='info_table'></td><td colspan='3' >Barcha ob'yektlar ro'yxati</td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='apot' data-filter_type='tas' data-filter='1' class='info_table'></td><td><img src='/static/img/apot_tas_1.png' class='img_label'></td><td><input type='checkbox' class='apot_checkbox' data-filter='1' id='apot_info_1'></td><td><label class='info_label' for='apot_info_1'>Tasdiqlangan</label></td></tr>
   <tr><td><img src='/static/img/table-icon.png' data-layer_name='apot' data-filter_type='tas' data-filter='0' class='info_table'></td><td><img src='/static/img/apot_tas_0.png' class='img_label'></td><td><input type='checkbox' class='apot_checkbox' data-filter='0' id='apot_info_0'></td><td><label class='info_label' for='apot_info_0'>Tasdiqlanmagan</label></td></tr>
    <tr><td><img src='/static/img/table-icon.png' data-layer_name='apot' data-filter_type='tas' data-filter='2' class='info_table'></td><td><img src='/static/img/apot_tas_2.png' class='img_label'></td><td><input type='checkbox' class='apot_checkbox' data-filter='2' id='apot_info_2'></td><td><label class='info_label' for='apot_info_2'>Ma'lumot yo'q</label></td></tr>
 </table>
<hr>
<table class='table_4'>
<tr>
<td><input type='checkbox' id='open_viloyat_table'></td>
 <td><label class='info_label' for='open_viloyat_table'>Viloyatlar kesimida ko'rish</label></td></tr></table>

<table class='table_4' id='viloyat_list_table' style='display:none;'>`;
for (var vil in viloyat){
text+=`<tr><td><img src='/static/img/table-icon.png' data-layer_name='apot' data-filter_type='vil' data-filter='`+viloyat[vil].id+`' class='info_table'></td><td><input type='checkbox' class='apot_vil_checkbox' data-filter='`+viloyat[vil].id+`' id='apot_vil_info_`+viloyat[vil].id+`'></td><td><label class='info_label' for='apot_vil_info_`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</label></td></tr>`;
}
text+=`</table>`;

$('#sub4menu_div').html(text);
}



if($(this).attr('data-layer_name')=='apot_edit'){
  text=`
<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-filter_type='status' data-layer_name='apot_edit' data-filter='1' class='info_table'></td><td><img src='/static/img/status_1.png' class='img_label'></td><td><input type='checkbox' class='apot_edit_checkbox' data-filter='1' id='apot_info_1'></td><td><label class='info_label' for='apot_info_1'>yangi</label></td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-filter_type='status' data-layer_name='apot_edit' data-filter='2' class='info_table'></td><td><img src='/static/img/status_2.png' class='img_label'></td><td><input type='checkbox' class='apot_edit_checkbox' data-filter='2' id='apot_info_2'></td><td><label class='info_label' for='apot_info_2'>uzgargan</label></td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-filter_type='status' data-layer_name='apot_edit' data-filter='3' class='info_table'></td><td><img src='/static/img/status_3.png' class='img_label'></td><td><input type='checkbox' class='apot_edit_checkbox' data-filter='3' id='apot_info_3'></td><td><label class='info_label' for='apot_info_3'>uchirilgan</label></td></tr>
    
    </table>
<hr>
<table class='table_4'>
<tr>
<td><input type='checkbox' id='open_viloyat_table'></td>
 <td><label class='info_label' for='open_viloyat_table'>Viloyatlar kesimida ko'rish</label></td></tr></table>

<table class='table_4' id='viloyat_list_table' style='display:none;'>`;
for (var vil in viloyat){
text+=`<tr><td><img src='/static/img/table-icon.png' data-layer_name='apot_edit' data-filter_type='vil' data-filter='`+viloyat[vil].id+`' class='info_table'></td><td><input type='checkbox' class='apot_edit_vil_checkbox' data-filter='`+viloyat[vil].id+`' id='apot_edit_vil_info_`+viloyat[vil].id+`'></td><td><label class='info_label' for='apot_edit_vil_info_`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</label></td></tr>`;
}
text+=`</table>`;

$('#sub4menu_div').html(text);
}


if($(this).attr('data-layer_name')=='genplan'){
  text=`
<table class='table_4'>
<tr><td><img src='/static/img/table-icon.png' data-layer_name='genplan' data-filter='-0' class='info_table'></td><td colspan='3' >Barcha ob'yektlar ro'yxati</td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='genplan' data-filter_type='tas' data-filter='1' class='info_table'></td><td><img src='/static/img/genplan_tas_1.png' class='img_label'></td><td><input type='checkbox' class='genplan_checkbox' data-filter='1' id='genplan_info_1'></td><td><label class='info_label' for='genplan_info_1'>Tasdiqlangan</label></td></tr>
   <tr><td><img src='/static/img/table-icon.png' data-layer_name='genplan' data-filter_type='tas' data-filter='0' class='info_table'></td><td><img src='/static/img/genplan_tas_0.png' class='img_label'></td><td><input type='checkbox' class='genplan_checkbox' data-filter='0' id='genplan_info_0'></td><td><label class='info_label' for='genplan_info_0'>Tasdiqlanmagan</label></td></tr>
 </table>
<hr>
<table class='table_4'>
<tr>
<td><input type='checkbox' id='open_viloyat_table'></td>
 <td><label class='info_label' for='open_viloyat_table'>Viloyatlar kesimida ko'rish</label></td></tr></table>

<table class='table_4' id='viloyat_list_table' style='display:none;'>`;
for (var vil in viloyat){
text+=`<tr><td><img src='/static/img/table-icon.png' data-layer_name='genplan' data-filter_type='vil' data-filter='`+viloyat[vil].id+`' class='info_table'></td><td><input type='checkbox' class='genplan_vil_checkbox' data-filter='`+viloyat[vil].id+`' id='genplan_vil_info_`+viloyat[vil].id+`'></td><td><label class='info_label' for='genplan_vil_info_`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</label></td></tr>`;
}

text+=`</table>`;

$('#sub4menu_div').html(text);
}

if($(this).attr('data-layer_name')=='genplan_edit'){
  text=`
<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-filter_type='status' data-layer_name='genplan_edit' data-filter='1' class='info_table'></td><td><img src='/static/img/status_1.png' class='img_label'></td><td><input type='checkbox' class='genplan_edit_checkbox' data-filter='1' id='genplan_info_1'></td><td><label class='info_label' for='genplan_info_1'>yangi</label></td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-filter_type='status' data-layer_name='genplan_edit' data-filter='2' class='info_table'></td><td><img src='/static/img/status_2.png' class='img_label'></td><td><input type='checkbox' class='genplan_edit_checkbox' data-filter='2' id='genplan_info_2'></td><td><label class='info_label' for='genplan_info_2'>uzgargan</label></td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-filter_type='status' data-layer_name='genplan_edit' data-filter='3' class='info_table'></td><td><img src='/static/img/status_3.png' class='img_label'></td><td><input type='checkbox' class='genplan_edit_checkbox' data-filter='3' id='genplan_info_3'></td><td><label class='info_label' for='genplan_info_3'>uchirilgan</label></td></tr>
    </table>
<hr>
<table class='table_4'>
<tr>
<td><input type='checkbox' id='open_viloyat_table'></td>
 <td><label class='info_label' for='open_viloyat_table'>Viloyatlar kesimida ko'rish</label></td></tr></table>

<table class='table_4' id='viloyat_list_table' style='display:none;'>`;
for (var vil in viloyat){
text+=`<tr><td><img src='/static/img/table-icon.png' data-layer_name='genplan_edit' data-filter_type='vil' data-filter='`+viloyat[vil].id+`' class='info_table'></td><td><input type='checkbox' class='genplan_edit_vil_checkbox' data-filter='`+viloyat[vil].id+`' id='genplan_edit_vil_info_`+viloyat[vil].id+`'></td><td><label class='info_label' for='genplan_edit_vil_info_`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</label></td></tr>`;
}
text+=`</table>`;

$('#sub4menu_div').html(text);
}


if($(this).attr('data-layer_name')=='pdp'){
  text=`
<table class='table_4'> 
<tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp' data-filter_type='tas' data-filter='-0' class='info_table'></td><td colspan='3' >Barcha ob'yektlar ro'yxati</td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp' data-filter_type='tas' data-filter='1' class='info_table'></td><td><img src='/static/img/pdp_tas_1.png' class='img_label'></td><td><input type='checkbox' class='pdp_checkbox' data-filter='1' id='pdp_info_1'></td><td><label class='info_label' for='pdp_info_1'>Tasdiqlangan</label></td></tr>
   <tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp' data-filter_type='tas' data-filter='0' class='info_table'></td><td><img src='/static/img/pdp_tas_0.png' class='img_label'></td><td><input type='checkbox' class='pdp_checkbox' data-filter='0' id='pdp_info_0'></td><td><label class='info_label' for='pdp_info_0'>Tasdiqlanmagan</label></td></tr>
 </table>
<hr>
<table class='table_4'>
<tr>
<td><input type='checkbox' id='open_viloyat_table'></td>
 <td><label class='info_label' for='open_viloyat_table'>Viloyatlar kesimida ko'rish</label></td></tr></table>

<table class='table_4' id='viloyat_list_table' style='display:none;'>`;
for (var vil in viloyat){
text+=`<tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp' data-filter_type='vil' data-filter='`+viloyat[vil].id+`' class='info_table'></td><td><input type='checkbox' class='pdp_vil_checkbox' data-filter='`+viloyat[vil].id+`' id='pdp_vil_info_`+viloyat[vil].id+`'></td><td><label class='info_label' for='pdp_vil_info_`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</label></td></tr>`;
}

text+=`</table>`;

$('#sub4menu_div').html(text);
}



if($(this).attr('data-layer_name')=='pdp_edit'){
  text=`
<table class='table_4'>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp_edit' data-filter='1' data-filter_type='status' class='info_table'></td><td><img src='/static/img/status_1.png' class='img_label'></td><td><input type='checkbox' class='pdp_edit_checkbox' data-filter='1' id='pdp_info_1'></td><td><label class='info_label' for='pdp_info_1'>yangi</label></td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp_edit' data-filter='2' data-filter_type='status' class='info_table'></td><td><img src='/static/img/status_2.png' class='img_label'></td><td><input type='checkbox' class='pdp_edit_checkbox' data-filter='2' id='pdp_info_2'></td><td><label class='info_label' for='pdp_info_2'>uzgargan</label></td></tr>
  <tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp_edit' data-filter='3' data-filter_type='status' class='info_table'></td><td><img src='/static/img/status_3.png' class='img_label'></td><td><input type='checkbox' class='pdp_edit_checkbox' data-filter='3' id='pdp_info_3'></td><td><label class='info_label' for='pdp_info_3'>uchirilgan</label></td></tr>
    </table>
<hr>
<table class='table_4'>
<tr>
<td><input type='checkbox' id='open_viloyat_table'></td>
 <td><label class='info_label' for='open_viloyat_table'>Viloyatlar kesimida ko'rish</label></td></tr></table>

<table class='table_4' id='viloyat_list_table' style='display:none;'>`;
for (var vil in viloyat){
text+=`<tr><td><img src='/static/img/table-icon.png' data-layer_name='pdp_edit' data-filter_type='vil' data-filter='`+viloyat[vil].id+`' class='info_table'></td><td><input type='checkbox' class='pdp_edit_vil_checkbox' data-filter='`+viloyat[vil].id+`' id='pdp_edit_vil_info_`+viloyat[vil].id+`'></td><td><label class='info_label' for='pdp_edit_vil_info_`+viloyat[vil].id+`'>`+viloyat[vil].disUz+`</label></td></tr>`;
}
text+=`</table>`;


$('#sub4menu_div').html(text);
}



 $('#sub4menu').css({'height':'auto','border': '1px solid rgba(0,0,0,.25)',
  'padding':'10px'});

});


$(document).on('click',"#open_viloyat_table",function(){
if($(this).prop('checked')){
  $('#viloyat_list_table').css({'display':'block'});
}
  else{
$('#viloyat_list_table').css({'display':'none'});
  }
});



$(document).on('click','.funk_zones_po_genplan_checkbox',function(){

var filter='';
var c=true;
  $(".funk_zones_po_genplan_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="type='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR type='"+$(this).attr('data-filter')+"'";
 }
  }
   });

   if(c)
  {
    if($('#checkbox_id_1_1_1').prop('checked')){
   $('#checkbox_id_1_1_1').prop('checked',false);
    }
  if(map.hasLayer(funk_zones_po_genplan))
  map.removeLayer(funk_zones_po_genplan);
  }
  else
  {
$('#checkbox_id_1_1_1').prop('checked',true);

if(map.hasLayer(funk_zones_po_genplan))
map.removeLayer(funk_zones_po_genplan);
funk_zones_po_genplan = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:funk_zones_po_genplan',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:filter,
        }).addTo(map);

  }
      
});

$(document).on('click','.funk_zones_po_apot_checkbox',function(){

var filter='';
var c=true;
  $(".funk_zones_po_apot_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="type='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR type='"+$(this).attr('data-filter')+"'";
 }
  }
   });

   if(c)
  {
    if($('#checkbox_id_1_1_2').prop('checked')){
   $('#checkbox_id_1_1_2').prop('checked',false);
    }
  if(map.hasLayer(funk_zones_po_apot))
  map.removeLayer(funk_zones_po_apot);
  }
  else
  {
$('#checkbox_id_1_1_2').prop('checked',true);

if(map.hasLayer(funk_zones_po_apot))
map.removeLayer(funk_zones_po_apot);
funk_zones_po_apot = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:funk_zones_po_apot',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:filter,
        }).addTo(map);

  }
      
});


$(document).on('click','.genplan_checkbox',function(){

var filter='';

var c=true;
  $(".genplan_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".genplan_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}

if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_1').prop('checked')){
 $('#checkbox_id_2_3_1').prop('checked',false);
    }
  if(map.hasLayer(genplan))
  map.removeLayer(genplan);
  }
  else{
$('#checkbox_id_2_3_1').prop('checked',true);

if(map.hasLayer(genplan))
map.removeLayer(genplan);

genplan = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:genplans',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});


$(document).on('click','.genplan_vil_checkbox',function(){


var filter='';

var c=true;
  $(".genplan_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".genplan_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_1').prop('checked')){
 $('#checkbox_id_2_3_1').prop('checked',false);
    }
  if(map.hasLayer(genplan))
  map.removeLayer(genplan);
  }
  else{
$('#checkbox_id_2_3_1').prop('checked',true);

if(map.hasLayer(genplan))
map.removeLayer(genplan);

genplan = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:genplans',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
   
});

$(document).on('click','.genplan_edit_checkbox',function(){

var filter='';

var c=true;
  $(".genplan_edit_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="status='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR status='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".genplan_edit_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}

if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_1_1').prop('checked')){
 $('#checkbox_id_2_3_1_1').prop('checked',false);
    }
  if(map.hasLayer(genplan_edit))
  map.removeLayer(genplan_edit);
  }
  else{
$('#checkbox_id_2_3_1_1').prop('checked',true);

if(map.hasLayer(genplan_edit))
map.removeLayer(genplan_edit);

genplan_edit = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:genplans_edit',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});

$(document).on('click','.genplan_edit_vil_checkbox',function(){


var filter='';

var c=true;
  $(".genplan_edit_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="status='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR status='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".genplan_edit_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_1_1').prop('checked')){
 $('#checkbox_id_2_3_1_1').prop('checked',false);
    }
  if(map.hasLayer(genplan_edit))
  map.removeLayer(genplan_edit);
  }
  else{
$('#checkbox_id_2_3_1_1').prop('checked',true);

if(map.hasLayer(genplan_edit))
map.removeLayer(genplan_edit);

genplan_edit = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:genplans_edit',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});

$(document).on('click','.apot_checkbox',function(){

var filter='';

var c=true;
  $(".apot_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".apot_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}

if(c==true && c2==true)
  {
 if($('#checkbox_id_2_2_1').prop('checked')){
 $('#checkbox_id_2_2_1').prop('checked',false);
    }
  if(map.hasLayer(apot))
  map.removeLayer(apot);
  }
  else{
$('#checkbox_id_2_2_1').prop('checked',true);

if(map.hasLayer(apot))
map.removeLayer(apot);

apot = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:apots',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});

$(document).on('click','.apot_vil_checkbox',function(){

var filter='';

var c=true;
  $(".apot_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".apot_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true)
  {
 if($('#checkbox_id_2_2_1').prop('checked')){
 $('#checkbox_id_2_2_1').prop('checked',false);
    }
  if(map.hasLayer(apot))
  map.removeLayer(apot);
  }
  else{
$('#checkbox_id_2_2_1').prop('checked',true);

if(map.hasLayer(apot))
map.removeLayer(apot);

apot = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:apots',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
   
});


$(document).on('click','.apot_edit_checkbox',function(){

var filter='';

var c=true;
  $(".apot_edit_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="status='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR status='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".apot_edit_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true){
 if($('#checkbox_id_2_2_1_1').prop('checked')){
 $('#checkbox_id_2_2_1_1').prop('checked',false);
    }
  if(map.hasLayer(apot_edit))
  map.removeLayer(apot_edit);
  }
  else{
$('#checkbox_id_2_2_1_1').prop('checked',true);

if(map.hasLayer(apot_edit))
map.removeLayer(apot_edit);

apot_edit = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:apots_edit',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});

$(document).on('click','.apot_edit_vil_checkbox',function(){
var filter='';
var c=true;
  $(".apot_edit_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="status='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR status='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".apot_edit_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else
 {
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }}
 });
if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true)
  {
 if($('#checkbox_id_2_2_1_1').prop('checked')){
 $('#checkbox_id_2_2_1_1').prop('checked',false);
    }
  if(map.hasLayer(apot_edit))
  map.removeLayer(apot_edit);
  }
  else{
$('#checkbox_id_2_3_1_1').prop('checked',true);

if(map.hasLayer(apot_edit))
map.removeLayer(apot_edit);

apot_edit = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:apots_edit',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});


$(document).on('click','.pdp_checkbox',function(){
var filter='';
var c=true;
  $(".pdp_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".pdp_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}

if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_2').prop('checked')){
 $('#checkbox_id_2_3_2').prop('checked',false);
    }
  if(map.hasLayer(pdp))
  map.removeLayer(pdp);
  }
  else{
$('#checkbox_id_2_3_2').prop('checked',true);

if(map.hasLayer(pdp))
map.removeLayer(pdp);

pdp = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:pdp',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
});


$(document).on('click','.pdp_vil_checkbox',function(){

var filter='';

var c=true;
  $(".pdp_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR tasdiqlanganligi='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".pdp_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_2').prop('checked')){
 $('#checkbox_id_2_3_2').prop('checked',false);
    }
  if(map.hasLayer(pdp))
  map.removeLayer(pdp);
  }
  else{
$('#checkbox_id_2_3_2').prop('checked',true);

if(map.hasLayer(pdp))
map.removeLayer(pdp);

pdp = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:pdp',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
   
});

$(document).on('click','.pdp_edit_checkbox',function(){

var filter='';

var c=true;
  $(".pdp_edit_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="status='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR status='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".pdp_edit_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}

if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_2_1').prop('checked')){
 $('#checkbox_id_2_3_2_1').prop('checked',false);
    }
  if(map.hasLayer(pdp_edit))
  map.removeLayer(pdp_edit);
  }
  else{
$('#checkbox_id_2_3_2_1').prop('checked',true);

if(map.hasLayer(pdp_edit))
map.removeLayer(pdp_edit);

pdp_edit = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:pdp_edit',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }

  
});

$(document).on('click','.pdp_edit_vil_checkbox',function(){

var filter='';

var c=true;
  $(".pdp_edit_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c){
   filter+="status='"+$(this).attr('data-filter')+"'";
   c=false;
 }
 else{
   filter+=" OR status='"+$(this).attr('data-filter')+"'";
 }
  }
 });

var filter2=''
 var c2=true;
  $(".pdp_edit_vil_checkbox").each(function(){
    if($(this).prop('checked')){
      if(c2){
   filter2+="respublika_viloyat='"+$(this).attr('data-filter')+"'";
   c2=false;
 }
 else{
   filter2+=" OR respublika_viloyat='"+$(this).attr('data-filter')+"'";
 }
  }
 });

if(filter.search('OR')!=-1)
  filter='('+filter+')';
if(filter2.search('OR')!=-1)
  filter2='('+filter2+')';
var main_filter='';
if(c==false && c2==false)
main_filter=filter+' AND '+filter2;
else
{
if(!c){
  main_filter=filter;
}
if(!c2){
  main_filter=filter2;
}
}
if(c==true && c2==true)
  {
 if($('#checkbox_id_2_3_2_1').prop('checked')){
 $('#checkbox_id_2_3_2_1').prop('checked',false);
    }
  if(map.hasLayer(pdp_edit))
  map.removeLayer(pdp_edit);
  }
  else{
$('#checkbox_id_2_3_2_1').prop('checked',true);

if(map.hasLayer(pdp_edit))
map.removeLayer(pdp_edit);

pdp_edit = L.nonTiledLayer.wms('/geodata', {
            maxZoom: 20,
            minZoom: 1,
            zIndex: 1, 
            opacity: 0.8,
            layers: 'dshk:pdp_edit',
            format: 'image/png',
            transparent: true,
            CQL_FILTER:main_filter,
        }).addTo(map);

  }
 
});




$(document).on('click','.info_table',function(){
  $(this).css({'cursor':'wait'});
$('#search-field').val('');

if($(this).attr('data-layer_name')=='geologik_rayonlash'){
  var url="/geodata/service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:geologiya_chegara&outputFormat=application%2Fjson";


$.getJSON(url, function (data) {
   var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,20)'>№</td>\
   <td onclick='sortTable(1)' >Viloyat</td>\
   <td onclick='sortTable(2)' >Tuman</td>\
   <td onclick='sortTable(3)' >Joy nomi</td>\
   <td onclick='sortTable(4)' >SOATO</td>\
   <td onclick='sortTable(5)'>Obyekt nomi</td>\
   <td onclick='sortTable(6)'>Bajaruvchi tashkilot</td>\
   <td onclick='sortTable(7)'>Buyurtmachi</td>\
   <td onclick='sortTable(8)'>Inv nomeri</td>\
   <td onclick='sortTable(9)'>grif</td>\
   <td onclick='sortTable(10)'>Koordinatalar tizimi</td>\
   <td onclick='sortTable(11)' >Masshtab</td>\
   <td onclick='sortTable(12)' >Ish boshlangan vaqt</td>\
   <td onclick='sortTable(13)' >Ish yakunlangan vaqt</td>\
   <td onclick='sortTable(14)' >Ish bajarilgan davr</td>\
   <td onclick='sortTable(15)'>Maydoni(ga)</td>\
   <td onclick='sortTable(16)'>Bajaruvchi shaxs</td>\
   <td onclick='sortTable(17)'>Shartnoma №</td>\
   <td onclick='sortTable(18)'>Shartnoma nomi</td>\
   <td onclick='sortTable(19)'>Izoh</td>\
    </tr>"

    for(var i=0;i<data.features.length;i++){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));

      text+="<tr>\
      <td>"+(1+i)+"\
<br><img src='/static/img/funk_zones.png' data-dtype='funk_zone' class='click_set_object' data-id='"+data.features[i].properties.id+"' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>\
<td>"+data.features[i].properties.viloyat+"</td>\
<td>"+data.features[i].properties.tuman+"</td>\
<td>"+data.features[i].properties.joy_nomi+"</td>\
<td>"+data.features[i].properties.soato+"</td>\
<td>"+data.features[i].properties.obyekt_nomi+"</td>\
<td>"+data.features[i].properties.bajaruvchi_tashkilot+"</td>\
<td>"+data.features[i].properties.buyurtmachi+"</td>\
<td>"+data.features[i].properties.inv_nomer+"</td>\
<td>"+data.features[i].properties.grif+"</td>\
<td>"+data.features[i].properties.koordinatalar_tizimi+"</td>\
<td>"+data.features[i].properties.masshtab+"</td>\
<td>"+data.features[i].properties.ish_boshlangan_vaqt+"</td>\
<td>"+data.features[i].properties.ish_yakunlangan_vaqt+"</td>\
<td>"+data.features[i].properties.ish_bajarilgan_davr+"</td>\
<td>"+data.features[i].properties.maydoni_ga+"</td>\
<td>"+data.features[i].properties.bajaruvchi_shaxs+"</td>\
<td>"+data.features[i].properties.shartnoma_n+"</td>\
<td>"+data.features[i].properties.shartnoma_nomi+"</td>\
<td>"+data.features[i].properties.izoh+"</td>\
 <td style='display:none;' >"+(1+i)+"</td>\
            </tr>";

    }

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','funk_zones_po_genplan');
$('#to_xlsx').attr('dtype','funk_zones_po_genplan');
$('#title_table').html("Geologik rayonlashtirish bo'yicha qilingan ishlar ro'yxati");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='3'>Joy nomi</option>\
                  <option value='1'>Viloyat nomi bo'yicha</option>\
                  <option value='2'>Tuman nomi bo'yicha</option>";

$('#search-field-id').html(select_items);
$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',

       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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
document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);

});

}


if($(this).attr('data-layer_name')=='funk_zones_po_genplan'){

  var url="/geodata/service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:genplans&outputFormat=application%2Fjson";

$.getJSON(url, function (data) {
   var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,14)'>№</td>\
   <td onclick='sortTable(1)' >Aholi punktining nomi</td>\
   <td onclick='sortTable(2)' >Respublika, viloyat</td>\
   <td onclick='sortTable(3)' >Tuman, shahar</td>\
   <td onclick='sortTable(4)' >Mamuriy hududiy birliklarni  belgilash tizimi kodi</td>\
   <td onclick='sortTable(6)'>Loyihalash tashkiloti</td>\
   <td onclick='sortTable(7)'>Ishlab chiqalgan yili</td>\
   <td onclick='sortTable(9)'>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td>\
   <td onclick='sortTable(10)' >Shahar chegarasi loyihasini tasdiqlangan organ</td>\
   <td onclick='sortTable(11)'>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam sana</td>\
    </tr>"

    for(var i=0;i<data.features.length;i++){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));

      text+="<tr>\
      <td>"+(1+i)+"\
<br><img src='/static/img/funk_zones.png' data-dtype='funk_zone' class='click_set_object' data-id='"+data.features[i].properties.id+"' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>\
<td>"+data.features[i].properties.aholi_punktining_nomi+"</td>\
<td>"+data.features[i].properties.respublika_viloyat+"</td>\
<td>"+data.features[i].properties.tuman_shahar+"</td>\
<td>"+data.features[i].properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td>\
<td>"+data.features[i].properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td>\
<td>"+data.features[i].properties.ishlab_chiqalgan_yili+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+"</td>\
 <td style='display:none;' >"+(1+i)+"</td>\
            </tr>";
    }

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','funk_zones_po_genplan');
$('#to_xlsx').attr('dtype','funk_zones_po_genplan');
$('#title_table').html("Genplan bo'yicha qilingan funksionalar zonalar");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='1'>Aholi punktining nomi bo'yicha</option>\
                  <option value='2'>Viloyat nomi bo'yicha</option>\
                  <option value='3'>Tuman nomi bo'yicha</option>";

$('#search-field-id').html(select_items);
$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',

       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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
document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);

});

}

if($(this).attr('data-layer_name')=='red_lines'){

  var url="/geodata/service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:genplans&outputFormat=application%2Fjson";


$.getJSON(url, function (data) {
   var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,14)'>№</td>\
   <td onclick='sortTable(1)' >Aholi punktining nomi</td>\
   <td onclick='sortTable(2)' >Respublika, viloyat</td>\
   <td onclick='sortTable(3)' >Tuman, shahar</td>\
   <td onclick='sortTable(4)' >Mamuriy hududiy birliklarni  belgilash tizimi kodi</td>\
   <td onclick='sortTable(6)'>Loyihalash tashkiloti</td>\
   <td onclick='sortTable(7)'>Ishlab chiqalgan yili</td>\
   <td onclick='sortTable(9)'>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td>\
   <td onclick='sortTable(10)' >Shahar chegarasi loyihasini tasdiqlangan organ</td>\
   <td onclick='sortTable(11)'>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam sana</td>\
    </tr>"

for(var i=0;i<data.features.length;i++){
var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));
      text+="<tr>\
      <td>"+(1+i)+"\
<br><img src='/static/img/red_lines.png' data-dtype='funk_zone' class='click_set_object' data-id='"+data.features[i].properties.id+"' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>\
<td>"+data.features[i].properties.aholi_punktining_nomi+"</td>\
<td>"+data.features[i].properties.respublika_viloyat+"</td>\
<td>"+data.features[i].properties.tuman_shahar+"</td>\
<td>"+data.features[i].properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td>\
<td>"+data.features[i].properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td>\
<td>"+data.features[i].properties.ishlab_chiqalgan_yili+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+"</td>\
 <td style='display:none;' >"+(1+i)+"</td>\
            </tr>";

    }

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','red_lines');
$('#to_xlsx').attr('dtype','red_lines');
$('#title_table').html("Genplan bo'yicha qilingan Красные линии");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='1'>Aholi punktining nomi bo'yicha</option>\
                  <option value='2'>Viloyat nomi bo'yicha</option>\
                  <option value='3'>Tuman nomi bo'yicha</option>";

$('#search-field-id').html(select_items);
$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',

       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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
document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);

});

}

if($(this).attr('data-layer_name')=='funk_zones_po_apot'){


var url="/geodata/service=WFS&version=1.0.0&request=GetFeature&typeName=dshk:apots&outputFormat=application%2Fjson&cql_filter=vil_id='12'";


$.getJSON(url, function (data) {

  var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,8)'>№</td>\
   <td onclick='sortTable(1)'>Qishloq fuqarolar yig'ini nomi</td>\
   <td onclick='sortTable(2)'>Respublika_, viloyat</td>\
   <td onclick='sortTable(3)'>Tuman, shahar</td>\
   <td onclick='sortTable(4)'>Mamuriy hududiy birliklarni  belgilash tizimi kodi</td>\
   <td onclick='sortTable(5)'>Loyihalash tashkiloti</td>\
   <td onclick='sortTable(6)'>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td>\
   <td onclick='sortTable(7)'>Aholi punktining tipi</td>\
   </tr>"
    for(var i=0;i<data.features.length;i++){
      var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));
      text+="<tr>\
      <td>"+(1+i)+"\
<br><img src='/static/img/funk_zones.png' data-dtype='funk_zone' class='click_set_object' data-id='"+data.features[i].properties.id+"' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>\
      <td>"+data.features[i].properties.fuqarolar_yiginlari+"</td>\
      <td>"+data.features[i].properties.respublika_viloyat+"</td>\
      <td>"+data.features[i].properties.tuman_shahar+"</td>\
      <td>"+data.features[i].properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td>\
      <td>"+data.features[i].properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td>\
      <td>"+data.features[i].properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td>\
      <td>"+data.features[i].properties.aholi_punktining_tipi+"</td>\
      <td style='display:none;' >"+(1+i)+"</td>\
      </tr>";
}

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','funk_zones_po_apot');
$('#to_xlsx').attr('dtype','funk_zones_po_apot');
$('#title_table').html("APOT bo'yicha qilingan funksional zonalar");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='1'>Aholi punktining nomi bo'yicha</option>\
                  <option value='2'>Viloyat nomi bo'yicha</option>\
                  <option value='3'>Tuman nomi bo'yicha</option>";

$('#search-field-id').html(select_items);


$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',

       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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

document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);

});}
 

if($(this).attr('data-layer_name')=='apot' || $(this).attr('data-layer_name')=='apot_edit'){
 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("filter",$(this).attr('data-filter'));
  data.append("filter_type",$(this).attr('data-filter_type'));
  data.append("type",$(this).attr('data-layer_name'));
  var type=$(this).attr('data-layer_name');

  $.ajax({
        url: "/apots_data",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( result ) {

  data=JSON.parse(result.data);

  var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,8)'>№</td>\
   <td onclick='sortTable(1)'>Qishloq fuqarolar yig'ini nomi</td>\
   <td onclick='sortTable(2)'>Respublika_, viloyat</td>\
   <td onclick='sortTable(3)'>Tuman, shahar</td>\
   <td onclick='sortTable(4)'>Mamuriy hududiy birliklarni  belgilash tizimi kodi</td>\
   <td onclick='sortTable(5)'>Loyihalash tashkiloti</td>\
   <td onclick='sortTable(6)'>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td>\
   <td onclick='sortTable(7)'>Aholi punktining tipi</td>\
   </tr>";

  for(var i=0;i<data.features.length;i++){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));

 text+="<tr><td>"+(1+i);
      
      if(type=='apot'){
      text+="<br><img src='/static/img/apot_tas_"+data.features[i].properties.tasdiqlanganligi+".png' class='click_set_object' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>";
      }
      if(type=='apot_edit'){
      text+="<br><img src='/static/img/status_"+data.features[i].properties.status+".png' class='click_set_object' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>";
      }
  
      text+="<td>"+data.features[i].properties.fuqarolar_yiginlari+"</td>\
      <td>"+viloyat[(parseInt(data.features[i].properties.respublika_viloyat)-1)].disUz+"</td>\
      <td>"+data.features[i].properties.tuman_shahar+"</td>\
      <td>"+data.features[i].properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td>\
      <td>"+data.features[i].properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td>\
      <td>"+data.features[i].properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td>\
      <td>"+data.features[i].properties.aholi_punktining_tipi+"</td>\
      <td style='display:none;' >"+(1+i)+"</td>\
      </tr>";
}

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','apot');
$('#to_xlsx').attr('dtype','apot');
$('#title_table').html("Архитектурно-планировочных организаций территорий");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='1'>Qishloq fuqarolar yig'ini nomi bo'yicha</option>\
                  <option value='2'>Viloyat nomi bo'yicha</option>\
                  <option value='3'>Tuman nomi bo'yicha</option>";


$('#search-field-id').html(select_items);
$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',

       autoOpen: true,
        resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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

document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);


        },
        error: function(){
          console.log('Ajaxda xatolik!');
        }
      });

}

if($(this).attr('data-layer_name')=='genplan' || $(this).attr('data-layer_name')=='genplan_edit'){


 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("filter",$(this).attr('data-filter'));
  data.append("filter_type",$(this).attr('data-filter_type'));
  data.append("type",$(this).attr('data-layer_name'));
  var type=$(this).attr('data-layer_name');

$.ajax({
        url: "/genplans_data",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( result ) {
    data=JSON.parse(result.data);
   var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,14)'>№</td>\
   <td onclick='sortTable(1)' >Aholi punktining nomi</td>\
   <td onclick='sortTable(2)' >Respublika, viloyat</td>\
   <td onclick='sortTable(3)' >Tuman, shahar</td>\
   <td onclick='sortTable(4)' >Mamuriy hududiy birliklarni  belgilash tizimi kodi</td>\
   <td onclick='sortTable(5)' >aholi_punktining_maqomi</td>\
   <td onclick='sortTable(6)'>Loyihalash tashkiloti</td>\
   <td onclick='sortTable(7)'>Ishlab chiqalgan yili</td>\
   <td onclick='sortTable(8)'>Aholi punktining tipi</td>\
   <td onclick='sortTable(9)'>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td>\
   <td onclick='sortTable(10)'>Shahar chegarasi loyihasini tasdiqlangan organ</td>\
   <td onclick='sortTable(11)'>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam sana</td>\
   <td>Aholi punktining loyihaviy maydoni ga</td>\
   <td>Aholining loyihaviy soni</td>\
   </tr>";
 
    for(var i=0;i<data.features.length;i++){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));

 text+="<tr><td>"+(1+i);
      
      if(type=='genplan'){
      text+="<br><img src='/static/img/genplan_tas_"+data.features[i].properties.tasdiqlanganligi+".png' class='click_set_object' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>";
      }
      if(type=='genplan_edit'){
      text+="<br><img src='/static/img/status_"+data.features[i].properties.status+".png' class='click_set_object' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>";
      }

text+="<td>"+data.features[i].properties.aholi_punktining_nomi+"</td>\
<td>"+viloyat[(parseInt(data.features[i].properties.respublika_viloyat)-1)].disUz+"</td>\
<td>"+data.features[i].properties.tuman_shahar+"</td>\
<td>"+data.features[i].properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td>\
<td>"+data.features[i].properties.aholi_punktining_maqomi+"</td>\
<td>"+data.features[i].properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td>\
<td>"+data.features[i].properties.ishlab_chiqalgan_yili+"</td>\
<td>"+data.features[i].properties.aholi_punktining_tipi+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+"</td>\
<td>"+data.features[i].properties.aholi_punktining_loyihaviy_maydoni_ga+"</td>\
<td>"+data.features[i].properties.aholining_loyihaviy_soni+"</td>\
 <td style='display:none;' >"+(1+i)+"</td>\
            </tr>";
   
    }

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','genplan');
$('#to_xlsx').attr('dtype','genplan');
$('#title_table').html("Генеральные планы населенных пунктов");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='1'>Aholi punktining nomi bo'yicha</option>\
                  <option value='2'>Viloyat nomi bo'yicha</option>\
                  <option value='3'>Tuman nomi bo'yicha</option>";

$('#search-field-id').html(select_items);
$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',

       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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
document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);

        },
        error: function(){
          console.log('Ajaxda xatolik!');
        }
      });
 
}

if($(this).attr('data-layer_name')=='pdp' || $(this).attr('data-layer_name')=='pdp_edit'){

 var data = new FormData();
 
  data.append("csrfmiddlewaretoken", document.getElementsByName("csrfmiddlewaretoken")[0].value);
  data.append("filter",$(this).attr('data-filter'));
  data.append("filter_type",$(this).attr('data-filter_type'));
  data.append("type",$(this).attr('data-layer_name'));
var type=$(this).attr('data-layer_name');
$.ajax({
        url: "/pdps_data",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( result ) {
   data=JSON.parse(result.data);
   var text='';
   text+="<tr id='table_head'>\
   <td onclick='sortTable(0,14)'>№</td>\
   <td onclick='sortTable(1)' >Aholi punktining nomi</td>\
   <td onclick='sortTable(2)' >Respublika, viloyat</td>\
   <td onclick='sortTable(3)' >Tuman, shahar</td>\
   <td onclick='sortTable(4)' >Mamuriy hududiy birliklarni  belgilash tizimi kodi</td>\
   <td onclick='sortTable(5)' >aholi_punktining_maqomi</td>\
   <td onclick='sortTable(6)'>Loyihalash tashkiloti</td>\
   <td onclick='sortTable(7)'>Ishlab chiqalgan yili</td>\
   <td onclick='sortTable(8)'>Aholi punktining tipi</td>\
   <td onclick='sortTable(9)'>Shahar chegarasi loyihasi hujjatlari saqlandigan joy</td>\
   <td onclick='sortTable(10)' >Shahar chegarasi loyihasini tasdiqlangan organ</td>\
   <td onclick='sortTable(11)'>Shahar chegarasi loyiha tasdiqlash tugrisidagi hujjat raqam sana</td>\
   <td>Aholi punktining loyihaviy maydoni ga</td>\
   <td>Aholining loyihaviy soni</td>\
   </tr>"
 
    for(var i=0;i<data.features.length;i++){

var bounds=gsch.bbox(gsch.multiPolygon(data.features[i].geometry.coordinates));

      text+="<tr><td>"+(1+i);
      
      if(type=='pdp'){
      text+="<br><img src='/static/img/pdp_tas_"+data.features[i].properties.tasdiqlanganligi+".png' class='click_set_object' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>";
      }
      if(type=='pdp_edit'){
      text+="<br><img src='/static/img/status_"+data.features[i].properties.status+".png' class='click_set_object' data-bounds-0='"+bounds[0]+"' data-bounds-1='"+bounds[1]+"' data-bounds-2='"+bounds[2]+"' data-bounds-3='"+bounds[3]+"' ></td>";
      }

text+="<td>"+data.features[i].properties.aholi_punktining_nomi+"</td>\
<td>"+viloyat[(parseInt(data.features[i].properties.respublika_viloyat)-1)].disUz+"</td>\
<td>"+data.features[i].properties.tuman_shahar+"</td>\
<td>"+data.features[i].properties.mamuriy_hududiy_birliklarni_belgilash_tizimi_kodi+"</td>\
<td>"+data.features[i].properties.aholi_punktining_maqomi+"</td>\
<td>"+data.features[i].properties.loyihalash_tashkiloti_shahar_chegarasi_loyihasini_ishlab_chiquv+"</td>\
<td>"+data.features[i].properties.ishlab_chiqalgan_yili+"</td>\
<td>"+data.features[i].properties.aholi_punktining_tipi+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasi_hujjatlari_saqlandigan_joy+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyihasini_tasdiqlangan_organ+"</td>\
<td>"+data.features[i].properties.shahar_chegarasi_loyiha_tasdiqlash_tugrisidagi_hujjat_raqam_san+"</td>\
<td>"+data.features[i].properties.aholi_punktining_loyihaviy_maydoni_ga+"</td>\
<td>"+data.features[i].properties.aholining_loyihaviy_soni+"</td>\
 <td style='display:none;' >"+(1+i)+"</td>\
            </tr>";

    
    }

$('#item-count').html("Barcha ob'yektlar soni:"+data.features.length+"<br>");
$('#to_pdf').attr('dtype','pdp');
$('#to_xlsx').attr('dtype','pdp');
$('#title_table').html("ПДП");
var select_items="<option selected value='-1'>Barcha ustunlardan</option>\
                  <option value='1'>Aholi punktining nomi bo'yicha</option>\
                  <option value='2'>Viloyat nomi bo'yicha</option>\
                  <option value='3'>Tuman nomi bo'yicha</option>";

$('#search-field-id').html(select_items);
$('#table-info').html(text);

  $("#dialog_table").dialog({
    dialogClass:'dialog_table',
       autoOpen: true,
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.dialog_table').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
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
document.getElementById("table-info-div-id").scrollTop = 0;
$('.info_table').css({'cursor':'pointer'});

var tablecont=document.querySelector('#table-info-div-id');
tablecont.addEventListener('scroll',scrollHendle);

        },
        error: function(){
          console.log('Ajaxda xatolik!');
        }
      });

}

});


$('#popup_dialog_genplan').dialog({
  // resizable: false,
  width:440,
  height:600,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_genplan',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_genplan').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
   for (var i = 0; i < 50; i++) {
      if(map.hasLayer(genplan_geotiff[i]))
        map.removeLayer(genplan_geotiff[i]);
         }
  
    
if($('#checkbox_id_2_3_1').prop('checked'))
{
map.addLayer(genplan);
genplan.setOpacity(0.8);

$(".genplan_checkbox").each(function(){
  if($(this).prop('checked'))
        $(this).prop('checked',true);
});

}
      

      },

});


$('#popup_dialog_genplan_edit').dialog({
  // resizable: false,
  width:480,
  height:600,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_genplan_edit',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_genplan_edit').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
   for (var i = 0; i < 50; i++) {
      if(map.hasLayer(genplan_edit_geotiff[i]))
        map.removeLayer(genplan_edit_geotiff[i]);
         }
  
    
if($('#checkbox_id_2_3_1_1').prop('checked'))
{
map.addLayer(genplan_edit);
genplan_edit.setOpacity(0.8);

$(".genplan_edit_checkbox").each(function(){
  if($(this).prop('checked'))
        $(this).prop('checked',true);
});

}  
},

});



$('#popup_dialog_pdp').dialog({
  // resizable: false,
  width:480,
  height:600,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_pdp',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_pdp').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
   for (var i = 0; i < 50; i++) {
      if(map.hasLayer(pdp_geotiff[i]))
        map.removeLayer(pdp_geotiff[i]);
         }
  
    
if($('#checkbox_id_2_3_2').prop('checked'))
{
map.addLayer(pdp);
pdp.setOpacity(0.8);

// $(".pdp_checkbox").each(function(){
//   if($(this).prop('checked'))
//         $(this).prop('checked',true);
// });

}
  

      },

});


$('#popup_dialog_pdp_edit').dialog({
  // resizable: false,
  width:480,
  height:600,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_pdp_edit',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_pdp_edit').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
   for (var i = 0; i < 50; i++) {
      if(map.hasLayer(pdp_edit_geotiff[i]))
        map.removeLayer(pdp_edit_geotiff[i]);
         }
  
    
if($('#checkbox_id_2_3_2_1').prop('checked'))
{
map.addLayer(pdp_edit);
pdp_edit.setOpacity(0.8);

$(".pdp_edit_checkbox").each(function(){
  if($(this).prop('checked'))
        $(this).prop('checked',true);
});

}
  

      },

});





$('#popup_dialog_apot').dialog({
  // resizable: false,
  width:400,
  height:640,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_apot',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_apot').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
    if($('#checkbox_id_2_2_1').prop('checked'))
{
apot.setOpacity(0.8);

$(".apot_checkbox").each(function(){
  if($(this).prop('checked'))
        $(this).prop('checked',true);
});
  }
}

});


$('#popup_dialog_apot_edit').dialog({
  // resizable: false,
  width:400,
  height:640,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_apot_edit',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_apot_edit').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {

    if($('#checkbox_id_2_2_1_1').prop('checked'))
{
apot_edit.setOpacity(0.8);

$(".apot_edit_checkbox").each(function(){
  if($(this).prop('checked'))
        $(this).prop('checked',true);
});
  }
}

});


$('#popup_dialog_funk_zones_po_genplan').dialog({
  // resizable: false,
  width:480,
  height:500,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_funk_zones_po_genplan',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_funk_zones_po_genplan').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
    funk_zones_po_genplan.setOpacity(0.8);
}

});

$('#popup_dialog_funk_zones_po_apot').dialog({
  // resizable: false,
  width:480,
  height:500,
  position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_funk_zones_po_apot',
       resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_funk_zones_po_apot').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
    funk_zones_po_apot.setOpacity(0.8);
}

});


$('#popup_dialog_geologik_rayonlash').dialog({
  // resizable: false,
  width:900,
  height:400,
  // position: { my: "left top", at: "right bottom", of: window },
  autoOpen:false,
  dialogClass:'popup_dialog_geologik_rayonlash',
                resize:function(e){$(this).css({'width':'auto'});},
       create:function(e){
$('.popup_dialog_geologik_rayonlash').children('.ui-dialog-titlebar').append("<button  type='button' class='img_mini_maxi' data-val='0'>-x-</button>");
       },
  show:{
    // effect:'slide',
     effect:'blind',
    duration:400,
    // direction: "left",
  },
    hide:{
    effect:'blind',
    duration:400,
  },
  close:function() {
    geologik_rayonlash.setOpacity(0.8);
}

});
