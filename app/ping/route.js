export async function GET(request) {
  const data = { pong: "hi there!" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
