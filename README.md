# PlanetVPN E2E Automation Project

This repository contains a modern Playwright + TypeScript E2E automation suite for the Planet VPN Personal purchase journey. It has been built with senior-level QA engineering practices in mind: robust POM, resilient selectors, edge-case coverage, mobile viewport checks, Allure metadata, and CI-ready configuration.

## Highlights
- POM-based architecture with reusable page objects and components
- Flow layer for business-level journeys such as checkout and purchase
- Centralized locator layer for easier maintenance and lower test fragility
- Data-driven regression matrix for plans and flows
- Smoke, regression, edge, accessibility, performance, and mobile suites
- Allure reporting with test IDs, stories, severity, and tags
- HTML report and CI workflow with browser matrix
- Docker support for repeatable execution

## Installation

```bash
npm install
npx playwright install --with-deps chromium firefox webkit
```

## Running tests

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:headed
npm run test:report
npm run allure:generate
npm run allure:open
npx playwright test --project=mobile-chromium
```

## Project structure

- tests/smoke — critical purchase flow and edge-case scenarios
- tests/regression — broader functional and payment coverage
- tests/mobile — mobile viewport checks
- tests/accessibility — accessibility smoke tests
- tests/performance — performance smoke checks
- pages — page objects and components
- fixtures — shared Playwright fixtures
- docs — UX analysis and QA documentation

## Coverage overview
- Plan selection for 2 days, 1 month, and 1 year
- Server location changes before checkout
- Payment method exposure for the currently available methods
- Browser back/forward navigation
- Invalid email and other edge conditions
- Mobile layout checks on a Pixel 5 viewport
- Accessibility and performance smoke checks

## CI/CD
GitHub Actions runs smoke tests on pull requests and regression suites on pushes to main with matrix testing across Chromium, Firefox, WebKit, and a mobile profile.
