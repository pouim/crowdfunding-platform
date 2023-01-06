import { useCallback, useEffect, useState } from "react";

import DisplayCampaigns from "src/components/DisplayCampaigns";
import { Campaign } from "src/constants/types";
import { useStateContext } from "src/context";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { address, contract, getCampaigns } = useStateContext() || {};

  const fetchCampaigns = useCallback(async () => {
    if (typeof getCampaigns === "function") {
      setIsLoading(true);
      const data = await getCampaigns();
      setCampaigns(data);
      setIsLoading(false);
    }
  }, [getCampaigns]);

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
}

export default Home;
