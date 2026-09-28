package br.ueg.trindade.sistema_academia_fullstack.repository;

import br.ueg.trindade.sistema_academia_fullstack.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}