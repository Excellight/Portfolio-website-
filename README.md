# Excellence Odimegwu — Portfolio

A lightweight static portfolio with a simple local FAQ assistant called Litex.

## Run locally
Open `index.html` in a browser.

## Publish with GitHub Pages
1. Create a new public GitHub repository (for example, `excellence-portfolio`).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then save.
6. Wait for GitHub Pages to publish the site. Your URL will look like `https://YOUR-USERNAME.github.io/excellence-portfolio/`.

## Before publishing
- Replace the email, LinkedIn and GitHub links in `index.html`.
- Replace the generic GitHub profile link on the Student Management project card with the exact repository URL once you decide to publish that project.
- Check project descriptions and remove anything you do not want public.

Litex currently uses a small JavaScript FAQ knowledge base in `script.js`. It is not connected to a live AI model yet. To connect Gemini or another model safely, add a backend/serverless endpoint; never put a private API key in browser JavaScript or a public GitHub repository.
