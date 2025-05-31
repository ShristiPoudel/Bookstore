import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import "./assets/sass/main.scss"
import Explore from './pages/Explore';
import ListBook from './pages/ListBook';

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element= {<Homepage/>}/>
      <Route path='explore' element={<Explore/>}/>
     <Route path="dashboard">
     <Route index element= {<Dashboard/>}/>
      <Route path='addbook' element={<AddBook/>}/>
      <Route path='listbook' element={<ListBook/>}/>
     </Route>
    </Routes>
   </Router>
  )
}

export default App