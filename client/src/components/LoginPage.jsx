import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        email:"",
        password:""
    })

    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:3000/api/user/login',
            postInputs
        );
        localStorage.setItem('Token', response.data.jwtToken);
        setError("");
        alert("Login Successful!");
        navigate('/home');
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
        <form className="space-y-6">
            <h5 className="text-2xl text-center font-semibold text-blue-600 ">Login Page</h5>
            <div>
                <label className="block mb-2 text-sm font-medium text-white ">Your email</label>
                <input onChange={(e)=> setPostInputs({...postInputs, email:e.target.value})} type="email" name="email" id="email" 
                className="bg-gray-800 border border-blue-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-white">Your password</label>
                <input onChange={(e)=> setPostInputs({...postInputs, password:e.target.value})} type="password" name="password" id="password" placeholder="••••••••" 
                className="bg-gray-800 border border-blue-600 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleSubmit} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md md:text-lg px-3 py-2.5">Login to your account</button>
            <div className="text-sm font-medium text-gray-400 text-center">
              Not registered? <a href="/signup" className="text-blue-500 hover:underline">Create account</a>
            </div>
        </form>
    </div>
    </div>
  )
}

export default LoginPage
