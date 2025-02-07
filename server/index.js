const cors = require("cors");
const app = require('./config/express');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoute= require('./route/userRoute');
const noteRoute = require('./route/noteRoute');
const {deleteOldTrashedNotes} = require('./service/noteService');

const allowedOrigins = [
    'https://node-nest-psi.vercel.app',
    'http://localhost:5173' 
];

app.use('/*',cors({
    origin: allowedOrigins, 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))
  
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});
connectDB();

app.use('/api/user', userRoute);
app.use('/api/notes',noteRoute);

setInterval(() => {
    deleteOldTrashedNotes();
}, 24 * 60 * 60 * 1000);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("server is running on port 3000"));


