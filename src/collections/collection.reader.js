
import dbfReader from '../common/dbfReader';

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

    constructor(organizationKey, date) {
        const { DBPATH: dataPath } = process.env;
        this.path = `${dataPath}\\${organizationKey}\\GVIA.DBF`;
    }

    getCollections() {
        return dbfReader.read(this.path, dbfMapping).then(data => {
            return handleGetPrograms(data.records);
        });
    }
}

