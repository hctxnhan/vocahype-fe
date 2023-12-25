import { Link } from 'wouter';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ReportCardProps {
  data: number;
  showAllLink: string;
  title: string;
}

export function ReportCard({ data, showAllLink, title }: ReportCardProps) {
  return (
    <Card className='max-sm:text-center'>
      <CardHeader className='py-1 border-b'>
        <CardTitle className="text-base font-semibold max-sm:text-base uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent className='my-auto py-4'>
        <p className="font-display font-semibold text-5xl max-sm:text-4xl">{data}</p>
      </CardContent>
      <CardFooter className='py-1 border-t'>
        <Link href={showAllLink}>
          <Button
            disabled={data === 0}
            className="font-normal text-muted-foreground"
            variant="link"
          >
            Show all
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
