---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute GitHub Issue Step

You are executing a step from the main exercise GitHub Issue following Test-Driven Development principles.

## Input Parameters

**Issue Number** (optional): ${input:issue-number}

If no issue number is provided, discover it automatically.

## Workflow

### Step 1: Find the Exercise Issue

If issue number was not provided:

```bash
gh issue list --state open
```

Look for the issue with **"Exercise:"** in the title. This is the main exercise issue.

### Step 2: Get Issue Content with Comments

```bash
gh issue view <issue-number> --comments
```

The issue structure:
- **Main issue body**: Exercise overview and introduction
- **Comments**: Individual step instructions (Step 5-0, Step 5-1, etc.)

### Step 3: Identify the Current Step

Parse the issue comments to find the **latest step** that should be executed.

Steps are posted as comments with format:
```
# Step 5-0: [Step Title]

## :keyboard: Activity: [Activity description]

[Detailed instructions...]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
```

**Identify the most recent step comment** (highest step number not yet completed).

### Step 4: Execute Activities Systematically

For each `:keyboard: Activity:` section in the step:

1. **Read the activity instructions carefully**
2. **Follow TDD principles** (see mode instructions):
   - Write tests FIRST for new features (RED phase)
   - Implement minimal code to pass tests (GREEN phase)
   - Refactor while keeping tests green (REFACTOR phase)
3. **Make incremental changes** - one activity at a time
4. **Run tests frequently** to verify progress
5. **Follow testing scope constraints**:
   - ✅ Use Jest + Supertest for backend
   - ✅ Use React Testing Library for frontend components
   - ✅ Recommend manual browser testing for UI flows
   - ❌ NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks

### Step 5: Verify Work

After completing all activities in the step:

1. **Run all tests**: `npm test`
2. **Check for lint errors**: `npm run lint`
3. **Verify the application works**: `npm start` (if applicable)

### Step 6: Report Completion

**DO NOT commit or push changes** - that's handled by `/commit-and-push`

Instead, report:
```
✅ Step [number] activities completed!

What was done:
- Activity 1: [summary]
- Activity 2: [summary]

Current status:
- Tests: [passing/failing - show count]
- Lint: [clean/errors - show count]
- App running: [yes/no]

Next action:
Run /validate-step with step number to check success criteria.
Then use /commit-and-push to commit your changes.
```

## Important Constraints

### Testing Scope

**DO NOT suggest or install**:
- ❌ Playwright
- ❌ Cypress  
- ❌ Selenium
- ❌ Puppeteer
- ❌ Any browser automation frameworks

**Reason**: This project uses unit and integration tests only (Jest, Supertest, React Testing Library).

For complete UI flows, recommend **manual browser testing** instead of automated e2e tests.

### TDD Discipline

For **new features**:
1. ✅ Write test FIRST (RED)
2. ✅ Run test to see it fail
3. ✅ Implement code (GREEN)
4. ✅ Run test to see it pass
5. ✅ Refactor if needed (REFACTOR)

For **fixing existing failing tests**:
1. ✅ Analyze test expectations
2. ✅ Understand why it fails
3. ✅ Implement minimal fix (GREEN)
4. ✅ Refactor if needed (REFACTOR)

### Git Workflow

**DO NOT**:
- ❌ Commit changes (use `/commit-and-push` instead)
- ❌ Push changes (use `/commit-and-push` instead)
- ❌ Create branches (use `/commit-and-push` instead)

**Reason**: Separation of concerns - execution vs. commit workflow

## Reference Documentation

This prompt inherits GitHub CLI and Git workflow knowledge from `.github/copilot-instructions.md`.

Key sections:
- **Workflow Utilities**: GitHub CLI commands for issues
- **Git Workflow**: Conventional commits and branch strategy
- **Testing Guidelines**: Test-first approach and scope

## Example Execution

```
User runs: /execute-step

Response:
"Finding the exercise issue..."

[Runs: gh issue list --state open]

"Found exercise issue #1: 'Exercise: TODO App Implementation'

Getting issue content with steps..."

[Runs: gh issue view 1 --comments]

"Current step to execute: Step 5-1 - Implement POST Endpoint

📋 Step 5-1: Implement POST Endpoint

Activities to complete:
1. Write test for POST /api/todos
2. Implement POST endpoint
3. Verify test passes

Following TDD workflow...

🔴 RED Phase: Writing test first

[Creates test for POST endpoint]

Running test to see it fail:
npm test -- --testNamePattern='POST'

✅ Test fails as expected (endpoint not implemented)

✅ GREEN Phase: Implementing endpoint

[Implements POST endpoint]

Running test to verify it passes:
npm test -- --testNamePattern='POST'

✅ Test passes!

♻️ REFACTOR Phase: Any improvements?

Code looks clean. No refactoring needed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Step 5-1 activities completed!

What was done:
- Wrote test for POST /api/todos endpoint
- Implemented POST endpoint with validation
- Test passing ✅

Current status:
- Tests: 8 passing
- Lint: Clean ✅
- App running: Yes ✅

Next action:
Run /validate-step 5-1 to check success criteria.
Then use /commit-and-push feature/post-endpoint to save your work."
```

## Success Criteria

Step execution is successful when:
- ✅ All activities in the step are completed
- ✅ Tests are written FIRST for new features
- ✅ Tests are passing
- ✅ No lint errors
- ✅ Changes follow TDD principles
- ✅ User is directed to /validate-step for verification
- ✅ No e2e frameworks were suggested
