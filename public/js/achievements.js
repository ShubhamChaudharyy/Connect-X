  var ID=document.getElementsByClassName('idpersonal')[0];
        $('.personal-detail').click(function () {
     $.ajax({
     type: 'GET',
     url: '/profile/'+ID.value,
     success: function(result) {
          $('.achievements').html(result);
     }
   });

 })