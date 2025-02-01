const cors = require("cors");
const app = require('./config/express');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoute= require('./route/userRoute');
const noteRoute = require('./route/noteRoute');

app.use('/*',cors({
    origin: ['http://localhost:5173', 'https://node-nest-psi.vercel.app/'], 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))
  
app.options('/*', (c) => {
c.header('Access-Control-Allow-Origin');
c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
c.header('Access-Control-Allow-Credentials', 'true');
return c.json({ message: 'Preflight OK' });
});

connectDB();

app.use('/api/user', userRoute);
app.use('/api/notes',noteRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("server is running on port 3000"));


