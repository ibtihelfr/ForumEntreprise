package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.CondidatureRepository;
import tn.esprit.forum.repositories.OffreRepository;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.CondidatureService;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CondidatureServiceImp implements CondidatureService {
    private final CondidatureRepository condidatureRepository;
    private final UserRepository userRepository;
    private final OffreRepository offreRepository;


    @Override
    public Condidature addCondidature(Condidature condidature,Long idO,Long idU) {
        User u=userRepository.findById(idU).orElse(null);
        Offre o=offreRepository.findById(idO).orElse(null);

        condidature.setUser(u);
        condidature.setOffre(o);
        // userRepository.save(u);
        //offreRepository.save(o);
        return condidatureRepository.save(condidature);
    }

    @Override
    public void removeCondidature(long idCondidature) {
        condidatureRepository.deleteById(idCondidature);
    }


    @Override
    public Condidature updateCondidature(Condidature condidature) {
        return condidatureRepository.save(condidature);
    }

    @Override
    public List<Condidature> readAll() {
        return condidatureRepository.findAll();
    }


}

