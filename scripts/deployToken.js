const { ethers } = require("hardhat");

async function main() {
    Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("To the Mars", "TTM");
    await token.waitForDeployment();

    console.log(token.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });