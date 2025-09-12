import { GlobalProvider } from "@/components/providers/Global";
import getGlobal from "@/utils/getGlobal";
import Navigation, { NavigationLoading } from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import RoutesLoader from "@/components/utils/RoutesLoader";
import NoGhostLogo from "@/assets/vectors/logo.svg";
import FantasticProteinsLogo from "@/assets/vectors/fantastic-proteins-logo.svg";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

type Props = { type?: string; children?: React.ReactNode };

const Main = async ({ type = "default", children }: Props) => {
  const { strings } = await getGlobal("strings");

  return (
    <GlobalProvider {...{ strings }} currency="EUR">
      <div className="gap-m grid h-screen place-content-center place-items-center">
        <NoGhostLogo className="w-[128px]" />
        <Text align="center">is now</Text>
        <Link href={"https://fantasticproteins.com"}>
          <FantasticProteinsLogo className="w-[256px]" />
        </Link>
      </div>
      {/* {children}
      {type !== "order" && (
        <div className="m-xs pointer-events-none fixed right-0 bottom-0 left-0 z-20 grid sm:place-content-center">
          <Suspense fallback={<NavigationLoading />}>
            <Navigation />
          </Suspense>
        </div>
      )} */}
      <RoutesLoader className="fixed right-0 bottom-0 left-0" />
      {/* <Footer /> */}
    </GlobalProvider>
  );
};

export default Main;
