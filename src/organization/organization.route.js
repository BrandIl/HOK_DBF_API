import { Router } from 'express';

import OrganizationService from './organization.service';
const organizationRouter = Router();

organizationRouter.route('/')
    .get(function (req, res, next) {
        new OrganizationService()
            .getOrganizations()
            .then(data => {
                res.send(data);
            })

    });

organizationRouter.route('/:organizationKey')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;

        new OrganizationService().getOrganization(organizationKey)
            .then(data => {
                res.send(data);
            })
    });

organizationRouter.route('/:organizationKey/project')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;

        new OrganizationService().getProjects(organizationKey)
            .then(data => {
                res.send(data);
            })
    });



export default organizationRouter;