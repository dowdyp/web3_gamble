const Roulette = artifacts.require("./Roulette.sol");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(Roulette, {gas: 6700000});
}