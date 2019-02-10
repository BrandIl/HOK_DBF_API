

import FeeReader from './fee.reader';

export default class DollarRateService {

    constructor() {
        this.FeeReader = new FeeReader();


    }

    getDollarRate(collectionDate) {
        return this.FeeReader
            .getFees(collectionDate)
            .then(data => data.length ? data[0].dollarRate : undefined);
    }


}