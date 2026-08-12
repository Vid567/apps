/**
 * Campaign Builder action handler
 * Connects the button action to validated export output.
 */

function handleGenerateExport({ controller, campaignInput }) {
  const result = controller.prepareValidatedExport(campaignInput);

  if (!result.ready) {
    return {
      success: false,
      message: result.message,
      validation: result.validation
    };
  }

  return {
    success: true,
    message: result.message,
    csv: result.csv
  };
}

if (typeof window !== 'undefined') {
  window.CampaignBuilderActions = {
    handleGenerateExport
  };
}

if (typeof module !== 'undefined') {
  module.exports = { handleGenerateExport };
}
