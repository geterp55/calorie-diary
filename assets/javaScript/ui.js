$(document).ready(function(){
	$('select').material_select();
	
	//---MODAL----
  	$('#open-model').on("click", function(){
   		$('#modal1').openModal();
  	});

	//---DATE PICKER----
  	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 // Creates a dropdown of 15 years to control year
  	});
});
