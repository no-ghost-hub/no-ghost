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
import { useSearchParams } from "next/navigation";

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

    const params = new URLSearchParams(searchParams.toString());

    if (navigation) {
      params.set("navigation", navigation);
    } else {
      params.delete("navigation");
    }

    if (params.toString() !== searchParams.toString()) {
      window.history.replaceState(null, "", `?${params.toString()}`);
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
