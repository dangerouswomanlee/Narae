import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { bandApi } from '../../services/api'
import Toast from '../Toast'

const PART_ICONS = {
  '보컬': '🎤',
  '기타': '🎸',
  '베이스': '🎵',
  '드럼': '🥁',
  '키보드': '🎹',
  '신디': '🎹',
}

function getPartIcon(name) {
  const key = Object.keys(PART_ICONS).find(k => name.includes(k))
  return PART_ICONS[key] || '🎵'
}

// ─── 파트 참가 모달 ──────────────────────────────────────────────────────────
function JoinModal({ part, postId, onClose, onSuccess }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name.trim()) { setError('이름을 입력해주세요'); return }
    setLoading(true)
    setError('')
    try {
      await bandApi.join(postId, part.id, name.trim())
      onSuccess(name.trim())
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
        style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">
            {getPartIcon(part.partName)}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{part.partName} 파트 신청</h3>
            <p className="text-xs text-gray-400">현재 {part.currentCount}/{part.maxCount}명 참가 중</p>
          </div>
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-400 font-medium mb-1.5 block">이름</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="이름을 입력하세요"
            className="input-dark w-full"
            autoFocus
            maxLength={50}
          />
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-3">
            {error}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:bg-white/5 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? '신청 중...' : '참가하기'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── 파트 카드 ───────────────────────────────────────────────────────────────
function PartCard({ part, postId, postClosed, onUpdate, onToast }) {
  const [showJoin, setShowJoin] = useState(false)
  const [leavingId, setLeavingId] = useState(null)

  const isFull = part.currentCount >= part.maxCount
  const ratio = part.maxCount > 0 ? part.currentCount / part.maxCount : 0
  const canJoin = !isFull && !postClosed

  const handleLeave = async (e, participantId) => {
    e.stopPropagation()
    setLeavingId(participantId)
    try {
      await bandApi.leave(postId, participantId)
      onUpdate()
    } catch (err) {
      console.error(err)
    } finally {
      setLeavingId(null)
    }
  }

  return (
    <>
      <div
        className="rounded-xl border border-white/5 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        {/* 파트 헤더 */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-base">{getPartIcon(part.partName)}</span>
            <span className="font-semibold text-white text-sm">{part.partName}</span>
            {isFull && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-medium">
                마감
              </span>
            )}
          </div>
          <span className={`text-sm font-bold font-mono ${isFull ? 'text-green-400' : 'text-white'}`}>
            {part.currentCount}/{part.maxCount}
          </span>
        </div>

        {/* Progress bar */}
        <div className="px-4 mb-3">
          <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${ratio * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isFull
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            />
          </div>
        </div>

        {/* 참가자 목록 */}
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {part.participants?.map(p => (
            <span
              key={p.id}
              className="text-xs px-2.5 py-1 rounded-lg
                bg-purple-500/20 text-purple-200 border border-purple-500/30
                flex items-center gap-1.5 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
              {p.participantName}
              <button
                onClick={(e) => handleLeave(e, p.id)}
                disabled={leavingId === p.id}
                className="opacity-0 group-hover:opacity-100 w-3.5 h-3.5 flex items-center justify-center
                  rounded-full text-purple-400 hover:text-white hover:bg-red-500/60
                  transition-all text-[10px] leading-none ml-0.5"
                title="참여 취소"
              >
                {leavingId === p.id ? '·' : '×'}
              </button>
            </span>
          ))}
          {Array.from({ length: Math.max(0, part.maxCount - (part.participants?.length ?? 0)) }).map((_, i) => (
            <span
              key={`empty-${i}`}
              className="text-xs px-2.5 py-1 rounded-lg
                border border-dashed border-white/10 text-gray-600
                flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0" />
              빈 자리
            </span>
          ))}
        </div>

        {/* 신청 / 마감 버튼 */}
        <div className="px-4 pb-4">
          {canJoin ? (
            <button
              onClick={() => setShowJoin(true)}
              className="w-full py-2 rounded-xl text-xs font-semibold text-white
                bg-gradient-to-r from-purple-500/80 to-pink-500/80
                hover:from-purple-500 hover:to-pink-500
                border border-purple-500/30 hover:border-purple-400/50
                transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              이 파트 신청하기
            </button>
          ) : (
            <div className={`w-full py-2 rounded-xl text-xs font-semibold text-center
              ${isFull
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}
            >
              {isFull ? '✓ 모집 완료' : '마감됨'}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showJoin && (
          <JoinModal
            part={part}
            postId={postId}
            onClose={() => setShowJoin(false)}
            onSuccess={(name) => {
              setShowJoin(false)
              onToast(`${part.partName} 파트 참가 완료!`)
              onUpdate()
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── 수정 폼 ─────────────────────────────────────────────────────────────────
function EditForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post.title)
  const [songName, setSongName] = useState(post.songName || '')
  const [content, setContent] = useState(post.content || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요'); return }
    setLoading(true)
    setError('')
    try {
      await bandApi.update(post.id, {
        title: title.trim(),
        songName: songName.trim(),
        content,
      })
      onSave()
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-white">게시글 수정</h3>
      </div>

      <div>
        <label className="text-xs text-gray-400 font-medium mb-1.5 block">제목 *</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input-dark w-full"
          maxLength={100}
        />
      </div>

      <div>
        <label className="text-xs text-gray-400 font-medium mb-1.5 block">곡명</label>
        <input
          type="text"
          value={songName}
          onChange={e => setSongName(e.target.value)}
          className="input-dark w-full"
          maxLength={100}
        />
      </div>

      <div>
        <label className="text-xs text-gray-400 font-medium mb-1.5 block">내용</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="input-dark w-full resize-none h-24 text-sm"
        />
      </div>

      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:bg-white/5 transition-colors"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  )
}

// ─── 메인 상세 모달 ──────────────────────────────────────────────────────────
export default function BandPostDetail({ post, onClose, onUpdate, onDelete }) {
  const [toast, setToast] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const totalMax = post.parts?.reduce((s, p) => s + p.maxCount, 0) ?? 0
  const totalCurrent = post.parts?.reduce((s, p) => s + (p.currentCount ?? 0), 0) ?? 0
  const allFull = totalMax > 0 && totalCurrent >= totalMax
  const totalRatio = totalMax > 0 ? totalCurrent / totalMax : 0

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  // 삭제 처리
  const handleDelete = async () => {
    setDeleting(true)
    try {
      await bandApi.delete(post.id)
      setShowDeleteConfirm(false)
      onDelete?.('게시글이 삭제되었습니다')
    } catch (e) {
      showToast(e.message, 'error')
      setDeleting(false)
    }
  }

  // 수정 완료
  const handleSaved = () => {
    setEditMode(false)
    showToast('수정되었습니다 ✓')
    onUpdate()
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          className="modal-content max-w-lg max-h-[85vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* ── 헤더 ── */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-3">
              <div className="flex items-center gap-2 mb-1.5">
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
                {post.authorName && (
                  <span className="text-xs text-gray-500">{post.authorName}</span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white">{post.title}</h2>
              {post.songName && (
                <div className="flex items-center gap-1.5 mt-1">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm text-gray-400">{post.songName}</span>
                </div>
              )}
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors flex-shrink-0 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── 수정 폼 or 일반 뷰 ── */}
          {editMode ? (
            <EditForm
              post={post}
              onSave={handleSaved}
              onCancel={() => setEditMode(false)}
            />
          ) : (
            <>
              {post.content && (
                <p className="text-sm text-gray-400 mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              )}

              {/* 전체 모집 현황 */}
              <div className="rounded-xl border border-white/5 p-3 mb-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">전체 모집 현황</span>
                  <span className="text-xs font-bold text-white font-mono">{totalCurrent}/{totalMax}</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${totalRatio * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      allFull
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                  />
                </div>
              </div>

              {/* 파트 목록 */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">파트별 모집 현황</h3>
                  {!post.isClosed && (
                    <span className="text-xs text-gray-600">파트 아래 버튼으로 신청하세요</span>
                  )}
                </div>
                {post.parts?.map(part => (
                  <PartCard
                    key={part.id}
                    part={part}
                    postId={post.id}
                    postClosed={post.isClosed}
                    onUpdate={onUpdate}
                    onToast={showToast}
                  />
                ))}
              </div>

              {/* ── 하단 푸터: 날짜 + 수정·삭제 버튼 ── */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  {post.createdAt && format(new Date(post.createdAt), 'yyyy년 M월 d일 HH:mm', { locale: ko })} 작성
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-xs px-3 py-1.5 rounded-lg
                      text-gray-400 border border-white/10
                      hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/10
                      transition-all duration-200 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    수정
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-xs px-3 py-1.5 rounded-lg
                      text-gray-400 border border-white/10
                      hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10
                      transition-all duration-200 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    삭제
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* ── 삭제 확인 모달 ── */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-xs rounded-2xl p-6 shadow-2xl"
              style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-base font-bold text-white mb-1">게시글 삭제</h3>
              <p className="text-xs text-gray-400 mb-5">삭제 후 복구가 불가능합니다. 정말 삭제하시겠습니까?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:bg-white/5 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
                    bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {deleting ? '삭제 중...' : '삭제하기'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast ── */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </>
  )
}
