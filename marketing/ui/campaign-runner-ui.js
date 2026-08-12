/*
 * Campaign Builder execution controller
 * Connects UI selections with campaign generation.
 */

function prepareCampaign({ product, language, posts, batchSize, runner }) {
  const config = {
    id: `${product}_${language}_beta`,
    product,
    language,
    batchSize: Number(batchSize),
    status: 'ready'
  };

  return runner({
    posts,
    config
  });
}

function createDownload(csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
}

if (typeof window !== 'undefined') {
  window.CampaignRunnerUI = {
    prepareCampaign,
    createDownload
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    prepareCampaign
  };
}
