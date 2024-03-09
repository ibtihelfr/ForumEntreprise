package tn.esprit.forum.services;

import tn.esprit.forum.entities.Condidature;

import java.util.List;

public interface CondidatureService {
    Condidature addCondidature (Condidature condidature,Long idO,Long idU);
    void removeCondidature (long idCondidature);
    Condidature updateCondidature (Condidature condidature);
    List<Condidature> readAll();

}
