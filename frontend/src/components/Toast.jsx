import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, 2500)
    return () => clearTimeout(t)
  }, [message, onClose])

  const styles = {
    success: 'bg-white text-dark-900 border-white/30',
    error: 'bg-red-600/90 border-red-400/30',
    info: 'bg-gray-700 border-gray-600/30',
  }

  const icons = { success: '✓', error: '✕', info: 'ℹ' }

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]
            px-5 py-3 rounded-xl text-sm font-medium shadow-2xl
            flex items-center gap-2 whitespace-nowrap border
            text-white ${styles[type] ?? styles.info}`}
        >
          <span className="font-bold">{icons[type]}</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
