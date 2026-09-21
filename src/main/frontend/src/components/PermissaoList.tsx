import { useEffect, useState } from "react";
import PermissaoForm from "./PermissaoForm";

interface Permissao {
  id: number;
  nome: string;
  descricao: string;
}

export default function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [permissaoParaEditar, setPermissaoParaEditar] =
    useState<Permissao | null>(null);

  function carregarPermissoes() {
    setLoading(true);

    fetch("http://localhost:8080/permissoes")
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then((data) => {
        setPermissoes(data);
        setErro("");
      })
      .catch(() => {
        setErro("Não foi possível carregar as permissões.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    carregarPermissoes();
  }, []);

  async function excluir(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta permissão?"
    );

    if (!confirmar) {
      return;
    }

    const response = await fetch(`http://localhost:8080/permissoes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Não foi possível excluir a permissão.");
      return;
    }

    carregarPermissoes();
  }

  if (loading) {
    return <p>Carregando permissões...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      <PermissaoForm
        permissaoParaEditar={permissaoParaEditar}
        onSalvo={() => {
          setPermissaoParaEditar(null);
          carregarPermissoes();
        }}
        onCancelar={() => setPermissaoParaEditar(null)}
      />

      <h2>Permissões</h2>

      {permissoes.length === 0 ? (
        <p>Nenhuma permissão encontrada.</p>
      ) : (
        <ul>
          {permissoes.map((permissao) => (
            <li key={permissao.id}>
              <strong>{permissao.nome}</strong>
              <br />
              {permissao.descricao}
              <br />

              <button onClick={() => setPermissaoParaEditar(permissao)}>
                Editar
              </button>

              <button onClick={() => excluir(permissao.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}