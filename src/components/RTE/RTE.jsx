import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'


function RTE({ name, control, label, defaultValue = "" }) {
	return (
		<div className='space-y-3'>
			{label && <label className='text-lg font-medium'>{label}</label>}
			<Controller
				name={name || "content"}
				control={control}
				render={({ field: { onChange } }) => (
					<Editor
						apiKey='a898cg6ukhrll3bfmbj9hz1jromqg08p01npywqap35bmfdv'
						initialValue={defaultValue}
						init={{
							initialValue: defaultValue,
							height: 500,
							menubar: true,
							plugins: [
								"image",
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"code",
								"help",
								"wordcount",
								"anchor",
							],
							toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
							content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

						}}
						onEditorChange={onChange}
					/>


				)}
			/>

		</div>
	)
}



export default RTE
