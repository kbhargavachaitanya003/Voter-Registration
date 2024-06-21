package backend.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class Test {

    @Autowired
    private TestService ts;

    @GetMapping("/test")
    public ResponseEntity<List<DTO>> getAllDetails() {
        return new ResponseEntity<>(ts.getAllDetails(), HttpStatus.OK);
    }
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class DTO {
    private int PersonID;
    private String FirstName;
    private String LastName;
    private int DrivingLisense;
    private String Signature;
}

@Service
@AllArgsConstructor
class TestService {

    @Autowired
    private REPO repo;

    List<DTO> getAllDetails() {
        List<DrivingLisenseDetails> drivingLisenseDetails = repo.findAll();
        List<DTO> dtos = new ArrayList<>();
        for (DrivingLisenseDetails d : drivingLisenseDetails) {
            DTO dto = new DTO();
            dto.setPersonID(d.getPersonID());
            dto.setFirstName(d.getFirstName());
            dto.setLastName(d.getLastName());
            dto.setDrivingLisense(d.getDrivingLisense());
            dto.setSignature(d.getSignature());
            dtos.add(dto);
        }
        return dtos;
    }
}

@Entity
@Table(name = "DrivingLisenseDetails")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class DrivingLisenseDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PersonID")
    private int PersonID;

    @Column(name = "FirstName")
    private String FirstName;

    @Column(name = "LastName")
    private String LastName;

    @Column(name = "DrivingLisense")
    private int DrivingLisense;

    @Column(name = "Signature")
    private String Signature;
}
