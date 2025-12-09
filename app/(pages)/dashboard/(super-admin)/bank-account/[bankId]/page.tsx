'use server'
import getCurrentUserPermissions from '@/app/(server)/actions/user/get-current-user-permissions.controller';
import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'
import {BankDetailsSkeleton, BankDetailsPage} from './components'

interface PageProps {
    params: Promise<{
        bankId: string
    }>;
    searchParams: Promise<SearchParams>
}

export default async function BankAccountsPage({params, searchParams}: PageProps) {
    const [mParams, mPermissions, sParams] = await Promise.all([
        params,
        getCurrentUserPermissions(),
        searchParams,
      ]);
    
      const bankId = mParams.bankId;
      const writePermission = mPermissions?.find(
        (item) => item === "cmp_bank_create"
      );
      const readPermission = mPermissions?.find((item) => item === "cmp_bank_read");
      const updatePermission = mPermissions?.find(
        (item) => item === "cmp_bank_update"
      );
    
      if (!writePermission && !readPermission && !updatePermission)
        return notFound();
  return (
    <Suspense fallback={<BankDetailsSkeleton />}>
        <BankDetailsPage bankId={bankId} />
    </Suspense>
  )
}
