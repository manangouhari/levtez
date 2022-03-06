import { OpKind } from "@taquito/taquito";

import constants from "./constants";
import { fetchTezPrice, fetchKUSDPrice } from "./utils";

export async function fetchAllOvensOfAddress(address) {
  const { TZKT_BASE, KOLIBRI } = constants;
  const REQ_URL = `${TZKT_BASE}/contracts/${KOLIBRI.OvenDirectory}/bigmaps/ovenMap/keys?value.eq=${address}`;
  const req = await fetch(REQ_URL);
  const res = await req.json();

  return res.map((o) => o.key);
}

export async function loadOvenData(tezos, oven) {
  const UserOven = await tezos.wallet.at(oven);
  const storage = await UserOven.storage();

  const borrowed = storage.borrowedTokens;
  const isLiquidated = storage.isLiquidated;
  const collateral = await tezos.tz.getBalance(oven);
  const xtzPrice = await fetchTezPrice();
  const kUSDPrice = await fetchKUSDPrice();

  return {
    collateral,
    borrowed,
    isLiquidated,
    usd: {
      tez: xtzPrice,
      kusd: kUSDPrice,
    },
  };
}

export async function estimateKUSDtoTEZ(tezos, kUSDAmount) {
  const kolibriDEX = await tezos.wallet.at(constants.KOLIBRI.QuipuDEX);
  const dexStorage = await kolibriDEX.storage();

  const tokenInWithFee = kUSDAmount.times(997);
  const numerator = tokenInWithFee.times(dexStorage.storage.tez_pool);
  const denominator = dexStorage.storage.token_pool
    .times(1000)
    .plus(tokenInWithFee);

  return numerator.idiv(denominator);
}

export async function executeLeverage(
  tezos,
  targetOven,
  xtzCollateral,
  kusdBorrow,
  teztimate
) {
  console.log("Executing...");
  const transactions = [];
  const oven = await tezos.wallet.at(targetOven);
  const token = await tezos.wallet.at(constants.KOLIBRI.Token);
  const dex = await tezos.wallet.at(constants.KOLIBRI.QuipuDEX);

  console.log("Collateral Add TX");
  transactions.push({
    kind: OpKind.TRANSACTION,
    ...oven.methods
      .default([["unit"]])
      .toTransferParams({ amount: xtzCollateral.toString(), mutez: true }),
  });

  console.log("Borrow kUSD TX");
  transactions.push({
    kind: OpKind.TRANSACTION,
    ...oven.methods.borrow(kusdBorrow.toString()).toTransferParams(),
  });

  console.log("Approve kUSD TX");
  transactions.push({
    kind: OpKind.TRANSACTION,
    ...token.methods
      .approve(constants.KOLIBRI.QuipuDEX, kusdBorrow)
      .toTransferParams(),
  });

  console.log("Convert kUSD to TEZ TX");
  transactions.push({
    kind: OpKind.TRANSACTION,
    ...dex.methods
      .tokenToTezPayment(
        kusdBorrow.toString(),
        teztimate.toString(),
        targetOven
      )
      .toTransferParams(),
  });

  try {
    console.log(transactions);
    console.log("Preparing batch.");
    const batch = tezos.wallet.batch(transactions);
    const op = await batch.send();
    console.log("Operation Sent -- Confirming block.", op.opHash);
    await op.confirmation(1);
    console.log(`Operation Confirmed: ${op.opHash}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
