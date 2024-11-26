// firebase settings
const serviceAccountKey = require("../serviceAccountKey.json");
const fcm = require("fcm-notification");
var FCM = new fcm(serviceAccountKey);

const sendPushNotificationToMultiple = (message, Tokens) => {
    const payload = {
        ...message,
        android: {
            priority: "high",
            notification: {
                channel_id: "important",
            },
        },
    };

    return new Promise((resolve, reject) => {
        FCM.sendToMultipleToken(payload, Tokens, (err, response) => {
            if (err) {
                // reject(err);
                console.log(err);
            }
            console.log(response);
            resolve(response);
        });
    });
};

const sendPushNotificationToSingle = (message) => {
    const payload = {
        ...message,
        android: {
            priority: "high",
            notification: {
                channel_id: "important",
            },
        },
    };

    return new Promise((resolve, reject) => {
        FCM.send(payload, (err, response) => {
            if (err) {
                // reject(err);
                // throw new Error(err);
                console.log(err);
            }
            console.log(response);
            resolve(response);
        });
    });
};

module.exports = {
    sendPushNotificationToSingle,
    sendPushNotificationToMultiple,
};
