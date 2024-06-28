package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.PersonalDetails;
import backend.backend.repositories.PersonalDetailsRepository;

@Service
public class PersonalDetailsService {

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    public PersonalDetails savePersonalDetails(PersonalDetails personalDetails) {
        return personalDetailsRepository.save(personalDetails);
    }
}
