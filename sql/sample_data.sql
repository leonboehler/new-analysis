/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : sample_data.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Fill tables with sample data
* 
/**********************************************************************/


INSERT INTO user(firstname, lastname, birthday,plz,city,password,mail) VALUES('Max','Mustermann','2002-06-03','88400','Biberach an der Riﬂ','<<hash>>', 'max@mustermann.de');

INSERT INTO location(name, latitude, longitude) VALUES('Buchenwald', 19.311143, 1.582031);

INSERT INTO bucket(name) VALUES('Eimer 23');

INSERT INTO empty_bucket(bucket_id, user_id) VALUES(1,1);

SELECT fn_login('max@mustermann.de', '<<hash>>');

SELECT fn_logout('max@mustermann.de');