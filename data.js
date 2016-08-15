module.exports = {
    user: {
        lex: "2201",
        lun: "L556",
        deskName: "John Narvell",
        userTitle: "Dsability Examiner"
    },
    requestId: "DC1234567891234567891234P",
    sno_option: null,
    language_preference: "English",
    org: {
        openTime: "Monday-Thursday 8:00 AM - 4:30 PM;",
        closeTime: "Friday 8:00 AM - 12:00 PM",
        phoneNumber: "(555) 555-5555",
        phoneExt: "321",
        faxNumber: "(444) 444-4444"
    },
    case: {
        caseId: 575,
        claimantInfo: {
            ssn: "100001810",
            name: {
                firstName: "John",
                middleName: "Seville",
                lastName: "Narvell"
            },
            dateOfBirth: "1960-03-25T00:00:00.000Z"
        },
        allegationsText: "Chronic Hepatitis C; Muscle Spasms; Anxiety/Panic Attacks; Hypertension; Depression; Cirrhosis;",
        qdd_priority_flag: "N",
        cal_priority_flag: "N"
    },
    currentDate: new Date().toDateString(),
    vendor: {
        offeringVendor: {
            vendorId: 2,
            vendorName: {
                organizationName: "Saint Alphonsus Regional Medical Center"
            }
        },
        serviceCommunication: {
            communicationVendor: {
                vendorId: 2,
                vendorName: {
                    organizationName: "Saint Alphonsus Regional Medical Center"
                }
            },
            correspondenceAddress: {
                "line1": "1055 N CURTIS RD",
                city: "BOISE",
                state: "ID",
                "zip5": "83706",
                attentionLine: "MEDICAL RECORDS"
            }
        }
    }
};
