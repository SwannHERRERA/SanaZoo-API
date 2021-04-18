insert into Pass_Type (id, name, price, created_at, updated_at)
VALUES (1, 'PASS Journée', 25, '2021-04-05', '2021-04-05');
insert into Pass_Type (id, name, price, created_at, updated_at)
VALUES (2, 'PASS Week-end', 35, '2021-04-05', '2021-04-05');
insert into Pass_Type (id, name, price, created_at, updated_at)
VALUES (3, 'PASS Annuel', 300, '2021-04-05', '2021-04-05');
insert into Pass_Type (id, name, price, created_at, updated_at)
VALUES (4, 'PASS 1daymonth', 180, '2021-04-05', '2021-04-05');
insert into Pass_Type (id, name, price, created_at, updated_at)
VALUES (5, 'PASS Escape game', 30, '2021-04-05', '2021-04-05');
insert into Pass_Type (id, name, price, created_at, updated_at)
VALUES (6, 'PASS Night', 40, '2021-04-05', '2021-04-05');
insert into User_Role (id, name, created_at, updated_at)
VALUES 
  (1, 'ADMIN', '2021-04-18', '2021-04-18'),
  (2, "EMPLOYEE", '2021-04-18', '2021-04-18'),
  (3, "VETERINARY", '2021-04-18', '2021-04-18'),
  (4, 'CLIENT', '2021-04-18', '2021-04-18');
insert into User (first_name, last_name, email, birthdate, password, user_role_id, created_at, updated_at)
VALUES ('Swann', 'HERRERA', 'swann@graines-octets.com', '2000-12-20 13:21:00', "", 1, '2021-04-18', '2021-04-18');