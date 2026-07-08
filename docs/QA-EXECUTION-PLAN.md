# QA Execution Plan

## Objective
Provide a structured plan for validating the Personal VPN purchase flow across desktop and mobile experiences.

## Scope
- Initial plan selection and server selection
- Checkout transition to the payment page
- Payment method exposure and selection
- Input validation and navigation edge cases
- Mobile responsive behavior

## Recommended execution order
1. Smoke suite on Chromium
2. Regression suite on desktop browsers
3. Mobile profile validation
4. Accessibility and performance smoke runs
5. Artifact review in HTML and Allure reports

## Exit criteria
- All critical smoke tests pass
- Regression and mobile cases pass without flaky failures
- Reports are generated and easy to review
