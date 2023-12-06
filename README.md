# Library-Management

# Features:
1. Login and Register
2. 2 Roles(staff and student)
3. Users can register
4. Profile page showing issued books, past transactions, and other information
5. Admin can add books, add new members, add new transactions, end transactions
6. Non-admin users(students and staff) can issue books, view current issued books and
   past transactions. They need to contact the admin to end the transaction for security
   purposes.


Setup:

# Frontend Setup 

1. Enter the frontend directory
   `cd frontend`

2. Run `npm install` to install dependencies

3. Create a `.env` file and create variables as mentioned in the `.env.example` with the values

4. Run 'nodemon server.js' or 'node server.js' to start the server.



# Backend Setup

1. Enter the backend directory
    `cd backend`

2. Run `npm install` to install dependencies

3. Create a MongoDB account on MongoDB Atlas and get the MONOGO_URL for connecting the server and the Database

4. Create a `.env` file and create variables as mentioned in the `.env.example` with the values

5. Run `nodemon server.js` to start the server [Should have installed nodemon globally]



# Database Setup(for Admin login)

1. After connecting to the MongoDB Atlas, in the collections tab, in 'users' collection, create a new document with the following fields:
    1. userType: "Staff"
    2. email: String
    3. password: Refer to below steps to generate a hashed password
    4. isAdmin: true
    5. userFullName: String
    6. address: String
    7. age: String
    8. dob: String
    9. employeeId: String
   10. gender: String
   11. mobileNumber: String

2. To generate a hashed password, make a new .js file not necessarily in the project directory and run the following code:

import bcrypt from "bcrypt";
const salt = await bcrypt.genSalt(10);
console.log(await bcrypt.hash("enter_your_password_here", salt));

3. Copy the hashed password and paste it in the password field in the document created in step 1

4. After that  you can login with the employeeId and the password you entered in Step 2. to login as an admin.


# Technologies Used

1. MongoDB
2. Express.js
3. React.js
4. Node.js

Contact me at:
Email: lci2020014@iiitl.ac.in

