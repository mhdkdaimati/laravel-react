// import logo from './logo.svg';
// import './App.css';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
// import EditProduct from './components/edit.component';
// import CreateProduct from './components/create.component';

import ProductList from './components/list.component';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Link to={'/'}>Products</Link>
      </Routes>
    </Router>
    </>
  );
}

export default App;
