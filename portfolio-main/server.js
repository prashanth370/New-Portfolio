const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Environment variables (replace these with your actual values)
const gmailUser = 'prashanthnayak577@gmail.com';  // Replace with your Gmail address
const gmailPass = 'qjja zrlz wnqh opej';  // Replace with your Gmail app-specific password

// Nodemailer configuration to send email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: gmailPass
    }
});

// POST endpoint for receiving and logging data
app.post('/send', (req, res) => {
    const { name, email, comments } = req.body;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Comments:', comments);

    const mailOptions = {
        from: gmailUser,
        to: 'prashanthnayak577@gmail.com', // Replace with the recipient's email address
        replyTo: email, // Set the reply-to address to the sender's email
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nComments: ${comments}`
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email sending failed:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message received and email sent');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
