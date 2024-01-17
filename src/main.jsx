import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.jsx'
import { Login, AuthLayout } from "./components/Importer/index.js"
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import SignUp from './pages/SignUp.jsx'
import AllPost from './pages/AllPost.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "",
      element: <Home />
    },
    {
      path: "/signup",
      element: (
        <AuthLayout authentication={false}>
          <SignUp />
        </AuthLayout>
      )
    },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      )
    },
    {
      path: "/all-posts",
      element: (

        <AllPost />

      )
    },
    {
      path: "/add-post",
      element: (
        <AuthLayout authentication>
          <AddPost />
        </AuthLayout>
      )
    },
    {
      path: "/edit-post/:slug",
      element: (
        <AuthLayout authentication>
          <EditPost />
        </AuthLayout>
      )
    },
    {
      path: "/post/:slug",
      element: (
        <AuthLayout authentication>
          <Post />
        </AuthLayout>
      )
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
