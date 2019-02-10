import { Router } from 'express';

import DollarRateService from './dollarRate.service';

const reportRouter = Router();

reportRouter.route('/')
    .get(function (req, res, next) {
        const { date } = req.query;
        new DollarRateService()
            .getDollarRate(date)
            .then(dollarRate => {
                res.send({ dollarRate });
            })


    });



export default reportRouter;