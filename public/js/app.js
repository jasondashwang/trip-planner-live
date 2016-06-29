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

    var template = '<div class="panel-body ' + newDay + ' hidden"><div><h4>My Hotel</h4><ul class="list-group listHotels" id="' + newDay + 'Hotels"></ul></div><div><h4>My Restaurants</h4><ul class="list-group listRestaurants" id="currentRestaurants"></ul></div><div><h4>My Activities</h4><ul class="list-group listActivities" id="currentActivities"></ul></div></div>';

    $('#itinerary').append(template);

  });
});
//change current-day class to button clicked
$('.day-buttons').on('click', '.btn', function (event) {
  var $target = $(event.target);

  //remove current day class and add it to target clicked unless target was day add button
  
  if (!( $target.is('#day-add') )){
    $('.current-day').removeClass('current-day');
    $target.addClass('current-day');

    $('.current').removeClass('current').addClass('hidden');

    var newDay = '.day' + $target.text();

    $(newDay).removeClass('hidden').addClass('current');
    var currentDay = 'Day ' + $target.text();
    $('#day-span').text(currentDay)
  }
});

 $('#day-title').find('.remove').on('click', function () {
  var dayArray = $('#day-span').text().toLowerCase().split(' ');
  var dayNumber = dayArray[1];
  var removingDay = dayArray.join('');

  $('.' + removingDay).remove();
  var allButtons = $('.day-buttons').children(); 

  if (allButtons.length === 2){
    var newDay = 1;
    var template = '<div class="panel-body day' + newDay + ' current"><div><h4>My Hotel</h4><ul class="list-group listHotels" id="' + newDay + 'Hotels"></ul></div><div><h4>My Restaurants</h4><ul class="list-group listRestaurants" id="currentRestaurants"></ul></div><div><h4>My Activities</h4><ul class="list-group listActivities" id="currentActivities"></ul></div></div>';
    $('.day1').remove();
    $('#itinerary').append(template);

  }else {
    for (var i = 0; i < allButtons.length; i ++) {
      var button = $(allButtons[i]);
      if (button.text() === dayNumber){
        button.remove();
      if (i > 0) $(allButtons[i-1]).addClass('current-day');
      else if (i === 0) $(allButtons[i+1]).addClass('current-day');
      }
    }

    for (var z = +dayNumber; z < allButtons.length-1; z++){
      var button = $(allButtons[z]);
      var buttonText = +(button.text()) - 1;
      button.text(buttonText);
      var $targetPanel = $('.day' + z);
      $targetPanel.find('#day' + z + 'Hotels').removeAttr('id').attr('id', 'day' + (z-1) + 'Hotels');
      $targetPanel.find('#day' + z + 'Restaurants').removeAttr('id').attr('id', 'day' + (z-1) + 'Restaurants');
      $targetPanel.find('#day' + z + 'Activities').removeAttr('id').attr('id', 'day' + (z-1) + 'Activities');
      $targetPanel.removeClass('day' + z).addClass('day'+ (z-1)); 
    }

    $('.current-day').trigger('click');
  }
});




