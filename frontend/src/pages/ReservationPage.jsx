import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import MiniCalendar from '../components/Reservation/MiniCalendar'
import TimeTable from '../components/Reservation/TimeTable'
import ReservationModal from '../components/Reservation/ReservationModal'
import ReservationDetailModal from '../components/Reservation/ReservationDetailModal'
import { reservationApi } from '../services/api'

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [defaultStartHour, setDefaultStartHour] = useState(9)
  const [selectedReservation, setSelectedReservation] = useState(null)

  const fetchReservations = useCallback(async () => {
    if (!selectedDate) return
    setLoading(true)
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd')
      const data = await reservationApi.getByDate(dateStr)
      setReservations(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const handleSlotClick = (hour) => {
    setDefaultStartHour(hour)
    setShowCreate(true)
  }

  const isToday = selectedDate && new Date(selectedDate).toDateString() === new Date().toDateString()
  const isTomorrow = selectedDate && (() => {
    const t = new Date(); t.setDate(t.getDate() + 1)
    return new Date(selectedDate).toDateString() === t.toDateString()
  })()

  return (
    <div className="min-h-screen p-4 md:p-8 pt-14 md:pt-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-1">합주 예약</h1>
        <p className="text-gray-400 text-sm">날짜를 선택하고 원하는 시간을 예약하세요 · 운영시간 09:00 ~ 22:00</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Calendar + info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-72 flex-shrink-0 space-y-4"
        >
          <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />

          {/* Selected date info */}
          <div className="card neon-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {format(selectedDate, 'yyyy년 M월 d일', { locale: ko })}
                  {isToday && <span className="ml-2 text-xs bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded-md">오늘</span>}
                  {isTomorrow && <span className="ml-2 text-xs bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded-md">내일</span>}
                </div>
                <div className="text-xs text-gray-400">
                  {format(selectedDate, 'EEEE', { locale: ko })}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">예약 건수</span>
                <span className="font-semibold text-white">{reservations.length}건</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            {(() => {
              const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
              const booked = reservations.reduce((acc, r) => acc + toMin(r.endTime) - toMin(r.startTime), 0)
              const total = 13 * 60
              const fmtMin = m => m % 60 === 0 ? `${m / 60}h` : `${Math.floor(m / 60)}h ${m % 60}m`
              return (
                <>
                  <div className="card">
                    <div className="text-xs text-gray-500 mb-1">예약된 시간</div>
                    <div className="text-lg font-bold text-white">{fmtMin(booked)}</div>
                  </div>
                  <div className="card">
                    <div className="text-xs text-gray-500 mb-1">남은 시간</div>
                    <div className="text-lg font-bold text-green-400">{fmtMin(total - booked)}</div>
                  </div>
                </>
              )
            })()}
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            예약하기
          </button>
        </motion.div>

        {/* Right: Timetable */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex-1 card neon-border min-h-[600px]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">타임테이블</h2>
            {loading && (
              <svg className="animate-spin w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-dark-600 border border-white/5" />
              <span>빈 시간 (클릭하여 예약)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-600/60" />
              <span>예약됨</span>
            </div>
          </div>

          <TimeTable
            reservations={reservations}
            selectedDate={selectedDate}
            onSlotClick={handleSlotClick}
            onReservationClick={setSelectedReservation}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <ReservationModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        selectedDate={selectedDate}
        defaultStartHour={defaultStartHour}
        onSuccess={fetchReservations}
      />

      <ReservationDetailModal
        reservation={selectedReservation}
        isOpen={!!selectedReservation}
        onClose={() => setSelectedReservation(null)}
        onSuccess={fetchReservations}
      />
    </div>
  )
}
