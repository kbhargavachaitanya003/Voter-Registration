package backend.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CheckDrivingLisenseController {

    @Autowired
    private DepartmentDrivingLisenseService departmentService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkDrivingLisense/{drivingLisense}")
    public String checkDrivingLisenseExists(@PathVariable int drivingLisense) {
        boolean exists = departmentService.checkDrivingLisenseExists(drivingLisense);
        return exists ? "Yes" : "No";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getDrivingLisense/{drivingLisense}")
    public String getSignatureByDrivingLisense(@PathVariable int drivingLisense) {
        String signature = departmentService.getSignatureByDrivingLisense(drivingLisense);
        return signature != null ? signature : "No";
    }
}
