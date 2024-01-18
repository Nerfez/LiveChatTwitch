-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: ****************
-- Generation Time: Nov 08, 2023 at 12:28 PM
-- Server version: 10.6.14-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `********`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `url` text NOT NULL,
  `Time` text NOT NULL,
  `Texte` text NOT NULL,
  `Width` text NOT NULL,
  `Height` text NOT NULL,
  `Audio` text NOT NULL,
  `username` text NOT NULL,
  `avatar` text NOT NULL,
  `CreatedTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`url`, `Time`, `Texte`, `Width`, `Height`, `Audio`, `username`, `avatar`) VALUES
('', '0', '', '1920', '1080', '', '', '');
COMMIT;
