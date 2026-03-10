## Why

The "Negroni" theme name is misleading — a Negroni is a red/orange cocktail, but the theme uses warm amber, dark wood, and candlelight tones that evoke a Prohibition-era speakeasy. Renaming it to "Speakeasy" improves the semantic fit and removes potential confusion with the cocktail of that name in the browser.

## What Changes

- Rename the `negroni` theme to `speakeasy` (directory, key, display name)
- Update the mix button label for the Speakeasy theme from `"Mix it!"` to `"Shake one!"`

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `curated-themes`: The set of available themes changes — `negroni` is replaced by `speakeasy`, with an updated mix button label.

## Impact

- `src/themes/negroni/` directory renamed to `src/themes/speakeasy/`
- `src/themes/index.js` — import and theme key updated
- Theme `custom.mixButtonLabel` value updated to `"Shake one!"`
- Any component or settings UI that references the theme name `"negroni"` by string will need updating
- Snapshot tests will need updating
