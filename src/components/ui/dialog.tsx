import { Button, ButtonProps } from './button';
import { Portal } from './portal';
import { cn } from '@/lib/utils/utils';
import { useMemo } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalButtonProps   {
  title: string;
  hidden?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  title: string;
  classTitle?: string;
  showCloseIcon?: boolean;
  children: React.ReactNode;
  classContent?: string;
  classContainer?: string;
  classButtonWrapper?: string;
  saveButton?: ModalButtonProps & ButtonProps;
  cancelButton?: ModalButtonProps & ButtonProps;
  extraButton?: ModalButtonProps[];
  handleClose: () => void;
}

export function Dialog(props: ModalProps) {
  const {
    isOpen,
    classContainer,
    classContent,
    cancelButton,
    extraButton,
    title,
    classTitle,
    showCloseIcon = false,
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
        hidden: button?.hidden || false,
        ...button,
      })) || []),
    ];
  }, [saveButton, cancelButton, extraButton]);

  const dropIn = {
    initial: { top: "20%" , opacity: 0, transition: { type: "spring", duration: 0.1, damping: 100, stiffness: 500 } },
    isOpen: { top: "50%", opacity: 1 },
    exit: { top: "80%", opacity: 0 }
  }

  return (
    <Portal selector="body">
      <AnimatePresence>
        {isOpen && <motion.div
          onClick={(e)=>e.stopPropagation()}
          className={cn(
            'absolute left-2/4 top-2/4 w-[700px] -translate-x-2/4 -translate-y-2/4 rounded-[32px]  bg-gradient-to-br from-blue-100 to-blue-200 px-14 py-8',
            classContainer
          )}
          variants={dropIn}
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
        >
          <div className="global-background absolute inset-0 -z-50" />
          <div
            className={cn(
              'text-center text-lg font-bold text-slate-800',
              classTitle
            )}
          >
            {title}
            {showCloseIcon && (
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
        </motion.div>}
      </AnimatePresence>
    </Portal>
  );
}
