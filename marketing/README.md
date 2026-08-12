# Marketing Automation Hub

Central marketing structure for the Vid567 product portfolio.

## Products

| Product | Prefix | Source repository | Source file | Source language | Source posts |
|---|---|---|---|---|---:|
| DailyCashPlan | DCP | Vid567/dailycashplan | content-creator.html | EN | 50 |
| PantryPlan | PP | Vid567/pantryplan | content-creator.html | EN | 50 |
| AI Stamp Collection Scanner | STAMP | Vid567/ai-stamp-collection-scanner | content-creator.html | EN | 50 |

Total source posts: **150**.

## Stable post IDs

- DailyCashPlan: `DCP-001` through `DCP-050`
- PantryPlan: `PP-001` through `PP-050`
- AI Stamp Collection Scanner: `STAMP-001` through `STAMP-050`

Language variants use the same base ID plus locale, for example:

- `DCP-001-en`
- `DCP-001-nl`
- `DCP-001-de`
- `PP-018-fr`
- `STAMP-027-es`

This keeps translations tied to the same campaign idea instead of treating every translation as a separate post.

## Canonical content model

Each publishable variant should contain:

- `id`
- `base_id`
- `product`
- `language`
- `region`
- `theme`
- `text`
- `cta`
- `destination_url`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `channel`
- `status`
- `planned_at`
- `published_at`
- `notes`

Recommended status values:

`SOURCE`, `TRANSLATION_NEEDED`, `READY`, `SCHEDULED`, `PUBLISHED`, `SKIPPED`, `REVIEW`.

## UTM convention

Use:

`utm_source=threads`

`utm_medium=social`

`utm_campaign=<product>_beta_<language>`

`utm_content=<base-id-lowercase>`

Example:

`?utm_source=threads&utm_medium=social&utm_campaign=pp_beta_de&utm_content=pp-018`

## Automation sequence

1. Read the 150 canonical English source posts from the three existing `content-creator.html` files.
2. Assign the stable IDs above without changing post order.
3. Attach any existing translated posts to the same base ID.
4. Generate only missing translations for supported product languages.
5. Review product terminology and locale-specific CTA/link requirements.
6. Generate UTM URLs automatically.
7. Export rows with status `READY` to the scheduler/publication workflow.
8. After publication, store publication date/status and retain the same base ID for analytics.
9. Use GA4 results to compare product, language and campaign performance.

## Current finding

The three root `content-creator.html` files on `main` are English source libraries. No separate locale-specific `content-creator-*.html` files were found in the inspected repository trees. Existing translations that were posted manually should therefore be imported as translated variants rather than replacing the canonical English source.

## Next integration

Start with a free scheduler for controlled rollout. Publer/Buffer can be used initially. A later phase can replace manual scheduler imports with a Make workflow or direct Threads API publication while keeping this same content model.
