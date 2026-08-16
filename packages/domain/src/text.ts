import { Schema } from 'effect'

export const NonBlankText = Schema.NonEmptyString.check(Schema.isTrimmed())
export type NonBlankText = typeof NonBlankText.Type
