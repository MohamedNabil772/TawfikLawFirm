import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  // add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // smooth-ish default; you already use CSS smooth in <main>
    if (savedPosition) return savedPosition
    return { left: 0, top: 0 }
  },
})

function isPageReload() {
  try {
    const nav = performance.getEntriesByType?.('navigation')?.[0]
    if (nav && 'type' in nav) return nav.type === 'reload'
    // fallback (deprecated API)
    // eslint-disable-next-line deprecation/deprecation
    return performance?.navigation?.type === 1
  } catch {
    return false
  }
}

// After the router is ready, normalize URL only on hard reload
router.isReady().then(() => {
  if (!isPageReload()) return

  const { path, hash, query } = router.currentRoute.value
  const hasHashOrQuery = !!hash || (query && Object.keys(query).length > 0)
  // Always normalize to "/", stripping hash & query
  if (path !== '/' || hasHashOrQuery) {
    router.replace({ path: '/', hash: '', query: {} })
  }
})

export default router
