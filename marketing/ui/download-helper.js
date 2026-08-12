/**
 * Browser download helper for generated campaign CSV files.
 */

function downloadCampaignCsv(csv, filename = 'buffer-campaign.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

if (typeof window !== 'undefined') {
  window.DownloadHelper = {
    downloadCampaignCsv
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    downloadCampaignCsv
  };
}
