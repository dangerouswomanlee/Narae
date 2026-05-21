import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bandApi } from '../../services/api'

const PRESET_PARTS = ['보컬', '기타', '베이스', '드럼', '키보드']

export default function CreateBandPost({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState('')
  const [songName, setSongName] = useState('')
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [parts, setParts] = useState([
    { partName: '보컬', maxCount: 1 },
    { partName: '기타', maxCount: 1 },
    { partName: '드럼', maxCount: 1 },
  ])
  const [customPart, setCustomPart] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addPart = (name) => {
    if (!name.trim()) return
    if (parts.some(p => p.partName === name.trim())) return
    setParts([...parts, { partName: name.trim(), maxCount: 1 }])
    setCustomPart('')
  }

  const removePart = (idx) => setParts(parts.filter((_, i) => i !== idx))

  const updatePartCount = (idx, delta) => {
    setParts(parts.map((p, i) => i === idx
      ? { ...p, maxCount: Math.max(1, p.maxCount + delta) }
      : p
    ))
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요'); return }
    if (parts.length === 0) { setError('파트를 1개 이상 추가해주세요'); return }

    setLoading(true)
    setError('')
    try {
      await bandApi.create({ title: title.trim(), songName: songName.trim(), content, authorName, parts })
      onSuccess()
      onClose()
      setTitle(''); setSongName(''); setContent(''); setAuthorName('')
      setParts([{ partName: '보컬', maxCount: 1 }, { partName: '기타', maxCount: 1 }, { partName: '드럼', maxCount: 1 }])
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
            className="modal-content max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">팀 모집 글 작성</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">제목 *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  className="input-dark" maxLength={100} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">곡명</label>
                  <input type="text" value={songName} onChange={e => setSongName(e.target.value)}
                    className="input-dark" maxLength={100} />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">작성자</label>
                  <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)}
                    className="input-dark" maxLength={50} />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">내용</label>
                <textarea value={content} onChange={e => setContent(e.target.value)}
                  className="input-dark resize-none h-24 text-sm" />
              </div>

              {/* Parts */}
              <div>
                <label className="text-xs text-gray-400 font-medium mb-2 block">모집 파트 *</label>

                {/* Preset buttons */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {PRESET_PARTS.map(preset => (
                    <button key={preset} onClick={() => addPart(preset)}
                      disabled={parts.some(p => p.partName === preset)}
                      className="text-xs px-2.5 py-1 rounded-lg border transition-all duration-150
                        border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-blue-300
                        disabled:opacity-30 disabled:cursor-not-allowed">
                      + {preset}
                    </button>
                  ))}
                  <div className="flex gap-1.5">
                    <input type="text" value={customPart} onChange={e => setCustomPart(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addPart(customPart)}
                      placeholder="직접 입력"
                      className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-dark-700 text-gray-300
                        focus:border-blue-500/50 outline-none w-24" />
                    <button onClick={() => addPart(customPart)}
                      className="text-xs px-2 py-1 rounded-lg border border-blue-500/30
                        text-blue-400 hover:bg-blue-500/10 transition-colors">
                      추가
                    </button>
                  </div>
                </div>

                {/* Parts list */}
                <div className="space-y-1.5">
                  {parts.map((part, i) => (
                    <div key={i} className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                      <span className="text-sm text-white flex-1">{part.partName}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updatePartCount(i, -1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white text-sm">
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-white">{part.maxCount}</span>
                        <button onClick={() => updatePartCount(i, 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white text-sm">
                          +
                        </button>
                      </div>
                      <button onClick={() => removePart(i)} className="text-gray-600 hover:text-red-400 transition-colors ml-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-3 text-sm text-red-400 text-center bg-red-500/10 rounded-xl py-2 px-3">
                {error}
              </div>
            )}

            <div className="flex gap-2 mt-5">
              <button onClick={onClose} className="btn-ghost flex-1 py-2.5">취소</button>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 py-2.5">
                {loading ? '등록 중...' : '모집 글 등록'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
