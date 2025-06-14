import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import Moment from 'moment';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const {axios} = useAppContext()
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName ] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async ()=>{
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog): toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const {data} = await axios.get('/api/admin/comments', {blogId : id})
      if (data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message);
        }
      } catch (error) {
      toast.error(error.message)
      }
    };

    const addComment = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post('/api/blog/add-comment', {blog : id, name, content});
        if (data.success){
          toast.success(data.message)
          setName('')
          setContent('')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        <Loader/>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Blog Header with Background */}
      <div
        className="w-full text-center text-gray-600 px-4 py-10 relative"
        style={{
          backgroundImage: `url(${assets.gradientBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-primary font-medium">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold max-w-3xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-4 max-w-xl truncate mx-auto text-gray-500">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          
        </p>
      

      {/* Blog Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10">
        <img src={data.image} alt="blog cover" className="rounded-3xl mb-6 w-full" />
        <div
          className="rich-text max-w-3xl mx-auto text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>

      {/* Comments Section */}
      <div className="mt-14 mb-16 max-w-3xl mx-auto px-4">
        <p className="text-lg font-semibold mb-4 text-gray-700">
          Comments ({comments.length})
        </p>
        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div
              key={index}
              className="bg-primary/5 border border-primary/10 p-4 rounded-md text-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="user" className="w-6 h-6" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm ml-8">{item.content}</p>
              <p className="text-xs text-right mt-2 text-gray-400">
                {Moment(item.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='max-w-3xl mx-auto'>
        <p className='font-semibold mb-4'>Add your comment</p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
          <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' />
          <textarea onChange={(e)=> setContent(e.target.value)} value={content} className='w-full p-2 border border-gray-300 rounded outline-none h-48' required placeholder='Comment'></textarea>
          <button className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer' type='submit'>Submit</button>
        </form>
      </div>
      </div>
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4'>Share this article on social media</p>
        <div className='flex'>
          <img src={assets.facebook_icon} width={50} alt="" />
          <img src={assets.twitter_icon} width={50} alt="" />
          <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;

