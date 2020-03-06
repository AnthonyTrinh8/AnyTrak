

var closebtns = document.getElementsByClassName("close");

for (var i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function () {
    this.parentElement.style.display = 'none';
  });
}

/* Button that pops up form to add element for each entity */
function showmodal() {
  var allboxes = document.getElementsByClassName("insert");
  var i;
  for (i = 0; i < allboxes.length; i++) {
    allboxes[i].classList.toggle("show");
  }
}

// Button that only displays 2nd form for Trains
function showmodal2() {
  var allboxes = document.getElementsByClassName("update");
  var i;
  for (i = 0; i < allboxes.length; i++) {
    allboxes[i].classList.toggle("show");
  }
}

var saveCards = document.getElementsByClassName("card");
var saveStates = document.getElementsByClassName("station-state");

function searchfunction() {
  var stationID = document.getElementById("station_filter").value;
  console.log(stationID);
  //construct the URL and redirect to it
  window.location = '/stations/filter/' + parseInt(stationID)
}

// function searchfunction() {
//   // alert("Clicked!");
//   var filterinput = document.getElementById("search-input").value.trim();
//   // console.log(filterinput);
//   var request = new XMLHttpRequest();
//   request.open('GET', "/stations/search"); 

//   var input = {
//     filter: filterinput
//   };

//   var requestBody = JSON.stringify(input);

//   console.log("Sent Request");

//   request.setRequestHeader('Content-type', 'application/json');
//   request.send(requestBody);
//   console.log(request);

// }



// /* Inserts Train into flex container */
// function inserttrain() {
//   event.preventDefault();
//
//   /* Close Form */
//   document.getElementsByClassName("insert")[0].classList.toggle("show");
//
//   /* Making Train Insert Box */
//   var traininsert = document.createElement("div");
//   traininsert.classList.add("col");
//
//   var cardinsert = document.createElement("section");
//   cardinsert.classList.add("card");
//
//
//   var train_number = document.createElement("div");
//   var train_number_value = document.getElementById("train-number").value;
//   var divText1 = document.createTextNode("Train " + train_number_value);
//   train_number.classList.add("train-number");
//   train_number.appendChild(divText1);
//
//
//   var train_route = document.createElement("div");
//   var train_route_value = document.getElementById("train-route").value;
//   var divText2 = document.createTextNode("On Route: " + train_route_value);
//   train_route.classList.add("train-route");
//   train_route.appendChild(divText2);
//
//
//   var train_model = document.createElement("div");
//   var train_model_value = document.getElementById("train-model").value;
//   var divText3 = document.createTextNode("Model: " + train_model_value);
//   train_model.classList.add("train-model");
//   train_model.appendChild(divText3);
//
//
//   var train_price = document.createElement("div");
//   var train_price_value = document.getElementById("train-price").value;
//   var divText4 = document.createTextNode("Price: $" + train_price_value);
//   train_price.classList.add("train-price");
//   train_price.appendChild(divText4);
//
//   var train_capacity = document.createElement("div");
//   var train_capacity_value = document.getElementById("train-capacity").value;
//   var divText5 = document.createTextNode("Capacity: " + train_capacity_value);
//   train_capacity.classList.add("train-capacity");
//   train_capacity.appendChild(divText5);
//
//   var train_conductor = document.createElement("div");
//   var train_conductor_value = document.getElementById("train-conductor").value;
//   var divText6 = document.createTextNode("Conductor: " + train_conductor_value);
//   train_conductor.classList.add("train-conductor");
//   train_conductor.appendChild(divText6);
//
//   cardinsert.appendChild(train_number);
//   cardinsert.appendChild(train_route);
//   cardinsert.appendChild(train_model);
//   cardinsert.appendChild(train_price);
//   cardinsert.appendChild(train_capacity);
//   cardinsert.appendChild(train_conductor);
//
//   traininsert.appendChild(cardinsert);
//
//   /* Adding it into container */
//   document.getElementById("row").appendChild(traininsert);
//
//   document.getElementById("card-container").add("row");
//
//   train_number_value = "";
//   train_route_value = "";
//   train_model_value = "";
//   train_price_value = "";
//   train_capacity_value = "";
//   train_conductor_value = "";
//
//   document.getElementsByClassName("insert")[0].reset();
//
// }
//
//
// /* ------------------------------------------------------------------------- */
//
// /* Sub-function for adding stations so we can easily create station boxes of any values
//    rather than just from user input in forms */
//     function addstation(station_number_value, station_name_value, station_address_value,
//     station_state_value, station_city_value, station_zipcode_value) {
//     /* Close Form */
//     event.preventDefault();
//
//     document.getElementsByClassName("insert")[0].classList.toggle("show");
//
//     /* Making Station Insert Box */
//     var stationinsert = document.createElement("div");
//     stationinsert.classList.add("col");
//
//     var cardinsert = document.createElement("section");
//     cardinsert.classList.add("card");
//
//     var station_number = document.createElement("div");
//     var divText1 = document.createTextNode("Station #" + station_number_value);
//     station_number.classList.add("station-number");
//     station_number.appendChild(divText1);
//
//     var station_name = document.createElement("div");
//     var divText2 = document.createTextNode("Name: " + station_name_value);
//     station_name.classList.add("station-name");
//     station_name.appendChild(divText2);
//
//     var station_address = document.createElement("div");
//     var divText3 = document.createTextNode("Address: " + station_address_value);
//     station_address.classList.add("station-address");
//     station_address.appendChild(divText3);
//
//     var station_state = document.createElement("div");
//     var divText4 = document.createTextNode("State: " + station_state_value);
//     station_state.classList.add("station-state");
//     station_state.appendChild(divText4);
//
//     var station_city = document.createElement("div");
//     var divText5 = document.createTextNode("City: " + station_city_value);
//     station_city.classList.add("station-city");
//     station_city.appendChild(divText5);
//
//     var station_zipcode = document.createElement("div");
//     var divText6 = document.createTextNode("Zipcode: " + station_zipcode_value);
//     station_zipcode.classList.add("station-zipcode");
//     station_zipcode.appendChild(divText6);
//
//     cardinsert.appendChild(station_number);
//     cardinsert.appendChild(station_name);
//     cardinsert.appendChild(station_address);
//     cardinsert.appendChild(station_state);
//     cardinsert.appendChild(station_city);
//     cardinsert.appendChild(station_zipcode);
//
//     stationinsert.appendChild(cardinsert);
//
//     document.getElementById("row").appendChild(stationinsert);
//
//
//     document.getElementById("card-container").add("row");
//     }
//
//
//     /* Adds stations but with only the variable names, not a template such as "Name: " + value */
//     function addstationonly(station_number_value, station_name_value, station_address_value,
//     station_state_value, station_city_value, station_zipcode_value) {
//     /* Close Form */
//     document.getElementsByClassName("insert")[0].classList.toggle("show");
//
//     /* Making Station Insert Box */
//     var stationinsert = document.createElement("section");
//     stationinsert.classList.add("card");
//
//     var station_number = document.createElement("div");
//     var divText1 = document.createTextNode("Station #" + station_number_value);
//     station_number.classList.add("station-number");
//     station_number.appendChild(divText1);
//
//     var station_name = document.createElement("div");
//     var divText2 = document.createTextNode("Name: " + station_name_value);
//     station_name.classList.add("station-name");
//     station_name.appendChild(divText2);
//
//     var station_address = document.createElement("div");
//     var divText3 = document.createTextNode("Address: " + station_address_value);
//     station_address.classList.add("station-address");
//     station_address.appendChild(divText3);
//
//     var station_state = document.createElement("div");
//     var divText4 = document.createTextNode("State: " + station_state_value);
//     station_state.classList.add("station-state");
//     station_state.appendChild(divText4);
//
//     var station_city = document.createElement("div");
//     var divText5 = document.createTextNode("City: " + station_city_value);
//     station_city.classList.add("station-city");
//     station_city.appendChild(divText5);
//
//     var station_zipcode = document.createElement("div");
//     var divText6 = document.createTextNode("Zipcode: " + station_zipcode_value);
//     station_zipcode.classList.add("station-zipcode");
//     station_zipcode.appendChild(divText6);
//
//     stationinsert.appendChild(station_number);
//     stationinsert.appendChild(station_name);
//     stationinsert.appendChild(station_address);
//     stationinsert.appendChild(station_state);
//     stationinsert.appendChild(station_city);
//     stationinsert.appendChild(station_zipcode);
//
//     document.getElementById("card-container").appendChild(stationinsert);
//     }


/* Inserts Station into flex container */
function insertstation() {
  var station_name_value = document.getElementById("station-name").value.trim();
  var station_address_value = document.getElementById("station-address").value.trim();
  var station_state_value = document.getElementById("station-state").value.trim();
  var station_city_value = document.getElementById("station-city").value.trim();
  var station_zipcode_value = document.getElementById("station-zipcode").value.trim();
  if (!(station_name_value && station_address_value && station_state_value && station_city_value && station_zipcode_value)) {
    alert("Please resubmit form with all fields filled.");
  } else {
    var request = new XMLHttpRequest();
    request.open('POST', "/stations/create");

    var station = {
      station_name_input: station_name_value,
      station_address_input: station_address_value,
      station_state_input: station_state_value,
      station_city_input: station_city_value,
      station_zipcode_input: station_zipcode_value
    };

    var requestBody = JSON.stringify(station);

    request.addEventListener('load', function (event) {
      if (event.target.status === 400) {
        alert("The station must be unique.");
      }
    });
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
  }
  document.getElementsByClassName("insert")[0].reset();
}





function inserttrain() {
  var station_id_value = document.getElementById("main-station").value.trim();
  var train_model_value = document.getElementById("train-model").value.trim();
  var train_cost_value = document.getElementById("train-cost").value.trim();
  var train_capacity_value = document.getElementById("train-capacity").value.trim();
  var train_first_value = document.getElementById("train-first-conductor").value.trim();
  var train_last_value = document.getElementById("train-last-conductor").value.trim();

  if (!(train_model_value && train_cost_value && train_capacity_value &&
    train_first_value && train_last_value)) {
    alert("Please resubmit form with all fields filled.");
  } else {
    var request = new XMLHttpRequest();
    request.open('POST', "/trains/create");

    var train = {
      station_id_input: station_id_value,
      train_model_input: train_model_value,
      train_cost_input: train_cost_value,
      train_capacity_input: train_capacity_value,
      train_first_input: train_first_value,
      train_last_input: train_last_value
    };

    var requestBody = JSON.stringify(train);

    request.addEventListener('load', function (event) {
      if (event.target.status === 400) {
        alert("The train must be unique.");
      }
    });
    request.setRequestHeader('Content-type', 'application/json');
    request.send(requestBody);
  }
  document.getElementsByClassName("insert")[0].reset();
}


function insertroute() {
  var route_name_input = document.getElementById("route-name").value.trim();
  var train_on_route_input = document.getElementById('train-on-route').value.trim();
  var ticket_price_input = document.getElementById('ticket-price').value.trim();
  if (route_name_input && train_on_route_input && ticket_price_input) {
    var request = new XMLHttpRequest();
    request.open('POST', "/routes/create");
    var route = {
      route_name: route_name_input,
      train_on_route: train_on_route_input,
      ticket_price: ticket_price_input
    };
    var requestBody = JSON.stringify(route);

    request.addEventListener('load', function (event) {
      if (event.target.status === 400) {
        alert("The Route must be unique");
      }
    });
    request.setRequestHeader('Content-type', 'application/json');
    request.send(requestBody);
    document.getElementsByClassName("insert")[0].reset();
    document.getElementsByClassName("insert")[1].reset();
  } else {
    alert("Please submit all fields");
  }
}


function insertstationroute() {
  var add_route_input = document.getElementById('add-route').value.trim();
  var add_station_input = document.getElementById('add-station').value.trim();
  var travel_duration_input = document.getElementById('travel-duration').value.trim();
  var miles_traveled_input = document.getElementById('miles-traveled').value.trim();
  if (add_route_input && add_station_input) {
    var request = new XMLHttpRequest();
    request.open('POST', "/routesthrustations/create");
    var routesthrustations = {
      route: add_route_input,
      station: add_station_input,
      travel_duration: travel_duration_input,
      miles_traveled: miles_traveled_input
    };
    var requestBody = JSON.stringify(routesthrustations);

    request.addEventListener('load', function (event) {
      if (event.target.status === 400) {
        alert("The station being added to the route must be unique");
      }
    });
    request.setRequestHeader('Content-type', 'application/json');
    request.send(requestBody);
    document.getElementsByClassName("insert")[0].reset();
    document.getElementsByClassName("insert")[1].reset();
  } else {
    alert("Please fill out at least the route # and station #");
  }


}
