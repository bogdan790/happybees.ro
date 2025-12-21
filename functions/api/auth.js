/**
 * Cloudflare Pages Function - GitHub OAuth Initiator
 * Redirects to GitHub for authorization
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const clientId = env.OAUTH_CLIENT_ID;
  const redirectUri = `${url.origin}/api/auth/callback`;

  // Redirect to GitHub OAuth
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.set('scope', 'repo,user');

  return Response.redirect(githubAuthUrl.toString(), 302);
}
