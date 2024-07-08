package backend.backend.services;

import backend.backend.entities.PersonalDetails;
import backend.backend.entities.SignatureDetails;
import backend.backend.entities.AddressDetails;
import backend.backend.repositories.PersonalDetailsRepository;
import backend.backend.repositories.SignatureDetailsRepository;
import backend.backend.repositories.AddressDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@Service
public class ExportService {

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    private AddressDetailsRepository addressDetailsRepository;

    @Autowired
    private SignatureDetailsRepository signatureDetailsRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void exportDataToFile() {
        List<PersonalDetails> personalDetailsList = personalDetailsRepository.findByIsStored(false);
        List<AddressDetails> addressDetailsList = addressDetailsRepository.findAll();
        List<SignatureDetails> signatureDetailsList = signatureDetailsRepository.findAll();

        String fileName = "/home/bhargavachaitanya/Documents/Office/Voter-Registration/backend/data_export.txt";
        File file = new File(fileName);
        System.out.println("Exporting data to file: " + fileName);

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file, true))) {
            for (PersonalDetails personalDetails : personalDetailsList) {
                AddressDetails addressDetails = findAddressDetailsByReferenceNumber(personalDetails.getReferenceNumber(), addressDetailsList);
                SignatureDetails signatureDetails = findSignatureDetailsByReferenceNumber(personalDetails.getReferenceNumber(), signatureDetailsList);
                String line = formatData(personalDetails, addressDetails, signatureDetails);
                writer.write(line);
                writer.newLine();

                personalDetails.setIsStored(true);
                personalDetailsRepository.save(personalDetails);
            }
        } catch (IOException e) {
            e.printStackTrace();
            
        }
    }

    private AddressDetails findAddressDetailsByReferenceNumber(long referenceNumber, List<AddressDetails> addressDetailsList) {
        for (AddressDetails addressDetails : addressDetailsList) {
            if (addressDetails.getReferenceNumber() == referenceNumber) {
                return addressDetails;
            }
        }
        return null;
    }

    private SignatureDetails findSignatureDetailsByReferenceNumber(long referenceNumber, List<SignatureDetails> signatureDetailsList) {
        for (SignatureDetails signatureDetails : signatureDetailsList) {
            if (signatureDetails.getReferenceNumber() == referenceNumber) {
                return signatureDetails;
            }
        }
        return null;
    }

    private String formatData(PersonalDetails personalDetails, AddressDetails addressDetails, SignatureDetails signatureDetails) {
        return String.join("|",
                String.valueOf(personalDetails.getReferenceNumber()),
                personalDetails.getRegistrationDate().toString(),
                personalDetails.getRegistrationTime(),
                personalDetails.getTypeOfRegistration(),
                String.valueOf(personalDetails.getDrivingLicense()),
                personalDetails.getSsn(),
                personalDetails.getPrefix(),
                personalDetails.getLastName(),
                personalDetails.getFirstName(),
                personalDetails.getMiddleName(),
                personalDetails.getSuffix(),
                personalDetails.getDateOfBirth().toString(),
                personalDetails.getGender(),
                personalDetails.getEmail(),
                String.valueOf(personalDetails.getMobileNumber()),
                personalDetails.getParty(),
                personalDetails.getIsCitizen().toString(),
                personalDetails.getIsAge().toString(),
                personalDetails.getIsResident().toString(),
                personalDetails.getIsFelony().toString(),
                addressDetails != null ? String.valueOf(addressDetails.getStreetNumber()) : "",
                addressDetails != null ? addressDetails.getStreetName() : "",
                addressDetails != null ? addressDetails.getApartmentOrUnit() : "",
                addressDetails != null ? addressDetails.getCityOrTown() : "",
                addressDetails != null ? addressDetails.getState() : "",
                addressDetails != null ? addressDetails.getZip() : "",
                addressDetails != null ? addressDetails.getCountry() : "",
                addressDetails != null ? String.valueOf(addressDetails.getMailingStreetNumber()) : "",
                addressDetails != null ? addressDetails.getMailingStreetName() : "",
                addressDetails != null ? addressDetails.getMailingApartmentOrUnit() : "",
                addressDetails != null ? addressDetails.getMailingCityOrTown() : "",
                addressDetails != null ? addressDetails.getMailingState() : "",
                addressDetails != null ? addressDetails.getMailingZip() : "",
                addressDetails != null ? addressDetails.getMailingCountry() : "",
                addressDetails != null ? addressDetails.getInMilitary() : "",
                signatureDetails != null ? signatureDetails.getSignature() : ""
        );
    }
}
