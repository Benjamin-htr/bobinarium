import { Schema } from 'effect'

import { EditionId, LibraryId, OwnedItemId, UserId } from './id.ts'
import { NonBlankText } from './text.ts'

export const OwnedItem = Schema.Struct({
  id: OwnedItemId,
  libraryId: LibraryId,
  editionId: EditionId,
  createdBy: UserId,
  notes: Schema.optionalKey(NonBlankText),
})
export type OwnedItem = typeof OwnedItem.Type
