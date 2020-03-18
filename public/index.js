

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




/* Inserts Trains into flex container */
function inserttrain() {
  var station_id_value = document.getElementById("main-station").value.trim();
  var train_model_value = document.getElementById("train-model").value.trim();
  var train_cost_value = document.getElementById("train-cost").value.trim();
  var train_capacity_value = document.getElementById("train-capacity").value.trim();
  var train_first_value = document.getElementById("train-first-conductor").value.trim();
  var train_last_value = document.getElementById("train-last-conductor").value.trim();

  if (!(train_model_value && train_cost_value && train_capacity_value &&
    train_first_value && train_last_value && station_id_value)) {
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

/* Inserts Routes into flex container */
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

/* Insert Routesthrustations into flex container */
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


function updatetrain() {
  var train_id_input = document.getElementById('update-train-id').value;
  var main_station_input = document.getElementById('main-station-update').value;
  var train_model_input = document.getElementById('train-model-update').value;
  var train_cost_input = document.getElementById('train-cost-update').value;
  var train_capacity_input = document.getElementById('train-capacity-update').value;
  var train_first_input = document.getElementById('train-conductor-first-update').value;
  var train_last_input = document.getElementById('train-conductor-last-update').value;

  if (!(main_station_input && train_model_input && train_cost_input && train_capacity_input
      && train_first_input && train_last_input)) {
        alert('All fields must be filled.');


  } else {
    var request = new XMLHttpRequest();
    request.open('POST', "/trains/update");


    var train = {
      train_id: train_id_input,
      main_station: main_station_input,
      train_model: train_model_input,
      train_cost: train_cost_input,
      train_capacity: train_capacity_input,
      train_first: train_first_input,
      train_last: train_last_input
    }



    var requestBody = JSON.stringify(train);

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        window.location.reload();
      }
    });

    request.setRequestHeader('Content-type', 'application/json');
    request.send(requestBody);
    document.getElementsByClassName("update")[0].reset();

  }

}



function deleteroute(buttonObject) {
  console.log(buttonObject.value);
  var route_id_select = buttonObject.value;
  var request = new XMLHttpRequest();
  request.open('POST', "/routes/delete");
  var routes = {
    route_id: route_id_select
  }
  var requestBody = JSON.stringify(routes);

  request.setRequestHeader('Content-type', 'application/json');
  request.send(requestBody);
  request.addEventListener('load', function (event) {
    if (event.target.status === 200) {
      window.location.reload();
    }
  });
}

function deleteroutesthrustations(buttonObject) {
  var routesthrustations_id_select = buttonObject.value;
  var request = new XMLHttpRequest();
  request.open('POST', "/routesthrustations/delete");
  console.log(routesthrustations_id_select);
  console.log(buttonObject.value);
  var rts = {
    rts_id: routesthrustations_id_select
  }
  var requestBody = JSON.stringify(rts);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(requestBody);
  request.addEventListener('load', function (event) {
    if (event.target.status === 200) {
      window.location.reload();
    }
  });
}


function deletestations(buttonObject) {
  var station_id_select = buttonObject.value;
  var request = new XMLHttpRequest();
  request.open('POST', "/stations/delete");
  var stations = {
    station_id: station_id_select
  }
  var requestBody = JSON.stringify(stations);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(requestBody);
  request.addEventListener('load', function (event) {
    if (event.target.status === 200) {
      window.location.reload();
    }
  });



}
