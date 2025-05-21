import { getDocks } from "../../../db/queries/getDocks.js";

export async function GET() {
  const docks = await getDocks();
  const dock = docks.find((dock) => dock.gate_number === 1);
  const data = { ship: dock.ship_name };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
