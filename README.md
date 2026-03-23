# Financial Management Web Application

A responsive Angular + PrimeNG financial management workspace inspired by Dasseti-style dashboards. It includes login/logout UI, a dashboard, client management, investment oversight, document handling, and reporting views using mock data.

## Features

- Login/logout UI with reactive form validation.
- Dashboard summary cards for clients, investments, reports/documents, and AUM.
- Client CRUD flows with profile drawer/dialog experience.
- Investment CRUD flows with sortable, filterable, paginated PrimeNG tables.
- Mock document upload and register view.
- Reports page with charts powered by PrimeNG + Chart.js.
- Responsive sidebar/topbar layout.
- Angular routing and reusable services with signal-based mock state.

## Project Structure

```text
src/
  app/
    core/
      models/          # Shared interfaces for clients, investments, documents
      services/        # Mock data and auth services
    features/
      auth/            # Login screen
      dashboard/       # KPI summary and overview tables/charts
      clients/         # Client CRUD and profile dialog
      investments/     # Investment CRUD and analytics table
      documents/       # Mock uploads and document register
      reports/         # Analytics charts
    app.component.*    # Layout shell, sidebar, topbar
    app.routes.ts      # Application routes
  main.ts              # Angular bootstrap and PrimeNG theme config
  styles.scss          # Global theme/layout styles
public/
  favicon.ico
vercel.json            # SPA rewrite config for Vercel deployment
```

## Run Locally

> The environment used to generate this project blocked npm package downloads, so dependencies were not installed here. Once network access to npm is available, run the commands below.

```bash
npm install
npm run start
```

Open `http://localhost:4200`.

## Step-by-Step Angular CLI Setup Commands

If you want to recreate the app from scratch using Angular CLI:

```bash
npx @angular/cli@latest new financial-management-app --routing --style=scss
cd financial-management-app
npm install primeng primeicons @primeuix/themes chart.js
npm run start
```

## Deployment to Vercel

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Deploy the repository to Vercel.
4. The included `vercel.json` rewrites all routes to `index.html` for Angular client-side routing.

## PrimeNG Components Used

- Table
- Dialog
- Reactive Forms inputs
- Toast (shell-ready)
- Sidebar
- Menubar
- Card
- Dropdown
- FileUpload
- Tag
- Chart
