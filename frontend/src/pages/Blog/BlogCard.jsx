import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const BlogCard = ({ blog }) => {
    console.log(blog)
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                    <Link to={`/blogs/${blog._id}`} className="hover:text-blue-600">
                        {blog.title}
                    </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {blog.author?.name || 'Unknown'}</span>
                    <span>{formatDate(blog.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;