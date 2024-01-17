import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, UserInput } from '../Importer'
import { login as authLogin, login } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const SignUpCompont = () => {

	const dispatch = useDispatch();
	const [error, seterror] = useState("");
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const data = useSelector((state) => state.auth.userData)
	const create = async (data) => {
		seterror("")
		try {
			const createUser = await authService.createAccount(data);
			// console.log('createUser outside if', createUser)
			if (createUser) {
				// console.log(createUser)
				const userData = await authService.getUserDetails()
				// console.log('userData', userData)
				if (userData) dispatch(login({userData}));
				navigate("/")
				// console.log(data);
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
					<form onSubmit={handleSubmit(create)} className='space-y-6'>
						<UserInput type="name" label="Full Name" placeholder="Enter your name here" {...register("name", {
							required: true,
						})} />

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
						<Button type="submit" text="save" >Sign Up</Button>
						<div className='flex flex-col items-center gap-3'>
							<h3 className='sm:text-lg text-center font-medium'>Already have an Account?&nbsp;</h3>
							<Link to={"/login"}>
							<Button type="submit" text="save" >Log in</Button>
							</Link>
						</div>
					</form>

				</div>

			</div>

		</section>
	)
}

export default SignUpCompont
