"use client";
import { useToast } from "@/components/ui/use-toast";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  return (
    <SWRConfig
      value={{
        onError: (error: any, key: string) => {
          if (error.status !== 403 && error.status !== 404) {
            toast({
              variant: "destructive",
              title: error.message,
            });
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
