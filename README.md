## How to use

- [] `yarn install`
- [] create `.env` file with variables:

```
MNEMONIC=your mnemonic phrase
RPC_URL=DESIRED_NETWORK_RPC_URL

```

- [] `yarn start` to start server or
- [] `yarn dev` to start dev server with files refresh
- [] `yarn build` to build js files in `/lib` dir

## Auto redeem time bonds!
1) Add wallet you wish to redeem to `.env` variable:

```
REDEEM_ADDRESS=0x_wallet_with_bonds
```

2) Uncomment `autoRedeem();` line in `src/index.ts`