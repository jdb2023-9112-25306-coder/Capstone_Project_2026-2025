# Capstone Project 2026
AquaWell — Groupmate Setup Tutorial

IMPORTANT
- You must be added as a collaborator to the GitHub repository before cloning it.
- Make sure Git and Node.js are installed.
- All commands below are entered in the VS Code Terminal.
- You do NOT need to run git init, git remote add, or git fetch when setting up the project for the first time.
- The repository uses main as the main branch.

================================
TYPE 1 — PNPM SETUP
================================

1. Install pnpm
npm install -g pnpm@latest

2. Install the project dependencies
pnpm i

3. Install React TypeScript definitions
pnpm add -D @types/react @types/react-dom

NOTE:
If @types/react and @types/react-dom are already listed in package.json,
you can skip this step because pnpm i will install them automatically.

4. Start the development server
pnpm dev

The project should be available at:
http://localhost:5173/

================================
TYPE 2 — GIT / GITHUB SETUP
================================

FIRST-TIME SETUP
Everything below is done directly in the VS Code Terminal.

1. Open VS Code.

2. Open the terminal:
   Terminal → New Terminal
   or press Ctrl + `

3. Clone the GitHub repository:
git clone https://github.com/jdb2023-9112-25306-coder/Capstone_Project_2026-2025.git

This downloads the whole project from GitHub.

4. Enter the project folder:
cd Capstone_Project_2026-2025

5. Install the project dependencies:
pnpm i

6. Create your own feature branch:
git switch -c feature/my-module

Example:
git switch -c feature/login-module

Replace my-module with the module or feature you are working on.

7. Start the project:
pnpm dev

You can now edit the project directly in VS Code.


================================
WORKING ON THE PROJECT
================================
You can edit the whole project, not just the src folder.
The cloned repository contains files such as:

src/
package.json
vite.config.ts
README.md
.gitignore
other configuration files

node_modules is normally not downloaded from GitHub because it is excluded
by .gitignore.

Running `pnpm i` downloads and installs the required dependencies locally.


================================
AFTER MAKING YOUR CHANGES
================================

1. Check your changes:
git status

2. Add your changes:
git add .

3. Commit your changes:
git commit -m "Update my module"

Example:
git commit -m "Add login module"

4. Push your branch to GitHub:
git push -u origin feature/my-module

Example:
git push -u origin feature/login-module


================================
PULL REQUEST
================================
After pushing your branch:
1. Open the GitHub repository.
2. Create a Pull Request.
3. Set the branches as:

   Base: main
   Compare: feature/my-module

Example:
main ← feature/login-module

4. Let another group member review the changes.
5. Merge the Pull Request into main after review.


================================
WHEN STARTING WORK AGAIN
================================
Before creating a new feature branch, update your local main:

git switch main
git pull origin main

Then create your new feature branch:

git switch -c feature/my-new-module

Then:
Work → Test → Add → Commit → Push → Pull Request → Merge


================================
QUICK COMMAND SUMMARY
================================

FIRST TIME:

git clone https://github.com/jdb2023-9112-25306-coder/Capstone_Project_2026-2025.git
cd Capstone_Project_2026-2025
pnpm i
git switch -c feature/my-module
pnpm dev

AFTER EDITING:

git status
git add .
git commit -m "Update my module"
git push -u origin feature/my-module

Then create:

feature/my-module → main

Pull Request


================================
IMPORTANT
================================

Do not use:

git push --force

unless specifically instructed.

Do not normally work directly on main.
Use your own feature branch instead.

Before starting new work:

git switch main
git pull origin main
git switch -c feature/my-new-module


================================
BASIC WORKFLOW
================================

GitHub Repository
       ↓
   git clone
       ↓
    VS Code
       ↓
    pnpm i
       ↓
 Create Branch
       ↓
    Edit Code
       ↓
    git add .
       ↓
    git commit
       ↓
    git push
       ↓
 Pull Request
       ↓
     main
