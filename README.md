# NthCase CI demo

A one-page shop, deployed to GitHub Pages on every push to `main`, then tested by an NthCase scenario.
The pipeline goes red when the scenario fails: `nth trigger --wait` exits 1 on a failed run.

- `site/` — the shop (Desk Lamp, Add to cart).
- `.github/workflows/deploy-and-test.yml` — deploy, wait for the commit to be live, run the scenario.

Secret: `NTH_API_KEY` (an NthCase workspace API key, Settings → API keys).
