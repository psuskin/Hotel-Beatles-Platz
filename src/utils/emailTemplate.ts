interface EmailData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export const generateEmailHTML = (data: EmailData): string => {
    const { firstName, lastName, email, phone, subject, message } = data;

    // Replace these URLs with your actual image URLs
    const headerImageUrl = "https://i.ibb.co/GsnSWJk/pexels-jean-frenna-1045113.jpg";
    const logoUrl = "https://i.ibb.co/HFHwdF0/Illustration.png";

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
          
          body {
            font-family: 'Roboto', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #BF8970;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .header img {
            max-width: 150px;
            height: auto;
          }
          .hero-image {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
          }
          .content {
            padding: 30px 20px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
            color: #666666;
            font-size: 0.9em;
          }
          h2 {
            font-family: 'Playfair Display', serif;
            color: #BF8970;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .info-block {
            margin-bottom: 20px;
            border-left: 3px solid #BF8970;
            padding-left: 15px;
          }
          .label {
            font-weight: bold;
            color: #BF8970;
            display: block;
            margin-bottom: 5px;
          }
          .value {
            margin-bottom: 10px;
          }
          .message {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 15px;
            margin-top: 10px;
          }
          .cta-button {
            display: inline-block;
            background-color: #BF8970;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="Hotel at Beatles Place Logo">
          </div>
          <img src="${headerImageUrl}" alt="Hotel at Beatles Place" class="hero-image">
          <div class="content">
            <h2>New Contact Form Submission</h2>
            <div class="info-block">
              <span class="label">Name:</span>
              <span class="value">${firstName} ${lastName}</span>
              
              <span class="label">Email:</span>
              <span class="value">${email}</span>
              
              <span class="label">Phone:</span>
              <span class="value">${phone}</span>
              
              <span class="label">Subject:</span>
              <span class="value">${subject}</span>
            </div>
            
            <div class="info-block">
              <span class="label">Message:</span>
              <div class="message">${message}</div>
            </div>
            
            <a href="mailto:${email}" class="cta-button">Reply to ${firstName}</a>
          </div>
          <div class="footer">
            <p>This email was sent from the contact form on Hotel at Beatles Place website.</p>
            <p>© 2023 Hotel at Beatles Place. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};