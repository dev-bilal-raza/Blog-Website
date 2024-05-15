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
			<div className=''>
					<section className='flex flex-col gap-8 bg-gradient-to-tr from-white to-black p-6'>
						<h2 className='text-center font-heading text-5xl text-white'>All Blogs</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 rounded lg:grid-cols-3 gap-20 p-11'>
							{posts.map((post) =>
							(<div className='bg-white rounded-md border hover:shadow-[0px_4px_22px_3px_#2d3748]' data-aos="fade-right" key={post.$id}>
								{/* <div>hello</div> */}
								<PostCard {...post} />

							</div>)
							)}
						</div>
					</section>
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
