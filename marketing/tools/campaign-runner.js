/**
 * Campaign Runner
 * Connects content selection, batch building and Buffer export.
 */

function runCampaign({ posts, config, selectPosts, buildBatch, generateBufferCsv }) {
  const selected = selectPosts(posts, {
    product: config.product,
    language: config.language,
    status: config.status || 'ready'
  });

  const batch = buildBatch(selected, config);
  const csv = generateBufferCsv(batch, config);

  return {
    campaign: config.id,
    product: config.product,
    language: config.language,
    count: batch.length,
    batch,
    csv
  };
}

if (typeof module !== 'undefined') {
  module.exports = { runCampaign };
}
