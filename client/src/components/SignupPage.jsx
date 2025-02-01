import React, { useState } from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState({
        username:"",
        email:"",
        password:""
    })

    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        const response = await axios.post('https://nodenest-ww5l.onrender.com/api/user/signup',
            postInputs,{
                withCredentials:true
            }
        );
        localStorage.setItem('UserId', response.data.userId);
        setError("");
        alert("Signup Successful!");
        navigate('/login');
        }catch(err){
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
            setError("Something went wrong. Please try again.");
            }
        }   
    }

  return (
    <div className='flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8'>
    <div className="w-full max-w-sm p-6 sm:p-8 bg-gray-900 border border-blue-700 rounded-lg shadow-lg">
        <form className="space-y-6" action="#">
            <h5 className="text-lg md:text-2xl px-6 md:px-14 font-medium text-blue-600 ">Create an Account</h5>
            <div>
                <label className="block mb-2 text-sm font-medium text-white ">Username</label>
                <input onChange={(e)=> setPostInputs({...postInputs, username:e.target.value})} type="text" name="email" 
                id="username" className="bg-gray-800 border border-blue-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="JohnDoe" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-white ">Your email</label>
                <input onChange={(e)=> setPostInputs({...postInputs, email:e.target.value})} type="email" name="email" id="email" 
                className="bg-gray-800 border border-blue-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input onChange={(e)=> setPostInputs({...postInputs, password:e.target.value})} type="password" name="password" id="password" placeholder="••••••••" 
                className="bg-gray-800 border border-blue-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleSubmit} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-900 focus:outline-none  font-medium rounded-lg text-md md:text-lg px-3 py-2.5">Sign up</button>
            <div className="text-sm font-medium text-gray-400 text-center">
                Already have an account? <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
            </div>
        </form>
    </div>
    </div>
  )
}

export default SignupPage
