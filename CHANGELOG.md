# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-11-02

### Fixed

- Added support for prettier-plugin-solidity v2.x (now supports both v1.x and v2.x)
- Fixed peer dependency conflict when using prettier-plugin-solidity v2.0.0+

## [1.0.1] - 2025-11-02

### Changed

- Minor documentation improvements

## [1.0.0] - 2025-11-02

### Added

- Initial release of prettier-plugin-solidity-align-comments
- Auto-alignment of trailing comments in consecutive lines
- Optional fixed column alignment via `solidityAlignColumn` option
- Seamless integration with prettier-plugin-solidity
- Support for Prettier v3
- Comprehensive README with examples
- MIT License

### Features

- Detects and aligns groups of consecutive lines with trailing comments
- Preserves original formatting for non-aligned comments
- Works with all Solidity constructs (variables, mappings, functions, etc.)
- Zero-configuration required (works with sensible defaults)
