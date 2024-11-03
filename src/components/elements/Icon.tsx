type Props = {
  name: string;
};

const Component: React.FC<Props> = ({ name }) => {
  // const icons: Record<string, React.FC> = {
  //   instagram: Instagram,
  // };
  // const Component = icons[name];

  return (
    <div className="h-m w-m fill-black hover:fill-purple">
      {/* <Component /> */}
    </div>
  );
};

export default Component;
