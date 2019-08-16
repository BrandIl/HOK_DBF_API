import { Router } from 'express';
import CollectionService from './collection.service';


const collectionRouter = Router();

collectionRouter.route('/:organizationKey/collection')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;
        const { date } = req.query;
        const collectionService = new CollectionService(organizationKey);
        if (date) {
            collectionService.getCollectionsByDate(date).then(data => { res.send(data) })
        }
        else {
            collectionService.getCollections().then(data => { res.send(data) })
        }


    });



export default collectionRouter;