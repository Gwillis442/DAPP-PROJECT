require("@nomicfoundation/hardhat-toolbox");
const INFURA_API_KEY = "tqHPg0IUsDIE9KvLg4s4sFelZKrO96Fq";
const SEPOLIA_PRIVATE_KEY = "316a5cc1a2552c3367e28319e9a73a32db6e4e16bec63ecf2768593e3d190133";

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia:{
      url: `https://eth-sepolia.g.alchemy.com/v2/tqHPg0IUsDIE9KvLg4s4sFelZKrO96Fq`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};