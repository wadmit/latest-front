export type AlertButtonProps = {
    buttonName: string;
    buttonClick: () => void;
}
export type IStatus =
  | 'success'
  | 'error'
  | 'warning'
  | 'pending'
  | 'inview'
  | 'rejected';
export type StepperProps = {
    backgroundColor: string;
    color: string;
    text: string;
    border: string;
  };
  export type AlertProps = {
    variant: IStatus
    text: React.ReactNode;
    activeStep?: number
    buttonProps?: AlertButtonProps
    iconType: IconType
    files?: AlertButtonProps[],
    reAskedDocuments?: string[]
};
export type Step = {
    number: number;
    name: string;
    title: string;
    desc: string;
    todos: string[];
};

type IconType = 'success' | 'warning' | 'pending' | 'error' | 'sent' | 'sad' | 'congrats' | 'alert'
