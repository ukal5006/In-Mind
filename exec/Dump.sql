-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: inmind
-- ------------------------------------------------------
-- Server version	8.0.39

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_info`
--

LOCK TABLES `child_info` WRITE;
/*!40000 ALTER TABLE `child_info` DISABLE KEYS */;
INSERT INTO `child_info` VALUES ('2024-08-12 22:26:03.101554',1,'2024-08-12 22:26:03.101554',1,'2013-03-15','김서윤'),('2024-08-12 22:26:08.081758',2,'2024-08-12 22:26:08.081758',1,'2014-05-21','김지우'),('2024-08-12 22:26:11.806506',3,'2024-08-12 22:26:11.806506',2,'2013-02-11','이준호'),('2024-08-12 22:26:15.082544',4,'2024-08-12 22:26:15.082544',3,'2014-08-30','박하은'),('2024-08-12 22:26:18.046104',5,'2024-08-12 22:26:18.046104',4,'2015-01-29','홍민재'),('2024-08-12 22:26:21.220844',6,'2024-08-12 22:26:21.220844',5,'2016-07-19','왕서진'),('2024-08-12 22:26:24.437429',7,'2024-08-12 22:26:24.437429',6,'2017-04-03','오윤아'),('2024-08-12 22:26:27.832025',8,'2024-08-12 22:26:27.832025',7,'2013-12-12','유다은'),('2024-08-12 22:26:30.978719',9,'2024-08-12 22:26:30.978719',7,'2018-09-05','유시후'),('2024-08-12 22:26:38.283509',10,'2024-08-12 22:26:38.283509',8,'2019-06-14','조민규'),('2024-08-12 22:26:46.597482',11,'2024-08-12 22:26:46.597482',9,'2015-10-26','태지훈'),('2024-08-12 22:26:49.704198',12,'2024-08-12 22:26:49.704198',10,'2014-11-08','강은별');
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
INSERT INTO `default_time` VALUES ('00:00:00.000000','00:00:00.000000','2024-08-12 21:52:23.457040',1,'2024-08-12 21:52:23.457040',11),('00:00:00.000000','00:00:00.000000','2024-08-12 21:54:20.625155',2,'2024-08-12 21:54:20.625155',12),('00:00:00.000000','00:00:00.000000','2024-08-12 21:55:18.136242',3,'2024-08-12 21:55:18.136242',13),('00:00:00.000000','00:00:00.000000','2024-08-12 21:55:42.859579',4,'2024-08-12 21:55:42.859579',14),('00:00:00.000000','00:00:00.000000','2024-08-12 22:04:15.117616',5,'2024-08-12 22:04:15.117616',15),('00:00:00.000000','00:00:00.000000','2024-08-12 22:04:35.714819',6,'2024-08-12 22:04:35.714819',16),('00:00:00.000000','00:00:00.000000','2024-08-12 22:04:58.084484',7,'2024-08-12 22:04:58.084484',17),('00:00:00.000000','00:00:00.000000','2024-08-12 22:05:56.676395',8,'2024-08-12 22:05:56.676395',18),('00:00:00.000000','00:00:00.000000','2024-08-12 22:06:18.894196',9,'2024-08-12 22:06:18.894196',19),('00:00:00.000000','00:00:00.000000','2024-08-12 22:06:48.656627',10,'2024-08-12 22:06:48.656627',20),('00:00:00.000000','00:00:00.000000','2024-08-12 22:07:55.018274',11,'2024-08-12 22:07:55.018274',21),('00:00:00.000000','00:00:00.000000','2024-08-12 22:08:21.367446',12,'2024-08-12 22:08:21.367446',22),('00:00:00.000000','00:00:00.000000','2024-08-13 22:36:19.034421',13,'2024-08-13 22:36:19.034421',24);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (_binary '','2024-08-12 22:17:17.106246','2024-08-19 22:17:17.067000',1,'2024-08-12 22:17:17.106246',1,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIzNDY4NjM3LCJleHAiOjE3MjQwNzM0Mzd9.32fGzjBmYjhy5-BnmXOrvapJe7jr6QBjcb-bP82KbB8');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'2024-08-12 22:58:35.039749',1,'2024-08-12 22:58:35.039749','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(2,'2024-08-12 22:58:45.345881',2,'2024-08-12 22:58:45.345881','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(3,'2024-08-12 22:58:50.582146',3,'2024-08-12 22:58:50.582146','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(4,'2024-08-12 22:58:52.460898',4,'2024-08-12 22:58:52.460898','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(5,'2024-08-12 22:58:55.406391',5,'2024-08-12 22:58:55.406391','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(6,'2024-08-12 22:58:58.325908',6,'2024-08-12 22:58:58.325908','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(7,'2024-08-12 22:59:02.423023',7,'2024-08-12 22:59:02.423023','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(8,'2024-08-12 22:59:05.113864',8,'2024-08-12 22:59:05.113864','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(9,'2024-08-12 22:59:06.793755',9,'2024-08-12 22:59:06.793755','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(10,'2024-08-12 22:59:09.331954',10,'2024-08-12 22:59:09.331954','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(11,'2024-08-12 22:59:13.518901',11,'2024-08-12 22:59:13.518901','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.'),(12,'2024-08-12 22:59:16.922703',12,'2024-08-12 22:59:16.922703','아이에 대한 정보가 들어가요.','','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/img%20%281%29.jpg','1,2,11,2,3,14,4','물론, 저는 당신의 심리적인 어려움을 듣고 도와드릴 수 있어요. 어떤 문제에 대해 이야기하고 싶으신가요? 함께 이야기를 나누면서 해결책을 찾아봐요.');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserve_info`
--

LOCK TABLES `reserve_info` WRITE;
/*!40000 ALTER TABLE `reserve_info` DISABLE KEYS */;
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
INSERT INTO `resume` VALUES ('2024-08-12 22:17:27.837042',1,'2024-08-12 22:17:27.837042',11,'학력: 서울대학교 심리학과 박사'),('2024-08-12 22:17:45.138109',2,'2024-08-12 22:17:45.138109',12,'경력: 서울시립 청소년 상담센터 상담사 (5년)'),('2024-08-12 22:17:50.405526',3,'2024-08-12 22:17:50.405526',13,'경력: 서울시립 청소년 상담센터 상담사 (10년)'),('2024-08-12 22:17:57.282295',4,'2024-08-12 22:17:57.282295',14,'연세대학교 상담심리학 석사'),('2024-08-12 22:18:10.180304',5,'2024-08-12 22:18:10.180304',15,'개인 상담 클리닉 운영 (8년)'),('2024-08-12 22:18:17.706481',6,'2024-08-12 22:18:17.706481',16,'부산대학교 상담심리학과 석사'),('2024-08-12 22:18:26.809034',7,'2024-08-12 22:18:26.809034',17,'부산시립 노인 복지센터 상담사 (7년)'),('2024-08-12 22:18:34.532677',8,'2024-08-12 22:18:34.532677',18,'서울시립 중독관리센터 상담사 (6년)'),('2024-08-12 22:18:45.237526',9,'2024-08-12 22:18:45.237526',19,'전문 분야: 교육 심리 및 학습 상담'),('2024-08-12 22:18:53.347995',10,'2024-08-12 22:18:53.347995',20,'학력: 성균관대학교 심리학 박사'),('2024-08-12 22:19:03.325196',11,'2024-08-12 22:19:03.325196',21,'전문 분야: 성인 ADHD');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unavailable_time`
--

LOCK TABLES `unavailable_time` WRITE;
/*!40000 ALTER TABLE `unavailable_time` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2024-08-12 21:25:10.081234',1,NULL,'2024-08-12 21:25:10.081234','john@example.com',NULL,'Y','N','김싸피','82fd8d83c5e67749dd0d8c2b879b35fe3794502d015d24d97af6fbf0786e78a1',NULL,'010-1234-5678','USER'),('2024-08-12 21:31:33.084690',2,NULL,'2024-08-12 21:31:33.084690','jane@example.com',NULL,'Y','N','이싸피','d0c1e38bb188cf0a0afcf0b029711f002bbff0f14f859f4903795e3d735f6304',NULL,'010-9876-5432','USER'),('2024-08-12 21:31:39.643622',3,NULL,'2024-08-12 21:31:39.643622','alice@example.com',NULL,'Y','N','박싸피','115f38e658945b8ad5669a8e5b16c45ad3194ecb161ebc96f434a5349f5cb2a9',NULL,'010-2345-6789','USER'),('2024-08-12 21:31:44.929306',4,NULL,'2024-08-12 21:31:44.929306','bob@example.com',NULL,'Y','N','홍싸피','cb29cc8b8c92e868ae3deaa90e19aa280934bb945b3d62f723b13253ea34f799',NULL,'010-8765-4321','USER'),('2024-08-12 21:31:49.409719',5,NULL,'2024-08-12 21:31:49.409719','charlie@example.com',NULL,'Y','N','왕싸피','d582da777e3a73752071e3d8d29e7adbd80fa6aef2975abd3476913ae9873f2d',NULL,'010-3456-7890','USER'),('2024-08-12 21:31:53.760979',6,NULL,'2024-08-12 21:31:53.760979','diana@example.com',NULL,'Y','N','오싸피','6d117945deb7fb858643ebac0da536bf67969fe998422ddc1879b6872a80575f',NULL,'010-7654-3210','USER'),('2024-08-12 21:31:59.910029',7,NULL,'2024-08-12 21:31:59.910029','emma@example.com',NULL,'Y','N','유싸피','79aefca90d9591d2af41e5518526c83426e408e4ea798285428b1353a1746faa',NULL,'010-4567-8901','USER'),('2024-08-12 21:32:04.493159',8,NULL,'2024-08-12 21:32:04.493159','frank@example.com',NULL,'Y','N','조싸피','078599c1cbf897b99361378114ff0c37b9b07c834e1ee737d91842f52a25a2a4',NULL,'010-6543-2109','USER'),('2024-08-12 21:32:08.464419',9,NULL,'2024-08-12 21:32:08.464419','grace@example.com',NULL,'Y','N','태싸피','abcc7890b31f139c1ae98daa7b5a19c37c26fe7736ad9052684bee6bb7e950ac',NULL,'010-5678-9012','USER'),('2024-08-12 21:32:12.949611',10,NULL,'2024-08-12 21:32:12.949611','harry@example.com',NULL,'Y','N','강싸피','d21b1ffbd55340abdaa38fb8ccc7a34cdedee5ea723006b359639527f98d097f',NULL,'010-8765-0987','USER'),('2024-08-12 21:52:23.454022',11,1,'2024-08-12 21:52:23.454022','chris@example.com',NULL,'Y','N','김명진','4bd9050e1abb02c07a6e88fe3dd4d9c555bfb3841fd1c4903e5c46ce7b8a96f6',NULL,'010-6789-0123','COUNSELOR'),('2024-08-12 21:54:20.623155',12,1,'2024-08-12 21:54:20.623155','hannah@example.com',NULL,'Y','N','김병화','e6482fa87b464a90d22151b8be3639e5b1c5d73aff1126bf897006198d3b58ce',NULL,'010-5432-1987','COUNSELOR'),('2024-08-12 21:55:18.133243',13,2,'2024-08-12 21:55:18.133243','tom@example.com',NULL,'Y','N','송인진','25db778d4166550a800198c6fd70928517374e12cf5601bb672769686a2340a8',NULL,'010-7890-1234','COUNSELOR'),('2024-08-12 21:55:42.857578',14,2,'2024-08-12 21:55:42.857578','lily@example.com',NULL,'Y','N','양유성','b9f8aee66918c66e3f0dd9f17ee07d46e4282f0a09eab21fa33637f9aa40e688',NULL,'010-2109-8765','COUNSELOR'),('2024-08-12 22:04:15.113615',15,3,'2024-08-12 22:04:15.113615','ben@example.com',NULL,'Y','N','정연봉','ce81ba2260faf98e891f91a45b85da73591b7f37ac45cb8ca5e214aa270076cd',NULL,'010-8901-2345','COUNSELOR'),('2024-08-12 22:04:35.712804',16,3,'2024-08-12 22:04:35.712804','anna@example.com',NULL,'Y','N','정문자','3c5b3a7dcf0f01ca7d0c831d2aa03f59ce5ddecf2b5622c19512f8e57d870814',NULL,'010-3210-6543','COUNSELOR'),('2024-08-12 22:04:58.081495',17,3,'2024-08-12 22:04:58.081495','jake@example.com',NULL,'Y','N','이현숙','ce4d39fa1f7deb5bb584468716b2d86e78379d8c172e0a2372655d9fe24fcfc7',NULL,'010-9012-3456','COUNSELOR'),('2024-08-12 22:05:56.674392',18,4,'2024-08-12 22:05:56.674392','sophia@example.com',NULL,'Y','N','정현주','881a142fa439dacfe788fa0076fb2ccea8b1b3bc16f7d56ce3517b093ec74fed',NULL,'010-4321-7654','COUNSELOR'),('2024-08-12 22:06:18.892204',19,4,'2024-08-12 22:06:18.892204','mark@example.com',NULL,'Y','N','장현덕','d438cb507774923d72744230069083ab646760e1e14adf5ebea8d207067c8764',NULL,'010-0987-6543','COUNSELOR'),('2024-08-12 22:06:48.654626',20,5,'2024-08-12 22:06:48.654626','chloe@example.com',NULL,'Y','N','정윤희','3272a2bebe2efba80c85814b80ebec8a60c08b55de7321e987d7b55e2a57d234',NULL,'010-1098-7654','COUNSELOR'),('2024-08-12 22:07:55.016272',21,NULL,'2024-08-12 22:07:55.016272','samuel@example.com',NULL,'Y','N','권선중','f31f00069b2a117174f18baf33802e3b2cbcc14fc22daae6c674ad23053f5eda',NULL,'010-1122-3344','COUNSELOR'),('2024-08-12 22:08:21.365447',22,NULL,'2024-08-12 22:08:21.365447','isabella@example.com',NULL,'Y','N','유재성','00c762b0a8d119e0fc0fcaf879cb192751013914872e5eee74d354b180785bc4',NULL,'010-2233-4455','COUNSELOR'),('2024-08-13 22:33:30.336024',23,NULL,'2024-08-13 22:33:30.336024','string',NULL,'Y','N','테스트','84184b1a2aef17dc66803439e461f0904c9e1d954206ef92e11be806928eaeee',NULL,'010-7777-7777','USER'),('2024-08-13 22:36:19.030393',24,NULL,'2024-08-13 22:36:19.030393','test',NULL,'Y','N','테스트 상담사','98e6fcd9d334f628c425926b95382d8d16df84df19f0df642dba8e642bb96651',NULL,'010-5555-5555','COUNSELOR');
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

-- Dump completed on 2024-08-13 22:36:46
