package backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.SignatureDetails;

@Repository
public interface SignatureDetailsRepository extends JpaRepository<SignatureDetails, Integer> {
}
