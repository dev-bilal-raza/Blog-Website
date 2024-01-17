// import { forwardedRef, useId } from "react"
import React, { useId } from "react";

const UserInput = React.forwardRef(function UserInput(
	{
		label,
		type = "text",
		className = "",
		...props
	}, ref) {

	//here define useId method
	const id = useId();
	return (
		<div className="flex flex-col gap-3 justify-center ">
			{label && <label className="text-lg font-medium" htmlFor={id}>{label}</label>}
			<input type={type} id={id} className={`p-3 border shadow-[0_3px_10px_rgb(0,0,0,0.1)] ${className}`} ref={ref} {...props} />

		</div>
	)
})

// export default forwardRef(UserInput)
export default UserInput