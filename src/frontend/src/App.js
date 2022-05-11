import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';

import './styles/styles.scss'
import NoMatchPage from './components/NoMatchPage/NoMatchPage';
import AuthPageContainer from './components/Autorization/AuthPageContainer';
import Exit from './components/Autorization/Exit';
import TablePageContainer from './components/Table/TablePage';

function App() {

  return (
    <BrowserRouter>
    <div className='wrapper'>
      <Header/>
      <Routes>
        <Route path='/table' element={<TablePageContainer/>}></Route>
        <Route path='/auth' element={<AuthPageContainer/>}></Route>
        <Route path='/exit' element={<Exit/>}></Route>
        <Route path='*' element={<NoMatchPage/>}></Route>
      </Routes>
    </div>
      
      
    </BrowserRouter>
  );
}

export default App;
