import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [latestPost, setLatestPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("api/post/getposts?limit=1&startIndex=0");
        const data = await res.json();
        if (res.ok) {
          setLatestPost(data.posts[0]);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("api/post/getposts?limit=8&startIndex=1");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {latestPost && (
        <>
          <div className=" w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-36">
            <h1 className="text-2xl font-serif text-center md:text-3xl font-semibold text-nowrap">
              Latest Post
            </h1>
          </div>
          <div className="flex p-3 flex-col mx-auto max-w-6xl justify-center items-center ">
            <img
              src={latestPost.image}
              alt="blog image"
              className=" shadow w-full max-w-5xl h-80 object-cover  sm:h-[450px] rounded-lg"
            />
            <div className="w-full flex justify-between max-w-5xl mt-5">
              <span className=" font-mono ">{latestPost.category} </span>
              <span className=" italic text-sm">
                {(latestPost.content.length / 1000).toFixed(0) + " min read"}
              </span>
            </div>
            <div className="w-full max-w-5xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl line-clamp-2 md:line-clamp-1 font-medium font-serif pt-1 ">
                {latestPost.title}{" "}
              </h1>
            </div>
            <Link to={`/post/${latestPost.slug}`}>
              <button className="font-mono mt-12 mb-5 rounded-3xl border transform hover:scale-95 transition-transform duration-300 hover:bg-[#7272722b] border-[#3d3d3ebf] dark:bg-[#3d3d3ebf] dark:hover:bg-[#54545a]">
                <div className="flex items-center gap-1">
                  <span className="px-3 py-2 tracking-widest">
                    Read Full Post
                  </span>
                </div>
              </button>
            </Link>
          </div>
        </>
      )}

      <div className="flex justify-between gap-6 pt-28 max-w-7xl items-center mx-auto">
        <h2 className="text-2xl text-center font-serif">Recent Posts</h2>
        <Link
          to="/search"
          className="text-xs sm:text-lg font-bold text-green-400 hover:text-green-500 text-center block mt-4 hacker-text"
        >
          View all posts
          <span className="inline-block w-1 h-3 ml-1 bg-green-400 rounded blink"></span>
        </Link>
      </div>

      <div className="max-w-[2380px] mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-14">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="w-full h-screen flex  justify-center pt-72 ">
            <h1 className="text-3xl text-gray-500">Loading...</h1>
          </div>
        )}
      </div>

      <Link
        to="/search"
        className="text-xs w-full p-10 sm:text-lg font-bold text-green-400 hover:text-green-500 text-center mt-4 hacker-text"
      >
        View all posts
        <span className="inline-block w-1 h-3 ml-1 bg-green-400 rounded blink"></span>
      </Link>
    </div>
  );
}
