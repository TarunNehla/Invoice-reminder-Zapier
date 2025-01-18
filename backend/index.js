const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/dbConnection');
const authRouter = require('./routes/authrouter')
const invoiceRouter = require('./routes/invoiceRouter');
const zapierRouter = require('./routes/zapierRouter'); 
const cors = require('cors');

app.use(cors());

app.get('/', (req,res) => {
    res.send('hello from backend');
})

app.use(express.json());

app.use('/auth', authRouter )

app.use('/invoices', invoiceRouter);

app.use('/api', zapierRouter);


app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT}`);
})