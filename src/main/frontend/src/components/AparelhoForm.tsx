import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  disponivel: boolean;
}

interface AparelhoFormProps {
  aparelhoParaEditar: Aparelho | null;
  onSalvo: () => void;
  onCancelar: () => void;
}

export default function AparelhoForm({
  aparelhoParaEditar,
  onSalvo,
  onCancelar,
}: AparelhoFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disponivel, setDisponivel] = useState(true);

  useEffect(() => {
    if (aparelhoParaEditar) {
      setNome(aparelhoParaEditar.nome);
      setDescricao(aparelhoParaEditar.descricao);
      setDisponivel(aparelhoParaEditar.disponivel);
    } else {
      setNome("");
      setDescricao("");
      setDisponivel(true);
    }
  }, [aparelhoParaEditar]);

  async function salvar(event: FormEvent) {
    event.preventDefault();

    const aparelho = {
      nome,
      descricao,
      disponivel,
    };

    const url = aparelhoParaEditar
      ? `http://localhost:8080/aparelhos/${aparelhoParaEditar.id}`
      : "http://localhost:8080/aparelhos";

    const metodo = aparelhoParaEditar ? "PUT" : "POST";

    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aparelho),
    });

    if (!response.ok) {
      alert("Não foi possível salvar o aparelho.");
      return;
    }

    setNome("");
    setDescricao("");
    setDisponivel(true);
    onSalvo();
  }

  return (
    <form onSubmit={salvar}>
      <h2>{aparelhoParaEditar ? "Editar Aparelho" : "Novo Aparelho"}</h2>

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

      <div>
        <label>
          <input
            type="checkbox"
            checked={disponivel}
            onChange={(event) => setDisponivel(event.target.checked)}
          />
          Disponível
        </label>
      </div>

      <button type="submit">
        {aparelhoParaEditar ? "Atualizar" : "Cadastrar"}
      </button>

      {aparelhoParaEditar && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}