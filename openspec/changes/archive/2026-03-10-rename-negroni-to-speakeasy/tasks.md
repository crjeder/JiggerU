## 1. Rename theme directory and update theme file

- [x] 1.1 Rename `src/themes/negroni/` directory to `src/themes/speakeasy/`
- [x] 1.2 Update `custom.mixButtonLabel` in `src/themes/speakeasy/theme.js` to `"Shake one!"`

## 2. Update theme registry

- [x] 2.1 Update `src/themes/index.js` — change import from `./negroni/theme` to `./speakeasy/theme` and update the themes object key from `negroni` to `speakeasy`

## 3. Update any string references to "negroni" theme key

- [x] 3.1 Search codebase for string `"negroni"` and update any references (settings defaults, config, HTML) to `"speakeasy"`

## 4. Update tests and snapshots

- [x] 4.1 Run `npm test -- -u` to update snapshots reflecting the renamed theme
- [x] 4.2 Verify all tests pass
