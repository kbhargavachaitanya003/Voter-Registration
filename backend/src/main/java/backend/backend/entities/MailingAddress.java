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
@Table(name = "mailing_address", schema = "VoterRegistration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MailingAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mailing_address_id")
    private int mailingAddressId;

    @Column(name = "reference_number")
    private long referenceNumber;

    @Column(name = "street_number")
    private int streetNumber;

    @Column(name = "street_name")
    private String streetName;

    @Column(name = "apartment_or_unit")
    private String apartmentOrUnit;

    @Column(name = "city_or_town")
    private String cityOrTown;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_Code")
    private String zip;

    @Column(name = "country")
    private String country;

    @Column(name = "in_military")
    private String inMilitary;
}
