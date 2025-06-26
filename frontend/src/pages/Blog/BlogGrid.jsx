// BlogGrid.js
const BlogGrid = ({ blogs, className = '' }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {blogs.map((blog) => (
            <div key={blog._id} className="flex">
                <BlogCard blog={blog} />
            </div>
        ))}
    </div>
);

export default BlogGrid;