import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const HOURS = Array.from({ length: 13 }, (_, i) => i + 9) // 9 ~ 21
const SLOT_HEIGHT = 56 // px per hour

const COLOR_CLASSES = [
  { bg: 'from-purple-600/80 to-purple-800/80', border: 'border-purple-400/50', text: 'text-purple-100', dot: 'bg-purple-400' },
  { bg: 'from-pink-600/80 to-pink-800/80', border: 'border-pink-400/50', text: 'text-pink-100', dot: 'bg-pink-400' },
  { bg: 'from-blue-600/80 to-blue-800/80', border: 'border-blue-400/50', text: 'text-blue-100', dot: 'bg-blue-400' },
  { bg: 'from-emerald-600/80 to-emerald-800/80', border: 'border-emerald-400/50', text: 'text-emerald-100', dot: 'bg-emerald-400' },
  { bg: 'from-orange-600/80 to-orange-800/80', border: 'border-orange-400/50', text: 'text-orange-100', dot: 'bg-orange-400' },
  { bg: 'from-cyan-600/80 to-cyan-800/80', border: 'border-cyan-400/50', text: 'text-cyan-100', dot: 'bg-cyan-400' },
  { bg: 'from-yellow-600/80 to-yellow-800/80', border: 'border-yellow-400/50', text: 'text-yellow-100', dot: 'bg-yellow-400' },
  { bg: 'from-rose-600/80 to-rose-800/80', border: 'border-rose-400/50', text: 'text-rose-100', dot: 'bg-rose-400' },
]

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function formatTime(timeStr) {
  return timeStr.slice(0, 5)
}

export default function TimeTable({ reservations, onSlotClick, onReservationClick, selectedDate }) {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const isToday = selectedDate && new Date(selectedDate).toDateString() === now.toDateString()

  const reservationBlocks = useMemo(() => {
    return reservations.map(r => {
      const startMin = timeToMinutes(r.startTime)
      const endMin = timeToMinutes(r.endTime)
      const top = (startMin - 9 * 60) * SLOT_HEIGHT / 60
      const height = (endMin - startMin) * SLOT_HEIGHT / 60
      const color = COLOR_CLASSES[r.colorIndex % COLOR_CLASSES.length]
      return { ...r, top, height, color }
    })
  }, [reservations])

  const currentTimeTop = isToday
    ? ((currentHour * 60 + currentMinute - 9 * 60) * SLOT_HEIGHT) / 60
    : -1

  const handleSlotClick = (hour) => {
    if (!selectedDate) return
    const clicked = new Date(selectedDate)
    clicked.setHours(hour, 0, 0, 0)
    const now2 = new Date()
    if (clicked < now2) return
    onSlotClick(hour)
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[320px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">※ 클릭하여 예약</span>
        </div>

        <div className="relative flex" style={{ minHeight: SLOT_HEIGHT * 13 }}>
          {/* Time labels */}
          <div className="w-14 flex-shrink-0 relative">
            {HOURS.map(hour => (
              <div
                key={hour}
                className="absolute flex items-start justify-end pr-3"
                style={{ top: (hour - 9) * SLOT_HEIGHT - 1, height: SLOT_HEIGHT }}
              >
                <span className="text-xs text-gray-500 font-mono mt-0.5">
                  {String(hour).padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {/* Grid area */}
          <div className="flex-1 relative">
            {/* Hour rows */}
            {HOURS.map((hour, i) => (
              <div
                key={hour}
                className="absolute left-0 right-0 border-t border-dashed border-white/5 cursor-pointer group"
                style={{ top: i * SLOT_HEIGHT, height: SLOT_HEIGHT }}
                onClick={() => handleSlotClick(hour)}
              >
                <div className="absolute inset-0 rounded-lg group-hover:bg-white/[0.02] transition-colors duration-150" />
                {/* Half-hour marker */}
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-white/[0.03]" />
              </div>
            ))}

            {/* Bottom border */}
            <div
              className="absolute left-0 right-0 border-t border-dashed border-white/5"
              style={{ top: 13 * SLOT_HEIGHT }}
            />

            {/* Current time indicator */}
            {currentTimeTop > 0 && currentTimeTop < 13 * SLOT_HEIGHT && (
              <div
                className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                style={{ top: currentTimeTop }}
              >
                <div className="w-2 h-2 rounded-full bg-red-400 shadow-lg shadow-red-400/50 flex-shrink-0 -ml-1" />
                <div className="flex-1 border-t border-red-400/60" />
              </div>
            )}

            {/* Reservation blocks */}
            {reservationBlocks.map(block => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.2 }}
                className={`
                  absolute left-1 right-1 rounded-xl
                  bg-gradient-to-b ${block.color.bg}
                  border ${block.color.border}
                  cursor-pointer overflow-hidden
                  backdrop-blur-sm
                  hover:brightness-110 hover:scale-[1.01]
                  transition-all duration-150
                  shadow-lg
                `}
                style={{ top: block.top + 2, height: block.height - 4 }}
                onClick={(e) => { e.stopPropagation(); onReservationClick(block) }}
              >
                <div className="px-2.5 py-1.5 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${block.color.dot} flex-shrink-0`} />
                    <span className={`font-semibold text-xs truncate ${block.color.text}`}>
                      {block.teamName}
                    </span>
                  </div>
                  {block.height >= 44 && (
                    <span className="text-[10px] text-white/60 font-mono ml-3">
                      {formatTime(block.startTime)} – {formatTime(block.endTime)}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { COLOR_CLASSES }
