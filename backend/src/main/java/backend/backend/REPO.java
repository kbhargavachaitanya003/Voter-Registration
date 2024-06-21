package backend.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface REPO extends JpaRepository<DrivingLisenseDetails, Integer> {
}
