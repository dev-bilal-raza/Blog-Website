import React from 'react'

function Wrapper({children}) {
  return <div className='max-w-7xl m-auto p-2'>
	  {children}
	</div>;
  
}

export default Wrapper
