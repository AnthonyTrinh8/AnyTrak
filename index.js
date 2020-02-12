/* Search function for stations page based on state */
var search = document.getElementById("search-input");

/* Turn into easier array to access fields */
var allstationsarray = [];

/* All User Info */
var allstations = document.getElementsByClassName("card");

/* Array that holds all station info */
for (var a = 0; a < allstations.length; a++) {
  allstationsarray.push({
    station_number_value: allstations[a].getElementsByClassName("station-number")[0].textContent.replace("Station #", ""),
    station_name_value: allstations[a].getElementsByClassName("station-name")[0].textContent.replace("Name: ", ""),
    station_address_value: allstations[a].getElementsByClassName("station-address")[0].textContent.replace("Address: ", ""),
    station_state_value: allstations[a].getElementsByClassName("station-state")[0].textContent.replace("State: ", ""),
    station_city_value: allstations[a].getElementsByClassName("station-city")[0].textContent.replace("City: ", ""),
    station_zipcode_value: allstations[a].getElementsByClassName("station-zipcode")[0].textContent.replace("Zipcode: ", "")
  });
  console.log(allstations[a].getElementsByClassName("station-number")[0].textContent.replace("Station #", ""));
  console.log(allstations[a].getElementsByClassName("station-name")[0].textContent.replace("Name: ", ""));
  console.log(allstations[a].getElementsByClassName("station-address")[0].textContent.replace("Address: ", ""));
  console.log(allstations[a].getElementsByClassName("station-state")[0].textContent.replace("State: ", ""));
  console.log(allstations[a].getElementsByClassName("station-city")[0].textContent.replace("City: ", ""));
  console.log(allstations[a].getElementsByClassName("station-zipcode")[0].textContent.replace("Zipcode: ", ""));
}

search.addEventListener("input", function () {
  /* Value of user input */
  var search_value = search.value.toLowerCase();


  for (var b = allstations.length - 1; b > -1; b--) {
    /* Removing all boxes from page first */
    document.getElementById("card-container").removeChild(allstations[b]);
  }

  console.log(allstationsarray.length);

  if (search_value === "") {
    /* Adds all elements back in */
    for (var c = 0; c < allstationsarray.length; c++) {
      addstationonly(allstationsarray[c].station_number_value, allstationsarray[c].station_name_value,
                 allstationsarray[c].station_address_value, allstationsarray[c].station_state_value,
                 allstationsarray[c].station_city_value, allstationsarray[c].station_zipcode_value);
    }
  } else {
    /* Filter stations by state attribute */
    for (var d = 0; d < allstationsarray.length; d++) {
      if (allstationsarray[d].station_state_value.toLowerCase().includes(search_value)) {
        addstationonly(allstationsarray[d].station_number_value, allstationsarray[d].station_name_value,
                   allstationsarray[d].station_address_value, allstationsarray[d].station_state_value,
                   allstationsarray[d].station_city_value, allstationsarray[d].station_zipcode_value);
      }
    }
  }
});


/* Button that pops up form to add element for each entity */
function showmodal() {
  var allboxes = document.getElementsByClassName("insert");
  var i;
  for (i = 0; i < allboxes.length; i++) {
    allboxes[i].classList.toggle("show");
  }
}


/* Inserts Train into flex container */
function inserttrain() {
  /* Close Form */
  document.getElementsByClassName("insert")[0].classList.toggle("show");

  /* Making Train Insert Box */
  var traininsert = document.createElement("section");
  traininsert.classList.add("card");


  var train_number = document.createElement("div");
  var train_number_value = document.getElementById("train-number").value;
  var divText1 = document.createTextNode("Train " + train_number_value);
  train_number.classList.add("train-number");
  train_number.appendChild(divText1);


  var train_route = document.createElement("div");
  var train_route_value = document.getElementById("train-route").value;
  var divText2 = document.createTextNode("On Route: " + train_route_value);
  train_route.classList.add("train-route");
  train_route.appendChild(divText2);


  var train_model = document.createElement("div");
  var train_model_value = document.getElementById("train-model").value;
  var divText3 = document.createTextNode("Model: " + train_model_value);
  train_model.classList.add("train-model");
  train_model.appendChild(divText3);


  var train_price = document.createElement("div");
  var train_price_value = document.getElementById("train-price").value;
  var divText4 = document.createTextNode("Price: $" + train_price_value);
  train_price.classList.add("train-price");
  train_price.appendChild(divText4);

  var train_capacity = document.createElement("div");
  var train_capacity_value = document.getElementById("train-capacity").value;
  var divText5 = document.createTextNode("Capacity: " + train_capacity_value);
  train_capacity.classList.add("train-capacity");
  train_capacity.appendChild(divText5);

  var train_conductor = document.createElement("div");
  var train_conductor_value = document.getElementById("train-conductor").value;
  var divText6 = document.createTextNode("Conductor: " + train_conductor_value);
  train_conductor.classList.add("train-conductor");
  train_conductor.appendChild(divText6);

  traininsert.appendChild(train_number);
  traininsert.appendChild(train_route);
  traininsert.appendChild(train_model);
  traininsert.appendChild(train_price);
  traininsert.appendChild(train_capacity);
  traininsert.appendChild(train_conductor);

  /* Adding it into container */
  document.getElementById("card-container").appendChild(traininsert);

  train_number_value = "";
  train_route_value = "";
  train_model_value = "";
  train_price_value = "";
  train_capacity_value = "";
  train_conductor_value = "";

  document.getElementsByClassName("insert")[0].reset();

}


/* ------------------------------------------------------------------------- */


/* Sub-function for adding stations so we can easily create station boxes of any values
   rather than just from user input in forms */
function addstation(station_number_value, station_name_value, station_address_value,
                    station_state_value, station_city_value, station_zipcode_value) {
  /* Close Form */
  document.getElementsByClassName("insert")[0].classList.toggle("show");

  /* Making Station Insert Box */
  var stationinsert = document.createElement("section");
  stationinsert.classList.add("card");

  var station_number = document.createElement("div");
  var divText1 = document.createTextNode("Station #" + station_number_value);
  station_number.classList.add("station-number");
  station_number.appendChild(divText1);

  var station_name = document.createElement("div");
  var divText2 = document.createTextNode("Name: " + station_name_value);
  station_name.classList.add("station-name");
  station_name.appendChild(divText2);

  var station_address = document.createElement("div");
  var divText3 = document.createTextNode("Address: " + station_address_value);
  station_address.classList.add("station-address");
  station_address.appendChild(divText3);

  var station_state = document.createElement("div");
  var divText4 = document.createTextNode("State: " + station_state_value);
  station_state.classList.add("station-state");
  station_state.appendChild(divText4);

  var station_city = document.createElement("div");
  var divText5 = document.createTextNode("City: " + station_city_value);
  station_city.classList.add("station-city");
  station_city.appendChild(divText5);

  var station_zipcode = document.createElement("div");
  var divText6 = document.createTextNode("Zipcode: " + station_zipcode_value);
  station_zipcode.classList.add("station-zipcode");
  station_zipcode.appendChild(divText6);

  stationinsert.appendChild(station_number);
  stationinsert.appendChild(station_name);
  stationinsert.appendChild(station_address);
  stationinsert.appendChild(station_state);
  stationinsert.appendChild(station_city);
  stationinsert.appendChild(station_zipcode);

  document.getElementById("card-container").appendChild(stationinsert);
}


/* Adds stations but with only the variable names, not a template such as "Name: " + value */
function addstationonly(station_number_value, station_name_value, station_address_value,
                    station_state_value, station_city_value, station_zipcode_value) {
  /* Close Form */
  document.getElementsByClassName("insert")[0].classList.toggle("show");

  /* Making Station Insert Box */
  var stationinsert = document.createElement("section");
  stationinsert.classList.add("card");

  var station_number = document.createElement("div");
  var divText1 = document.createTextNode("Station #" + station_number_value);
  station_number.classList.add("station-number");
  station_number.appendChild(divText1);

  var station_name = document.createElement("div");
  var divText2 = document.createTextNode("Name: " + station_name_value);
  station_name.classList.add("station-name");
  station_name.appendChild(divText2);

  var station_address = document.createElement("div");
  var divText3 = document.createTextNode("Address: " + station_address_value);
  station_address.classList.add("station-address");
  station_address.appendChild(divText3);

  var station_state = document.createElement("div");
  var divText4 = document.createTextNode("State: " + station_state_value);
  station_state.classList.add("station-state");
  station_state.appendChild(divText4);

  var station_city = document.createElement("div");
  var divText5 = document.createTextNode("City: " + station_city_value);
  station_city.classList.add("station-city");
  station_city.appendChild(divText5);

  var station_zipcode = document.createElement("div");
  var divText6 = document.createTextNode("Zipcode: " + station_zipcode_value);
  station_zipcode.classList.add("station-zipcode");
  station_zipcode.appendChild(divText6);

  stationinsert.appendChild(station_number);
  stationinsert.appendChild(station_name);
  stationinsert.appendChild(station_address);
  stationinsert.appendChild(station_state);
  stationinsert.appendChild(station_city);
  stationinsert.appendChild(station_zipcode);

  document.getElementById("card-container").appendChild(stationinsert);
}



/* Inserts Station into flex container */
function insertstation() {
  var station_number_value = document.getElementById("station-number").value;
  var station_name_value = document.getElementById("station-name").value;
  var station_address_value = document.getElementById("station-address").value;
  var station_state_value = document.getElementById("station-state").value;
  var station_city_value = document.getElementById("station-city").value;
  var station_zipcode_value = document.getElementById("station-zipcode").value;
  addstation(station_number_value, station_name_value, station_address_value,
             station_state_value, station_city_value, station_zipcode_value);
  document.getElementsByClassName("insert")[0].reset();
}
