import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="font-bold text-lg">Pixalyse</span>
          </Link>
          
          <div className="flex gap-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-red-500">
              Tools
            </Link>
            <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-red-500">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
