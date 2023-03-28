import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import HomeGeneral from './components/frontend/HomeGeneral'
import Home from './components/frontend/Home'
import Page403 from './components/errors/Page403'
import Page404 from './components/errors/Page404'
import About from './components/frontend/About'
import Contact from './components/frontend/Contact'
import Cart from './components/frontend/Cart'
import ViewCategoryClient from './components/frontend/collections/ViewCategoryClient'
import ViewProductClient from './components/frontend/collections/ViewProductClient'
import ProductDetail from './components/frontend/collections/ProductDetail'
import Checkout from './components/frontend/Checkout'
import RepairHome from './components/frontend/repair/RepairHome'
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register'
import AdminPrivateRoute from './AdminPrivateRoute'
import MasterLayout from './layouts/admin/MasterLayout'
import Dashboard from './components/admin/Dashboard'
import Profile from './components/admin/Profile'
import Category from './components/admin/category/Category'
import ViewCategory from './components/admin/category/ViewCategory'
import BDT from './components/admin/bdtype/BDT'
import BDS from './components/admin/bdsheets/BDS'
import Devis from './components/admin/devis/Devis'
import CreateDevi from './components/admin/bdsheets/CreateDevi'
import AddProduct from './components/admin/product/AddProduct'
import EditProduct from './components/admin/product/EditProduct'
import ViewProduct from './components/admin/product/ViewProduct'
import AddUser from './components/admin/users/AddUser'
import EditUser from './components/admin/users/EditUser'
import ViewUsers from './components/admin/users/ViewUsers'
import BillPage from './components/admin/order/BillPage'
import Order from './components/admin/order/Order'
import NotAvailable from './components/admin/NotAvailable'
import Test from './Test'

axios.defaults.baseURL = process.env.REACT_APP_URL;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config

})

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomeGeneral />} />
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/403" element={<Page403 />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collections" element={<ViewCategoryClient />} />
        <Route path="/collections/:slug" element={<ViewProductClient />} />
        <Route path="/collections/:category/:slug" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/repair-home" element={<RepairHome />} />
        <Route exact path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/' replace /> : <Login />} />
        <Route exact path="/register" element={localStorage.getItem('auth_token') ? <Navigate to='/' replace /> : <Register />} />
        <Route path="/admin" element={<AdminPrivateRoute><MasterLayout /></AdminPrivateRoute>} >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/add-category" element={<Category />} />
          <Route path="/admin/view-category" element={<ViewCategory />} />
          <Route path="/admin/bdtypes" element={<BDT />} />
          <Route path="/admin/bdsheets" element={<BDS />} />
          <Route path="/admin/devis" element={<Devis />} />
          <Route path="/admin/create-devi/:bds_id" element={<CreateDevi />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/view-product" element={<ViewProduct />} />
          <Route path="/admin/edit-product/:product_id" element={<EditProduct />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/view-users" element={<ViewUsers />} />
          <Route path="/admin/edit-user/:user_id" element={<EditUser />} />
          <Route path="/admin/orders" element={<Order />} />
          <Route path="/admin/view-order/:id_order" element={<BillPage />} />
          <Route path="/admin/not-available" element={<NotAvailable />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App