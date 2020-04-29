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
- [rh-progress-bar](../../molecules/progress-bar/rh-progress-bar)

### Graph
```mermaid
graph TD;
  progress-bar-page --> rh-breadcrumbs
  progress-bar-page --> rh-divider
  progress-bar-page --> rh-progress-bar
  rh-breadcrumbs --> rh-responsive
  rh-breadcrumbs --> rh-icon
  style progress-bar-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
