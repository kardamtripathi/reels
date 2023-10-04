import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './Components/Login';
import {AuthProvider} from './Context/AuthContext'
import Feed from './Components/Feed'
import PrivateRoute from './Components/PrivateRoute'
import Profile from './Components/Profile'
function App() {
  return (
    // <BrowserRouter>
    //   {/* <Signup /> */}
    //   <Login />
    // </BrowserRouter>
    <Router>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<PrivateRoute />}>
              <Route exact path='/profile/:id' element={<Profile/>}/>
            </Route>
            {/* <Route path='/' element = {<Feed />} /> */}
            {/* <PrivateRoute path="/" element = {<Outlet />} /> */}
            <Route path="/" element={<PrivateRoute />}>
              <Route exact path='/' element={<Feed/>}/>
            </Route>
          </Routes>
        </AuthProvider>
    </Router>
  );
} 

export default App;
