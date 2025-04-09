import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import EditProduct from './components/edit.component';
import CreateProduct from './components/create.component';

import ProductList from './components/list.component';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Link to={'/'}>Products</Link>
      <Link to={'/create'}>Create products</Link>
      </Routes>
        <Route path="/product/create" element={<CreateProduct/>}></Route>
        <Route path="/product/edit/:id" element={<EditProduct/>}></Route>
        <Route path="/" element={<ProductList/>}></Route>
    </Router>
    </>
  );
}

export default App;
