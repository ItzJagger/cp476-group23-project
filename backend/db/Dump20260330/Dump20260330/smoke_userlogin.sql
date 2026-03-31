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
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `username` varchar(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `hash` varchar(128) DEFAULT NULL,
  `salt` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES ('_Spinex_','johndoe@hotmail.com','d1391c76ae48808a1b8a0127c4d984c5','qddYXCGDTktKheyz'),('architecturalWeeble','weeble@gmail.com','f086136f82bd9f2c645396a2ec946396','nUE1Y22VP9wWbRhn'),('BeautifulPixie4378','amyamy@yahoo.com','17d9edb1cdaacfe2f32552d7b179c9ac','1bI6eb7BbuFOcGuE'),('cooldude','mycoolemail@gmail.com','9d90b25cdf09ad4b01c23c55e66113ad','i48m78NAykAuOMg1'),('creativeJagger','jagger@gmail.com','5294c0a839f91efdd71333a476a197e1','Sv3X0v9mcV7Lf7G7'),('GameManMani4c','maniac@gmail.com','04fc9814ab3229fd5c29d39d06b88a19','vhpqY8U4NHdLqylT'),('lapsap900','sappy12@gmailcom','fe22d174d4c59186e24d3c32c2c9555e','2H07rSkLm9cMbBNt'),('MasterOfLEMONS777','randomperson@yahoo.com','e99cd0b847213a963956673618294877','M8dsZQ8Mi0Kgcjp8'),('Midnight Mania','midmaniastudios@gmail.com','aed6b44937282130f15eab576be4a7e9','vJ6TccER5fuweXoE'),('NovaCore','novacstudios@novacore.com','124e60716b50976efbcdfeb608d95c58','c5Y8xbcSgJ5yglqf'),('techyGunn3r','gunn3r@gmail.com','d7c99493cb37806845c27d1f30bae097','CI2GkfHyX2Rz9XRV'),('xFireWizardx','castfireball@yahoo.com','e7fbd01e6ff846f9f9af91f400f0830a','NUl38J8uoGZCkjHr');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
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
