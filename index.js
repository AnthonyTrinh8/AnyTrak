function showmodal() {
  document.getElementsByClassName("insert")[0].classList.toggle("show");
}


function inserttrain() {
  document.getElementsByClassName("insert")[0].classList.toggle("show");

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

  document.getElementById("card-container").appendChild(traininsert);

  train_number_value = "";
  train_route_value = "";
  train_model_value = "";
  train_price_value = "";
  train_capacity_value = "";
  train_conductor_value = "";

  var insertcontainer = document.getElementsByClassName("insert")[0];
  insertcontainer.reset();
}
