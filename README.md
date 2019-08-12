# HOK-DBF-API

# Endpoints
|   |   |   |  
|---|---|---|
| /organization  |   |   organizations | 
| /organization/:organizationKey   |   | organization details + project  |  
| /organization/:organizationKey/program   |   |  organization programs |  
| /organization/:organizationKey/project  |   |  organization projects |  
| /organization/:organizationKey/collection    |?date=\<collection-date>   |  organization collections | 
| /dollarRate     |?date=\<collection-date>    | dollar rate by date  |

# Models
### Organization
```sh
  {
        "key": "orzipora",
        "name": "אור צפורה",
        "code": "40111111",
        "collectionDate": "20",
        "address": "התור 4/9 אלעד",
        "email": null,
        "isActive": true
    }
```
### Program
```sh
   {
        "key": "0000000001",
        "customerKey": "000001",
        "bankAccount": {
            "bank": "00",
            "branch": "000",
            "account": "000000000"
        },
        "joinDate": "1996-01-12T22:00:00.000Z",
        "openDate": "1996-01-19T22:00:00.000Z",
        "cancelDate": "2010-06-19T21:00:00.000Z",
        "closeDate": "1996-12-31T22:00:00.000Z",
        "sumShekel": 30,
        "sumDollar": 0,
        "projectKey": "00",
        "collectionDate": "20",
        "customer": {
            "key": "000001",
            "lastName": "ישי",
            "firstName": "נתי ויעל",
            "city": "אילת",
            "street": "יורם 03",
            "anotherPhone": null,
            "zip": "00000",
            "phone": "03-0000000"
        },
        "project": {
            "name": "תרומה",
            "key": "00"
        }
    }
```

### Collection
```sh
   {
        "sum": 40,
        "date": "2018-01-19T22:00:00.000Z",
        "programKey": "0000000020",
        "type": "1000",
        "program": {
	        "key": "0000000001",
	        "customerKey": "000001",
	        "bankAccount": {
	            "bank": "00",
	            "branch": "000",
	            "account": "000000000"
	        },
	        "joinDate": "1996-01-12T22:00:00.000Z",
	        "openDate": "1996-01-19T22:00:00.000Z",
            "cancelDate": "2010-06-19T21:00:00.000Z",
	        "closeDate": "1996-12-31T22:00:00.000Z",
	        "sumShekel": 30,
	        "sumDollar": 0,
	        "projectKey": "00",		
        	"collectionDate": "20",
	        "customer": {
	            "key": "000001",
	            "lastName": "ישי",
	            "firstName": "נתי ויעל",
	            "city": "אילת",
	            "street": "יורם 03",
	            "anotherPhone": null,
	            "zip": "00000",
	            "phone": "03-0000000"
	        },
	        "project": {
	            "name": "תרומה",
	            "key": "00"
	        }
	    }
    }
```

