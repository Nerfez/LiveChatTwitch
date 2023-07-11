-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: -----------------------------------
-- Generation Time: Jul 11, 2023 at 09:19 AM
-- Server version: 10.6.11-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `---------------`
--

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE `Image` (
  `url` text NOT NULL,
  `ImageTime` text NOT NULL,
  `ImageTexte` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Image`
--

INSERT INTO `Image` (`url`, `ImageTime`, `ImageTexte`) VALUES
('', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

CREATE TABLE `Video` (
  `VideoURL` text NOT NULL,
  `VideoTexte` text NOT NULL,
  `VideoTime` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Video`
--

INSERT INTO `Video` (`VideoURL`, `VideoTexte`, `VideoTime`) VALUES
('', '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
