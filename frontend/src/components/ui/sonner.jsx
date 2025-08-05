import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import "../../index.css";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            // group-[.toaster]:bg-background
            "group toast group-[.toaster]:text-app bg-app group-[.toaster]:border-input group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-fg",
          actionButton: "group-[.toast]:bg-app group-[.toast]:text-primary",
          cancelButton: "group-[.toast]:bg-destructive group-[.toast]:text-app",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
