import { Schema } from 'effect'

import { EditionId, SeasonId, WorkId } from './id.ts'
import { NonBlankText } from './text.ts'

export const WorkKind = Schema.Literals(['movie', 'series'])
export type WorkKind = typeof WorkKind.Type

export const ReleaseYear = Schema.Int.check(
  Schema.isBetween({ minimum: 1800, maximum: 9999 }),
)
export type ReleaseYear = typeof ReleaseYear.Type

export const Work = Schema.Struct({
  id: WorkId,
  kind: WorkKind,
  title: NonBlankText,
  originalTitle: Schema.optionalKey(NonBlankText),
  releaseYear: Schema.optionalKey(ReleaseYear),
})
export type Work = typeof Work.Type

export const SeasonNumber = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0))
export type SeasonNumber = typeof SeasonNumber.Type

export const Season = Schema.Struct({
  id: SeasonId,
  seriesId: WorkId,
  number: SeasonNumber,
  title: Schema.optionalKey(NonBlankText),
})
export type Season = typeof Season.Type

export const PhysicalMediaFormat = Schema.Literals([
  'dvd',
  'blu-ray',
  'blu-ray-uhd',
  'vhs',
  'other',
])
export type PhysicalMediaFormat = typeof PhysicalMediaFormat.Type

export const Edition = Schema.Struct({
  id: EditionId,
  name: NonBlankText,
  format: PhysicalMediaFormat,
  otherFormatName: Schema.optionalKey(NonBlankText),
  barcode: Schema.optionalKey(NonBlankText),
  region: Schema.optionalKey(NonBlankText),
  publisher: Schema.optionalKey(NonBlankText),
})
export type Edition = typeof Edition.Type

export const WorkEditionContent = Schema.Struct({
  _tag: Schema.Literal('work'),
  editionId: EditionId,
  workId: WorkId,
})
export type WorkEditionContent = typeof WorkEditionContent.Type

export const SeasonEditionContent = Schema.Struct({
  _tag: Schema.Literal('season'),
  editionId: EditionId,
  seasonId: SeasonId,
})
export type SeasonEditionContent = typeof SeasonEditionContent.Type

export const EditionContent = Schema.Union([
  WorkEditionContent,
  SeasonEditionContent,
])
export type EditionContent = typeof EditionContent.Type
