![image](https://github.com/user-attachments/assets/c1d6a790-719d-46c9-85d5-97f88b158bfb)

## Installation
Use npm, pnpm, or bun to install Anni in your project:

```bash
npm install anni
```
```bash
pnpm add anni
```
```bash
bun add anni
```

## Tailwind CSS configuration
To include Anni in your Tailwind CSS build, add the following to your `tailwind.config.js` file.

```tsx
import type { Config } from 'tailwindcss'

export default {
  //... 
  content: [
    //...
    './node_modules/anni/dist/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  //...
} satisfies Config
```

## Usage
Use the toast function to render a toast notification.

#### Add `<Toaster />` to your app.
```tsx
import { Toaster } from 'anni'

export default function RootLayout({
  children
}) {
  return (
    <html>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
```

#### Use `toast` function.

```tsx
import { toast } from 'anni'

export default function App() {
  return (
    <main>
      <button onClick={() => toast('Success Toast 🚀')}>
        Render a toast
      </button>
    </main>
  )
}
```

## Examples
View [examples](https://anni.daustinn.com).
