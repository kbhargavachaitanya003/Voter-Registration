package backend.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "driving_lisense_details", schema = "Department_Of_Vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DrivingLisenseDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "personid")
    private int personId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "driving_lisense")
    private int drivingLisense;

    @Column(name = "signature")
    private String signature;
}
