/**
 * Content Source Adapter
 *
 * Keeps campaign generation independent from the location/format of the content database.
 * The UI can later connect JSON, HTML or another content source here.
 */

function selectPosts(content, filters = {}) {
  return content.filter(post => {
    if (filters.product && post.product !== filters.product) return false;
    if (filters.language && post.language !== filters.language) return false;
    if (filters.status && post.status !== filters.status) return false;
    return true;
  });
}

function takeBatch(posts, size = 10) {
  return posts.slice(0, size);
}

if (typeof module !== 'undefined') {
  module.exports = {
    selectPosts,
    takeBatch
  };
}
