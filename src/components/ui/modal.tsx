import { Button, ButtonProps } from './button';
import { Portal } from './portal';
import { cn } from '@/lib/utils/utils';
import { useMemo } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

interface ModalButtonProps
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  title?: string;
  hidden?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  header?: {
    title: string;
    class?: string;
    showCloseIcon?: boolean;
  };
  children: React.ReactNode;
  classContent?: string;
  classContainer?: string;
  classButtonWrapper?: string;
  saveButton?: ModalButtonProps;
  cancelButton?: ModalButtonProps;
  extraButton?: ModalButtonProps[];
  handleClose: () => void;
}

export function Modal(props: ModalProps) {
  const {
    isOpen,
    classContainer,
    classContent,
    cancelButton,
    extraButton,
    header,
    saveButton,
    children,
    classButtonWrapper,
    handleClose,
  } = props;

  const ButtonList = useMemo(() => {
    const saveBtn = {
      title: saveButton?.title || 'Continue',
      hidden: saveButton?.hidden || false,
      ...saveButton,
    };
    const cancelBtn = {
      title: cancelButton?.title || 'Cancel',
      hidden: cancelButton?.hidden || false,
      variant: 'outline',
      onClick: handleClose,
      ...cancelButton,
    };
    return [
      cancelBtn,
      saveBtn,
      ...(extraButton?.map(button => ({
        hidden: button?.hidden || true,
        ...button,
      })) || []),
    ];
  }, [saveButton, cancelButton, extraButton]);

  if (!isOpen) return null;

  return (
    <Portal selector="#modal">
      <div
        className={cn(
          'absolute left-2/4 top-2/4 w-[700px] -translate-x-2/4 -translate-y-2/4 rounded-[32px] bg-gradient-to-r from-slate-100 px-14 py-8',
          classContainer
        )}
      >
        <div className="global-background absolute inset-0 -z-50" />
        <div
          className={cn(
            'text-center text-lg font-bold text-slate-800',
            header?.class
          )}
        >
          Are you sure you want to reset current progression?
          {header?.showCloseIcon && (
            <Cross1Icon
              width={20}
              height={20}
              className="absolute right-8 top-4 text-red-500 hover:cursor-pointer"
              onClick={handleClose}
            />
          )}
        </div>
        <div
          className={cn(
            'flex items-center justify-center gap-8 py-8 text-slate-900',
            classContent
          )}
        >
          {children}
        </div>
        <div className={cn('flex justify-end gap-3', classButtonWrapper)}>
          {ButtonList.map((button, index) => {
            const { hidden, title, ...rest } = button;
            return (
              !hidden && (
                <Button {...rest} key={index}>
                  {title}
                </Button>
              )
            );
          })}
        </div>
      </div>
    </Portal>
  );
}
