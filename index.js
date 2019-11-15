const QRCode = require('qrcode');
const { upload } = require('./upload');

// Deployments API example
// See: https://developer.github.com/v3/repos/deployments/ to learn more

function postQRCode(context) {
  const deploymentURL = context.payload.deployment.payload.web_url;
  const environmentID = context.payload.deployment.environment.split("-").pop();
  QRCode.toString(deploymentURL, { type: 'svg' }, async function(err, image) {
    if (err) console.log(`error: ${err}`);
    const uploadedFileName = await upload(image);
    const markdownImg = `<img src="${process.env.AWS_URL}${uploadedFileName}" height="200" width="200" alt="QRCode"/>`;
    const params = context.issue({ body: markdownImg });
    params.number = environmentID;
    context.github.issues.createComment(params);
  });
}

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(['deployment', 'deployment_status'], async context => {
    postQRCode(context);
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

module.exports.postQRCode = postQRCode;
