import { useEffect, useState } from "react";

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  disponivel: boolean;
}

export default function AparelhoList() {
  const [aparelhos, setAparelhos] = useState<Aparelho[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/aparelhos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar aparelhos.");
        }

        return response.json();
      })
      .then((data) => {
        setAparelhos(data);
      })
      .catch(() => {
        setErro("Não foi possível carregar os aparelhos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando aparelhos...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      <h2>Aparelhos</h2>

      {aparelhos.length === 0 ? (
        <p>Nenhum aparelho encontrado.</p>
      ) : (
        <ul>
          {aparelhos.map((aparelho) => (
            <li key={aparelho.id}>
              <strong>{aparelho.nome}</strong>
              <br />
              {aparelho.descricao}
              <br />
              Disponível: {aparelho.disponivel ? "Sim" : "Não"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}