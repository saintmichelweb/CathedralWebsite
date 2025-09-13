import { Navbar,Footer } from '../components/index'
import { Outlet } from 'react-router-dom'

export const MainLayout = () =>{
  return (
    <>
      <Navbar />
      <div className="fluid-container ">
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}
