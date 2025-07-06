import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { airdrop } from '../airdrop';

export const showBalance = async (publicKey: PublicKey) => {
  const conn = new Connection('http://localhost:8899', 'confirmed');

  const res = await conn.getAccountInfo(publicKey);

  return res.lamports / LAMPORTS_PER_SOL;
};

(async () => {
  const publicKey = '3sXPJophwvX6crRSEoKXXdH6hLRdNKKUazwaXEpuxhLS';

  const balance = await showBalance(new PublicKey(publicKey));
  console.log(`Total wallet balance is ${balance} SOL`);

  await airdrop(publicKey, 2);

  const updatedBalance = await showBalance(new PublicKey(publicKey));
  console.log(`Updated wallet balance is ${updatedBalance} SOL`);
})();
