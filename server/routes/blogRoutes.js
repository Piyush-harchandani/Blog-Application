import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const blogRouter = express.Router()

blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.post('/toggle-publish', auth, togglePublish); 
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/add-comment', addComment);
blogRouter.get('/comments', getBlogComments);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/generate', auth, generateContent);


export default blogRouter;