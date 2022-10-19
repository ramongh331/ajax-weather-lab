// 1. Set up a state variable to store our movie data.
let weatherData, userInput;

// variable for api key
const apiKey = "ec761200fdcb8d2437f31ccc0bd79e12";

// variable for base url
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

// Cache elements from DOM
const $weatherFor = $("#weather-for");
const $temp = $("#temp");
const $feelsLike = $("#feels-like");
const $weather = $("#weather");
// 6. Cache a reference to the input element from the DOM
const $input = $('input[type ="text"]');

// 2. Set up an event listener for a 'submit' event from our form.
$("form").on("submit", handleGetData);

// 3. For best practices, we'll move the AJAX request to it's own function called handleGetData, this function will get called when the form is submitted thus fetching our data and assigning it to our movieData state variable.
function handleGetData(event) {
  event.preventDefault();

  // Assign the value from our input element ($input) to our state variable (userInput) and use that value ($input.val()) to modify the ajax request.
  userInput = $input.val();

  $.ajax({
    url: `${baseURL}?q=${userInput},us&APPID=${apiKey}`,
  }).then(
    (data) => {
      weatherData = data;
      render();
    },
    (error) => {
      console.log("bad request", error);
    }
  );
}

// 4. Create a seperate function called render transfer the data from our state variable (weatherData) to the DOM.
function render() {
  $weatherFor.text(`Weather For: ` + userInput);
  $temp.text(`Temperature: ` + weatherData.main.temp);
  $feelsLike.text(`Feels Like: ` + weatherData.main.feels_like);
  $weather.text(`Weather: ` + weatherData.weather[0].description);
}
