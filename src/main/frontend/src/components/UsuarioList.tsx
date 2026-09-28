import { useEffect, useState } from "react";
import UsuarioForm from "./UsuarioForm";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [usuarioParaEditar, setUsuarioParaEditar] =
    useState<Usuario | null>(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarUsuarios() {
      setLoading(true);
      setErro("");

      try {
        const response = await fetch("http://localhost:8080/usuarios");

        if (!response.ok) {
          throw new Error("Erro ao buscar usuários.");
        }

        const data: Usuario[] = await response.json();

        if (ativo) {
          setUsuarios(data);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar os usuários.");
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    void carregarUsuarios();

    return () => {
      ativo = false;
    };
  }, [versao]);

  async function excluir(id: number) {
    if (!window.confirm("Deseja realmente excluir este usuário?")) {
      return;
    }

    setErro("");

    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário.");
      }

      if (usuarioParaEditar?.id === id) {
        setUsuarioParaEditar(null);
      }

      setVersao((atual) => atual + 1);
    } catch {
      setErro("Não foi possível excluir o usuário.");
    }
  }

  return (
    <div>
      <UsuarioForm
        usuarioParaEditar={usuarioParaEditar}
        onSalvo={() => {
          setUsuarioParaEditar(null);
          setVersao((atual) => atual + 1);
        }}
        onCancelar={() => setUsuarioParaEditar(null)}
      />

      <h2>Usuários</h2>

      {loading && <p>Carregando usuários...</p>}

      {!loading && erro && <p role="alert">{erro}</p>}

      {!loading && !erro && usuarios.length === 0 && (
        <p>Nenhum usuário encontrado.</p>
      )}

      {!loading && !erro && usuarios.length > 0 && (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <strong>{usuario.nome}</strong>
              <br />
              {usuario.email}
              <br />

              <button
                type="button"
                onClick={() => setUsuarioParaEditar(usuario)}
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => excluir(usuario.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}