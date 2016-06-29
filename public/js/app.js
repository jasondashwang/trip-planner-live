$(document).ready(function(){
//remove restauranta from itinerary
  $('#currentRestaurants').on('click', '.remove' ,function(){
    $(this).parent().remove();
  });
//remove activities
  $('#currentActivities').on('click', '.remove' ,function(){
    $(this).parent().remove();
  });
//remove hotels 
  $('#currentHotels').on('click', '.remove' ,function(){
    $(this).parent().remove();
  });
//add hotels
  $('#hotelButton').on('click', function(){
    var hotel = $('#hotel-choices').val();
    $('#currentHotels').append('<div class="itinerary-item"><span class="title">' + hotel + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });
//add restaurants
  $('#restaurantButton').on('click', function(){
    var restaurant = $('#restaurant-choices').val();
    $('#currentRestaurants').append('<div class="itinerary-item"><span class="title">' + restaurant + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });
//add activities
  $('#activityButton').on('click', function(){
    var activity = $('#activity-choices').val();
    $('#currentActivities').append('<div class="itinerary-item"><span class="title">' + activity + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });
//add day buttons 
  $('#day-add').on('click', function () {
    //get the number of the about to be created button
    var siblingsArray = $(this).siblings();
    var lastIndex = $(siblingsArray[siblingsArray.length - 1]).text();
    var currentIndex = +lastIndex + 1;
    //add button 
    $('<button class = "btn btn-circle day-btn">' + currentIndex + '</button>').insertBefore(this).css('margin', '2px');
    $(this).css('margin-left', '2px')
  });
});
//change current-day class to button clicked
$('.day-buttons').on('click', function (event) {
  //remove current day class and add it to target clicked unless target was day add button 
  if (!( $(event.target).is('#day-add') )){
    $('.current-day').removeClass('current-day');
    $(event.target).addClass('current-day');
  }
});





