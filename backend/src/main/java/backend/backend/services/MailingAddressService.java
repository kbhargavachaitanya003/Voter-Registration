package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.MailingAddress;
import backend.backend.repositories.MailingAddressRepository;

@Service
public class MailingAddressService {

    @Autowired
    private MailingAddressRepository mailingAddressRepository;

    public MailingAddress saveMailingAddress(MailingAddress mailingAddress) {
        return mailingAddressRepository.save(mailingAddress);
    }
}
