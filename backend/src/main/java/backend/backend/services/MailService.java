package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ReportService reportService;

    public void sendEmail(String to, String subject, String htmlContent, String type, long referenceNumber) throws jakarta.mail.MessagingException {
        jakarta.mail.internet.MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        if ("ssn".equals(type)) {
            try {
                byte[] pdfBytes = reportService.generatePdfReport(referenceNumber);
                helper.setTo(to);
                helper.setSubject(subject);
                helper.setText(htmlContent, true);
                helper.addAttachment("Voter Registration Application.pdf", new ByteArrayResource(pdfBytes));
        
                mailSender.send(message);
            } catch (JRException e) {
                e.printStackTrace();
            }
        } else {

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            mailSender.send(message);
        }
    }
}
