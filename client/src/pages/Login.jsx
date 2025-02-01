import React from 'react'
import LoginPage from '../components/LoginPage'
import Icon from '../components/icon'


const Login = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <LoginPage />
        </div>
        <div className="hidden lg:block">
            <Icon />
        </div>
    </div>
  )
}

export default Login
