// Vi hämtar button från html med id search
let userInput = document.getElementById('userInput')

$('#btn').click(function () {
  search()
})
// Vi skapar en sök funktion där vi lägger in vår nyckel och lägger in url api
function search() {
  const KEY = 'cb2c86f5b3dc418191c27dff16df9820';
  // skapar en let på knappen med variabeln vi angett innan så man kan ange staden man söker på o trycka på knappen så man kan söka på staden
  let city = userInput.value;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}&lang=sv`
  fetch(url).then(
      // skapar en funktion med if else statement
    function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        throw 'Something went wrong. :(';
      }
    }
    // hämta variablerna från data

  ).then(
    function (data) {
      setMessage(" ")
      console.log(data);
      const { city_name, country_code } = data;
      const { temp, wind_spd, rh } = data.data[0];
      const { description, icon } = data.data[0].weather
      changeBackground(temp);
      $('.city-name').html('City: ' + city_name + ' ' + country_code);
      $('.temperature').html('Temperature: ' + Math.floor(temp) + " C");
      $('.description').html(description);
      $('.wind-speed').html('Wind Speed: ' + wind_spd);
      $('.wind-humidity').html('Wind Humidity: ' + rh + '%');
      $('.weather-icon-image').attr("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`);
      clearDiv()
      // for loop som visar 5
      for (let i = 1; i < 6; i++) {
        const { datetime, temp } = data.data[i];
        const { description, icon } = data.data[i].weather
        const days = $("<div></div>");
        let description5 = $("<p></p>").html(description);
        let img5 = $("<img></img>").attr("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`)
        let temperature5 = $("<p></p>").html(Math.floor(temp) + " C");
        let date = $("<p></p>").html(datetime);
        $(days).append(description5, img5, temperature5, date);
        $('#five-days').append(days);
      }
    }
    // om man anger en ogiltig stad
  ).catch(
    function (error) {
      setMessage("error")
    }
  );
}
// rensar när man söker på ny stad
function clearDiv() {
  const divEl = $('#five-days *')
  for (let el of divEl) { el.remove() };
}

function setMessage(message) {
  $("#message").html(message);
}   
// skriver en function som ändrar bakrundsfärg beroende på temperaturen
function changeBackground(tempo) {

    if (tempo < 10 && tempo < 20) {
      document.body.style.backgroundColor = 'rgb(107, 134, 227)'
    }
    if (tempo > 20) {
      document.body.style.backgroundColor = 'orange'
    }
    if (tempo <1) {
        document.body.style.backgroundColor = 'darkblue';
    }
    if (tempo > 29) {
        document.body.style.backgroundColor = 'limegreen';
    }
  }