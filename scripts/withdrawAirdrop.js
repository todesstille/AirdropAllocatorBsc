const { ethers } = require("hardhat");
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

const tokenAllocatorAddress = "0x332a701F93C9fA6C8CB0F5D8A2d5930BE5c9f631";
const tokenAddress = "0x7162eDc1A7c58Be65C8941C0DA6e5F93c00C9A0F";
let admin, alice, bob, charlie;

async function main() {
    [admin, alice, bob, charlie] = await ethers.getSigners();
    allocator = await ethers.getContractAt("ITokenAllocator", tokenAllocatorAddress);
    token = await ethers.getContractAt("Token", tokenAddress);
    
    const amount = ethers.parseUnits("1000", 18);
    const airdropList =
        [
          [alice.address, ethers.parseUnits("1", 18)],
          [bob.address, ethers.parseUnits("2", 18)],
          [charlie.address, ethers.parseUnits("3", 18)] 
        ];
    const merkleTree = StandardMerkleTree.of(
            airdropList,
            ["address", "uint256"],
          );
    const proofs = merkleTree.getProof(0);
    
    tx = await allocator.connect(alice).claim(
        1,
        ethers.parseUnits("1", 18),
        proofs
    );
    await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });