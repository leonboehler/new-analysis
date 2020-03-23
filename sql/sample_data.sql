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


CALL fn_register('Max','Mustermann','2002-06-03','88400','Biberach an der Riﬂ','max@mustermann.de','<<hash>>');

CALL fn_login('max@mustermann.de', '<<hash>>');
CALL fn_logout('max@mustermann.de');

CALL fn_add_readiness(1 /*USER-ID*/,'2020-03-21 16:00:00','2020-03-21 18:30:00');
CALL fn_add_location('Buchenwald', 'Der Buchenwald neben der Kirche', '88400', 'Biberach an der Riﬂ', 'Germany', 19.311143, 1.582031);
CALL fn_add_bucket('AA:CC:DD:EE:FF:AA','Eimer 1', 50 /*MAX-TOADS*/, 1/*LOCATION-ID*/);
CALL fn_add_station('AA:CC:DD:EE:FF:BB', 1 /*LOCATION-ID*/, 19.311143, 1.582031);

INSERT INTO st_sensor(mac, bucket_id) VALUES('AA:CC:DD:EE:FF:GG',(SELECT id FROM st_bucket LIMIT 1));

INSERT INTO rt_bucket(mac, toads_count) VALUES ('AA:CC:DD:EE:FF:GG',10);

CALL fn_inc_toads('AA:CC:DD:EE:FF:GG', 10);
CALL fn_empty_bucket(1 /*BUCKET-ID*/,1 /*USER-ID*/);

UPDATE st_user SET lastname = 'Musetfrau',/* ,... */ WHERE id = 1;
UPDATE st_location SET name = 'Neuer Name' WHERE id = 1;
UPDATE st_bucket SET name = 'Neuer Name' WHERE id = 1;

DELETE FROM st_user WHERE id = 1;
DELETE FROM st_location WHERE id = 1;
DELETE FROM st_bucket WHERE id = 2;
DELETE FROM st_sensor WHERE id = 1;

SELECT * FROM ui_location;

SELECT * FROM ui_bucket;

SELECT * FROM ui_user;

SELECT * FROM ui_readiness;

SELECT * FROM ui_statistics;
