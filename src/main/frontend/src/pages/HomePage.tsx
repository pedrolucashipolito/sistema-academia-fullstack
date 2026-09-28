import UsuarioList from "../components/UsuarioList";
import AparelhoList from "../components/AparelhoList";
import PermissaoList from "../components/PermissaoList";

export default function HomePage() {
  return (
    <main>
      <h1>Sistema Academia</h1>

      <UsuarioList />

      <hr />

      <AparelhoList />

      <hr />

      <PermissaoList />
    </main>
  );
}