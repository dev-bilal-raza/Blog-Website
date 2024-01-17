import React from 'react'
import { Link } from 'react-router-dom'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {
	return (
		<section className='bg-slate-900 text-white flex justify-around p-6 items-center'>
			<div className='w-2/3 flex flex-col gap-5'>
				<Link to={"/"}>
					<img src={"/assets/bloglogo.png"} width={55} height={55} alt="Logo" />
				</Link>

				<p className='text-sm leading-relaxed sm:text-lg font-light'>Over the years, blogging has evolved from simple online journals to sophisticated platforms that accommodate multimedia, interactive elements, and e-commerce. Embrace the evolution, experiment with different formats, and stay attuned to the ever-changing landscape of digital content creation.</p>
				<p className='text-sm leading-relaxed sm:text-lg font-light'>© 2024 Blog - All right reserved</p>

			</div>

			<ul className='text-3xl space-y-3'>
				<li >
					<Link className='hover:text-slate-400' to={"https://www.linkedin.com/in/bilal-raza-877236271/"}  >
						<FaLinkedin />
					</Link>
				</li>
				<li >
					<Link className='hover:text-slate-400' to={"https://github.com/bilalraza-9262"} >
						<FaSquareGithub />
					</Link>
				</li>
				<li >
					<Link className='hover:text-slate-400' to={"https://www.facebook.com/profile.php?id=100076563670297"} >
						<FaSquareFacebook />
					</Link>
				</li>
				<li >
					<Link className='hover:text-slate-400' to={"https://www.instagram.com/i_am_bilalraza/"} >
						<FaSquareInstagram />
					</Link>
				</li>
			</ul>

		</section>
	)
}

export default Footer
