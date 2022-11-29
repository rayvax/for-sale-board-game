import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/account';
import NotFound from './pages/errors/NotFound';
import { GamePage } from './pages/game';
import HomePage from './pages/home';
import RoomsPage from './pages/rooms';
import { gamePath, homePagePath, roomPath } from './utils/paths';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={homePagePath} element={<HomePage />} />
          <Route path='/account/*' element={<AccountPage />} />
          <Route path={roomPath('*')} element={<RoomsPage />} />
          <Route path={gamePath(':code')} element={<GamePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
