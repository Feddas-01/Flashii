create database questoes;
use questoes;


create table categoria(
    id_cat int primary key not null,
    nome varchar(50) not null,
    descrição varchar(100) );


    create table task(
    id_task int primary key not null,
id_cat int not null;
    foreign key (id_cat) references categoria(id_cat) int not null,
    enunciado text(500) );

    create table alternativas(
    id_alter int primary key not null,
    id_task int not null;
    foreign key (id_task) references task(id_task) int not null,
    texto text(500) not null,
    opcao bit not null);