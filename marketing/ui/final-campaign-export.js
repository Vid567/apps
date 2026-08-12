/**
 * Final campaign export flow
 * Connects campaign data to validation and CSV output.
 */

function executeCampaignExport({ batch, settings, validateBufferExport, generateBufferCsv }) {
  const csv = generateBufferCsv(batch, settings);
  const validation = validateBufferExport(csv);

  return {
    csv: validation.passed && validation.hasUtm ? csv : null,
    validation,
    ready: validation.passed && validation.hasUtm
  };
}

if (typeof window !== 'undefined') {
  window.FinalCampaignExport = {
    executeCampaignExport
  };
}

if (typeof module !== 'undefined') {
  module.exports = { executeCampaignExport };
}
