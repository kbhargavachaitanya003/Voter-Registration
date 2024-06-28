package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.entities.MailingAddress;
import backend.backend.services.MailingAddressService;

@RestController
@RequestMapping("/api")
public class MailingAddressController {

    @Autowired
    private MailingAddressService mailingAddressService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/saveMailingAddress")
    public MailingAddress saveMailingAddress(@RequestBody MailingAddress mailingAddress) {
        return mailingAddressService.saveMailingAddress(mailingAddress);
    }
}
