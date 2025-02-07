import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { GlobalProvider } from "@/components/providers/Global";
import getGlobal from "@/utils/getGlobal";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";

type Props = { children?: React.ReactNode };

const Main = async ({ children }: Props) => {
  const { strings } = await getGlobal("strings");

  return (
    <GlobalProvider {...{ strings }} currency="EUR">
      {children}
      <div className="m-xs pointer-events-none fixed right-0 bottom-0 left-0 z-20 grid sm:place-content-center">
        <Suspense fallback={<Loading />}>
          <Navigation />
        </Suspense>
      </div>
      {/* <Footer /> */}
    </GlobalProvider>
  );
};

const Loading = () => {
  return (
    <div className="custom-underline animate-underline grid sm:w-(--breakpoint-sm)">
      <Link theme="button" background="white">
        <Text>&nbsp;</Text>
      </Link>
    </div>
  );
};

export default Main;
