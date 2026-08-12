const { buildBatch } = require('./campaign-batch-builder');
const { generateBufferCsv } = require('./buffer-export-generator');

const config = {
  id: 'dcp_en_beta',
  product: 'dcp',
  language: 'en',
  prefix: 'DCP',
  batchSize: 10,
  baseUrl: 'https://vid567.github.io/dailycashplan/'
};

const samplePosts = [
  { id: 'DCP-001-en', text: 'Create a clear overview of your money.' },
  { id: 'DCP-002-en', text: 'See where your monthly expenses go.' },
  { id: 'DCP-003-en', text: 'Build your first personal cash plan.' }
];

const batch = buildBatch(samplePosts, config);
const csv = generateBufferCsv(batch, config);

console.log(csv);
