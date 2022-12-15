import express from "express";
import nodemon from "nodemon";
import postgres from "postgres";
import cors from "cors";
import {readFile} from "node:fs/promises";

const sql = postgres({database: "users"});
const app = express();

app.use(express.json());
app.use(express.static("client")); //telling the server to use this path to run in front end
//app.use(cors()); //allows cross origin requests
// app.use(express.static());

// app.get("/person", (req, res)=>{
//     readFile("client/app.js", "utf-8").then((text)=>{
//         res.set("Content-Type", "application/javascript");
//         res.send(text);
//     })
// });

app.get("/api/person", (req, res)=>{
    sql `select * from person`.then((result)=>{
        res.json(result);
    });
});

app.get("/api/person/:id", (req, res)=>{
    const id = req.params.id;
    sql `select * from person where id = ${id}`.then((result)=>{
        res.json(result);
    });
});

app.post("/api/person", (req, res)=>{
    const {first_name, last_name, phone} = req.body;
    sql `insert into person (first_name, last_name, phone) values (${first_name}, ${last_name}, ${phone}) returning *`. then((results)=>{
        res.json(results[0]);
    })
})

app.patch("/api/person/:id", (req, res)=>{
    const id = req.params.id;
    const {first_name, last_name, phone} = req.body;

    sql `
        UPDATE person
        SET
        first_name = COALESCE(${first_name || null}, first_name),
        last_name = COALESCE(${last_name || null}, last_name),
        phone = COALESCE(${phone || null}, phone)
        WHERE id = ${id} RETURNING *
        `
    .then((results)=>{
        res.json(results[0]);
    });

});



app.listen(3000);
