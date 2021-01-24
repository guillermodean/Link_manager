const express = require('express');
const app = express ();
const morgan= require('morgan');
const path = require('path');

//Settings
app.set('port',process.env.PORT || 3000);  //toma el puerto que me está dando el servicio de la nube

//Midlewares
app.use(morgan('dev'))
app.use(express.json());

//routes
app.use('/api/links',require('./routes/links.routes'))

//static files
app.use(express.static(path.join(__dirname,'public')))



//Server_App
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')} `);
});