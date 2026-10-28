# Examples

| Example                                                      | What it shows                                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [api/label-matrix.mjs](api/label-matrix.mjs)                 | a11ylabel from JavaScript: one row per app with the status of each of the nine labels                               |
| [shell/blocked-labels.sh](shell/blocked-labels.sh)           | Filtering the JSON report with `jq`: each blocked label with the errors that block it                               |
| [github-actions/a11ylabel.yml](github-actions/a11ylabel.yml) | A workflow for an app repository: the labels you claim checked on every pull request, the report in the job summary |

Run the first two from the repository root after `npm ci && npm run build`:

```sh
node examples/api/label-matrix.mjs
sh examples/shell/blocked-labels.sh fixtures/native-swiftui-blocked
```

`label-matrix.mjs` imports `@mcamdali/a11ylabel` by name; inside this repository that resolves to
the package itself, so it runs the code you just built. The tests run all three on every change.
