-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smoke
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameID` int NOT NULL,
  `title` tinytext,
  `publish_date` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `purchase_count` int DEFAULT NULL,
  `age_rating` int DEFAULT NULL,
  `thumbnail` varchar(2000) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`gameID`),
  KEY `age_rating` (`age_rating`),
  CONSTRAINT `game_ibfk_2` FOREIGN KEY (`age_rating`) REFERENCES `agerating` (`ageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Neon City: Night Drift','2026-03-29',80,1,3,'placeholder.jpg','Fast-paced arcade racing game set in a glowing cyberpunk city. Master tight corners, chain drifts, and earn style points to climb the underground racing scene. Customize your cars, challenge rivals, and dominate the streets after dark.'),(2,'Mystic Vale: Echoes of Ash','2026-03-29',60,2,3,'placeholder.jpg','Fantasy survival adventure set in a cursed world filled with ancient ruins, hidden creatures, and forgotten magic.'),(3,'Star Forge','2026-03-29',60,3,3,'placeholder.jpg','Sci-fi strategy game where players build colonies, manage fleets, and expand across a dangerous galaxy. Do you have what it takes to lead an empire?'),(4,'Striker Elite World Football','2026-03-29',40,4,2,'placeholder.jpg','A quick-paced soccer simulation where you can build your dream team and compete on the global stage! Take control of every pass, shot, and tackle with responsive gameplay, or manage your squad through an in-depth career mode.'),(5,'Harvest Haven','2026-03-29',20,4,1,'placeholder.jpg','Harvest Haven is a relaxing farming/life simulator where you rebuild a forgotten countryside farm. Grow all kinds of crops, raise animals, decorate your home, and build relationships with the town\'s unique residents.');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-30 14:22:09
