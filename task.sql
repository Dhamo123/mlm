-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 27, 2022 at 05:38 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `mlm_masters`
--

CREATE TABLE `mlm_masters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mlmid` varchar(255) DEFAULT '0',
  `address` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_of_descendents` varchar(255) DEFAULT '0',
  `contact_no` varchar(255) DEFAULT '00',
  `total_loyalty_point` varchar(255) DEFAULT '0',
  `is_deleted` enum('1','0') DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mlm_masters`
--

INSERT INTO `mlm_masters` (`id`, `name`, `mlmid`, `address`, `email`, `no_of_descendents`, `contact_no`, `total_loyalty_point`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'test', '0', 'sadasd', 'test@gmail.com', '3', '213123', '15', '0', '2022-05-27 14:35:15', '2022-05-27 14:37:12'),
(2, 'test2', '1', 'erwer', 'test2@gmail.com', '2', '12312323', '10', '0', '2022-05-27 14:35:34', '2022-05-27 14:37:12'),
(3, 'test3', '2', 'ewewe', 'test3@gmail.com', '0', '3123', '0', '0', '2022-05-27 14:36:28', '2022-05-27 14:36:28'),
(4, 'test4', '0', 'eweqwe', 'tesst4@gamil.com', '0', '13213', '0', '0', '2022-05-27 14:37:12', '2022-05-27 14:46:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mlm_masters`
--
ALTER TABLE `mlm_masters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mlm_masters`
--
ALTER TABLE `mlm_masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
