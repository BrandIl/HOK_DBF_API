
import ProgramService from '../programs/program.service';
import OrganizationService from '../organization/organization.service';

import CollectionReader from './collection.reader';
import dateForamt from 'dateformat';
export default class CollectionService {

    constructor() {

    }

    getOrganizationCollections(organizationKey) {

        const collectionReader = new CollectionReader(organizationKey);
        return collectionReader
            .getCollections();
    }

    async getOrganizationCollectionsByDate(organizationKey, collectionDate) {
        const collectionReader = new CollectionReader(organizationKey);
        const collections = await collectionReader.getCollectionsByDate(collectionDate);

        const programService = new ProgramService(organizationKey);
        const programs = await programService.getPrograms();

        const _programs = programs.reduce((obj, prg) => {
            obj[prg.key] = prg;
            return obj;
        }, {})

        return collections.map(clc => {
            const program = _programs[clc.programKey];
            return Object.assign({}, clc, { program });
        })

    }

    async getCollectionsByDate(collectionDate) {
        const organizationService = new OrganizationService();
        const organizations = await organizationService.getOrganizations();

        const promises = organizations
            .filter(org => org.collectionDate !== '00')

            .map(async org => {
                const collections = await this.getOrganizationCollectionsByDate(org.key, collectionDate);
                return Object.assign({}, org, { collections });
            });

        const res = await Promise.all(promises);
        return res.filter(org => org.collections.length);



    }


}