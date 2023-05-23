const blogList = document.getElementById('blog-list');
const addBlogForm = document.getElementById('add-blog-form');
const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');

// Function to fetch and display blogs from JSONPlaceholder API
function fetchBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(blogs => {
      blogList.innerHTML = '';

      blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.className = 'blog';
        blogDiv.innerHTML = `
          <h3>${blog.title}</h3>
          <p>${blog.body}</p>
          <button class="delete-btn" data-id="${blog.id}">Delete</button>
        `;

        // Add click event listener to delete button
        const deleteBtn = blogDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteBlog(blog.id));

        blogList.appendChild(blogDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to add a new blog
function addBlog(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');

  const newBlog = {
    title: titleInput.value,
    body: contentInput.value
  };

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBlog)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error adding blog');
      }
    })
    .then(blog => {
      // Clear input fields
      titleInput.value = '';
      contentInput.value = '';

      // Create a new blog element and append it to the blog list
      const blogList = document.getElementById('blog-list');
      const blogDiv = document.createElement('div');
      blogDiv.className = 'blog';
      blogDiv.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.body}</p>
        <span class="delete-btn" data-id="${blog.id}">Delete</span>
      `;

      // Add click event listener to delete button
      const deleteBtn = blogDiv.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => deleteBlog(blog.id));

      blogList.appendChild(blogDiv);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// Function to delete a blog
function deleteBlog(blogId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Add this line
      } else {
        throw new Error('Error deleting blog');
      }
    })
    .then(() => {
      fetchBlogs(); // Update the blog list after successful deletion
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// Event listener for form submission
addBlogForm.addEventListener('submit', addBlog);

// Fetch and display initial blog list
fetchBlogs();
