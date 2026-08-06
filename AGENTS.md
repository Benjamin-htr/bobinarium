## Vendored repositories

External repositories are vendored under `repos/`.

- Treat files under `repos/` as read-only reference material.
- Use `repos/effect/` when working with Effect code, especially for idiomatic usage, tests, module structure, and API design.
- Prefer patterns from the vendored source over guesses or web search when the relevant source exists locally.
- Do not edit files under `repos/` unless explicitly asked.
- Do not import from `repos/`; application code should import from normal package dependencies.

When writing Effect code, read `repos/effect/LLMS.md` first if it exists.

## Updating vendored Effect

When `repos/effect/` is no longer aligned with the `effect` version installed by this project, update the subtree to the matching upstream tag.

1. Read the installed version from `pnpm-lock.yaml` or `pnpm list effect`.
2. Replace `<installed-effect-version>` below with that version, prefixed by `v`:

```sh
git subtree pull --prefix=repos/effect https://github.com/Effect-TS/effect.git v<installed-effect-version> --squash
```

For example, if the installed package is `effect@4.0.0-beta.104`, use:

```sh
git subtree pull --prefix=repos/effect https://github.com/Effect-TS/effect.git v4.0.0-beta.104 --squash
```
