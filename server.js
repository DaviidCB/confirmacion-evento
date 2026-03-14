const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/* base de datos */

const db = new sqlite3.Database("./database.db", (err)=>{
if(err){
console.error("Error conectando a la base de datos:", err);
}else{
console.log("Base de datos conectada");
}
});

app.use(bodyParser.json());

/* carpetas públicas */

app.use(express.static("public"));
app.use("/admin", express.static(path.join(__dirname,"admin")));

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
[nombre,telefono,correo,asistencia],
function(err){

if(err){
console.error(err);
res.status(500).json({mensaje:"error"});
return;
}

res.json({mensaje:"ok"});

});

});

/* obtener datos admin */

app.get("/admin/datos",(req,res)=>{

db.all("SELECT * FROM asistentes",(err,rows)=>{

if(err){
console.error(err);
res.json([]);
return;
}

res.json(rows);

});

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