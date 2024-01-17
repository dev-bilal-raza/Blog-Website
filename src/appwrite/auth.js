import envVariables from "../envVariables/envVariables";
import { Client, Account, ID } from "appwrite";

class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(envVariables.appwriteUrl)
			.setProject(envVariables.appwriteProjectId)
		this.account = new Account(this.client)
	}

	//create account method
	async createAccount({ email, password, name }) {
		try {
			// console.log(email, password, name)
			const userAccount = await this.account.create(ID.unique(), email, password, name)
			console.log('user account', userAccount)
			if (userAccount) {
				return this.login({email, password})
			} else {
				return userAccount
			}
		} catch (error) {
			throw error
		}
	}

	//login method
	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password)

		} catch (error) {
			throw error
		}
	}

	//get account method
	async getUserDetails() {
		try {
			return await this.account.get()
		} catch (error) {
			throw error
		}

	}

	//logout method
	async logout() {
		try {
			await this.account.deleteSessions()
		} catch (error) {
			throw error
		}

	}

}

const authService = new AuthService();
export default authService