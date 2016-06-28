$(document).ready(function(){
  $('#currentRestaurants').on('click', '.remove' ,function(){
    $(this).parent().remove();
  });

  $('#currentActivities').on('click', '.remove' ,function(){
    $(this).parent().remove();
  });

  $('#currentHotels').on('click', '.remove' ,function(){
    $(this).parent().remove();
  });

  $('#hotelButton').on('click', function(){
    var hotel = $('#hotel-choices').val();
    $('#currentHotels').append('<div class="itinerary-item"><span class="title">' + hotel + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });

  $('#restaurantButton').on('click', function(){
    var restaurant = $('#restaurant-choices').val();
    $('#currentRestaurants').append('<div class="itinerary-item"><span class="title">' + restaurant + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });

  $('#activityButton').on('click', function(){
    var activity = $('#activity-choices').val();
    $('#currentActivities').append('<div class="itinerary-item"><span class="title">' + activity + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
  });


});


