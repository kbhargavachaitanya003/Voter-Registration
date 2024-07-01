package backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.services.DrivingLicenseDetailsService;

@RestController
@RequestMapping("/api")
public class DrivingLicenseDetailsController {

    @Autowired
    private DrivingLicenseDetailsService departmentService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkDrivingLicense/{drivingLicense}")
    public String checkDrivingLicenseExists(@PathVariable int drivingLicense) {
        boolean exists = departmentService.checkDrivinglicenseExists(drivingLicense);
        return exists ? "Yes" : "No";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getDrivingLicense/{drivingLicense}")
    public String getSignatureByDrivingLicense(@PathVariable int drivingLicense) {
        String signature = departmentService.getSignatureByDrivinglicense(drivingLicense);
        return signature != null ? signature : "No";
    }
}
