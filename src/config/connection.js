const mysql = require("mysql");
require('dotenv').config();

module.exports = () => {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    connection.connect(function (err) {
        if (err) {
            console.log("couldnt connect to mysql" + err);
        } else {
            console.log("connected to mysql");
        }

    });

    return connection;
};