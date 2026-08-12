const { runCampaign } = require('./campaign-runner');
const { selectPosts, takeBatch } = require('./content-source-adapter');
const { buildBatch } = require('./campaign-batch-builder');
const { generateBufferCsv } = require('./buffer-export-generator');
const posts = require('../data/dcp-en-test-content.json');

const config = {
  id: 'dcp_en_beta',
  product: 'dcp',
  language: 'en',
  batchSize: 10,
  baseUrl: 'https://vid567.github.io/dailycashplan/'
};

const result = runCampaign({
  posts: takeBatch(selectPosts(posts, config), config.batchSize),
  config,
  selectPosts,
  buildBatch,
  generateBufferCsv
});

console.log(JSON.stringify({
  campaign: result.campaign,
  count: result.count,
  csv: result.csv
}, null, 2));
