// FeaturedBlog.js
import { Link } from 'react-router-dom';
import BlogListContainer from './BlogListContainer';
import { getFeaturedBlog } from '../../services/blog';

const FeaturedBlog = () => (
    <BlogListContainer fetchFunction={getFeaturedBlog}>
        {(blogs) => {
            const featuredBlog = blogs[0];
            if (!featuredBlog) return null;

            return (
                <div className="bg-[#7c4ee4] py-10 md:py-12 lg:py-15 mx-[-12rem] mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                            {/* Text Content */}
                            <div className="lg:w-1/2 px-4 sm:px-6">
                                <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                                    Featured Post
                                </span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                                    {featuredBlog.title}
                                </h2>
                                <p className="text-white/90 mb-8 text-base sm:text-lg">
                                    {featuredBlog.description.substring(0, 200)}...
                                </p>
                                <div className="flex items-center">
                                    <Link
                                        to={`/blogs/${featuredBlog._id}`}
                                        className="bg-white hover:bg-[#6a3fc9] hover:text-white px-8 py-3 rounded-md transition-colors duration-300 font-medium text-lg"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="lg:w-1/2 w-full">
                                <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-2xl">
                                    <img
                                        src={featuredBlog.image}
                                        alt={featuredBlog.title}
                                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }}
    </BlogListContainer>
);

export default FeaturedBlog;