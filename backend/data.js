const data = [
    {
        title: "How to make a Game Look more attractive with New VR & AI Technology",
        description: "Google has been investing in Al for many years and bringing its benefits to individuals, businesses and communities.Whether it's publishing state- of - the - art research, building helpful products or developing tools and resources that enable others, were committed to making Al accessible to everyone.",
        category: "Development",
        image: "https://www.embitel.com/wp-content/uploads/Virtual-Reality-gaming.jpg",
        url: "a",
        content: "a",
    }
]

function extractFields(articles) {
    return articles.map(({ title, description, content, category, url, image }) => ({
        title,
        description,
        content,
        url,
        category,
        image,
    }));
}

let cleanedData = extractFields(data);

// Function to POST each article to the backend
async function postBlogs(blogs) {
    for (const blog of blogs) {
        try {
            const response = await fetch('http://localhost:5000/blogs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blog)
            });

            if (!response.ok) {
                throw new Error(`Failed to post blog: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Posted:', result);
        } catch (error) {
            console.error('Error posting blog:', error.message);
        }
    }
}

// Call the function to post all blogs
postBlogs(cleanedData);