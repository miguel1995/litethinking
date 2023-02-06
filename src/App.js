import './App.css';
import{ BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import UserPage from './pages/userPage';
import CompanyPage from './pages/companyPage';
import ProductPage from './pages/productPage';


function App() {

  //TODO:VALIDAR LOGIN
  //const isAuth = Boolean(useSelector((state)=>state.token));
  const isAuth = true;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserPage/>}></Route>
          <Route path='/home' element={ isAuth ?<UserPage/> : <Navigate to = "/"/>}></Route>
          <Route path='/company/:companyId' element={ isAuth ?<CompanyPage/> : <Navigate to = "/"/>}></Route>
          <Route path='/product/:productId' element={ isAuth ?<ProductPage/> : <Navigate to = "/"/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
