package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.DrivingLicenseDetails;
import backend.backend.repositories.DrivingLicenseDetailsRepository;

@Service
public class DrivingLicenseDetailsService {

    @Autowired
    private DrivingLicenseDetailsRepository licenseRepository;

    public boolean checkDrivinglicenseExists(int drivinglicense) {
        return licenseRepository.existsByDrivingLicense(drivinglicense);
    }

    public String getSignatureByDrivinglicense(int drivinglicense) {
        DrivingLicenseDetails details = licenseRepository.findByDrivingLicense(drivinglicense);
        return details != null ? details.getSignature() : null;
    }
}
