-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Mar 19, 2020 at 04:27 AM
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
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `diagnostic`
--

INSERT INTO `diagnostic` (`id`, `text`) VALUES
(1, 'MySQL is Working!');

-- --------------------------------------------------------

--
-- Table structure for table `Routes`
--

DROP TABLE IF EXISTS `Routes`;
CREATE TABLE `Routes` (
  `routeID` int(11) NOT NULL,
  `trainID` int(11) NOT NULL,
  `routename` varchar(255) NOT NULL,
  `ticketprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Routes`
--

INSERT INTO `Routes` (`routeID`, `trainID`, `routename`, `ticketprice`) VALUES
(1, 1, 'Coastal Waters', 25),
(2, 4, 'Downtown Dive', 59),
(3, 6, 'Coastal Starlight', 88),
(4, 9, 'Acela Express', 15),
(5, 7, 'Maple Leaf', 42),
(6, 6, 'Lake Shore Limited', 125);

-- --------------------------------------------------------

--
-- Table structure for table `RoutesThruStations`
--

DROP TABLE IF EXISTS `RoutesThruStations`;
CREATE TABLE `RoutesThruStations` (
  `routesthrustationsID` int(11) NOT NULL,
  `routeID` int(11) NOT NULL,
  `stationID` int(11) NOT NULL,
  `travelduration` int(11) NOT NULL,
  `milestraveled` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RoutesThruStations`
--

INSERT INTO `RoutesThruStations` (`routesthrustationsID`, `routeID`, `stationID`, `travelduration`, `milestraveled`) VALUES
(3, 2, 4, 0, 0),
(4, 1, 1, 0, 0),
(5, 1, 4, 500, 350),
(6, 2, 4, 500, 325),
(7, 3, 2, 0, 0),
(8, 3, 4, 305, 242),
(9, 3, 2, 300, 250),
(10, 4, 2, 0, 0),
(11, 1, 4, 125, 60),
(12, 4, 4, 300, 253),
(14, 5, 1, 0, 0),
(15, 6, 4, 0, 0),
(16, 6, 2, 353, 323);

-- --------------------------------------------------------

--
-- Table structure for table `Stations`
--

DROP TABLE IF EXISTS `Stations`;
CREATE TABLE `Stations` (
  `stationID` int(11) NOT NULL,
  `stationname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zipcode` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Stations`
--

INSERT INTO `Stations` (`stationID`, `stationname`, `address`, `state`, `city`, `zipcode`) VALUES
(1, 'Boston Field', '7238 Harrison Street', 'NJ', 'Parsippany', 7054),
(2, 'Calico', '7248 High Street', 'CA', 'Atwater', 95301),
(4, 'Coastal Point', '449 Annadale Ave', 'GA', 'Woodstock', 30188);

-- --------------------------------------------------------

--
-- Table structure for table `Trains`
--

DROP TABLE IF EXISTS `Trains`;
CREATE TABLE `Trains` (
  `trainID` int(11) NOT NULL,
  `stationID` int(11) DEFAULT NULL,
  `model` varchar(255) NOT NULL,
  `cost` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `conductorfirstname` varchar(255) NOT NULL,
  `conductorlastname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Trains`
--

INSERT INTO `Trains` (`trainID`, `stationID`, `model`, `cost`, `capacity`, `conductorfirstname`, `conductorlastname`) VALUES
(1, 1, 'SpeedRail 255', 250000, 300, 'Mark', 'Stevens'),
(2, NULL, 'SpeedRail 1080', 850579, 150, 'John', 'Rogers'),
(3, 4, 'OnTrack V1', 1000000, 100, 'Hawley', 'Marks'),
(4, 2, 'The Bullet', 25030424, 175, 'Ben', 'Simmons'),
(5, 2, 'Speedster', 1500000, 250, 'Stan', 'Smith'),
(6, 1, 'Sportster', 2000000, 250, 'Tony', 'Hawk'),
(7, 2, 'Sportster', 2500000, 500000, 'Mark', 'Adams'),
(8, 1, 'Trackster', 5000000, 400, 'Tom', 'Wilder'),
(9, 1, 'Roadster V2', 2500000, 500, 'John', 'Rogers');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diagnostic`
--
ALTER TABLE `diagnostic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Routes`
--
ALTER TABLE `Routes`
  ADD PRIMARY KEY (`routeID`),
  ADD UNIQUE KEY `routename` (`routename`),
  ADD KEY `trainID` (`trainID`);

--
-- Indexes for table `RoutesThruStations`
--
ALTER TABLE `RoutesThruStations`
  ADD PRIMARY KEY (`routesthrustationsID`),
  ADD KEY `routeID` (`routeID`),
  ADD KEY `stationID` (`stationID`);

--
-- Indexes for table `Stations`
--
ALTER TABLE `Stations`
  ADD PRIMARY KEY (`stationID`),
  ADD UNIQUE KEY `stationname` (`stationname`);

--
-- Indexes for table `Trains`
--
ALTER TABLE `Trains`
  ADD PRIMARY KEY (`trainID`),
  ADD KEY `stationID` (`stationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diagnostic`
--
ALTER TABLE `diagnostic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Routes`
--
ALTER TABLE `Routes`
  MODIFY `routeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `RoutesThruStations`
--
ALTER TABLE `RoutesThruStations`
  MODIFY `routesthrustationsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Stations`
--
ALTER TABLE `Stations`
  MODIFY `stationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Trains`
--
ALTER TABLE `Trains`
  MODIFY `trainID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Routes`
--
ALTER TABLE `Routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`trainID`) REFERENCES `Trains` (`trainID`);

--
-- Constraints for table `RoutesThruStations`
--
ALTER TABLE `RoutesThruStations`
  ADD CONSTRAINT `RoutesThruStations_ibfk_1` FOREIGN KEY (`routeID`) REFERENCES `Routes` (`routeID`) ON DELETE CASCADE,
  ADD CONSTRAINT `RoutesThruStations_ibfk_2` FOREIGN KEY (`stationID`) REFERENCES `Stations` (`stationID`) ON DELETE CASCADE;

--
-- Constraints for table `Trains`
--
ALTER TABLE `Trains`
  ADD CONSTRAINT `Trains_ibfk_1` FOREIGN KEY (`stationID`) REFERENCES `Stations` (`stationID`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
