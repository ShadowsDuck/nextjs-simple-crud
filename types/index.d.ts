declare interface UserProps {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

declare type Props = {
  email: string;
  username: string;
};

declare type Metadata = {
  id: string;
  password: string;
};
