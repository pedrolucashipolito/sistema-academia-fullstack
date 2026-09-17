package br.ueg.trindade.sistema_academia_fullstack.controller;

import br.ueg.trindade.sistema_academia_fullstack.model.Aparelho;
import br.ueg.trindade.sistema_academia_fullstack.repository.AparelhoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aparelhos")
public class AparelhoController {

    private final AparelhoRepository aparelhoRepository;

    public AparelhoController(AparelhoRepository aparelhoRepository) {
        this.aparelhoRepository = aparelhoRepository;
    }

    @GetMapping
    public List<Aparelho> listar() {
        return aparelhoRepository.findAll();
    }

    @PostMapping
    public Aparelho inserir(@RequestBody Aparelho aparelho) {
        return aparelhoRepository.save(aparelho);
    }

    @GetMapping("/{id}")
    public Aparelho buscarPorId(@PathVariable Long id) {
        return aparelhoRepository.findById(id).orElse(null);
    }
}
