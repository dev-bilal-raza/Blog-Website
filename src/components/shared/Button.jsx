import React from 'react'

function Button({ children, type, text, clickFunc, ...props }) {
	return (
		<button type={type} onClick={clickFunc} className={`font-para p-2 px-5 rounded-xl text-white ${text === "save" ? 'bg-blue-700 hover:bg-blue-600' : 'bg-red-600 hover:bg-red-500'} hover:cursor-pointer`} {...props}>{children}</button>
	)
}

export default Button
