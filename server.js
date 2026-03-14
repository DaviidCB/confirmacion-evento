const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = new sqlite3.Database("database.db");

app.use(bodyParser.json());
app.use(express.static("public"));

/* crear tabla */

db.run(`
CREATE TABLE IF NOT EXISTS asistentes(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
telefono TEXT,
correo TEXT,
asistencia TEXT
)
`);

/* guardar confirmación */

app.post("/confirmar", (req,res)=>{

const {nombre,telefono,correo,asistencia} = req.body;

db.run(
"INSERT INTO asistentes(nombre,telefono,correo,asistencia) VALUES(?,?,?,?)",
[nombre,telefono,correo,asistencia]
);

res.json({mensaje:"ok"});

});

/* obtener datos para admin */

app.get("/admin/datos",(req,res)=>{

db.all("SELECT * FROM asistentes",(err,rows)=>{
if(err){
res.json([]);
return;
}

res.json(rows);

});

});

/* mostrar panel admin */

app.get("/panel",(req,res)=>{
res.sendFile(path.join(__dirname,"admin","panel.html"));
});

app.listen(3000,()=>{
console.log("Servidor activo en http://localhost:3000");
});