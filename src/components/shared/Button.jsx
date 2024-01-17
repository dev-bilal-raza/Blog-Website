import React from 'react'

function Button({ children, type, text, clickFunc, ...props }) {
	return (
		<button type={type} onClick={clickFunc} className={`p-2 px-6  rounded-xl text-white ${text === "save" ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-500 hover:bg-red-400'} hover:cursor-pointer`} {...props}>{children}</button>
	)
}

export default Button
