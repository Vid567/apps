/**
 * Campaign Batch Builder
 * Creates a publish-ready batch from campaign settings.
 */

function buildBatch(posts, config) {
  const limit = config.batchSize || 10;

  return posts.slice(0, limit).map((post, index) => ({
    id: post.id || `${config.prefix}-${String(index + 1).padStart(3, '0')}-${config.language}`,
    product: config.product,
    language: config.language,
    campaign: config.id,
    text: post.text,
    postingTime: post.postingTime || '',
    status: 'ready'
  }));
}

if (typeof module !== 'undefined') {
  module.exports = { buildBatch };
}
