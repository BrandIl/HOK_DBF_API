
import dbfReader from '../common/dbfReader';
import dateFormat from 'dateformat';
const dbfMapping = {
    "PAYNUM": "key",
    "LAKNUM": "customerKey",
    "PAYHESH": "bankAccount",
    "DATEJOIN": "joinDate",
    "DATEOPEN": "openDate",
    "DATECLOSE": "closeDate",
    "PAYSHEKEL": "sumShekel",
    "PAYDOLAR": "sumDollar",
    "PAYDESTENY": "projectKey",
    "NORMALLATE": "collectionDay",
    "DATECANCEL": "cancelDate"
}

//PAYNUM	LAKNUM	PAYHESH	DATEJOIN	DATEOPEN	DATECLOSE	DATECANCEL	CANCELCOSE	PAYSHEKEL	PAYDOLAR	
//MCHNUM	PAYCOSE	PAYDESTENY	PAYSTATUS	PAYREM	PAYNAME	PAYMAKAV	NORMALLATE	ISHURBANK	PAYPLACE	DATEMAKAV	PAYZACAUT2	PAYCITY	PAYKESHER


const isEmptyDate = (date) => {
    return ['2175-12-20', '1899-11-30'].includes(dateFormat(new Date(date), "yyyy-mm-dd"));
}

const handleGetPrograms = records => {
    return records.map((program) => {

        const bankAccount = program.bankAccount && program.bankAccount.split(" ");
        return Object.assign({}, program, {
            bankAccount: bankAccount && !isNaN(bankAccount[0]) ? {
                bank: bankAccount[0],
                branch: bankAccount[1],
                account: bankAccount[2]
            } : undefined,
            cancelDate: isEmptyDate(program.cancelDate) ? undefined : new Date(program.cancelDate),
            joinDate: isEmptyDate(program.joinDate) ? undefined : new Date(program.joinDate),
            closeDate: isEmptyDate(program.closeDate) ? undefined : new Date(program.closeDate),
            openDate: isEmptyDate(program.openDate) ? undefined : new Date(program.openDate),
            collectionDay: Number(program.collectionDay)
        })
    });
}

export default class ProgramReader {

    constructor(organizationKey) {
        const { DBPATH: dataPath } = process.env;
        this.path = `${dataPath}\\${organizationKey}\\PAY.DBF`;
    }

    getPrograms() {
        return dbfReader.read(this.path, dbfMapping).then(data => {
            return handleGetPrograms(data.records);
        });
    }


}

