import { PackageSearch } from 'lucide-react';

import { ApplicationError } from './ApplicationError';

export function NotFoundError() {
  return (
    <ApplicationError
      ErrorIcon={PackageSearch}
      errorTitle="Page Not Found"
      errorDescription="We couldn't find the page you were looking for. Please check the URL and try again."
    />
  );
}
