package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.AddressDetails;
import backend.backend.repositories.AddressDetailsRepository;

@Service
public class AddressDetailsService {

    @Autowired
    private AddressDetailsRepository addressDetailsRepository;

    public AddressDetails saveAddressDetails(AddressDetails addressDetails) {
        return addressDetailsRepository.save(addressDetails);
    }
}
