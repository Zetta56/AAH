const baseUrl = process.env.BACKEND_URL || 'http://localhost:3001'
const api = async (path, options) => {
  const response = await fetch(baseUrl + path, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })
  return response.json()
}

export default api
