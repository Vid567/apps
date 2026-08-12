/*
 * Campaign Builder integration
 *
 * Connects loaded campaign content with the export pipeline.
 */

async function generateCampaignExport(settings) {
  const config = {
    id: `${settings.product}_${settings.language}_beta`,
    product: settings.product,
    language: settings.language,
    batchSize: settings.batchSize,
    status: 'ready'
  };

  const posts = settings.posts || [];

  const batch = posts.slice(0, config.batchSize).map((post, index) => ({
    id: post.id || `${config.product}-${index + 1}-${config.language}`,
    product: config.product,
    language: config.language,
    campaign: config.id,
    text: post.text,
    postingTime: post.postingTime || '',
    status: 'ready'
  }));

  return {
    ...config,
    count: batch.length,
    batch,
    status: 'ready',
    pipeline: [
      'content-source',
      'campaign-runner',
      'validation',
      'buffer-export'
    ]
  };
}

if (typeof window !== 'undefined') {
  window.CampaignBuilderIntegration = {
    generateCampaignExport
  };
}

if (typeof module !== 'undefined') {
  module.exports = { generateCampaignExport };
}
