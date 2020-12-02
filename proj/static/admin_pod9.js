
$(document).ready(function(){
	

function change_list(id,val=-1){
var data = new FormData();
data.append("csrfmiddlewaretoken", $("input[name='csrfmiddlewaretoken']").val());
data.append("sub_tip_documents","sub_tip_documents");
data.append("id",id);

$.ajax({
        url: '/filtering',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        type: 'post',
        success: function ( data ) {
    
var text='';

for (var i in data['list']){
    if(val==-1){
	text+="<option value='"+data['list'][i]['id']+"'>"+data['list'][i]['sub_tip_dis']+"</option>";
    }
    else{
        if(val==data['list'][i]['id']){
    text+="<option selected value='"+data['list'][i]['id']+"'>"+data['list'][i]['sub_tip_dis']+"</option>";    
    }
    else{
    text+="<option value='"+data['list'][i]['id']+"'>"+data['list'][i]['sub_tip_dis']+"</option>";
    }
}
	}
$('#id_sub_tip_doc').html(text);


        },
        error:function(){
          console.log("Ajaxda xatolik!!");
        }
      });
}

if($('#id_tip_doc').children().first().val()!=undefined){
    
if($("a[class='deletelink']").length!=1){

change_list($('#id_tip_doc').children().first().val());
$("#id_sub_tip_doc option[selected]").val()
}
else{
  change_list($("#id_tip_doc option[selected]").val(),$("#id_sub_tip_doc option[selected]").val());  
}
}

$('#id_tip_doc').on('change',function(){
	change_list($(this).val());
});

});


