import React from "react";

interface Props {
  params: {
    id: number;
  };
}

export default function CompanyByIDPage({ params }: Props) {
  return <div>CompanyByIDPage: {params.id}</div>;
}
