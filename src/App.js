import RegistroUsuarios from './components/Asistir/Asistir';
import UsuariosRegistrados from './components/Registros/Registros';
import "./App.css"
function App() {
  return (
    <div className='container'>
      <RegistroUsuarios />
      <UsuariosRegistrados />
    </div>
  );
}

export default App;
