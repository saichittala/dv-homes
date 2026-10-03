import React from "react";
import {
  Expand01Icon,
  Building07Icon,
  MarkerPin01Icon,
  ShieldTickIcon,
  Grid01Icon,
  LayoutAlt01Icon,
  Home02Icon,
  Home03Icon,
  Lightbulb01Icon,
  ZapIcon as UntitledZapIcon,
  LayoutGrid01Icon,
  Brush01Icon,
  Home01Icon,
  Stars01Icon,
  CheckIcon as UntitledCheckIcon,
  CheckCircleIcon as UntitledCheckCircleIcon,
  ArrowRightIcon as UntitledArrowRightIcon,
  PhoneIcon as UntitledPhoneIcon,
  Mail01Icon,
  Star01Icon,
  RulerIcon as UntitledRulerIcon,
  CompassIcon as UntitledCompassIcon,
  MessageChatCircleIcon,
  Tool01Icon,
  Key01Icon,
  Settings01Icon,
  Diamond01Icon,
  LayersThree01Icon,
  Award01Icon,
  ClockIcon as UntitledClockIcon,
  CalendarIcon as UntitledCalendarIcon,
  Lock01Icon,
  XCloseIcon as UntitledXCloseIcon,
  Menu01Icon,
  ChevronDownIcon as UntitledChevronDownIcon,
  ChevronRightIcon as UntitledChevronRightIcon,
  ChevronLeftIcon as UntitledChevronLeftIcon,
  Sliders01Icon,
  Building01Icon,
} from "@untitledui-icons/react/line";

import { CheckCircleIcon as SolidCheckCircleIcon } from "@untitledui-icons/react/solid";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

function wrapIcon(Component: React.ComponentType<any>, defaultStrokeWidth = 2) {
  return function WrappedIcon({
    size = 24,
    strokeWidth = defaultStrokeWidth,
    color = "currentColor",
    style,
    className,
    ...props
  }: IconProps) {
    return (
      <Component
        width={size}
        height={size}
        stroke={color}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        style={style}
        {...props}
      />
    );
  };
}

export const ExpandIcon = wrapIcon(Expand01Icon);
export const FactoryIcon = wrapIcon(Building07Icon);
export const MapPinIcon = wrapIcon(MarkerPin01Icon);
export const ShieldCheckIcon = wrapIcon(ShieldTickIcon);
export const KitchenIcon = wrapIcon(Grid01Icon);
export const WardrobeIcon = wrapIcon(LayoutAlt01Icon);
export const SofaIcon = wrapIcon(Home02Icon);
export const BedIcon = wrapIcon(Home03Icon);
export const CeilingLightIcon = wrapIcon(Lightbulb01Icon);
export const ZapIcon = wrapIcon(UntitledZapIcon);
export const GlassIcon = wrapIcon(LayoutGrid01Icon);
export const PaintIcon = wrapIcon(Brush01Icon);
export const HomeIcon = wrapIcon(Home01Icon);
export const SparklesIcon = wrapIcon(Stars01Icon);
export const CheckIcon = wrapIcon(UntitledCheckIcon, 2.5);
export const CheckCircleIcon = wrapIcon(UntitledCheckCircleIcon);
export const ArrowRightIcon = wrapIcon(UntitledArrowRightIcon);
export const PhoneIcon = wrapIcon(UntitledPhoneIcon);
export const MailIcon = wrapIcon(Mail01Icon);
export function StarIcon({ size = 24, color = "currentColor", style, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      style={style}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
export const RulerIcon = wrapIcon(UntitledRulerIcon);
export const CompassIcon = wrapIcon(UntitledCompassIcon);
export const MessageChatIcon = wrapIcon(MessageChatCircleIcon);
export const ToolIcon = wrapIcon(Tool01Icon);
export const KeyIcon = wrapIcon(Key01Icon);
export const SettingsIcon = wrapIcon(Settings01Icon);
export const DiamondIcon = wrapIcon(Diamond01Icon);
export const LayersIcon = wrapIcon(LayersThree01Icon);
export const AwardIcon = wrapIcon(Award01Icon);
export const ClockIcon = wrapIcon(UntitledClockIcon);
export const CalendarIcon = wrapIcon(UntitledCalendarIcon);
export const LockIcon = wrapIcon(Lock01Icon);
export const XCloseIcon = wrapIcon(UntitledXCloseIcon);
export function MenuIcon({ size = 24, color = "currentColor", strokeWidth = 2, className, style, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} {...props}>
      <path d="M3 8.5H21M3 15.5H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export const ChevronDownIcon = wrapIcon(UntitledChevronDownIcon);
export const ChevronRightIcon = wrapIcon(UntitledChevronRightIcon);
export const ChevronLeftIcon = wrapIcon(UntitledChevronLeftIcon);
export const SlidersIcon = wrapIcon(Sliders01Icon);
export const BuildingIcon = wrapIcon(Building01Icon);

export function CheckCircleFilledIcon({ size = 24, className, style, ...props }: IconProps) {
  return (
    <SolidCheckCircleIcon
      width={size}
      height={size}
      color="var(--brand-primary, #ff6364)"
      className={className}
      style={style}
      {...props}
    />
  );
}

export function WhatsAppIcon({ size = 20, color = "var(--brand-whatsapp, #25D366)", className, style, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={style} {...props}>
      <path d="M0 0h16v16H0z" fill="none" />
      <path fill={color} d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1s-.48.6-.59.73s-.21.14-.4 0a5.1 5.1 0 0 1-1.49-.92a5.3 5.3 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.4 1.4 0 0 0 .18-.31a.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23a2.1 2.1 0 0 0-.65 1.55A3.6 3.6 0 0 0 5 8.2A8.3 8.3 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.5 2.5 0 0 0 1.17.07a1.93 1.93 0 0 0 1.26-.88a1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21" />
      <path fill={color} d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85l3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72M8 14.12a6.1 6.1 0 0 1-3.15-.87l-.22-.13l-2.34.61l.62-2.28l-.14-.23a6.18 6.18 0 0 1 9.6-7.65a6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12" />
    </svg>
  );
}

export function PlusIcon({ size = 20, color = "currentColor", strokeWidth = 1.75, className, style, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
