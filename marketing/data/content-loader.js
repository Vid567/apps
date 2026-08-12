/**
 * Loads campaign content sources.
 * Browser-ready adapter for future JSON content collections.
 */

async function loadContent(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Content load failed: ${response.status}`);
  }

  return response.json();
}

function filterCampaignContent(posts, product, language) {
  return posts.filter(post =>
    post.product === product &&
    post.language === language &&
    post.status === 'ready'
  );
}

if (typeof window !== 'undefined') {
  window.ContentLoader = {
    loadContent,
    filterCampaignContent
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    filterCampaignContent
  };
}
