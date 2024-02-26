
import './App.css'
import { Routes, Route } from 'react-router-dom'
import TareasForm from './paginas/TareasForm'
// import NotFound from './paginas/NotFound'
import { TareasContextProv } from './componentes/context/TareasContext'
import Alerta from './componentes/Alertas/Alerta'
import NuevoRegistro from './componentes/Alertas/NuevoRegistro'
import TablaNueva from './componentes/TablaNueva'
import TablaInactivos from './componentes/TablaInactivos'
import Ficha from './componentes/Ficha.jsx'
import NavBar from './componentes/Navbar.jsx'
import Turno from './componentes/Turno.jsx'
import NuevoTurno from './componentes/Alertas/NuevoTurno.jsx'
import ModalTurnos from './componentes/Alertas/ModalTurnos.jsx'
import ClickTurno from './componentes/Alertas/ClickTurno.jsx'




function App() {


  return (
    // className='container bg-orange-200 pt-20'
    <div>
      
      <NavBar />
      <TareasContextProv>
        <Routes>
          <Route path='/' element={<Turno />} />
          <Route path='/turno/:idpaciente' Component={Turno} />
          <Route path='/tabla' element={<TablaNueva />} />
          <Route path='/tablainac' element={<TablaInactivos />} />
          <Route path='/ficha/:idpaciente' Component={Ficha} />
          <Route path='/new' element={<TareasForm />} />
          <Route path='/edit/:idpaciente' element={<TareasForm />} />
          <Route path='/borrar/:idpaciente' Component={Alerta} />
          <Route path='/otroReg' Component={NuevoRegistro} />
          <Route path='/otroturno' Component={NuevoTurno} />
          <Route path='/turno' Component={Turno} />
          <Route path='/turnodirecto' Component={ModalTurnos} />
          <Route path='/clickturno/:idpaciente' Component={ClickTurno} />

          {/* <Route path='*' Component={NotFound} /> */}
        </Routes>
      </TareasContextProv>
    </div>

  )
}

export default App
