const postId = document.querySelector('input[name="post-id"]').value;

const editHandle = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/landing');
};

const deleteHandle = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/landing');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editHandle);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteHandle);
