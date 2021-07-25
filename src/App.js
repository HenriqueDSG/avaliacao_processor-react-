import './App.css';
import { BrowserRouter, Route } from "react-router-dom"; 
import Home from './pages/Home/Home';
import AddVeiculo from './pages/AddVeiculo/AddVeiculo';
import EditarVeiculo from './pages/EditarVeiculo/EditarVeiculo';

function App() 
{

  return (
    <BrowserRouter>
      <div className="container">
        <Route path="/" exact render={() => <Home />} />
        <Route path="/AddVeiculo" exact render={() => <AddVeiculo />} />
        <Route path="/EditarVeiculo" exact render={() => <EditarVeiculo />} />
      </div>
    </BrowserRouter>
  );
}

export default App;