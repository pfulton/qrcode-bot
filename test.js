const { postQRCode } = require('./');

postQRCode({
  payload: {
    deployment: {
      environment: "qwe-4",
      payload: {
        web_url: "http://test.com/test-4"
      }
    }
  },
  issue: () => {}
});
