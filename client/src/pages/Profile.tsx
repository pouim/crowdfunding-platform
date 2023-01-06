import { useState, useEffect, useCallback } from "react";

import DisplayCampaigns from "src/components/DisplayCampaigns";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext() || {};

  const fetchCampaigns = useCallback(async () => {
    if (typeof getUserCampaigns === "function") {
      setIsLoading(true);
      const data = await getUserCampaigns();
      setCampaigns(data as any);
      setIsLoading(false);
    }
  }, [getUserCampaigns]);

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract, fetchCampaigns]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
