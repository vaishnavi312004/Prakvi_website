// Display order follows the approved catalog, reading down each enterprise column.
export const enterpriseServiceOrder = [
  'staffing', 'business-intelligence', 'workforce-solution', 'cloud-services',
  'infrastructure-management', 'enterprise-architecture', 'project-management',
  'mobility-practice', 'supply-chain-management', 'system-integration',
  'business-analytics', 'accounting', 'it-consulting',
];
export const businessServiceOrder = [
  'web-design', 'enterprise-solution', 'digital-marketing', 'mobile-app-development',
];
export const productOrder = [
  'data-analytics', 'hr-management-system', 'vendor-management', 'relationship-management',
];
export function sortCatalog<T extends { id: string }>(items: T[], order: readonly string[]): T[] {
  const rank = (id: string) => {
    const index = order.indexOf(id);
    return index < 0 ? order.length : index;
  };
  return [...items].sort((a, b) => rank(a.id) - rank(b.id));
}
