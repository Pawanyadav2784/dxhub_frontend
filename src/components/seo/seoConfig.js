const BRAND_NAME = "DXHUB"
const DEFAULT_DESCRIPTION =
  "Shop smartphones, audio gear, smartwatches, bluetooth speakers, home appliances & IT accessories at DXHUB."

const getSiteUrl = () =>
  (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "")

export { BRAND_NAME, DEFAULT_DESCRIPTION, getSiteUrl }

