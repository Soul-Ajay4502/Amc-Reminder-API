const cron = require("node-cron");
const sendReminderPush = require("./sendReminderPush");

// Define the cron job function
const startCronJobs = async () => {
    // Schedule the cron job
    cron.schedule("* * * * *", async () => {
        console.log("Cron job running every minute...");
        await sendReminderPush();
    });
};

module.exports = startCronJobs;
