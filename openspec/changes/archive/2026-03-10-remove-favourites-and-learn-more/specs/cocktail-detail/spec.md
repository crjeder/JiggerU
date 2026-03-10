## REMOVED Requirements

### Requirement: User can favourite a cocktail

**Reason**: The favourite feature was never surfaced in any filter or view, making it invisible and unused. Removing it reduces bundle size and eliminates dead Redux code.
**Migration**: No migration. The `favourites` localStorage key will be orphaned and silently ignored.

### Requirement: Learn more button navigates to cocktail detail

**Reason**: The "Learn more" button duplicates the card-click navigation, adding UI noise without user value.
**Migration**: Users click the card to open the cocktail detail page, as before.
