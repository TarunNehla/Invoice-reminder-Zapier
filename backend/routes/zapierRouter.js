const express = require('express');
const router = express.Router();

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL; 

router.post('/trigger-zapier', async (req, res) => {
  try {
    console.log('this is executing')
    console.log('value of req.body', req.body);
    const { userId, email, amount, dueDate, emailContent,delay } = req.body;

    const invoiceId = userId;
    const recipient = email;
    console.log('value of invoiceId, recipeint, amout duedate', invoiceId, recipient, amount, dueDate, emailContent, delay);

    // data to Zapier webhook
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoiceId,
        recipient,
        amount,
        dueDate,
        emailContent,
        delay,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ message: 'Zapier Success' });
    } else {
      const error = await response.text();
      return res.status(500).json({ error: 'Zapier Failure', details: error });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internalerror', details: err.message });
  }
});


module.exports = router;