
require('dotenv').config();

import express from 'express';
import organizationRouter from './organization/organization.route';
import programRouter from './programs/program.route';
import collectionRouter from './collections/collection.route';
import dollarRateRouter from './dollarRate/dollarRate.route';


const app = express();
const port = process.env.NODE_ENV || 3002;

// app configurations
app.set('port', port);


app.use('/organization', organizationRouter);
app.use('/organization', programRouter);
app.use('/organization', collectionRouter);
app.use('/collection', collectionRouter);
app.use('/dollarRate', dollarRateRouter);

app.get('/', (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body
    });
});

// establish http server connection
app.listen(3002, () => { console.log(`App running on port ${port}`) });