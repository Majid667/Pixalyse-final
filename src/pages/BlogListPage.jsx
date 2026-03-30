import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../blogs';

const blogCategories = ['All', 'Optimize', 'Edit', 'Convert', 'AI Tools', 'Developer', 'Special'];

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Image Guides & Tips</h1>
          <p className="text-xl text-gray-600">Learn how to optimize, edit, and convert images like a pro.</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          {blogCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center group-hover:from-red-200 group-hover:to-red-100 transition-all">
                <div className="w-16 h-16 bg-red-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-red-500 uppercase">{blog.category}</span>
                  <span className="text-xs text-gray-500">{blog.readTime} min</span>
                </div>
                
                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <span>{blog.date}</span>
                  <span className="text-red-500 font-semibold group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
