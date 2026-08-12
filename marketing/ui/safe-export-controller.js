/**
 * Safe export controller for Campaign Builder UI
 */

function prepareValidatedExport({ runSafeCampaign, input }) {
  const result = runSafeCampaign(input);

  return {
    ready: result.publishReady,
    message: result.publishReady
      ? 'Export validated and ready for Buffer.'
      : 'Export blocked. Validation required.',
    csv: result.publishReady ? result.csv : null,
    validation: result.validation
  };
}

if (typeof window !== 'undefined') {
  window.SafeExportController = {
    prepareValidatedExport
  };
}

if (typeof module !== 'undefined') {
  module.exports = { prepareValidatedExport };
}
