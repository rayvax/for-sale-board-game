import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/account';
import NotFound from './pages/errors/NotFound';
import HomePage from './pages/home';
import RoomsPage from './pages/rooms';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/account/*' element={<AccountPage />} />
        <Route path='/rooms/*' element={<RoomsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
