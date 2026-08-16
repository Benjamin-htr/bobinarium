import { Schema } from 'effect'

const UuidV7 = Schema.String.check(Schema.isUUID(7))

export const UserId = UuidV7.pipe(Schema.brand('UserId'))
export type UserId = typeof UserId.Type

export const LibraryId = UuidV7.pipe(Schema.brand('LibraryId'))
export type LibraryId = typeof LibraryId.Type

export const WorkId = UuidV7.pipe(Schema.brand('WorkId'))
export type WorkId = typeof WorkId.Type

export const SeasonId = UuidV7.pipe(Schema.brand('SeasonId'))
export type SeasonId = typeof SeasonId.Type

export const EditionId = UuidV7.pipe(Schema.brand('EditionId'))
export type EditionId = typeof EditionId.Type

export const OwnedItemId = UuidV7.pipe(Schema.brand('OwnedItemId'))
export type OwnedItemId = typeof OwnedItemId.Type
