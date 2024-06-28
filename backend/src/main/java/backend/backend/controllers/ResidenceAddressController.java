package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.entities.ResidenceAddress;
import backend.backend.services.ResidenceAddressService;

@RestController
@RequestMapping("/api")
public class ResidenceAddressController {

    @Autowired
    private ResidenceAddressService residenceAddressService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/saveResidenceAddress")
    public ResidenceAddress saveResidenceAddress(@RequestBody ResidenceAddress residenceAddress) {
        return residenceAddressService.saveResidenceAddress(residenceAddress);
    }
}
