const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const upload = require("express-fileupload"); 
const connectionwithmongoDB = require("./config/db.config");

// Dynamic environment file configuration
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + ".env")
});
  
// Express configuration
let app = express();
app.use(upload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use("/", express.static(__dirname + "/public"));
let cors = require("cors");
app.use(cors({
    origin: '*',
})); 
// Database connection
connectionwithmongoDB();

require("./routes/authRoutes")(app); 
require("./routes/categoryRoutes")(app); 
require("./routes/productRoutes")(app); 
require("./routes/subCategoryRoutes")(app); 
app.listen(process.env.PORT, () => 
    {
        // Comment: Starts the server and logs a success message with the port number to the console.
        console.log("My application running successfully on the port number :-", +process.env.PORT);    
    });
     