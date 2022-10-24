// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
require("dotenv").config();
const ETHERSCAN_KEY = process.env.ETHERSCAN_API;



const { ethers ,run,network} = require("hardhat");
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );
  console.log("部署合约");
  const simple_storage = await SimpleStorageFactory.deploy();
  await simple_storage.deployed();

  console.log(`合约地址 ${simple_storage.address}`)

  console.log(network.config)
  if (network.config.chainId==5 && process.env.ETHERSCAN_KEY){

    await simple_storage.deployTransaction.wait(6)
    await verify(simple_storage.address,[])

  }
  const currentValue =await simple_storage.retrieve()

  console.log(`现在的数字是${currentValue}`) 

  const transationResponse =await simple_storage.store(7)
  await transationResponse.wait(1)
  const updateValue=await simple_storage.retrieve()
  console.log(`更新后的数字是${updateValue}`)


}

async function verify(contractAdress,args){
  console.log("验证合约")

  try {
    await run("verify:verify",{
      address:contractAdress,
      constructArguments:args,
    })
  
    
  } catch (e) {
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already Verfied!")
    }
    else{
      console.log(e)
    }
    
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
