export type NavLink = {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
};

export type Campaign = {
  owner: string;
  title: string;
  description: string;
  deadline: string;
  target: string;
  amount: number;
  amountCollected: number;
  image: string;
};

export type FormFieldsData = Pick<
  Campaign,
  "title" | "description" | "target" | "deadline" | "image"
> & {
  name: string;
};
