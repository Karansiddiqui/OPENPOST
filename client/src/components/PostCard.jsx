import { Link } from 'react-router-dom';
import moment from "moment";
import '../index.css'; // Import CSS file for styling


export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border-2 border-gray-300 dark:border-gray-700 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all shadow-lg post-card'>
      <div className='m-3'>
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt='post cover'
            className='h-[260px] w-full rounded-md object-cover group-hover:h-[200px] transition-all duration-300 z-20'
          />
        </Link>
        <div className='p-3 flex flex-col gap-2 bg-white dark:bg-black rounded-b-lg'>
          <p className='text-lg font-semibold line-clamp-2 text-gray-800 dark:text-white'>{post.title}</p>
          <div className="flex items-center justify-between mt-3">
          <p className="block border font-mono border-gray-700  rounded-full pr-2 pl-2  dark:text-gray-400  text-xs antialiased font-normal leading-relaxed text-gray-700">
            {post.category}
          </p>
          <p className="block  dark:text-gray-400  antialiased font-normal leading-relaxed text-xs">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
          <Link
            to={`/post/${post.slug}`}
            className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-16 right-16 border border-gray-400 dark:border-gray-500 text-black dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black transition-all duration-300 text-center py-2 rounded-2xl !rounded-tl-none m-2'
          >
            Read article
          </Link>
        </div>
      </div>
    </div>
  );
}

