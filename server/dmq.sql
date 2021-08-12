
-- Job/Homepage
-- Display job data 
SELECT id AS 'ID', title AS 'Title', company AS 'Company', city AS 'City', state AS 'State', country AS 'Country',
    decription AS 'description', status AS 'Status'
FROM Job;

-- Add a job
INSERT INTO Job (title, company, city, state, country, description, status)
VALUES (:title_input, :company_input, :city_input, :state_input, :country_input, :description_input, :status_input);

-- Search a job by id, title, company, city, state, country, status
SELECT id AS 'ID', title AS 'Title', company AS 'Company', city AS 'City', state as 'State', Country AS 'Country', status AS 'Status'
FROM Job WHERE title = :title_input OR company = :company_input OR city = :city_input OR state = :state_input OR country = :country_input;

-- Update a Job
UPDATE Job
SET title = :title_input, company = :company_input, city = :city_input, state = :state_input, description = :description_input, state = :status_input
WHERE id = :id_input;

DELETE FROM Job
WHERE id = :id_input;


-- Applications PAge
-- Display app data
SELECT appID AS 'App ID', jobTitle AS 'Job Title', company AS 'Company', location AS 'Location', appDate AS 'Date', response AS 'Response', outcome AS 'Outcome'
FROM Applications;

-- Add an app
INSERT INTO Applications (jobTitle, company, location, appDate, response, outcome)
VALUES (:jobTitle_input, :company_input, :location_input, :appDate_input, :response_input, :outcome_input);

-- Search for an app
SELECT appID AS 'App ID', jobTitle AS 'Job Title', company AS 'Company', location AS 'Location', appDate AS 'Date', response AS 'Response', outcome AS 'Outcome'
FROM Applications WHERE appID = :appID_input OR jobTitle = :jobTitle_input OR company = :company_input OR location = :location_input OR appDate = :appDate_input
OR response = :response_input OR outcome = :outcome_input;

-- Update an app
UPDATE Applications
SET jobTitle = :jobTitle_input, company = :company_input, location = :location_input, appDate = :appDate_input, response = :response_input, outcome = :outcome_input,
WHERE appID = :appID_input;

-- Delete an app
DELETE FROM Applications
WHERE appID = :appID_input;


-- Contacts page
-- Display contacts data from Contacts page

SELECT contactID AS 'Contact ID', name AS 'Name', info AS 'Info', email AS 'Email', phoneNumber as 'Phone'
FROM Contacts;


-- Add a contact
INSERT INTO Contacts (name, info, email, phoneNumber)
VALUES (:contactID_input, :name_input, :info_input, :email_input, :phoneNumber_input);

-- Search a contact by id, name, info, email, or phone number
SELECT contactID AS 'Contact ID', name AS 'Name', info AS 'Info', email AS 'Email', phoneNumber as 'Phone'
FROM Contacts WHERE contactID = :contactID_input OR name = :name_input OR email = :email_input OR phoneNumber = :phoneNumber_input;

-- Update a contact
UPDATE Contacts
SET name = :name_input, info = :info_input, email = :email_input, phoneNumber = :phoneNumber_input,
WHERE contactID = :contactID_input;

-- Delete a Contact
DELETE FROM contacts
WHERE contactID = :contactID_input;


