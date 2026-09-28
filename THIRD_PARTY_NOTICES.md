# Third-party notices

Atelier's original code and theme are MIT-licensed. Third-party software and assets retain their own licenses; the root LICENSE does not relicense them.

| Component                            | Source                                   | License                                         |
| ------------------------------------ | ---------------------------------------- | ----------------------------------------------- |
| Angular                              | https://github.com/angular/angular       | MIT                                             |
| Analog                               | https://github.com/analogjs/analog       | MIT                                             |
| Taiga UI core, kit, and styles       | https://github.com/taiga-family/taiga-ui | Apache-2.0                                      |
| Icons distributed by @taiga-ui/icons | https://github.com/lucide-icons/lucide   | ISC, including the upstream Feather attribution |
| Inter font                           | https://github.com/rsms/inter            | SIL Open Font License 1.1                       |

The copied icon license is included in `public/icons/LICENSE` so it accompanies the assets in production. An additional copy is in `docs/licenses/Lucide-ISC.txt`. Inter's full license is preserved in `docs/licenses/Inter-OFL.txt` and `public/licenses/Inter-OFL.txt`.

Installed dependencies include their own package metadata and notices. Consult those licenses when redistributing a bundled build. `pnpm-lock.yaml` records exact dependency versions.

The separately packed `atelier-theme` package contains only Atelier's styles, small configuration helpers, declarations, and documentation. It does not bundle Angular, Taiga UI, icons, or fonts. Taiga UI is an optional peer because the semantic tokens and helpers can be consumed independently.

The visual direction is inspired by shadcn/ui and Radix. Neither is a dependency, and this project is not affiliated with or endorsed by those projects, Angular, Analog, or Taiga UI.
