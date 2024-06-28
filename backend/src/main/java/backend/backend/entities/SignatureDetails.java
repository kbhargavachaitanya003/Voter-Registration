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
@Table(name = "signature_details", schema = "VoterRegistration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignatureDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "signature_details_id")
    private int signatureDetailsId;

    @Column(name = "reference_number")
    private long referenceNumber;

    @Column(name = "driving_license")
    private int drivingLicense;

    @Column(name = "signature", length = 1000000)
    private String signature;
}
