import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
   <>
   <Provider store={store}>

   <Router>
   <Header/>
    <Routes>
      <Route path='/' element={<Cards/>}/>
      <Route path='/cart/:id' element={<CardsDetails/>}/>
    </Routes>
   </Router>
   </Provider>
   
   </>
  );
}

export default App;
