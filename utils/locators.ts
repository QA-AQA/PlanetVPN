export const locators = {
  pricing: {
    planOption: 'form#PPG label.ppg__label.radio',
    planLabel: 'form#PPG p',
    emailInput: 'form#PPG input[name="email"]',
    submitButton: 'form#PPG button[type="submit"]',
  },
  server: {
    selector: 'form#PPG label.ppg__label.select',
    option: 'form#PPG li[data-id]',
  },
  payment: {
    heading: 'form#PPG h2',
    termsLink: '#qa-link-terms',
    refundLink: '#qa-link-refund',
  },
};
