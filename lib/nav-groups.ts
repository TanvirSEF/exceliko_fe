import type { Category, NavGroup, NavItem } from "@/types/api"

export interface CategoryGroup {
  id: string
  name: string
  slug: string | null
  description: string | null
  items: Category[]
}

function toNavItem({ name, slug, description, icon_url }: Category): NavItem {
  return { name, slug, description, icon_url }
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
  const categoryById = new Map(tree.map((category) => [category.id, category]))

  return buildCategoryGroups(tree).map(({ id, name, slug, description, items }) => ({
    name,
    slug,
    description,
    icon_url: categoryById.get(id)?.icon_url ?? null,
    items: items.map(toNavItem),
  }))
}

export function shortNavName(itemName: string, groupName: string): string {
  const itemWords = itemName.split(" ")
  const groupText = ` ${groupName.toLowerCase()} `

  let shared = 0
  for (let length = itemWords.length - 1; length > 0; length--) {
    const prefix = itemWords.slice(0, length).join(" ").toLowerCase()
    if (groupText.includes(` ${prefix} `)) {
      shared = length
      break
    }
  }

  return itemWords.slice(shared).join(" ")
}
