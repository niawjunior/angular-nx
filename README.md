# Running on Local with Mock server

```
npm run server
// open new terminal to start application
npm run serve
```

# Running on Local with Production environment

```
npm run serve:prd

* config endpoint for production
~/libs/app-config/src/lib/app-config-model.ts
```

# Build Production

```
npm run build:prd
```

### create libs

```
example
nx g @nrwl/angular:lib <lib name>
```

### create pages in module

```
example
nx workspace-schematic create-module-page
* After page created must be manual import to that module
```

### create component in module

```
example
nx workspace-schematic create-module-component
* After component created must be manual import to that module
```

### create utils

```
example
nx g @nrwl/angular:lib utils/<util name>
```

### create shared component

```
example
nx workspace-schematic create-shared <component name>
```

### create module

```
example
nx workspace-schematic create-module <module name>
```

### create api

```
example
nx workspace-schematic create-api <api name>
* Prefix must start with api-
* example api-auth
```

# Migrate to new version

```
rm -rf node_modules
npm install (or yarn install)
nx migrate latest
npm install (or yarn install)
nx migrate --run-migrations=migrations.json
```

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)
