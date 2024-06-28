package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.DrivingLisenseDetails;
import backend.backend.repositories.DepartmentLisenseRepository;

@Service
public class DepartmentDrivingLisenseService {

    @Autowired
    private DepartmentLisenseRepository lisenseRepository;

    public boolean checkDrivingLisenseExists(int drivingLisense) {
        return lisenseRepository.existsByDrivingLisense(drivingLisense);
    }

    public String getSignatureByDrivingLisense(int drivingLisense) {
        DrivingLisenseDetails details = lisenseRepository.findByDrivingLisense(drivingLisense);
        return details != null ? details.getSignature() : null;
    }
}
