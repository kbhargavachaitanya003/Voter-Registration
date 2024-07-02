package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.services.MailService;
import jakarta.mail.MessagingException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EmailContoller {

    @Autowired
    private MailService mailService;
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sendMail")
    public String sendEMail(@RequestBody Map<String, String> body) {
        String to = body.get("to");
        String subject = body.get("subject");
        String htmlContent = body.get("htmlContent");

        try {
            mailService.sendEmail(to, subject, htmlContent);
            return "Email sent successfully";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error sending email!";
        }
    }
}
