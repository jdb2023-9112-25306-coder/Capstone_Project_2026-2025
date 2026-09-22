## About the Project

**AquaWell** is a comprehensive web-based management system designed for water refilling stations. It streamlines online refill requests, automates daily business operations, enables real-time delivery tracking, and utilizes demand forecasting to optimize inventory management.

---

### Key Objectives & Core Features

* **Customer Request Management:** Web portal for placing water refill requests, selecting pickup/delivery preferences, and managing orders.
* **Delivery Tracking Module:** Real-time order progress tracking for customers, with driver assignment and live status updates for administrators.
* **Inventory Management:** Live water and container stock monitoring with automated low-stock alerts.
* **Sales & Automated Reporting:** Financial transaction logging, payment tracking, and automated generation of operational summaries.
* **Demand Forecasting & Trend Analysis:** Uses the **Weighted Moving Average (WMA)** method to predict future container demand and analyze sales trends.
* **HR & Role Management:** Staff record management with role-based access control (Admin, Staff, Delivery Personnel).
* **ISO/IEC 25010 Software Evaluation:** System quality validated through User Acceptance Testing (UAT) and System Usability Scale (SUS) surveys focusing on *Functional Suitability, Performance Efficiency, Usability,* and *Reliability*.


### IMPORTANT
* You must be added as a collaborator to the GitHub repository before cloning it.
* Make sure Git and Node.js are installed.
* All commands below are entered in the VS Code Terminal.
* You do NOT need to run `git init`, `git remote add`, or `git fetch` when setting up the project for the first time.
* The repository uses `main` as the main branch.

---

# TYPE 1 — PNPM SETUP

1. **Install pnpm**
```bash
npm install -g pnpm@latest
```

2. **Install the project dependencies**
```bash
pnpm i
```

3. **Install React TypeScript definitions**
```bash
pnpm add -D @types/react @types/react-dom
```

> **NOTE:** If `@types/react` and `@types/react-dom` are already listed in `package.json`, you can skip this step because `pnpm i` will install them automatically.

4. **Start the development server**
```bash
pnpm dev
```

The project should be available at:
`http://localhost:5173/`

---

# TYPE 2 — GIT / GITHUB SETUP

### FIRST-TIME SETUP
Everything below is done directly in the VS Code Terminal.

1. Open VS Code.
2. Open the terminal: `Terminal` → `New Terminal` or press `Ctrl` + `` ` ``
3. Clone the GitHub repository:
```bash
git clone https://github.com/jdb2023-9112-25306-coder/Capstone_Project_2026-2025.git
```
*(This downloads the whole project from GitHub)*

4. Enter the project folder:
```bash
cd Capstone_Project_2026-2025
```

5. Install the project dependencies:
```bash
pnpm i
```

6. Create your own feature branch:
```bash
git switch -c feature/my-module
```

*Example:*
```bash
git switch -c feature/login-module
```
*(Replace `my-module` with the module or feature you are working on)*

7. Start the project:
```bash
pnpm dev
```

You can now edit the project directly in VS Code.

---

## WORKING ON THE PROJECT

You can edit the whole project, not just the `src` folder. The cloned repository contains files such as:

* `src/`
* `package.json`
* `vite.config.ts`
* `README.md`
* `.gitignore`
* other configuration files

`node_modules` is normally not downloaded from GitHub because it is excluded by `.gitignore`.

Running `pnpm i` downloads and installs the required dependencies locally.

---

## AFTER MAKING YOUR CHANGES

1. Check your changes:
```bash
git status
```

2. Add your changes:
```bash
git add .
```

3. Commit your changes:
```bash
git commit -m "Update my module"
```

*Example:*
```bash
git commit -m "Add login module"
```

4. Push your branch to GitHub:
```bash
git push -u origin feature/my-module
```

*Example:*
```bash
git push -u origin feature/login-module
```

---

## PULL REQUEST

After pushing your branch:
1. Open the GitHub repository.
2. Create a Pull Request.
3. Set the branches as:
   * **Base:** `main`
   * **Compare:** `feature/my-module`
   *(Example: `main` ← `feature/login-module`)*
4. Let another group member review the changes.
5. Merge the Pull Request into `main` after review.

---

## WHEN STARTING WORK AGAIN

Before creating a new feature branch, update your local `main`:

```bash
git switch main
```

```bash
git pull origin main
```

Then create your new feature branch:

```bash
git switch -c feature/my-new-module
```

*Workflow Order:* Work → Test → Add → Commit → Push → Pull Request → Merge

---

## QUICK COMMAND SUMMARY

### FIRST TIME:
```bash
git clone https://github.com/jdb2023-9112-25306-coder/Capstone_Project_2026-2025.git
```

```bash
cd Capstone_Project_2026-2025
```

```bash
pnpm i
```

```bash
git switch -c feature/my-module
```

```bash
pnpm dev
```

### AFTER EDITING:
```bash
git status
```

```bash
git add .
```

```bash
git commit -m "Update my module"
```

```bash
git push -u origin feature/my-module
```

Then create Pull Request on GitHub: `feature/my-module` → `main`

---

## IMPORTANT RULES

* Do not use `git push --force` unless specifically instructed.
* Do not normally work directly on `main`. Use your own feature branch instead.
* Before starting new work:
```bash
git switch main
```

```bash
git pull origin main
```

```bash
git switch -c feature/my-new-module
```

---

## BASIC WORKFLOW

```text
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
```
