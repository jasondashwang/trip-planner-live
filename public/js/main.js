$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }


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
      var hotelId = $('#hotel-choices option:selected').attr('id');
      $('.current').find('.listHotels').append('<div class="itinerary-item" data-value="' + hotelId + '"><span class="title">' + hotel + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    });
  //add restaurants
    $('#restaurantButton').on('click', function(){
      var restaurant = $('#restaurant-choices').val();
      var restaurantId = $('#restaurant-choices option:selected').attr('id');
      $('.current').find('.listRestaurants').append('<div class="itinerary-item" data-value="' + restaurantId + '"><span class="title">' + restaurant + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');

      var location = $('#' + restaurantId).data('value').split(',');

      drawMarker('restaurant', location);

    });
  //add activities
    $('#activityButton').on('click', function(){
      var activity = $('#activity-choices').val();
      var activityId = $('#activity-choices option:selected').attr('id');
      $('.current').find('.listActivities').append('<div class="itinerary-item" data-value="' + activityId + '"><span class="title">' + activity + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
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

    } else {
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
        var $targetPanel = $('.day' + (z+1));
        $targetPanel.find('#day' + (z+1) + 'Hotels').removeAttr('id').attr('id', 'day' + z + 'Hotels');
        $targetPanel.find('#day' + (z+1) + 'Restaurants').removeAttr('id').attr('id', 'day' + z + 'Restaurants');
        $targetPanel.find('#day' + (z+1) + 'Activities').removeAttr('id').attr('id', 'day' + z + 'Activities');
        $targetPanel.removeClass('day'+ (z+1)).addClass('day'+ z);
      }

      $('.current-day').trigger('click');
    }

});


