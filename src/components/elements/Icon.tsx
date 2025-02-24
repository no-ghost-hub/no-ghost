type Props = {
  name: string;
};

const Icon: React.FC<Props> = ({ name }) => {
  // const icons: Record<string, React.FC> = {
  //   instagram: Instagram,
  // };
  // const Component = icons[name];

  return (
    <div className="h-m w-m hover:fill-purple fill-black">
      {/* <Component /> */}
    </div>
  );
};

export default Icon;
