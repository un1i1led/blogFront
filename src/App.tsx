import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import Home from './components/Home';
import Nav from './components/Nav';
import ArticleDetail from './components/ArticleDetail';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PostEditor from './components/PostEditor';

function App() {
  const [hasToken, setHasToken] = useState(false);

  const changeToken = (value: boolean) => {
    setHasToken(value);
  }

  return (
    <Router>
      <div className='App'>
        <Nav hasToken={hasToken}/>
        <Routes>
          <Route path='/' element={<Home changeToken={changeToken}/>}/>
          <Route path='/posts/:postid' element={<ArticleDetail changeToken={changeToken}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/new' element={<PostEditor/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
