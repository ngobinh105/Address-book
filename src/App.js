import CardList from './components/CardList'
import { useState, useEffect } from 'react'
import AppBar from './components/AppBar'
import backendUrl from './backendUrl'
function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${backendUrl}/users`)
      const data = await res.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  return (
    <div className='App'>
      <AppBar text={text} setText={setText}></AppBar>

      <CardList users={users} text={text} setUsers={setUsers}></CardList>
    </div>
  )
}

export default App
