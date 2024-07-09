package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.entities.AddressDetails;
import backend.backend.services.AddressDetailsService;

@RestController
@RequestMapping("/api")
public class AddressDetailsController {

    @Autowired
    private AddressDetailsService addressDetailsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/saveAddress")
    public AddressDetails saveAddressDetails(@RequestBody AddressDetails addressDetails) {
        return addressDetailsService.saveAddressDetails(addressDetails);
    }
}
