-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema forum_ufmg
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema forum_ufmg
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `forum_ufmg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `forum_ufmg` ;

-- -----------------------------------------------------
-- Table `forum_ufmg`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_ufmg`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forum_ufmg`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_ufmg`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `matricula` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo` ENUM('Aluno', 'Professor', 'Técnico-Administrativo') NOT NULL,
  `criado_em` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`matricula` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forum_ufmg`.`topicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_ufmg`.`topicos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `descricao` TEXT NOT NULL,
  `categoria_id` INT NOT NULL,
  `imagem` VARCHAR(255) NULL DEFAULT NULL,
  `usuario_id` INT NOT NULL,
  `criado_em` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `categoria_id_idx` (`categoria_id` ASC) VISIBLE,
  INDEX `usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `forum_ufmg`.`categorias` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forum_ufmg`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forum_ufmg`.`respostas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_ufmg`.`respostas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topico_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `conteudo` TEXT NOT NULL,
  `criada_em` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `topico_id_idx` (`topico_id` ASC) VISIBLE,
  INDEX `usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `topico_id_resp`
    FOREIGN KEY (`topico_id`)
    REFERENCES `forum_ufmg`.`topicos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usuario_id_resp`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forum_ufmg`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forum_ufmg`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_ufmg`.`tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forum_ufmg`.`topico_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_ufmg`.`topico_tags` (
  `topico_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`topico_id`, `tag_id`),
  INDEX `tag_id` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `topico_tags_ibfk_1`
    FOREIGN KEY (`topico_id`)
    REFERENCES `forum_ufmg`.`topicos` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `topico_tags_ibfk_2`
    FOREIGN KEY (`tag_id`)
    REFERENCES `forum_ufmg`.`tags` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
