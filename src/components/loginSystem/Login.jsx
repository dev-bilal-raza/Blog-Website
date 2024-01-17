import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Importer'
import { login as authLogin } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import UserInput from '../userInput/UserInput'

const Login = () => {
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, seterror] = useState("");
	const navigate = useNavigate();

	const login = async (data) => {
		seterror("");
		try {
			const session = await authService.login(data);
			if (session) {

				const userData = await authService.getUserDetails();
				if (userData) dispatch(authLogin({userData}));
				navigate("/")

			}
		} catch (error) {
			seterror(error.message)
		}
	}
	return (

		<section className='flex justify-center items-center p-6'>
			<div className='border w-full sm:w-2/3 lg:w-1/3 p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>


				<div>{error && <p className='text-red-400'>{error}</p>}</div>
				<div>
					<form onSubmit={handleSubmit(login)} className='space-y-6'>

						<UserInput type="email" label="Email" placeholder="Enter your email here" {...register("email", {
							required: true,
							validate: {
								matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
									"Email address must be a valid address",
							}
						})} />


						<UserInput type="password" label="Password" placeholder="Enter your password here" {...register("password", {
							required: true,
						})} />
						<Button type="submit" text="save" >Sign In</Button>
						<div className='flex flex-col items-center gap-3'>
							<h3 className='sm:text-lg text-center font-medium'>Don&apos;t have any account?&nbsp;</h3>
							<Link to={"/signup"}>
								<Button type="submit" text="save" >Sign Up</Button>
							</Link>
						</div>
					</form>

				</div>

			</div>

		</section>

	)
}

export default Login
