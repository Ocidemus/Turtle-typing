-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 03:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `turtle`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateIndividualUserTables` ()   BEGIN
    DECLARE user_id_val INT;
    SELECT user_id INTO user_id_val FROM users ORDER BY user_id DESC LIMIT 1;

    set @create_query = concat('create or replace table user_', user_id_val, '(wpm int default 0, accuracy int default 0, rawspeed int default 0, consistency int default 0, time int default 15)');
    PREPARE stmt FROM @create_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    set @create_query = concat('insert into user_', user_id_val, ' values()');
    PREPARE stmt FROM @create_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `announcement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complain`
--

CREATE TABLE `complain` (
  `user_id` int(11) NOT NULL,
  `problem` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `user_id` int(11) NOT NULL,
  `advice` text NOT NULL,
  `rating` enum('1','2','3','4','5') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `username` varchar(30) NOT NULL,
  `wpm` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `rawspeed` int(11) NOT NULL,
  `consistency` int(11) NOT NULL,
  `accuracy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`username`, `wpm`, `time`, `rawspeed`, `consistency`, `accuracy`) VALUES
('shivam', 60, 15, 10, 10, 10),
('abhinav', 50, 60, 10, 10, 10),
('User_1', 70, 15, 10, 10, 10),
('User_2', 65, 15, 10, 10, 10),
('User_3', 80, 15, 10, 10, 10),
('User_20', 75, 15, 10, 10, 10),
('User_21', 85, 60, 10, 10, 10),
('User_22', 72, 60, 10, 10, 10),
('User_23', 78, 60, 10, 10, 10),
('User_40', 90, 60, 10, 10, 10),
('User_41', 68, 15, 13, 89, 96),
('User_42', 73, 15, 12, 92, 94),
('User_60', 79, 15, 15, 88, 98),
('User_61', 87, 60, 16, 87, 99),
('User_62', 71, 60, 13, 90, 96),
('User_80', 82, 60, 14, 89, 98),
('User_81', 76, 15, 12, 90, 96),
('User_82', 69, 15, 15, 89, 97),
('User_100', 74, 15, 13, 90, 96),
('User_101', 84, 60, 16, 87, 99),
('User_102', 76, 60, 13, 90, 96),
('User_120', 88, 60, 15, 88, 97),
('User_161', 81, 15, 13, 90, 97),
('User_162', 73, 15, 14, 89, 97),
('User_170', 78, 15, 14, 89, 97),
('User_171', 85, 60, 15, 87, 98),
('User_172', 77, 60, 14, 90, 96),
('User_180', 89, 60, 14, 88, 98),
('User_121', 79, 15, 13, 89, 97),
('User_122', 72, 15, 12, 92, 94),
('User_140', 77, 15, 14, 89, 97),
('User_141', 86, 60, 16, 87, 99),
('User_142', 75, 60, 14, 90, 96),
('User_160', 90, 60, 15, 88, 98);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification` timestamp NOT NULL DEFAULT current_timestamp(),
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'turtle_admin', 'admin@turtle.com', 'Turtle@123');

-- --------------------------------------------------------

--
-- Table structure for table `user_1`
--

CREATE TABLE `user_1` (
  `wpm` int(11) DEFAULT 0,
  `accuracy` int(11) DEFAULT 0,
  `rawspeed` int(11) DEFAULT 0,
  `consistency` int(11) DEFAULT 0,
  `time` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_1`
--

INSERT INTO `user_1` (`wpm`, `accuracy`, `rawspeed`, `consistency`, `time`) VALUES
(0, 0, 0, 0, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
