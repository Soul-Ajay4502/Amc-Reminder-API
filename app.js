const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");
const startCronJobs = require("./common/cron");

startCronJobs();
// setup cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }
    next();
});

// Enable All CORS Requests
app.use(cors());

// use morgan logger
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms - :date[web]"
    )
);

// set bodyParser
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use("/profile", express.static("public/profile"));

app.use("/api", routes);

// 404 not found
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

//define routes here

// Use the imported routes
// app.use('/api', routes);

module.exports = app;
