/*
 * Campaign Builder browser bootstrap
 *
 * Loads the campaign data source and prepares the browser workflow.
 */

const CAMPAIGN_SOURCES = {
  dcp_en: '../data/dcp-en-test-content.json'
};

async function prepareCampaignData(product, language) {
  const key = `${product}_${language}`;
  const source = CAMPAIGN_SOURCES[key];

  if (!source) {
    return [];
  }

  const response = await fetch(source);
  const posts = await response.json();

  return posts.filter(post =>
    post.product === product &&
    post.language === language &&
    post.status === 'ready'
  );
}

if (typeof window !== 'undefined') {
  window.CampaignBootstrap = {
    prepareCampaignData
  };
}
