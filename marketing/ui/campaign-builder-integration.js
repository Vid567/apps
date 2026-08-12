/* Campaign Builder production integration */
async function generateCampaignExport(settings) {
  const config = {
    id: `${settings.product}_beta_${settings.language}`,
    product: settings.product,
    language: settings.language,
    batchSize: Number(settings.batchSize),
    status: 'ready'
  };

  const posts = settings.posts || [];
  const batch = posts.slice(0, config.batchSize).map((post, index) => ({
    id: post.id || `${config.product}-${index + 1}-${config.language}`,
    product: config.product,
    language: config.language,
    campaign: config.id,
    text: post.text,
    postingTime: post.planned_at || post.postingTime || '',
    status: 'ready',
    destinationUrl: post.destination_url || '',
    trackingUrl: post.tracking_url || ''
  }));

  return { ...config, count: batch.length, batch };
}

if (typeof window !== 'undefined') window.CampaignBuilderIntegration = { generateCampaignExport };
if (typeof module !== 'undefined') module.exports = { generateCampaignExport };
