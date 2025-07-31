import BlogCard from '@/components/BlogCard';
import BlogCardList from '@/components/BlogCardList';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q');
  const { blog } = useSelector((store) => store.blog); // 🧠 make sure it's `blog` in redux

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!query) {
    return <div className="pt-32 text-center text-lg">No search query provided.</div>;
  }

  
  const filteredBlogs = blog?.filter((blog) =>
    blog?.title?.toLowerCase().includes(query.toLowerCase()) ||
    blog?.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    blog?.bio?.toLowerCase().substring(5).includes(query.toLowerCase()) ||
    blog?.category?.toLowerCase() === query.toLowerCase()||
    blog?.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`animate-slideInLeft pt-32 `}>
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-5 text-2xl font-semibold">
          Search Results for: "<span className="text-blue-600">{query}</span>"
        </h2>

        {filteredBlogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 my-10">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchList;



////////////////////////////////////////////////////