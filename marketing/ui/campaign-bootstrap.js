/*
 * Campaign Builder browser bootstrap
 * Loads the production marketing content database.
 */

const CONTENT_DATABASE = '../content-database.json';

async function prepareCampaignData(product, language) {
  const response = await fetch(CONTENT_DATABASE, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Content database load failed: ${response.status}`);

  const database = await response.json();
  const posts = Array.isArray(database.posts) ? database.posts : [];

  return posts.filter(post =>
    post.product_key === product &&
    post.language === language &&
    post.review_status === 'master' &&
    post.status === 'SOURCE'
  );
}

if (typeof window !== 'undefined') {
  window.CampaignBootstrap = { prepareCampaignData };
}
