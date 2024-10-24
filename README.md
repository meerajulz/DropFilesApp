# DropFilesApp

**DropFilesApp** is a modern file management web application built with SvelteKit and Tailwind CSS. It allows users to upload, search, and manage files with a drag-and-drop interface, providing a smooth and intuitive user experience. The app is designed to be modular, reusable, and highly responsive, making it a perfect solution for users looking to manage their files efficiently.

## Features:

- **Drag-and-Drop File Upload**: Upload files easily by dragging and dropping them into the app.
- **File Search**: Quickly search for files using a dynamic search bar that filters files in real-time.
- **File List Management**: View uploaded files with details like name, size, and date added.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **Modular Components**: Clean and reusable component structure for easier scalability.

## Project Structure

```
src/
├── assets/
├── lib/
│   └── components/
│       ├── nav/
│       │   ├── Navigation.svelte
│       │   └── NavItem.svelte
│       ├── ui/
│       │   ├── Button.svelte
│       │   ├── DragDrop.svelte
│       │   ├── Header.svelte
│       │   ├── Logo.svelte
│       │   ├── Search.svelte
│       │   ├── FileList.svelte
│       │   └── LoginSignup.svelte
│       └── utils/
│           └── index.ts
├── routes/
│   ├── dashboard/
│   │   ├── +page.svelte
│   │   └── +layout.svelte
│   └── +page.svelte
```

## Developing

Once you've cloned the repository and installed dependencies with `npm install`, you can start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Run ESLint to check for code quality issues

```bash
npm run lint
```

## Run Prettier to format the codebase

```bash
npm run format
```

## Run all unit tests

```bash
npx vitest run
```

## Run tests with coverage

```bash
npx vitest run --coverage
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment.
