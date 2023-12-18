# flexmoney_intern_assignment

Project Overview
Folder Structure
The project consists of two main folders:

1. flex - Frontend
The flex folder is dedicated to the frontend, implemented using React. It collects user details through a form and sends this information to the backend via an API.

2. yoga_backend - Backend
The yoga_backend folder houses the Django backend. It handles the API requests, performs validations such as age checks, and stores user information in the database.

Frontend Implementation
In the flex folder, the frontend is developed using React. The user fills out a form, and upon clicking the submit button, the information is sent to the backend API. If there are any errors during submission, they are displayed on the frontend.In the frontend, user information such as name, age, and preferred class batch is collected. If the user is a new customer, a new customer ID is generated for them. For existing customers, their already existing customer ID is used which the customer as to provide. This customer ID is then sent to the backend, where the corresponding user details are either created or updated based on whether the user is new or existing. The customer ID serves as a unique identifier, ensuring proper handling of user data in the backend, either by creating a new record for new users or updating existing records for returning users.The inclusion of the "cid" (Customer ID) serves a dual purpose in our system. Primarily, it functions as a primary key, ensuring each customer record has a unique identifier. Additionally, this design choice contributes to the efficiency of our database by minimizing redundancies, thereby optimizing the overall structure for improved data management.

Backend Implementation
The backend logic is implemented in the yoga_backend folder using Django. When the API receives data, it performs validations like checking the user's age. If the user is new, we create a new entry in database else if user is not new then for existing users, the flexibility to modify their chosen batch for a specific month is provided. In the case of existing users, the system allows them to update their batch preference for a particular month. This functionality ensures that we maintain comprehensive records in our database table, capturing the association between each user, their chosen batch, and the corresponding month. This approach enables us to track and manage the dynamic preferences of existing users over different months.
 
The backend consists of two main tables in the database:

1. Customer Table
Fields: cid (Customer ID), name, age . 
2. MonthlyClasses Table
Fields: cid (Customer ID), month, year, batch, feestatus
 

Customer Table:

Fields:

cid (Customer ID): Primary key, auto-incremented integer, uniquely identifies each customer.
name: String field, represents the name of the customer.
age: Integer field, stores the age of the customer.

The Customer table serves as a repository for user-related information.
The cid field acts as the primary key, ensuring a unique identifier for each customer.
The name field stores the name of the customer.
The age field holds the age information of the customer.

MonthlyClasses Table:

Fields:

cid (Customer ID): Foreign key, establishes a relationship with the cid field in the Customer table.
month: Integer field, denotes the month of the class enrollment.
year: Integer field, represents the year of the class enrollment.
batch: String field, indicates the preferred batch chosen by the customer for that month.
feestatus: Boolean field, signifies the payment status for the enrolled class.

In this table we use cid,month,year combined together as composite key as we cant have primary key by single attribute for this table.
Explanation:

The MonthlyClasses table is designed to store information about class enrollments.
 The cid field acts as a foreign key, establishing a link with the cid field in the Customer table, creating a relationship between the two tables.
The month and year fields specify when the class enrollment occurs.
The batch field indicates the preferred batch chosen by the customer for that specific month.
The feestatus field, a boolean, represents the payment status for the enrolled class.

![ER DIAGRAM](https://github.com/nikhilkumar18/flexmoney_intern_assignment/blob/master/er%20diagram1.jpg)

In above er diagram we can see cid as primarykey for customer table and in monthly classes table cid,month,year combined as Composite primary key and cid of monthly classes as foreign key to customers table.


Admin Panel
To check and verify the stored data, the Django admin panel provides an interface. You can access it by navigating to the /admin endpoint after deploying the backend.


The complete implementation of my project has been explained in below video:

NOTE:THE Audio of the video is low. So try to listen in high volume (>90) or use earphones.

URL:
https://youtu.be/rGCUvoEZXlg?feature=shared





