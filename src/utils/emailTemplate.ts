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
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
        
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }

        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; max-width: 100% !important; }
          .content { padding: 20px !important; }
          .header { padding: 15px !important; }
          .header img { max-width: 120px !important; }
          h1 { font-size: 24px !important; }
          h2 { font-size: 20px !important; }
        }
      </style>
    </head>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                <td>
                  <img src="https://i.ibb.co.com/g3bLsRk/cover.jpg" alt="Hotel Image" style="width: 100%; max-height: 200px; object-fit: cover;">
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 40px 20px;">
                  <h2 style="font-family: 'Playfair Display', serif; color: #E68945; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h2>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="border-left: 3px solid #E68945; padding-left: 15px;">
                        <p style="font-family: 'Roboto', Arial, sans-serif; margin: 0 0 15px 0;">
                          <span style="font-weight: bold; color: #E68945; display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;">Name:</span>
                          ${firstName} ${lastName}
                        </p>
                        <p style="font-family: 'Roboto', Arial, sans-serif; margin: 0 0 15px 0;">
                          <span style="font-weight: bold; color: #E68945; display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;">Email:</span>
                          ${email}
                        </p>
                        <p style="font-family: 'Roboto', Arial, sans-serif; margin: 0 0 15px 0;">
                          <span style="font-weight: bold; color: #E68945; display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;">Phone:</span>
                          ${phone}
                        </p>
                        <p style="font-family: 'Roboto', Arial, sans-serif; margin: 0;">
                          <span style="font-weight: bold; color: #E68945; display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;">Subject:</span>
                          ${subject}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="border-left: 3px solid #E68945; padding-left: 15px;">
                        <p style="font-family: 'Roboto', Arial, sans-serif; margin: 0 0 10px 0;">
                          <span style="font-weight: bold; color: #E68945; display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;">Message:</span>
                        </p>
                        <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 5px; padding: 20px; font-family: 'Roboto', Arial, sans-serif; line-height: 1.6;">
                          ${message}
                        </div>
                      </td>
                    </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <a href="mailto:${email}" style="display: inline-block; background-color: #E68945; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; font-family: 'Roboto', Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">Reply to ${firstName}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="footer" style="text-align: center; padding: 30px 20px; background-color: #f9f9f9; color: #666666; font-size: 0.9em; font-family: 'Roboto', Arial, sans-serif;">
                  <p style="margin: 0 0 10px 0;">This email was sent from the contact form on Hotel am Beatles-Platz website.</p>
                  <p style="margin: 0;">© 2023 Hotel am Beatles-Platz. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};