export interface Page<T> {
  content: T[]; // 실제 데이터 배열
  totalElements: number; // 전체 요소 수
  totalPages: number; // 전체 페이지 수
  size: number; // 페이지당 요소 수
  number: number; // 현재 페이지 번호
  numberOfElements: number; // 현제 페이지에 있는 요소 수
  first: boolean; // 첫 페이지 여부
  last: boolean; // 마지막 페이지 여부
  empty: boolean; // 현재 페이지가 비어 있는지 여부
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}
