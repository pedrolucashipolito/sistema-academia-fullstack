import { useEffect, useState } from "react";

interface Permissao {
  id: number;
  nome: string;
  descricao: string;
}

export default function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/permissoes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar permissões.");
        }

        return response.json();
      })
      .then((data) => {
        setPermissoes(data);
      })
      .catch(() => {
        setErro("Não foi possível carregar as permissões.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando permissões...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}