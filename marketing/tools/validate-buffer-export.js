/**
 * Buffer export validation
 * Checks generated campaign output before publishing.
 */

function validateBufferExport(csv) {
  const requiredColumns = [
    'Post ID',
    'Product',
    'Language',
    'Campaign',
    'Text',
    'Posting Time',
    'Status',
    'UTM URL'
  ];

  const firstLine = csv.split('\n')[0];
  const missing = requiredColumns.filter(column => !firstLine.includes(column));

  return {
    passed: missing.length === 0,
    missingColumns: missing,
    hasUtm: csv.includes('utm_source=threads') && csv.includes('utm_campaign=')
  };
}

if (typeof module !== 'undefined') {
  module.exports = { validateBufferExport };
}
