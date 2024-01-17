import React, { useEffect, useState } from 'react'
import { postService } from '../appwrite/config'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../components/Importer'
import parse from "html-react-parser";

const Post = () => {
	const [post, setpost] = useState(null);
	const navigate = useNavigate();
	const { slug } = useParams()
	const userData = useSelector((state) => state.auth.userData)
	const isAuthor = post && userData ? userData.$id === post.userId : false;

	useEffect(() => {

		if (slug) {
			postService.getPost(slug).then((post) => {
				if (post) {
					setpost(post)
					// console.log("Post "+ post.content);
				} else navigate("/")
			})
		} else navigate("/")

	}, [slug, navigate])

	const deletePost = () => {
		postService.deletePost(post.$id).then((status) => {
			if (status) {
				// console.log("post : " + post)
				postService.deleteFile(post.featuredImage);
				navigate("/")
			}
		})
	}
	return post ? (
		<section className='flex border flex-col m-7 gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] items-center p-6'>
			<div className=''>
				<img className='h-[40rem]' src={postService.getPreviewFile(post.featuredImage)} alt={post.title} />
			</div>
			<div className='text-center space-y-11 m-5 w-9/12 '>
				<div className='space-y-3'>
					<h2 className='text-lg md:text-2xl font-medium font-serif'> TITLE</h2>
					<h2 className='border p-3 sm:text-xl text-sm font-light'>{post.title.split(" ").map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(" ")}</h2>
				</div>
				<div className='space-y-3'>
					<h2 className='text-lg md:text-2xl font-medium font-serif'>CONTENT</h2>
					<div className='border p-3 sm:text-xl text-sm font-light'>
						{parse(post.content)}
					</div>
				</div>
			</div>
			{isAuthor && (
				<div className='flex sm:flex-row flex-col gap-3'>
					<Link to={`/edit-post/${post.$id}`}>
						<Button text={"save"} type={"button"}>&nbsp; Edit &nbsp;</Button>
					</Link>
					<Button text={"unsave"} type={"button"} clickFunc={deletePost}>Delete</Button>
				</div>
			)}
		</section>
	) : null
}

export default Post
