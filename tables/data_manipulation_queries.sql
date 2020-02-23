SELECT * from `routes`;
SELECT * from `trains`;
SELECT * from `stations`;

-- colons are the indication of variable names we will hold user inputs

INSERT INTO `trains`(`trainID`, `stationID`, `model`, `cost`, `capacity`, `conductorfirstname`, `conductorlastname`) 
    VALUES (
        :train_id, 
        :station_id, 
        :train_model, 
        :train_cost, 
        :train_capacity, 
        :conductorfirstname, 
        :conductorlastname
);

INSERT INTO `stations`(`stationID`, `stationname`, `address`, `state`, `city`, `zipcode`) 
    VALUES (
        :station_id, 
        :station_name_from_input, 
        :address_from_input, 
        :state_from_input, 
        :city_from_input, 
        :zipcode_from_input
);

INSERT INTO `routes`(`routeID`, `trainID`, `routename`, `ticketprice`) 
    VALUES (
        :route_id_from_input, 
        :train_id_from_input, 
        :route_name_from_input, 
        :ticket_price_from_input
);


