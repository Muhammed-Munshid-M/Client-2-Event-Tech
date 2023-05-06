import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from './components/user/pages/UserLogin';
import SignUp from './components/manager/pages/SignUp';
import Otp from './components/manager/pages/Otp';
import Login from './components/manager/pages/Login';
import AdminLogin from './components/admin/pages/AdminLogin';
import ForgetPswrd from './components/manager/pages/ForgetPswrd';
import ResetPswrd from './components/manager/pages/ResetPswrd';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/manager/pages/Dashboard';
import DashboardAdmin from './components/admin/pages/DashboardAdmin';
import UserSignUp from './components/user/pages/UserSignUp';
import UserOtp from './components/user/pages/UserOtp';
import Home from './components/user/pages/Home';
import ForgotPswrd from './components/user/pages/ForgotPswrd';
import ResetPassword from './components/user/pages/ResetPswrd';
import Users from './components/admin/pages/Users';
import Managers from './components/admin/pages/Managers';
import PublicRoute from './components/PublicRoute';
import Bookings from './components/manager/pages/Bookings';
import ApprovalList from './components/admin/pages/ApprovalList';
import ManagerRoute from './components/manager/ManagerRoute';
import ProtectedRoute from './components/manager/ProtectedRoute';
import Services from './components/manager/pages/Services';
import CompanyList from './components/user/pages/CompanyList';
import UserProtectedRoute from './components/user/UserProtectedRoute';
import MenuList from './components/manager/pages/MenuList';
import CompanyDetails from './components/user/pages/CompanyDetails';
import ManagerProfile from './components/manager/pages/ManagerProfile';
import Profile from './components/user/pages/Profile';
import ServiceList from './components/manager/pages/ServiceList';
import CartList from './components/user/pages/CartList';
import Checkout from './components/user/pages/Checkout';
import CheckoutPage from './components/user/pages/CheckoutPage';
import UserMenuList from './components/user/pages/UserMenuList';
import SelectService from './components/user/pages/SelectService';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path='/' element={
            <Home />
          } />
          <Route path='/login' element={
            <PublicRoute>
              <UserLogin />
            </PublicRoute>
          } />
          <Route path='/signUp' element={
            <PublicRoute>
              <UserSignUp />
            </PublicRoute>
          } />
          <Route path='/otp' element={
            <UserOtp />
          } />
          <Route path='/forgot' element={
            <ForgotPswrd />
          } />
          <Route path='/reset-pswrd' element={
            <ResetPassword />
          } />
          <Route path='/profile' element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          } />
          <Route path='/company-list' element={
            <UserProtectedRoute>
              <CompanyList />
            </UserProtectedRoute>
          } />
          <Route path='/company-details' element={
            <UserProtectedRoute>
              <CompanyDetails />
            </UserProtectedRoute>
          } />
          <Route path='/select-service' element={
            <UserProtectedRoute>
              <SelectService />
            </UserProtectedRoute>
          } />
          <Route path='/select-menu-list' element={
            <UserProtectedRoute>
              <UserMenuList />
            </UserProtectedRoute>
          } />
          <Route path='/cart-list' element={
            <UserProtectedRoute>
              <CartList />
            </UserProtectedRoute>
          } />
          <Route path='/checkout' element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          } />
          <Route path='/checkout-page' element={
            <CheckoutPage />
          } />
          <Route path='/manager' element={
            <ManagerRoute>
              <Login />
            </ManagerRoute>
          } />
          <Route path='/manager/signUp' element={
            <ManagerRoute>
              <SignUp />
            </ManagerRoute>
          } />
          <Route path='/manager/otp' element={
            <Otp />
          } />
          <Route path='/manager/forgot' element={
            <ForgetPswrd />
          } />
          <Route path='/manager/reset-pswrd' element={
            <ResetPswrd />
          } />
          <Route path='/manager/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/manager/bookings' element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          } />
          <Route path='/manager/menu-list' element={
            <ProtectedRoute>
              <MenuList />
            </ProtectedRoute>
          } />
          <Route path='/manager/services' element={
            <ProtectedRoute>
              <ServiceList />
            </ProtectedRoute>
          } />
          <Route path='/manager/add-services' element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } />
          <Route path='/manager/profile' element={
            <ProtectedRoute>
              <ManagerProfile />
            </ProtectedRoute>
          } />
          <Route path='/admin' element={
            <AdminLogin />
          } />
          <Route path='/admin/dashboard' element={
            <DashboardAdmin />
          } />
          <Route path='/admin/users' element={
            <Users />
          } />
          <Route path='/admin/managers' element={
            <Managers />
          } />
          <Route path='/admin/approval-list' element={
            <ApprovalList />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
