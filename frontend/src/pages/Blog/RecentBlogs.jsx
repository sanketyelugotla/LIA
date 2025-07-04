// RecentBlogs.js
import BlogCard from './BlogCard';
import BlogListContainer from './BlogListContainer';
import { getRecentBlogs } from '../../services/blog';

const RecentBlogs = () => (
    <BlogListContainer fetchFunction={getRecentBlogs}>
        {(blogs) => (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="flex">
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        )}
    </BlogListContainer>
);

export default RecentBlogs;