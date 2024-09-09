require('dotenv').config();

const mysql = require('mysql2');
function connection() {
    try {

        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 100,
            maxIdle: 100, // max idle connections, the default value is the same as connectionLimit
            idleTimeout: 30000, // idle connections timeout, in milliseconds, the default value 60000
            // queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
            // charset: 'utf8',
            timezone: '+00:00', // Interpret all received timestamps as UTC. Otherwise local timezone is assumed.
            dateStrings: [
                'DATE', // DATE's are returned as strings (otherwise they would be interpreted as YYYY-MM-DD 00:00:00+00:00)
                'DATETIME' // DATETIME's return as strings (otherwise they would interpreted as YYYY-MM-DD HH:mm:ss+00:00)
            ]
          });


        return pool.promise();
    } catch (error) {
        return console.log(`Could not connect - ${error}`);
    }
}

const pool = connection();

module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params) => pool.execute(...params),
    query: (...params) => pool.query(...params)
};
