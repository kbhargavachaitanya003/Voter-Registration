package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.entities.PersonalDetails;
import backend.backend.services.PersonalDetailsService;

@RestController
@RequestMapping("/api")
public class PersonalDetailsController {

    @Autowired
    private PersonalDetailsService personalDetailsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/savePersonalDetails")
    public PersonalDetails savePersonalDetails(@RequestBody PersonalDetails personalDetails) {
        return personalDetailsService.savePersonalDetails(personalDetails);
    }
}
