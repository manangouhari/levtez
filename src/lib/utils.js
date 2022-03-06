export async function fetchTezPrice() {
  const resp = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd"
  );
  const data = await resp.json();

  return data.tezos.usd;
}

export async function fetchKUSDPrice() {
  const resp = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=kolibri-usd&vs_currencies=usd"
  );
  const data = await resp.json();

  return data["kolibri-usd"].usd;
}
