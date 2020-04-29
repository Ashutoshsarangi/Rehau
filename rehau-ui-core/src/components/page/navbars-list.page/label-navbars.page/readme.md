# label-navbars-page

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type            | Default     |
| --------- | --------- | ----------- | --------------- | ----------- |
| `history` | --        |             | `RouterHistory` | `undefined` |


## Dependencies

### Depends on

- [rh-breadcrumbs](../../../molecules/breadcrumbs/rh-breadcrumbs.molecule)
- [rh-divider](../../../molecules/dividers/rh-divider.molecule)
- [rh-navbar](../../../molecules/navbar-items/rh-navbar.molecule)
- [rh-header](../../../molecules/header/rh-header.molecule)
- [rh-checkbox](../../../molecules/inputs/rh-checkbox.molecule)
- [rh-textbox](../../../molecules/inputs/rh-textbox.molecule)
- [rh-primary-button](../../../molecules/buttons/rh-primary-button.molecule)

### Graph
```mermaid
graph TD;
  label-navbars-page --> rh-breadcrumbs
  label-navbars-page --> rh-divider
  label-navbars-page --> rh-navbar
  label-navbars-page --> rh-header
  label-navbars-page --> rh-checkbox
  label-navbars-page --> rh-textbox
  label-navbars-page --> rh-primary-button
  rh-breadcrumbs --> rh-responsive
  rh-breadcrumbs --> rh-icon
  rh-navbar --> rh-icon
  rh-header --> rh-icon
  rh-header --> rh-badges
  rh-header --> rh-primary-button
  style label-navbars-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
