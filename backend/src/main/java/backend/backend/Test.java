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
import jakarta.persistence.Id;
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
    public ResponseEntity<List<DTO>> getAllUsers() {
        return new ResponseEntity<>(ts.getAllUsers(), HttpStatus.OK);
    }
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class DTO {
    private String fname;
    private String lname;
    private String email;
}

@Service
@AllArgsConstructor
class TestService {

    @Autowired
    private REPO repo;

    List<DTO> getAllUsers() {
        List<User> users = repo.findAll();
        List<DTO> dtos = new ArrayList<>();
        for (User u : users) {
            DTO dto = new DTO();
            dto.setFname(u.getFname());
            dto.setLname(u.getLname());
            dto.setEmail(u.getEmail());
            dtos.add(dto);
        }
        return dtos;
    }
}

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class User {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String fname;

    @Column(name = "last_name")
    private String lname;

    @Column(name = "email")
    private String email;
}
