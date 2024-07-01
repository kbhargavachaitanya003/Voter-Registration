package backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.DrivingLicenseDetails;

@Repository
public interface DrivingLicenseDetailsRepository extends JpaRepository<DrivingLicenseDetails, Integer> {

    boolean existsByDrivingLicense(int drivingLicense);

    DrivingLicenseDetails findByDrivingLicense(int drivingLicense);
}
