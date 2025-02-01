import React from 'react'
import LoginPage from '../components/LoginPage'
import NotePad from '../components/NotePad'


const Login = () => {
  return (
    <div className="grid bg-black grid-cols-1 lg:grid-cols-2">
        <div>
            <LoginPage />
        </div>
        <div className="hidden lg:block">
            <NotePad />
        </div>
    </div>
  )
}

export default Login
