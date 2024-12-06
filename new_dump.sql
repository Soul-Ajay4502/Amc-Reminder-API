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
-- Temporary view structure for view `counts`
--

DROP TABLE IF EXISTS `counts`;
/*!50001 DROP VIEW IF EXISTS `counts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `counts` AS SELECT 
 1 AS `item_count`,
 1 AS `due_soon_count`,
 1 AS `unread_notifications_count`*/;
SET character_set_client = @saved_cs_client;

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
  `item_type` varchar(45) DEFAULT NULL,
  `purchase_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `item_location` varchar(100) NOT NULL,
  `total_number_of_item` int DEFAULT NULL,
  `item_status` int DEFAULT '0' COMMENT '1 deleted 0 not deleted',
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email_send_on` date DEFAULT NULL,
  `notification_is_read` varchar(45) DEFAULT '0',
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `manufacturer` (`manufacturer`,`item_name`,`purchase_date`,`expiry_date`,`item_location`),
  KEY `created_by` (`created_by`),
  KEY `idx_email_send_on` (`email_send_on`),
  KEY `idx_notification_is_read` (`notification_is_read`),
  CONSTRAINT `item_details_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_details`
--

LOCK TABLES `item_details` WRITE;
/*!40000 ALTER TABLE `item_details` DISABLE KEYS */;
INSERT INTO `item_details` VALUES (34,'HP','aaaaaaaTprjtneww','Server','2023-09-04','2024-12-13','Office Room 301',1,1,1,'2024-11-25 12:37:18',NULL,'1'),(38,'dd','ff','AirConditioner','2024-10-20','2025-01-31','dd',2,1,1,'2024-11-27 05:47:30',NULL,'0'),(39,'vvvb','cv','Projector','2024-11-30','2025-01-31','ccc',5,1,1,'2024-11-28 04:42:35',NULL,'0'),(40,' c',',fx','System','2024-11-17','2024-12-20','cg',55,0,1,'2024-11-28 04:42:55','2024-12-05','0'),(41,'nnj','bdbs','Laptop','2024-08-18','2024-12-13','dd',95,1,1,'2024-11-28 06:02:09',NULL,'0'),(42,'xxx','ndnd','Projector','2024-09-29','2024-12-13','ddd',555,0,1,'2024-11-28 06:02:25','2024-11-28','1'),(43,' sbs',' sbs','System','2024-10-23','2024-12-13','ddd',94,0,1,'2024-11-28 06:02:59','2024-11-28','0'),(44,'zzzzz','hdhsh','Server','2024-10-22','2024-12-13','zz',88,0,1,'2024-11-28 06:03:17','2024-11-28','0'),(45,'z. z','bsbs','System','2024-11-28','2024-12-13','vsvs',14,0,1,'2024-11-28 06:03:34','2024-11-28','0'),(46,'vzbz','vzbs','Server','2024-11-28','2024-12-13','vzvz',9797,0,1,'2024-11-28 06:03:49','2024-11-28','0'),(47,'zbbz','vzbzbz','Others','2024-10-31','2024-12-13','zvbz',6767,0,1,'2024-11-28 06:04:26','2024-11-28','1'),(48,'gsvs','sbbzbs','System','2024-11-28','2024-12-13','z. z',64,0,1,'2024-11-28 06:04:47','2024-11-28','0'),(49,'vzvz','bsbs','Laptop','2024-11-28','2024-12-13','bsbz',979,0,1,'2024-11-28 06:05:04','2024-11-28','0'),(50,'vzvz','gzgs','AirConditioner','2024-11-28','2024-12-13','zvbz',4884,0,1,'2024-11-28 06:05:32','2024-11-28','0'),(51,'zbbz','hshsh','System','2024-11-28','2024-12-13','zbbz',9494,0,1,'2024-11-28 06:05:46','2024-11-28','0'),(52,'vsvz','gsts','Projector','2024-11-28','2024-12-13','zvbz',9494,0,1,'2024-11-28 06:06:12','2024-11-28','0'),(53,'zvsvz','zvvz','Server','2024-11-28','2024-12-13','bsbs',44,0,1,'2024-11-28 06:06:30','2024-11-28','0'),(54,'sbbs','vsvs','Laptop','2024-10-22','2024-12-13','ybzbs',9494,0,1,'2024-11-28 06:06:52','2024-11-28','0'),(55,'Voltas','Ac','Laptop','2024-11-17','2024-12-19','Lab',12,0,1,'2024-12-05 10:59:39',NULL,'0');
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
  `allow_notification` varchar(45) NOT NULL DEFAULT '0',
  `fcm_token` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (1,1,'uc admin','image-1732775335747.jpg','1','cR5fqOVlQ0qS__edOZ8r0T:APA91bHqQk4EQFNq6Vuaw954c1Q9W0V2GARq77Gxkt6bqUWMD5RF-wII9GayykPE77_qKspG8C-4toYcmqubyV2i8F_ntue44jXUGE9jINM_0xf1go96ZpU','2024-09-05 06:29:54'),(2,2,'Nishanth','image-1731932498582.jpg','1',NULL,'2024-11-11 06:36:04'),(3,2,'Rijo',NULL,'1',NULL,'2024-11-14 05:27:43'),(16,2,'joel',NULL,'1',NULL,'2024-11-22 04:29:13');
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
 1 AS `dp_image`,
 1 AS `login_id`,
 1 AS `username`,
 1 AS `user_password`,
 1 AS `last_login`,
 1 AS `role_id`,
 1 AS `role_name`,
 1 AS `allow_notification`,
 1 AS `fcm_token`*/;
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
  `forgot_otp` varchar(45) DEFAULT NULL,
  `expires_at` varchar(95) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `username` (`username`),
  KEY `user_id` (`user_id`),
  KEY `idx_username` (`username`),
  CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (1,1,'joelpjacob3@gmail.com','$2a$12$X.a2aT970B6wy4Eqptj7/uHtUmiHK8UiIOFJxaNMcwfSi/xK.6faG',NULL,'171827','1731480853351'),(2,2,'ucasst@gmail.com','$2a$12$by1IWot0POqmmBXgn5Wul.bUwt5sRk3rTdpEV/QavZ7D1y.jvfZ0e',NULL,NULL,NULL),(3,3,'arajay0@gmail.com','$2a$12$TjL5IRFtLLVO9azU.K5yX.Amm0za1zC3KrW8yeefPvtZI5yOtqc8C',NULL,NULL,NULL),(16,16,'joel@gmail.com','$2a$12$5K6JxErDIuVPDsr2gxLxVeoPTDCo20a0uyeq.YdItxM2R5wDk1/Lq',NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification_assignment`
--

LOCK TABLES `user_notification_assignment` WRITE;
/*!40000 ALTER TABLE `user_notification_assignment` DISABLE KEYS */;
INSERT INTO `user_notification_assignment` VALUES (1,2,1,'2024-11-12 11:37:52');
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
 1 AS `dp_image`,
 1 AS `allow_notification`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `counts`
--

/*!50001 DROP VIEW IF EXISTS `counts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `counts` AS select (select count(0) from `item_details` where (`item_details`.`item_status` = 0)) AS `item_count`,(select count(0) from `item_details` where ((`item_details`.`item_status` = 0) and ((to_days(`item_details`.`expiry_date`) - to_days(curdate())) between 0 and 15))) AS `due_soon_count`,(select count(0) from `item_details` where ((`item_details`.`notification_is_read` = 0) and (`item_details`.`email_send_on` is not null))) AS `unread_notifications_count` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

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
/*!50001 VIEW `user_details_with_login` AS select `ud`.`user_id` AS `user_id`,`ud`.`display_name` AS `display_name`,`ud`.`created_at` AS `user_created_at`,`ud`.`dp_image` AS `dp_image`,`ul`.`login_id` AS `login_id`,`ul`.`username` AS `username`,`ul`.`user_password` AS `user_password`,`ul`.`last_login` AS `last_login`,`r`.`role_id` AS `role_id`,`r`.`role_name` AS `role_name`,`ud`.`allow_notification` AS `allow_notification`,`ud`.`fcm_token` AS `fcm_token` from ((`user_details` `ud` join `user_login` `ul` on((`ud`.`user_id` = `ul`.`user_id`))) join `user_roles` `r` on((`r`.`role_id` = `ud`.`role_id`))) */;
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
/*!50001 VIEW `view_user_details` AS select `u`.`user_id` AS `user_id`,`u`.`display_name` AS `display_name`,`r`.`role_name` AS `role_name`,`u`.`created_at` AS `created_at`,`u`.`dp_image` AS `dp_image`,`u`.`allow_notification` AS `allow_notification` from (`user_details` `u` join `user_roles` `r` on((`u`.`role_id` = `r`.`role_id`))) */;
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

-- Dump completed on 2024-12-06 12:34:41
