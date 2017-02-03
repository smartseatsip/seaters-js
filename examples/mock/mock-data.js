var MOCK_DATA = {
    
    "GET /api/fan": {
        "status": 200,
        "statusText": "OK",
        "body": {
            "username": "ben.corne@seaters.com",
            "name": "Ben Corne",
            "firstName": "Ben",
            "lastName": "Corne",
            "email": "ben.corne@seaters.com",
            "validatedEmail": true,
            "mobilePhoneNumber": {
                "countryCallingCode": "32",
                "localNumber": "475000000"
            },
            "validatedMobilePhone": false,
            "invoiceInfo": null,
            "language": "en",
            "roles": [
                "FAN",
                "FAN_GROUP_OWNER",
                "TRANSLATOR",
                "ADMIN"
            ],
            "notificationChannels": {
                "bySms": true,
                "byMail": true
            },
            "directMarketingSettings": {
                "allowDirectMarketingFromSeaters": true,
                "allowDirectMarketingFromPartners": true
            },
            "personalInfo": {
                "title": "MR",
                "address": {
                "street": null,
                "number": null,
                "line1": "Jan-Emiel-Mommaertslaan 16B",
                "line2": null,
                "line3": null,
                "country": null,
                "countryCode": "BE",
                "zipCode": "1831",
                "city": "Diegem",
                "state": "Vlaams-Brabant"
                },
                "birthDate": "1988-01-01",
                "idNumber": "BE001001001",
                "citizenshipCountryCode": "BE"
            }
        },
        "headers": {}, 
    },

    "GET /my-api-endpoint": {
        "status": 200,
        "statusText": "OK",
        "body": {},
        "headers": {}
    }

};

exports.data = MOCK_DATA;
