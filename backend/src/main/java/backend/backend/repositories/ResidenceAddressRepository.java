package backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.ResidenceAddress;

@Repository
public interface ResidenceAddressRepository extends JpaRepository<ResidenceAddress, Integer> {
}
