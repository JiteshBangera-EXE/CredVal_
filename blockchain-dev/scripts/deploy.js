const hre = require("hardhat");

async function main() {
  console.log("Deploying CredVal contract...");

  const credVal = await hre.ethers.deployContract("CredVal");

  await credVal.waitForDeployment();

  const address = await credVal.getAddress();
  console.log(`CredVal deployed to: ${address}`);
  
  console.log("Waiting for block confirmations...");
  // Wait for 6 confirmations
  await credVal.deploymentTransaction().wait(6);
  
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
