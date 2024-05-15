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
		<header className="sticky top-0 z-20 bg-gradient-to-tr from-white/20 via-white to-gray-400 pb-1.5">
			<Wrapper>
				<nav className="flex justify-between items-center mx-2">
					<div>
						<Link to={"/"}>
							<img src={"/assets/bloglogo.png"} alt="logo" width={50} height={20}
							/></Link>
					</div>
					<ul className="hidden sm:flex items-center gap-7 ">
						{navItems.map((item) => (
							item.active ? (
								<li key={item.name} className="font-para hover:cursor-pointer hover:text-gray-500 text-xl" onClick={() => navigate(item.slug)}>{item.name}</li>
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
