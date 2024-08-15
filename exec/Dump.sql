-- MySQL dump 10.13  Distrib 9.0.1, for Linux (x86_64)
--
-- Host: localhost    Database: inmind
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKc4r2qhfk9yffjhqv4i2nlvq9l` (`user_idx`),
  CONSTRAINT `FKc4r2qhfk9yffjhqv4i2nlvq9l` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_info`
--

DROP TABLE IF EXISTS `chat_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_info` (
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `post_idx` bigint NOT NULL,
  `room_idx` bigint NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK3h6d3v3rwogpp2w1pqul6dmx7` (`room_idx`),
  KEY `FKaevb2w0s9exnmireqe921hud5` (`post_idx`),
  CONSTRAINT `FK3h6d3v3rwogpp2w1pqul6dmx7` FOREIGN KEY (`room_idx`) REFERENCES `chat_room` (`idx`),
  CONSTRAINT `FKaevb2w0s9exnmireqe921hud5` FOREIGN KEY (`post_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_info`
--

LOCK TABLES `chat_info` WRITE;
/*!40000 ALTER TABLE `chat_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `co_idx` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `user_idx` bigint NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKe3e7yae8isfivq7ws2u58ydj7` (`co_idx`),
  KEY `FKky7sj4x75b4ucxy2jiil1knpo` (`user_idx`),
  CONSTRAINT `FKe3e7yae8isfivq7ws2u58ydj7` FOREIGN KEY (`co_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `FKky7sj4x75b4ucxy2jiil1knpo` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_info`
--

DROP TABLE IF EXISTS `child_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child_info` (
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK8rneusimh4okwvqvtrfw3odby` (`user_idx`),
  CONSTRAINT `FK8rneusimh4okwvqvtrfw3odby` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_info`
--

LOCK TABLES `child_info` WRITE;
/*!40000 ALTER TABLE `child_info` DISABLE KEYS */;
INSERT INTO `child_info` VALUES ('2024-08-12 22:26:03.101554',1,'2024-08-12 22:26:03.101554',1,'2013-03-15','김서윤'),('2024-08-12 22:26:08.081758',2,'2024-08-12 22:26:08.081758',1,'2014-05-21','김지우'),('2024-08-12 22:26:11.806506',3,'2024-08-12 22:26:11.806506',2,'2013-02-11','이준호'),('2024-08-12 22:26:15.082544',4,'2024-08-12 22:26:15.082544',3,'2014-08-30','박하은'),('2024-08-12 22:26:18.046104',5,'2024-08-12 22:26:18.046104',4,'2015-01-29','홍민재'),('2024-08-12 22:26:21.220844',6,'2024-08-12 22:26:21.220844',5,'2016-07-19','왕서진'),('2024-08-12 22:26:24.437429',7,'2024-08-12 22:26:24.437429',6,'2017-04-03','오윤아'),('2024-08-12 22:26:27.832025',8,'2024-08-12 22:26:27.832025',7,'2013-12-12','유다은'),('2024-08-12 22:26:30.978719',9,'2024-08-12 22:26:30.978719',7,'2018-09-05','유시후'),('2024-08-12 22:26:38.283509',10,'2024-08-12 22:26:38.283509',8,'2019-06-14','조민규'),('2024-08-12 22:26:46.597482',11,'2024-08-12 22:26:46.597482',9,'2015-10-26','태지훈'),('2024-08-12 22:26:49.704198',12,'2024-08-12 22:26:49.704198',10,'2014-11-08','강은별'),('2024-08-16 04:31:38.734977',13,'2024-08-16 04:31:38.734977',23,'1998-08-13','하운주니어'),('2024-08-16 04:33:28.576532',14,'2024-08-16 04:33:28.576532',26,'2017-03-27','김현수'),('2024-08-16 04:35:18.248057',15,'2024-08-16 04:35:18.248057',27,'1998-08-13','하운주니어1'),('2024-08-16 04:36:16.811607',16,'2024-08-16 04:36:16.811607',25,'2019-12-25','김성원JR'),('2024-08-16 04:36:40.597661',17,'2024-08-16 04:36:40.597661',27,'1998-08-13','하운주니어2'),('2024-08-16 04:40:27.343716',18,'2024-08-16 04:40:27.343716',26,'2020-02-02','황민수');
/*!40000 ALTER TABLE `child_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_time`
--

DROP TABLE IF EXISTS `default_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `default_time` (
  `end_time` time(6) NOT NULL,
  `start_time` time(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `UKhwwusvfgk0dhgrjplxmq9wef3` (`user_idx`),
  CONSTRAINT `FKt7rltc8ebh2xdaccomhchac1c` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_time`
--

LOCK TABLES `default_time` WRITE;
/*!40000 ALTER TABLE `default_time` DISABLE KEYS */;
INSERT INTO `default_time` VALUES ('00:00:00.000000','00:00:00.000000','2024-08-12 21:52:23.457040',1,'2024-08-12 21:52:23.457040',11),('00:00:00.000000','00:00:00.000000','2024-08-12 21:54:20.625155',2,'2024-08-12 21:54:20.625155',12),('00:00:00.000000','18:00:00.000000','2024-08-12 21:55:18.136242',3,'2024-08-16 04:29:21.488348',13),('00:00:00.000000','00:00:00.000000','2024-08-12 21:55:42.859579',4,'2024-08-12 21:55:42.859579',14),('00:00:00.000000','00:00:00.000000','2024-08-12 22:04:15.117616',5,'2024-08-12 22:04:15.117616',15),('00:00:00.000000','00:00:00.000000','2024-08-12 22:04:35.714819',6,'2024-08-12 22:04:35.714819',16),('00:00:00.000000','00:00:00.000000','2024-08-12 22:04:58.084484',7,'2024-08-12 22:04:58.084484',17),('00:00:00.000000','00:00:00.000000','2024-08-12 22:05:56.676395',8,'2024-08-12 22:05:56.676395',18),('00:00:00.000000','00:00:00.000000','2024-08-12 22:06:18.894196',9,'2024-08-12 22:06:18.894196',19),('00:00:00.000000','00:00:00.000000','2024-08-12 22:06:48.656627',10,'2024-08-12 22:06:48.656627',20),('00:00:00.000000','00:00:00.000000','2024-08-12 22:07:55.018274',11,'2024-08-12 22:07:55.018274',21),('00:00:00.000000','00:00:00.000000','2024-08-12 22:08:21.367446',12,'2024-08-12 22:08:21.367446',22),('00:00:00.000000','00:00:00.000000','2024-08-13 22:36:19.034421',13,'2024-08-13 22:36:19.034421',24);
/*!40000 ALTER TABLE `default_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `date` date NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `re_idx` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK187y78twc85jgnlg4wbtcsxwo` (`re_idx`),
  CONSTRAINT `FKcrtdi1grwcbvqry2cue5juva6` FOREIGN KEY (`re_idx`) REFERENCES `reserve_info` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `scheduled_date` date NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  `alert_time` varchar(255) NOT NULL,
  `is_read` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `scheduled_time` varchar(255) NOT NULL,
  `notification_type` enum('RESERVATION_CONFIRMED','RESERVATION_REMINDER','RESERVATION_START') NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKsjar5d7od3kix1510uiw6ve8k` (`user_idx`),
  CONSTRAINT `FKsjar5d7od3kix1510uiw6ve8k` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('2024-08-16','2024-08-16 04:26:37.047326',1,'2024-08-16 04:26:37.047326',3,'23:30','N','상담 30분 전입니다.','00:00','RESERVATION_REMINDER'),('2024-08-16','2024-08-16 04:26:37.049115',2,'2024-08-16 04:26:37.049115',3,'00:00','N','상담이 시작되었습니다.','00:00','RESERVATION_START'),('2024-08-16','2024-08-16 04:26:37.051699',3,'2024-08-16 04:26:37.051699',11,'00:00','N','예약이 접수되었습니다.','00:00','RESERVATION_CONFIRMED'),('2024-08-16','2024-08-16 04:31:57.156894',4,'2024-08-16 04:31:57.156894',3,'10:30','N','상담 30분 전입니다.','11:00','RESERVATION_REMINDER'),('2024-08-16','2024-08-16 04:31:57.157913',5,'2024-08-16 04:31:57.157913',3,'11:00','N','상담이 시작되었습니다.','11:00','RESERVATION_START'),('2024-08-16','2024-08-16 04:31:57.159224',6,'2024-08-16 04:31:57.159224',13,'11:00','N','예약이 접수되었습니다.','11:00','RESERVATION_CONFIRMED'),('2024-08-16','2024-08-16 04:33:35.507467',7,'2024-08-16 04:33:35.507467',2,'09:30','N','상담 30분 전입니다.','10:00','RESERVATION_REMINDER'),('2024-08-16','2024-08-16 04:33:35.511384',8,'2024-08-16 04:33:35.511384',2,'10:00','N','상담이 시작되었습니다.','10:00','RESERVATION_START'),('2024-08-16','2024-08-16 04:33:35.513008',9,'2024-08-16 04:33:35.513008',13,'10:00','N','예약이 접수되었습니다.','10:00','RESERVATION_CONFIRMED'),('2024-08-16','2024-08-16 04:33:41.575594',10,'2024-08-16 04:33:41.575594',23,'08:30','N','상담 30분 전입니다.','09:00','RESERVATION_REMINDER'),('2024-08-16','2024-08-16 04:33:41.576529',11,'2024-08-16 04:33:41.576529',23,'09:00','N','상담이 시작되었습니다.','09:00','RESERVATION_START'),('2024-08-16','2024-08-16 04:33:41.577495',12,'2024-08-16 04:33:41.577495',13,'09:00','N','예약이 접수되었습니다.','09:00','RESERVATION_CONFIRMED'),('2024-08-19','2024-08-16 04:34:28.247858',13,'2024-08-16 04:34:28.247858',23,'23:30','N','상담 30분 전입니다.','00:00','RESERVATION_REMINDER'),('2024-08-19','2024-08-16 04:34:28.249190',14,'2024-08-16 04:34:28.249190',23,'00:00','N','상담이 시작되었습니다.','00:00','RESERVATION_START'),('2024-08-19','2024-08-16 04:34:28.250090',15,'2024-08-16 04:34:28.250090',24,'00:00','N','예약이 접수되었습니다.','00:00','RESERVATION_CONFIRMED'),('2024-08-23','2024-08-16 04:34:51.849279',16,'2024-08-16 04:34:51.849279',26,'11:30','N','상담 30분 전입니다.','12:00','RESERVATION_REMINDER'),('2024-08-23','2024-08-16 04:34:51.850474',17,'2024-08-16 04:34:51.850474',26,'12:00','N','상담이 시작되었습니다.','12:00','RESERVATION_START'),('2024-08-23','2024-08-16 04:34:51.851378',18,'2024-08-16 04:34:51.851378',13,'12:00','N','예약이 접수되었습니다.','12:00','RESERVATION_CONFIRMED'),('2024-08-16','2024-08-16 04:35:03.607272',19,'2024-08-16 04:35:03.607272',4,'11:30','N','상담 30분 전입니다.','12:00','RESERVATION_REMINDER'),('2024-08-16','2024-08-16 04:35:03.608680',20,'2024-08-16 04:35:03.608680',4,'12:00','N','상담이 시작되었습니다.','12:00','RESERVATION_START'),('2024-08-16','2024-08-16 04:35:03.609614',21,'2024-08-16 04:35:03.609614',13,'12:00','N','예약이 접수되었습니다.','12:00','RESERVATION_CONFIRMED'),('2024-08-16','2024-08-16 04:37:49.243058',22,'2024-08-16 04:37:49.243058',25,'12:30','N','상담 30분 전입니다.','13:00','RESERVATION_REMINDER'),('2024-08-16','2024-08-16 04:37:49.244143',23,'2024-08-16 04:37:49.244143',25,'13:00','N','상담이 시작되었습니다.','13:00','RESERVATION_START'),('2024-08-16','2024-08-16 04:37:49.245454',24,'2024-08-16 04:37:49.245454',13,'13:00','N','예약이 접수되었습니다.','13:00','RESERVATION_CONFIRMED'),('2024-08-21','2024-08-16 04:37:58.026489',25,'2024-08-16 04:37:58.026489',7,'10:30','N','상담 30분 전입니다.','11:00','RESERVATION_REMINDER'),('2024-08-21','2024-08-16 04:37:58.027438',26,'2024-08-16 04:37:58.027438',7,'11:00','N','상담이 시작되었습니다.','11:00','RESERVATION_START'),('2024-08-21','2024-08-16 04:37:58.028885',27,'2024-08-16 04:37:58.028885',13,'11:00','N','예약이 접수되었습니다.','11:00','RESERVATION_CONFIRMED'),('2024-08-20','2024-08-16 04:38:52.485470',28,'2024-08-16 04:38:52.485470',7,'13:30','N','상담 30분 전입니다.','14:00','RESERVATION_REMINDER'),('2024-08-20','2024-08-16 04:38:52.487529',29,'2024-08-16 04:38:52.487529',7,'14:00','N','상담이 시작되었습니다.','14:00','RESERVATION_START'),('2024-08-20','2024-08-16 04:38:52.488331',30,'2024-08-16 04:38:52.488331',13,'14:00','N','예약이 접수되었습니다.','14:00','RESERVATION_CONFIRMED'),('2024-08-26','2024-08-16 04:39:38.302053',31,'2024-08-16 04:39:38.302053',26,'09:30','N','상담 30분 전입니다.','10:00','RESERVATION_REMINDER'),('2024-08-26','2024-08-16 04:39:38.303096',32,'2024-08-16 04:39:38.303096',26,'10:00','N','상담이 시작되었습니다.','10:00','RESERVATION_START'),('2024-08-26','2024-08-16 04:39:38.303926',33,'2024-08-16 04:39:38.303926',13,'10:00','N','예약이 접수되었습니다.','10:00','RESERVATION_CONFIRMED'),('2024-08-29','2024-08-16 04:40:59.375523',34,'2024-08-16 04:40:59.375523',26,'12:30','N','상담 30분 전입니다.','13:00','RESERVATION_REMINDER'),('2024-08-29','2024-08-16 04:40:59.377093',35,'2024-08-16 04:40:59.377093',26,'13:00','N','상담이 시작되었습니다.','13:00','RESERVATION_START'),('2024-08-29','2024-08-16 04:40:59.378616',36,'2024-08-16 04:40:59.378616',13,'13:00','N','예약이 접수되었습니다.','13:00','RESERVATION_CONFIRMED');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `addr` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES ('2024-08-12 21:42:49.147189',1,'2024-08-12 21:42:49.147189','대전 서구 계룡로367번길 110 2층 대전심리상담센터','대전심리상담센터','042-826-8474'),('2024-08-12 21:43:14.691961',2,'2024-08-12 21:43:14.691961','대전 중구 보문로 310 대제빌딩 305호','그림마당상담센터','010-8188-0670'),('2024-08-12 21:43:51.386981',3,'2024-08-12 21:43:51.386981','대전 서구 배재로233번길 95 SJ빌 101호','마음돌봄심리상담센터','042-525-1130'),('2024-08-12 21:44:26.412692',4,'2024-08-12 21:44:26.412692','대전 서구 둔산2동 921 주은리더스텔 409 아라상담연구소','아라상담연구소','042-368-1613'),('2024-08-12 21:45:06.918922',5,'2024-08-12 21:45:06.918922','대전 유성구 노은로 166 계룡프라자 505호 노은역 3번출구 바로 앞','헤아려봄심리상담센터','042-716-0038');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `is_login` bit(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `expired` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint DEFAULT NULL,
  `refresh_token` text NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `UKaxdg964xkyvu80dst04jk1bel` (`user_idx`),
  CONSTRAINT `FK4gxns70iys3fxuq5i29bxi4ef` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (_binary '','2024-08-12 22:17:17.106246','2024-08-19 22:17:17.067000',1,'2024-08-12 22:17:17.106246',1,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIzNDY4NjM3LCJleHAiOjE3MjQwNzM0Mzd9.32fGzjBmYjhy5-BnmXOrvapJe7jr6QBjcb-bP82KbB8'),(_binary '','2024-08-16 04:24:09.496118','2024-08-23 04:24:09.494000',2,'2024-08-16 04:24:09.496118',3,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyMzc0OTg0OSwiZXhwIjoxNzI0MzU0NjQ5fQ.dGgQMRxFVRcpsuGuCIElhCIvLRRJHb8TbbE66tnbIvo'),(_binary '','2024-08-16 04:28:54.415334','2024-08-23 04:28:54.412000',3,'2024-08-16 04:28:54.415334',13,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJ0b21AZXhhbXBsZS5jb20iLCJpYXQiOjE3MjM3NTAxMzQsImV4cCI6MTcyNDM1NDkzNH0.yY_kbrFFuLlNkByz_zNC6p1nBl0RthkZye27MyZ-cAg'),(_binary '','2024-08-16 04:29:10.336909','2024-08-23 04:29:10.336000',4,'2024-08-16 04:29:10.336909',23,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJzdHJpbmciLCJpYXQiOjE3MjM3NTAxNTAsImV4cCI6MTcyNDM1NDk1MH0.fstGhYvsWJnrOmOK1L4jILcQve-d3CvytXXkNo7hlew'),(_binary '','2024-08-16 04:30:09.536692','2024-08-23 04:30:09.536000',5,'2024-08-16 04:30:09.536692',25,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJraW1zdzA1MTZAbmF2ZXIuY29tIiwiaWF0IjoxNzIzNzUwMjA5LCJleHAiOjE3MjQzNTUwMDl9.dDCCVgsG6YdLe-32grc_prW2EdulGDzcjdUq_CYXh2I'),(_binary '','2024-08-16 04:32:41.407553','2024-08-23 04:32:41.406000',6,'2024-08-16 04:32:41.407553',2,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJqYW5lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIzNzUwMzYxLCJleHAiOjE3MjQzNTUxNjF9.KDzJDAU3PcKvdgU37A27q7iFUJDBzLXFYVy6ThNPZus'),(_binary '','2024-08-16 04:33:02.947940','2024-08-23 04:33:02.947000',7,'2024-08-16 04:33:02.947940',26,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJraW1zdzk3MDUxNkBnbWFpbC5jb20iLCJpYXQiOjE3MjM3NTAzODIsImV4cCI6MTcyNDM1NTE4Mn0.MzjaXKq9EWFqtr9VSz8VNjzGnJIWT9G8eyksvNIKz8o'),(_binary '','2024-08-16 04:34:00.722881','2024-08-23 04:34:00.722000',8,'2024-08-16 04:34:00.722881',24,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0IiwiaWF0IjoxNzIzNzUwNDQwLCJleHAiOjE3MjQzNTUyNDB9.NHqMOp2pL5lYagYplgoXD9Zgpx7Pjbh_pquQr840iWc'),(_binary '','2024-08-16 04:34:01.341572','2024-08-23 04:34:01.340000',9,'2024-08-16 04:34:01.341572',4,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJib2JAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjM3NTA0NDEsImV4cCI6MTcyNDM1NTI0MX0.o5gqKfQPI3NcRESQmp5mrtoSU6WR6lQxQ1sQJFB8AYQ'),(_binary '','2024-08-16 04:35:05.718533','2024-08-23 04:35:05.718000',10,'2024-08-16 04:35:05.718533',27,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJwb293ODEwQG5hdmVyLmNvbSIsImlhdCI6MTcyMzc1MDUwNSwiZXhwIjoxNzI0MzU1MzA1fQ.ZxbT4JqHQCCSbrIPr2cVCnIaof2FD7xznl4wb7tWIkA'),(_binary '','2024-08-16 04:37:16.164301','2024-08-23 04:37:16.163000',11,'2024-08-16 04:37:16.164301',7,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJlbW1hQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIzNzUwNjM2LCJleHAiOjE3MjQzNTU0MzZ9.B_4fg3eywYm1wr5CzjXffG5RHU1nFhALmWY5YgV6NL4');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `child_idx` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `background` text NOT NULL,
  `drawing_flow` text NOT NULL,
  `img_h` text,
  `img_p` text,
  `img_t` text,
  `object_result` text NOT NULL,
  `result` text NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK3tjm690g6dds38cita7hlxg1o` (`child_idx`),
  CONSTRAINT `FK3tjm690g6dds38cita7hlxg1o` FOREIGN KEY (`child_idx`) REFERENCES `child_info` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'2024-08-12 22:58:35.039749',1,'2024-08-12 22:58:35.039749','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(2,'2024-08-12 22:58:45.345881',2,'2024-08-12 22:58:45.345881','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(3,'2024-08-12 22:58:50.582146',3,'2024-08-12 22:58:50.582146','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(4,'2024-08-12 22:58:52.460898',4,'2024-08-12 22:58:52.460898','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(5,'2024-08-12 22:58:55.406391',5,'2024-08-12 22:58:55.406391','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(6,'2024-08-12 22:58:58.325908',6,'2024-08-12 22:58:58.325908','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(7,'2024-08-12 22:59:02.423023',7,'2024-08-12 22:59:02.423023','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(8,'2024-08-12 22:59:05.113864',8,'2024-08-12 22:59:05.113864','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(9,'2024-08-12 22:59:06.793755',9,'2024-08-12 22:59:06.793755','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(10,'2024-08-12 22:59:09.331954',10,'2024-08-12 22:59:09.331954','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(11,'2024-08-12 22:59:13.518901',11,'2024-08-12 22:59:13.518901','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(12,'2024-08-12 22:59:16.922703',12,'2024-08-12 22:59:16.922703','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(4,'2024-08-16 04:25:50.112671',13,'2024-08-16 04:25:50.112671','아이의 행동이 최근 들어 변화된 것 같아서 HTP 검사를 통해 현재 심리 상태를 파악하고 싶습니다. 전문가의 도움을 받아 아이가 어떤 감정을 느끼고 있는지 알고 싶어요.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%A7%91_7_%EB%82%A8_09691.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%AC%EC%9E%90%EC%82%AC%EB%9E%8C_8_%EC%97%AC_02753.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%98%EB%AC%B4_8_%EC%97%AC_07011.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 너무 작은 창문=수줍음이 많음을 나타냄, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 큰 굴뚝=가정에서의 심리적 온정에 대한 지나친 관심을 나타냄, 굴뚝연기=낮은 애정 욕구, 애정 욕구로 인한 좌절감, 상실감, 우울감을 나타냄, 울타리=자신을 방어하고 싶고, 자신이 느끼고 있는 안전감을 방해받고 싶지 않다는 의미, 왼쪽에 치우친=충동적으로 행동하며, 욕구 충동의 즉각적 만족을 추구하는 경향을 나타냄}, 나무={꽃=외면적인 체면을 중시,통찰력이 없음, 많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 수관에 있는 나뭇잎=완정에 대한 욕구가 강하거나 쾌활한 성격에 예리한 관찰력을 가짐, 달이나 별=적적하고 외로움, 좁은 수관=표용력이 부족함, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={짧은 목=충동적 성향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 안정감과 자립성을 느끼고 있을 가능성이 있으며, 외부 세계와의 연결을 원하지만 동시에 수줍음이 많고 내향적인 성향이 드러날 수 있습니다. 또한, 강한 성취 욕구와 외면적인 체면을 중시하는 경향이 있으며, 이는 자신의 포부를 반영하는 것으로 보입니다. 그러나 낮은 애정 욕구와 애정 욕구로 인한 좌절감, 상실감이 존재할 수 있으며, 이는 정서적으로 불안정한 요소로 작용할 수 있습니다. 아동은 충동적인 성향을 보이며, 타인에게 의존하려는 경향이 있어 자신의 내적 힘을 제한적으로 느낄 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 긍정적인 태도를 지니고 있으나, 정서적 안정감이 부족할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(13,'2024-08-16 04:32:08.799291',14,'2024-08-16 04:32:08.799291','ㄱㄱ','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/w.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/tkfka.PNG','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/4.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝 없음=자신의 가정에서 심리적 따뜻함이 없다고 느끼거나 성에 대한 곤란함을 나타낼 수 있음, 크게 문제되지는 않음, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 뿌리 없음=현실속에서 자신에 대한 불안정감, 자신없음, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있는 것으로 보이며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 가능성이 있습니다. 그러나 뿌리가 없다는 점에서 현실 속에서 자신에 대한 불안정감과 자신없음을 느낄 수 있으며, 이는 내면의 불안정성을 나타낼 수 있습니다. 또한, 매우 큰 인물상은 공격적이고 방어적인 감정을 반영할 수 있어, 대인관계에서의 어려움이 있을 가능성이 있습니다. 집의 요소들은 외부 세계와의 연결을 나타내며, 타인이 자신의 삶에 들어오는 것을 허용하는 경향이 있지만, 심리적 따뜻함이 부족하다고 느낄 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소와 대인관계에서의 방어적 태도가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(3,'2024-08-16 04:33:18.339327',15,'2024-08-16 04:33:18.339327','아이의 행동이 최근 들어 변화된 것 같아서 HTP 검사를 통해 현재 심리 상태를 파악하고 싶습니다. 전문가의 도움을 받아 아이가 어떤 감정을 느끼고 있는지 알고 싶어요.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%A7%91_8_%EC%97%AC_12894.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%A8%EC%9E%90%EC%82%AC%EB%9E%8C_9_%EB%82%A8_04173.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%98%EB%AC%B4_9_%EB%82%A8_10782.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝=보다 친밀한 인간관계로서의 따뜻함을 상징, 굴뚝연기=낮은 애정 욕구, 애정 욕구로 인한 좌절감, 상실감, 우울감을 나타냄, 울타리=자신을 방어하고 싶고, 자신이 느끼고 있는 안전감을 방해받고 싶지 않다는 의미, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={떨어진 꽃=바닥에 떨어진 꽃은 보통 시들거나 생명력을 잃은 상태를 상징할 수 있습니다. 피검자가 최근에 중요한 무언가를 잃었거나, 상실감과 관련된 감정을 경험하고 있을 가능성을 나타냄, 꽃=외면적인 체면을 중시,통찰력이 없음, 열매=강한 의존욕구와 지속성의 결여, 가지에 비해 지나치게 큰 잎=무력감을 안고 있으면서도 표면적으로는 적응해 가고 있는 사람, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 달이나 별=적적하고 외로움, 좁은 수관=표용력이 부족함, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={작은 눈=내향적 경향, 짧은 목=충동적 성향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 크기 보통=평균 6~7인치 정도의 인물상}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있을 가능성이 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 수 있습니다. 그러나 최근에 중요한 무언가를 잃었거나 상실감과 관련된 감정을 경험하고 있을 가능성이 있으며, 강한 의존 욕구와 지속성의 결여로 인해 내향적이고 충동적인 성향이 드러날 수 있습니다. 또한, 외면적인 체면을 중시하는 경향이 있으며, 무력감을 느끼면서도 표면적으로는 적응해 가고 있는 모습이 보입니다. 친밀한 인간관계에 대한 욕구가 있으나, 낮은 애정 욕구와 그로 인한 좌절감, 상실감, 우울감이 존재할 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(14,'2024-08-16 04:34:09.901081',16,'2024-08-16 04:34:09.901081','아이가 잠을 못잡니다.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/w.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/unnamed.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/005.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝 없음=자신의 가정에서 심리적 따뜻함이 없다고 느끼거나 성에 대한 곤란함을 나타낼 수 있음, 크게 문제되지는 않음, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 좁은 수관=표용력이 부족함, 수관이 오른쪽으로 치우침=조심성이 부족한 사람. 자신감이 있음, 가지 있음 잎 없음=지나치게 내향적/위축, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={작은 눈=내향적 경향, 짧은 목=충동적 성향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 가능성이 있습니다. 강한 성취 욕구와 포부가 드러나지만, 내향적이고 위축된 성향이 나타날 수 있으며, 타인에게 의존하려는 경향이 보입니다. 또한, 충동적인 성향이 있으며, 자신을 세상에 드러내는 데 있어 타인의 도움을 받고자 하는 욕구가 존재할 수 있습니다. 환경과의 상호작용에 대한 감정이 적절하다고 판단되지만, 심리적 따뜻함이 부족하다고 느낄 가능성도 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(5,'2024-08-16 04:34:33.479515',17,'2024-08-16 04:34:33.479515','최근 스트레스를 많이 받고 있는 것 같은데, 그 원인이 무엇인지 스스로 알기 어려워 HTP 검사를 신청하게 되었습니다. 그림을 통해 제 내면을 들여다보고 싶어요.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%A7%91_9_%EB%82%A8_13067.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%A8%EC%9E%90%EC%82%AC%EB%9E%8C_9_%EB%82%A8_12284.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%98%EB%AC%B4_10_%EB%82%A8_03824.jpg','FastApiResponseDto{data={집={너무 많은 창문=개방과 환경적 접촉에 대한 갈망, 너무 작은 창문=수줍음이 많음을 나타냄, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 큰 굴뚝=가정에서의 심리적 온정에 대한 지나친 관심을 나타냄, 굴뚝연기=낮은 애정 욕구, 애정 욕구로 인한 좌절감, 상실감, 우울감을 나타냄, 울타리=자신을 방어하고 싶고, 자신이 느끼고 있는 안전감을 방해받고 싶지 않다는 의미, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={떨어진 꽃=바닥에 떨어진 꽃은 보통 시들거나 생명력을 잃은 상태를 상징할 수 있습니다. 피검자가 최근에 중요한 무언가를 잃었거나, 상실감과 관련된 감정을 경험하고 있을 가능성을 나타냄, 많은 꽃=성취와 성장에 대한 욕구를 가지고 있음, 많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 수관에 있는 나뭇잎=완정에 대한 욕구가 강하거나 쾌활한 성격에 예리한 관찰력을 가짐, 달이나 별=적적하고 외로움, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={작은 눈=내향적 경향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 크기 보통=평균 6~7인치 정도의 인물상}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있을 가능성이 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 수 있습니다. 그러나 최근에 중요한 무언가를 잃었거나 상실감과 관련된 감정을 경험하고 있을 가능성이 있으며, 내향적인 경향이 드러나고 있습니다. 또한, 타인에게 의존하고자 하는 욕구가 있으며, 외부 세계와의 연결을 원하지만 동시에 자신을 방어하고 싶어하는 복잡한 심리를 지니고 있을 수 있습니다. 성취와 성장에 대한 욕구가 강하게 나타나며, 외로움과 적적함을 느낄 가능성도 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(15,'2024-08-16 04:35:45.860319',18,'2024-08-16 04:35:45.860319','ㄱㄱ','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/w.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/tkfka.PNG','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/4.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝 없음=자신의 가정에서 심리적 따뜻함이 없다고 느끼거나 성에 대한 곤란함을 나타낼 수 있음, 크게 문제되지는 않음, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 뿌리 없음=현실속에서 자신에 대한 불안정감, 자신없음, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있는 것으로 보이며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 가능성이 있습니다. 그러나 뿌리가 없다는 점에서 현실 속에서 자신에 대한 불안정감과 자신감 결여가 나타날 수 있으며, 이는 아동의 정서적 안정성에 영향을 미칠 수 있습니다. 또한, 매우 큰 인물상은 공격적이고 방어적인 감정을 나타낼 수 있어, 대인관계에서의 어려움이 있을 가능성이 있습니다. 집의 요소들은 외부 세계와의 연결을 허용하려는 의지를 보여주지만, 심리적 따뜻함의 결여는 가정환경에서의 정서적 지원 부족을 시사할 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소와 대인관계에서의 방어적 태도가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(16,'2024-08-16 04:37:31.201138',19,'2024-08-16 04:37:31.201138','아이가 요즘 잠을 잘 못자고, 밤에 혼자 자는걸 무서워합니다. 원래 안 그랬었는데 요즘따라 갑자기 그래서요, 혹시 무슨 문제가 있나 해서 상담요청 드립니다. 가정에 큰 문제가 발생한건 없습니다.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/w.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/image03.png','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/005.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝 없음=자신의 가정에서 심리적 따뜻함이 없다고 느끼거나 성에 대한 곤란함을 나타낼 수 있음, 크게 문제되지는 않음, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 좁은 수관=표용력이 부족함, 수관이 오른쪽으로 치우침=조심성이 부족한 사람. 자신감이 있음, 가지 있음 잎 없음=지나치게 내향적/위축, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={목 없음=인지적활동/신체적반응에 대한 통제력이 약화, 미성숙한 정신상태과 관련, 매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있을 가능성이 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 수 있습니다. 강한 성취 욕구와 포부가 드러나지만, 지나치게 내향적이거나 위축된 성향이 나타날 수 있으며, 조심성이 부족한 경향이 보입니다. 또한, 외부 세계와의 연결 통로를 허용하는 모습이 있지만, 가정에서의 심리적 따뜻함이 부족하다고 느낄 수 있습니다. 인지적 활동이나 신체적 반응에 대한 통제력이 약화되어 미성숙한 정신상태와 관련이 있을 수 있으며, 공격적이거나 방어적인 감정이 드러날 가능성도 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(9,'2024-08-16 04:37:51.126801',20,'2024-08-16 04:37:51.126801','지속적인 우울감 때문에 일상 생활이 어려워지고 있어요. 그 원인을 찾아보기 위해 HTP 검사를 통해 제 내면을 살펴보려 합니다.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%A7%91_10_%EB%82%A8_01431.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%A8%EC%9E%90%EC%82%AC%EB%9E%8C_9_%EB%82%A8_00575.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%98%EB%AC%B4_9_%EB%82%A8_10782.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 큰 굴뚝=가정에서의 심리적 온정에 대한 지나친 관심을 나타냄, 굴뚝연기=낮은 애정 욕구, 애정 욕구로 인한 좌절감, 상실감, 우울감을 나타냄, 울타리=자신을 방어하고 싶고, 자신이 느끼고 있는 안전감을 방해받고 싶지 않다는 의미, 오른쪽에 치우친=좀 더 안정되고 행동 통제를 잘하며, 욕구 만족 지연 능력을 가지고 있음을 나타냄}, 나무={떨어진 꽃=바닥에 떨어진 꽃은 보통 시들거나 생명력을 잃은 상태를 상징할 수 있습니다. 피검자가 최근에 중요한 무언가를 잃었거나, 상실감과 관련된 감정을 경험하고 있을 가능성을 나타냄, 꽃=외면적인 체면을 중시,통찰력이 없음, 열매=강한 의존욕구와 지속성의 결여, 가지에 비해 지나치게 큰 잎=무력감을 안고 있으면서도 표면적으로는 적응해 가고 있는 사람, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 달이나 별=적적하고 외로움, 좁은 수관=표용력이 부족함, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={작은 눈=내향적 경향, 짧은 목=충동적 성향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 크기 보통=평균 6~7인치 정도의 인물상}}}','이 아동은 전반적으로 안정감을 느끼고 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 가능성이 있습니다. 그러나 최근에 중요한 무언가를 잃었거나 상실감과 관련된 감정을 경험하고 있을 수 있으며, 강한 의존 욕구와 지속성의 결여로 인해 내향적이거나 충동적인 성향이 나타날 수 있습니다. 또한, 외부 세계와의 연결을 원하면서도 자신을 방어하고 싶어하는 경향이 보이며, 낮은 애정 욕구와 애정 욕구로 인한 좌절감이 존재할 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(8,'2024-08-16 04:38:34.282881',21,'2024-08-16 04:38:34.282881','스스로에 대해 더 알고 싶어서 HTP 검사를 신청했습니다. 현재 느끼고 있는 감정들이 어떤 의미를 가지는지 깊이 탐색해보고 싶어요.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%A7%91_12_%EC%97%AC_04830.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%AC%EC%9E%90%EC%82%AC%EB%9E%8C_10_%EB%82%A8_00799.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/%EB%82%98%EB%AC%B4_12_%EB%82%A8_12853.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 너무 작은 창문=수줍음이 많음을 나타냄, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 큰 굴뚝=가정에서의 심리적 온정에 대한 지나친 관심을 나타냄, 굴뚝연기=낮은 애정 욕구, 애정 욕구로 인한 좌절감, 상실감, 우울감을 나타냄, 울타리=자신을 방어하고 싶고, 자신이 느끼고 있는 안전감을 방해받고 싶지 않다는 의미, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={떨어진 꽃=바닥에 떨어진 꽃은 보통 시들거나 생명력을 잃은 상태를 상징할 수 있습니다. 피검자가 최근에 중요한 무언가를 잃었거나, 상실감과 관련된 감정을 경험하고 있을 가능성을 나타냄, 많은 꽃=성취와 성장에 대한 욕구를 가지고 있음, 많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 수관에 있는 나뭇잎=완정에 대한 욕구가 강하거나 쾌활한 성격에 예리한 관찰력을 가짐, 달이나 별=적적하고 외로움, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={코가 없음=사회적상황에서 위축, 지나치게 회피적, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 크기 보통=평균 6~7인치 정도의 인물상}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있을 가능성이 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 수 있습니다. 그러나 최근에 중요한 무언가를 잃었거나 상실감과 관련된 감정을 경험하고 있을 가능성이 있으며, 이는 외부 세계와의 연결 통로에 대한 두려움으로 나타날 수 있습니다. 또한, 수줍음이 많고 사회적 상황에서 위축된 모습을 보일 수 있으며, 내적 힘이 제한되어 타인에게 의존하려는 경향이 있을 수 있습니다. 가정에서의 심리적 온정에 대한 지나친 관심과 낮은 애정 욕구는 아동의 정서적 불안정성을 나타낼 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(14,'2024-08-16 04:39:07.597743',22,'2024-08-16 04:39:07.597743','아이가 요즘 잠을 잘 못자고, 밤에 혼자 자는걸 무서워합니다. 원래 안 그랬었는데 요즘따라 갑자기 그래서요, 혹시 무슨 문제가 있나 해서 상담요청 드립니다. 가정에 큰 문제가 발생한건 없습니다.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/w.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/unnamed.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/005.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝 없음=자신의 가정에서 심리적 따뜻함이 없다고 느끼거나 성에 대한 곤란함을 나타낼 수 있음, 크게 문제되지는 않음, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 좁은 수관=표용력이 부족함, 수관이 오른쪽으로 치우침=조심성이 부족한 사람. 자신감이 있음, 가지 있음 잎 없음=지나치게 내향적/위축, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={작은 눈=내향적 경향, 짧은 목=충동적 성향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 가능성이 있습니다. 강한 성취 욕구와 포부가 드러나지만, 내향적이고 위축된 성향이 나타날 수 있으며, 타인에게 의존하려는 경향이 보입니다. 또한, 충동적인 성향이 있으며, 자신을 세상에 드러내는 데 있어 타인의 도움을 필요로 하는 욕구가 존재할 수 있습니다. 환경과의 상호작용에 대한 감정이 적절하다고 판단되지만, 심리적 따뜻함이 부족하다고 느낄 가능성도 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.'),(18,'2024-08-16 04:40:51.139661',23,'2024-08-16 04:40:51.139661','아이가 요즘 잠을 잘 못자고, 밤에 혼자 자는걸 무서워합니다. 원래 안 그랬었는데 요즘따라 갑자기 그래서요, 혹시 무슨 문제가 있나 해서 상담요청 드립니다. 가정에 큰 문제가 발생한건 없습니다.','flow','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/w.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/unnamed.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/005.jpg','FastApiResponseDto{data={집={창문=주관적 경험, 환경 상호작용 능력에 대한 감정이 적절하다고 판단할 수 있음, 문=외부 세계와 연결 통로를 의미, 타인이 자신 삶에 들어오도록 허용하거나 자신이 세상으로 나가는 통로를 의미, 굴뚝 없음=자신의 가정에서 심리적 따뜻함이 없다고 느끼거나 성에 대한 곤란함을 나타낼 수 있음, 크게 문제되지는 않음, 중앙 위치=적정 수준의 안정감을 느끼고 있음을 반영}, 나무={많은 열매=결실에 대한 소망으로 강한 성취욕구, 포부수준 반영된 것, 활엽수=안정성과 개방성, 성숙함과 자립성을 나타냄 다른 사람들과의 관계에서 조화롭고 긍정적인 태도를 지닐 수 있다는 신호로도 해석될 수 있음., 좁은 수관=표용력이 부족함, 수관이 오른쪽으로 치우침=조심성이 부족한 사람. 자신감이 있음, 가지 있음 잎 없음=지나치게 내향적/위축, 뿌리=내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습, 중앙 위치=적정수준의 안정감을 느끼고 있음을 반영}, 사람={작은 눈=내향적 경향, 짧은 목=충동적 성향, 단추=내적힘이 제한되어 안정감 얻으려 타인에게 의존, 자신을 세상에 드러내느느데 자기대상의 도움받고자 욕구, 매우 큰 인물상=공격, 과장, 방어의 감정}}}','이 아동은 전반적으로 적정 수준의 안정감을 느끼고 있으며, 자신의 내면에 대한 긍정적인 인식을 가지고 있을 가능성이 있습니다. 강한 성취 욕구와 포부가 드러나지만, 내향적이고 위축된 성향이 나타날 수 있으며, 타인에게 의존하려는 경향이 보입니다. 또한, 충동적인 성향이 있으며, 외부 세계와의 연결에 대한 복잡한 감정을 지니고 있을 수 있습니다. 가정에서의 심리적 따뜻함 부족이 느껴질 수 있으며, 자신감이 있으나 조심성이 부족한 모습이 나타날 수 있습니다. 이러한 특성들을 종합해 볼 때, 이 아동은 성숙하고 자립적인 성향을 지니고 있으나, 정서적으로 불안정한 요소가 존재할 가능성이 있습니다. 다만, 이 해석은 일반적인 경향을 바탕으로 한 것이므로, 아동의 구체적인 상황에 따라 달라질 수 있습니다.');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserve_info`
--

DROP TABLE IF EXISTS `reserve_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserve_info` (
  `date` date NOT NULL,
  `end_time` time(6) NOT NULL,
  `start_time` time(6) NOT NULL,
  `co_idx` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `report_idx` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  `is_end` varchar(255) NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK62i5dg5wkm6fkjr5irlafo14v` (`co_idx`),
  KEY `FK5n80e6beslxurf4bkhlk001pd` (`user_idx`),
  CONSTRAINT `FK5n80e6beslxurf4bkhlk001pd` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `FK62i5dg5wkm6fkjr5irlafo14v` FOREIGN KEY (`co_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserve_info`
--

LOCK TABLES `reserve_info` WRITE;
/*!40000 ALTER TABLE `reserve_info` DISABLE KEYS */;
INSERT INTO `reserve_info` VALUES ('2024-08-16','10:00:00.000000','09:00:00.000000',11,'2024-08-16 04:26:37.044439',1,1,'2024-08-16 04:26:49.437997',3,'Y'),('2024-08-16','21:00:00.000000','20:00:00.000000',13,'2024-08-16 04:31:57.153632',2,2,'2024-08-16 04:32:06.754502',3,'Y'),('2024-08-16','20:00:00.000000','19:00:00.000000',13,'2024-08-16 04:33:35.503552',3,3,'2024-08-16 04:33:45.145517',2,'Y'),('2024-08-16','19:00:00.000000','18:00:00.000000',13,'2024-08-16 04:33:41.572308',4,4,'2024-08-16 04:33:48.490047',23,'Y'),('2024-08-19','10:00:00.000000','09:00:00.000000',24,'2024-08-16 04:34:28.244981',5,14,'2024-08-16 04:34:28.244981',23,'N'),('2024-08-23','22:00:00.000000','21:00:00.000000',13,'2024-08-16 04:34:51.845558',6,6,'2024-08-16 04:35:02.570351',26,'Y'),('2024-08-16','22:00:00.000000','21:00:00.000000',13,'2024-08-16 04:35:03.603252',7,7,'2024-08-16 04:35:10.078468',4,'Y'),('2024-08-16','23:00:00.000000','22:00:00.000000',13,'2024-08-16 04:37:49.239780',8,19,'2024-08-16 04:37:49.239780',25,'N'),('2024-08-21','21:00:00.000000','20:00:00.000000',13,'2024-08-16 04:37:58.023942',9,20,'2024-08-16 04:37:58.023942',7,'N'),('2024-08-20','00:00:00.000000','23:00:00.000000',13,'2024-08-16 04:38:52.482490',10,21,'2024-08-16 04:38:52.482490',7,'N'),('2024-08-26','20:00:00.000000','19:00:00.000000',13,'2024-08-16 04:39:38.299379',11,11,'2024-08-16 04:39:46.544395',26,'Y'),('2024-08-29','23:00:00.000000','22:00:00.000000',13,'2024-08-16 04:40:59.372692',12,12,'2024-08-16 04:41:12.623223',26,'Y');
/*!40000 ALTER TABLE `reserve_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume`
--

DROP TABLE IF EXISTS `resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume` (
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `UKmamhepcbl6s0ohhwuk9flb837` (`user_idx`),
  CONSTRAINT `FKca8t244aix23p44dv61vjlv9j` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume`
--

LOCK TABLES `resume` WRITE;
/*!40000 ALTER TABLE `resume` DISABLE KEYS */;
INSERT INTO `resume` VALUES ('2024-08-12 22:17:27.837042',1,'2024-08-12 22:17:27.837042',11,'학력: 서울대학교 심리학과 박사'),('2024-08-12 22:17:45.138109',2,'2024-08-12 22:17:45.138109',12,'경력: 서울시립 청소년 상담센터 상담사 (5년)'),('2024-08-12 22:17:50.405526',3,'2024-08-16 04:46:00.333909',13,'[\"[싸피대학교] 심리학 학사\",\"[싸피대학교] 상담심리학 석사\",\"[삼성청년심리상담센터] 심리상담사 (2020년 ~ 현재)\"]'),('2024-08-12 22:17:57.282295',4,'2024-08-12 22:17:57.282295',14,'연세대학교 상담심리학 석사'),('2024-08-12 22:18:10.180304',5,'2024-08-12 22:18:10.180304',15,'개인 상담 클리닉 운영 (8년)'),('2024-08-12 22:18:17.706481',6,'2024-08-12 22:18:17.706481',16,'부산대학교 상담심리학과 석사'),('2024-08-12 22:18:26.809034',7,'2024-08-12 22:18:26.809034',17,'부산시립 노인 복지센터 상담사 (7년)'),('2024-08-12 22:18:34.532677',8,'2024-08-12 22:18:34.532677',18,'서울시립 중독관리센터 상담사 (6년)'),('2024-08-12 22:18:45.237526',9,'2024-08-12 22:18:45.237526',19,'전문 분야: 교육 심리 및 학습 상담'),('2024-08-12 22:18:53.347995',10,'2024-08-12 22:18:53.347995',20,'학력: 성균관대학교 심리학 박사'),('2024-08-12 22:19:03.325196',11,'2024-08-12 22:19:03.325196',21,'전문 분야: 성인 ADHD');
/*!40000 ALTER TABLE `resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `score` int NOT NULL,
  `co_idx` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `reserve_idx` bigint NOT NULL,
  `rno` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `content` text NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`rno`),
  UNIQUE KEY `UKg8cp2t69s74xg2i10k0id4p89` (`reserve_idx`),
  CONSTRAINT `FKa943w2sy0uj06d6xxjj9t7wg9` FOREIGN KEY (`reserve_idx`) REFERENCES `reserve_info` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (5,11,'2024-08-16 04:26:58.265989',1,1,'2024-08-16 04:26:58.265989','온라인으로 HTP 상담을 받아서 처음엔 조금 걱정됐지만, 상담사님이 정말 친절하게 설명해주셔서 마음이 놓였어요. 내면을 깊이 들여다볼 수 있는 좋은 기회였어요.','박싸피'),(5,13,'2024-08-16 04:32:14.640404',2,2,'2024-08-16 04:32:14.640404','온라인으로 HTP 상담을 받아서 처음엔 조금 걱정됐지만, 상담사님이 정말 친절하게 설명해주셔서 마음이 놓였어요. 내면을 깊이 들여다볼 수 있는 좋은 기회였어요.','박싸피'),(5,13,'2024-08-16 04:33:49.983520',3,3,'2024-08-16 04:33:49.983520','최근 스트레스를 많이 받고 있는 것 같은데, 그 원인이 무엇인지 스스로 알기 어려워 HTP 검사를 신청하게 되었습니다. 그림을 통해 제 내면을 들여다보고 싶어요.','이싸피'),(4,13,'2024-08-16 04:33:53.521765',4,4,'2024-08-16 04:33:53.521765','굳','테스트'),(4,13,'2024-08-16 04:35:11.755492',6,5,'2024-08-16 04:35:11.755492','친절한 상담 감사합니다.','김성원'),(4,13,'2024-08-16 04:35:23.148630',7,6,'2024-08-16 04:35:23.148630','집에서도 이렇게 깊이 있는 상담을 받을 수 있다니 놀라웠어요. 그림을 통한 상담이 이렇게 효과적일 줄은 상상도 못했어요.','홍싸피'),(5,13,'2024-08-16 04:39:57.024446',11,7,'2024-08-16 04:39:57.024446','굿굿 베리 굿~~~~~~~~','김성원'),(3,13,'2024-08-16 04:41:26.472687',12,8,'2024-08-16 04:41:26.472687','음 그냥 적당하네요...','김성원');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unavailable_time`
--

DROP TABLE IF EXISTS `unavailable_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unavailable_time` (
  `date` date NOT NULL,
  `end_time` time(6) NOT NULL,
  `start_time` time(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK4uhupj7nxq3fmdkfgguqieq6s` (`user_idx`),
  CONSTRAINT `FK4uhupj7nxq3fmdkfgguqieq6s` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unavailable_time`
--

LOCK TABLES `unavailable_time` WRITE;
/*!40000 ALTER TABLE `unavailable_time` DISABLE KEYS */;
INSERT INTO `unavailable_time` VALUES ('2024-08-16','10:00:00.000000','09:00:00.000000','2024-08-16 04:26:37.046169',1,'2024-08-16 04:26:37.046169',11),('2024-08-16','21:00:00.000000','20:00:00.000000','2024-08-16 04:31:57.155301',2,'2024-08-16 04:31:57.155301',13),('2024-08-16','20:00:00.000000','19:00:00.000000','2024-08-16 04:33:35.505660',3,'2024-08-16 04:33:35.505660',13),('2024-08-16','19:00:00.000000','18:00:00.000000','2024-08-16 04:33:41.574020',4,'2024-08-16 04:33:41.574020',13),('2024-08-19','10:00:00.000000','09:00:00.000000','2024-08-16 04:34:28.246743',5,'2024-08-16 04:34:28.246743',24),('2024-08-23','22:00:00.000000','21:00:00.000000','2024-08-16 04:34:51.846811',6,'2024-08-16 04:34:51.846811',13),('2024-08-16','22:00:00.000000','21:00:00.000000','2024-08-16 04:35:03.604882',7,'2024-08-16 04:35:03.604882',13),('2024-08-16','23:00:00.000000','22:00:00.000000','2024-08-16 04:37:49.241384',8,'2024-08-16 04:37:49.241384',13),('2024-08-21','21:00:00.000000','20:00:00.000000','2024-08-16 04:37:58.025122',9,'2024-08-16 04:37:58.025122',13),('2024-08-20','00:00:00.000000','23:00:00.000000','2024-08-16 04:38:52.484123',10,'2024-08-16 04:38:52.484123',13),('2024-08-26','20:00:00.000000','19:00:00.000000','2024-08-16 04:39:38.301078',11,'2024-08-16 04:39:38.301078',13),('2024-08-29','23:00:00.000000','22:00:00.000000','2024-08-16 04:40:59.373978',12,'2024-08-16 04:40:59.373978',13);
/*!40000 ALTER TABLE `unavailable_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `created_at` datetime(6) NOT NULL,
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `org_idx` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `intro` text,
  `is_alive` varchar(255) NOT NULL DEFAULT 'Y',
  `is_auth` varchar(255) NOT NULL DEFAULT 'N',
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` text,
  `tel` varchar(255) NOT NULL,
  `role` enum('COUNSELOR','USER') NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKpid8ldhhty83hx2bykw4iaojp` (`org_idx`),
  CONSTRAINT `FKpid8ldhhty83hx2bykw4iaojp` FOREIGN KEY (`org_idx`) REFERENCES `organization` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2024-08-12 21:25:10.081234',1,NULL,'2024-08-12 21:25:10.081234','john@example.com',NULL,'Y','N','김싸피','82fd8d83c5e67749dd0d8c2b879b35fe3794502d015d24d97af6fbf0786e78a1',NULL,'010-1234-5678','USER'),('2024-08-12 21:31:33.084690',2,NULL,'2024-08-12 21:31:33.084690','jane@example.com',NULL,'Y','N','이싸피','d0c1e38bb188cf0a0afcf0b029711f002bbff0f14f859f4903795e3d735f6304',NULL,'010-9876-5432','USER'),('2024-08-12 21:31:39.643622',3,NULL,'2024-08-12 21:31:39.643622','alice@example.com',NULL,'Y','N','박싸피','115f38e658945b8ad5669a8e5b16c45ad3194ecb161ebc96f434a5349f5cb2a9',NULL,'010-2345-6789','USER'),('2024-08-12 21:31:44.929306',4,NULL,'2024-08-12 21:31:44.929306','bob@example.com',NULL,'Y','N','홍싸피','cb29cc8b8c92e868ae3deaa90e19aa280934bb945b3d62f723b13253ea34f799',NULL,'010-8765-4321','USER'),('2024-08-12 21:31:49.409719',5,NULL,'2024-08-12 21:31:49.409719','charlie@example.com',NULL,'Y','N','왕싸피','d582da777e3a73752071e3d8d29e7adbd80fa6aef2975abd3476913ae9873f2d',NULL,'010-3456-7890','USER'),('2024-08-12 21:31:53.760979',6,NULL,'2024-08-12 21:31:53.760979','diana@example.com',NULL,'Y','N','오싸피','6d117945deb7fb858643ebac0da536bf67969fe998422ddc1879b6872a80575f',NULL,'010-7654-3210','USER'),('2024-08-12 21:31:59.910029',7,NULL,'2024-08-12 21:31:59.910029','emma@example.com',NULL,'Y','N','유싸피','79aefca90d9591d2af41e5518526c83426e408e4ea798285428b1353a1746faa',NULL,'010-4567-8901','USER'),('2024-08-12 21:32:04.493159',8,NULL,'2024-08-12 21:32:04.493159','frank@example.com',NULL,'Y','N','조싸피','078599c1cbf897b99361378114ff0c37b9b07c834e1ee737d91842f52a25a2a4',NULL,'010-6543-2109','USER'),('2024-08-12 21:32:08.464419',9,NULL,'2024-08-12 21:32:08.464419','grace@example.com',NULL,'Y','N','태싸피','abcc7890b31f139c1ae98daa7b5a19c37c26fe7736ad9052684bee6bb7e950ac',NULL,'010-5678-9012','USER'),('2024-08-12 21:32:12.949611',10,NULL,'2024-08-12 21:32:12.949611','harry@example.com',NULL,'Y','N','강싸피','d21b1ffbd55340abdaa38fb8ccc7a34cdedee5ea723006b359639527f98d097f',NULL,'010-8765-0987','USER'),('2024-08-12 21:52:23.454022',11,1,'2024-08-12 21:52:23.454022','chris@example.com',NULL,'Y','N','김명진','4bd9050e1abb02c07a6e88fe3dd4d9c555bfb3841fd1c4903e5c46ce7b8a96f6',NULL,'010-6789-0123','COUNSELOR'),('2024-08-12 21:54:20.623155',12,1,'2024-08-12 21:54:20.623155','hannah@example.com',NULL,'Y','N','김병화','e6482fa87b464a90d22151b8be3639e5b1c5d73aff1126bf897006198d3b58ce',NULL,'010-5432-1987','COUNSELOR'),('2024-08-12 21:55:18.133243',13,NULL,'2024-08-16 04:44:24.097282','tom@example.com','마음의 상처를 치유하며, 새로운 시작을 돕는 상담가입니다.','Y','N','송인진','25db778d4166550a800198c6fd70928517374e12cf5601bb672769686a2340a8','','01078901234','COUNSELOR'),('2024-08-12 21:55:42.857578',14,2,'2024-08-12 21:55:42.857578','lily@example.com',NULL,'Y','N','양유성','b9f8aee66918c66e3f0dd9f17ee07d46e4282f0a09eab21fa33637f9aa40e688',NULL,'010-2109-8765','COUNSELOR'),('2024-08-12 22:04:15.113615',15,3,'2024-08-12 22:04:15.113615','ben@example.com',NULL,'Y','N','정연봉','ce81ba2260faf98e891f91a45b85da73591b7f37ac45cb8ca5e214aa270076cd',NULL,'010-8901-2345','COUNSELOR'),('2024-08-12 22:04:35.712804',16,3,'2024-08-12 22:04:35.712804','anna@example.com',NULL,'Y','N','정문자','3c5b3a7dcf0f01ca7d0c831d2aa03f59ce5ddecf2b5622c19512f8e57d870814',NULL,'010-3210-6543','COUNSELOR'),('2024-08-12 22:04:58.081495',17,3,'2024-08-12 22:04:58.081495','jake@example.com',NULL,'Y','N','이현숙','ce4d39fa1f7deb5bb584468716b2d86e78379d8c172e0a2372655d9fe24fcfc7',NULL,'010-9012-3456','COUNSELOR'),('2024-08-12 22:05:56.674392',18,4,'2024-08-12 22:05:56.674392','sophia@example.com',NULL,'Y','N','정현주','881a142fa439dacfe788fa0076fb2ccea8b1b3bc16f7d56ce3517b093ec74fed',NULL,'010-4321-7654','COUNSELOR'),('2024-08-12 22:06:18.892204',19,4,'2024-08-12 22:06:18.892204','mark@example.com',NULL,'Y','N','장현덕','d438cb507774923d72744230069083ab646760e1e14adf5ebea8d207067c8764',NULL,'010-0987-6543','COUNSELOR'),('2024-08-12 22:06:48.654626',20,5,'2024-08-12 22:06:48.654626','chloe@example.com',NULL,'Y','N','정윤희','3272a2bebe2efba80c85814b80ebec8a60c08b55de7321e987d7b55e2a57d234',NULL,'010-1098-7654','COUNSELOR'),('2024-08-12 22:07:55.016272',21,NULL,'2024-08-12 22:07:55.016272','samuel@example.com',NULL,'Y','N','권선중','f31f00069b2a117174f18baf33802e3b2cbcc14fc22daae6c674ad23053f5eda',NULL,'010-1122-3344','COUNSELOR'),('2024-08-12 22:08:21.365447',22,NULL,'2024-08-12 22:08:21.365447','isabella@example.com',NULL,'Y','N','유재성','00c762b0a8d119e0fc0fcaf879cb192751013914872e5eee74d354b180785bc4',NULL,'010-2233-4455','COUNSELOR'),('2024-08-13 22:33:30.336024',23,NULL,'2024-08-13 22:33:30.336024','string',NULL,'Y','N','테스트','84184b1a2aef17dc66803439e461f0904c9e1d954206ef92e11be806928eaeee',NULL,'010-7777-7777','USER'),('2024-08-13 22:36:19.030393',24,NULL,'2024-08-13 22:36:19.030393','test',NULL,'Y','N','테스트 상담사','98e6fcd9d334f628c425926b95382d8d16df84df19f0df642dba8e642bb96651',NULL,'010-5555-5555','COUNSELOR'),('2024-08-16 04:29:58.847791',25,NULL,'2024-08-16 04:29:58.847791','kimsw0516@naver.com',NULL,'Y','N','김성원','b9448f9b95625c1012b46acc4413009f7463c097cc3bace3f9747fdf76511671',NULL,'01022345497','USER'),('2024-08-16 04:32:47.571454',26,NULL,'2024-08-16 04:32:47.571454','kimsw970516@gmail.com',NULL,'Y','N','김성원','b9448f9b95625c1012b46acc4413009f7463c097cc3bace3f9747fdf76511671',NULL,'01022345497','USER'),('2024-08-16 04:34:59.093020',27,NULL,'2024-08-16 04:34:59.093020','poow810@naver.com',NULL,'Y','N','박하운','5e4a6e1f079e0403be1c5789bdd9f8f4c6f054d2b8aeb13784b8ac6b9bd0b5dc',NULL,'01066231039','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15 19:50:25
