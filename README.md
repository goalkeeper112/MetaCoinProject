# MetaCoinProject

## MetaCoin project Dev with TruffleJS + ReactJS

Requirements:
  * nodejs
  * testrpc -> npm install -g ethereumjs-testrpc
  * create-react-app -> npm install -g create-react-app
  * truffleJS -> npm install -g truffle
  
## How to run:
  * testrpc
  * cd MetaCoinTruffle && truffle compile && trufle migrate
  * cd MetaCoinUI && npm start
  ### NOTE: after deploy the MetaCoin contract you must copy the deploy address and put into reactjs code, the line is this:   
  ```javascript
   let MetaCoinAddress = '0x585e9e9aab6e35677ebfbc030d3ee4073307b9b5';
  ```
