# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2021-09-27

### Added
- Support for Google tag manager to manage Facebook pixel script

### Removed
- Direct injection of Facebook pixel script

## [0.5.0] - 2021-09-20

### Added
- Facebook pixel integration
- Form validation

## [0.4.3] - 2021-09-13

### Added
- Places API now uses AZ as the default language

## [0.4.2] - 2021-09-11

### Added
- Submit button integration with Recaptcha. Appcheck doesn't automatically submit this token, so we have to do it manually

## [0.4.1] - 2021-09-10

### Changed
- Renamed city to province and area to city/village
- Included administrative_area_level_2 from places results, as this more accurately represents the highest region level within the country

## [0.4.0] - 2021-09-09

### Fixed
- Bug causing autocomplete requests to double up

### Changed
- Autocomplete now watches the city field

## [0.3.4] - 2021-09-08

### Changed
- Removed recaptcha lib

## [0.3.2] - 2021-09-08

### Changed
- Switched app check key to use keys associated with the TLD

## [0.3.1] - 2021-09-08

### Changed
- Submit button now invokes the backend for app verification

## [0.3.0] - 2021-09-07

### Added
- Recaptcha V3

## [0.2.1] - 2021-09-04

### Changed
- Updated container to look more sensible on mobile

## [0.2.0] - 2021-09-04

### Added
- Google places Autocomplete integration

[0.6.0]: https://github.com/mujde-aze/nt-dt-register/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/mujde-aze/nt-dt-register/compare/v0.4.3...v0.5.0
[0.4.3]: https://github.com/mujde-aze/nt-dt-register/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/mujde-aze/nt-dt-register/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/mujde-aze/nt-dt-register/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/mujde-aze/nt-dt-register/compare/v0.3.4...v0.4.0
[0.3.4]: https://github.com/mujde-aze/nt-dt-register/compare/v0.3.2...v0.3.4
[0.3.2]: https://github.com/mujde-aze/nt-dt-register/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/mujde-aze/nt-dt-register/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/mujde-aze/nt-dt-register/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/mujde-aze/nt-dt-register/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/mujde-aze/nt-dt-register/compare/v0.2.0...HEAD
