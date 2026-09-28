# Release guide

The package is published on npm as [atelier-theme](https://www.npmjs.com/package/atelier-theme). Publishing requires an authorized npm maintainer account, two-factor authentication, and an explicit maintainer release decision.

## Before each release

1. Keep the package name `atelier-theme` consistent across workspace dependencies, imports, documentation, and packing scripts.
2. Verify that `repository`, `homepage`, and `bugs` metadata point to the public `msamdan/atelier-ui` repository.
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
