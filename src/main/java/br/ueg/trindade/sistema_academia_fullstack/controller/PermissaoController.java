package br.ueg.trindade.sistema_academia_fullstack.controller;

import br.ueg.trindade.sistema_academia_fullstack.model.Permissao;
import br.ueg.trindade.sistema_academia_fullstack.repository.PermissaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/permissoes")
public class PermissaoController {

    private final PermissaoRepository permissaoRepository;

    public PermissaoController(PermissaoRepository permissaoRepository) {
        this.permissaoRepository = permissaoRepository;
    }

    @GetMapping
    public List<Permissao> listar() {
        return permissaoRepository.findAll();
    }

    @PostMapping
    public Permissao inserir(@RequestBody Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    @GetMapping("/{id}")
    public Permissao buscarPorId(@PathVariable Long id) {
        return permissaoRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Permissao atualizar(@PathVariable Long id, @RequestBody Permissao permissao) {
        permissao.setId(id);
        return permissaoRepository.save(permissao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        permissaoRepository.deleteById(id);
    }
}