import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface UsuarioFormProps {
  usuarioParaEditar: Usuario | null;
  onSalvo: () => void;
  onCancelar: () => void;
}

export default function UsuarioForm({
  usuarioParaEditar,
  onSalvo,
  onCancelar,
}: UsuarioFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (usuarioParaEditar) {
      setNome(usuarioParaEditar.nome);
      setEmail(usuarioParaEditar.email);
    } else {
      setNome("");
      setEmail("");
    }
    setErro("");
  }, [usuarioParaEditar]);

  async function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    const url = usuarioParaEditar
      ? `http://localhost:8080/usuarios/${usuarioParaEditar.id}`
      : "http://localhost:8080/usuarios";

    try {
      const response = await fetch(url, {
        method: usuarioParaEditar ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível salvar o usuário.");
      }

      setNome("");
      setEmail("");
      onSalvo();
    } catch {
      setErro("Não foi possível salvar o usuário.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={salvar}>
      <h2>{usuarioParaEditar ? "Editar Usuário" : "Novo Usuário"}</h2>

      <div>
        <label htmlFor="nome-usuario">Nome:</label>
        <br />
        <input
          id="nome-usuario"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email-usuario">E-mail:</label>
        <br />
        <input
          id="email-usuario"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      {erro && <p role="alert">{erro}</p>}

      <button type="submit" disabled={salvando}>
        {salvando
          ? "Salvando..."
          : usuarioParaEditar
            ? "Atualizar"
            : "Cadastrar"}
      </button>

      {usuarioParaEditar && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}