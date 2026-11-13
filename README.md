# Litex — Excellence's Interactive Universe

A static, immersive 3D portfolio starter built with Three.js and vanilla JavaScript. It is designed for GitHub Pages.

## Run locally

Because this project uses JavaScript modules, open it through a local web server rather than double-clicking `index.html`.

With Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository named `excellence-portfolio`.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site.

## Before sharing publicly

- Add your professional email and LinkedIn URL.
- Add verified repository/demo links to the project destinations in `app.js` (the `link` values in the `worlds` array).
- Review all project descriptions and update any details that have changed.
- Litex is currently a local FAQ prototype with curated answers. It is not connected to Gemini or another live AI model. Never put a private API key in `app.js` or any frontend file. A real AI connection needs a secure backend.

## Notes

Three.js is loaded from jsDelivr and Google Fonts are loaded from Google Fonts, so those visual assets require an internet connection. The site itself is static and can be hosted on GitHub Pages.
