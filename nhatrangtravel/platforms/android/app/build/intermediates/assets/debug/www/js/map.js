$$(document).on('page:init', '.page[data-name="map"]', function (e, page) {
  var map;
  var markers = [];
  var dt;
  var centerMap = {
    lat: 12.267874,
    lng: 109.202376
  };
  var a;
  var b = [];
  var c;
  var d;
  var directionsService;
  var directionsDisplay;
  var stepDisplay;
  var markersDirection = [];
  var spLuongMarkerTrongCSDL;
  var $$ = Dom7;
  var app = new Framework7();
  var lat_dau = '';
  var lng_dau = '';
  var lat_cuoi = '';
  var lng_cuoi = '';
  var geocoder = new google.maps.Geocoder();
  var lat_hientai;
  var lng_hientai;
  var pos;




  // var swiper = app.swiper.get('.swiper-container');

  // swiper.slideNext();




  function myMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 13,
      center: centerMap,
      // navigationControlOptions: {
      //   style: google.maps.NavigationControlStyle.SMALL
      //  },
      mapTypeId: google.maps.MapTypeId.ROADMAP

    });

    // google.maps.event.addListener(map, 'click', function() {
    //   alert('clicked');
    // });

    // var marker = new google.maps.Marker({
    //       position: myCenter,
    //       animation: google.maps.Animation.BOUNCE
    //     });
    //     var marker = new google.maps.Marker({
    //       position: 
    //          {
    //              lat: 12.268144,
    //              lng: 109.202376
    //          },
    //       map:map,
    //       animation: google.maps.Animation.BOUNCE
    //     });
    //  var infowindow =  new google.maps.InfoWindow;
    //  infowindow.open(map,marker);
    //var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // var marker = new google.maps.Marker({
    //       position: myCenter,
    //       animation: google.maps.Animation.BOUNCE
    //     });
    //     var marker = new google.maps.Marker({
    //       position: 
    //          {
    //              lat: 12.268144,
    //              lng: 109.202376
    //          },
    //       // position: latlng,
    //       // position: 
    //       //    {
    //       //        lat: parseFloat(position.coords.latitude),
    //       //        lng: parseFloat(position.coords.longitude)
    //       //    },
    //       map:map,
    //       animation: google.maps.Animation.BOUNCE
    //     });
    //  var infowindow =  new google.maps.InfoWindow;
    //  infowindow.open(map,marker);

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    var rendererOptions = {
      map: map,
      suppressMarkers: true
    }



    // infowindow. open(myMap, marker);

    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();

    infoWindow = new google.maps.InfoWindow;

    try {

      if (navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(function (position) {

          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // alert("Latitude : " + latitude + " Longitude: " + longitude);
          handleLocationError(pos);
        }, function (err) {
          if (err.code == 1) {
            alert("Error: Access is denied!");
          } else if (err.code == 2) {
            alert("Error: Position is unavailable!");
          }
        }, { timeout: 60000 });
      } else {
        alert("Sorry, browser does not support geolocation!");
      }

      function handleLocationError(pos) {

        var marker = new google.maps.Marker({
          // position: 
          //    {
          //        lat: 12.268144,
          //        lng: 109.202376
          //    },
          position: pos,
          // position: latlng,
          // position: 
          //    {
          //        lat: parseFloat(position.coords.latitude),
          //        lng: parseFloat(position.coords.longitude)
          //    },
          map: map,
          animation: google.maps.Animation.BOUNCE
        });
        var infowindow = new google.maps.InfoWindow(
          {
            content: "Bạn đang ở đây!"
          }
        );

        infowindow.open(map, marker);
        infoWindow.setPosition(pos);

        map.setCenter(pos);

      }


    } catch (error) {

    }

  }
  myMap();




  app.request.json("http://toithichdoc.com/hotels/index.json", function (hotels) {
    a = hotels.hotels;

    for (var i = 0; i < a.length; i++) {
      createMaker1(a[i]);
      b.push(a[i]);


    }



  });

  var autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
    inputEl: '#autocomplete-dropdown-ajax-typeahead',
    openIn: 'dropdown',
    preloader: true, //enable preloader
    /* If we set valueProperty to "id" then input value on select will be set according to this property */
    valueProperty: 'name', //object's "value" property name
    textProperty: 'name', //object's "text" property name
    limit: 20, //limit to 20 results
    typeahead: true,
    // dropdownPlaceholderText: 'Try "New Sun hotels"',
    source: function (query, render) {
      var autocomplete = this;
      var results = [];
      if (query.length === 0) {
        render(results);
        return;
      }
      // Show Preloader
      autocomplete.preloaderShow();

      app.request({
        url: 'http://toithichdoc.com/hotels/index.json',
        method: 'GET',
        dataType: 'json',
        //send "query" to server. Useful in case you generate response dynamically
        data: {
          query: query,
        },
        success: function (hotels) {
          // Find matched items
          f = hotels.hotels;
          for (var i = 0; i < f.length; i++) {
            if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
          }
          // Hide Preoloader
          autocomplete.preloaderHide();
          // Render items by passing array with result items
          render(results);
        }
      });

      app.request({
        url: 'http://toithichdoc.com/restaurants/index.json',
        method: 'GET',
        dataType: 'json',
        //send "query" to server. Useful in case you generate response dynamically
        data: {
          query: query,
        },
        success: function (restaurants) {
          // Find matched items
          f = restaurants.restaurants;
          for (var i = 0; i < f.length; i++) {
            if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
          }
          // Hide Preoloader
          autocomplete.preloaderHide();
          // Render items by passing array with result items
          render(results);
        }
      });

      app.request({
        url: 'http://toithichdoc.com/places/index.json',
        method: 'GET',
        dataType: 'json',
        //send "query" to server. Useful in case you generate response dynamically
        data: {
          query: query,
        },
        success: function (places) {
          // Find matched items
          f = places.places;
          for (var i = 0; i < f.length; i++) {
            if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
          }
          // Hide Preoloader
          autocomplete.preloaderHide();
          // Render items by passing array with result items
          render(results);
        }
      });


    }
  });

  app.request.json("http://toithichdoc.com/restaurants/index.json", function (restaurants) {
    c = restaurants.restaurants;
    for (var i = 0; i < c.length; i++) {
      createMaker(c[i]);
      b.push(c[i]);

    }


  });




  app.request.json("http://toithichdoc.com/places/index.json", function (places) {
    d = places.places;
    for (var i = 0; i < d.length; i++) {
      createMaker2(d[i]);
      b.push(d[i]);

    }


  });

  $$('.choose-type').on('change', function () {

    var autocompleteDropdownAjaxTypeahead


    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    for (i = 0; i < markersDirection.length; i++) {
      markersDirection[i].setMap(null);
    }
    directionsDisplay.setMap(null);

    var type = app.form.convertToData('#khungnhaplieu1');

    if (type.place == "") {

      app.request.json("http://toithichdoc.com/hotels/index.json", function (hotels) {
        a = hotels.hotels;

        for (var i = 0; i < a.length; i++) {
          createMaker1(a[i]);
          b.push(a[i]);


        }

      });

      autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown-ajax-typeahead',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        /* If we set valueProperty to "id" then input value on select will be set according to this property */
        valueProperty: 'name', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        typeahead: true,
        // dropdownPlaceholderText: 'Try "New Sun hotels"',
        source: function (query, render) {
          var autocomplete = this;
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Show Preloader
          autocomplete.preloaderShow();

          app.request({
            url: 'http://toithichdoc.com/hotels/index.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
              query: query,
            },
            success: function (hotels) {
              // Find matched items
              f = hotels.hotels;
              for (var i = 0; i < f.length; i++) {
                if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
              }
              // Hide Preoloader
              autocomplete.preloaderHide();
              // Render items by passing array with result items
              render(results);
            }
          });
        }
      });

      app.request.json("http://toithichdoc.com/restaurants/index.json", function (restaurants) {
        c = restaurants.restaurants;
        for (var i = 0; i < c.length; i++) {
          createMaker(c[i]);
          b.push(c[i]);
        }

      });


      autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown-ajax-typeahead',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        /* If we set valueProperty to "id" then input value on select will be set according to this property */
        valueProperty: 'name', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        typeahead: true,

        source: function (query, render) {
          var autocomplete = this;
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Show Preloader
          autocomplete.preloaderShow();

          app.request({
            url: 'http://toithichdoc.com/restaurants/index.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
              query: query,
            },
            success: function (restaurants) {
              // Find matched items
              f = restaurants.restaurants;
              for (var i = 0; i < f.length; i++) {
                if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
              }
              // Hide Preoloader
              autocomplete.preloaderHide();
              // Render items by passing array with result items
              render(results);
            }
          });
        }
      });

      app.request.json("http://toithichdoc.com/places/index.json", function (places) {
        d = places.places;
        for (var i = 0; i < d.length; i++) {
          createMaker2(d[i]);
          b.push(d[i]);
        }

      });

      autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown-ajax-typeahead',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        /* If we set valueProperty to "id" then input value on select will be set according to this property */
        valueProperty: 'name', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        typeahead: true,

        source: function (query, render) {
          var autocomplete = this;
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Show Preloader
          autocomplete.preloaderShow();

          app.request({
            url: 'http://toithichdoc.com/places/index.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
              query: query,
            },
            success: function (places) {
              // Find matched items
              f = places.places;
              for (var i = 0; i < f.length; i++) {
                if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
              }
              // Hide Preoloader
              autocomplete.preloaderHide();
              // Render items by passing array with result items
              render(results);
            }
          });
        }
      });

    }
    if (type.place == "hotel") {

      markers = [];
      app.request.json("http://toithichdoc.com/hotels/index.json", function (hotels) {
        b = hotels.hotels;

        for (var i = 0; i < b.length; i++) {
          createMaker1(b[i]);

        }

      });

      autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown-ajax-typeahead',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        /* If we set valueProperty to "id" then input value on select will be set according to this property */
        valueProperty: 'name', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        typeahead: true,
        // dropdownPlaceholderText: 'Try "New Sun hotels"',
        source: function (query, render) {
          var autocomplete = this;
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Show Preloader
          autocomplete.preloaderShow();

          app.request({
            url: 'http://toithichdoc.com/hotels/index.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
              query: query,
            },
            success: function (hotels) {
              // Find matched items
              f = hotels.hotels;
              for (var i = 0; i < f.length; i++) {
                if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
              }
              // Hide Preoloader
              autocomplete.preloaderHide();
              // Render items by passing array with result items
              render(results);
            }
          });
        }
      });



    }
    if (type.place == "restaurant") {

      markers = [];
      app.request.json("http://toithichdoc.com/restaurants/index.json", function (restaurants) {
        b = restaurants.restaurants;
        for (var i = 0; i < b.length; i++) {
          createMaker(b[i]);

        }

      });


      autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown-ajax-typeahead',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        /* If we set valueProperty to "id" then input value on select will be set according to this property */
        valueProperty: 'name', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        typeahead: true,

        source: function (query, render) {
          var autocomplete = this;
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Show Preloader
          autocomplete.preloaderShow();

          app.request({
            url: 'http://toithichdoc.com/restaurants/index.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
              query: query,
            },
            success: function (restaurants) {
              // Find matched items
              f = restaurants.restaurants;
              for (var i = 0; i < f.length; i++) {
                if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
              }
              // Hide Preoloader
              autocomplete.preloaderHide();
              // Render items by passing array with result items
              render(results);
            }
          });
        }
      });


    }
    if (type.place == "place") {
      markers = [];
      app.request.json("http://toithichdoc.com/places/index.json", function (places) {
        b = places.places;
        for (var i = 0; i < b.length; i++) {
          createMaker2(b[i]);

        }

      });

      autocompleteDropdownAjaxTypeahead = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown-ajax-typeahead',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        /* If we set valueProperty to "id" then input value on select will be set according to this property */
        valueProperty: 'name', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        typeahead: true,

        source: function (query, render) {
          var autocomplete = this;
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Show Preloader
          autocomplete.preloaderShow();

          app.request({
            url: 'http://toithichdoc.com/places/index.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
              query: query,
            },
            success: function (places) {
              // Find matched items
              f = places.places;
              for (var i = 0; i < f.length; i++) {
                if (f[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(f[i]);
              }
              // Hide Preoloader
              autocomplete.preloaderHide();
              // Render items by passing array with result items
              render(results);
            }
          });
        }
      });
    }
  });

  function createMaker(object) {
    var infowindow = new google.maps.InfoWindow({
      // content: object["name"],
      content: '<strong>' + object["name"] + '</strong> ' + '<p></p>' + '<a href="/content_hotels/?hotel_id=' + object["id"] + '">Xem địa điểm</a>'
    });
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(object["latitude"]),
        lng: parseFloat(object["longitude"])
      },
      map: map,
      icon: {
        url: "./icons/restaurant.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    });


    marker.addListener('click', function () {
      infowindow.open(map, this);
      map.setZoom(16);
      map.setCenter(marker.getPosition());
    });
    markers.push(marker);
  }



  function createMaker1(object) {
    var infowindow = new google.maps.InfoWindow({
      // content: object["name"],
      content: '<strong>' + object["name"] + '</strong> ' + '<p></p>' + '<a href="/content_hotels/?hotel_id=' + object["id"] + '">Xem địa điểm</a>'
    });
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(object["latitude"]),
        lng: parseFloat(object["longitude"])
      },
      map: map,
      icon: {
        url: "./icons/hotel.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    });
    // marker.addListener('mouseover', function () {
    //     infowindow.open(map, this);
    // });

    marker.addListener('click', function () {
      infowindow.open(map, this);
      map.setZoom(16);
      map.setCenter(marker.getPosition());
    });

    markers.push(marker);
  }

  function createMaker2(object) {
    var infowindow = new google.maps.InfoWindow({
      // content: object["name"],
      content: '<strong>' + object["name"] + '</strong> ' + '<p></p>' + '<a href="/content_hotels/?hotel_id=' + object["id"] + '">Xem địa điểm</a>'
    });
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(object["latitude"]),
        lng: parseFloat(object["longitude"])
      },
      map: map,
      icon: {
        url: "./icons/place.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    });


    marker.addListener('click', function () {
      infowindow.open(map, this);
      map.setZoom(16);
      map.setCenter(marker.getPosition());
    });

    markers.push(marker);
  }




  $$('.Find-place').on('click', function () {



    var R = 6371;

    if (typeof (Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      }
    }

    // for (var i = 0; i < markers.length; i++) {
    //   markers[i].setMap(map);
    // }
    for (i = 0; i < markersDirection.length; i++) {
      markersDirection[i].setMap(null);
    }
    directionsDisplay.setMap(null);

    var viTri = -1;
    var KC = app.form.convertToData('#khungnhaplieu1');
    var diemCanTim = app.form.convertToData('#my-form');

    if (diemCanTim.name == "") {
      alert("Hãy nhập địa điểm")
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    else {

      if (navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(function (position) {

          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          // alert("Latitude : " + latitude + " Longitude: " + longitude);
          handleLocationError(latitude, longitude);
        }, function (err) {
          if (err.code == 1) {
            alert("Error: Access is denied!");
          } else if (err.code == 2) {
            alert("Error: Position is unavailable!");
          }
        }, { timeout: 60000 });
      } else {
        alert("Sorry, browser does not support geolocation!");
      }
      // } else {
      //   // Browser doesn't support Geolocation
      //   handleLocationError(false, infoWindow, map.getCenter());
      // }


      //function handleLocationError(browserHasGeolocation, infoWindow, pos, marker) {
      function handleLocationError(latitude, longitude) {
        var dlat;
        var dlon;
        var dlat1;
        var dLat2;
        var vitri = 1;



        directionsDisplay.setMap(null)


        for (var i = 0; i <= markers.length; i++) {


          try {
            // markers[i].setMap(null);
            // alert(markers.length);
            // alert( b[i]["latitude"]);
            dLat = (latitude - b[i]["latitude"]).toRad();
            dLon = (longitude - b[i]["longitude"]).toRad();
            dLat1 = (b[i]["latitude"] - 0).toRad();
            dLat2 = (latitude - 0).toRad();
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(dLat1) * Math.cos(dLat1) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            // alert(d);
            // if(KC.KC >= d)
            // {
            //   // alert(markers.length);
            //   markers[i].setMap(map);
            //   // alert(d);
            // }

            if (diemCanTim.name == b[i]["name"] && (KC.KC >= d || KC.KC == "")) {  // so sánh điểm nhập với tên trong json

              markers[i].setMap(map);
              map.setCenter(markers[i].getPosition());
              markers[i].setAnimation(google.maps.Animation.BOUNCE);
              map.setZoom(14);
              vitri = 0;
            }
            else {
              // if(KC.KC >= d || KC.KC == ""){
              //   markers[i].setMap(map);
              // }
              // else{
              markers[i].setMap(null);
              // }


            }
          } catch (error) {

          }



        }

        if (vitri == 1) {

          alert("Không tìm được địa điểm này");
          for (var i = 0; i <= markers.length; i++) {
            markers[i].setMap(map);
          }
        }
      }
    }
  });


  $$('.convert-form-to-data').on('click', function () {

    for (i = 0; i < markersDirection.length; i++) {
      markersDirection[i].setMap(null);
    }

    var R = 6371;

    if (typeof (Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      }
    }


    markersDirection = [];
    // var oDiemDau = app.form.convertToData('#khungnhaplieu');
    var oDiemCuoi = app.form.convertToData('#my-form');
    var KC = app.form.convertToData('#khungnhaplieu1');
    // var travel = app.form.convertToData('#khungnhaplieu2');
    // var oDiemDau = document.getElementById("diemDau");
    // var oDiemCuoi = document.getElementById("diemCuoi");

    // alert(travel.phuongtien);

    for (var i = 0; i <= markers.length; i++) {

      try {
        if (oDiemCuoi.name == b[i]["name"]) {

          lat_cuoi = b[i]["latitude"];
          lng_cuoi = b[i]["longitude"];

          // alert(lat_cuoi +" "+  lng_cuoi );
        }
      } catch (error) {

      }

    }


    if (oDiemCuoi.name == "") {
      alert("Lỗi đầu vào");

    }

    //    alert(arrData[oDiemDau.value].tieuDe+"->"+arrData[oDiemCuoi.value].tieuDe);

    else {


      if (navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(function (position) {

          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          // alert("Latitude : " + latitude + " Longitude: " + longitude);
          handleLocationError(latitude, longitude);
        }, function (err) {
          if (err.code == 1) {
            alert("Error: Access is denied!");
          } else if (err.code == 2) {
            alert("Error: Position is unavailable!");
          }
        }, { timeout: 60000 });
      } else {
        alert("Sorry, browser does not support geolocation!");
      }
      // } else {
      //   // Browser doesn't support Geolocation
      //   handleLocationError(false, infoWindow, map.getCenter());
      // }


      //function handleLocationError(browserHasGeolocation, infoWindow, pos, marker) {
      function handleLocationError(latitude, longitude) {

        var d;
        var dlat;
        var dlon;
        var dlat1;
        var dLat2;
        // infoWindow.setPosition(pos);
        directionsService.route({
          // origin: pos,
          origin: {
            lat: latitude,
            lng: longitude
          },
          destination: {
            lat: parseFloat(lat_cuoi),
            lng: parseFloat(lng_cuoi)
          },
          travelMode: 'WALKING'
        }, function (response, status) {

          // for (var i = 0; i <= markers.length; i++) {
          try {


            // markers[i].setMap(null);
            // alert(markers.length);
            // alert( b[i]["latitude"]);
            dLat = (latitude - lat_cuoi - 0).toRad();
            dLon = (longitude - lng_cuoi - 0).toRad();
            dLat1 = (lat_cuoi - 0).toRad();
            dLat2 = (latitude - 0).toRad();
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(dLat1) * Math.cos(dLat1) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            d = R * c;
            // alert(d);
            // if(KC.KC >= d)
            // {
            //   // alert(markers.length);
            //   markers[i].setMap(map);
            //   // alert(d);
            // }

            if (status === 'OK' && (KC.KC >= d || KC.KC == "")) {
              // alert(KC.KC);
              // alert(d);
              directionsDisplay.setMap(map);
              directionsDisplay.setDirections(response);
              if (markers.length > 0)
                for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
                }
              showSteps(response);
            }
            else {
              directionsDisplay.setMap(null);
              window.alert("Không tìm được đường đi!");
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
              }
            }
          } catch (error) {

          }
          // }


          // if (status === 'OK' && (KC.KC >= d || KC.KC == "")  ) {
          //     directionsDisplay.setMap(map);
          //      directionsDisplay.setDirections(response);
          //     if (markers.length > 0)
          //         for (var i = 0; i < markers.length; i++) {
          //             markers[i].setMap(null);
          //         }
          //     showSteps(response);
          // } else {
          //     directionsDisplay.setMap(null);
          //     window.alert("Không tìm được đường đi!");
          // }
        });



      }





    }
  });

  $$('.find-distance').on('click', function () {
    var R = 6371;

    if (typeof (Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      }
    }

    for (i = 0; i < markersDirection.length; i++) {
      markersDirection[i].setMap(null);
    }

    markersDirection = [];
    var KC = app.form.convertToData('#khungnhaplieu1');


    for (var i = 0; i <= markers.length; i++) {

      try {
        // if (KC.KC == b[i]["name"]){

        //   lat_cuoi = b[i]["latitude"];
        //   lng_cuoi = b[i]["longitude"];

        //   // alert(dau +" "+ cuoi + " " + travel.phuongtien);
        // }


      } catch (error) {

      }

    }


    if (KC.KC == "") {
      for (i = 0; i < markersDirection.length; i++) {
        markersDirection[i].setMap(null);
      }
      for (i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
      directionsDisplay.setMap(null);
    }

    //    alert(arrData[oDiemDau.value].tieuDe+"->"+arrData[oDiemCuoi.value].tieuDe);

    else {


      if (navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(function (position) {

          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          // alert("Latitude : " + latitude + " Longitude: " + longitude);
          handleLocationError(latitude, longitude);
        }, function (err) {
          if (err.code == 1) {
            alert("Error: Access is denied!");
          } else if (err.code == 2) {
            alert("Error: Position is unavailable!");
          }
        }, { timeout: 60000 });
      } else {
        alert("Sorry, browser does not support geolocation!");
      }
      // } else {
      //   // Browser doesn't support Geolocation
      //   handleLocationError(false, infoWindow, map.getCenter());
      // }


      //function handleLocationError(browserHasGeolocation, infoWindow, pos, marker) {
      function handleLocationError(latitude, longitude) {
        var dlat;
        var dlon;
        var dlat1;
        var dLat2;



        directionsDisplay.setMap(null);
        for (var i = 0; i < markers.length; i++) {

          try {

            dLat = (latitude - b[i]["latitude"]).toRad();
            dLon = (longitude - b[i]["longitude"]).toRad();
            dLat1 = (b[i]["latitude"] - 0).toRad();
            dLat2 = (latitude - 0).toRad();
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(dLat1) * Math.cos(dLat1) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            // alert(d);
            if (KC.KC >= d) {
              // alert(markers.length);
              markers[i].setMap(map);
              // alert(d);
            }
            else {
              markers[i].setMap(null);
            }
            //  alert(dLat + " " + dLon + " " +  dLat1 + " " + dLat2 + " " + latitude + " " + longitude );
          } catch (error) {
          }
        }
      }
    }
  });





  function showSteps(directionResult) {
    // For each step, place a marker, and add the text to the marker's
    // info window. Also attach the marker to an array so we
    // can keep track of it and remove it when calculating new
    // routes.
    var myRoute = directionResult.routes[0].legs[0];

    for (var i = 0; i < myRoute.steps.length; i++) {
      var icon = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + i + "|FF0000|000000";
      if (i == 0) {
        icon = "https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star|car-dealer|00FFFF|FF0000";
      }
      var marker = new google.maps.Marker({
        position: myRoute.steps[i].start_point,
        map: map,
        icon: icon
      });
      attachInstructionText(marker, myRoute.steps[i].instructions);
      markersDirection.push(marker);
    }
    var marker = new google.maps.Marker({
      position: myRoute.steps[i - 1].end_point,
      map: map,
      icon: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|ADDE63"
    });
    markersDirection.push(marker);

    google.maps.event.trigger(markersDirection[0], "click");
  }

  function attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function () {
      // Open an info window when the marker is clicked on,
      // containing the text of the step.
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  }
});