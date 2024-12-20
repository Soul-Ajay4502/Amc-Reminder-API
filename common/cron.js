const cron = require("node-cron");
const sendReminderPush = require("./sendReminderPush");

// Define the cron job function
const startCronJobs = async () => {
    // Schedule the cron job to run every day at 8:00 AM IST
    cron.schedule("30 2 * * *", async () => {
        // 2:30 AM UTC is equivalent to 8:00 AM IST
        console.log("Cron job running at 8:00 AM IST...");
        await sendReminderPush();
    });
};

module.exports = startCronJobs;
