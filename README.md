# erp-front-end

Front end of a small ERP (sales and inventory management) that I built for a food-industry business. It handles clients, products and the full life of a sale, from order entry to invoicing. The UI is in Spanish.

The API it talks to lives in [`erp-back-end`](https://github.com/felipeospina21/erp-back-end).

## Features

- **Login**: session-based auth against the back end
- **Clients**: create, edit and list clients
- **Products**: product catalog with categories, product forms and stock updates
- **Sales** (`/ventas`):
  - new sale form (`nueva-venta`)
  - open sales (`ventas-abiertas`)
  - sales list (`listado-ventas`)
  - status tracking through production, dispatch, delivery, invoicing and payment
- **PDF documents**: invoices and packing lists generated in the browser with `pdf-lib`
- **Cities lookup**: city data from a public open-data API (datos.gov)
- **Drag and drop** in the sales workflow (`react-dnd`)

## Tech stack

- [Next.js](https://nextjs.org/) 12 (pages router), React 17 and TypeScript
- Redux Toolkit and RTK Query
- Chakra UI and Framer Motion
- React Hook Form
- `pdf-lib` for PDFs
- Jest, React Testing Library and MSW for tests
- ESLint, Prettier, Husky and lint-staged

## Getting started

```bash
npm install
```

Create a `.env.local` file with these variables (values are specific to your setup):

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_COUNT_ID=
NEXT_PUBLIC_SALE_REF_COUNT_ID=
NEXT_PUBLIC_DATOS_GOV_URL=
NEXT_PUBLIC_DATOS_GOV_API_TOKEN=
```

`NEXT_PUBLIC_API_URL` should point to a running `erp-back-end`.

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm start            # Run the production build
npm run lint         # ESLint
npm test             # Jest
npm run test-cover   # Jest with coverage
```

## Project structure

```
src/
├── pages/        # login, clientes, productos, costos and ventas/*
├── components/   # Clients, Products, Sales, Login and Shared UI
├── redux/        # Store, slices (user, clients, sales, shipping) and RTK Query services
├── utils/        # PDF generation, formatting and test utilities (MSW, mock data)
├── hooks/
├── config/
└── styles/
__test__/         # Page-level tests
```

> This was a personal project and is no longer actively maintained. The `costos` page is a placeholder.
