export interface CompanyByIDPageParams {
  companyId: number;
}

export interface CompanyByIDPageProps {
  params: Promise<{
    companyId: string;
  }>;
}
