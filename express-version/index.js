const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
//const mustacheExpress = require("mustache-express");

// va charger PORT et MONGO_CONNECTION dans process.env
dotenv.config({
    path : "./variables.env"
});

mongoose.connect(process.env.MONGO_CONNECTION,{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(
    // dès qu'on est connecté , on exécute la fonction dans le .then
    () => {
        const server = express();
        const router = require("./router");

        // défini le moteur mustache avec la fonction mustacheExpress
        // server.engine('mustache',mustacheExpress());

        // dit au serveur d'utiliser moustache comme moteur de template
        // server.set('view engine', 'mustache');

        // défini le dossier views , va chercher dans views
        // server.set('views', __dirname + '/views');

        // on dit au serveur d'utiliser le routeur exporté du module router.js à la racine
        server.use("/", router);

        // process.env.<variable> pour lire une variable d'environnement
        server.listen(process.env.PORT,() => {
            console.log(`Je vous ai compris sur le port ${process.env.PORT}`);
        });
    }
)