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
  target: number;
  amount: number;
  amountCollected: number;
  image: string;
};
