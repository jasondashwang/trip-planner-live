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
    $('.current').find('.listHotels').append('<div class="itinerary-item"><span class="title">' + hotel + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });
//add restaurants
  $('#restaurantButton').on('click', function(){
    var restaurant = $('#restaurant-choices').val();
    $('.current').find('.listRestaurants').append('<div class="itinerary-item"><span class="title">' + restaurant + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });
//add activities
  $('#activityButton').on('click', function(){
    var activity = $('#activity-choices').val();
    $('.current').find('.listActivities').append('<div class="itinerary-item"><span class="title">' + activity + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });
//add day buttons
  $('#day-add').on('click', function () {
    //get the number of the about to be created button
    var siblingsArray = $(this).siblings();
    var lastIndex = $(siblingsArray[siblingsArray.length - 1]).text();
    var currentIndex = +lastIndex + 1;
    //add button
    $('<button class = "btn btn-circle day-btn">' + currentIndex + '</button>').insertBefore(this).css('margin', '2px');
    $(this).css('margin-left', '2px');

    var newDay = 'day' + currentIndex;

    var template = '<div class="panel-body ' + newDay + ' hidden" id="itinerary"><div><h4>My Hotel</h4><ul class="list-group listHotels" id="' + newDay + 'Hotels"></ul></div><div><h4>My Restaurants</h4><ul class="list-group listRestaurants" id="currentRestaurants"></ul></div><div><h4>My Activities</h4><ul class="list-group listActivities" id="currentActivities"></ul></div></div>';

    $('#itinerary').append(template);

  });
});
//change current-day class to button clicked
$('.day-buttons').on('click', '.btn', function (event) {
  //remove current day class and add it to target clicked unless target was day add button
  if (!( $(event.target).is('#day-add') )){
    $('.current-day').removeClass('current-day');
    $(event.target).addClass('current-day');

    $('.current').removeClass('current').addClass('hidden');

    var newDay = '.day' + $(event.target).text();

    $(newDay).removeClass('hidden').addClass('current');

  }
});





