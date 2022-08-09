INSERT INTO USER_INFO (username, password) VALUES
('inesn','5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8'),
('ricky', 'A4BD1D3A69AA0EA6FFB1298C8C26BE4B333526CAE7D27F2362F89857157701CE'),
('diogo','5986BDE91DB988EBF22BC8AB401D83AF9BFC9714EF4AFE2415AD8B02C8A98743');

INSERT INTO PROJECT (name, description, project_owner) VALUES
('DAW Project','Example description','inesn'),
('LS Project','Example','inesn'),
('PS Project','description','ricky'),
('LIC Project','Short description','diogo');

INSERT INTO LABEL (id, name) VALUES 
(1,'defect'),
(2,'new-functionality'),
(3,'exploration');

INSERT INTO STATE (id, name) VALUES
(1,'Open'),
(2,'In Progress'),
(3,'In Review'),
(4,'closed'),
(5,'archived');

INSERT INTO ISSUE (name, description, created, closed, state_id, project_id, label_id,issue_owner) VALUES
('issue1','adding a new functionality','2022-01-01 00:00:01',null,2,1,2,'inesn'),
('issue2','resolve an error','2022-02-02 12:00:01',null,2,2,1,'inesn'),
('issue3','add a test','2022-03-01 00:00:01','2022-03-03 15:30:01',4,3,2,'diogo'),
('issue4','create a final release','2021-09-03 12:00:01',null,3,2,2,'ricky'),
('issue5','adding a new functionality','2022-03-01 00:00:01',null,2,2,2,'ricky'),
('issue6','arquivado','2022-03-01 00:00:01','2022-03-01 10:00:01',5,2,2,'ricky');

INSERT INTO comment (ttext,created,project_id,issue_id,comment_owner) VALUES
('testComme1','2022-03-01 23:00:01',1,1,'inesn'),
('testComme2','2022-05-24 05:03:01',1,1,'diogo'),
('testComme3','2022-05-22 00:00:10',2,4,'ricky');