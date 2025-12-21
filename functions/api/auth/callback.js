/**
 * Cloudflare Pages Function - GitHub OAuth Callback
 * Handles OAuth flow for Decap CMS authentication
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get OAuth code from GitHub
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code: code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`OAuth error: ${tokenData.error_description}`, { status: 400 });
  }

  // Return HTML that posts token back to Decap CMS
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
</head>
<body>
  <script>
    (function() {
      const tokenData = ${JSON.stringify(tokenData)};
      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        window.opener.postMessage(
          "authorization:github:success:" + JSON.stringify(tokenData),
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      console.log("Posting message to opener");
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
  <p>Authorizing... You can close this window.</p>
</body>
</html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
