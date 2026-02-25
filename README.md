# Catawiki - Playwright UI Automation

Automated end-to-end tests for the Catawiki website using **Playwright** and the **Page Object Model (POM)** in **TypeScript**.

This project demonstrates a real-world Playwright test suite that validates Catawiki search functionality and individual lot pages.

------------------------------------
## 📁 Repository Structure

```text
catawiki-playwright-automation/
│
├── helm/
│
├── src/
│   ├── pages/
│   ├── locators/
│   └── strategies/
│
├── tests/
│
├── Dockerfile     
├── Jenkinsfile
├── package.json
├── playwright.config.ts
└── README.md
```

-----------------------------------
## 🚀 Features

✅ Playwright Test Runner  
✅ Page Object Model (POM) architecture  
✅ Parallel test execution  
✅ Strong locator strategies  
✅ Dynamic data handling (timers, bids, counts)  
✅ CI-ready (GitHub Actions / Jenkins)  
✅ Detailed failure logs & console output

## 🧠 Getting Started

### 📦 Prerequisites

**Node 25.6.1+**

**npm 11.9.0+**

```bash
brew install node
```

**Playwright 1.58.2**

```bash
npm install -D playwright typescript ts-node @playwright/test
```

**Docker** (for running cintainerzed playwright tests)

### 🧪 Testing
The project includes a comprehensive test suite using Playwright to validate the UI search flow functionality of the Catawiki-Online marketplace.

### Supported / Tested Viewports
- Desktop view - Chrome
- Desktop view - Firefox
- Desktop view - webkit
- Mobile view - Chrome
- Mobile view - Safari

### Scenarios covered by tests include:
- Search Flow: Should display correct lot details when navigating from search results
- Search Flow: Displayed result count should equal actual number of result items


### Running the Test Suite:

```bash
npx playwright test
```

### Generate report:

```bash
npx playwright show-report
```

Then 

`The HTML report is served at http://localhost:9323`
