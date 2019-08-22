import { Router } from 'express';

import DollarRateService from './dollarRate.service';

const dollarRateRouter = Router();

dollarRateRouter.route('/:date')
    .get(function (req, res, next) {
        const { date } = req.params;
        new DollarRateService()
            .getDollarRate(new Date(date))
            .then(dollarRate => {
                res.send({ dollarRate });
            })
            .catch(ex => res.send(ex))


    });



export default dollarRateRouter;