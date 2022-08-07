# web3_gamble
Blockchain Technologies final project

# setup
### initialization
 - make sure to run `npm i` in both the root directory and `/web3ui/`
 - by default truffle is looking for ganache running at `localhost:7545`, this can be changed in `/contract/truffle-config.js`

### copy and pasting
 - launch ganache in quickstart mode, you should get like 10 or so accounts
 - copy and paste at least *5* of those accounts into `/web3ui/src/config.js` under the userAccounts array
 - copy an address that you didn't use into the `defaultAccount` field, this will be the deployer address
 
### deploying the contract
 - navigate to the `contract` folder in the root directory
 - run `truffle migrate` to deploy, note that you can also run `truffle migrate --reset` to overwrite previous deployments
 - open `truffle console` within your `vscode console` or other weapon of choice
 - get your deployment address by running `Roulette.address`

### more copy and pasting
 - replace `rouletteAddress` in the original config file with this new one acquired from truffle
 - that's all the copy and pasting
 
### finishing touches
 - the contract is deployed, all the local addresses are set up
 - run `npm start` from the `/web3ui/`, and you should be greeted by a snazzy little react dapp

feel free to reach out to me with questions, comments, concerns, and/or nice places in Boston to eat lunch. cheers
 
 
