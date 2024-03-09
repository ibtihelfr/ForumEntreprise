package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.services.CondidatureService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("condidature")
public class CondidatureController {

    private final CondidatureService condidatureService;


    @PostMapping("add/{idOffer}/{id}")
    public Condidature addCondidature(@RequestBody Condidature condidature,@PathVariable("idOffer")Long idO,@PathVariable("id")Long idU) {

        return condidatureService.addCondidature(condidature,idO,idU);
    }

    @PutMapping("update")
    public  Condidature updateCondidature(@RequestBody Condidature condidature){

        return condidatureService.updateCondidature(condidature);
    }
    @DeleteMapping("delete/{idCondidature}")
    public boolean removeCondidature(@PathVariable long idCondidature ) {

        condidatureService.removeCondidature(idCondidature);
        return true;
    }
    @GetMapping("/all")
    public List<Condidature> readALL()
    {
        return condidatureService.readAll();
    }




}
