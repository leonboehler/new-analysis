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

CALL fn_register('Max','Mustermann','2002-06-03','07351-1111','Musterstraﬂe','101a/1','88400','Biberach an der Riﬂ','Baden-W¸rttemberg','Germany','max@mustermann.de','<<hash>>');

CALL fn_login('max@mustermann.de', '<<hash>>', '<<session_id>>');

CALL fn_verify('1234');

CALL fn_logout('max@mustermann.de');

CALL fn_add_readiness(1 /*USER-ID*/,'2020-03-21 16:00:00','2020-03-21 18:30:00');

CALL fn_add_assignment(3 /*USER-ID*/,2 /*LOCATION-ID*/);

CALL fn_add_location('Birkenwald', 'Der Buchenwald neben der Kirche', '88400', 'Biberach an der Riﬂ', 'Germany', 19.311143, 1.582031);

CALL fn_add_bucket('AA:CC:DD:EE:FF:AB','Eimer 1', 50 /*MAX-TOADS*/, 1/*LOCATION-ID*/);

CALL fn_add_station('AA:CC:DD:EE:FF:BB', 1 /*LOCATION-ID*/, 19.311143, 1.582031);

INSERT INTO rt_bucket(mac, toads_count) VALUES ('AA:CC:DD:EE:FF:AB',10);

CALL fn_inc_toads('AA:CC:DD:EE:FF:GG', 10);

CALL fn_empty_bucket(1 /*BUCKET-ID*/,1 /*USER-ID*/);

UPDATE st_user SET lastname = 'Musetfrau',/* ,... */ WHERE mail = 1;
UPDATE st_location SET name = 'Neuer Name' WHERE id = 1;
UPDATE st_bucket SET name = 'Neuer Name' WHERE id = 1;

DELETE FROM st_user WHERE id = 1;
DELETE FROM st_location WHERE id = 1;
DELETE FROM st_bucket WHERE id = 2;
DELETE FROM st_sensor WHERE id = 1;

SELECT * FROM ui_location;

SELECT * FROM ui_bucket;


SELECT * FROM ui_user;

SELECT * FROM ui_readiness WHERE user_mail = 'max@mustermann.de';

SELECT * FROM ui_assignment WHERE user_mail = 'max@mustermann.de';

SELECT * FROM ui_statistics;
