import React from 'react'
import SignupPage from '../components/SignupPage'
import Icon from '../components/icon'

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <SignupPage />
        </div>
        <div className="hidden lg:block">
            <Icon />
        </div>
    </div>
  )
}

export default Signup
