# Testing Patterns

**Analysis Date:** 2026-03-25

## Test Framework

**Runner:** None configured.

No testing framework is installed or configured in this project. There is no `jest.config.*`, `vitest.config.*`, or similar file. The `package.json` contains only a `build` script (`hugo --minify`) with no `test` script.

```json
{
  "scripts": {
    "build": "hugo --minify"
  }
}
```

**Run Commands:**
```bash
# No test commands available
hugo --minify     # Build only
```

## Test File Organization

**Test files:** None found. No `*.test.*` or `*.spec.*` files exist anywhere in the project.

## What Exists Instead of Automated Tests

**Manual validation patterns** are built into the production code itself:

**Input validation in `functions/api/contact.js`:**
- Email format via regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Required field presence checks
- Gibberish detection via vowel ratio analysis (15–70% vowels expected)
- Consecutive consonant detection: `/[bcdfghjklmnpqrstvwxyz]{4,}/i`
- Multi-word message requirement (must contain spaces)

**Client-side validation in `static/js/contact.js`:**
- Mirrors server-side required field checks
- Same email regex applied before API call
- Turnstile token presence check

**Anti-spam logic is the closest thing to testable logic units** — `isGibberish()`, `isValidName()`, and `isValidMessage()` in `functions/api/contact.js` are pure functions that could be unit tested without mocking.

## Coverage

**Requirements:** None enforced.
**Current coverage:** 0% automated.

## Test Types

**Unit Tests:** Not used.

**Integration Tests:** Not used.

**E2E Tests:** Not used.

**Manual testing approach:**
- Hugo build (`hugo --minify`) serves as a "compile check" — template errors surface at build time
- Cloudflare Pages preview deployments serve as integration smoke tests
- Contact form manually tested against live Cloudflare Pages Function endpoint

## Adding Tests (Guidance for Future Work)

If tests are introduced, the natural starting point is the Cloudflare Function:

**`functions/api/contact.js` exports pure helper functions** that are candidates for unit testing without mocking:
- `isGibberish(text)` — returns boolean
- `isValidName(name)` — returns boolean
- `isValidMessage(message)` — returns boolean

These are not currently exported — they would need to be exported or the test file co-located.

**Recommended framework** (if added): Vitest — compatible with the `"type": "module"` package setting and works without complex bundler config.

**Recommended config location:** `vitest.config.js` at project root.

**Recommended test file location:** Co-located with source — `functions/api/contact.test.js`.

**Example test structure if Vitest were adopted:**
```javascript
import { describe, it, expect } from 'vitest';
// Would require exporting helpers from contact.js

describe('isGibberish', () => {
  it('returns false for normal Romanian text', () => {
    expect(isGibberish('miere')).toBe(false);
  });

  it('returns true for consonant-heavy strings', () => {
    expect(isGibberish('qwrtpsdf')).toBe(true);
  });
});
```

**Hugo template rendering** cannot be unit tested with JavaScript tooling — Hugo's template engine requires the `hugo` CLI. Template correctness is validated at build time only.

---

*Testing analysis: 2026-03-25*
