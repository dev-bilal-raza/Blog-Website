import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/Importer'
import { Outlet } from 'react-router-dom'
import Loader from './components/loader/Loader'
// import envVariables from './envVariables/envVariables'
function App() {
  const [loading, setloading] = useState(true);
  const disaptch = useDispatch();
  // console.log(envVariables)
  useEffect(() => {
    authService.getUserDetails()
      .then((userData) => {
        if (userData) {
          disaptch(login({ userData }))
        } else {
          disaptch(logout())
        }
      })
      .catch((error) => {
        // console.log("Failed to login", error)
      }
      )
      .finally(() => {
        setloading(false)
      })


  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between b'>
      <div className='w-full block'>
        <Header />
        <main className=''>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='flex flex-col justify-between w-full items-center h-[100vh]'>
      <div className='w-full mb-20'>

        <Header />
      </div>

      <div className='h-full'>
        <Loader />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
