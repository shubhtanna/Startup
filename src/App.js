import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Index from './components/Homepage/Index';
import Signup from './components/pages/Signup';
import Navbar from './components/common/Navbar';
import Login from './components/pages/Login';
import VerifyEmail from './components/pages/VerifyEmail';
import ForgotPassword from './components/pages/ForgotPassword';
import Dashboard from './components/pages/Dashboard';
import MyProfile from './components/Dashboard/MyProfile';
import Footer from './components/common/Footer'
import Settings from './components/Dashboard/Settings'
import AddProduct from './components/Dashboard/Add Product/index'
import { useDispatch, useSelector } from 'react-redux';
import { ShopList } from './components/Shopkeeper/ShopList';
import ProductInfo from './components/Dashboard/Add Product/Product_Information_Form/ProductInfo';
import IndividualMyProducts from './components/Dashboard/Individual/IndividualMyProducts';
import { RenderSteps } from './components/Dashboard/Add Product/RenderSteps';
import { AllProduct } from './components/Dashboard/All_Product/AllProduct';
import { ProductDescModal } from './components/Dashboard/All_Product/ProductDescModal';
import InterestedProduct from './components/Shopkeeper/InterestedProduct';
import InterestedShopkeeper from './components/Shopkeeper/InterestedShopkeeper';
import { EditInterestedProduct } from './components/Shopkeeper/EditInterestedProduct';
import EditProduct from './components/Dashboard/EditProduct'
import Feed from './components/pages/feedback';
import AdminDashboard from './components/AdminDashboard/admin';
import TermsAndCondition from './components/pages/TermsAndCondition';
import About from './components/pages/about';
import Review from './components/pages/review';
import Teams from './components/pages/teams';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.profile)
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path='/' element={<Index />} />

        <Route path='signup' element={<Signup />} />

        <Route path='/about' element={<About />} />

        <Route path='login' element={<Login />} />

        <Route path='verify-email' element={<VerifyEmail />} />

        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="allvendors" element={<ShopList />} />

        <Route path='raise-ticket' element={<Feed />} />

        <Route
          path='/admin' element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

        <Route path='/term' element={<TermsAndCondition />} />

        <Route path="/review" element={<Review />} />

        <Route path='/teams' element={<Teams />} />

        <Route element={<Dashboard />}>

          <Route
            path='/dashboard/my-profile'
            element={
              <ProtectedRoute userOnly={true}>
                <MyProfile />
              </ProtectedRoute>
            } />

          <Route path='/dashboard/Settings'
            element={
              <ProtectedRoute userOnly={true}>
                <Settings />
              </ProtectedRoute>
            } />

          <Route path='/dashboard/add-product' element={
            <ProtectedRoute userOnly={true}>
              <AddProduct />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/edit-product/:productId' element={
            <ProtectedRoute userOnly={true}>
              <EditProduct />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/My-products' element={
            <ProtectedRoute userOnly={true}>
              <IndividualMyProducts />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/all-products' element={
            <ProtectedRoute userOnly={true}>
              <AllProduct />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/interested-products' element={
            <ProtectedRoute userOnly={true}>
              <InterestedProduct />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/interested-products/:id' element={
            <ProtectedRoute userOnly={true}>
              <InterestedShopkeeper />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/intrested-shopkeeper-products' element={
            <ProtectedRoute userOnly={true}>
              <EditInterestedProduct />
            </ProtectedRoute>
          } />

          {/* <Route path='/dashboard/all-products/add-price' element={<ProductDescModal/>}/> */}

          {/* Admin Dashboard Routes */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
