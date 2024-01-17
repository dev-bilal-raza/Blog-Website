import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Importer'
import { useSelector } from 'react-redux'

const Hero = () => {
	const userStatus = useSelector(state => state.auth.status)
	return (
		<section className='flex lg:flex-row flex-col    '>
			<div className='lg:w-1/2 w-full'>
				<img src={"/assets/heroImage.jpg"} className='w-full h-[30rem] object-cover' alt="Blog Image" />
			</div>
			<div className='lg:w-1/2 bg-gradient-to-r  from-blue-400 to-emerald-400 font-light  leading-relaxed  flex flex-col items-center justify-center gap-5 p-3'>
				<h2 className='text-center font-normal font-serif text-lg'>Welcome to <span className='font-semibold'>Blog</span>, where words come to life and ideas take flight. 🚀</h2>
				<p>Blogging is more than just a collection of words on a screen; it's a journey of self-expression, a platform for sharing thoughts, insights, and experiences. Whether you're a seasoned writer or a passionate newcomer, this is your space to explore, create, and connect.</p>
				{userStatus ? (
					<Link to={"/add-post"}>
						<Button type={"button"} text={"save"}>Add Post</Button>
					</Link>
				) : (
					<Link to={"/login"}>
						<Button type={"button"} text={"save"}>Login</Button>
					</Link>
				)}
			</div>
		</section>
	)
}

export default Hero
