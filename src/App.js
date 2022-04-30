
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navber from './Components/Navber/Navber';
import Home from './Components/Home/Home';
import Inventory from './Components/Inventory/Inventory';
import AddItem from './AddItem/AddItem';

function App() {
  return (
    <div className="App">
      <Navber></Navber>
     <Routes>
       <Route path='/' element={<Home></Home>}></Route>
       <Route path='/add-item' element={<AddItem></AddItem>}></Route>

       <Route path='/inventory/:id' element={<Inventory></Inventory>}></Route>
     </Routes>
    </div>
  );
}

export default App;
