import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Error from './components/Error404.jsx'
import Home from './components/Home.jsx'
import Movies from './components/Movies.jsx'
import Movie from './components/Movie.jsx'
import Search from './components/Search.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      errorElement:<Error />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/movies",
          element:<Movies />
        },
        {
          path:"/search",
          element:<Search />
        },
        {
          path:"/movie",
          element:<Movie />
        }
      ]
    }
  ])
  return (
    <>
       <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
