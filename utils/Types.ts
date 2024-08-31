export interface LayoutProps {
  readonly children: React.ReactNode;
}

export interface IFormFragmentProps<T> {
  data?: T;
  readOnly?: boolean;
  disabled?: boolean;
}
