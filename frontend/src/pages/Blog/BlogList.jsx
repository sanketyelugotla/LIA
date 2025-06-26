// BlogList.js (updated)
import BlogGrid from './BlogGrid';
import BlogListContainer from './BlogListContainer';
import { getBlogs } from '../../services/blog';

const BlogList = () => (
    <BlogListContainer fetchFunction={getBlogs}>
        {(blogs) => (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BlogGrid blogs={blogs} className="gap-10" />
            </div>
        )}
    </BlogListContainer>
);

export default BlogList;