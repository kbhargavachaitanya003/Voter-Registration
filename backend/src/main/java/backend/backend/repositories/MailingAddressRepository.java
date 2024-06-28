package backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.backend.entities.MailingAddress;

@Repository
public interface MailingAddressRepository extends JpaRepository<MailingAddress, Integer> {
}
