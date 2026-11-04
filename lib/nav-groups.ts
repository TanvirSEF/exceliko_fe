import type { Category, NavGroup, NavItem } from "@/types/api"

export interface CategoryGroup {
  id: string
  name: string
  slug: string | null
  description: string | null
  items: Category[]
}

function toNavItem({ name, slug, description }: Category): NavItem {
  return { name, slug, description }
}

export function buildCategoryGroups(tree: Category[]): CategoryGroup[] {
  const groups: CategoryGroup[] = tree
    .filter((category) => category.children.length > 0)
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      items: category.children,
    }))

  const standalone = tree.filter((category) => category.children.length === 0)
  if (standalone.length > 0) {
    groups.push({
      id: "more-topics",
      name: groups.length > 0 ? "More Topics" : "Topics",
      slug: null,
      description: null,
      items: standalone,
    })
  }

  return groups
}

export function buildNavGroups(tree: Category[]): NavGroup[] {
  return buildCategoryGroups(tree).map(({ name, slug, description, items }) => ({
    name,
    slug,
    description,
    items: items.map(toNavItem),
  }))
}
