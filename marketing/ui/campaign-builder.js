/*
 * Campaign Builder UI controller
 *
 * Connects user selections to the campaign engine.
 * The actual content database connection can be injected later.
 */

function createCampaignConfig(product, language, batchSize) {
  return {
    id: `${product}_${language}_beta`,
    product,
    language,
    batchSize: Number(batchSize),
    status: 'ready'
  };
}

function downloadCsv(csv, filename = 'buffer-campaign.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

if (typeof window !== 'undefined') {
  window.CampaignBuilder = {
    createCampaignConfig,
    downloadCsv
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    createCampaignConfig
  };
}
