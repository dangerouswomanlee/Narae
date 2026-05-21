import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { reservationApi } from '../../services/api'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const MIN_MINUTES = 9 * 60   // 09:00
const MAX_MINUTES = 22 * 60  // 22:00


function minutesToDisplay(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function minutesToApiTime(minutes) {
  return minutesToDisplay(minutes) + ':00'
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}분`
  if (minutes % 60 === 0) return `${minutes / 60}시간`
  return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`
}

function ArrowButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-7 flex items-center justify-center rounded-lg transition-all duration-150
        ${disabled
          ? 'text-gray-700 cursor-not-allowed'
          : 'text-gray-400 hover:text-white hover:bg-white/10 active:scale-95'
        }`}
    >
      {children}
    </button>
  )
}

function TimeSelect({ label, value, onChange, minVal, maxVal }) {
  const hours = Math.floor(value / 60)
  const minutes = value % 60

  const changeHour = (delta) => {
    const newVal = value + delta * 60
    if (newVal >= minVal && newVal <= maxVal) onChange(newVal)
  }

  const changeMinute = (delta) => {
    const newVal = value + delta * 10
    if (newVal >= minVal && newVal <= maxVal) onChange(newVal)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-400 font-medium">{label}</label>
      <div className="glass rounded-xl px-3 py-2 flex items-center justify-center gap-1">
        {/* Hour */}
        <div className="flex flex-col items-center">
          <ArrowButton onClick={() => changeHour(1)} disabled={value + 60 > maxVal}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </ArrowButton>
          <span className="text-xl font-bold text-white w-9 text-center tabular-nums">
            {String(hours).padStart(2, '0')}
          </span>
          <ArrowButton onClick={() => changeHour(-1)} disabled={value - 60 < minVal}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </ArrowButton>
        </div>

        <span className="text-xl font-bold text-gray-500 mb-0.5">:</span>

        {/* Minute */}
        <div className="flex flex-col items-center">
          <ArrowButton onClick={() => changeMinute(1)} disabled={value + 10 > maxVal}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </ArrowButton>
          <span className="text-xl font-bold text-white w-9 text-center tabular-nums">
            {String(minutes).padStart(2, '0')}
          </span>
          <ArrowButton onClick={() => changeMinute(-1)} disabled={value - 10 < minVal}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </ArrowButton>
        </div>
      </div>
    </div>
  )
}

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
            if (v && i < 3) {
              document.getElementById(`pin-${i + 1}`)?.focus()
            }
          }}
          onKeyDown={e => {
            if (e.key === 'Backspace' && !value[i] && i > 0) {
              document.getElementById(`pin-${i - 1}`)?.focus()
            }
          }}
          id={`pin-${i}`}
          className="w-12 h-12 text-center text-xl font-bold
            bg-dark-700 border border-white/10 rounded-xl text-white
            focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
            outline-none transition-all duration-200"
        />
      ))}
    </div>
  )
}

export default function ReservationModal({ isOpen, onClose, selectedDate, defaultStartHour, onSuccess }) {
  const [step, setStep] = useState(1)
  const [startMinutes, setStartMinutes] = useState((defaultStartHour || 9) * 60)
  const [endMinutes, setEndMinutes] = useState(((defaultStartHour || 9) + 1) * 60)
  const [teamName, setTeamName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      const start = (defaultStartHour || 9) * 60
      setStep(1)
      setStartMinutes(start)
      setEndMinutes(start + 60)
      setTeamName('')
      setPassword('')
      setError('')
    }
  }, [isOpen, defaultStartHour])

  useEffect(() => {
    if (endMinutes <= startMinutes) setEndMinutes(startMinutes + 10)
  }, [startMinutes])

  const handleSubmit = async () => {
    if (!teamName.trim()) { setError('팀 이름을 입력해주세요'); return }
    if (password.length !== 4) { setError('비밀번호 4자리를 입력해주세요'); return }

    setLoading(true)
    setError('')
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd')
      await reservationApi.create({
        teamName: teamName.trim(),
        reservationDate: dateStr,
        startTime: minutesToApiTime(startMinutes),
        endTime: minutesToApiTime(endMinutes),
        password,
      })
      onSuccess()
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const totalMinutes = endMinutes - startMinutes

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
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">합주 예약</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {selectedDate && format(selectedDate, 'M월 d일 (EEE)', { locale: ko })}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 text-xs font-medium transition-colors
                    ${step >= s ? 'text-white' : 'text-gray-600'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                      ${step >= s ? 'bg-white text-dark-900' : 'bg-dark-600 text-gray-500'}`}>
                      {s}
                    </div>
                    {s === 1 ? '시간 선택' : '정보 입력'}
                  </div>
                  {s < 2 && <div className={`flex-1 h-px ${step > s ? 'bg-white/40' : 'bg-dark-600'}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Time selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <TimeSelect
                    label="시작 시간"
                    value={startMinutes}
                    onChange={setStartMinutes}
                    minVal={MIN_MINUTES}
                    maxVal={21 * 60 + 50}
                  />
                  <TimeSelect
                    label="종료 시간"
                    value={endMinutes}
                    onChange={setEndMinutes}
                    minVal={startMinutes + 10}
                    maxVal={MAX_MINUTES}
                  />
                </div>

                {/* Duration summary */}
                <div className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {minutesToDisplay(startMinutes)} – {minutesToDisplay(endMinutes)}
                    </div>
                    <div className="text-xs text-gray-400">{formatDuration(totalMinutes)} 예약</div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn-primary w-full py-2.5"
                >
                  다음
                </button>
              </motion.div>
            )}

            {/* Step 2: Info input */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">팀 이름</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                    placeholder="예: 밴드 이름 or 닉네임"
                    className="input-dark"
                    maxLength={50}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-2 block">
                    비밀번호 (수정/삭제 시 사용)
                  </label>
                  <PinInput value={password} onChange={setPassword} />
                </div>

                {error && (
                  <div className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-2 px-3">
                    {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <button onClick={() => { setStep(1); setError('') }} className="btn-ghost flex-1 py-2.5">
                    이전
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-primary flex-1 py-2.5"
                  >
                    {loading ? (
                      <svg className="animate-spin w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : '예약 완료'}
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
