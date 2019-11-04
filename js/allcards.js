var id=document.getElementsByClassName('id-input')[1];
 
 $(document).ready(function(){

    $('.achieve-nav').click(function () {
        $.ajax({
        type: 'GET',
        url: '/achievements/'+id.value,
        success: function(result) {
             $('.personal-details').html(result);
        }
      });

    })
    
});