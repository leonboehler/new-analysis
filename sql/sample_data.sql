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

INSERT INTO st_location(name, latitude, longitude) VALUES('Buchenwald', 19.311143, 1.582031);

INSERT INTO st_bucket(name, location_id) VALUES('Eimer 23', (SELECT id FROM st_location LIMIT 1));
INSERT INTO st_readiness(location_id, user_id, start_ts, end_ts) VALUES((SELECT id FROM st_location LIMIT 1),(SELECT id FROM st_location LIMIT 1), NOW(), (NOW() + INTERVAL 1 DAY));

INSERT INTO st_sensor(mac, bucket_id) VALUES('AA:CC:DD:EE:FF:GG',(SELECT id FROM st_bucket LIMIT 1));


CALL fn_register('Max','Mustermann','2002-06-03','88400','Biberach an der Riﬂ','max@mustermann.de','<<hash>>');

CALL fn_login('max@mustermann.de', '<<hash>>');
CALL fn_logout('max@mustermann.de');

CALL fn_add_readiness(1,'2020-03-21 16:00:00','2020-03-21 18:30:00');

CALL fn_inc_toads('AA:CC:DD:EE:FF:GG', 10);

CALL fn_empty_bucket(1,1);

INSERT INTO rt_sensor(mac, toads_count) VALUES('AA:CC:DD:EE:FF:GG',5);

SELECT * FROM ui_location;

SELECT * FROM ui_bucket;

SELECT * FROM ui_user;

SELECT * FROM ui_readiness;
