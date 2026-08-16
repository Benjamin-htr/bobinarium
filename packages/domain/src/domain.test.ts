import { Schema } from 'effect'
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  EditionContent,
  Library,
  Work,
  canDeleteLibrary,
  canManageLibraryMembers,
  canWriteLibrary,
} from './index.ts'

const workId = '01989f50-0000-7000-8000-000000000001'
const editionId = '01989f50-0000-7000-8000-000000000002'
const seasonId = '01989f50-0000-7000-8000-000000000003'

describe('domain schemas', () => {
  it('accepts a manually created movie with minimal metadata', () => {
    const movie = Schema.decodeSync(Work)({
      id: workId,
      kind: 'movie',
      title: 'Alien',
    })

    assert.equal(movie.title, 'Alien')
    assert.equal(movie.kind, 'movie')
  })

  it('rejects non-canonical blank titles', () => {
    assert.throws(() =>
      Schema.decodeSync(Work)({
        id: workId,
        kind: 'movie',
        title: '   ',
      }),
    )
  })

  it('rejects malformed locally generated identifiers', () => {
    assert.throws(() =>
      Schema.decodeSync(Library)({
        id: 'not-a-uuid',
        name: 'Ma bibliothèque',
      }),
    )
  })

  it('rejects UUID versions other than v7', () => {
    assert.throws(() =>
      Schema.decodeSync(Library)({
        id: 'fe4b4d4e-bb0d-4f0c-9e6f-4e59db780fec',
        name: 'Ma bibliothèque',
      }),
    )
  })

  it('supports editions containing either works or seasons', () => {
    const workContent = Schema.decodeSync(EditionContent)({
      _tag: 'work',
      editionId,
      workId,
    })
    const seasonContent = Schema.decodeSync(EditionContent)({
      _tag: 'season',
      editionId,
      seasonId,
    })

    assert.equal(workContent._tag, 'work')
    assert.equal(seasonContent._tag, 'season')
  })
})

describe('library permissions', () => {
  it('lets owners and contributors edit the library', () => {
    assert.equal(canWriteLibrary('owner'), true)
    assert.equal(canWriteLibrary('contributor'), true)
    assert.equal(canWriteLibrary('reader'), false)
  })

  it('reserves member management and deletion to the owner', () => {
    assert.equal(canManageLibraryMembers('owner'), true)
    assert.equal(canManageLibraryMembers('contributor'), false)
    assert.equal(canDeleteLibrary('owner'), true)
    assert.equal(canDeleteLibrary('reader'), false)
  })
})
