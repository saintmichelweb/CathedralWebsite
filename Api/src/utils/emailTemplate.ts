interface EmailTemplateParams {
    notificationMessage: string;
    actionUrl?: string;
    actionButtonText?: string;
}

export function generateEmailTemplate({
    notificationMessage,
    actionUrl,
    actionButtonText
}: EmailTemplateParams): string {
    const currentYear = new Date().getFullYear();
    const supportContact = "info@rswitch.co.rw";
    // const logoUrl = "https://rswitch.co.rw/wp-content/uploads/2023/06/logo-dark-1.png";
    // <div class="header">
    // <img src="${logoUrl}" alt="Rswitch Logo" />
// </div>

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                }
                .header {
                    background-color: #be2130;
                    padding: 20px;
                    text-align: center;
                    color: #ffffff;
                }
                .header img {
                    max-height: 50px;
                }
                .content {
                    padding: 20px;
                    color: #333333;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    color: #ffffff;
                    background-color: #be2130;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #999999;
                }
                @media screen and (max-width: 600px) {
                    .email-container {
                        width: 100%;
                        padding: 10px;
                    }
                    .header, .content, .footer {
                        padding: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Header Section -->

                <!-- Content Section -->
                <div class="content">
                    <p>${notificationMessage}</p>
                    ${actionButtonText ? `<a href="${actionUrl}" class="button">${actionButtonText}</a>` : ''}
                </div>

                <!-- Footer Section -->
                <div class="footer">
                    <p>If you have any questions, feel free to contact us at ${supportContact}.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
