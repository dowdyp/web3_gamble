// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Roulette {

    struct Game {
        uint id;
        address winner;
        uint pot;
        address[] ppl;
        uint[] bets;
        uint pplCounter;
        mapping(uint => address) userPickedNums;
        mapping(address => bool) hasBet;
    }

    Game[] games;
    address owner;
    uint gameCount;
    mapping(uint => address) public winners;
    mapping(address => uint) accountsBal;

    function currentGame() private view returns (Game storage) {
        return games[games.length - 1];
    }

    modifier notOwner {
        require(msg.sender != owner, "contract owner cannot bet");
        _;
    }

    constructor() {
        owner = msg.sender;
        Game storage s = games.push();
        s.pplCounter = 0;
        s.pot = 0;
        s.id = games.length - 1;
        gameCount = 0;
    }

    function freshGame() private {
        Game storage s = games.push();
        s.id = games.length;
        s.pot = 0;
        s.winner = address(0);
        s.pplCounter = 0;
    }

    function createNewGame() private {
        Game storage g = currentGame();
        winners[games.length] = g.ppl[0]; //modify for actual random winner
        uint takehome = g.pot / 1000 * 950;
        accountsBal[msg.sender] += takehome;
        winners[currentGame().id] = currentGame().ppl[0];
        // pay winner etc
        freshGame();
        gameCount += 1;
    }


    function withdraw(address payable _to) public payable {
        require(msg.sender == _to, "must withdraw from your own account");
        (bool sent, ) = _to.call{value: accountsBal[msg.sender]}("");
        require(sent, "failed to withdraw");
        accountsBal[msg.sender] = 0;
    }

    function bet(uint i) public payable notOwner returns (uint) {
        require(i <= 10, "bets must be between 1 and 10 inclusively");
        require(i > 0, "bets must be between 1 and 10 inclusively");
        require(msg.value >= 50000, "minimum bet is 50000 WEI");
        Game storage curr = currentGame();
        require(curr.userPickedNums[i] == address(0), "this number has already been bet on");
        require(!curr.hasBet[msg.sender], "you have already placed a bet");
        curr.userPickedNums[i] = msg.sender;
        curr.hasBet[msg.sender] = true;
        curr.ppl.push(msg.sender);
        curr.bets.push(msg.value);
        curr.pot = curr.pot + msg.value;
        curr.pplCounter = curr.pplCounter + 1;
        if (curr.ppl.length == 5) {
            createNewGame();
        }
        return curr.pot;
    }

    function getGamesLen() public view returns (uint) {
        return games.length;
    }

    function getCurrentGamePot() public view returns (uint) {
        return currentGame().pot;
    }
    
    function getWinner(uint i) public view returns (address) {
        require(i > games.length, "nope");
        return winners[i];
    }

    function getHistory() public view returns (address[] memory) {
        address[] memory a = new address[](gameCount);
        for(uint i = 0; i < gameCount; i++) {
            a[i] = winners[i];
        }
        return a;
    }

    function getCurrentGameBetters() public view returns(address[] memory, uint[] memory) {
        return (currentGame().ppl, currentGame().bets);
    }
}