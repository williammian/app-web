export class Paginator {
  totalPages = 0;
  number = 0;

  setPage(page: any) {
    this.totalPages = page.totalPages;
    this.number = page.number;
  }

}
