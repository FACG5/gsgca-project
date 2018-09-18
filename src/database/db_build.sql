BEGIN ;
DROP TABLE IF EXISTS admin,cohort,student,project,std_project CASCADE;

CREATE TABLE admin (
id SERIAL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
password VARCHAR(150) NOT NULL
);
CREATE TABLE cohort (
id SERIAL PRIMARY KEY,
name VARCHAR(20),
description TEXT,
githublink VARCHAR(200),
img_url VARCHAR(200)
);
CREATE TABLE student (
id SERIAL PRIMARY KEY,
name VARCHAR(20),
username VARCHAR(20),
githublink VARCHAR(200),
img_url VARCHAR(200),
cohort_id INTEGER REFERENCES cohort(id)   ON DELETE CASCADE
);

CREATE TABLE project (
id SERIAL PRIMARY KEY,
name VARCHAR(50),
description TEXT,
githublink VARCHAR(200),
websitelink VARCHAR(200),
img_url VARCHAR(200),
cohort_id INTEGER REFERENCES cohort(id)   ON DELETE CASCADE
);


CREATE TABLE std_project (
id SERIAL PRIMARY KEY,
std_id INTEGER REFERENCES student(id)  ON DELETE CASCADE,
project_id INTEGER REFERENCES project(id)   ON DELETE CASCADE
);

INSERT INTO admin (username,password) values ('admin',
'$2y$12$yhE8ruRCa7kJ9P8z.CqOEe4A6U1P9E8dfF1S1aRonYn6d9VWjrz1C');


INSERT INTO cohort (name,description,img_url,githublink) values
 ('FACG5','description','https://avatars3.githubusercontent.com/u/37267782?s=200&v=4','https://github.com/FACG5'),
('FACG2','description','https://avatars3.githubusercontent.com/u/37267782?s=200&v=4','https://github.com/FACG5'),
('FACG3','description','https://avatars3.githubusercontent.com/u/37267782?s=200&v=4','https://github.com/FACG5'),
('FACG4','description','https://avatars3.githubusercontent.com/u/37267782?s=200&v=4','https://github.com/FACG5'),
('FACG1','description','https://avatars3.githubusercontent.com/u/37267782?s=200&v=4','https://github.com/FACG5');




INSERT INTO student (name,username,githublink,img_url,cohort_id) values
('Lubna Abd','lubnaabd','https://github.com/lubnaabd','https://avatars1.githubusercontent.com/u/26024284?s=460&v=4',1),
('Ibrahem Ali','HemaSAli','https://github.com/hemasali','https://avatars3.githubusercontent.com/u/34215823?s=460&v=4',1),
('Ali Haj Ahmed ','ali-7','https://github.com/ali-7','https://avatars0.githubusercontent.com/u/36124895?s=460&v=4',1),
('Lubna Abd','lubnaabd','https://github.com/lubnaabd','https://avatars1.githubusercontent.com/u/26024284?s=460&v=4',2),
('Ibrahem Ali','HemaSAli','https://github.com/hemasali','https://avatars3.githubusercontent.com/u/34215823?s=460&v=4',2),
('Ali Haj Ahmed ','ali-7','https://github.com/ali-7','https://avatars0.githubusercontent.com/u/36124895?s=460&v=4',3),
('Lubna Abd','lubnaabd','https://github.com/lubnaabd','https://avatars1.githubusercontent.com/u/26024284?s=460&v=4',3),
('Ibrahem Ali','HemaSAli','https://github.com/hemasali','https://avatars3.githubusercontent.com/u/34215823?s=460&v=4',4),
('Ali Haj Ahmed ','ali-7','https://github.com/ali-7','https://avatars0.githubusercontent.com/u/36124895?s=460&v=4',5);
INSERT INTO project (name , description, githublink, websitelink, cohort_id) values
('a','a','a','a',1),
('b','a','a','a',2),
('c','a','a','a',3),
('d','a','a','a',1);

INSERT INTO std_project (std_id,project_id) values 
(1,1),
(1,2);
COMMIT;
