package backend.backend.services;

import backend.backend.entities.PersonalDetails;
import backend.backend.repositories.PersonalDetailsRepository;
import net.sf.jasperreports.engine.*;
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

    public byte[] generatePdfReport(long referenceNumber) throws JRException {
        PersonalDetails personalDetails = personalDetailsRepository.findByReferenceNumber(referenceNumber);

        if (personalDetails == null) {
            throw new IllegalArgumentException("Reference number not found");
        }

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("referenceNumber", String.valueOf(personalDetails.getReferenceNumber()));
        parameters.put("submittedOn", personalDetails.getSubmittedOn());
        parameters.put("name", personalDetails.getPrefix() + " " + personalDetails.getFirstName() + " " + personalDetails.getMiddleName() + " " + personalDetails.getLastName() + " " + personalDetails.getSuffix());
        parameters.put("dob", personalDetails.getDateOfBirth().toString());
        parameters.put("party", personalDetails.getParty());
        parameters.put("phoneNumber", String.valueOf(personalDetails.getMobileNumber()));
        parameters.put("gender", personalDetails.getGender());
        parameters.put("email", personalDetails.getEmail());

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
