const ANSWER_TEXT = atob(atob('ZDJWc1kyOXRaU0JyYVdsamFHa2dhR0Z5ZFd0cA=='));

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}

async function handleRequest(request: Request) {
  if (request.method === 'POST') {
    const t = await request.text();
    let result;

    const acrh = request.headers.get("Access-Control-Request-Headers");

    const respHeaders: HeadersInit = acrh ? {
      "Access-Control-Allow-Headers": acrh,
      ...corsHeaders,
    } : corsHeaders;

    try {
      result = JSON.parse(t)
    } catch (e) {
      return new Response(
        JSON.stringify({
          message: null,
          err: e.message,
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json; charset=utf-8",
            ...respHeaders
          },
        },
      );
    }

    if (result && result.token && result.token === ANSWER_TEXT) {
      return new Response(
        JSON.stringify({
          message: 'ENJOY YOUR LIFE.',
          err: null,
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            ...respHeaders
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: null,
        err: 'invalid token.',
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json; charset=utf-8",
          ...respHeaders
        },
      },
    );
  }

  return new Response(
    `<h1>say hello!</h1>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});