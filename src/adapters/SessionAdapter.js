const path = 'http://localhost:3000/api/v1/sessions'
export default class SessionAdapter {

  static getUser(username, password){
    console.log(username, password)
    return fetch(path, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(username, password)
    })
    .then( resp => resp.json())
  }

  static currentUser(){
    return fetch(`${path}/current_user`, {
      method: 'GET',
      headers: headers()
    })
      .then(res=> {
        console.log(localStorage.getItem('token'))
        return res.json()
      })
  }
}

let headers = () => {
  const token = localStorage.getItem('token')
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}
