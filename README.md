# Real Estate Broker
Full Stack Web Application developed using **React, Django & MySQL**. Course Project for CS253 - Software Development and Operations

## Build

```
git clone git@github.com:ChinmayPillai/Real_Estate_Broker_WebApp.git
```

### Client 
```
cd Client
npm install
npm run dev
```

### Server

1. Package Installations
```
pip install django
pip install mysqlclient
```

2. Database Setup
    * Install MySQL
    * Create database/schema named *real_estate_broker*
    * Create user named *dev* with password *123* with DBA role (full access to the above database)

3. Run Server
```
cd server
python manage.py makemigrations
python manage.py migrate 
python manage.py runserver
```

## Running the WebApp

### Create Admin Account
```
cd server
python manage.py createsuperuser
```

### Admin Login and Property Management:

1. Open admin UI at http://127.0.0.1:8000/admin
2. Start by logging in as the admin user. You'll be able to add new properties to the system by providing details like address, description, etc. Each property will be assigned a unique ID.
3.   Once a property is added, you can navigate to the user management section and associate the property ID with the relevant user's portfolio, effectively assigning ownership of that property.

### User Accounts and Order Placement:

1. Open User Website at http://localhost:5173/
2. To test user functionalities, register user accounts on the frontend website. Users can then log in and explore the application.
3. User can view all the listed properties on the broker website.
4. Users have the option to place orders on properties. There are two main order types:

- **Limit Orders**: Users can specify a desired price and quantity for a property. The order will only be executed if the market price reaches the user's specified limit.
- **Market Orders**: Users can purchase a property at the current market price. This is a quicker option but offers less control over the purchase price.
5. Users can add funds for buying and withdraw funds obtained from selling the properties. 

## Tech Stack

### Frontend
JavaScript
ReactJS
React-Router-Dom
Material UI
Bootstrap
HTML 5
CSS


### Backend
Python
Django
Django REST Framework
MySQLClient
Django CORS Headers

### Database
MySQL
