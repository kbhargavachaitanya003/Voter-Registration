package backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.AddressDetails;

@Repository
public interface AddressDetailsRepository extends JpaRepository<AddressDetails, Integer> {
}
