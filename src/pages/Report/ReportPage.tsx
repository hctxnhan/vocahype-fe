import { CalendarIcon } from '@radix-ui/react-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { subDays, format } from 'date-fns';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { DateRange } from 'react-day-picker';
import useSWR from 'swr';
import { Link } from 'wouter';

import { getReport } from '@/api/profile/report';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils/utils';

dayjs.extend(utc);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export function ReportPage() {
  useSetBreadcrumb(['Report']);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const {
    data: reportData,
    isLoading,
    mutate,
  } = useSWR(
    ['report', date],
    ([_, dateRange]: [string, DateRange | undefined]) => {
      if (!dateRange || !dateRange.from || !dateRange.to) return;

      return getReport(
        dayjs.utc(dateRange.from).valueOf(),
        dayjs.utc(dateRange.to).valueOf()
      );
    },
    {
      keepPreviousData: true,
    }
  );

  function onDateChange(date: DateRange | undefined) {
    setDate(date);

    void mutate();
  }

  const data = {
    labels: reportData?.data[0].labels,
    datasets: [
      {
        label: 'Learning time',
        data: reportData?.data[0].datas.map(data => data / 60),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if (isLoading && !reportData)
    return (
      <FillParent>
        <Loading
          loadingText='Loading your learning report...'
        />
      </FillParent>
    );

  if (!reportData) return null;

  const { ignored, learning, mastered } = reportData.data[0];

  return (
    <div className={cn('flex flex-col gap-2')}>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Learning overview</CardTitle>
          <CardDescription>
            <p>
              Your learning progress can be reset by access the{' '}
              <Link href="/profile">
                <Button className="font-normal" variant="link">
                  {`Profile > Reset learning progression`}
                </Button>
              </Link>{' '}
              page.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-5xl">{learning}</p>
            </CardContent>
            <CardFooter>
              <Link href="/search?search=&exact=false&status=learning&page%5Boffset%5D=1&page%5Blimit%5D=10">
                <Button
                  disabled={learning === 0}
                  className="font-normal text-muted-foreground"
                  variant="link"
                >
                  Show all
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Mastered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-5xl">{mastered}</p>
            </CardContent>
            <CardFooter>
              <Link href="/search?search=&exact=false&status=mastered&page%5Boffset%5D=1&page%5Blimit%5D=10">
                <Button
                  disabled={mastered === 0}
                  className="font-normal text-muted-foreground"
                  variant="link"
                >
                  Show all
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ignored</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-5xl">{ignored}</p>
            </CardContent>
            <CardFooter>
              <Link href="/search?search=&exact=false&status=ignore&page%5Boffset%5D=1&page%5Blimit%5D=10">
                <Button
                  disabled={ignored === 0}
                  className="font-normal text-muted-foreground"
                  variant="link"
                >
                  Show all
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading}
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Line className="self-end" options={options} data={data} />
    </div>
  );
}
