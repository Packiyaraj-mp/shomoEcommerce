
import './App.css';
import axios from 'axios';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/layout/Home';
import {Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './components/layout/Store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/profile';
import ProductedRoute from './components/route/ProductedRoute';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/updatePassword';
import ForgotPassword from './components/user/forgetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDeail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import ResetPassword from './components/user/ResetPassword';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';


function App() {
   const [stripeApiKey,setStripeApiKey]=useState("");
  
  useEffect(async()=>{

   await store.dispatch(loadUser);
   async function getStripeApiKey(){
         try{
          const {data}=await axios.get('/api/v1/stripeapi');
          setStripeApiKey(data.stripeApiKey)

         }catch(err){
            console.log(err)
         }
        
   }
   getStripeApiKey()
 },[]);


 
  return (
    <Router>
    <div className="App">
      <HelmetProvider>
              <Header/>
              <div  className='container container-fluid'>
                  <ToastContainer theme='dark'/>
                  <Routes>
                     <Route path='/' element={ <Home/>}/>
                     <Route path='/search/:keyword' element={ <ProductSearch/>}/>
                     <Route path='/product/:id' element={ <ProductDetail/>}/>
                     <Route path='/login' element={ <Login/>}/>
                     <Route path='/register' element={<Register/>}/>
                     <Route path='/myprofile' element={<ProductedRoute><Profile/></ProductedRoute>}/>
                     <Route path='/myprofile/update' element={<ProductedRoute><UpdateProfile/></ProductedRoute>}/>
                     <Route path='/myprofile/password/change' element={<ProductedRoute><UpdatePassword/></ProductedRoute>}/>
                     <Route path='/password/forgot' element={<ForgotPassword/>}/>
                     <Route path='/cart' element={<Cart/>}/>
                     <Route path='/shipping' element={<Shipping/>}/>
                     <Route path='/order/confirm' element={<ProductedRoute><ConfirmOrder/></ProductedRoute>}/>
                     {stripeApiKey &&  <Route path='/payment' element={<ProductedRoute><Elements stripe={loadStripe(stripeApiKey)}> <Payment/></Elements></ProductedRoute>}/>}
                     <Route path='/order/success' element={<ProductedRoute><OrderSuccess/></ProductedRoute>}/>
                     <Route path='/orders' element={<ProductedRoute><UserOrders/></ProductedRoute>}/>
                     <Route path='/order/:id' element={<ProductedRoute><OrderDetail/></ProductedRoute>}/>
                 </Routes>
              </div>
              {/* admin routes */}
              <Routes>
                  <Route path='/admin/dashboard' element={<ProductedRoute isAdmin={true}><Dashboard/></ProductedRoute>}/>
                  <Route path='/admin/products' element={<ProductedRoute isAdmin={true}><ProductList/></ProductedRoute>}/>
                  <Route path='/admin/products/create' element={<ProductedRoute isAdmin={true}><NewProduct/></ProductedRoute>}/>
                  <Route path='/admin/product/:id' element={<ProductedRoute isAdmin={true}><UpdateProduct/></ProductedRoute>}/>
                  <Route path='/admin/orders' element={<ProductedRoute isAdmin={true}><OrderList/></ProductedRoute>}/>
                  <Route path='/admin/order/:id' element={<ProductedRoute isAdmin={true}><UpdateOrder/></ProductedRoute>}/>
                  <Route path='/admin/users' element={<ProductedRoute isAdmin={true}><UserList/></ProductedRoute>}/>
                  <Route path='/admin/user/:id' element={<ProductedRoute isAdmin={true}><UpdateUser/></ProductedRoute>}/>
                  <Route path='/admin/reviews' element={<ProductedRoute isAdmin={true}><ReviewList/></ProductedRoute>}/>
                  <Route path='/password/reset/:token' element={<ResetPassword/>}/>

             </Routes>
           <Footer/>
              
      </HelmetProvider>
       
    </div>

    </Router>
   
  );
}

export default App;
