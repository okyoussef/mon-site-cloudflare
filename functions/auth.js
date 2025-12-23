// auth.js dans le dossier functions/

// Fonctionnalités de base pour le Worker d'authentification GitHub
// Ce code gère l'échange de jeton entre GitHub et le CMS.

// Remplacez 'votredomaine' par 'banana-bread-d4t.pages.dev'
const OAUTH_DOMAIN = "banana-bread-d4t.pages.dev";

export async function onRequest(context) {
  const GITHUB_CLIENT_ID = context.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = context.env.GITHUB_CLIENT_SECRET;

  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    // Redirige vers GitHub pour la connexion initiale
    const redirect_uri = `https://${OAUTH_DOMAIN}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user&state=${state}&redirect_uri=${redirect_uri}`;
    return Response.redirect(githubAuthUrl, 302);
  }

  // Échange du code contre un jeton d'accès GitHub
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
      state: state
    })
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return new Response("Erreur d'authentification GitHub", { status: 401 });
  }

  // Le CMS attend ce jeton pour finaliser la connexion
  const responseBody = {
    token: accessToken,
    provider: 'github'
  };

  // La réponse doit être envoyée à Decap CMS pour finaliser la connexion
  return new Response(
    `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Authentification</title>
    </head>
    <body>
      <script>
        (function() {
          function recieveMessage(e) {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(responseBody)}',
              e.origin
            );
            window.removeEventListener('message', recieveMessage, false);
          }
          window.addEventListener('message', recieveMessage, false);
          window.opener.postMessage('authorizing:github', '*');
        })()
      </script>
    </body>
    </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html'
      }
    }
  );
}