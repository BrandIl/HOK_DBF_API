
import dbfReader from '../common/dbfReader';
import dateForamt from 'dateformat';

const dbfMapping = {
    "SHEKEL": "sum",
    "PAYDATE": "date",
    "PAYNUM": "programKey",
    "PAYKIND": "type"
}

const handleGetPrograms = records => {
    return records.map((program) => {
        return program;
    });
}

export default class CollectionReader {

    constructor(organizationKey) {
        const { DBPATH: dataPath } = process.env;
        this.path = `${dataPath}\\${organizationKey}\\GVIA.DBF`;
    }

    async getCollections() {

        const data = await dbfReader.read(this.path, dbfMapping);
        return handleGetPrograms(data.records);

    }

    async getCollectionsByDate(collectionDate) {

        const data = await this.getCollections();
        return data.filter(clc => dateForamt(new Date(clc.date), "ddmmyyyy") === dateForamt(new Date(collectionDate), "ddmmyyyy"));

    }
}

