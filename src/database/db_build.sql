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
img_url VARCHAR(1500)
);
CREATE TABLE student (
id SERIAL PRIMARY KEY,
name VARCHAR(20),
username VARCHAR(20),
githublink VARCHAR(200),
img_url VARCHAR(1500),
cohort_id INTEGER REFERENCES cohort(id)   ON DELETE CASCADE
);

CREATE TABLE project (
id SERIAL PRIMARY KEY,
name VARCHAR(50),
description TEXT,
githublink VARCHAR(200),
websitelink VARCHAR(200),
img_url VARCHAR(1500),
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


INSERT INTO project (name,description,githublink,websitelink,img_url,cohort_id) values 
('Project1','week10','https://github.com/FACG5/gsgca-project','https://github.com/FACG5/gsgca-project','https://camo.githubusercontent.com/3878dcaa3e270b593784eb1f1bc879d144824086/68747470733a2f2f66696c65732e6769747465722e696d2f656c612d7465616d2f656c612d7465616d2f594e5a462f53637265656e73686f742d66726f6d2d323031382d30392d31332d31342d31312d30392e706e67',1),
('Project2','week13','https://github.com/FACG5/gsgca-project','https://github.com/FACG5/gsgca-project','https://camo.githubusercontent.com/3878dcaa3e270b593784eb1f1bc879d144824086/68747470733a2f2f66696c65732e6769747465722e696d2f656c612d7465616d2f656c612d7465616d2f594e5a462f53637265656e73686f742d66726f6d2d323031382d30392d31332d31342d31312d30392e706e67',2),
('Project3','week16','https://github.com/FACG5/gsgca-project','https://github.com/FACG5/gsgca-project','https://camo.githubusercontent.com/3878dcaa3e270b593784eb1f1bc879d144824086/68747470733a2f2f66696c65732e6769747465722e696d2f656c612d7465616d2f656c612d7465616d2f594e5a462f53637265656e73686f742d66726f6d2d323031382d30392d31332d31342d31312d30392e706e67',2),
('Project4','week22','https://github.com/FACG5/gsgca-project','https://github.com/FACG5/gsgca-project','https://camo.githubusercontent.com/3878dcaa3e270b593784eb1f1bc879d144824086/68747470733a2f2f66696c65732e6769747465722e696d2f656c612d7465616d2f656c612d7465616d2f594e5a462f53637265656e73686f742d66726f6d2d323031382d30392d31332d31342d31312d30392e706e67',1),
('Project5','week8','https://github.com/FACG5/gsgca-project','https://github.com/FACG5/gsgca-project','https://camo.githubusercontent.com/3878dcaa3e270b593784eb1f1bc879d144824086/68747470733a2f2f66696c65732e6769747465722e696d2f656c612d7465616d2f656c612d7465616d2f594e5a462f53637265656e73686f742d66726f6d2d323031382d30392d31332d31342d31312d30392e706e67',3);

INSERT INTO std_project (std_id,project_id) values 
(1,1),
(1,2);

COMMIT;