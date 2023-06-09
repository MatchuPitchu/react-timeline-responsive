# NPM Package Publish

- style injection of `styles.css` with JavaScript: `vite-plugin-css-injected-by-js` <https://www.npmjs.com/package/vite-plugin-css-injected-by-js?activeTab=readme>
- build package: `npm run build:package`
- only dist folder is published (-> `files` in `package.json`): `npm publish`

## Articles about Publishing React Components

- `package.json` config: <https://docs.npmjs.com/cli/v9/configuring-npm/package-json>
  - `files`: Certain files are always included, regardless of settings: `package.json`, `README`, `LICENSE`, file in the `main` field
- Injection CSS into React Component Library: <https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe#adding-css>
- React Component Library with Vite and Deploy in NPM: <https://articles.wesionary.team/react-component-library-with-vite-and-deploy-in-npm-579c2880d6ff>
- Creating a TypeScript Package with Vite: <https://onderonur.netlify.app/blog/creating-a-typescript-library-with-vite>
- Publishing a React component to npm using Vite: <https://tomsouthall.com/blog/publishing-react-component-using-vite>
- Codecov Code Coverage Reporting: <https://about.codecov.io/blog/measuring-typescript-code-coverage-with-jest-and-github-actions/>
