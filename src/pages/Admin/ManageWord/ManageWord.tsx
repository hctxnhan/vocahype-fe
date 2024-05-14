import { PaginationState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useReducer, useState } from 'react';
import useSWR from 'swr';

import { searchWord } from '@/api/words/searchWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Searchbar } from '@/components/layout/Searchbar/Searchbar';
import { FloatingButton } from '@/components/ui/floating-button';
import { Link } from '@/components/ui/link';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { DataTable } from './Table';
import { columns } from './columns';

enum ActionType {
  SET_PAGE = 'SET_PAGE',
  SET_SEARCH = 'SET_SEARCH',
  SET_EXACT = 'SET_EXACT',
}

interface State {
  search: string;
  page: number;
  exact?: boolean;
}

const initialState: State = {
  search: '',
  page: 1,
  exact: false,
};

type Action =
  | { type: ActionType.SET_PAGE; payload: number }
  | { type: ActionType.SET_SEARCH; payload: string }
  | { type: ActionType.SET_EXACT; payload: boolean };

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ActionType.SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case ActionType.SET_SEARCH:
      return {
        ...state,
        page: 1,
        search: payload,
      };
    case ActionType.SET_EXACT:
      return {
        ...state,
        exact: payload,
        page: 1,
      };
    default:
      return state;
  }
};

export function ManageWord() {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  useSetBreadcrumb([
    { label: 'Admin', href: '/admin' },
    { label: 'Manage Word' },
  ]);

  const [totalPage, setTotalPage] = useState(1);

  const { data: searchResult, isLoading } = useSWR(
    [
      'search',
      state.search,
      state.exact ? 'true' : 'false',
      '',
      state.page,
      '10',
    ],
    ([, word]) => {
      return searchWord({
        word: word ?? '',
        exact: state.exact,
        status: '',
        page: {
          offset: state.page,
          limit: '10',
        },
      });
    },
    {
      onSuccess: data => {
        setTotalPage(data?.meta?.pagination?.last ?? 1);
      },
    }
  );

  const result = searchResult?.data.map(item => ({
    id: Number.parseInt(item.id),
    word: item.word,
    phonetic: item.phonetic,
    syllable: item.syllable,
    point: item.point ? Number.parseFloat(item.point.toFixed(2)) : 0,
  }));

  function handleSetPage(
    calculatePage: (state: PaginationState) => PaginationState
  ) {
    const res = calculatePage({
      pageIndex: state.page,
      pageSize: 10,
    });

    dispatch({ type: ActionType.SET_PAGE, payload: res.pageIndex });
  }

  return (
    <div>
      {isLoading && (
        <FillParent>
          <Loading />
        </FillParent>
      )}
      <Link href="/admin/create-word">
        <FloatingButton className="z-10 items-center justify-center gap-1">
          <Plus size={14} />
          Create word
        </FloatingButton>
      </Link>
      <Searchbar
        isExact={state.exact}
        onToggleExact={exact =>
          dispatch({ type: ActionType.SET_EXACT, payload: exact })
        }
        search={search =>
          dispatch({ type: ActionType.SET_SEARCH, payload: search })
        }
        noRecent
        noFocusOverlay
      />
      <div className="py-3" />
      {!!result && (
        <DataTable
          columns={columns}
          data={result}
          currentPage={state.page}
          pageCount={totalPage}
          setPagination={handleSetPage}
        />
      )}
    </div>
  );
}
