import envVariables from "../envVariables/envVariables";
import { ID, Client, Databases, Storage, Query } from "appwrite";

class Service {
	client = new Client();
	dataBase;
	bucket;

	constructor() {
		this.client
			.setEndpoint(envVariables.appwriteUrl)
			.setProject(envVariables.appwriteProjectId)

		this.dataBase = new Databases(this.client)
		this.bucket = new Storage(this.client)
	}

	//Post Services

	//post create method
	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.dataBase.createDocument(
				envVariables.appwriteDatabaseId,
				envVariables.appwriteCollectionId,
				slug,
				{
					title, content, featuredImage, status, userId
				}
			)
		} catch (error) {
			throw error
		}
	}

	//update Post method
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.dataBase.updateDocument(
				envVariables.appwriteDatabaseId,
				envVariables.appwriteCollectionId,
				slug,
				{
					title,  content, featuredImage, status
				}
			)
		} catch (error) {
			throw error
		}
	}

	//delete Post method
	async deletePost(slug) {
		try {
			await this.dataBase.deleteDocument(envVariables.appwriteDatabaseId, envVariables.appwriteCollectionId, slug)
			return true
		} catch (error) {
			throw error
		}
	}

	//gett only one post method
	async getPost(slug) {
		try {
			return await this.dataBase.getDocument(
				envVariables.appwriteDatabaseId,
				envVariables.appwriteCollectionId,
				slug
			)
		} catch (error) {
			throw error
		}
	}

	//get all post from database
	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.dataBase.listDocuments(
				envVariables.appwriteDatabaseId,
				envVariables.appwriteCollectionId,
				queries
				// [
				// 	Query.equal("status","active")
				// ]
			)
		} catch (error) {
			throw error
		}
	}

	//FIle Services

	//file upload method
	async fileUpload(file) {
		try {
			return await this.bucket.createFile(envVariables.appwriteBucketId, ID.unique(), file)
		} catch (error) {
			this.error
		}
	}

	//file delete method
	async deleteFile(fileId) {
		try {
			return await this.bucket.deleteFile(envVariables.appwriteBucketId, fileId)
		} catch (error) {
			this.error
		}

	}
	getPreviewFile(fileId) {

		return this.bucket.getFilePreview(envVariables.appwriteBucketId, fileId)

	}
}
export const postService = new Service()
