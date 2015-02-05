
drop database if exists licai;
create database licai DEFAULT CHARACTER SET utf8;
use licai;
set names utf8;
SET SESSION storage_engine = "InnoDB";
SET SESSION time_zone = '+8:00';
ALTER DATABASE CHARACTER SET "utf8";


create table huobixing(
    id          varchar(50)         NOT NULL,
    name        varchar(50)         NOT NULL,
    profit      float               NOT NULL,
    increase     varchar(50)        NOT NULL,
    primary key(id)
) default charset = utf8;
insert into huobixing(id,name,profit,increase) values('710502','富安达货币B','8.6177','+8.05%');
insert into huobixing(id,name,profit,increase) values('710501','富安达货币A','8.5526','+7.79%');
insert into huobixing(id,name,profit,increase) values('000710','交银现金宝','1.0191','+6.87%');
insert into huobixing(id,name,profit,increase) values('620011','惠理金元宝B','1.5924','+6.83%');
insert into huobixing(id,name,profit,increase) values('240021','华宝活期通B','0.9749','+6.80%');


create table licaibao(
    id          varchar(50)         NOT NULL,
    name        varchar(50)         NOT NULL,
    profit      float               NOT NULL,
    increase     varchar(50)        NOT NULL,
    primary key(id)
) default charset = utf8;
insert into licaibao(id,name,profit,increase) values('519700','交银主题','1.1760','+45.07%');
insert into licaibao(id,name,profit,increase) values('610002','信达精华','1.6700','+39.05%');
insert into licaibao(id,name,profit,increase) values('460002','华泰成长','1.3775','+36.96%');
insert into licaibao(id,name,profit,increase) values('000598','长盛正泰','1.3730','+36.62%');
insert into licaibao(id,name,profit,increase) values('540003','汇丰策略','1.5501','+34.16%');
