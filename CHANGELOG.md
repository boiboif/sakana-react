# sakana-react

## 1.2.1

### Patch Changes

- 2a8ea2e: Support React 19 with React Spring 10 and include the compiled component when packing from source.

## 1.2.0

### Minor Changes

- chore: building migrate from vite to father

### Breaking Changes

```ts
// migrate Component import way

// before
import SakanaReact from 'sakana-react';
// now
import { SakanaReact } from 'sakana-react';
```

# v1.1.2

- chore: Upgrading from react-use-gesture to 👆 @use-gesture/react

# v1.1.0

- feature: Auto resizing support
- refactor: remove height param, height will be same as the width.
