const dbConnection = require("../config/dbConnection");
const { sendPushNotificationToMultiple } = require("./firebase");
const { sendMail } = require("./sendEmail");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const sendEmails = async (emails, items) => {
    const today = new Date().toISOString().split("T")[0];
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, "reminder.pdf");

    // Pipe the PDF output to a file
    doc.pipe(fs.createWriteStream(pdfPath));

    // Add the title
    doc.fontSize(16).text("AMC-UCC RENEWAL REMINDER", { align: "center" });
    doc.moveDown(2);

    // Table setup
    const pageWidth = 560; // Usable page width between left and right margins
    const headerWidths = [30, 100, 100, 80, 90, 90, 80, 50, 80]; // Original column widths
    const totalHeaderWidth = headerWidths.reduce((a, b) => a + b, 0);

    // Adjust widths if needed
    if (totalHeaderWidth > pageWidth) {
        const scaleFactor = pageWidth / totalHeaderWidth;
        headerWidths.forEach((width, index) => {
            headerWidths[index] = Math.floor(width * scaleFactor);
        });
    }

    const headers = [
        "No",
        "Manufacturer",
        "Item",
        "Type",
        "Purchased on",
        "Expiry",
        "Location",
        "Total",
        "Emailed On",
    ];

    let xPosition = 50; // Starting x position for the table
    let yPosition = 100; // Starting y position for the table

    // Draw headers
    headers.forEach((header, index) => {
        doc.fontSize(10).text(header, xPosition, yPosition, {
            width: headerWidths[index] - 10,
            align: "center",
        });
        xPosition += headerWidths[index];
    });

    // Draw a line under headers
    doc.moveTo(50, yPosition + 25)
        .lineTo(50 + pageWidth, yPosition + 25)
        .stroke();
    yPosition += 35; // Move down for the first row

    // Render rows
    items.forEach((item, index) => {
        let xPosition = 50; // Reset x position for each row
        const rowHeight = 20; // Minimum row height

        // Calculate the maximum line height for wrapped text
        const maxLineHeight = Math.max(
            doc.heightOfString(item.manufacturer, {
                width: headerWidths[1] - 10,
            }),
            doc.heightOfString(item.item_name, { width: headerWidths[2] - 10 }),
            doc.heightOfString(item.item_type, { width: headerWidths[3] - 10 }),
            doc.heightOfString(item.item_location, {
                width: headerWidths[6] - 10,
            }),
            rowHeight
        );

        // Add a page if needed
        if (yPosition + maxLineHeight > doc.page.height - 50) {
            doc.addPage();
            yPosition = 50;

            // Redraw headers on the new page
            let headerXPosition = 50;
            headers.forEach((header, index) => {
                doc.text(header, headerXPosition, yPosition, {
                    width: headerWidths[index] - 10,
                    align: "center",
                });
                headerXPosition += headerWidths[index];
            });

            doc.moveTo(50, yPosition + 15)
                .lineTo(50 + pageWidth, yPosition + 15)
                .stroke();
            yPosition += 25;
        }

        // Render row content
        doc.fontSize(9).text(`${index + 1}`, xPosition, yPosition, {
            width: headerWidths[0] - 10,
        });
        xPosition += headerWidths[0];
        doc.text(item.manufacturer, xPosition, yPosition, {
            width: headerWidths[1] - 10,
        });
        xPosition += headerWidths[1];
        doc.text(item.item_name, xPosition, yPosition, {
            width: headerWidths[2] - 10,
        });
        xPosition += headerWidths[2];
        doc.text(item.item_type, xPosition, yPosition, {
            width: headerWidths[3] - 10,
        });
        xPosition += headerWidths[3];
        doc.text(item.purchase_date, xPosition, yPosition, {
            width: headerWidths[4] - 10,
        });
        xPosition += headerWidths[4];
        doc.text(item.expiry_date, xPosition, yPosition, {
            width: headerWidths[5] - 10,
        });
        xPosition += headerWidths[5];
        doc.text(item.item_location, xPosition, yPosition, {
            width: headerWidths[6] - 10,
        });
        xPosition += headerWidths[6];
        doc.text(item.total_number_of_item, xPosition, yPosition, {
            width: headerWidths[7] - 10,
        });
        xPosition += headerWidths[7];
        doc.text(item.email_send_on || today, xPosition, yPosition, {
            width: headerWidths[8] - 10,
        });

        yPosition += maxLineHeight + 10; // Move to the next row
    });

    // Finalize the PDF
    doc.end();

    // Send the email with the PDF as an attachment
    try {
        await sendMail({
            to: emails,
            subject: "AMC-UCC RENEWAL REMINDER",
            text: `Renewal reminder.`,
            html: `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
                    <h2 style="text-align: center; color: #555;">AMC-UCC Renewal Reminder</h2>
                    <p>Hello,</p>
                    <p>This is a friendly reminder regarding the renewal of your AMC-UCC items. Please find the detailed information about the items attached in the PDF document.</p>
                    <p>
                        Kindly download and review the attached file for further details. If you have any questions, feel free to contact us.
                    </p>
                    <p>Thank you for your attention.</p>
                    <p style="margin-top: 20px;">Best regards,</p>
                    <p style="font-weight: bold;">The AMC-UCC Team</p>
                </div>`,
            attachments: [
                {
                    filename: `renewal-reminder-${today}.pdf`,
                    path: pdfPath,
                    contentType: "application/pdf",
                },
            ],
        });

        fs.unlinkSync(pdfPath); // Deletes the generated PDF file

        // Prepare the update query
        const ids = items.map((item) => item.item_id).join(",");
        let updateQuery = `
            UPDATE item_details
            SET email_send_on = CASE 
        `;

        items.forEach((item) => {
            updateQuery += `WHEN item_id = ${item.item_id} THEN '${today}' `;
        });

        updateQuery += `END WHERE item_id IN (${ids})`;
        await dbConnection.query(updateQuery); // Uncomment to execute the query
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const sendPush = (tokens) => {
    sendPushNotificationToMultiple(
        {
            data: {
                TOPIC: "REMINDER",
                CONTENT:
                    "Some items are expire in 15 days check your registered email",
                messagedata: "Some items are expire in 15 days",
            },
            notification: {
                title: "AMC REMINDER",
                body: "Some items are expire in 15 days check your registered email",
            },
        },
        tokens
    );
};

const sendReminderPush = async (items) => {
    const getUserListQuery =
        "SELECT * FROM user_details_with_login WHERE allow_notification = 1";

    try {
        // Execute the query using async/await
        const [results] = await dbConnection.query(getUserListQuery);
        const users = results.filter((user) => user.fcm_token != null);
        const tokens = // Filter out null fcm_token
            users.map((user) => user.fcm_token);
        const emails = users.map((user) => user.username);
        sendPush(tokens); // to send push notification to mobile app
        await sendEmails(emails, items);

        // console.log(emails);

        return results; // Return the list of users
    } catch (err) {
        throw new Error("Error fetching users: " + err); // Handle errors
    }
};

const sendReminders = async () => {
    const itemListQuery =
        "SELECT * FROM item_details WHERE item_status = 0 AND DATEDIFF(expiry_date, CURDATE()) = 15"; //0 not deleted items

    try {
        // Execute the query using async/await
        const [results] = await dbConnection.query(itemListQuery);
        const today = new Date().toISOString().split("T")[0];

        let filteredItems = [];
        if (results.length > 0) {
            filteredItems = results.filter(
                (item) => item?.email_send_on != today
            );
        }
        if (filteredItems.length > 0) {
            sendReminderPush(filteredItems);
        }

        return results; // Return the list of users
    } catch (err) {
        throw new Error("Error fetching users: " + err); // Handle errors
    }
};

module.exports = sendReminders;
