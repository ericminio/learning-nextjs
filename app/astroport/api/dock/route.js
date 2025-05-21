import { saveDock } from "../../../db/commands/saveDock.js";

export async function POST(request) {
  const { ship } = await request.json();
  await saveDock(ship, 1);
  return new Response("kept", {
    status: 201,
  });
}
