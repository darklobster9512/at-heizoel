<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Austrian municipality and postal-code data in the static GeoNames-derived `cities.json` and derive regional pages/sitemaps from it; this avoids invented place metadata.
- Keep the existing panel order endpoint/branding ID and legacy order-draft keys until migration is coordinated; preserving checkout continuity prevents lost orders.
- Keep Klarna payment choices in source but hidden until the external plugin reliably completes payment; avoid exposing a broken payment path.
