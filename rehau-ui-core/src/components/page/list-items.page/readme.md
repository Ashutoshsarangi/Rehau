# list-items-page

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type            | Default     |
| --------- | --------- | ----------- | --------------- | ----------- |
| `history` | --        |             | `RouterHistory` | `undefined` |


## Dependencies

### Depends on

- [rh-breadcrumbs](../../molecules/breadcrumbs/rh-breadcrumbs.molecule)
- [rh-divider](../../molecules/dividers/rh-divider.molecule)
- [rh-list-item](../../molecules/list items/rh-list-item.molecule)
- [rh-list-item-check](../../molecules/list items/rh-list-item-check.molecule)

### Graph
```mermaid
graph TD;
  list-items --> rh-breadcrumbs
  list-items --> rh-divider
  list-items --> rh-list-item
  list-items --> rh-list-item-check
  rh-breadcrumbs --> rh-responsive
  rh-breadcrumbs --> rh-icon
  rh-list-item --> rh-icon
  rh-list-item-check --> rh-icon
  style list-items fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
