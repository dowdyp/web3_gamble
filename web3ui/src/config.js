import Web3 from "web3/dist/web3.min";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

let rouletteABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"bet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function","payable":true},{"inputs":[],"name":"getGamesLen","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getCurrentGamePot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getHistory","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getCurrentGameBetters","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function","constant":true}];
let defaultAccount = "0xB35Cab58c15d7861555D3c678Aa434625D2EeB53"
let rouletteAddress = '0x8Dc6Ad6c6a41833De5E610ae0b60980a7EDf5F1f'

let userAccounts = ["0xDfe3Ec4EfAF7De8e5388581aD4eB72585CC2a3d5",
                    "0xe3D8612827e9253b7FBAFBC07858CB41b6B1d45c",
                    "0x6187e55596b834228fE3E8f1665530Ac36374075",
                    "0xB5a8469b6811150a874EF97868e0E510f9314928",
                    "0xa0e9D49a3E240D33Bb1e2aA23cD36b72370579A7"]

const rouletteContract = new web3.eth.Contract(rouletteABI, rouletteAddress);

export { web3, rouletteContract, defaultAccount, userAccounts };
