# Build your First Decentralized Application (DApp) Tutorial

A quick tutorial to get your first DApp up and running without any frameworks!

By Ben Stewart <br/>
Last Updated:2/18/2018 <br/>

Install Dependencies:
1. ganache-cli ```npm install ganache-cli web3@0.20.2```
2. solc ```npm install solc```

Directions:
1. Git Clone this repository
2. Run ganache-cli ```node_modules/.bin/ganace-cli```
3. Open up Nodejs console ```node```
4. Compile the contract
  ```
  code = fs.readFileSync('Voting.sol').toString()
  solc = require('solc')
  compiledCode = solc.compile(code)
  ```

5. Deploy the contract
  ```
  abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
  VotingContract = web3.eth.contract(abiDefinition)
  byteCode = compiledCode.contracts[':voting'].bytecode
  deployedContract = VotingContract.new(['Bill','Tom','Janice'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
  contractInstance = VotingContract.at(deployedContract.address)
  ```



Interacting with contract through nodejs console
```
> contractInstance.totalVotesFor.call('Bill')
Output: { [String: '0'] s: 1, e: 0, c: [ 0 ] }

> contractInstance.voteForCandidate('Tom', {from: web3.eth.accounts[0]})
Output: '0xdedc7ae544c3dde74ab5a0b07422c5a51b5240603d31074f5b75c0ebc786bf53'

> contractInstance.voteForCandidate('Janice', {from: web3.eth.accounts[0]})
Output: '0x02c054d238038d68b65d55770fabfca592a5cf6590229ab91bbe7cd72da46de9'

> contractInstance.voteForCandidate('Janice', {from: web3.eth.accounts[0]})
Output:  '0x3da069a09577514f2baaa11bc3015a16edf26aad28dffbcd126bde2e71f2b76f'

> contractInstance.totalVotesFor.call('Bill').toLocaleString()
Output: '3'
```

Interacting with contract via front GUI
1. Update the contract instance address in index.js
  * Can run command ```contractInstance.address``` to find address
2. Open index.html in your browser
