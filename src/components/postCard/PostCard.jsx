import React, { useEffect } from 'react'
import { postService } from '../../appwrite/config'
import { Link } from 'react-router-dom'
import parser from "html-react-parser"
import { Button } from '../Importer';

function PostCard({ $id, title,  featuredImage }) {
	// const description=parser(content)
	const myTitle = title.split(" ").map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(" ");

	return (
		<div className=''>
			<div className=''>
				<img width={300} height={300} className='w-full object-cover  h-48 rounded-t-md' src={postService.getPreviewFile(featuredImage)} alt={title} />
			</div>
			<div className='m-3 flex flex-col items-center gap-2'>
				<h3 className='text-xl font-medium text-center '>{myTitle}</h3>
				{/* <div className=' '>{parser(content)}</div> */}
				<Link to={`/post/${$id}`}>
					<button className='bg-slate-200 font-light hover:bg-slate-100  p-2 rounded-lg text-sm'>View Post </button>
				</Link>
				{/* <h1>hello</h1> */}
			</div>



		</div>
	)

}

export default PostCard
