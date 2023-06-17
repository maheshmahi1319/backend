const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./app');
const https = require('https');
const cors  = require('cors');
const fs = require('fs');
const { user } = require('./api');
const StartServer = async() => {
    const options = {
        key: fs.readFileSync('ssl/private.key'),
        cert: fs.readFileSync('ssl/certificate.crt')
      };
    const app = express();
    
    await databaseConnection();

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api


    
    user(app);
    // await expressApp(app);
    const server = await https.createServer(options, app);


    server.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        channel.close();
    })
    

}

StartServer();
