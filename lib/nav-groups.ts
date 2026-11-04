import type { Category, NavGroup, NavItem } from "@/types/api"

function toNavItem({ name, slug, description }: Category): NavItem {
  return { name, slug, description }
}

export function buildNavGroups(tree: Category[]): NavGroup[] {
  const groups: NavGroup[] = tree
    .filter((category) => category.children.length > 0)
    .map((category) => ({
      ...toNavItem(category),
      items: category.children.map(toNavItem),
    }))

  const standalone = tree.filter((category) => category.children.length === 0)
  if (standalone.length > 0) {
    groups.push({
      name: groups.length > 0 ? "More Topics" : "Topics",
      slug: null,
      description: null,
      items: standalone.map(toNavItem),
    })
  }

  return groups
}
