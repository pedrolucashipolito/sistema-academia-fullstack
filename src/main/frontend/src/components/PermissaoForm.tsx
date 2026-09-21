import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface Permissao {
  id: number;
  nome: string;
  descricao: string;
}

interface PermissaoFormProps {
  permissaoParaEditar: Permissao | null;
  onSalvo: () => void;
  onCancelar: () => void;
}

export default function PermissaoForm({
  permissaoParaEditar,
  onSalvo,
  onCancelar,
}: PermissaoFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (permissaoParaEditar) {
      setNome(permissaoParaEditar.nome);
      setDescricao(permissaoParaEditar.descricao);
    } else {
      setNome("");
      setDescricao("");
    }
  }, [permissaoParaEditar]);

  async function salvar(event: FormEvent) {
    event.preventDefault();

    const permissao = {
      nome,
      descricao,
    };

    const url = permissaoParaEditar
      ? `http://localhost:8080/permissoes/${permissaoParaEditar.id}`
      : "http://localhost:8080/permissoes";

    const metodo = permissaoParaEditar ? "PUT" : "POST";

    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissao),
    });

    if (!response.ok) {
      alert("Não foi possível salvar a permissão.");
      return;
    }

    setNome("");
    setDescricao("");
    onSalvo();
  }

  return (
    <form onSubmit={salvar}>
      <h2>{permissaoParaEditar ? "Editar Permissão" : "Nova Permissão"}</h2>

      <div>
        <label>Nome:</label>
        <br />
        <input
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
      </div>

      <div>
        <label>Descrição:</label>
        <br />
        <input
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          required
        />
      </div>

      <button type="submit">
        {permissaoParaEditar ? "Atualizar" : "Cadastrar"}
      </button>

      {permissaoParaEditar && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}