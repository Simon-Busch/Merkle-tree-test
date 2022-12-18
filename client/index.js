const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const serverUrl = "http://localhost:1225";

async function main() {
  // node client "Shelly Toy" "Shelly Toy"
  // process.argv[2] used to build the proof
  // process.argv[3] to be sen to the server
  const index = niceList.findIndex((n) => n === process.argv[2]);
  console.log(index);
  if (!index || index < 0 || !process.argv[3]) {
    console.log("please enter a valid name ...");
  }
  const leaf = process.argv[3];
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);
  console.log("Proof of nodes: ", proof.length);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    leaf,
    proof,
  });

  console.log({ gift });
}

main();
