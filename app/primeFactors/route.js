const decompose = (number) => {
  const factors = [];
  while (number % 2 === 0) {
    factors.push(2);
    number = number / 2;
  }
  return factors;
};

export async function GET(request) {
  const incoming = /primeFactors\?number=(.*)/.exec(request.url)[1];
  let status = 200;
  let data = {};
  if (isNaN(incoming)) {
    status = 200;
    data = {
      number: incoming,
      error: "not a number",
    };
  } else {
    data = {
      number: Number(incoming),
      decomposition: decompose(incoming),
    };
  }
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
