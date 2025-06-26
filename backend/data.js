const data = [
    {
        title: "Make some drinks with chocolates chocolates and milk",
        description: "Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.survival strategies to ensure proactive",
        category: "Sports",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSju96eq8UduydeAI_Y64BrVukOY9g-CsopGbE_69BtppW0m08",
        url: "a",
        content: "a",
        views: 6,
    }
]

function extractFields(articles) {
    return articles.map(({ title, description, content, category, url, image, views }) => ({
        title,
        description,
        content,
        url,
        category,
        image,
        views
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