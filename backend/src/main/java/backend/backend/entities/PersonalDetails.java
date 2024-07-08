package backend.backend.entities;

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


@Entity
@Table(name = "personal_details", schema = "VoterRegistration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "reference_number")
    private long referenceNumber;

    @Column(name = "registration_date")
    private String registrationDate;

    @Column(name = "registration_time")
    private String registrationTime;

    @Column(name = "type_of_registration")
    private String typeOfRegistration;

    @Column(name = "driving_license")
    private int drivingLicense;

    @Column(name = "ssn")
    private String ssn;

    @Column(name = "prefix")
    private String prefix;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "suffix")
    private String suffix;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_number")
    private int mobileNumber;

    @Column(name = "party")
    private String party;

    @Column(name = "citizen_of_us")
    private Boolean isCitizen;

    @Column(name = "eligible_age")
    private Boolean isAge;

    @Column(name = "resident_of_us")
    private Boolean isResident;

    @Column(name = "not_convicted_felon")
    private Boolean isFelony;

    @Column(name = "is_stored")
    private Boolean isStored;
}
