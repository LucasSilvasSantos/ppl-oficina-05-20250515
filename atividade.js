const resp = document.getElementById('resp');

function imprime(objeto) {
  let mensagem = '';
  objeto.forEach(function (obj) {
    mensagem += `
      <br>
      {
        <br>
        "<span class='campo'>id</span>": ${obj.id},
        <br>
        "<span class='campo'>userId</span>": ${obj.userId},
        <br>
        "<span class='campo'>title</span>": "${obj.title}",
        <br>
        "<span class='campo'>body</span>": "${obj.body}"
        <br>
      },
      <br>`;
  });
  return mensagem || 'No posts found.';
}

async function readPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await response.json();
    resp.innerHTML = imprime(json);
  } catch (error) {
    resp.innerHTML = `<div class="error">Error loading posts: ${error.message}</div>`;
  }
}

async function filterPosts() {
  const filterUserId = document.getElementById('filterUserId').value;
  if (!filterUserId) {
    resp.innerHTML = '<div class="error">Please enter a User ID to filter.</div>';
    return;
  }
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${filterUserId}`);
    const json = await response.json();
    resp.innerHTML = imprime(json);
  } catch (error) {
    resp.innerHTML = `<div class="error">Error filtering posts: ${error.message}</div>`;
  }
}

async function createPost() {
  const userId = document.getElementById('createUserId').value;
  const title = document.getElementById('createTitle').value;
  const body = document.getElementById('createBody').value;
  const errorDiv = document.getElementById('createError');

  if (!userId || !title || !body) {
    errorDiv.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, body })
    });
    const json = await response.json();
    errorDiv.textContent = '';
    resp.innerHTML = 'Post created successfully:<br>' + imprime([json]);
    document.getElementById('createUserId').value = '';
    document.getElementById('createTitle').value = '';
    document.getElementById('createBody').value = '';
  } catch (error) {
    errorDiv.textContent = `Error creating post: ${error.message}`;
  }
}

async function updatePost() {
  const id = document.getElementById('updateId').value;
  const userId = document.getElementById('updateUserId').value;
  const title = document.getElementById('updateTitle').value;
  const body = document.getElementById('updateBody').value;
  const errorDiv = document.getElementById('updateError');

  if (!id || !userId || !title || !body) {
    errorDiv.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, userId, title, body })
    });
    const json = await response.json();
    errorDiv.textContent = '';
    resp.innerHTML = 'Post updated successfully:<br>' + imprime([json]);
    document.getElementById('updateId').value = '';
    document.getElementById('updateUserId').value = '';
    document.getElementById('updateTitle').value = '';
    document.getElementById('updateBody').value = '';
  } catch (error) {
    errorDiv.textContent = `Error updating post: ${error.message}`;
  }
}

async function deletePost() {
  const id = document.getElementById('deleteId').value;
  const errorDiv = document.getElementById('deleteError');

  if (!id) {
    errorDiv.textContent = 'Please enter a Post ID.';
    return;
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      errorDiv.textContent = '';
      resp.innerHTML = `Post with ID ${id} deleted successfully.`;
      document.getElementById('deleteId').value = '';
    } else {
      errorDiv.textContent = 'Error deleting post: Post not found.';
    }
  } catch (error) {
    errorDiv.textContent = `Error deleting post: ${error.message}`;
  }
}