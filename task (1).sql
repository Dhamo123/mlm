-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2022 at 06:18 PM
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
-- Table structure for table `mlm`
--

CREATE TABLE `mlm` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `refer_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mlm`
--

INSERT INTO `mlm` (`id`, `customer_id`, `refer_id`, `created_at`) VALUES
(1, 1, 0, '2022-06-02 10:41:55'),
(2, 2, 1, '2022-06-02 10:41:55'),
(3, 3, 2, '2022-06-02 16:11:19');

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
(1, 'test', '0', 'erwer', 'test@gmail.com', '2', '34134134', '10', '0', '2022-06-02 16:10:09', '2022-06-02 16:10:47'),
(2, 'test2', '1', 'rerewr', 'test2@gmail.com', '1', '13413', '5', '0', '2022-06-02 16:10:30', '2022-06-02 16:10:47'),
(3, 'test3', '2', 'fdsdf', 'test3@gmail.com', '0', '34134', '0', '0', '2022-06-02 16:10:47', '2022-06-02 16:10:47');

-- --------------------------------------------------------

--
-- Table structure for table `mlm_order`
--

CREATE TABLE `mlm_order` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `refer_id` text NOT NULL,
  `item_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mlm_order`
--

INSERT INTO `mlm_order` (`id`, `customer_id`, `refer_id`, `item_id`, `qty`, `price`, `created_at`) VALUES
(1, 1, '', 12, 2, '50', '2022-06-02 10:51:09'),
(2, 2, '1', 9, 2, '25', '2022-06-02 10:51:09'),
(3, 3, '2-1', 7, 2, '35', '2022-06-02 16:12:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mlm`
--
ALTER TABLE `mlm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mlm_masters`
--
ALTER TABLE `mlm_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mlm_order`
--
ALTER TABLE `mlm_order`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mlm`
--
ALTER TABLE `mlm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mlm_masters`
--
ALTER TABLE `mlm_masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mlm_order`
--
ALTER TABLE `mlm_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
