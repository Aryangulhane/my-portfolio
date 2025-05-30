const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'aryangulhane6@gmail.com',
      pass: 'pddm xubw ctlt zxkt', // Replace with your app password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Test" <aryangulhane6@gmail.com>',
      to: 'aryangulhane6@gmail.com', // Replace with your recipient email
      subject: 'Test Email',
      text: 'This is a test email.',
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();