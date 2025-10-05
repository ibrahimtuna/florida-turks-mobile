import React from 'react';
import Icons, { IconName } from '../assets/icons/icons.ts';

const Sizes = {
  xxs: 12,
  xs: 16,
  s: 24,
  m: 32,
  l: 36,
  xl: 48,
  full: '100%', // keep if your SVGs accept string sizes
} as const;

type IconProps = {
  size?: keyof typeof Sizes;
  /** color for the icon fill (SVG) */
  fill?: string;
  name: IconName;
  /** allow string too because size="full" -> "100%" */
  height?: number | string;
  width?: number | string;
};

const Icon = ({
  size = 'm',
  fill = '#000000',
  name,
  height,
  width,
}: IconProps) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;

  const resolvedSize = Sizes[size];

  return (
    <IconComponent
      height={height ?? resolvedSize}
      width={width ?? resolvedSize}
      color={fill}
    />
  );
};

export default Icon;
