$(document).ready(function () {
	$(window).scroll(function(){
	if($(window).scrollTop()>300)
	{
        $('.navbar').addClass('floatingnav');
	}
	else{
		$('.navbar').removeClass('floatingnav');
	}
});
  //your code here
});

