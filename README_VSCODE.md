# Hexaware Learning Platform - Visual Studio Code Setup

## Prerequisites

Before running this project in Visual Studio Code, make sure you have the following installed:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Visual Studio Code**
   - Download from: https://code.visualstudio.com/

3. **Git** (optional but recommended)
   - Download from: https://git-scm.com/

## Step-by-Step Setup Instructions

### 1. Open the Project in VS Code

1. Open Visual Studio Code
2. Click on **File** → **Open Folder**
3. Navigate to and select the project folder containing this code
4. VS Code will open the project

### 2. Install Recommended Extensions

When you open the project, VS Code should automatically prompt you to install recommended extensions. Click **Install All** or install them manually:

**Essential Extensions:**
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **TypeScript Importer** (pmneo.tsimporter)
- **Auto Rename Tag** (formulahendry.auto-rename-tag)
- **Path Intellisense** (christian-kohler.path-intellisense)

### 3. Install Dependencies

Open the integrated terminal in VS Code:
- **Windows/Linux:** `Ctrl + `` (backtick)
- **Mac:** `Cmd + `` (backtick)

Or go to **Terminal** → **New Terminal**

Run the following command to install all dependencies:

```bash
npm install
```

### 4. Start the Development Server

In the terminal, run:

```bash
npm run dev
```

This will:
- Start the Vite development server
- Open your default browser to `http://localhost:5173`
- Enable hot module replacement (HMR) for instant updates

### 5. Alternative Ways to Run the Project

#### Method 1: Using VS Code Tasks
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Tasks: Run Task"
3. Select "npm: dev"

#### Method 2: Using the Run and Debug Panel
1. Click on the **Run and Debug** icon in the sidebar (or press `Ctrl+Shift+D`)
2. Select "Launch Chrome" from the dropdown
3. Click the green play button

#### Method 3: Using NPM Scripts Panel
1. In the Explorer sidebar, look for "NPM SCRIPTS"
2. Expand it and click the play button next to "dev"

## Project Structure

```
hexaware-learning-platform/
├── .vscode/                 # VS Code configuration
│   ├── settings.json       # Workspace settings
│   ├── extensions.json     # Recommended extensions
│   ├── launch.json         # Debug configuration
│   └── tasks.json          # Task definitions
├── src/                    # Source code
│   ├── components/         # React components
│   ├── context/           # React context
│   ├── data/              # Mock data
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README_VSCODE.md       # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Included

### 🎯 **Core Features**
- **Multi-role Authentication** (Employee/Admin)
- **AI-Powered Assessments** (Quiz & Coding challenges)
- **Personalized Learning Paths**
- **Real-time Progress Tracking**
- **Admin Dashboard** with analytics
- **Agentic Framework Monitoring**

### 🤖 **GenAI Integration**
- Adaptive assessment questions
- Intelligent content generation
- Personalized recommendations
- Real-time feedback system

### 👥 **Demo Users**
**Employees:**
- praveen@hexaware.com / password123 (Senior Developer)
- vittal@hexaware.com / password123 (DevOps Engineer)
- esther@hexaware.com / password123 (Data Analyst)
- laksshaiya@hexaware.com / password123 (QA Engineer)
- john@hexaware.com / password123 (New Employee)
- sarah@hexaware.com / password123 (New Employee)

**Admin:**
- admin@hexaware.com / admin123

## Troubleshooting

### Common Issues and Solutions

1. **Port 5173 is already in use**
   ```bash
   # Kill the process using the port
   npx kill-port 5173
   # Or use a different port
   npm run dev -- --port 3000
   ```

2. **Dependencies not installing**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   - Make sure you have the TypeScript extension installed
   - Restart the TypeScript language server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

4. **Tailwind CSS not working**
   - Ensure the Tailwind CSS IntelliSense extension is installed
   - Check that `tailwind.config.js` is properly configured

5. **ESLint errors**
   - Install the ESLint extension
   - Run `npm run lint` to see all linting issues

## Development Tips

### 🔧 **VS Code Shortcuts**
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+`` - Toggle Terminal
- `Ctrl+Shift+E` - Explorer
- `Ctrl+Shift+D` - Run and Debug
- `F5` - Start Debugging
- `Ctrl+Shift+F` - Search in Files

### 🎨 **Code Formatting**
- Files are automatically formatted on save using Prettier
- Use `Shift+Alt+F` to manually format a file

### 🔍 **Debugging**
- Set breakpoints by clicking in the gutter next to line numbers
- Use the Debug Console to inspect variables
- The browser DevTools are also available for debugging

### 📁 **File Navigation**
- Use `Ctrl+P` to quickly open files
- Use `Ctrl+Shift+O` to navigate to symbols in the current file
- Use `Ctrl+T` to search for symbols across the workspace

## Browser Compatibility

This application works best in modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Tips

- The development server includes Hot Module Replacement (HMR)
- Changes to your code will be reflected instantly in the browser
- Use the React Developer Tools browser extension for better debugging

## Getting Help

If you encounter any issues:
1. Check the terminal for error messages
2. Look at the browser console for JavaScript errors
3. Ensure all dependencies are properly installed
4. Restart the development server if needed

## Next Steps

Once the application is running:
1. Try logging in with different demo users
2. Explore the employee dashboard and learning features
3. Test the admin panel with the admin credentials
4. Experiment with the AI-powered assessments
5. Check out the real-time agent monitoring

Happy coding! 🚀