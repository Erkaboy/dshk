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
          if(data[0].sessia.status!=-1){
          $("#pod_6_7_8_min").append('<script src="/static/main/pod_6_7_8.js"></script>');
        }
     
           if(data[0].sessia.service=='genplan')
              {$("#admin_div_sec").append('<script src="/static/main/admin_genplan.js"></script>');}
           if(data[0].sessia.service=='pdp')
              {$("#admin_div_sec").append('<script src="/static/main/admin_pdp.js"></script>');}
           if(data[0].sessia.service=='apot')
              {$("#admin_div_sec").append('<script src="/static/main/admin_apot.js"></script>');}
          if(data[0].sessia.service=='red_line')
              {$("#admin_div_sec").append('<script src="/static/main/admin_redlines.js"></script>');}
          if(data[0].sessia.service=='funk_gen')
              {$("#admin_div_sec").append('<script src="/static/main/admin_funk_gen.js"></script>');}
          if(data[0].sessia.service=='funk_apot')
              {$("#admin_div_sec").append('<script src="/static/main/admin_funk_apot.js"></script>');}
          if(data[0].sessia.service=='geo_ray')
              {$("#admin_div_sec").append('<script src="/static/main/admin_geolog_rayon.js"></script>');}

        },
        error:function(){
          console.log("Ajaxda xatolik!!");
        }
});
