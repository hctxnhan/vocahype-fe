import { IconProps } from '@radix-ui/react-icons/dist/types';
import { Button, ButtonProps } from './button';
import { Portal } from './portal';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ModalButtonProps extends ButtonProps {
  title?: string;
  hidden?: boolean;
}

interface ModalProps {
  open: boolean;
  header?: {
    title: string;
    class: string;
  };
  body?: {
    content: string;
    class: string;
    icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >;
  };
  saveButton?: ModalButtonProps;
  cancelButton?: ModalButtonProps;
  extraButton?: ModalButtonProps[];
}

export function Modal(props: ModalProps) {
  const { open, body, cancelButton, extraButton, header, saveButton } = props;

  return (
    <Portal selector="#root">
      <div className="absolute left-2/4 top-2/4 w-[700px] -translate-x-2/4 -translate-y-2/4 rounded-[32px] bg-blue-300 px-14 py-8">
        {/* <div className="global-background absolute inset-0 -z-50" /> */}
        <div className="text-center text-lg font-bold text-slate-800">
          Are you sure you want to reset current progression?
        </div>
        <div className="flex gap-8 py-8 text-slate-900">
          <ExclamationTriangleIcon width={64} height={64} color="red" />
          <div>
            Just another confirmation dialog popup library used to confirm user
            intentions on the web app. Just another confirmation dialog popup
            library used to confirm user intentions on the web app.
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button>Cancel</Button>
          <Button>Continue</Button>
        </div>
      </div>
    </Portal>
  );
}
