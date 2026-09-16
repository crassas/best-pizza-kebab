/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ManageRouteImport } from './routes/manage'
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ManageRoute = ManageRouteImport.update({ id: '/manage', path: '/manage', getParentRoute: () => rootRouteImport } as any)
export interface FileRoutesByFullPath { '/': typeof IndexRoute; '/manage': typeof ManageRoute }
export interface FileRoutesByTo { '/': typeof IndexRoute; '/manage': typeof ManageRoute }
export interface FileRoutesById { __root__: typeof rootRouteImport; '/': typeof IndexRoute; '/manage': typeof ManageRoute }
export interface FileRouteTypes { fileRoutesByFullPath: FileRoutesByFullPath; fullPaths: '/' | '/manage'; fileRoutesByTo: FileRoutesByTo; to: '/' | '/manage'; id: '__root__' | '/' | '/manage'; fileRoutesById: FileRoutesById }
export interface RootRouteChildren { IndexRoute: typeof IndexRoute; ManageRoute: typeof ManageRoute }
declare module '@tanstack/react-router' { interface FileRoutesByPath { '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }; '/manage': { id: '/manage'; path: '/manage'; fullPath: '/manage'; preLoaderRoute: typeof ManageRouteImport; parentRoute: typeof rootRouteImport } } }
const rootRouteChildren: RootRouteChildren = { IndexRoute, ManageRoute }
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
declare module '@tanstack/react-start' { interface Register { ssr: true; router: Awaited<ReturnType<typeof getRouter>> } }
