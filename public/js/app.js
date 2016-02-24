
    var weatherData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var name = "Your name";
  //$('#get-weather').on('click',showInfo);
  $('#get-weather').on('click', getPosition);

  function getPosition(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      alert('Your browser is not able to obtain your current position.')//you should fix this
    }
  }
  function buildUrl(lat, lon){
      return baseUrl + apiKey+'/'+lat+','+lon;
  }

  function getWeather(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var options = {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: successHandler,
      error: errorHandler
    };

    $.ajax(options);
  }

  function successHandler(data){
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    var viewData = {
      temperature: data.currently.temperature,
      icon: data.currently.icon,
      latitude:data.latitude,
      longitude:data.longitude,
    };
    var html = template(viewData);
    $('#output').html(html);
  }

  function errorHandler(err){
    console.log(err);
  }


// this is a structure that provides clues how to use the handler, but it does not currently work
  function showInfoSuccess(hammer){
    console.log(hammer);
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    var extractedData = {
      latitude:hammer.latitude,
      longitude:hammer.longitude,
      icon: hammer.currently.icon ,
      time: hammer.currently.time,
      temperature:hammer.currently.temperature,
      summary: hammer.currently.summary

    };
    var html = template(extractedData);
    $('#output').html(html);
  }

$('#head').hover(function(){
  $(this).addClass("animated infinite shake");
},function(){(this).removeClass('mouseleave')
});


});
