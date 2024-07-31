import { FC, ReactNode } from "react";

type Props = { children: ReactNode };

const Component: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Component;
