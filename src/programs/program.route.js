import { Router } from 'express';
import ProgramService from './program.service';

const reportRouter = Router();

reportRouter.route('/:organizationKey/program')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;

        new ProgramService(organizationKey)
            .getPrograms()
            .then(data => {
                res.send(data);
            })

    });



export default reportRouter;