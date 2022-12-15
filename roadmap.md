Create database
    create table
    seed data in the table
    a good practise is to createa  migration.sql file and a seed.sql file 

Install npm dependencies
    1. postgress
        import postgres from "postgres"
        const sql = postgres({database: "<datbase name>"});
        npm install postgress

    2. express
        import express from "express"
        const app = express();
        npm install express

    3. nodemon
        import nodemon from "nodemon"
        npm install --save-dev nodemon (nodemon is not required in production, so it can be a dev dependency)

