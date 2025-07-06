import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { airdrop } from '../airdrop';
import { showBalance } from '../show-balance';

export const transferSol = async (
  from: Keypair,
  to: PublicKey,
  amount: number
) => {
  const conn = new Connection('http://localhost:8899', 'confirmed');
  const transaction = new Transaction();

  const instruction = SystemProgram.transfer({
    //to transfer SOL and interact with the contracts
    fromPubkey: from.publicKey,
    toPubkey: to,
    lamports: amount * LAMPORTS_PER_SOL,
  });

  transaction.add(instruction);

  await sendAndConfirmTransaction(conn, transaction, [from]);

  console.log(`Transferred ${amount} SOL from ${from.publicKey} to ${to}`);
};

//another wallet
const secret = Uint8Array.from([
  191, 211, 98, 31, 41, 75, 45, 5, 218, 5, 203, 17, 166, 93, 33, 147, 110, 158,
  112, 199, 135, 79, 131, 233, 11, 165, 83, 8, 195, 129, 212, 220, 113, 69, 190,
  133, 108, 210, 62, 182, 158, 211, 104, 218, 24, 231, 254, 168, 170, 147, 51,
  134, 244, 216, 59, 22, 52, 160, 215, 181, 32, 251, 129, 35,
]);

const fromKeyPair = Keypair.fromSecretKey(secret);
const toPublicKey = new PublicKey(
  '3sXPJophwvX6crRSEoKXXdH6hLRdNKKUazwaXEpuxhLS'
);

(async () => {
  await airdrop(fromKeyPair.publicKey, 4);

  console.log(
    `Initial balance of from wallet: ${await showBalance(
      fromKeyPair.publicKey
    )}`
  );
  console.log(
    `Initial balance of to wallet: ${await showBalance(toPublicKey)}`
  );

  await transferSol(fromKeyPair, toPublicKey, 2);

  console.log(
    `Post balance of from wallet: ${await showBalance(fromKeyPair.publicKey)}`
  );
  console.log(`Post balance of to wallet: ${await showBalance(toPublicKey)}`);
})();
