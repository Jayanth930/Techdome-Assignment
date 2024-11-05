
# Loan App

## About The Project
 I Tried to complete all the tasks as per requirement starting from Auth , Loan creation , Admin approval etc,,.

### Getting Started

 For this project Node , npm should be installed in your computer
 
 For Node installation , Refer : [Node Installation Guide](https://nodejs.org/en/download/source-code)
 
  Verify the Node and npm installation with 
  ```sh
  node --version
  ```
  ```sh
  npm  --version 
  ```
If you face difficulty with Nodejs Installtion Refer
[Medium trouble shooting Guide](https://medium.com/@asiandigitalhub/troubleshooting-installation-issues-for-node-js-40ef0261e54c)

### Setting Up the Project
1. Clone the Repo
```sh
git clone https://github.com/Jayanth930/Techdome-Assignmentin8-assignment
```
### Setting Up Frontend
1. Move to "/frontend" folder
```sh
cd frontend
```
2. Install the dependencies
```sh
npm install 
```
3. Setup dotenv
```sh
touch .env
```
* Add VITE_BACKEND_URL = http://localhost:${port} in -> port = port number should be the one you will be adding in backend's folder .env file
4. start the frontend 
```sh
npm run dev
```
### Setting Up Backend

1. Move to "/backend" folder from root
```sh
cd backend or cd ../backend (if you are in frontend folder)
```
2. Install the dependencies
```sh
npm install 
```
3. Setup dotenv
```sh
touch .env
```
* Add PORT = 3500 in .env file
* ADD SECRET = any value
* Add DATABASE_URL="postgresql://postgres:{password}@localhost:5432/{databasename}?schema=public"
* {password} = write your local password of PostgreSQL
* {databasename} = create a database in your local system of postgresSQL
* It can be any Database Url(postgreSQL) not only local as long as you have the DATABASE_URL and database setup 

4. Setup PosrgreSQL db by running
```sh 
npm run deploy
```
* The above script initializes and applies migrations to the database link provided in .env
5. Now install the prisma client by running
```sh
npm i @prisma/client
```
* when you ran npm run deploy prisma itself suggests you to install the prisma-client
5. Now start the server 
```sh
npm run start 
```

### Trouble Shooting Guide
* The major problem might arise would be due to verison problem and also with global packages verion vs local package version
* In that regard one issue I faced was due to verison difference between global and local typescript version , so if any issues faced regarding setup , its better to uninstall global typescript package.



## Look Ups 
1. I provided request.rest and admin.rest inside backend folder which basically includes all the available api endpoints.

## Links
Frontend Link : [https://techdome-frontend.netlify.app/](https://techdome-frontend.netlify.app/)

Backend Link : [https://techdome-assignment.onrender.com/](https://techdome-assignment.onrender.com/)
As this backend is on render it takes some time to spin up the container