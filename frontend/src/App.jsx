import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar'
import ReservationPage from './pages/ReservationPage'
import BandPage from './pages/BandPage'
import NoticePage from './pages/NoticePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 md:ml-60 transition-all duration-300 min-h-screen">
          <Routes>
            <Route path="/" element={<ReservationPage />} />
            <Route path="/band" element={<BandPage />} />
            <Route path="/notice" element={<NoticePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
