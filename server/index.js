const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa"

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot(); // ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa
  const leaves = niceList.length;
  const layers = Math.ceil(Math.log2(niceList.length));

  const isInTheList = verifyProof(body.proof, body.leaf, MERKLE_ROOT);
  if(isInTheList) {
    console.log(`${body.leaf} is in the list`)
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
