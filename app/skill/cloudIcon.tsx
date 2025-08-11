"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, ICloud, renderSimpleIcon, SimpleIcon } from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#ffffff",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    dragControl: true,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 36,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
    },
  });
};

type LocalIconData = {
  simpleIcons: {
    [slug: string]: SimpleIcon;
  };
};

export function IconCloud() {
  const [data, setData] = useState<LocalIconData | null>(null);

  useEffect(() => {
    fetch("/skillsName.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load icon data:", err));
  }, []);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, "dark")
    );
  }, [data]);

  return <Cloud {...cloudProps}>{renderedIcons || []}</Cloud>;
}
