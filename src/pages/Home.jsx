import React, { useState, useEffect } from 'react'
import { postService } from '../appwrite/config'
import { PostCard, Wrapper } from '../components/Importer'
import Hero from './Hero'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';



function Home() {
	const userStatus = useSelector(state => state.auth.status);
	const [loading, setLoading] = useState(false);
	const [isIncrease, setIsIncrease] = useState(false);
	// console.log(userStatus);
	const [posts, setPosts] = useState([])
	const lengthIncreaser = () => {
		setIsIncrease(!isIncrease)
	}
	useEffect(() => {
		postService.getPosts().then((post) => {
			if (post) {
				setPosts(post.documents)
				setLoading(true)
				// console.log(post);
				// console.log(posts[0].$createdAt.toLocaleString());
			}
		})
		AOS.init({ duration: 1500 })
	}, [])

	if (userStatus) {

		return (
			<main>
				<section className='' data-aos="fade-right">
					<Hero />
				</section>
				{/* <div className=' absolute top-0 bottom-0 left-0 right-0 bg-slate-500 h-full'/> */}
				{loading ? (
					<div className='bg-gradient-to-b from-white to-black mt-16 p-8'>
							<section className='flex flex-col gap-8 p-7'>
								<h2 className='text-center font-heading text-5xl font-bold '>All Blogs</h2>
								<div className='grid grid-cols-1 sm:grid-cols-2 rounded lg:grid-cols-3 gap-16 p-3'>
									{posts.map((post, i) =>
										<div key={post.$id}>
											{!isIncrease ? (
												<div>
													{i < 9 ? (
														<div className='hover:shadow-[0px_4px_22px_3px_#2d3748] bg-white rounded-md border shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={post.$id} data-aos="fade-right">
															<PostCard {...post} />

														</div>
													) : ""}
												</div>
											) : (
												<div className='bg-white rounded-md border shadow-[0_3px_10px_rgb(0,0,0,0.2)]' key={post.$id} data-aos="fade-right">
													<PostCard {...post} />
													{/* <button onClick={lengthIncreaser}>decrease</button> */}
												</div>
											)}
										</div>
									)}
								</div>
							</section>
							{!isIncrease ?
								(<div className='flex gap-3 justify-center items-center w-full'>
									<button onClick={lengthIncreaser} className='text-xl font-semibold text-white hover:text-gray-700 '>Show More</button>
									<img className='w-10 hover:cursor-pointer rounded-lg bg-white' onClick={lengthIncreaser} src="/assets/showMore.png" alt="Show More" />
								</div>
								) : (
									<div className='flex gap-3 justify-center items-center w-full'>
										<button onClick={lengthIncreaser} className='text-xl font-semibold hover:text-gray-700 text-white'>Show Less</button>
										<img onClick={lengthIncreaser} className='w-10 rounded-lg bg-white hover:cursor-pointer' src={"/assets/showLess.png"} alt="Show Less" />
									</div>
								)}
					</div>
				) : (
					<div className='flex justify-center items-center w-full h-28 '>
						<Loader />
					</div>
				)}
			</main>
		)
	}
	return (
		<div className="w-full flex flex-col gap-7 text-center">
			<section className=''>
				<Hero />
			</section>
			<div className="flex flex-wrap">
				<div className="m-10 w-full">
					<Link to={"/login"} className="text-2xl font-bold hover:text-gray-500">
						Login To Read Post
					</Link>
				</div>
			</div>

		</div>
	)
}

export default Home
