create database db_clinica;

use db_clinica;

create table usuarios (

id_user int(15) AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
surname VARCHAR(50)NOT NULL,
rol VARCHAR(50)NOT NULL
);

create table servicios (

id_servicios int(15) AUTO_INCREMENT PRIMARY KEY,
servicio VARCHAR(50) NOT NULL,
descripción VARCHAR(200) NOT NULL

);