// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donaters;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaings = 0;

    function createCampaing(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaings];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future!"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        numberOfCampaings++;

        return numberOfCampaings - 1;
    }

    function donateToCampaing(uint256 _id) public payable {
        uint256 amount = msg.value;
        address donator = msg.sender;

        Campaign storage campaign = campaigns[_id];

        campaign.donaters.push(donator);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        Campaign storage campaign = campaigns[_id];

        return (campaign.donaters, campaign.donations);
    }

    function getCampaings() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaings);

        for (uint256 i = 0; i < numberOfCampaings; i++) {
            Campaign storage campaign = campaigns[i];

            allCampaigns[i] = campaign;
        }

        return allCampaigns;
    }
}
