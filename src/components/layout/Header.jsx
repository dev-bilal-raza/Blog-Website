import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Wrapper } from "../Importer"
import { useSelector } from "react-redux"
import Button from "../shared/Button"
import Logoutbtn from "../logout/Logoutbtn"
import ResponsiveNavber from "./ResponsiveNavber"

export let navItems;
const Header = () => {
	
	const navigate = useNavigate()
	const authStatus = useSelector((state) => state.auth.status);
	// console.log(authStatus);
	navItems = [
		{
			name: "Home",
			slug: "/",
			active: true
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus
		},
		{
			name: "All Blogs",
			slug: "/all-posts",
			active: authStatus
		},
		{
			name: "Add Blog",
			slug: "/add-post",
			active: authStatus
		},
	]


	return (
		<header className="sticky top-0 z-20 bg-white sm:bg-white/25 backdrop-blur-md ">
			<Wrapper >
				<nav className="flex justify-between items-center">
					<div>
						<Link to={"/"}>
							<img src={"/assets/bloglogo.png"} alt="logo" width={50} height={20}
							/></Link>
					</div>
					<ul className="hidden sm:flex items-center gap-7 ">
						{navItems.map((item) => (
							item.active ? (
								<li key={item.name} className="hover:underline font-normal text-lg" onClick={() => navigate(item.slug)}>{item.name}</li>
							) : null
						))}


					</ul>
					{authStatus && (
						<ul className="sm:block hidden">
							<li>
								<Logoutbtn />
							</li>
						</ul>
					)}
					<div className="block sm:hidden">
						<ResponsiveNavber />
					</div>
				</nav>
			</Wrapper>
		</header>
	)
}

export default Header
