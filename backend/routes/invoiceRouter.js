const express = require('express');
const router = express.Router();
const { authenticate } = require('../Middleware/authMiddleware')
const InvoiceModel = require('../models/invoiceModel');

router.get('/api/invoices', authenticate, async (req, res) => {
  try {
    const invoices = await InvoiceModel.find({ userId: req.user._id });
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error });
  }
});

module.exports = router;
