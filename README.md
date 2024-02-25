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

1. Install Django and mysqlclient
```
pip install django
pip install mysqlclient
```

2. MySQL Setup
    * Install MySQL
    * Create database/schema named *real_estate_broker*
    * Create user named *dev* with password *123* with DBA role (full access to the above database)

3. Run Server
```
cd server
python manage.py makemigrations
python manage.py migrate 
python manage.py runserver [port]
```

## Tech Stack

### Frontend
1. ReactJS

### Backend
1. Django

### Database
MySQL
