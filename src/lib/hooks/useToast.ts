import { useToast as useToastCn } from '@/components/ui/use-toast';

export function useToast(defaultTitle?: string) {
  const { toast } = useToastCn();

  function success(options?: { title?: string; msg?: string }) {
    toast({
      title: options?.title || defaultTitle,
      description: options?.msg,
      variant: 'success',
      duration: 3000,
    });
  }

  function error(options?: { title?: string; msg?: string }) {
    toast({
      title: options?.title || defaultTitle,
      description: options?.msg,
      variant: 'destructive',
      duration: 3000,
    });
  }

  return {
    success,
    error,
  };
}
