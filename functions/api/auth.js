// auth.js dans le dossier functions/

const OAUTH_DOMAIN = "banana-bread-d4t.pages.dev"; // 🚨 Vérifiez que c'est bien votre domaine !

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const client_id = env.GITHUB_CLIENT_ID;
  const client_secret = env.GITHUB_CLIENT_SECRET;

  const code = url.searchParams.get("code");
  if (!code) {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${url.origin}/api/auth`;
    return Response.redirect(redirectUrl);
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "cloudflare-worker-github-auth",
      accept: "application/json",
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const result = await response.json();

  if (result.error) {
    return new Response(JSON.stringify(result), { status: 401 });
  }

  const token = result.access_token;
  const provider = "github";
  const message = "success";
  const content = JSON.stringify({ provider, token });
  // 4. Construction de la page de réponse (HTML + Script) - Version DEBUG ULTIME
  const script = `
    <!doctype html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Connexion réussie</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; }
        .log { font-size: 12px; color: #555; text-align: left; background: #eee; padding: 10px; border-radius: 5px; margin-top: 20px; max-height: 200px; overflow-y: auto; }
        .btn { background: #d32f2f; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px; margin-top: 10px; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .token-box { margin-top: 10px; padding: 10px; background: #f0f0f0; border: 1px dashed #ccc; font-family: monospace; word-break: break-all; font-size: 11px; }
      </style>
    </head>
    <body>
      <h3>✅ Connexion GitHub Réussie !</h3>
      <p>Tentative de transmission à la page Admin...</p>
      
      <div id="status">Initialisation...</div>
      
      <!-- Bouton de secours -->
      <button class="btn" onclick="window.close()">Fermer cette fenêtre</button>

      <div class="log" id="logs"></div>

      <div class="token-box">
        Token (5 premiers cars): ${token.substring(0, 5)}...<br/>
        (Si bloqué, copiez ce token manuellement si le CMS le permettait)
      </div>

      <script>
        (function() {
          // Injection des données sécurisée
          const content = ${JSON.stringify({ provider, token })};
          const msg = "authorization:${provider}:success:" + JSON.stringify(content);
          const targetOrigin = "https://banana-bread-d4t.pages.dev";

          const logs = document.getElementById('logs');
          const status = document.getElementById('status');
          let count = 0;

          function log(text) {
            logs.innerHTML = "<div>[" + new Date().toLocaleTimeString() + "] " + text + "</div>" + logs.innerHTML;
            console.log(text);
          }

          // 1. Initialisation Handshake (juste au cas où)
          try {
            if (window.opener) {
              window.opener.postMessage("authorizing:${provider}", "*");
              log("Message 'authorizing' envoyé.");
            }
          } catch(e) { log("Erreur Init: " + e.message); }

          if (!window.opener) {
            log("🚨 ERREUR CRITIQUE: window.opener est NULL.");
            status.innerHTML = "<span class='error'>❌ ERREUR: Fenêtre parente introuvable.</span><br/>Avez-vous ouvert ceci dans un nouvel onglet ?";
            return;
          }

          log("✅ Window.opener détecté. Prêt à émettre.");

          function send() {
            count++;
            try {
              // Envoi Strict (Secure)
              window.opener.postMessage(msg, targetOrigin);
              // Envoi Large (Wildcard)
              window.opener.postMessage(msg, "*");
              
              status.innerHTML = "<span class='success'>Signal envoyé (Rafale n°" + count + ")</span><br/>Vérifiez l'onglet Admin...";
            } catch (e) {
              log("❌ Erreur postMessage: " + e.message);
            }
          }

          // Envoi immédiat
          send();

          // Rafale rapide (toutes les 500ms pendant 60s)
          const timer = setInterval(send, 500);

          // Arrêt auto après 60s
          setTimeout(() => {
            clearInterval(timer);
            status.innerHTML += "<br/>Fin des tentatives automatiques.";
            log("Arrêt du timer.");
          }, 60000);
        })()
      </script>
    </body>
    </html>`;

  return new Response(script, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}

