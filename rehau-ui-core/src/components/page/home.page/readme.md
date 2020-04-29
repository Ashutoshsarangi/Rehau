# headers-page

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type            | Default     |
| --------- | --------- | ----------- | --------------- | ----------- |
| `history` | --        |             | `RouterHistory` | `undefined` |


## Dependencies

### Depends on

- [rh-breadcrumbs](../../molecules/breadcrumbs/rh-breadcrumbs.molecule)
- [rh-divider](../../molecules/dividers/rh-divider.molecule)
- [rh-header](../../molecules/header/rh-header.molecule)

### Graph
```mermaid
graph TD;
  headers-page --> rh-breadcrumbs
  headers-page --> rh-divider
  headers-page --> rh-header
  rh-breadcrumbs --> rh-responsive
  rh-breadcrumbs --> rh-icon
  rh-header --> rh-icon
  rh-header --> rh-badges
  rh-header --> rh-primary-button
  style headers-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
