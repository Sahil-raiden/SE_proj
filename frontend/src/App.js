import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/home/home';
import Navbar from './components/navbar';
import Addnews from './components/Form/addnews'
import Subscribe from './components/subscribe/subscribe';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Chatbot from './components/AiChat/ChatBot'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route
          path='/'
          element={<Home/>}/>
          <Route
          path='/form'
          element={<Addnews/>}/>
          <Route
          path='/subscribe'
          element={<Subscribe/>}/>
          <Route
          path='/chatbot'
          element={<Chatbot/>}/>
          <Route
          path='/login'
          element={<Login/>}/>
          <Route
          path='/Signup'
          element={<Signup/>}/>
        </Routes>
        

      </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
