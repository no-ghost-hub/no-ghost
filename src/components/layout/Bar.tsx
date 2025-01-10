"use client";

import parsed from "@/utils/parsed";

import LinkBlock from "@/components/blocks/Link";
import MenuBlock from "@/components/blocks/Menu";
import OrderBlock from "@/components/blocks/Order";
import ReserveBlock from "@/components/blocks/Reserve";
import SizeUtil from "@/components/utils/Size";

import { Menu } from "@/payload-types";
import { useUiStore } from "@/components/providers/Global";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const components = {
  linkBlock: LinkBlock,
  menuBlock: MenuBlock,
  orderBlock: OrderBlock,
  reserveBlock: ReserveBlock,
};

type Props = {
  main: Menu;
  home: any;
};

const NavigationBar = ({ main, home }: Props) => {
  const { navigation, setNavigation } = useUiStore((state) => state);
  const router = useRouter();

  const searchParams = useSearchParams();
  const navigationParam = searchParams.get("navigation");

  function handleClick(s: string) {
    if (navigation === s) {
      setNavigation("");
    } else {
      setNavigation(s);
    }
  }

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      return;
    }
    const url = new URL(window.location.href);

    if (navigation) {
      url.searchParams.set("navigation", navigation);
    } else {
      url.searchParams.delete("navigation");
    }

    if (url.toString() !== window.location.href) {
      console.log("lol");
      router.replace(url.toString());
    }
  }, [navigation]);

  useEffect(() => {
    if (navigation !== navigationParam) {
      setNavigation(navigationParam || "");
      initialized.current = true;
    }
  }, [navigationParam]);

  return (
    <SizeUtil name="nav" height={true}>
      <nav className="pointer-events-auto grid grid-flow-col justify-center bg-white">
        {main.items?.map((item) => {
          const Item = components[item.blockType];
          return (
            <Item
              key={item.id}
              onClick={handleClick}
              {...parsed({ ...item, homeHref: home.href }, item.blockType)}
            />
          );
        })}
      </nav>
    </SizeUtil>
  );
};

export default NavigationBar;
