it ('should have obtain a valid GA key', () => {
  const {googleTrackingId} = require('../secrets.js');

  expect(googleTrackingId).toBeTruthy();
  expect(googleTrackingId).toMatch(/^UA-/);
});
