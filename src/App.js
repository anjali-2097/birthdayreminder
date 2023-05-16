import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import AddForm from "./components/AddForm"
import NotFound from './components/NotFound'

function App() {
  return(
    <BrowserRouter>
  <div className="App">
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route path="/admin" element={ <AddForm/> } />
        <Route path="*" element={ <NotFound/> } />
      </Routes>
    </div>
  </BrowserRouter>
  )
  
}

export default App