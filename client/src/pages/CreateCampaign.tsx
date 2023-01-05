import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FormFieldsData } from "src/constants/types";
import FormField from "src/components/FormField";
import { money } from "src/assets";
import { CustomButton } from "src/components";
import { useStateContext } from "src/context";
import { checkIfImage } from "src/utils";
import { ethers } from "ethers";

function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { createCampaign = undefined } = useStateContext() || {};

  const { handleSubmit, register, setValue } = useForm<FormFieldsData>({
    defaultValues: {
      name: "",
      title: "",
      description: "",
      target: "",
      deadline: "",
      image: "",
    },
  });

  const onSubmit = (data: FormFieldsData) => {
    const { image, target } = data;


    console.log("formData", data);

    checkIfImage(image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign?.({
          ...data,
          target: ethers.utils.parseUnits(target, 18),
        });

        setIsLoading(false);

        navigate("/");
      } else {
        alert("Provide valid image url");
        setValue("image", "");
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loader ..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] ">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            name="name"
            register={register}
            labelName="Your Name *"
            placeholder="John Doe"
          />
          <FormField
            name="title"
            register={register}
            labelName="Campaign Title *"
            placeholder="Write a title"
          />
        </div>

        <FormField
          name="description"
          register={register}
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
        />
        <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd]  h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of raised amount{" "}
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            name="target"
            register={register}
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
          />
          <FormField
            name="deadline"
            register={register}
            labelName="End Date  *"
            placeholder="End Date"
            inputType="date"
          />

          <FormField
            name="image"
            register={register}
            labelName="Campaign Image  *"
            placeholder="Place image url of your campaign"
            inputType="url"
          />
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Submit new Campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
