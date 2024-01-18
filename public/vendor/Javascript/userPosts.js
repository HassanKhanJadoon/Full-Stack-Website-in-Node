const socket = io();

// Function to create a new post
function createPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (title && content) {
    socket.emit('createPost', { title, content });
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  }
}

// Function to display posts
function displayPosts(posts) {
  const postList = document.getElementById('postList');
  postList.innerHTML = '';

  posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${post.title}</strong>: ${post.content}`;
    postList.appendChild(listItem);
  });
}

// Listen for new posts and retrieve all posts
socket.on('newPost', (post) => {
  displayPosts([post]);
});

socket.on('allPosts', (posts) => {
  displayPosts(posts);
});

// Initial request for posts
socket.emit('getPosts');
