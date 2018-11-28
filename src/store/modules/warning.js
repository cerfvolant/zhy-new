import { getWarning } from '@/api/warning'

const tips = {
  state: {
    tipList: []
  },
  mutations: {
  },
  actions: {
    GetWarningInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getWarning().then(response => {
          // console.log(response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default tips
