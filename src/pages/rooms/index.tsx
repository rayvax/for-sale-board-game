import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RoomsDashboard from './RoomsDashboard';

function RoomsPage() {
  return (
    <Routes>
      <Route path='/' element={<RoomsDashboard />} />
      <Route path='/:code' element={null} />
    </Routes>
  );
}

export default RoomsPage;
