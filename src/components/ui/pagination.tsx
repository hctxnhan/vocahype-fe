import { ChevronLeftIcon } from '@radix-ui/react-icons';
import {
  Dispatch,
  useReducer,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { cn } from '@/lib/utils/utils';

import { Button } from './button';
import styles from './pagination.module.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

enum PaginationActionTypes {
  SET_PAGE = 'SET_PAGE',
  SET_LIMIT = 'SET_LIMIT',
  SET_TOTAL = 'SET_TOTAL',
}

type PaginationAction = {
  type: PaginationActionTypes;
  payload: number;
};

const actions = {
  setPage: (page: number) => ({
    type: PaginationActionTypes.SET_PAGE,
    payload: page,
  }),
  setLimit: (limit: number) => ({
    type: PaginationActionTypes.SET_LIMIT,
    payload: limit,
  }),
  setTotal: (total: number) => ({
    type: PaginationActionTypes.SET_TOTAL,
    payload: total,
  }),
};

const defaultState = {
  page: 1,
  limit: 10,
  total: 0,
};

function reducer(state: PaginationState, action: PaginationAction) {
  switch (action.type) {
    case PaginationActionTypes.SET_PAGE:
      return { ...state, page: action.payload > 0 ? action.payload : 1 };
    case PaginationActionTypes.SET_LIMIT:
      return {
        ...state,
        limit: action.payload > 0 ? action.payload : 1,
        page: 1,
      };
    case PaginationActionTypes.SET_TOTAL:
      return { ...state, total: action.payload > 0 ? action.payload : 1 };
    default:
      return state;
  }
}

const PaginationContext = createContext<
  [PaginationState, Dispatch<PaginationAction>] | undefined
>(undefined);

export function usePaginationContext() {
  return useContext(PaginationContext);
}

export function Pagination({
  children,
  defaultValue = defaultState,
  onChange,
}: {
  children: React.ReactNode;
  defaultValue?: PaginationState;
  onChange?: (value: PaginationState) => void;
}) {
  const [state, dispatchOriginal] = useReducer<
    React.Reducer<PaginationState, PaginationAction>
  >(reducer, defaultValue);

  const dispatch: Dispatch<PaginationAction> = useCallback(
    action => {
      dispatchOriginal(action);
      onChange?.(reducer(state, action));
    },
    [onChange, state]
  );

  return (
    <PaginationContext.Provider value={[state, dispatch]}>
      {children}
    </PaginationContext.Provider>
  );
}

function PaginationPageNumber({
  onChange,
  totalPage,
}: {
  totalPage: number;
  value?: number;
  onChange?: (value: number) => void;
}) {
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const [state, dispatch] = usePaginationContext()!;
  const voidItem = '...';

  useEffect(() => {
    dispatch(actions.setTotal(totalPage));
  }, [totalPage]);

  function calculateShowPageItems() {
    const value = state.page;
    if (state.total <= 5) {
      return Array.from({ length: state.total }, (_, i) => i + 1);
    }

    if (value <= 3) {
      return [1, 2, 3, 4, 5, voidItem, state.total];
    }

    if (value >= state.total - 2) {
      return [
        1,
        voidItem,
        state.total - 4,
        state.total - 3,
        state.total - 2,
        state.total - 1,
        state.total,
      ];
    }

    return [1, voidItem, value - 1, value, value + 1, voidItem, state.total];
  }

  function handleChangePage(pageNumber: number) {
    return () => {
      dispatch(actions.setPage(pageNumber));
      onChange?.(pageNumber);
    };
  }

  const showPageItems = isSmallScreen ? [state.page] : calculateShowPageItems();

  return (
    <div className="center gap-2">
      {showPageItems.map((item, index) => (
        <Button
          key={index}
          variant={'outline'}
          className={cn('w-[50px] flex-1 text-foreground', {
            'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground':
              item === state.page,
          })}
          onClick={
            item === voidItem ? undefined : handleChangePage(item as number)
          }
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

function PaginationPrev() {
  const [state, dispatch] = usePaginationContext()!;

  function handleChangePage() {
    dispatch(actions.setPage(state.page - 1));
  }

  return (
    <Button
      disabled={state.page === 1}
      variant={'outline'}
      className="center w-[50px] text-neutral-400 hover:text-neutral-400"
      onClick={handleChangePage}
    >
      <ChevronLeftIcon className="scale-125" />
    </Button>
  );
}

function PaginationNext() {
  const [state, dispatch] = usePaginationContext()!;

  function handleChangePage() {
    dispatch(actions.setPage(state.page + 1));
  }

  return (
    <Button
      disabled={state.page === state.total}
      variant={'outline'}
      className="center w-[50px] text-neutral-400 hover:text-neutral-400"
      onClick={handleChangePage}
    >
      <ChevronLeftIcon className="rotate-180 scale-125" />
    </Button>
  );
}

function PaginationPageSize() {
  const [state, dispatch] = usePaginationContext()!;

  function handleChangePageSize(value: string) {
    dispatch(actions.setLimit(Number(value)));
  }

  return (
    <Select value={state.limit.toString()} onValueChange={handleChangePageSize}>
      <SelectTrigger
        className={cn('w-[180px]', styles.paginationPageSizeValue)}
      >
        <SelectValue placeholder="Rows per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="font-medium" value="10">
          10 rows per page
        </SelectItem>
        <SelectItem className="font-medium" value="20">
          20 rows per page
        </SelectItem>
        <SelectItem className="font-medium" value="50">
          50 rows per page
        </SelectItem>
        <SelectItem className="font-medium" value="100">
          100 rows per page
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

Pagination.PageNumber = PaginationPageNumber;
Pagination.Prev = PaginationPrev;
Pagination.Next = PaginationNext;
Pagination.PageSize = PaginationPageSize;
