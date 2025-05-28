
import { useNavigate } from "react-router-dom"
import NavBarLanding from "../../components/NavBarLanding"
import CardsPage from "./CardsPage"
import EyePage from "./EyePage"
import Footer from "./Footer"
import LendingPage from "./LendingPage"
import Marqee from "./Marqee"
import WhyWypp from "./WhyWypp"
import { useEffect } from "react"
import useUserStore from "../../store/authStore"



function Index() {

  const {isLogin} =useUserStore()
  const navigation = useNavigate()

  const checkLogin = () =>{
    if (isLogin) {
      navigation("/home")
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])
  

  return (
    <div>
      <NavBarLanding/>
      <LendingPage/>
      <Marqee/>
      <CardsPage/>
      <EyePage/>
      <WhyWypp/>
      <Footer/>

    </div>
  )
}

export default Index
