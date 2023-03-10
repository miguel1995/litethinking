import './App.css';
import{ BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import UserPage from './pages/userPage';
import CompanyPage from './pages/companyPage';
import ProductPage from './pages/productPage';
import {useSelector}from 'react-redux';


function App() {

  
  const isAuth = Boolean(useSelector((state)=>state.token));
  

  return (
    <div style={{backgroundColor: "#7C96A8"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/home' element={ isAuth ?<UserPage/> : <Navigate to = "/"/>}></Route>
          <Route path='/company/:companyId' element={ isAuth ?<CompanyPage/> : <Navigate to = "/"/>}></Route>
          <Route path='/product/:productId' element={ isAuth ?<ProductPage/> : <Navigate to = "/"/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
