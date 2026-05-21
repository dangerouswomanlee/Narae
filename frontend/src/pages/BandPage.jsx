import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bandApi } from '../services/api'
import BandPostCard from '../components/Band/BandPostCard'
import BandPostDetail from '../components/Band/BandPostDetail'
import CreateBandPost from '../components/Band/CreateBandPost'
import Toast from '../components/Toast'

export default function BandPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState('all') // all | recruiting | closed
  const [toast, setToast] = useState(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await bandApi.getAll()
      setPosts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleSelectPost = async (post) => {
    try {
      const detail = await bandApi.getOne(post.id)
      setSelectedPost(detail)
    } catch (e) {
      console.error(e)
      setToast({ message: '게시글을 불러오는 데 실패했습니다', type: 'error' })
    }
  }

  const handleUpdate = async () => {
    if (selectedPost) {
      try {
        const detail = await bandApi.getOne(selectedPost.id)
        setSelectedPost(detail)
        fetchPosts()
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleDelete = (message) => {
    setSelectedPost(null)
    fetchPosts()
    setToast({ message: message ?? '게시글이 삭제되었습니다', type: 'success' })
  }

  const handleCreateSuccess = () => {
    fetchPosts()
    setShowCreate(false)
    setToast({ message: '모집 글이 등록되었습니다!', type: 'success' })
  }

  const filtered = posts.filter(p => {
    if (filter === 'recruiting') return !p.isClosed
    if (filter === 'closed') return p.isClosed
    return true
  })

  const recruitingCount = posts.filter(p => !p.isClosed).length

  return (
    <div className="min-h-screen p-4 md:p-8 pt-14 md:pt-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">팀 모집</h1>
            <p className="text-gray-400 text-sm">같이 합주할 밴드 멤버를 찾아보세요</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 py-2.5 px-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            모집 글 작성
          </button>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {[
          { label: '전체 게시글', value: posts.length, color: 'text-white' },
          { label: '모집 중', value: recruitingCount, color: 'text-green-400' },
          { label: '마감', value: posts.length - recruitingCount, color: 'text-gray-400' },
        ].map(stat => (
          <div key={stat.label} className="card text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-1 mb-5 glass rounded-xl p-1 w-fit"
      >
        {[
          { key: 'all', label: '전체' },
          { key: 'recruiting', label: '모집중' },
          { key: 'closed', label: '마감' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${filter === tab.key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card h-40 animate-pulse">
              <div className="h-3 bg-dark-500 rounded mb-3 w-3/4" />
              <div className="h-2 bg-dark-500 rounded mb-2 w-1/2" />
              <div className="flex gap-1.5 mb-3">
                {[1, 2, 3].map(j => <div key={j} className="h-5 w-12 bg-dark-500 rounded" />)}
              </div>
              <div className="h-1.5 bg-dark-500 rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-5xl mb-4">🎸</div>
          <p className="text-gray-400 mb-2">모집 글이 없습니다</p>
          <p className="text-gray-600 text-sm">첫 번째로 팀을 모집해보세요!</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BandPostCard post={post} onClick={() => handleSelectPost(post)} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selectedPost && (
          <BandPostDetail
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* Create modal */}
      <CreateBandPost
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Toast */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  )
}
