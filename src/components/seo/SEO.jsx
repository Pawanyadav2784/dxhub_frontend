import { useEffect } from "react"
import { BRAND_NAME, DEFAULT_DESCRIPTION, getSiteUrl } from "./seoConfig"

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", rel)
    document.head.appendChild(element)
  }
  element.setAttribute("href", href)
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = "/logo.jpeg",
  type = "website",
  noIndex = false,
  schema,
}) => {
  useEffect(() => {
    const siteUrl = getSiteUrl()
    const canonicalUrl = `${siteUrl}${path || window.location.pathname}`
    const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`
    const pageTitle = title ? `${title} | ${BRAND_NAME}` : `${BRAND_NAME} | Premium Electronics & Smart Gadgets`

    document.title = pageTitle
    document.documentElement.lang = "en-IN"

    upsertMeta('meta[name="description"]', { name: "description", content: description })
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    })
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle })
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description })
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl })
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl })
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: BRAND_NAME })
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" })
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle })
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description })
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl })
    upsertLink("canonical", canonicalUrl)

    let schemaElement = document.getElementById("seo-structured-data")
    if (schema) {
      if (!schemaElement) {
        schemaElement = document.createElement("script")
        schemaElement.id = "seo-structured-data"
        schemaElement.type = "application/ld+json"
        document.head.appendChild(schemaElement)
      }
      schemaElement.textContent = JSON.stringify(schema)
    } else if (schemaElement) {
      schemaElement.remove()
    }
  }, [description, image, noIndex, path, schema, title, type])

  return null
}

export default SEO
