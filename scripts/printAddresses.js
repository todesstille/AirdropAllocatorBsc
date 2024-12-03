const { ethers } = require("hardhat");
let admin, alice, bob, charlie;

async function main() {
    [admin, alice, bob, charlie] = await ethers.getSigners();
    console.log("Alice", alice.address);
    console.log("Bob", bob.address);
    console.log("Charlie", charlie.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });