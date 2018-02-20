// version of compiler this code will compile with
pragma solidity ^0.4.18;

contract voting {

  mapping (bytes32 => uint8) public votesReceived;

  /* Solidity doesn't let you pass in an array of strings in the constructor.
  Using an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public candidateList;

  //This is the constructor and is called once you deploy the contract
  function voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  // Returns the total votes a candidate has received
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // Increments the vote count for the specified candidate
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}
