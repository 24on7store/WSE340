----QUERY 1

INSERT INTO account (
    account_firstname, 
    account_lastname,
    account_email,
    account_password
)
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
);


----QUERY 2
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

---QUERY 3
DELETE FROM account
WHERE account_email = 'tony@starkent.com';


----QUERY 4
UPDATE inventory
SET inv_description = REPLACE(
    inv_description,
    'small interiors',
    'a huge interior'
)
WHERE inv_make = 'GM'
AND inv_model = 'Hummer';

---QUERY 5
SELECT inv.inv_make, inv.inv_model, cls.classification_name
FROM inventory inv
INNER JOIN classification cls
ON inv.classification_id = cls.classification_id
WHERE cls.classification_name = 'Sport';


---QUERY 6
UPDATE inventory
SET
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');







