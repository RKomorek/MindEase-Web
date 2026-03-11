"use client";

import { useSettingsStore } from "@/shared/stores/settings-store";
import { useThemeColor } from "@/shared/hooks/use-theme-color";
import React from "react";
import { useCognitiveTextStyle } from "./cognitive-styles";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  title: string;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: React.CSSProperties;
};

export function Button({
  title,
  onClick,
  variant = "primary",
  disabled,
  style,
}: Props) {
  const primary = useThemeColor({}, "primary");
  const primaryFg = useThemeColor({}, "primaryForeground");
  const border = useThemeColor({}, "border");
  const card = useThemeColor({}, "card");
  const foreground = useThemeColor({}, "foreground");

  const textStyle = useCognitiveTextStyle({ weight: "600" });

  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);
  const contrastIntensity = useSettingsStore((s) => s.contrastIntensity);

  const base: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: contrastIntensity <= 1 ? 1 : Math.min(3, contrastIntensity),
    borderStyle: "solid",
    borderColor: border,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: animationsEnabled ? "opacity 0.15s ease" : "none",
  };

  const backgroundColor =
    variant === "primary" ? primary : variant === "secondary" ? card : "transparent";

  const color = variant === "primary" ? primaryFg : foreground;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...base,
        backgroundColor,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span style={{ ...textStyle, color }}>{title}</span>
    </button>
  );
}