/**
 * Safe Campaign Runner
 * Blocks exports that do not pass validation.
 */

function runSafeCampaign({ runCampaign, validateBufferExport, input }) {
  const result = runCampaign(input);
  const validation = validateBufferExport(result.csv);

  return {
    ...result,
    validation,
    publishReady: validation.passed && validation.hasUtm
  };
}

if (typeof module !== 'undefined') {
  module.exports = { runSafeCampaign };
}
