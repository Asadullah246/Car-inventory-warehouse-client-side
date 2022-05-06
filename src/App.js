
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navber from './Components/Navber/Navber';
import Home from './Components/Home/Home';
import Inventory from './Components/Inventory/Inventory';
import AddItem from '../src/Components/AddItem/AddItem';
import ItemDetails from '../src/Components/ItemDetails/ItemDetails';
import Login from './Components/Login/Login';
import Blogs from './Components/Blogs/Blogs';
import NotFound from './Components/NotFound/NotFound';
import MyItem from './Components/MyItem/MyItem';
import RequireAuth from './Components/RequiredAuth/RequireAuth';
import Loading from './Components/Loading';


function App() {
 
  return (
    <div className="App">
      <Navber></Navber>
     <Routes>
       <Route path='/' element={<Home></Home>}></Route>
       <Route path='/home' element={<Home></Home>}></Route>
       <Route path='/blogs' element={<Blogs></Blogs>}></Route>
       <Route path='/login' element={<Login></Login>}></Route>
       <Route path='/add-item' element={<RequireAuth>
        <AddItem></AddItem>
       </RequireAuth>}></Route>

       <Route path='/item-details' element={<RequireAuth>
        <ItemDetails></ItemDetails>
       </RequireAuth>}></Route>

       <Route path='/myitem' element={<RequireAuth>
         <MyItem></MyItem></RequireAuth>}></Route>

       <Route path='/inventory/:id' element={<RequireAuth>
        <Inventory></Inventory>
       </RequireAuth>}></Route>
        <Route path='/loading' element={<Loading></Loading>}></Route>

       <Route path='*' element={<NotFound></NotFound>}></Route>
     </Routes>
    </div>
  );
}

export default App;
