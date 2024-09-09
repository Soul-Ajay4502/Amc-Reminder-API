CREATE DATABASE  IF NOT EXISTS `amc_reminder_ucc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `amc_reminder_ucc`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: amc_reminder_ucc
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_details`
--

DROP TABLE IF EXISTS `item_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_details` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `manufacturer` varchar(100) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `purchase_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `item_location` varchar(100) NOT NULL,
  `total_number_of_item` int DEFAULT NULL,
  `item_status` int DEFAULT '0' COMMENT '1 deleted 0 not deleted',
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `manufacturer` (`manufacturer`,`item_name`,`purchase_date`,`expiry_date`,`item_location`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `item_details_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_details`
--

LOCK TABLES `item_details` WRITE;
/*!40000 ALTER TABLE `item_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `notified_user_id` int DEFAULT NULL,
  `notification_date` date NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `item_id` (`item_id`),
  KEY `notified_user_id` (`notified_user_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item_details` (`item_id`),
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`notified_user_id`) REFERENCES `user_details` (`user_id`),
  CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT '2',
  `display_name` varchar(500) NOT NULL,
  `dp_image` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (1,1,'uc admin','image-1725525144288.png','2024-09-05 06:29:54');
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `user_details_with_login`
--

DROP TABLE IF EXISTS `user_details_with_login`;
/*!50001 DROP VIEW IF EXISTS `user_details_with_login`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_details_with_login` AS SELECT 
 1 AS `user_id`,
 1 AS `display_name`,
 1 AS `user_created_at`,
 1 AS `login_id`,
 1 AS `username`,
 1 AS `user_password`,
 1 AS `last_login`,
 1 AS `role_id`,
 1 AS `role_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_login` (
  `login_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `username` varchar(200) NOT NULL,
  `user_password` varchar(755) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `username` (`username`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (1,1,'ucadmin@gmail.com','$2a$12$by1IWot0POqmmBXgn5Wul.bUwt5sRk3rTdpEV/QavZ7D1y.jvfZ0e',NULL);
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notification_assignment`
--

DROP TABLE IF EXISTS `user_notification_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notification_assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `assigned_by` int DEFAULT NULL,
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assignment_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `assigned_by` (`assigned_by`),
  CONSTRAINT `user_notification_assignment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`),
  CONSTRAINT `user_notification_assignment_ibfk_2` FOREIGN KEY (`assigned_by`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification_assignment`
--

LOCK TABLES `user_notification_assignment` WRITE;
/*!40000 ALTER TABLE `user_notification_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_notification_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token_assignment`
--

DROP TABLE IF EXISTS `user_token_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_token_assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `jwt_token` varchar(512) DEFAULT NULL,
  `jwt_refresh_token` varchar(512) DEFAULT NULL,
  `jwt_token_expiry` datetime DEFAULT NULL,
  `jwt_refresh_token_expiry` datetime DEFAULT NULL,
  `fcm_token` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_token_assignment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token_assignment`
--

LOCK TABLES `user_token_assignment` WRITE;
/*!40000 ALTER TABLE `user_token_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_token_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_item_details`
--

DROP TABLE IF EXISTS `view_item_details`;
/*!50001 DROP VIEW IF EXISTS `view_item_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_item_details` AS SELECT 
 1 AS `item_id`,
 1 AS `item_name`,
 1 AS `purchase_date`,
 1 AS `expiry_date`,
 1 AS `item_location`,
 1 AS `total_number_of_item`,
 1 AS `created_by`,
 1 AS `created_at`,
 1 AS `manufacturer`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_notifications`
--

DROP TABLE IF EXISTS `view_notifications`;
/*!50001 DROP VIEW IF EXISTS `view_notifications`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_notifications` AS SELECT 
 1 AS `notification_id`,
 1 AS `item_name`,
 1 AS `notified_user`,
 1 AS `notification_date`,
 1 AS `created_by`,
 1 AS `created_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_assignments`
--

DROP TABLE IF EXISTS `view_user_assignments`;
/*!50001 DROP VIEW IF EXISTS `view_user_assignments`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_assignments` AS SELECT 
 1 AS `assignment_id`,
 1 AS `assigned_user`,
 1 AS `user_id`,
 1 AS `assigned_by`,
 1 AS `assigned_at`,
 1 AS `assignment_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_details`
--

DROP TABLE IF EXISTS `view_user_details`;
/*!50001 DROP VIEW IF EXISTS `view_user_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_details` AS SELECT 
 1 AS `user_id`,
 1 AS `display_name`,
 1 AS `role_name`,
 1 AS `created_at`,
 1 AS `dp_image`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `user_details_with_login`
--

/*!50001 DROP VIEW IF EXISTS `user_details_with_login`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_details_with_login` AS select `ud`.`user_id` AS `user_id`,`ud`.`display_name` AS `display_name`,`ud`.`created_at` AS `user_created_at`,`ul`.`login_id` AS `login_id`,`ul`.`username` AS `username`,`ul`.`user_password` AS `user_password`,`ul`.`last_login` AS `last_login`,`r`.`role_id` AS `role_id`,`r`.`role_name` AS `role_name` from ((`user_details` `ud` join `user_login` `ul` on((`ud`.`user_id` = `ul`.`user_id`))) join `user_roles` `r` on((`r`.`role_id` = `ud`.`role_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_item_details`
--

/*!50001 DROP VIEW IF EXISTS `view_item_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_item_details` AS select `i`.`item_id` AS `item_id`,`i`.`item_name` AS `item_name`,`i`.`purchase_date` AS `purchase_date`,`i`.`expiry_date` AS `expiry_date`,`i`.`item_location` AS `item_location`,`i`.`total_number_of_item` AS `total_number_of_item`,`u`.`display_name` AS `created_by`,`i`.`created_at` AS `created_at`,`i`.`manufacturer` AS `manufacturer` from (`item_details` `i` join `user_details` `u` on((`i`.`created_by` = `u`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_notifications`
--

/*!50001 DROP VIEW IF EXISTS `view_notifications`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_notifications` AS select `n`.`notification_id` AS `notification_id`,`i`.`item_name` AS `item_name`,`u`.`display_name` AS `notified_user`,`n`.`notification_date` AS `notification_date`,`uc`.`display_name` AS `created_by`,`n`.`created_at` AS `created_at` from (((`notifications` `n` join `item_details` `i` on((`n`.`item_id` = `i`.`item_id`))) join `user_details` `u` on((`n`.`notified_user_id` = `u`.`user_id`))) join `user_details` `uc` on((`n`.`created_by` = `uc`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_assignments`
--

/*!50001 DROP VIEW IF EXISTS `view_user_assignments`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_assignments` AS select `ua`.`assignment_id` AS `assignment_id`,`u`.`display_name` AS `assigned_user`,`u`.`user_id` AS `user_id`,`a`.`display_name` AS `assigned_by`,`ua`.`assigned_at` AS `assigned_at`,(case when (`ua`.`user_id` is null) then 'Not Assigned' else 'Assigned' end) AS `assignment_status` from ((`user_details` `u` left join `user_notification_assignment` `ua` on((`ua`.`user_id` = `u`.`user_id`))) left join `user_details` `a` on((`ua`.`assigned_by` = `a`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_details`
--

/*!50001 DROP VIEW IF EXISTS `view_user_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_details` AS select `u`.`user_id` AS `user_id`,`u`.`display_name` AS `display_name`,`r`.`role_name` AS `role_name`,`u`.`created_at` AS `created_at`,`u`.`dp_image` AS `dp_image` from (`user_details` `u` join `user_roles` `r` on((`u`.`role_id` = `r`.`role_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-09 11:58:21
