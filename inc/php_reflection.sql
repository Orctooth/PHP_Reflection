-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2021 at 08:52 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `php_reflection`
--

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` int(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `time_stamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enquiries`
--

INSERT INTO `enquiries` (`name`, `email`, `telephone`, `subject`, `message`, `time_stamp`) VALUES
('sdkjfhsdf', 'dfghdfg@sjdfhksdf', 0, 'sjdhghjdf', 'sdhjfgjhsdf', '2021-07-20 16:51:05'),
('sdfkjhskdjf', 'djsfkjdfh@djshfjhgdf.com', 87368723, 'dsfjhkkjdf', 'kjsdhfkjsdhf', '2021-07-20 16:56:33'),
('dkfhdsjfhkjdsfh', 'hjsdfjhdgf@dfjhjkdfh.com', 2147483647, 'dfsdkhjfkjhsdf', 'sdhfhjgsjhdgfjhsdf', '2021-07-20 23:51:25'),
('lkdsfjkldsfjkkldf', 'gsdfjh@dlsfkjdlf.jkvfn', 39834983, 'sdfbsjhdf', 'djfkhsdfhjkdhf', '2021-07-20 23:53:17'),
('jkhkjhjkdf', 'sdfsdlkf@jkfsdjkfhksd.com', 3234, 'sbsdkfj', 'sdjfkkdhjf', '2021-07-20 23:54:04');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_posted` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `colour` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `description`, `image`, `avatar`, `date_posted`, `author`, `tag`, `colour`) VALUES
(1, 'Matt Achieves the Long Service Award', 'Netmatters would like to take this time to congratulate our Senior Technical Support, Matt...\r\n', 'img/matt-IE.jpg', 'img/netmatters-ltd-IE.jpg', '9th March 2021', 'Netmatters Ltd', 'NEWS', '#926fb1'),
(2, 'Netmatters is carbon neutral!', 'As a business, Netmatters pledged that 2021 would be the year that we became carbon neutral....\r\n', 'img/carbon-jpeg.jpg', 'img/netmatters-ltd-IE.jpg', '2nd March 2021', 'Netmatters Ltd', 'NEWS', '#926fb1'),
(3, 'Faizel Achieves the Long Service Award', 'Netmatters would like to take this time to congratulate our Commercial Head of Web, Faizel De...\r\n', 'img/faizel-IE.jpg', 'img/netmatters-ltd-IE.jpg', '26th February 2021', 'Netmatters Ltd', 'NEWS', '#926fb1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
