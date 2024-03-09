package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.forum.services.TypeReclamationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("reclamation/type")
public class TypeReclamationController {
    private final TypeReclamationService typeReclamationService;
}
