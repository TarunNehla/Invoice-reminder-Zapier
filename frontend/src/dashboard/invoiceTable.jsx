import React, { useState } from "react";
import '../index.css';

function InvoiceTable({ invoices, onTriggerZapier }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [delay, setDelay] = useState(0);
  const [showDelayInput, setShowDelayInput] = useState(false);

  const emailTemplate = (invoice) => {
    return `Dear ${invoice.recipient},

This is a friendly reminder that your payment for the amount of $${invoice.amount.toFixed(
      2
    )} was due on ${new Date(invoice.dueDate).toLocaleDateString()}.

Please arrange for payment at your earliest convenience. If the payment has already been made, kindly disregard this email.

Thank you,
Your Company Name`;
  };

  const handleReminder = (invoice, withSchedule) => {
    const emailBody = emailTemplate(invoice);
    setSelectedInvoice(invoice);
    setEmailContent(emailBody);

    setShowDelayInput(withSchedule);
    if (!withSchedule) {
      setDelay(0); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invoiceWithEmail = {
      ...selectedInvoice,
      emailContent,
      delay: parseFloat(delay),
    };

    onTriggerZapier(invoiceWithEmail);

    setSelectedInvoice(null);
    setShowDelayInput(false);
    setDelay(0);
  };

  return (
    <div className="invoice">
      <h2>Your Invoices</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>E-Mail Id</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Schedule Reminder</th>
            <th>Instant Reminder</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.recipient}</td>
                <td>{invoice.email}</td>
                <td>${invoice.amount.toFixed(2)}</td>
                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td>{invoice.status}</td>
                <td>
                  <button className="btton" onClick={() => handleReminder(invoice, true)}>
                    Schedule Reminder
                  </button>
                </td>
                <td>
                  {new Date(invoice.dueDate) < new Date() ? (
                    <button className="btton" onClick={() => handleReminder(invoice, false)}>
                      Send Reminder
                    </button>
                  ) : (
                    <span>Not available Yet</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No invoices found</td>
            </tr>
          )}
        </tbody>
      </table>

      <p>** Only Overdue invoices have the option of instant Reminder</p>

      {selectedInvoice && (
        <div>
          <h3>Send Reminder</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="textarea-box"
              rows="20"
              cols="80"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />

            {showDelayInput && (
              <div>
                <label>
                  Delay (days):
                  <input className="input-box"
                    type="number"
                    min="0"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                  />
                </label>
              </div>
            )}
            <br />
            <button className="btton" type="submit">Send</button>
            <button className="btton"
              type="button"
              onClick={() => {
                setSelectedInvoice(null);
                setShowDelayInput(false);
                setDelay(0);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default InvoiceTable;
