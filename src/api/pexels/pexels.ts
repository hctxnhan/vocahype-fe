import { axiosPexels } from '@/lib/configs/axios';

export async function getImage({ search }: { search: string }) {
  const res = await axiosPexels.get<{
    photos: [
      {
        alt: string;
        src: {
          original: string;
        };
      },
    ];
  }>(`/search?query=${search}&per_page=1`);

  return res;
}
