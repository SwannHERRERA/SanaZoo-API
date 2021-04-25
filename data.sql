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
VALUES (1, 'ADMIN', NOW(), NOW());
insert into User_Role (id, name, created_at, updated_at)
VALUES (2, 'VENDEUR', NOW(), NOW());
insert into User_Role (id, name, created_at, updated_at)
VALUES (3, 'AGENT D\'ACCUEIL', NOW(), NOW());
insert into User_Role (id, name, created_at, updated_at)
VALUES (4, 'AGENT d\'ENTRETIENT', NOW(), NOW());
insert into User_Role (id, name, created_at, updated_at)
VALUES (5, 'VETERINAIRE', NOW(), NOW());
insert into User_Role (id, name, created_at, updated_at)
VALUES (6, 'VISITEUR', NOW(), NOW());
insert into User (first_name, last_name, email, birthdate, password, user_role_id, created_at, updated_at)
VALUES ('Admin', 'Admin', 'Admin@Admin.com', '2000-12-20 13:21:00', '', 1, NOW(), NOW()),
       ('Employee', 'Employee', 'Employee@Employee.com', '2000-08-20 13:22:00', '', 2, NOW(), NOW()),
       ('VETERINAIRE', 'VETERINAIRE', 'VETERINAIRE@VETERINAIRE.com', '2000-08-20 13:22:00', '', 3, NOW(), NOW()),
       ('CLIENT', 'CLIENT', 'CLIENT@CLIENT.com', '2000-08-20 13:22:00', '', 4, NOW(), NOW());