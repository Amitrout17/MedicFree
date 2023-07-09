const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
    <html>
    <head>
      <style>
        /* Inline CSS styles */
        body {
          font-family: Arial, sans-serif;
          color: #333333;
          background-color: #f5f5f5;
          padding: 20px;
          margin: 0;
        }
        .container {
          background-color: #ffffff;
          border-radius: 4px;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
        }
        h1 {
          color: #006699;
          font-size: 24px;
          margin-bottom: 10px;
          aline-item:center;
        }
        p {
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
          padding: 10px 0;
        }
        .verification-code {
          margin-top: 20px;
        }
        .verification-code p {
          margin: 0;
        }
        .verification-code h3 {
          font-size: 24px;
          margin: 20px 0;
          font-weight: bold;
          letter-spacing: 6px;
          color: #006699;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Medifree!</h1>
        <p>A new emergency medicine request just arrived!</p>
        <div class="medicine-details">
          ${options.message}
        </div>
      </div>
    </body>
  </html>
        `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
