import React, { useEffect, useState } from 'react'
import { Logoutbtn } from '../Importer'
import { useSelector } from 'react-redux'
import { navItems } from './Header'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const ResponsiveNavber = () => {
	const navigate = useNavigate()
	const [isClick, setIsClick] = useState(false)
	const authStatus = useSelector((state) => state.auth.status)
	// console.log(authStatus);
	useEffect(() => {
		AOS.init({ duration: 100 })
	}, [])

	const hamburgClick = () => {
		setIsClick(!isClick)
	}
	return (
		<section className=''>
			{!isClick && (
				<div onClick={hamburgClick}>
					<img src="/assets/hamburgerMenu.png" alt="menu" />
				</div>
			)}
			{isClick && (
				<div >
					<img onClick={hamburgClick} className='w-9 object-cover' src="/assets/cross.png" alt="crossIcon" />

					<div className='absolute top-24 left-0 p-5  h-28 right-0  bg-white' data-aos="fade-left" >
						<div className='flex flex-col  items-center gap-4 '>

							<ul className="flex gap-3">
								{navItems.map((item) => (
									item.active ? (
										<li key={item.name} className="hover:underline font-normal text-lg" onClick={() => navigate(item.slug)}>{item.name}</li>
									) : null
								))}

							</ul>
							{authStatus && <Logoutbtn />}
						</div>


					</div>
				</div>
			)}



		</section>
	)
}

export default ResponsiveNavber
