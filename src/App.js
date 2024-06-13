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

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.profile)
  return (
    <div>

      <Navbar/>
      <Routes>

        <Route path='/' element={<Index/>}/>

        <Route path='signup' element={<Signup/>}/>

        <Route path='login' element={<Login/>}/>

        <Route path='verify-email' element={<VerifyEmail/>}/>

        <Route path="forgot-password" element={<ForgotPassword/>}/>

        <Route path="allvendors" element={<ShopList/>}/>

        <Route element={<Dashboard/>}>

          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>

          <Route path='/dashboard/Settings' element={<Settings/>}/>

          <Route path='/dashboard/add-product' element={<AddProduct/>}/>

          <Route path='/dashboard/My-products' element={<IndividualMyProducts/>}/>

          <Route path='/dashboard/all-products' element={<AllProduct/>}/>

          <Route path='/dashboard/interested-products' element={<InterestedProduct/>}/>

          <Route path='/dashboard/interested-products/:id' element={<InterestedShopkeeper/>}/>

          <Route path='/dashboard/intrested-shopkeeper-products' element={<EditInterestedProduct/>}/>

          {/* <Route path='/dashboard/all-products/add-price' element={<ProductDescModal/>}/> */}

        </Route>

      </Routes>


    </div>
  );
}

export default App;
