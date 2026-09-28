# Release guide

The repository is prepared for local packaging. Publishing requires an npm account, permission to the chosen package name or scope, and an explicit maintainer release decision. A GitHub username does not establish npm ownership.

## Before the first release

1. Confirm the final name. `atelier-theme` is a provisional workspace name, not a reserved npm name. For a scoped name, update the theme package, workspace dependency, imports, documentation, and packing scripts together.
2. Confirm the public GitHub repository URL, then add `repository`, `homepage`, and `bugs` metadata to both package manifests. Do not advertise a repository or npm URL that does not exist.
3. Verify the npm account and package access. Prefer npm trusted publishing once a dedicated release workflow has been reviewed; do not commit tokens.
4. Review the package README, license, third-party notices, supported versions, and tarball contents.

## Build and verify

```sh
pnpm install --frozen-lockfile
pnpm format:check
pnpm test:ci
pnpm build
pnpm test:package
```

`pnpm pack:theme` produces `artifacts/atelier-theme-0.1.0.tgz`. The packed-consumer check creates a temporary isolated project, installs this tarball offline, checks runtime exports and types, and checks the compiled stylesheet. It does not publish anything.

## Versioning

Update the theme's `package.json`, the root app version when appropriate, and `CHANGELOG.md`. The CSS banner is generated from the package version. Keep the footer version aligned with the demo. For pre-1.0 versions, document incompatible API or token changes prominently in a new minor version.

## Publish only after review

Once the name and account are confirmed and the exact tarball has been reviewed, a maintainer can publish that tarball with npm using public access. CI currently builds, tests, and packages only; it cannot publish or create GitHub releases.

After publishing, update the installation examples, changelog, and compatibility notes with the actual released version and links. Add a Git tag and release notes for that version.
