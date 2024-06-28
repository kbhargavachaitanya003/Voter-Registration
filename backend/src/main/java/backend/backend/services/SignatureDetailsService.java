package backend.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.backend.entities.SignatureDetails;
import backend.backend.repositories.SignatureDetailsRepository;

@Service
public class SignatureDetailsService {

    @Autowired
    private SignatureDetailsRepository signatureDetailsRepository;

    public SignatureDetails saveSignatureDetails(SignatureDetails signatureDetails) {
        return signatureDetailsRepository.save(signatureDetails);
    }

}
