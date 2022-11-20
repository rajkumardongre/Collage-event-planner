id, 
clubID,
title, 
shortDescription, 
description, 
sanitizedHtml,
fees, 
club, 
contactName,
contactPhoneNumber,
registrationStartDate,
registrationEndDate,
publishOn

create table events(
id int NOT NULL AUTO_INCREMENT,
clubID int NOT NULL, 
title varchar(225) NOT NULL,
shortDescription LONGTEXT NOT NULL, 
description LONGTEXT NOT NULL, 
fees double(6,2) NOT NULL,
club varchar(225),
contactName varchar(255) NOT NULL,
contactPhoneNumber varchar(255) NOT NULL,
registrationStartDate DATE NOT NULL,
registrationEndDate DATE NOT NULL,
publishOn DATE DEFAULT (CURRENT_DATE),
PRIMARY KEY (id, title)
);

create table clubs(
id int NOT NULL AUTO_INCREMENT, 
name varchar(255) NOT NULL ,
email varchar(255) NOT NULL ,
password varchar(255) NOT NULL,
PRIMARY KEY (id, name, email)
);

create table registrations(
id int NOT NULL AUTO_INCREMENT,
clubID int NOT NULL, 
eventID int NOT NULL,
name varchar(255) NOT NULL,
phoneNumber varchar(15) NOT NULL,
email varchar(255) NOT NULL,
prnNumber varchar(10) NOT NULL,
year int NOT NULL,
division varchar(20) NOT NULL,
PRIMARY KEY (id)
);

=========================================
ADDING CLUBS : 
insert into clubs(name, email, password) value ('GDSC','gdsc@vit.edu','12345678');