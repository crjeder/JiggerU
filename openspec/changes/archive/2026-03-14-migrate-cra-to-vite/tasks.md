## 1. Install Dependencies

- [x] 1.1 Remove `react-scripts` from `package.json` devDependencies
- [x] 1.2 Add `vite` and `@vitejs/plugin-react` to devDependencies
- [x] 1.3 Add `vitest`, `@vitest/coverage-v8`, `jsdom`, and `@testing-library/jest-dom` to devDependencies
- [x] 1.4 Run `npm install` and confirm no peer dependency errors

## 2. Vite Configuration

- [x] 2.1 Create `vite.config.js` at the project root with `@vitejs/plugin-react`, `build.outDir: 'build'`, and `publicDir: 'public'`
- [x] 2.2 Add Vitest configuration to `vite.config.js` (or a separate `vitest.config.js`) with `environment: 'jsdom'` and `globals: true`
- [x] 2.3 Add `setupFilesAfterFramework` pointing to a test setup file that imports `@testing-library/jest-dom`

## 3. Entry Point Migration

- [x] 3.1 Copy `public/index.html` to the project root
- [x] 3.2 Remove `%PUBLIC_URL%` placeholders from `index.html` (replace with `/`)
- [x] 3.3 Add `<script type="module" src="/src/index.js"></script>` to the root `index.html`
- [x] 3.4 Remove the now-redundant `public/index.html` (keep other files in `public/` as static assets)

## 4. Package.json Cleanup

- [x] 4.1 Update `scripts.start` to `vite`
- [x] 4.2 Update `scripts.build` to `vite build`
- [x] 4.3 Update `scripts.test` to `vitest`
- [x] 4.4 Remove the `eslintConfig` block (or replace with a standalone `.eslintrc.json` if linting is needed)
- [x] 4.5 Remove the `browserslist` field

## 5. Verification

- [x] 5.1 Run `npm test` — confirm all existing `*.spec.js` tests pass
- [x] 5.2 Run `npm test -- -u` — re-baseline snapshots and confirm no unexpected diffs
- [x] 5.3 Run `npm run build` — confirm `build/` is produced with no errors
- [ ] 5.4 Run `npm start` — confirm dev server starts and app loads in browser (manual)
- [ ] 5.5 Verify Husky pre-commit hook still runs `pretty-quick` on a test commit (manual)
