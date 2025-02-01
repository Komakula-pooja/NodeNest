import React from 'react'
import SignupPage from '../components/SignupPage';
import NotePad from '../components/NotePad';

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <SignupPage />
        </div>
        <div className="hidden lg:block">
            <NotePad />
        </div>
    </div>
  )
}

export default Signup
