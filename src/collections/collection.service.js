
import ProgramService from '../programs/program.service'
import CollectionReader from './collection.reader';
import dateForamt from 'dateformat';
export default class CollectionService {

    constructor(organizationKey) {
        this.ProgramService = new ProgramService(organizationKey);
        this.CollectionReader = new CollectionReader(organizationKey);

    }

    getCollections(collectionDate) {
        return this.CollectionReader
            .getCollections();
    }

    getCollectionsByDate(collectionDate) {
        const getCollectionsPromise = this.CollectionReader
            .getCollections()
            .then(data => {
                return data.filter(clc => dateForamt(new Date(clc.date), "ddmmyyyy") === dateForamt(new Date(collectionDate), "ddmmyyyy"));
            });
        const getProgramsPromise = this.ProgramService.getPrograms();

        return Promise.all([getCollectionsPromise, getProgramsPromise])
            .then(([collections, programs]) => {
                return collections.map(clc => {
                    const program = programs.find(prg => prg.key == clc.programKey);
                    return Object.assign({}, clc, { program });
                })
            });
    }


}