import React, { useEffect, useState } from 'react'
import { PostForm } from '../components/Importer'
import { useNavigate, useParams } from 'react-router-dom'
import { postService } from '../appwrite/config'


const EditPost = () => {
	const navigate = useNavigate();
	const { slug } = useParams();
	const [post, setpost] = useState(null)
	useEffect(() => {
		if (slug) {
			// console.log(slug);
			postService.getPost(slug).then((post) => {
				setpost(post)
				// console.log(post);
			})
		} else {
			useNavigate("/")
		}
	}, [slug, navigate]);

	return post ? <PostForm post={post} /> : null
}

export default EditPost
