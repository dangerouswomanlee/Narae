import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { noticeApi } from '../services/api'

function NoticeFormModal({ isOpen, onClose, onSuccess, editTarget }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPinned, setIsPinned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTitle(editTarget?.title || '')
      setContent(editTarget?.content || '')
      setIsPinned(editTarget?.isPinned || false)
      setError('')
    }
  }, [isOpen, editTarget])

  const handleSubmit = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요'); return }
    if (!content.trim()) { setError('내용을 입력해주세요'); return }
    setLoading(true)
    setError('')
    try {
      if (editTarget) {
        await noticeApi.update(editTarget.id, { title: title.trim(), content: content.trim(), isPinned })
      } else {
        await noticeApi.create({ title: title.trim(), content: content.trim(), isPinned })
      }
      onSuccess()
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="modal-content max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">
                {editTarget ? '공지 수정' : '공지 작성'}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="공지 제목"
                  className="input-dark"
                  maxLength={100}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">내용</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="공지 내용을 입력하세요"
                  className="input-dark resize-none h-36 text-sm leading-relaxed"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setIsPinned(!isPinned)}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative
                    ${isPinned ? 'bg-purple-500' : 'bg-dark-500'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200
                    ${isPinned ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-sm text-gray-300">상단 고정</span>
              </label>
            </div>

            {error && (
              <div className="mt-3 text-sm text-red-400 bg-red-500/10 rounded-xl py-2 px-3 text-center">
                {error}
              </div>
            )}

            <div className="flex gap-2 mt-5">
              <button onClick={onClose} className="btn-ghost flex-1 py-2.5">취소</button>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 py-2.5">
                {loading ? '처리 중...' : editTarget ? '수정' : '등록'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function NoticeDetail({ notice, onClose, onEdit, onDelete }) {
  return (
    <AnimatePresence>
      {notice && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="modal-content max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 flex-1 pr-3">
                {notice.isPinned && (
                  <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
                <h2 className="text-lg font-bold text-white leading-tight">{notice.title}</h2>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              {notice.createdAt && format(new Date(notice.createdAt), 'yyyy년 M월 d일 HH:mm', { locale: ko })}
              {notice.updatedAt !== notice.createdAt && ' (수정됨)'}
            </div>

            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-5 min-h-[80px]">
              {notice.content}
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => { onEdit(notice); onClose() }}
                className="flex-1 py-2 rounded-xl text-sm font-medium border border-white/10 text-gray-300
                  hover:bg-white/5 hover:text-white transition-all"
              >
                수정
              </button>
              <button
                onClick={() => { onDelete(notice.id); onClose() }}
                className="flex-1 py-2 rounded-xl text-sm font-medium border border-red-500/30 text-red-400
                  hover:bg-red-500/10 transition-all"
              >
                삭제
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function NoticePage() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [selectedNotice, setSelectedNotice] = useState(null)

  const fetchNotices = useCallback(async () => {
    setLoading(true)
    try {
      const data = await noticeApi.getAll()
      setNotices(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchNotices() }, [fetchNotices])

  const handleDelete = async (id) => {
    if (!window.confirm('공지사항을 삭제하시겠습니까?')) return
    try {
      await noticeApi.delete(id)
      fetchNotices()
    } catch (e) {
      console.error(e)
    }
  }

  const handleEdit = (notice) => {
    setEditTarget(notice)
    setShowForm(true)
  }

  const pinnedNotices = notices.filter(n => n.isPinned)
  const normalNotices = notices.filter(n => !n.isPinned)

  return (
    <div className="min-h-screen p-4 md:p-8 pt-14 md:pt-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">공지사항</h1>
            <p className="text-gray-400 text-sm">나래 합주 공지 및 안내</p>
          </div>
          <button
            onClick={() => { setEditTarget(null); setShowForm(true) }}
            className="btn-primary flex items-center gap-2 py-2.5 px-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            공지 작성
          </button>
        </div>
      </motion.div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card animate-pulse h-20">
              <div className="h-3 bg-dark-500 rounded w-2/3 mb-3" />
              <div className="h-2 bg-dark-500 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : notices.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-5xl mb-4">📢</div>
          <p className="text-gray-400 mb-2">등록된 공지가 없습니다</p>
          <p className="text-gray-600 text-sm">첫 공지를 작성해보세요</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-3">
          {/* Pinned */}
          {pinnedNotices.length > 0 && (
            <div className="space-y-2">
              {pinnedNotices.map((notice, i) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  index={i}
                  onClick={() => setSelectedNotice(notice)}
                />
              ))}
              {normalNotices.length > 0 && (
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-xs text-gray-600">일반 공지</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
              )}
            </div>
          )}

          {/* Normal */}
          {normalNotices.map((notice, i) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              index={i + pinnedNotices.length}
              onClick={() => setSelectedNotice(notice)}
            />
          ))}
        </motion.div>
      )}

      {/* Detail */}
      <AnimatePresence>
        {selectedNotice && (
          <NoticeDetail
            notice={selectedNotice}
            onClose={() => setSelectedNotice(null)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* Form */}
      <NoticeFormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditTarget(null) }}
        onSuccess={fetchNotices}
        editTarget={editTarget}
      />
    </div>
  )
}

function NoticeCard({ notice, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`card cursor-pointer group transition-all duration-200
        ${notice.isPinned
          ? 'border-yellow-500/20 bg-yellow-500/5'
          : 'hover:border-white/15'
        }`}
    >
      <div className="flex items-start gap-3">
        {notice.isPinned && (
          <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors truncate">
              {notice.title}
            </h3>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {notice.createdAt && format(new Date(notice.createdAt), 'yy.MM.dd')}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1 leading-relaxed">
            {notice.content}
          </p>
        </div>
        <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-0.5"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  )
}
