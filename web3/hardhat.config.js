/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "ganache",
    networks: {
      hardhat: {},
      goerli: {
        url: "HTTP://127.0.0.1:7545",
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
