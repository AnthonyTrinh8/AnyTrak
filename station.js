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
