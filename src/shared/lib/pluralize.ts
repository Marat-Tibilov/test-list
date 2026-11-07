export function pluralize(count: number, forms: [string, string, string]): string {
  const lastTwo = count % 100
  if (lastTwo >= 11 && lastTwo <= 14) return forms[2]
  const last = count % 10
  if (last === 1) return forms[0]
  return last >= 2 && last <= 4 ? forms[1] : forms[2]
}
