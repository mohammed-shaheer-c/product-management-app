const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const connectionwithmongoDB = require("./config/db.config");

// Dynamic environment file configuration
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + ".env")
});

// Express configuration
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let cors = require("cors");
app.use(cors({
    origin: '*',
}));


// Database connection
connectionwithmongoDB();

app.listen(process.env.PORT, () => 
    {
        // Comment: Starts the server and logs a success message with the port number to the console.
        console.log("My application running successfully on the port number :-", +process.env.PORT);    
    });
    