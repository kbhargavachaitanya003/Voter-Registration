package backend.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.PersonalDetails;

@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Integer> {
    PersonalDetails findByReferenceNumber(long referenceNumber);
    List<PersonalDetails> findByIsStored(boolean isStored);
}
