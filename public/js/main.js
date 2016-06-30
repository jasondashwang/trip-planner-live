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

  var markers = [];

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
    markers.push(marker);

    resize(markers);
  }

  function resize(arr){
    if(arr.length === 0){
      currentMap.panTo(fullstackAcademy);
      currentMap.setZoom(13);
    } else {
      var bounds = new google.maps.LatLngBounds();
      markers.forEach(function (mark) {
        bounds.extend(mark.position);
      });
      currentMap.fitBounds(bounds);
    }

  }

  function clearMarkers (){
    for(var i = 0; i<markers.length; i++){
      markers[i].setMap(null);
    }
    markers = [];
    resize(markers);


  }

  // Jquery Stuff Below
  function removeEvent(){
    var div = $(this).parent();

    var id = div.data('value');

    var typeOfAttraction = id.match(/[a-zA-Z]/g).join('');
    var attractionId =  id.replace(/[^\d.]/g, '');
    var dayId = $('.current-day').text();



    $.ajax({
      method: 'DELETE',
      url: '/' + ( ['api','days',dayId,typeOfAttraction,attractionId].join('/') ),
      success: function (location) {
       var targetLat = +((+(location[0])).toFixed(5));
       var targetLong = +((+(location[1])).toFixed(5));

       for (var i = 0; i < markers.length; i++) {
        var lat = +(markers[i].position.lat().toFixed(5));
        var long = +(markers[i].position.lng().toFixed(5));
        if((targetLat === lat) && (targetLong === long)){
          markers[i].setMap(null);
          markers.splice(i, 1);
          break;
        }
      }
      div.remove();
      resize(markers);

    },
    error: function(error) { console.log(error); }
  });

  }


  function clearItinerary(){
    $('#itineraryItems').find('.listHotels').text('');
    $('#itineraryItems').find('.listRestaurants').text('');
    $('#itineraryItems').find('.listActivities').text('');
    $('#itineraryItems').find('.listActivities, .listRestaurants, .listHotels').on('click', '.remove', removeEvent);
  }



  $('.listRestaurants, .listActivities, .listHotels').on('click', '.remove' , removeEvent);

  //add hotels
  $('#hotelButton').on('click', function(){
    var hotel = $('#hotel-choices').val();
    var hotelId = $('#hotel-choices option:selected').attr('id');

    $.ajax({
      method: 'GET',
      url: '/api/hotels/' + hotelId,
      success: function(response){
        drawMarker('hotel', response.place.location);
      },

      error:function(error){
        console.log(error);
      }
    });


    $.ajax({
      method: 'PUT',
      url: '/api/days/'+ $('.current-day').text() +'/hotel',
      data: {hotelId: hotelId},
      success: function(){
        $('.listHotels').append('<div class="itinerary-item" data-value = "' + hotelId + '"><span class="title">' + hotel + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      },

      error: function(error){
        console.log(error);
      }
    });



  });
  //add restaurants
  $('#restaurantButton').on('click', function(){
    var restaurant = $('#restaurant-choices').val();
    var restaurantId = $('#restaurant-choices option:selected').attr('id');

    $.ajax({
      method: 'GET',
      url: '/api/restaurants/' + restaurantId,
      success: function(response){
        drawMarker('restaurant', response.place.location);
      },

      error:function(error){
        console.log(error);
      }
    });

    $.ajax({
      method: 'PUT',
      url: '/api/days/'+ $('.current-day').text() +'/restaurant',
      data: {restaurantId: restaurantId},
      success: function(){
        $('.listRestaurants').append('<div class="itinerary-item" data-value = "' + restaurantId + '"><span class="title">' + restaurant + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      },

      error: function(error){
        console.log(error);
      }
    });


  });
  //add activities
  $('#activityButton').on('click', function(){
    var activity = $('#activity-choices').val();
    var activityId = $('#activity-choices option:selected').attr('id');


    $.ajax({
      method: 'GET',
      url: '/api/activities/' + activityId,
      success: function(response){
        drawMarker('activity', response.place.location);
      },

      error:function(error){
        console.log(error);
      }
    });

    $.ajax({
      method: 'PUT',
      url: '/api/days/'+ $('.current-day').text() +'/activity',
      data: {activityId: activityId},
      success: function(){
        $('.listActivities').append('<div class="itinerary-item" data-value = "' + activityId + '"><span class="title">' + activity + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      },

      error: function(error){
        console.log(error);
      }
    });
  });

  //add day buttons
  $('#day-add').on('click', function () {
      //get the number of the about to be created button
      var siblingsArray = $(this).siblings();
      var lastIndex = $(siblingsArray[siblingsArray.length - 1]).text();
      var currentIndex = +lastIndex + 1;
      //add button
      $('<button class = "btn btn-circle day-btn" id = "btnday' + currentIndex + '">' + currentIndex + '</button>').insertBefore(this).css('margin', '2px');
      $(this).css('margin-left', '2px');

      var newDay = currentIndex;

      $.ajax({
        method: 'POST',
        url: '/api/days',
        data: {number: newDay},

        success: function(){
          clearItinerary();
        },

        error: function(error){
          console.log(error);
        }
      });

      $('#btnday' + currentIndex).trigger('click');


    });

  //change current-day class to button clicked
  $('.day-buttons').on('click', '.btn', function (event) {
    var $target = $(event.target);
    //remove current day class and add it to target clicked unless target was day add button

    if (!( $target.is('#day-add') )){

      clearMarkers();

      clearItinerary();

      var dayId = $target.attr('id').slice(6);

      $('.current-day').removeClass('current-day');
      $target.addClass('current-day');

      $('#day-span').text('Day ' + dayId);

      $.ajax({
        method: 'GET',
        url: '/api/days/' + dayId,
        success: function(response){
          var attractionId, attractionName;

          if(response.hotel){
           var hotel = response.hotel;
           attractionId = hotel.id;
           attractionName = hotel.name;

           var template = '<div class="itinerary-item" data-value = "hotel' + attractionId + '"><span class="title">' + attractionName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

           $('.listHotels').append(template);

           $.ajax({
            method: 'GET',
            url: '/api/hotels/' + attractionId,
            success: function(hotelInfo){
              drawMarker('hotel', hotelInfo.place.location);
            },

            error: function(newError){
              console.log(newError);
            }

          });

           if(response.restaurants.length > 0){
             response.restaurants.forEach(function(restaurant){
              attractionId = restaurant.id;
              attractionName = restaurant.name;
              template = '<div class="itinerary-item" data-value = "restaurant' + attractionId + '"><span class="title">' + attractionName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

              $('.listRestaurants').append(template);

              drawMarker('restaurant', restaurant.place.location);
            });
           }

           if(response.activities.length > 0){
             response.activities.forEach(function(activity){
              attractionId = activity.id;
              attractionName = activity.name;
              template = '<div class="itinerary-item" data-value = "activity' + attractionId + '"><span class="title">' + attractionName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

              $('.listActivities').append(template);

              drawMarker('activity', activity.place.location);
            });
           }

         }

       },
       error: function(error){
        console.log(error);
      }
    });
    }
  });


  // Remove Page
  $('#day-title').find('.remove').on('click', function () {
    var dayArray = $('#day-span').text().toLowerCase().split(' ');
    var removeDayId = dayArray[1];



    var $dayButtonsAfterRemove = $('.day-buttons').children().slice((+removeDayId), -1);

    $('#btnday' + removeDayId).remove();
    $.ajax({
      method: 'DELETE',
      url: '/api/days/' + removeDayId,

      success: function (response){
        var numbers = [];
        for (var i = 0; i < $dayButtonsAfterRemove.length; i++) {
          var $day = $($dayButtonsAfterRemove[i]);
          var dayId =  +($day.attr('id').replace(/[^\d.]/g, ''));
          numbers.push(dayId);

          $day.attr('id', 'btnday' + (dayId - 1));
          $day.text(dayId-1);
        }

        $.ajax({
          method: 'PUT',
          url: '/api/days',
          data: {toChange: numbers},
          success: function(response){
            console.log('success');
          },

          error: function(newError){
            console.log(newError);
          }
        });
      },

      error: function (error){
        console.log(error);
      }
    });




    $('.current-day').trigger('click');
  });

  $('#day-add').trigger('click');


});


