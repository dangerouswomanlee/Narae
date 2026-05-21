import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  res => res,
  err => {
    const message = err.response?.data?.message || '서버 오류가 발생했습니다'
    return Promise.reject(new Error(message))
  }
)

export const reservationApi = {
  getByDate: (date) => api.get(`/reservations?date=${date}`).then(r => r.data),
  create: (data) => api.post('/reservations', data).then(r => r.data),
  verify: (id, password) => api.post(`/reservations/${id}/verify`, { password }).then(r => r.data),
  update: (id, data) => api.put(`/reservations/${id}`, data).then(r => r.data),
  delete: (id, password) => api.delete(`/reservations/${id}`, { data: { password } }).then(r => r.data),
}

export const bandApi = {
  getAll: () => api.get('/band-posts').then(r => r.data),
  getOne: (id) => api.get(`/band-posts/${id}`).then(r => r.data),
  create: (data) => api.post('/band-posts', data).then(r => r.data),
  verifyPassword: (id, password) =>
    api.post(`/band-posts/${id}/verify-password`, { password }).then(r => r.data),
  update: (id, data) => api.put(`/band-posts/${id}`, data).then(r => r.data),
  join: (postId, partId, participantName) =>
    api.post(`/band-posts/${postId}/parts/${partId}/join`, { participantName }).then(r => r.data),
  leave: (postId, participantId) =>
    api.delete(`/band-posts/${postId}/participants/${participantId}`).then(r => r.data),
  toggleClose: (id) => api.patch(`/band-posts/${id}/toggle-close`).then(r => r.data),
  delete: (id, password) =>
    api.delete(`/band-posts/${id}`, { data: { password } }).then(r => r.data),
}

export const noticeApi = {
  getAll: () => api.get('/notices').then(r => r.data),
  getOne: (id) => api.get(`/notices/${id}`).then(r => r.data),
  create: (data) => api.post('/notices', data).then(r => r.data),
  update: (id, data) => api.put(`/notices/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/notices/${id}`).then(r => r.data),
}

export default api
