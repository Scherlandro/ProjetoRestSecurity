export class PaginatorModel {
  page: number;
  per_page: number;
  pre_page: number;
  next_page: number;
  total: number;
  total_pages: number;
  data: any[];

  constructor(
    page: number = 1,
    per_page: number = 5,
    pre_page: number = null,
    next_page: number = 2,
    total: number = 0,
    total_pages: number = null,
    data: any[] = null
  ) {
    this.page = page;
    this.per_page = per_page;
    this.pre_page = pre_page;
    this.next_page = next_page;
    this.total = total;
    this.total_pages = total_pages;
    this.data = data;
  }
}
