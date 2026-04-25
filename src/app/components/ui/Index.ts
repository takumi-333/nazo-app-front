// ─────────────────────────────────────────────────────────────────────────────
// UI Components — barrel export
// Usage: import { Button, useToast, StarRating, ... } from "@/components/ui"
// ─────────────────────────────────────────────────────────────────────────────

// Button
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

// Input
export { Input, useInputTrim } from "./Input";
export type { InputProps } from "./Input";

// Modal
export { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "./Modal";
export type { ModalProps } from "./Modal";

// StarRating
export { StarRating } from "./StarRating";
export type { StarRatingProps, StarValue } from "./StarRating";

// Toast
export { ToastProvider, useToast } from "./Toast";
export type { ToastItem, ToastVariant } from "./Toast";

// Card
export { Card, CardImage, CardBody, CardTitle, CardMeta, CardMetaItem, CardFooter } from "./Card";
export type { CardProps } from "./Card";

// Badge
export { Badge, PublishedBadge, DraftBadge, PrivateBadge, SuspendedBadge } from "./Badge";
export type { BadgeProps, BadgeStatus, BadgeVariant } from "./Badge";
