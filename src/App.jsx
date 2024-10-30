import { React } from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import PostDetail from './components/posts/PostDetail';
import PostForm from './components/posts/PostForm';
import NotFound from './Pages/NotFoundPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//bootstrap for styling the entire app 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <Routes>
    {/* Navigation Routes */}
      <Route path="/" element={<HomePage/>}/>
      <Route path="/create-post" element={<PostForm/>}/>
      <Route path="/edit-post/:id" element={<PostForm/>}/>
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
    </Routes>
  </Router>
  )
}

export default App;
