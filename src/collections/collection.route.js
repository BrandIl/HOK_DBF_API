import { Router } from 'express';
import CollectionService from './collection.service';


const collectionRouter = Router();

collectionRouter.route('/:organizationKey/collection/:date')
    .get(function (req, res, next) {
        const { organizationKey, date } = req.params;

        const collectionService = new CollectionService();

        collectionService.getOrganizationCollectionsByDate(organizationKey, date).then(data => { res.send(data) })

    });

collectionRouter.route('/:organizationKey/collection')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;

        const collectionService = new CollectionService();

        collectionService.getOrganizationCollections(organizationKey).then(data => { res.send(data) })

    });


collectionRouter.route('/:date')
    .get(async function (req, res, next) {
        const { date } = req.params;

        const collectionService = new CollectionService();

        const collections = await collectionService.getCollectionsByDate(date);

        res.send(collections);

    });


export default collectionRouter;