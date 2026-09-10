# Working on OST with any AI model

This is the canonical handoff document for all coding agents. It is intentionally provider-neutral. Use your available shell, editor, Git and browser tools; no proprietary assistant SDK is required.

## Read first

1. `docs/STATUS.md`: factual completion state and external blockers.
2. `docs/BACKLOG.md`: concrete next tasks and acceptance criteria.
3. `docs/DECISIONS.md`: accepted scope and constraints.
4. `docs/ARCHITECTURE.md`: implementation and data ownership.
5. `docs/OPERATIONS.md`: supplier, sample, newsletter, preorder, payment and publication gates.
6. `docs/PROJECT_BRIEF.md`: the user's complete source brief.

Customer-facing copy is German. Preserve the user's typography and names unless explicitly changed. OST is a culture brand, with no party politics, dictatorship glorification, exclusion or DDR novelty imagery. OSTMANN and OSTFRAU are equal brand worlds, not a hierarchy.

## Development contract

- Shopify Online Store 2.0 custom Liquid theme. Keep CSS and JavaScript small; do not add React/headless/WordPress or a custom checkout.
- Edit `theme/` and `content/`, then regenerate `preview/dist/`; generated HTML is not the source of truth.
- Treat `content/product-master.json` as the source of truth for product status, variants, Shopify/supplier IDs, prices and cost inputs. Never infer missing costs or supplier mappings.
- `npm ci`, `npm run check`, `npm run preview:build`, `npm run test:preview` are the portable baseline.
- Run targeted real Shopify/browser checks for changes involving Liquid resource behavior, forms, carts, theme editor or apps. Local LiquidJS previews are not proof of Shopify runtime correctness.
- Keep the 360–430px mobile layout usable. Test keyboard focus, native links without JavaScript, reduced motion and image loading.
- Use one working branch per agent, based on `develop`. Integrate features into `develop`, then promote tested states to `main`. Read Git status before modifying. Do not overwrite another agent's work or force-push.
- Record changed behavior, tests actually run and remaining blockers in `docs/STATUS.md` at handoff. Do not claim a test ran when only code inspection occurred.

## Shop state and access

The shop is `ajfwfu-ih.myshopify.com`. The development target is theme `205894418769`, unpublished. The current live theme is `205871546705`. Horizon `205868663121` is unpublished. Treat `config/store.json` as a snapshot; verify roles before any upload.

- Do not edit/publish the live theme without explicit user authorization and a tested preview.
- `npm run theme:push` is the intended guarded uploader; it refuses a live or missing target.
- Do not create a second shop, theme, product catalog or set of metaobjects merely because a new model lacks credentials.
- Authenticate through Shopify CLI on the current machine. Never read/export credentials from another application or commit credentials.
- Inspect `config/shopify-resources.json` and the current remote state before any create/update operation. It contains nonsecret IDs of the objects created for this project.
- Store mutations are external side effects. Scope operations to OST resources, inspect errors and verify results. Existing `/pages/contact` is unrelated default content and must be preserved.
- Products are DRAFT with tracked inventory zero and inventory policy DENY. Theme UI gates do not prevent direct cart/checkout API use; do not rely on hidden buttons as stock control.

## Release gates

- Names remain pending professional trademark clearance. Keep names and collection links centrally editable.
- Company details are permitted placeholders, visibly described as under construction. Do not invent legal identities, addresses or contact details.
- `newsletter_ready` stays false until sender, privacy information and actual Shopify double opt-in are configured and tested. A local preview must not claim to collect real leads.
- `commerce_ready` stays false until samples, prices, tax/shipping, legal documents and checkout checks are complete.
- Preorder uses a Shopify purchase-option app through `@app` blocks. Never replace it with an ordinary add-to-cart button labeled preorder. A flag alone does not implement preorders.
- No money, subscriptions, sample orders or external outreach have been authorized by a concrete budget/recipient. Prepare these but obtain missing business inputs before committing them.
- No analytics pixels are installed in the theme. Use Shopify's consent/customer privacy integration before enabling nonessential tracking.
- Real archive/voice entries require approved rights and content. Do not create fake testimonials or use celebrity portraits from search.
- Internal rights data belongs in `ost_rights_record` with `storefront: NONE`, not in publicly readable editorial metaobjects. Private data hidden by a Liquid condition is still not private at the API layer.

## Files that must remain private

Never commit `.env`, tokens, cookies, browser profiles, customer emails, legal identity documents, private licensing contracts or raw authenticated command output. `work/` is ignored. Sanitized reports and public-safe resource IDs are appropriate for sharing.

## Good handoff

State the exact branch/commit, changed files, successful tests, failed/unrun tests, Shopify theme/resource changes and the next concrete task. Keep `docs/STATUS.md`, `docs/BACKLOG.md` and `docs/CHANGELOG.md` consistent. Do not leave important knowledge only in chat.
