package backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.DrivingLisenseDetails;

@Repository
public interface DepartmentLisenseRepository extends JpaRepository<DrivingLisenseDetails, Integer> {

    boolean existsByDrivingLisense(int drivingLisense);

    DrivingLisenseDetails findByDrivingLisense(int drivingLisense);
}
