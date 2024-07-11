package backend.backend.services;

import backend.backend.entities.AddressDetails;
import backend.backend.entities.PersonalDetails;
import backend.backend.repositories.AddressDetailsRepository;
import backend.backend.repositories.PersonalDetailsRepository;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    private AddressDetailsRepository addressDetailsRepository;

    public byte[] generatePdfReport(long referenceNumber) throws JRException {
        PersonalDetails personalDetails = personalDetailsRepository.findByReferenceNumber(referenceNumber);
        AddressDetails addressDetails = addressDetailsRepository.findByReferenceNumber(referenceNumber);

        if (personalDetails == null) {
            throw new IllegalArgumentException("Reference number not found");
        }
        
        String partyEnroll;
        if (personalDetails.getParty() == null) {
            partyEnroll = "no";
        } else {
            partyEnroll = "yes";
        }

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("prefix", personalDetails.getPrefix());
        parameters.put("firstName", personalDetails.getFirstName());
        parameters.put("middleName", personalDetails.getMiddleName());
        parameters.put("lastName", personalDetails.getLastName());
        parameters.put("suffix", personalDetails.getSuffix());
        parameters.put("dob", personalDetails.getDateOfBirth().toString());
        parameters.put("ssn", personalDetails.getSsn());
        parameters.put("streetNumber", String.valueOf(addressDetails.getStreetNumber()));
        parameters.put("streetName", addressDetails.getStreetName());
        parameters.put("apartmentUnit", addressDetails.getApartmentOrUnit());
        parameters.put("city", addressDetails.getCityOrTown());
        parameters.put("state", addressDetails.getState());
        parameters.put("zipCode", addressDetails.getZip());
        parameters.put("mailingStreetNumber", String.valueOf(addressDetails.getMailingStreetNumber()));
        parameters.put("mailingStreetName", addressDetails.getMailingStreetName());
        parameters.put("mailingApartmentUnit", addressDetails.getMailingApartmentOrUnit());
        parameters.put("mailingCity", addressDetails.getMailingCityOrTown());
        parameters.put("mailingState", addressDetails.getMailingState());
        parameters.put("mailingZipCode", addressDetails.getMailingZip());
        parameters.put("mailingCountry", addressDetails.getMailingCountry());
        parameters.put("partyName", personalDetails.getParty());
        parameters.put("phoneNumber", String.valueOf(personalDetails.getMobileNumber()));
        parameters.put("typeOfRegistration", personalDetails.getTypeOfRegistration());
        parameters.put("partyEnroll", partyEnroll);
        parameters.put("gender", personalDetails.getGender());
        parameters.put("email", personalDetails.getEmail());
        parameters.put("referenceNumber", String.valueOf(personalDetails.getReferenceNumber()));
        parameters.put("submittedOn", personalDetails.getSubmittedOn().toString());

        JasperReport jasperReport = JasperCompileManager.compileReport("backend/src/main/resources/confirmation_template.jrxml");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());

        JRPdfExporter exporter = new JRPdfExporter();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
        exporter.exportReport();

        return outputStream.toByteArray();
    }
}
