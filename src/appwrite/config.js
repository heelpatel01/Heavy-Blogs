import config from "../configVariables/config";
import { Client, Account, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error while creating post by Appwrite: " + error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return this.database.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error by appwrite while updating the post: " + error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error by appwrite while deleting the document:" + error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(
        "Error by appwrite while getting in to the document (Blog Post): " +
          error
      );
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        // [Query.equal("status", "active")]
        queries
      );
    } catch (error) {
      console.log(
        "Error bheja gaya hai bhaiya appwrite ke dwara sare posts render karte waqt: " +
          error
      );
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error while uploading a file by appwrite ::" + error);
      return false;
    }
  }

  async deleteFile(fileId) {
    return await this.bucket.deleteFile(config.appWriteBucketId, fileId);
  }

  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appWriteBucketId, fileId);
    } catch (error) {
      console.log("ERRROR WHILE PREVIEW (APP-WRITE):" + error);
      return false;
    }
  }
}

const service = new Service();

export default service;
