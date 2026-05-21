import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, isBefore, startOfDay, addMonths, subMonths } from 'date-fns'
import { ko } from 'date-fns/locale'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function MiniCalendar({ selectedDate, onSelect }) {
  const [viewMonth, setViewMonth] = useState(new Date())

  const monthStart = startOfMonth(viewMonth)
  const monthEnd = endOfMonth(viewMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPadding = getDay(monthStart)
  const today = startOfDay(new Date())

  return (
    <div className="card neon-border w-full">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-white">
          {format(viewMonth, 'yyyy년 M월', { locale: ko })}
        </span>
        <button
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div key={d} className={`text-center text-xs font-medium py-1
            ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-500'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map(day => {
          const isPast = isBefore(day, today)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isTodayDay = isToday(day)
          const dayNum = getDay(day)

          return (
            <motion.button
              key={day.toISOString()}
              whileHover={{ scale: isPast ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !isPast && onSelect(day)}
              disabled={isPast}
              className={`
                relative flex items-center justify-center w-8 h-8 mx-auto rounded-lg text-xs font-medium
                transition-all duration-150
                ${isPast ? 'text-gray-700 cursor-not-allowed' :
                  isSelected
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : isTodayDay
                      ? 'text-purple-300 border border-purple-500/40'
                      : dayNum === 0 ? 'text-red-400 hover:bg-red-500/10'
                      : dayNum === 6 ? 'text-blue-400 hover:bg-blue-500/10'
                      : 'text-gray-300 hover:bg-white/10'
                }
              `}
            >
              {format(day, 'd')}
              {isTodayDay && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
