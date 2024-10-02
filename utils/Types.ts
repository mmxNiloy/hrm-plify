export interface LayoutProps {
  readonly children: React.ReactNode;
}

export interface IFormFragmentProps<T> {
  data?: T;
  readOnly?: boolean;
  disabled?: boolean;
}

export interface ISearchParamsProps {
  searchParams: ISearchParams;
}

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}
