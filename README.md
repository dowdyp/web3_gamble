# web3_gamble
Blockchain Technologies final project

## Introduction

Online gambling nowadays relies heavily on users trusting the centralized entity. However, these platforms are far from open source and can very easily take advantage of customers. Even a slight increase in house edge can be unnoticeable to a trained eye, but make the world a difference in user RTP and gross profit. This project aims to be a proof-of-concept for on-chain gambling, all handled at execution time with no cron tasks.

## Features
 - On-chain bet placing
 - Multiple testing accounts

## Getting Started
### Initialization
 - make sure to run `npm i` in both the root directory and `/web3ui/`
 - by default truffle is looking for ganache running at `localhost:7545`, this can be changed in `/contract/truffle-config.js`

### Copy and pasting
 - launch ganache in quickstart mode, you should get like 10 or so accounts
 - copy and paste at least *5* of those accounts into `/web3ui/src/config.js` under the userAccounts array
 - copy an address that you didn't use into the `defaultAccount` field, this will be the deployer address
 
### Deploying the contract
 - navigate to the `contract` folder in the root directory
 - run `truffle migrate` to deploy, note that you can also run `truffle migrate --reset` to overwrite previous deployments
 - open `truffle console` within your `vscode console` or other weapon of choice
 - get your deployment address by running `Roulette.address`

### More copy and pasting
 - replace `rouletteAddress` in the original config file with this new one acquired from truffle
 - that's all the copy and pasting
 
### Finishing touches
 - the contract is deployed, all the local addresses are set up
 - run `npm start` from the `/web3ui/`, and you should be greeted by a snazzy little react dapp

## Demo video
[Demo](https://youtu.be/suQeloH_Zys)
