import express from 'express';

// Step 1: Create the Express app
const appExpress = express();

appExpress.use(express.json());

const PORT = process.env.PORT || 3000;
appExpress.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import {MercadoPagoConfig, Payment} from 'mercadopago';

const paymentReceiver = new MercadoPagoConfig({
    accessToken: 'TEST-2516438873949673-122610-6d849769ed767820831129c422227c16-2177885509',
    options: {
        timeout: 5000, 
        idempotencyKey: 'abc'
    } 
});

const payment = new Payment(paymentReceiver);

appExpress.post('/listener1GG', (req, res) => {
    console.log('listener1GG: ' + req.body);
    
    const paymentID = req.body.data.id;

    payment.get(paymentID)
        .then((response)=>{
        amountGifted = response.body.transaction_amount;
        console.log(`Payment details ${response}`);
        console.log(`Transaction amount ${amountGifted}`);
        res.sendStatus(200);
        })  

        .catch((error) => {
            console.log(`Error getting payment details of transaction ID ${paymentID}`)
            res.sendStatus(500);
        })

    
});