import type { Category, NavGroup, NavItem } from "@/types/api"

export interface CategoryGroup {
  id: string
  name: string
  slug: string | null
  description: string | null
  icon_url: string | null
  items: Category[]
}

function toNavItem({ name, slug, description, icon_url }: Category): NavItem {
  return { name, slug, description, icon_url }
}

export function withPublishedPosts(tree: Category[]): Category[] {
  return tree
    .filter((category) => (category.post_count ?? 0) > 0)
    .map((category) => ({
      ...category,
      children: category.children.filter((child) => (child.post_count ?? 0) > 0),
    }))
}

export function buildCategoryGroups(allCategories: Category[]): CategoryGroup[] {
  const tree = withPublishedPosts(allCategories)
  const groups: CategoryGroup[] = tree
    .filter((category) => category.children.length > 0)
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon_url: category.icon_url,
      items: category.children,
    }))

  const standalone = tree.filter((category) => category.children.length === 0)
  if (standalone.length > 0) {
    groups.push({
      id: "more-topics",
      name: groups.length > 0 ? "More Topics" : "Topics",
      slug: null,
      description: null,
      icon_url: null,
      items: standalone,
    })
  }

  return groups
}

export function buildNavGroups(tree: Category[]): NavGroup[] {
  return buildCategoryGroups(tree).map(({ name, slug, description, icon_url, items }) => ({
    name,
    slug,
    description,
    icon_url,
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
