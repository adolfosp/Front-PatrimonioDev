export interface IDialogoConfirmacao {
  title?: string;
  message?: string;
  showCancel?: boolean;
  showIcon?: boolean;
  actionText?: string;
  iconType?: "small" | "normal" | null;
  lottiePath?: string;
  type?: "success" | "error" | "warn" | "confirm" | null;
}
