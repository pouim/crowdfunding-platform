import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormFieldsData } from "src/constants/types";

interface FormFieldProps {
  name: keyof FormFieldsData;
  register: UseFormRegister<FormFieldsData>;
  labelName: string;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;
  isTextArea?: boolean;
  required?: boolean;
}

function FormField(props: FormFieldProps) {
  const {
    name,
    register,
    labelName,
    placeholder = "Enter value ...",
    inputType = "text",
    isTextArea = false,
    required = true,
  } = props;

  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          {...register(name)}
          required={required}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          {...register(name)}
          required={required}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
}

export default FormField;
