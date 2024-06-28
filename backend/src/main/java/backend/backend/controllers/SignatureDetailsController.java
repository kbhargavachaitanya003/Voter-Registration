package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.entities.SignatureDetails;
import backend.backend.services.SignatureDetailsService;

@RestController
@RequestMapping("/api")
public class SignatureDetailsController {

    @Autowired
    private SignatureDetailsService signatureDetailsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/saveSignatureDetails")
    public SignatureDetails saveSignatureDetails(@RequestBody SignatureDetails signatureDetails) {
        return signatureDetailsService.saveSignatureDetails(signatureDetails);
    }
}
