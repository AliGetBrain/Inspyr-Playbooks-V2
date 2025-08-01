const { generateAndSaveHTML, setupWatcher } = require("../Utils/generate.js");

const template = `
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Outreach</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px 20px; background-color: #F8FBFF;">
   <!-- Header -->
    <div style="margin-bottom: 12px; background: white; border-color:{{{primaryColor}}}; border-bottom: 3px solid {{{primaryColor}}}; border-radius: 8px; text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div style="margin: 15px 0 0 0;">
                  <img src="https://raw.githubusercontent.com/AliGetBrain/Logo-Storage/main/IS_logo-full_RGB_250x80.png" width="250" height="80" alt="Logo">
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2 style="margin: 0 0 15px 0; font-weight: 600; letter-spacing: 0.025em;"><span style="color: {{{primaryColor}}};">NEW</span> INVOICE RECORD</h2>
              </td>
            </tr>
        </table>
    </div>  
     
    <!-- Message Section -->
    <div style="margin-bottom: 12px; padding: 24px; background-color: white; border-radius: 8px; color: #4b5563; font-family: Arial, Helvetica, sans-serif;">
        <p style="margin: 0 0 16px 0; font-size: 1rem; font-weight: 500;">Hello,</p>

        <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
            I hope you're doing well! Please find attached <span style="font-weight: 600; color: #4b5563;">Invoice #{{{invoiceNumber}}}</span> for your records. <br>
            This invoice is due on <span style="font-weight: 600; color: #4b5563;">{{{dueDate}}}</span>. Let us know if you have any questions—we're happy to help.
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 1rem; line-height: 1.6;">
          <strong> If any changes are required to the invoice delivery email, please be sure to 'Reply All' to this communication. </strong>
        </p>
       
        <p style="margin: 0; font-size: 1rem;">
            Best regards,<br>
            <span style="font-weight: 500;">Accounts Receiveable Department</span>
        </p>
    </div>
  
    <div style="background: white; border-radius: 8px; padding: 40px; position: relative; overflow: hidden;">
        <!-- Company Info -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
            <div>
                <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">REMIT TO</div>
                <div style="font-weight: 600; color: #4b5563;">INSPYR Solutions, LLC</div>
                <div>P.O. Box 737249</div>
                <div>Dallas, TX 75373-7249</div>
            </div>
        </div>

        <!-- Invoice Title -->
        <div style="color: {{{primaryColor}}}; font-size: 40px; font-weight: 700; margin-bottom: 25px; letter-spacing: -0.5px; position: relative; display: inline-block;">
            INVOICE
        </div>

        <!-- Billing Info -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
            <tr>
                <td style="width: 50%;">
                    <div style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 12px; font-weight: 600;">BILL TO</div>
                    <div style="font-weight: 600; color: #4b5563;">{{{contactName}}}</div>
                    <div style="color: #4b5563;">{{{contactCompanyName}}}</div>
                    <div style="color: #4b5563;">{{{contactBillAddr.streetAddress}}}</div>
                    <div style="color: #4b5563;">{{{contactBillAddr.city}}}, {{{contactBillAddr.state}}} {{{contactBillAddr.zipCode}}}</div>
                </td>
              
                <td style="width: 50%; text-align: left; padding-left: 25%;">
                   <div><span style="font-weight: 600; color: #4b5563; font-size: 0.8rem;">CUSTOMER</span> #{{{customerNumber}}}</div>
                    <div><span style="font-weight: 600; color: #4b5563; font-size: 0.8rem;">INVOICE</span> #{{{invoiceNumber}}}</div>
                    <div><span style="font-weight: 600; color: #4b5563; font-size: 0.8rem;">DATE-</span> {{{transactionDate}}}</div>
                    <div><span style="font-weight: 600; color: #4b5563; font-size: 0.8rem;">DUE DATE-</span> {{{dueDate}}}</div>
                    <div><span style="font-weight: 600; color: #4b5563; font-size: 0.8rem;">TERMS-</span> {{{salesTerm}}}</div>
                </td>
            </tr>
        </table>

       <!-- Invoice Table -->
        {{#hasServiceDate}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 25px 0;">
            <thead>
            <tr>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 24px; text-align: left; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 10%;">DATE</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 20%;">SERVICE</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 42%;">DESCRIPTION</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 8%;">QTY</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 8%;">RATE</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 12%;">AMOUNT</th>
            </tr>
            </thead>
            <tbody>
            {{#lineItems}}
                <tr>
                <td style="background-color: #F8FBFF; padding: 8px 12px; font-size: 0.875rem;">{{{serviceDate}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; font-size: 0.875rem;">{{{service}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 0; font-size: 0.875rem;">{{{description}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; font-size: 0.875rem; text-align: center;">{{{quantity}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; font-size: 0.875rem; text-align: center;">{{#showRate}}\${{{rate}}}{{/showRate}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; font-size: 0.875rem; text-align: center;">\${{{amount}}}</td>
                </tr>
            {{/lineItems}}
            </tbody>
        </table>
        {{/hasServiceDate}}

        {{^hasServiceDate}}
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: separate; margin: 30px 0;">
            <thead>
            <tr>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 24px; text-align: left; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 20%;">SERVICE</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: left; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 45%;">DESCRIPTION</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 8%;">QTY</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 12%;">RATE</th>
                <th style="border-bottom: 2px solid {{{primaryColor}}}; padding: 12px 16px; text-align: center; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; width: 15%;">AMOUNT</th>
            </tr>
            </thead>
            <tbody>
            {{#lineItems}}
                <tr>
                <td style="background-color: #F8FBFF; padding: 8px 12px; text-align: left; width: 20%; font-size: 0.875rem;">{{{service}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; text-align: left; width: 45%; font-size: 0.875rem;">{{{description}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; text-align: center; width: 8%; font-size: 0.875rem;">{{{quantity}}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; text-align: center; width: 12%; font-size: 0.875rem;">{{#showRate}}\${{{rate}}}{{/showRate}}</td>
                <td style="background-color: #F8FBFF; padding: 8px 12px; text-align: center; width: 15%; font-size: 0.875rem;">\${{{amount}}}</td>
                </tr>
            {{/lineItems}}
            </tbody>
        </table>
        {{/hasServiceDate}} 

        <!-- Totals Section -->
        <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 30px;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                 <table cellpadding="0" cellspacing="0" style="width: 100%;">
                    <tr>
                        <td style="width: 50%; vertical-align: top;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #4b5563; font-size: 0.85rem; text-align: left; padding-bottom: 20px;">
                                        {{{customMessage}}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 2px solid #4b5563; padding: 25px; font-size: 0.85rem; text-align: left; line-height: 1.8;">
                                        <div style="font-weight: 600; margin-bottom: 12px; font-size: 0.875rem; color: #4b5563;">ACH DELIVERY INSTRUCTIONS:</div>
                                        <div>Beneficiary Bank: JP Morgan Chase</div><div>ABA Routing Number: 267084131</div><div>Account Name: INSPYR Solutions, LLC</div><div>Account Number: 909331909</div>
                                        <div>Remittance: cashposting@INSPYRSolutions.com</div>
                                        <div style="margin-top: 12px; font-style: italic;">Please include your invoice number with your payment.</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
              </td>
            
                <td style="width: 50%; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" style="width: 80%; margin-left: auto;">
                      {{#showSubTotal}}
                          <tr>
                              <td style=" padding: 8px 0; font-size: 0.95rem;">SUBTOTAL</td>
                              <td style="padding: 8px 15px 8px 0; font-size: 0.95rem; text-align: right;">\${{{subTotal}}}</td>
                          </tr>
                      {{/showSubTotal}}

                      {{#showDiscounts}}
                        <tr>
                            <td style=" padding: 8px 0px; font-size: 0.95rem;">DISCOUNTS </td>
                            <td style="padding: 8px 15px 8px 0; font-size: 0.95rem; text-align: right;">-\${{{discounts}}}</td>
                        </tr>
                      {{/showDiscounts}}
                      
                      {{#showTotalTax}}
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TAX </td>
                            <td style="padding: 8px 15px 8px 0; font-size: 0.95rem; text-align: right;">\${{{totalTax}}}</td>
                        </tr>
                      {{/showTotalTax}}
                  
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">TOTAL</td>
                            <td style="padding: 8px 15px 8px 0; font-size: 0.95rem; text-align: right;">\${{{totalAmount}}}</td>
                        </tr>    
                      
                      {{#showAmountPaid}}      
                        <tr>
                            <td style="padding: 8px 0; font-size: 0.95rem;">PAYMENTS</td>
                            <td style="padding: 8px 15px 8px 0; font-size: 0.95rem; text-align: right;">-\${{{amountPaid}}}</td>
                        </tr> 
                      {{/showAmountPaid}}
                      
                      <tr>
                          <td colspan="2" style="padding: 20px 10px 0px 0; border-top: 1px solid #4b5563; font-size: 1.2rem; font-weight: 700; color: {{{primaryColor}}}; text-align: right;">
                              BALANCE DUE \${{{balanceDue}}}
                          </td>
                      </tr>
                      {{#showOverDue}}
                         <tr>
                            <td colspan="2" style="padding: 10px 10px 0px 0; font-size: 1.2rem; font-weight: 700; color: #374151; color: #e74c3c; text-align: right;">
                                OVERDUE {{{dueDate}}}
                            </td>
                        </tr>
                      {{/showOverDue}}
                    </table> 
                </td>
            </tr>
        </table>
       <div style="margin-top: 15px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-family: Arial, Helvetica, sans-serif; font-size: 0.8rem; color: #6b7280; line-height: 1.4; text-align: center;">

        <p style="margin: 15px 0 0 0; font-size: 0.70rem; color: #9ca3af; line-height: 1.3;">
            <strong>Confidentiality Note:</strong> This e-mail, and any attachment to it, contains privileged and confidential information intended only for the use of the individual(s) or entity named on the e-mail. If the reader of this e-mail is not the intended recipient, or the employee or agent responsible for delivering it to the intended recipient, you are hereby notified that reading this e-mail is strictly prohibited. If you have received this e-mail in error, please immediately return it to the sender and delete it from your system. Thank you.
        </p>
    </div> 
    </div>
</body>
</html>
`;

const data = {
  invoiceNumber: 1049438,
  transactionDate: "04/20/2025",
  dueDate: "05/20/2025",
  customerNumber: 2189153,
  collector: "Rachel Gonzalez",
  collectorEmail: "rgonzalez@inspyrsolutions.com",
  contactCompanyName: "Southern Ionics",
  contactName: "Kealy Baxter",
  contactBillAddr: {
    streetAddress: "P.O. Drawer 1217",
    city: "West Point",
    state: "MS",
    zipCode: "39773",
  },
  salesTerm: "Net 30",
  hasServiceDate: true,
  lineItems: [
    {
      service: "Invoice 1 of 2 ",
      serviceDate: "04/12/2025",
      description:
        "Southern Ionics Incorporated - INSPYR-2024-12-30-11 - Fidelity_401K Import",
      quantity: "1",
      rate: "1800.00",
      amount: "1800.00",
      showRate: false,
    },
  ],
  subTotal: "1880.0",
  showSubTotal: false,
  discounts: "",
  showDiscounts: false,
  totalTax: "5",
  showTotalTax: false,
  totalAmount: "1880.00",
  amountPaid: "",
  showAmountPaid: false,
  balanceDue: "1880.00",
  customMessage: "Thank you for your business and have a great day!",
  showOverDue: false,
  primaryColor: "#0068FF",
};

function regenerate() {
  generateAndSaveHTML(template, data, "invoice1");
}

setupWatcher(regenerate);
regenerate(); // Initial generation
