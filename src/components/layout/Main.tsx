import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { GlobalProvider } from "@/components/providers/Global";
import getGlobal from "@/utils/getGlobal";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import RoutesLoader from "@/components/utils/RoutesLoader";
import OrderBar from "@/components/layout/OrderBar";

type Props = { type?: string; children?: React.ReactNode };

const bars: Record<string, any> = {
  default: Navigation,
  order: OrderBar,
};

const Main = async ({ type = "default", children }: Props) => {
  const { strings } = await getGlobal("strings");

  const Component = bars[type];

  return (
    <GlobalProvider {...{ strings }} currency="EUR">
      {children}
      <div className="m-xs pointer-events-none fixed right-0 bottom-0 left-0 z-20 grid sm:place-content-center">
        <Suspense fallback={<NavigationLoading />}>
          <Component />
        </Suspense>
      </div>
      <RoutesLoader className="fixed right-0 bottom-0 left-0" />
      {/* <Footer /> */}
    </GlobalProvider>
  );
};

const NavigationLoading = () => {
  return (
    <div className="custom-underline animate-underline grid sm:w-(--breakpoint-sm)">
      <Link theme="button" background="white">
        <Text>&nbsp;</Text>
      </Link>
    </div>
  );
};

export default Main;
