import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import Home from './components/Home';
import Nav from './components/Nav';
import ArticleDetail from './components/ArticleDetail';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PostEditor from './components/PostEditor';
import AllCategories from './components/AllCategories';
import CategoryDetail from './components/CategoryDetail';
import Sidebar from './components/Sidebar';

function App() {
  const [hasToken, setHasToken] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const changeToken = (value: boolean) => {
    setHasToken(value);
  }

  const controlSidebar = () => {
    showSidebar == false ? setShowSidebar(true) : setShowSidebar(false);
  }

  return (
    <Router>
      <div className='App'>
        <Nav hasToken={hasToken} controlSidebar={controlSidebar}/>
        <Routes>
          <Route path='/' element={<Home changeToken={changeToken}/>}/>
          <Route path='/posts/:postid' element={<ArticleDetail changeToken={changeToken}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/new' element={<PostEditor/>}/>
          <Route path='/allcategories' element={<AllCategories/>}/>
          <Route path='/category/:categoryid' element={<CategoryDetail/>}/>
        </Routes>
      </div>
      <Sidebar showSidebar={showSidebar} hasToken={hasToken} controlSidebar={controlSidebar} changeToken={changeToken}/>
      <div className={showSidebar == true ? 'cover covering' : 'cover'}></div>
    </Router>
  )
}

export default App
