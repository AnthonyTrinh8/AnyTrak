--
---- : Indicates input provided from user from selection in a form or text box ----
--




-- The SELECTS for displaying the main pages ----------------------------------------------

-- Query for Trains page
SELECT trainID, stationID, model, cost, capacity, conductorfirstname, conductorlastname FROM Trains;
SELECT stationID, stationname FROM Stations ORDER BY stationID

-- Query for Stations page
SELECT stationID, state FROM Stations
SELECT stationID, stationname, address, state, city, zipcode FROM Stations;
SELECT stationID, stationname, address, state, city, zipcode FROM Stations WHERE stationID = :stationID_from_input;


-- Query for Routes + RoutesThruStations page
SELECT routeID, trainID, routename, ticketprice FROM Routes;
SELECT trainID FROM Trains ORDER BY TrainID
SELECT routesthrustationsID, routeID, stationID, travelduration, milestraveled FROM RoutesThruStations
SELECT stationID FROM Stations ORDER BY stationID

---------------------------------------------------------------------------------------------





-- The INSERTS for all entities ------------------------------------------------------------


-- Insert entry into Trains table
INSERT INTO `Trains`(`stationID`, `model`, `cost`, `capacity`, `conductorfirstname`, `conductorlastname`)
    VALUES (
        :stationID_from_select,
        :model_from_input,
        :cost_from_input,
        :capacity_from_input,
        :conductorfirstname_from_input,
        :conductorlastname_from_input
);

-- Insert entry into Stations table
INSERT INTO `Stations`(`stationname`, `address`, `state`, `city`, `zipcode`)
    VALUES (
        :station_name_from_input,
        :address_from_input,
        :state_from_input,
        :city_from_input,
        :zipcode_from_input
);

-- Insert entry into Routes table
INSERT INTO `Routes`(`trainID`, `routename`, `ticketprice`)
    VALUES (
        :trainID_from_select,
        :route_name_from_input,
        :ticket_price_from_input
);

-- Insert entry into RoutesThruStations table
INSERT INTO `RoutesThruStations`(`routeID`, `stationID`, `travelduration`, `milestraveled`)
    VALUES (
        :routeID_from_select,
        :stationID_from_select,
        :travelduration_from_input,
        :milestraveled_from_input
);


-----------------------------------------------------------------------





-- The Update for Trains Entity ---------------------------


-- Update Trains entities. Users will select the train they want to update using form.
UPDATE `Trains`
SET
  `stationID` = :stationID_from_select,
  `model` = :model_from_input,
  `cost` = :cost_from_input,
  `capacity` = :capacity_from_input,
  `conductorfirstname` = :conductorfirstname_from_input,
  `conductorlastname_from_input` = :conductorlastname_from_input
WHERE
  `trainID` = :trainID_from_select;

----------------------------------------------------------




-- The DELETEs for all entities in the M:M Relationship


-- Delete entry in Routes table
DELETE FROM  `Routes`
WHERE
  `routeID` = :routeID_from_input;


-- Delete entry in RoutesThruStations table
DELETE FROM  `Routesthrustations`
WHERE
  `routesthrustationsID` = :routesthrustationsID_from_input;


-- Delete entry in Stations table
DELETE FROM  `stations`
WHERE
  `stationID` = :stationID_from_input;
