import { GlobalProvider } from "@/components/providers/Global";
import getGlobal from "@/utils/getGlobal";
import Navigation, { NavigationLoading } from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import RoutesLoader from "@/components/utils/RoutesLoader";

type Props = { type?: string; children?: React.ReactNode };

const Main = async ({ type = "default", children }: Props) => {
  const { strings } = await getGlobal("strings");

  return (
    <GlobalProvider {...{ strings }} currency="EUR">
      {children}
      {type !== "order" && (
        <div className="m-xs pointer-events-none fixed right-0 bottom-0 left-0 z-20 grid sm:place-content-center">
          <Suspense fallback={<NavigationLoading />}>
            <Navigation />
          </Suspense>
        </div>
      )}
      <RoutesLoader className="fixed right-0 bottom-0 left-0" />
      {/* <Footer /> */}
    </GlobalProvider>
  );
};

export default Main;
