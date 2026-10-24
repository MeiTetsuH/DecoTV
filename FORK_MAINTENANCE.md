# Fork maintenance notes

Recorded maintenance baseline: 2026-10-24. This is a snapshot, not a promise that upstream or advisory data is still current.

- Upstream: [https://github.com/Decohererk/DecoTV](https://github.com/Decohererk/DecoTV)
- Integrated upstream commit: [`c02a9db1e9d19606c98a884d23610eef8a7c029b`](https://github.com/Decohererk/DecoTV/commit/c02a9db1e9d19606c98a884d23610eef8a7c029b)
- Verified maintenance code commit: `4e41144d997612ce80da24e7e58e37173b76350e`
- Deployment branch: `main`

This fork deploys the application on Vercel with HTTP-based Upstash storage. It intentionally differs from the Docker-oriented upstream deployment.

## Preserve these fork differences

| Paths | Intent |
| --- | --- |
| `README.md, .env.example, vercel.json, next.config.js` | Keep the Vercel deployment instructions, API/proxy/cron configuration, and non-standalone output. |
| `src/lib/db.ts, src/lib/upstash.db.ts` | Keep lazy storage initialization and the existing environment-variable aliases. A successful build using the memory fallback does not prove production Upstash connectivity. |
| `src/lib/auth.ts; src/app/api/` | Keep the Vercel-compatible authentication, request, streaming, download, search, and cron adaptations. Review upstream changes individually; do not replace this tree wholesale. |
| `Dockerfile, start.js, proxy.worker.js, .github/workflows/docker-image.yml, src/lib/redis*.ts, src/lib/kvrocks.db.ts` | These Docker/direct-Redis paths were intentionally removed from this deployment fork. Do not restore them incidentally during an upstream merge. |
| `__tests__/auth-mode.test.js, playback-probe.test.js, private-library-stream.test.js, video-quality.test.js` | Preserve the deployment-specific regression coverage. |

See [README](README.md) for this fork deployment and [TMDB/private library guidance](docs/tmdb-private-library-deployment.md) for feature-specific environment names. Some upstream feature guidance describes Docker; this fork remains Vercel/Upstash oriented.

## Dependency and runtime baseline

Node `.nvmrc` 24.22.1, `engines.node >=24.22.1 <25`, pnpm 10.14.0, Next 16.4.2, React 19.3.1. Use `pnpm-lock.yaml`; do not create an npm lockfile.

Unused direct Swiper and Zod dependencies were removed after a tracked-source reference search. The ESLint hooks plugin explicitly supports Zod 3 or 4; only its dependency path is selected to Zod 4.6.7. Do not force Zod 4 onto consumers that only support Zod 3.

The manifest and committed lockfile are authoritative for exact dependency resolution. Review both direct and transitive changes; avoid mixing package managers.

## Resolution policy and removal conditions

| Scoped selection | Current declaration | Reason |
| --- | --- | --- |
| `@commitlint/is-ignored>semver` | `^7.5.2` | Avoid the vulnerable legacy semver resolution in commit tooling. |
| `eslint-plugin-react-hooks@7.1.1>zod` | `4.6.7` | Select the patched Zod 4 line already allowed by the parent declaration. |

For every entry above, remove or narrow it only after the parent dependency naturally resolves a patched compatible version, a fresh lockfile proves the vulnerable path is absent, the affected tests pass, and the relevant application/docs/MCP build passes. Change one dependency family at a time. Preserve parent-specific major-version constraints. Do not use audit suppression or a fabricated package version as a substitute for a fix.

## Known limitations at this baseline

The recorded full dependency audit returned zero findings. Authentication, storage and playback still require independent deployment checks; a login-page smoke check does not cover those authenticated operations.

## Future upstream sync and release

1. Compare upstream changes against the preserved paths above and keep unrelated local work intact.
2. Use the repository package manager and lockfile; review scoped overrides and affected regression tests.
3. Keep source checks, CI, provider build readiness, live-page checks, and external-service behavior as separate evidence.
4. Inspect added files and diffs for credentials before publishing. Store real credentials, deployment addresses for private services, user data and environment values outside Git.
5. After the reviewed commit is deployed, verify the intended domain and indexing policy. Remove only task-created branches that are already merged; preserve unrelated and unmerged branches.
