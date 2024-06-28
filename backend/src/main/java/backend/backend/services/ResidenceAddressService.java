package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.ResidenceAddress;
import backend.backend.repositories.ResidenceAddressRepository;

@Service
public class ResidenceAddressService {

    @Autowired
    private ResidenceAddressRepository residenceAddressRepository;

    public ResidenceAddress saveResidenceAddress(ResidenceAddress residenceAddress) {
        return residenceAddressRepository.save(residenceAddress);
    }
}
