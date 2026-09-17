package br.ueg.trindade.sistema_academia_fullstack.repository;

import br.ueg.trindade.sistema_academia_fullstack.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

}
