/**
 * Content & Sales Engine - Buffer export generator
 *
 * Reads campaign rules and converts ready posts into Buffer CSV format.
 * This first version is intentionally dependency-free so it can run in a browser
 * or simple Node environment.
 */

function createUtmUrl(baseUrl, product, language, postId) {
  const campaign = `${product}_${language}_beta`;
  const params = new URLSearchParams({
    utm_source: 'threads',
    utm_medium: 'social',
    utm_campaign: campaign,
    utm_content: postId
  });

  return `${baseUrl}?${params.toString()}`;
}

function csvEscape(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function generateBufferCsv(posts, settings) {
  const headers = [
    'Post ID',
    'Product',
    'Language',
    'Campaign',
    'Text',
    'Posting Time',
    'Status',
    'UTM URL'
  ];

  const rows = posts.map(post => {
    const campaign = `${settings.product}_${settings.language}_beta`;

    return [
      post.id,
      settings.product,
      settings.language,
      campaign,
      post.text,
      post.postingTime || '',
      'ready',
      createUtmUrl(settings.baseUrl, settings.product, settings.language, post.id)
    ];
  });

  return [headers, ...rows]
    .map(row => row.map(csvEscape).join(','))
    .join('\r\n');
}

if (typeof module !== 'undefined') {
  module.exports = {
    createUtmUrl,
    generateBufferCsv
  };
}
