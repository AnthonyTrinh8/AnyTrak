


-- The SELECTS for displaying the main pages,

-- Query for trains
SELECT * from `trains`;

-- Query for stations
SELECT * from `stations`;

-- Query for routes page
SELECT * from `routes`;
SELECT * from `routesthrustations` GROUP BY `routeID`, `routesthrustationsID`;


-- The SELECTS for filling out dynamic content dropbox for FK in all forms;
SELECT `stationID`, `stationname` FROM `stations`;
SELECT `routeID`, `routename` FROM `routes`;
SELECT `trainID` FROM `trains`;


--
---- : Indicates input provided from user from selection in a form or text box ----
--

-- Insert entity into trains table
INSERT INTO `trains`(`stationID`, `model`, `cost`, `capacity`, `conductorfirstname`, `conductorlastname`)
    VALUES (
        :stationID_from_select,
        :model_from_input,
        :cost_from_input,
        :capacity_from_input,
        :conductorfirstname_from_input,
        :conductorlastname_from_input
);

-- Insert entity into stations table
INSERT INTO `stations`(`stationname`, `address`, `state`, `city`, `zipcode`)
    VALUES (
        :station_name_from_input,
        :address_from_input,
        :state_from_input,
        :city_from_input,
        :zipcode_from_input
);

-- Insert entity into routes table
INSERT INTO `routes`(`trainID`, `routename`, `ticketprice`)
    VALUES (
        :trainID_from_select,
        :route_name_from_input,
        :ticket_price_from_input
);

-- Insert entity into routesthrustations table
INSERT INTO `routesthrustations`(`routeID`, `stationID`, `travelduration`, `milestraveled`)
    VALUES (
        :routeID_from_select,
        :stationID_from_select,
        :travelduration_from_input,
        :milestraveled_from_input
);


-- Update trains entities. Users will select the train they want to update using form.
UPDATE `trains`
SET
  `stationID` = :stationID_from_select,
  `model` = :model_from_input,
  `cost` = :cost_from_input,
  `capacity` = :capacity_from_input,
  `conductorfirstname` = :conductorfirstname_from_input,
  `conductorlastname_from_input` = :conductorlastname_from_input
WHERE
  `trainID` = :trainID_from_select


-- Delete entity in routes table
DELETE FROM `routes`
WHERE
  `routeID` = :routeID_from_button_element


-- Delete entity in routesthrustations table
DELETE FROM  `routesthrustations`
WHERE
  `routeID` = :routeID_from_button_element,
  `stationID` = :stationID_from_button_element;
