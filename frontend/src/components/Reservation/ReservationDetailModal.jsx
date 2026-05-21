import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { reservationApi } from '../../services/api'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { COLOR_CLASSES } from './TimeTable'

function PinInput({ value, onChange }) {
  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3].map(i => (
        <input
          key={i}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => {
            const v = e.target.value.replace(/\D/g, '')
            const arr = value.split('')
            arr[i] = v
            onChange(arr.join('').slice(0, 4))
            if (v && i < 3) document.getElementById(`detail-pin-${i + 1}`)?.focus()
          }}
          onKeyDown={e => {
            if (e.key === 'Backspace' && !value[i] && i > 0)
              document.getElementById(`detail-pin-${i - 1}`)?.focus()
          }}
          id={`detail-pin-${i}`}
          className="w-12 h-12 text-center text-xl font-bold
            bg-dark-700 border border-white/10 rounded-xl text-white
            focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30
            outline-none transition-all duration-200"
        />
      ))}
    </div>
  )
}

export default function ReservationDetailModal({ reservation, isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState('view') // view | verify-delete | verify-edit
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!reservation) return null

  const color = COLOR_CLASSES[reservation.colorIndex % COLOR_CLASSES.length]

  const handleVerifyAndDelete = async () => {
    if (password.length !== 4) { setError('비밀번호 4자리를 입력해주세요'); return }
    setLoading(true)
    setError('')
    try {
      await reservationApi.delete(reservation.id, password)
      onSuccess()
      onClose()
    } catch (e) {
      setError(e.message || '비밀번호가 일치하지 않습니다')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMode('view')
    setPassword('')
    setError('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with color stripe */}
            <div className={`-mx-6 -mt-6 mb-5 h-1.5 rounded-t-2xl bg-gradient-to-r ${color.bg}`} />

            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-2 h-2 rounded-full ${color.dot}`} />
                  <h2 className="text-lg font-bold text-white">{reservation.teamName}</h2>
                </div>
                <p className="text-sm text-gray-400">
                  {reservation.reservationDate && format(new Date(reservation.reservationDate), 'M월 d일 (EEE)', { locale: ko })}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {mode === 'view' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Time info */}
                <div className="glass rounded-xl p-4 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white font-mono">
                      {reservation.startTime?.slice(0, 5)} – {reservation.endTime?.slice(0, 5)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {reservation.startTime && reservation.endTime &&
                        `${parseInt(reservation.endTime) - parseInt(reservation.startTime)}시간 예약`}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setMode('verify-delete'); setPassword('') }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium
                      border border-red-500/30 text-red-400 hover:bg-red-500/10
                      transition-all duration-200"
                  >
                    삭제
                  </button>
                </div>
              </motion.div>
            )}

            {(mode === 'verify-delete') && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">예약 삭제를 위해</p>
                  <p className="text-sm font-semibold text-white">비밀번호 4자리를 입력해주세요</p>
                </div>

                <PinInput value={password} onChange={setPassword} />

                {error && (
                  <div className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-2 px-3">
                    {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <button onClick={reset} className="btn-ghost flex-1 py-2.5">취소</button>
                  <button
                    onClick={handleVerifyAndDelete}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium
                      bg-gradient-to-r from-red-600 to-red-700 text-white
                      hover:opacity-90 transition-all duration-200"
                  >
                    {loading ? '처리 중...' : '삭제 확인'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
