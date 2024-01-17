import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import { postService } from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Importer/index'
import { useForm } from 'react-hook-form'
import RTE from '../RTE/RTE'
import UserInput from '../userInput/UserInput'


function PostForm({ post }) {
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const selectorOptions = ["active", "inactive"];
	const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
		defaultValues: {
			title: post?.title || "",
			content: post?.content || "",
			slug: post?.slug || "",
			status: post?.status || "active",
		}
	})
	const submit = async (data) => {
		if (post) {
			const file = data.image[0] ? await postService.fileUpload(data.image[0]) : null;
			if (file) {
				postService.deleteFile(post.featuredImage)
			}
			const dbPost = await postService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined
			})
			if (dbPost) {
				navigate(`/all-posts`)
			}

		} else {
			const file = data.image[0] ? await postService.fileUpload(data.image[0]) : null;
			// console.log(file);
			// console.log(data);
			if (file) {
				data.userId = userData.$id
				// console.log(userData);
				const dbPost = await postService.createPost({
					...data,
					featuredImage: file ? file.$id : undefined,
					// userId: userData.$id
				})
				// console.log("DB Post " + dbPost);
				if (dbPost) {
					navigate(`/`)
				} else {

				}
			}
		}
	}
	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");

		return "";
	}, []);

	useEffect(() => {
		const subcrition = watch((value, { name }) => {
			if (name === 'title') {
				setValue("slug", slugTransform(value.title), { shouldValidate: true })
			}
		})

		return () => subcrition.unsubscribe()
	}, [watch, slugTransform, setValue])




	return (
		<section className='border m-8 p-8 shadow-[0_3px_10px_rgb(0,0,0,0.4)]'>
			<form onSubmit={handleSubmit(submit)} className='flex  flex-col justify-around items-center gap-5'>
				<div className='sm:w-3/4 flex flex-col gap-7'>
					<UserInput
						label="Title"
						placeholder="Title"
						{...register("title", { required: true })}
					/>
					<UserInput
						label="Slug"
						placeholder="Slug"
						{...register("slug", { required: true })}
						onInput={(e) => {
							setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
						}}
					/>

					<div>
						<RTE
							label="Content"
							control={control}
							name="content"
							defaultValue={getValues("content")}
						/>
					</div>
				</div>
				<div className='space-y-4 w-full sm:w-3/4'>
					<UserInput
						type="file"
						label="Image:"
						accept="image/png, image/jpg, image/jpeg, image/gif"
						{...register("image", { required: !post })}
					/>
					{post && <div>
						<img
							src={postService.getPreviewFile(post.featuredImage)}
							alt={post.title}
							className='w-full h-[30rem] object-cover rounded-md'
						/>
					</div>}
					<div className=' flex gap-3 justify-center'>
						<select {...register("status", { required: true })} className='border-2 p-2'>
							{/* <option value="">hello</option> */}
							{selectorOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}

						</select>
						<Button type="submit" text={"save"} >
							{post ? "Update" : "Submit"}
						</Button>
					</div>
				</div>

			</form>
		</section>
	)

}

export default PostForm
