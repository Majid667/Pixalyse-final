import { useParams, Link } from 'react-router-dom';
import { blogs } from '../blogs';

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog post not found</h1>
          <Link to="/blog" className="text-red-500 hover:text-red-600 font-semibold">
            Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles from same category
  const related = blogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/blog" className="text-red-500 hover:text-red-600 font-semibold mb-4 inline-block">
            ← Back to articles
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{blog.title}</h1>

          <div className="flex gap-4 text-gray-600 mb-8">
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime} min read</span>
            <span>•</span>
            <span className="text-red-500 font-semibold">{blog.category}</span>
          </div>
        </div>

        {/* Featured image */}
        <div className="h-96 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center mb-12">
          <div className="w-24 h-24 bg-red-500 rounded-full opacity-70"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">{blog.content}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always optimize images for your specific use case</li>
            <li>Consider both quality and file size requirements</li>
            <li>Test different compression levels for your platform</li>
            <li>Keep original files as backup</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
          <p>Image optimization is crucial for web performance and user experience. By understanding the tools and techniques available, you can create better content faster.</p>
        </div>

        {/* Author info */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-semibold">{blog.author}</p>
              <p className="text-gray-600 text-sm">Expert in image processing and optimization</p>
            </div>
          </div>
        </div>

        {/* Ad space */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 mb-12">
          <p className="text-sm">Advertisement space</p>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(article => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full opacity-70"></div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-red-500 uppercase mb-2">{article.category}</p>
                    <h3 className="font-bold line-clamp-2 group-hover:text-red-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">{article.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
