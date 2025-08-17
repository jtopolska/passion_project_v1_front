import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/Home'
import { Admin } from './pages/adminPage/Admin';
import { PostPage } from './pages/singlePost/Post';
import { AdminLogin } from './features/login/AdminLogin';
import { AdminProtected } from './features/login/AdminProtected';

function App() {
  return (
    <div className="App">
      {/* <Header navMenu={ navMenu } /> */}

      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/admin' element={ <Admin /> }></Route>
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminProtected />} />
        {/* <Route path='/news' element={ <AllNews /> }></Route>
        <Route path='/about-us' element={ <AboutUs /> }></Route>
        <Route path='/corporatization' element={ <Corporatization /> }></Route>
        <Route path='/contacts' element={ <Contacts /> }></Route>
        <Route path='/post/:id' element={ <SingleNews /> }></Route>
        <Route path='/tag/:tag' element={ <NewsByTag /> }></Route>
        <Route path='/category/:category' element={ <NewsByCategory /> }></Route> */}
      </Routes>

      {/* <Footer navMenu={ navMenu } /> */}
    </div>
  );
}

export default App;
