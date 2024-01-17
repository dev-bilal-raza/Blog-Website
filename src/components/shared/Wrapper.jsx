import React from 'react'

function Wrapper({children}) {
  return <div className='max-w-7xl m-auto p-4 '>
	  {children}
	</div>;
  
}

export default Wrapper
