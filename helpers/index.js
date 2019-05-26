export function getPaginationParams({ page, per_page }) {
  const currentPage = ~~(page || 1)
  const perPage = ~~(per_page || 12)
  const offset = perPage * (currentPage - 1)
  const limit = perPage

  return {
    page: currentPage,
    perPage,
    offset,
    limit
  }
}
