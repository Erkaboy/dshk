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
        $("#jquery_min").append('<script type="text/javascript" src="/static/main/jquery.js"></script>');
        $("#bootstrap_3").append('<script type="text/javascript" src="/static/main/bootstrap_3.js"></script>');
        $("#bootstrap_4").append('<script type="text/javascript" src="/static/main/bootstrap_4.js"></script>');
        },
        error:function(){
          console.log("Ajaxda xatolik!!");
        }
      });


