-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd-fiorotti
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bd-fiorotti` ;

-- -----------------------------------------------------
-- Schema bd-fiorotti
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd-fiorotti` DEFAULT CHARACTER SET utf8mb4 ;
USE `bd-fiorotti` ;

-- -----------------------------------------------------
-- Table `bd-fiorotti`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd-fiorotti`.`users` ;

CREATE TABLE IF NOT EXISTS `bd-fiorotti`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(120) NOT NULL,
  `user_password` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd-fiorotti`.`navers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd-fiorotti`.`navers` ;

CREATE TABLE IF NOT EXISTS `bd-fiorotti`.`navers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `users_id` INT(11) NOT NULL,
  `naver_name` VARCHAR(250) NOT NULL,
  `birthdate` DATE NOT NULL,
  `admission_date` DATE NOT NULL,
  `job_role` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users` (`users_id` ASC) ,
  CONSTRAINT `fk_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `bd-fiorotti`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd-fiorotti`.`projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd-fiorotti`.`projects` ;

CREATE TABLE IF NOT EXISTS `bd-fiorotti`.`projects` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(250) NOT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_projects_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_projects_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `bd-fiorotti`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd-fiorotti`.`projects_navers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bd-fiorotti`.`projects_navers` ;

CREATE TABLE IF NOT EXISTS `bd-fiorotti`.`projects_navers` (
  `projects_id` INT(11) NOT NULL,
  `navers_id` INT(11) NOT NULL,
  PRIMARY KEY (`projects_id`, `navers_id`),
  INDEX `fk_projects_has_navers_navers1_idx` (`navers_id` ASC) ,
  INDEX `fk_projects_has_navers_projects1_idx` (`projects_id` ASC) ,
  CONSTRAINT `fk_projects_has_navers_navers1`
    FOREIGN KEY (`navers_id`)
    REFERENCES `bd-fiorotti`.`navers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_projects_has_navers_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `bd-fiorotti`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

select*from navers

