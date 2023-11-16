import { ApplicationError } from "@/components/layout/ErrorPage/ApplicationError";

export function InternalServerErrorPage() {
  return (
    <ApplicationError canRefresh={false} />
  );
};
