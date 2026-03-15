const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/* base de datos */
const uri = "mongodb+srv://daviidcaiicedo63_db_user:D5SqEbycJKsU8qic@cluster0.7i85nlo.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

let db;

async function conectarDB(){
await client.connect();
db = client.db("evento");
console.log("Base de datos conectada");
}

conectarDB();


app.use(bodyParser.json());

/* carpetas públicas */

app.use(express.static("public"));
app.use("/admin", express.static(path.join(__dirname,"admin")));

/* crear tabla */



/* guardar confirmación */

app.post("/confirmar", async (req,res)=>{

const {nombre,telefono,correo,asistencia} = req.body;

await db.collection("asistentes").insertOne({
nombre,
telefono,
correo,
asistencia
});

res.json({mensaje:"ok"});

});

/* obtener datos admin */

app.get("/admin/datos", async (req,res)=>{

const datos = await db.collection("asistentes").find().toArray();

res.json(datos);

});

/* abrir panel */

app.get("/panel",(req,res)=>{

res.sendFile(path.join(__dirname,"admin","panel.html"));

});

/* puerto para hosting */

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{

console.log("Servidor corriendo en puerto " + PORT);

});