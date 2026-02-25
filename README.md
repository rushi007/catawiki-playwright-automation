# Catawiki - Playwright UI Automation

Automated end-to-end UI tests for the Catawiki website using Playwright + TypeScript, following the Page Object Model (POM) design pattern.

This project demonstrates scalable UI test architecture, cross-browser execution, mobile testing, reporting, and CI readiness.

------------------------------------
## 🚀 Tech Stack

Playwright

TypeScript

Page Object Model (POM)

HTML Reporting

Docker support (optional)

CI/CD ready (Jenkins/GitHub Actions compatible)

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
✅ Cross-browser testing (Chromium, Firefox, WebKit) for Desktop & Mobile viewports   
✅ Clean locator strategies  
✅ Dynamic data handling (timers, bids, counts)  
✅ CI/CD integration    
✅ Docker & Kubernetes compatible   

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

## 🔧 Installation

#### Clone the repository
```bash
git clone https://github.com/rushi007/catawiki-playwright-automation.git
cd catawiki-playwright-automation
```

#### Install dependencies
```bash
npm install
```

#### Install Playwright Browsers
```bash
npx playwright install
```

#### Scenarios covered by tests include:
- Search Flow: Should display correct lot details when navigating from search results
- Search Flow: Displayed result count should equal actual number of result items


#### Running all Tests (By default in headless mode):

```bash
npx playwright test
```

#### Running all tests in headed mode
```bash
npx playwright test --headed
```

#### Run a specfic test file
```bash
npx playwright test tests/search.spec.ts
```

#### Run on a specific browser
```bash
npx playwright test --project=chrome
```
For more information: Please have a look at the `playwright.config.ts`

#### Generate report:

```bash
npx playwright show-report
```

Then 

`The HTML report is served at http://localhost:9323`
