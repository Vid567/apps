# DailyCashPlan EN campaign validation

## Pipeline checked

- Content source
- Campaign selection
- Batch creation
- Buffer CSV generation
- UTM tracking preparation

## Test campaign

- Campaign: dcp_en_beta
- Product: DailyCashPlan
- Language: EN
- Batch size: 10

## Expected output

CSV columns:

- Post ID
- Product
- Language
- Campaign
- Text
- Posting Time
- Status
- UTM URL

## Next validation step

Run the generator in the target environment and verify:

1. CSV opens correctly.
2. UTM parameters appear correctly.
3. GA4 receives campaign traffic.
4. Clarity recordings can be filtered by campaign.
