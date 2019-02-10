import { Router } from 'express';

import OrganizationService from './organization.service';
const reportRouter = Router();

reportRouter.route('/')
    .get(function (req, res, next) {
        new OrganizationService()
            .getOrganizations()
            .then(data => {
                res.send(data);
            })

    });

reportRouter.route('/:organizationKey')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;

        new OrganizationService().getOrganization(organizationKey)
            .then(data => {
                res.send(data);
            })
    });

reportRouter.route('/:organizationKey/project')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;

        new OrganizationService().getProjects(organizationKey)
            .then(data => {
                res.send(data);
            })
    });



export default reportRouter;