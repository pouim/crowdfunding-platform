import { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Campaign } from "src/constants/types";

interface StateContextInterface {
  address: any;
  contract: any;
  connect: any;
  createCampaign: (form: any) => Promise<void>;
  getCampaigns: () => Promise<any>;
  getUserCampaigns: () => Promise<void>;
  donate: (pId: number, amount: string) => Promise<any>;
  getDonations: (
    pId: number
  ) => Promise<{ donator: string; donation: string }[]>;
}

const StateContext = createContext<StateContextInterface | null>(null);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const { contract } = useContract(
    "0xD4ACFcbB93855279345B6AB5458Fc4DD907ED75d"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: Campaign) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract?.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign: Campaign, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: +campaign.deadline,
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign: Campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId: number, amount: string) => {
    const data = await contract?.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId: number) => {
    const donations = await contract?.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i] as string,
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
