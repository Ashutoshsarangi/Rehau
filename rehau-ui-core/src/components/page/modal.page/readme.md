# loader-page



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type            | Default     |
| --------- | --------- | ----------- | --------------- | ----------- |
| `history` | --        |             | `RouterHistory` | `undefined` |


## Dependencies

### Depends on

- [rh-breadcrumbs](../../molecules/breadcrumbs/rh-breadcrumbs.molecule)
- [rh-divider](../../molecules/dividers/rh-divider.molecule)
- [rh-modal](../../molecules/modal/rh-modal)

### Graph
```mermaid
graph TD;
  modal-page --> rh-breadcrumbs
  modal-page --> rh-divider
  modal-page --> rh-modal
  rh-breadcrumbs --> rh-responsive
  rh-breadcrumbs --> rh-icon
  rh-modal --> rh-primary-button
  style modal-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
