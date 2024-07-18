'use strict';
const mongoose = require('mongoose');

function connectionwithmongoDB() {;
    try {

        // Mongo url 
        const url = process.env.Mongo_URL;
        // Connect mongoose
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected with database");
        }).catch((error) => {
            console.log("MongoError:", error);
        });
    } catch (err) {
        console.log("MongoError::", err);
    }
}

module.exports = connectionwithmongoDB;
