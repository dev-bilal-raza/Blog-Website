import { useDispatch, useSelector } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import Button from "../shared/Button"

const Logoutbtn = () => {

	const dispatch = useDispatch()
	const logoutHandler = () => {
		authService.logout()
			.then(() => {
				dispatch(logout())
			})
	}
	return (
		<Button type={"button"} text={'unsave'} clickFunc={logoutHandler}>Logout</Button>
	)
}

export default Logoutbtn


