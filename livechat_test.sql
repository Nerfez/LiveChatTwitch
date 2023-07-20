-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 20 juil. 2023 à 07:36
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `livechat_test`
--

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `url` text COLLATE utf8mb4_general_ci NOT NULL,
  `ImageTime` text COLLATE utf8mb4_general_ci NOT NULL,
  `ImageTexte` text COLLATE utf8mb4_general_ci NOT NULL,
  `Width` text COLLATE utf8mb4_general_ci NOT NULL,
  `Height` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`url`, `ImageTime`, `ImageTexte`, `Width`, `Height`) VALUES
('', '4000', ' ', '820', '860');

-- --------------------------------------------------------

--
-- Structure de la table `video`
--

DROP TABLE IF EXISTS `video`;
CREATE TABLE IF NOT EXISTS `video` (
  `VideoURL` text COLLATE utf8mb4_general_ci NOT NULL,
  `VideoTexte` text COLLATE utf8mb4_general_ci NOT NULL,
  `VideoTime` text COLLATE utf8mb4_general_ci NOT NULL,
  `Height` text COLLATE utf8mb4_general_ci NOT NULL,
  `Width` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `video`
--

INSERT INTO `video` (`VideoURL`, `VideoTexte`, `VideoTime`, `Height`, `Width`) VALUES
('', ' ', '6000', '640', '360');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
