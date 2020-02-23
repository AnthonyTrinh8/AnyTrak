-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Feb 22, 2020 at 05:33 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_trinhan`
--

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
CREATE TABLE `stations` (
  `stationID` int(11) NOT NULL,
  `stationname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zipcode` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`stationID`, `stationname`, `address`, `state`, `city`, `zipcode`) VALUES
(1, 'Eclair', '6000 NE 80th Ave', 'Portland', 'Oregon', 97200),
(2, 'Santara', '600 SW 10th St', 'Corvallis', 'Oregon', 97330),
(3, 'Lightway', '2124 E 12th Ave', 'Sandy', 'Oregon', 97120);

-- --------------------------------------------------------

--
-- Table structure for table `trains`
--

DROP TABLE IF EXISTS `trains`;
CREATE TABLE `trains` (
  `trainID` int(11) NOT NULL,
  `stationID` int(11) DEFAULT NULL,
  `model` varchar(255) NOT NULL,
  `cost` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `conductorfirstname` varchar(255) NOT NULL,
  `conductorlastname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trains`
--

INSERT INTO `trains` (`trainID`, `stationID`, `model`, `cost`, `capacity`, `conductorfirstname`, `conductorlastname`) VALUES
(1, 1, 'Steinway GT Series', 150000, 250, 'John', 'Harringway'),
(2, 2, 'LightRail', 500000, 500, 'Emma', 'Clarkson'),
(3, 3, 'SpeedWay', 100000, 300, 'Henry', 'Marksville');

-- ------------------------------------------------------

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes` (
  `routeID` int(11) NOT NULL,
  `trainID` int(11) DEFAULT NULL,
  `routename` varchar(255) NOT NULL,
  `ticketprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`routeID`, `trainID`, `routename`, `ticketprice`) VALUES
(1, 1, 'Acella Express', 200),
(2, 2, 'The Cascades', 400),
(3, 3, 'Coastal Trip', 500);

-- --------------------------------------------------------

--
-- Table structure for table `routesthrustations`
--

DROP TABLE IF EXISTS `routesthrustations`;
CREATE TABLE `routesthrustations` (
  `routesthrustationsID` int(11) NOT NULL,
  `routeID` int(11) DEFAULT NULL,
  `stationID` int(11) DEFAULT NULL,
  `travelduration` int(11) DEFAULT NULL,
  `milestraveled` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `routesthrustations`
--

INSERT INTO `routesthrustations` (`routesthrustationsID`, `routeID`, `stationID`, `travelduration`, `milestraveled`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, 500, 300),
(3, 1, 3, 502, 105),
(4, 2, 2, NULL, NULL),
(5, 2, 1, 302, 321),
(6, 2, 3, 324, 231),
(7, 3, 3, NULL, NULL),
(8, 3, 1, 502, 231);



--
-- Indexes for dumped tables
--

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`routeID`),
  ADD UNIQUE KEY `routename` (`routename`),
  ADD KEY `trainID` (`trainID`);

--
-- Indexes for table `routesthrustations`
--
ALTER TABLE `routesthrustations`
  ADD PRIMARY KEY (`routesthrustationsID`),
  ADD KEY `routeID` (`routeID`),
  ADD KEY `stationID` (`stationID`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`stationID`),
  ADD UNIQUE KEY `stationname` (`stationname`);

--
-- Indexes for table `trains`
--
ALTER TABLE `trains`
  ADD PRIMARY KEY (`trainID`),
  ADD KEY `stationID` (`stationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `routeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `routesthrustations`
--
ALTER TABLE `routesthrustations`
  MODIFY `routesthrustationsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `stationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trains`
--
ALTER TABLE `trains`
  MODIFY `trainID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`trainID`) REFERENCES `trains` (`trainID`);

--
-- Constraints for table `routesthrustations`
--
ALTER TABLE `routesthrustations`
  ADD CONSTRAINT `routesthrustations_ibfk_1` FOREIGN KEY (`routeID`) REFERENCES `routes` (`routeID`) ON DELETE CASCADE,
  ADD CONSTRAINT `routesthrustations_ibfk_2` FOREIGN KEY (`stationID`) REFERENCES `stations` (`stationID`) ON DELETE CASCADE;

--
-- Constraints for table `trains`
--
ALTER TABLE `trains`
  ADD CONSTRAINT `trains_ibfk_1` FOREIGN KEY (`stationID`) REFERENCES `stations` (`stationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
