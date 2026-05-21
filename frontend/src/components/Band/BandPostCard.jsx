import React from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const PART_COLORS = {
  '보컬': { bg: 'bg-pink-500/20', text: 'text-pink-300', border: 'border-pink-500/30' },
  '기타': { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30' },
  '베이스': { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/30' },
  '드럼': { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30' },
  '키보드': { bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-500/30' },
  '신디': { bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-500/30' },
}

function getPartColor(partName) {
  const key = Object.keys(PART_COLORS).find(k => partName.includes(k))
  return PART_COLORS[key] || { bg: 'bg-gray-500/20', text: 'text-gray-300', border: 'border-gray-500/30' }
}

export default function BandPostCard({ post, onClick }) {
  const totalMax = post.parts?.reduce((s, p) => s + p.maxCount, 0) ?? 0
  const totalCurrent = post.parts?.reduce((s, p) => s + (p.currentCount ?? 0), 0) ?? 0
  const ratio = totalMax > 0 ? totalCurrent / totalMax : 0
  const allFull = totalMax > 0 && totalCurrent >= totalMax

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="card neon-border cursor-pointer group"
    >
      {/* Status badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {post.isClosed ? (
            allFull ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                모집 완료
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                마감
              </span>
            )
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              모집중
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {post.createdAt && format(new Date(post.createdAt), 'M/d', { locale: ko })}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors mb-1.5 line-clamp-1">
        {post.title}
      </h3>

      {/* Song */}
      {post.songName && (
        <div className="flex items-center gap-1.5 mb-3">
          <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-gray-400 truncate">{post.songName}</span>
        </div>
      )}

      {/* Parts */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.parts?.slice(0, 5).map(part => {
          const c = getPartColor(part.partName)
          const full = part.currentCount >= part.maxCount
          return (
            <span
              key={part.id}
              className={`text-xs px-2 py-0.5 rounded-lg border ${c.bg} ${c.text} ${c.border}
                ${full ? 'opacity-50 line-through' : ''}`}
            >
              {part.partName} {part.currentCount}/{part.maxCount}
            </span>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>모집 현황</span>
          <span className="font-medium text-gray-300">{totalCurrent}/{totalMax}</span>
        </div>
        <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ratio * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${post.isClosed
              ? 'bg-gray-500'
              : ratio >= 1 ? 'bg-gradient-to-r from-green-500 to-emerald-400'
              : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
          />
        </div>
      </div>
    </motion.div>
  )
}
