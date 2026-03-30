import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tools, categories } from '../tools';
import { blogs } from '../blogs';
import TIcon from '../components/TIcon';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const featuredBlogs = blogs.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Free Online Image Toolkit
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            20 browser-based image tools. Compress, resize, convert, and enhance your images. No login. No watermarks. Your files never leave your device.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold">
              Get Started
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-red-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <TIcon name={tool.icon} className="text-red-500 group-hover:text-red-600" />
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {tool.category}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-red-500">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <Link to="/blog" className="text-red-500 hover:text-red-600 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map(blog => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-red-500 uppercase">{blog.category}</span>
                  <h3 className="font-bold text-lg mt-2 mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{blog.date}</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg mb-4">Pixalyse</div>
              <p className="text-gray-400 text-sm">Free online image tools. No login. No watermarks.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link to="/tool/compress" className="hover:text-white">Compress Image</Link></li>
                <li><Link to="/tool/resize" className="hover:text-white">Resize</Link></li>
                <li><Link to="/tool/convert" className="hover:text-white">Convert</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Pixalyse. MIT License. Free to use and modify.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
