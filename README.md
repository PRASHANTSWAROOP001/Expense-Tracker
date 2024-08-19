# Expense Tracker React App

A comprehensive and responsive expense tracker application built using React. This project enables users to efficiently track income and expenses, with features like data sorting, pagination, and a clean user interface.

## Features

- **Income & Expense Tracking**: Easily record and manage your financial transactions, categorized by income or expense.
- **Dynamic Data Display**: Utilizes TanStack React Table to render transaction data dynamically with support for sorting and pagination.
- **Sorting Options**: Sort transactions by time, category, amount, or description to find the information you need quickly.
- **Pagination**: Easily navigate through large amounts of data with built-in pagination controls.
- **Responsive Design**: Styled using Tailwind CSS to ensure the application is responsive and visually appealing across different devices.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. [Download Node.js](https://nodejs.org/)
- **Vite**: Leverage Vite to create your React app for optimized development. [Learn more about Vite](https://vitejs.dev/)
- **Tailwind CSS**: Use Tailwind CSS for styling your app. Follow the official [Tailwind CSS documentation](https://tailwindcss.com/docs/installation) for Vite.
- **TanStack React Table**: Install TanStack React Table to handle data display with sorting and pagination features.

### Installation

1. **Create a React App using Vite:**
   ```bash
   npm create vite@latest expense-tracker-app --template react
   cd expense-tracker-app
   ```

2. **Install Dependencies**
```bash
npm install
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
3. **Configure Tailwind CSS:**
    
- Follow the setup instructions from the [Tailwind CSS](https://tailwindcss.com/docs/installation)  documentation for Vite.

4. **Install React Icons**
```bash
npm install react-icons --save
```

5. **Install React Table**
```bash

npm install @tanstack/react-table

```

6. **Runing The App**
```bash
npm run dev
``` 
7. **File Structure**
```
.
├── public
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   │   └── expenses.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js

```


## Live Demo

- [Expense Tracker React App Link](https://prashantswaroop001.github.io/Expense-Tracker/)

## Acknowledgments
- Thanks to [Vite](https://vitejs.dev/) for making development fast and easy.
- [Tailwind CSS](https://tailwindcss.com/) for providing a modern and flexible styling framework.
- [React Icons](https://react-icons.github.io/react-icons/) for offering a comprehensive set of icons.
- Thanks to [React](https://reactjs.org/) for providing an excellent framework for building user interfaces.
- [TanStack React Table](https://tanstack.com/table/v8) for powerful table components and functionality.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
