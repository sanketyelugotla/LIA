// BlogCard.js
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const BlogCard = ({ blog }) => {
    return (
        <div className="bg-white h-full flex flex-col rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Square image section - larger size */}
            <div className="relative pt-[100%] overflow-hidden"> {/* 1:1 square aspect ratio */}
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
                />
            </div>

            {/* Content section - slightly less padding to compensate for larger image */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                        {blog.category || 'General'}
                    </span>
                    <span className="text-xs text-gray-500">
                        {formatDate(blog.createdAt)}
                    </span>
                </div>

                {/* Title with 2-line clamp - slightly larger font */}
                <h3 className="text-2xl font-bold mb-3 line-clamp-2 leading-snug">
                    <Link to={`/blogs/${blog._id}`} className="hover:text-blue-600 transition-colors">
                        {blog.title}
                    </Link>
                </h3>

                {/* Description with 4-line clamp - slightly larger font */}
                <p className="text-gray-600 text-base line-clamp-4 mb-4 flex-grow">
                    {blog.description}
                </p>

                {/* Read More link at bottom */}
                <div className="mt-auto">
                    <Link
                        to={`/blogs/${blog._id}`}
                        className="text-blue-600 font-medium hover:underline inline-flex items-center text-base"
                    >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;