
import dateForamt from 'dateformat';
import convert from 'xml-js';
import fetch from 'node-fetch';

export default class DollarRateService {

    constructor() {
    }

    async getDollarRate(date) {

        const res = await fetch(`https://www.boi.org.il/currency.xml?rdate=${dateForamt(date, 'yyyymmdd')}&curr=01`);

        const xml = await res.text();

        const data = JSON.parse(convert.xml2json(xml, {
            compact: true, spaces: 0, elementNameFn: (value) => value.toLowerCase(), textKey: '_'
        }));

        if (!data.currencies.currency) {
            const prevDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            return this.getDollarRate(prevDate);
        }
        return Number(data.currencies.currency.rate._);
    }
}