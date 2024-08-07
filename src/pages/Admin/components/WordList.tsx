import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useReducer, useState } from 'react';
import useSWR from 'swr';

import { searchWord } from '@/api/words/searchWord';
import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Loading } from '@/components/layout/Loading/Loading';
import { Searchbar } from '@/components/layout/Searchbar/Searchbar';

import { DataTable } from '../ManageWord/Table';
import { WordColumns } from '../ManageWord/columns';

// import { WordColumns } from './columns';

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

interface WordListProps<T extends WordColumns> {
  columns: ColumnDef<T>[];
}

export function WordList({ columns }: WordListProps<WordColumns>) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

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
        setTotalPage((data?.total ?? 1) / (data.limit ?? 10));
      },
    }
  );

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
    <div className="flex-1">
      {isLoading && (
        <FillParent>
          <Loading />
        </FillParent>
      )}

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
      {!!searchResult?.data && (
        <DataTable
          columns={columns}
          data={searchResult.data.map(item => ({
            word: item,
          }))}
          currentPage={state.page}
          pageCount={totalPage}
          setPagination={handleSetPage as OnChangeFn<PaginationState>}
        />
      )}
    </div>
  );
}
