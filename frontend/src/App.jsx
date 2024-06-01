import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css'

function App(){

return(
  <>
   <div>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          
        </Routes>
    </BrowserRouter>
      </div>
  </>
)


}

export default App;

