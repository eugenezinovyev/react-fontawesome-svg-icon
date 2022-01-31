# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.1.1] - 2022-01-31
### Added
- 17.x Node version build.
- IE11 support for the documentation application.
- Linting for the readme built scripts.
- Custom scripts to replace lerna because it is unmaintained.

### Changed
- Readme integrated into the documentation application prebuilt now to remove react-markdown dependency from runtime.
- Documentation application moved to Typescript.
- ESLint configuration for the documentation application to support automatic runtime.
- Webpack configuration moved to ESM.
- Documentation application split into chunks to let them load in parallel.
- Consolidated dependencies versions.

### Removed
- 12.x Node version build.
- "react-markdown" dependency.
- Removed redundant files.
- Removed "lerna" dependency.

### Fixed
- Type of the FontAwesomeSvgIcon component to support ref forwarding in Typescript based applications.

## [1.1.0] - 2022-01-17
### Added
- SVG symbols support.
- Documentation application with features demo.
- Project icon and favicon generation.
- Baseline and comparison application assets sizes added to README.
- Netlify deployment. Redirects handling included to let react-router open a correct page.
- "syncpack:mismatches" script to track dependencies version mismatch.
- Demo section included into README leading to the documentation application.

### Changed
- Feature Support README section now refers to the documentation application on Netlify.
- Simplified sub-packages structure.
- Updated dependencies.
- README custom build scripts to get a better control over the process.

### Removed
- Feature comparison application because of the documentation application added.

### Fixed
- Fix links and package name of the official package in README.

## [1.0.5] - 2021-12-20
### Added
- CodeQL analysis.
- Configured ESLint.
- SVG element "role" property support.
- Display name for the FontAwesomeSvgIcon component for better React Dev Tools support.

### Changed
- Corrected links to the official package in README.
- Changed code style of the feature comparison application according to ESLint.
- Moved feature comparison application components into separate files.

## [1.0.4] - 2021-11-15
### Added
- Codecov integration and badge.

## [1.0.3] - 2021-11-15
### Changed
- Consolidated sub-packages versions.

## [1.0.2] - 2021-11-14
### Removed
- @webpack-cli/generators and prettier dependencies from comparison applications.

## [1.0.1] - 2021-11-14
### Changed
- Package name because of duplication.
- CRA setup with a custom setup for feature comparison application because of found vulnerabilities.

## [1.0.0] - 2021-11-14
### Added
- Icons, sizes, custom classes, custom styles, color, color inversion, title, bordered icons, fixed width icons, flipped icons, spin and pulse animations support
- Readme sections and comparison applications to build an up-to-date README file.
- Feature comparison application to let compare implemented functionality with the official package.

[Unreleased]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.0.5...v1.1.0
[1.0.5]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/eugenezinovyev/react-fontawesome-svg-icon/releases/tag/v1.0.0
