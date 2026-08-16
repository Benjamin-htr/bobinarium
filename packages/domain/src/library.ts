import { Schema } from 'effect'

import { LibraryId, UserId } from './id.ts'
import { NonBlankText } from './text.ts'

export const Library = Schema.Struct({
  id: LibraryId,
  name: NonBlankText,
})
export type Library = typeof Library.Type

export const LibraryRole = Schema.Literals(['owner', 'contributor', 'reader'])
export type LibraryRole = typeof LibraryRole.Type

export const Membership = Schema.Struct({
  libraryId: LibraryId,
  userId: UserId,
  role: LibraryRole,
})
export type Membership = typeof Membership.Type

export const canWriteLibrary = (role: LibraryRole): boolean =>
  role === 'owner' || role === 'contributor'

export const canManageLibraryMembers = (role: LibraryRole): boolean =>
  role === 'owner'

export const canDeleteLibrary = (role: LibraryRole): boolean => role === 'owner'
