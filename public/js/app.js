$(function() { 
  $.ajax({
    method: 'GET',
    url: '/api/hotels/',
    success: function(response){
      response.forEach(function (hotel) {
        var hotelOption = '<option id = "hotel' + hotel.id +'">' + hotel.name + '</option>';
        $('#hotel-choices').append(hotelOption)
      })
      
    },
    error: function(error) {
      console.log(error);
    }
  })

  $.ajax({
    method: 'GET',
    url: '/api/restaurants/',
    success: function(response){
      response.forEach(function (restaurant) {
        var restaurantOption = '<option id = "restaurant' + restaurant.id +'">' + restaurant.name + '</option>';
        $('#restaurant-choices').append(restaurantOption)
      })
      
    },
    error: function(error) {
      console.log(error);
    }
  })

  $.ajax({
    method: 'GET',
    url: '/api/activities/',
    success: function(response){
      response.forEach(function (activity) {
        var activityOption = '<option id = "activity' + activity.id +'">' + activity.name + '</option>';
        $('#activity-choices').append(activityOption)
      })
      
    },
    error: function(error) {
      console.log(error);
    }
  })
});