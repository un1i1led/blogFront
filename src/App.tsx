import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Nav from './components/Nav';
import ArticleDetail from './components/ArticleDetail';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/posts/:postid' element={<ArticleDetail/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
