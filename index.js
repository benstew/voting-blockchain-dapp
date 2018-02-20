
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = ScoringContract.at('0x8673fb2ae00895efd903c489b18231b1365b8b39');
teams = {"Los Angeles Lakers": "team-1", "New York Knicks": "team-2"}

function pointForTeam() {
  candidateName = $("#team").val();
  contractInstance.pointForTeam(teamName, {from: web3.eth.accounts[0]}, function() {
    let div_id = teams[teamName];
    $("#" + div_id).html(contractInstance.totalPointsFor.call(teamName).toString());
  });
}

$(document).ready(function() {
  teamNames = Object.keys(team);
  for (var i = 0; i < teamNames.length; i++) {
    let name = teamNames[i];
    let val = contractInstance.totalPointsFor.call(name).toString()
    $("#" + teams[name]).html(val);
  }
});
