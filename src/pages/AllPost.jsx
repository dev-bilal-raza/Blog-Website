import React, { useEffect, useState } from 'react'
import { postService } from '../appwrite/config'
import { PostCard, Wrapper } from '../components/Importer'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from '../components/loader/Loader';

const AllPost = () => {
	useEffect(() => {
		AOS.init({ duration: 1500, offset: 120, })


	},)

	const [posts, setposts] = useState([])
	postService.getPosts([]).then((posts) => {
		if (posts) {
			setposts(posts.documents)
		}
	})
	if (posts.length > 0) {
		return (
			<div className=' shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-16 mb-16'>
				<Wrapper>
					<section className='flex flex-col gap-8  p-7'>
						<h2 className='text-center font-serif text-5xl '>All Blogs</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 bg-white rounded lg:grid-cols-3 gap-10 p-3'>
							{posts.map((post) =>
							(<div className='bg-white rounded-md border shadow-[0_3px_10px_rgb(0,0,0,0.2)]' data-aos="fade-right" key={post.$id}>
								{/* <div>hello</div> */}
								<PostCard {...post} />

							</div>)
							)}
						</div>
					</section>
				</Wrapper>
			</div>
		)
	} else {
		return (
			<div className='  flex justify-center items-center h-96'>
				<Loader />
			</div>
		)
	}
}

export default AllPost
