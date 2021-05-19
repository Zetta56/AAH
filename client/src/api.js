const baseUrl = process.env.VUE_APP_BACKEND_URL || window.location.origin
const api = async (path, options) => {
  const response = await fetch(baseUrl + '/api' + path, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })
  return response.json()
}

export default api
