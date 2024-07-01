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
@Table(name = "address_details", schema = "VoterRegistration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int residenceAddressId;

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

    @Column(name = "mailing_street_number")
    private int mailingStreetNumber;

    @Column(name = "mailing_street_name")
    private String mailingStreetName;

    @Column(name = "mailing_apartment_or_unit")
    private String mailingApartmentOrUnit;

    @Column(name = "mailing_city_or_town")
    private String mailingCityOrTown;

    @Column(name = "mailing_state")
    private String mailingState;

    @Column(name = "mailing_zip_Code")
    private String mailingZip;

    @Column(name = "mailing_country")
    private String mailingCountry;

    @Column(name = "in_military")
    private String inMilitary;
}
