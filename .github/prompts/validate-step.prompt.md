---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate Step Success Criteria

You are validating that all success criteria for a specific step have been met, using systematic code review practices.

## Input Parameters

**Step Number** (REQUIRED): ${input:step-number}

Expected format: `5-0`, `5-1`, `5-2`, etc.

If no step number is provided, **STOP** and ask the user to provide it.

## Workflow

### Step 1: Validate Step Number

If step number is not provided:
```
❌ Step number is required!

Please provide the step number you want to validate.

Format: 5-0, 5-1, 5-2, etc.

Example: /validate-step 5-1
```

**STOP execution** until step number is provided.

### Step 2: Find the Exercise Issue

Use GitHub CLI to find the main exercise issue:

```bash
gh issue list --state open
```

Look for the issue with **"Exercise:"** in the title.

### Step 3: Get Issue with Comments

```bash
gh issue view <issue-number> --comments
```

This retrieves:
- Main issue body
- All step comments

### Step 4: Find the Specified Step

Search through the issue comments to locate:

```
# Step ${input:step-number}: [Step Title]
```

**If step not found**:
```
❌ Step ${input:step-number} not found in the exercise issue.

Available steps:
- Step 5-0: [Title]
- Step 5-1: [Title]
- Step 5-2: [Title]

Please check the step number and try again.
```

### Step 5: Extract Success Criteria

From the step comment, find the **Success Criteria** section:

```
## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Parse each criterion into a checklist.

### Step 6: Validate Each Criterion

For each success criterion, perform systematic checks:

#### Example Criteria and Validation Methods

**"All tests passing"**:
```bash
npm test
```
- ✅ Check if all tests pass
- ❌ Report which tests are failing

**"No ESLint errors"**:
```bash
npm run lint
```
- ✅ Check for 0 errors
- ❌ Report error count and categories

**"POST endpoint implemented"**:
```bash
# Check if endpoint exists in code
grep -r "app.post('/api/todos'" packages/backend/src/
```
- ✅ Verify endpoint exists
- ❌ Report if missing

**"Tests cover validation logic"**:
- Search test files for validation test cases
- ✅ Verify tests exist for edge cases
- ❌ Report missing test coverage

**"Application runs without errors"**:
```bash
npm start
```
- ✅ Check if both frontend and backend start successfully
- ❌ Report startup errors

### Step 7: Generate Validation Report

Create a comprehensive report:

```
📋 STEP ${input:step-number} VALIDATION REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step: ${input:step-number} - [Step Title]

SUCCESS CRITERIA STATUS:

✅ All tests passing
   • 12 tests passed
   • 0 tests failed
   • Test coverage: 85%

✅ No ESLint errors
   • 0 errors
   • 0 warnings
   • All files clean

✅ POST endpoint implemented
   • Found in: packages/backend/src/app.js
   • Handles validation correctly
   • Returns proper status codes

❌ Tests cover edge cases
   • Missing test for empty string title
   • Missing test for whitespace-only title
   • Action needed: Add validation tests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL STATUS: ⚠️ INCOMPLETE (3/4 criteria met)

NEXT ACTIONS:
1. Add test for empty string validation
2. Add test for whitespace-only validation
3. Re-run /validate-step ${input:step-number} after fixes

Once all criteria are met, use /commit-and-push to save your work.
```

### Step 8: Provide Specific Guidance

For each **incomplete criterion**, provide:

1. **What's missing**: Clear description
2. **How to fix it**: Specific steps or code examples
3. **How to verify**: Command to run after fixing

**Example**:
```
❌ Tests cover edge cases

What's missing:
- No test for empty string title ("")
- No test for whitespace-only title ("   ")

How to fix:
Add these tests to packages/backend/__tests__/app.test.js:

test('should return 400 for empty string title', async () => {
  const response = await request(app)
    .post('/api/todos')
    .send({ title: '' });
  
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('error');
});

test('should return 400 for whitespace-only title', async () => {
  const response = await request(app)
    .post('/api/todos')
    .send({ title: '   ' });
  
  expect(response.status).toBe(400);
});

How to verify:
npm test -- --testNamePattern="empty string|whitespace"
```

## Validation Checklist

Common criteria and how to check them:

### Tests
- ✅ **All tests passing**: `npm test`
- ✅ **Specific tests exist**: Search test files for test names
- ✅ **Test coverage**: `npm test -- --coverage`

### Code Quality
- ✅ **No lint errors**: `npm run lint`
- ✅ **No console statements**: `grep -r "console.log" packages/*/src/`
- ✅ **Proper error handling**: Review code for try-catch blocks

### Implementation
- ✅ **Endpoint exists**: Search for endpoint definition
- ✅ **Function implemented**: Search for function name
- ✅ **Component rendered**: Check component files

### Functionality
- ✅ **Application runs**: `npm start` (check for errors)
- ✅ **Manual testing**: Provide specific UI test steps
- ✅ **Data validation**: Check validation logic in code

### Documentation
- ✅ **Comments added**: Review code for comments
- ✅ **README updated**: Check README.md
- ✅ **Memory updated**: Check .github/memory/ files

## Important Constraints

### Systematic Review

Use code-reviewer mode capabilities:
- ✅ Categorize issues by type and severity
- ✅ Provide clear, actionable feedback
- ✅ Explain the "why" behind each requirement
- ✅ Give specific examples and code snippets
- ✅ Prioritize fixes by impact

### No Assumptions

**Always verify** against actual workspace state:
- ✅ Run commands to check status
- ✅ Search files to verify implementation
- ✅ Test functionality to confirm it works
- ❌ Don't assume based on previous steps

### Helpful Guidance

For incomplete criteria:
- ✅ Explain what's missing clearly
- ✅ Provide concrete fix suggestions
- ✅ Show how to verify the fix
- ✅ Reference relevant documentation
- ❌ Don't just say "fix this" without guidance

## Reference Documentation

This prompt inherits GitHub CLI knowledge from `.github/copilot-instructions.md`.

Key sections:
- **Workflow Utilities**: GitHub CLI commands for issues
- **Testing Guidelines**: How to validate test coverage
- **Code Quality**: ESLint and best practices

## Example Execution

```
User runs: /validate-step 5-1

Response:
"Validating Step 5-1...

Finding exercise issue..."

[Runs: gh issue list --state open]

"Found exercise issue #1

Getting step details..."

[Runs: gh issue view 1 --comments]

"Found Step 5-1: Implement POST Endpoint

Extracting success criteria:
1. POST endpoint implemented
2. Endpoint validates title field
3. Tests cover happy path
4. Tests cover validation errors
5. All tests passing
6. No ESLint errors

Running validation checks...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 STEP 5-1 VALIDATION REPORT

Step: 5-1 - Implement POST Endpoint

SUCCESS CRITERIA STATUS:

✅ POST endpoint implemented
   • Found in: packages/backend/src/app.js (line 45)
   • Accepts POST requests to /api/todos
   • Returns proper response structure

✅ Endpoint validates title field
   • Checks for missing title
   • Returns 400 with error message
   • Implementation looks correct

✅ Tests cover happy path
   • Test: 'should create todo with valid title' ✅
   • Verifies 201 status
   • Verifies response structure

❌ Tests cover validation errors
   • Missing test for empty string title
   • Missing test for undefined title
   • Action needed: Add edge case tests

✅ All tests passing
   • 10/10 tests passing
   • 0 failures
   • Test suite: ✅

❌ No ESLint errors
   • 2 errors found
   • Line 47: Unused variable 'result'
   • Line 52: Missing semicolon
   • Action needed: Fix lint errors

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL STATUS: ⚠️ INCOMPLETE (4/6 criteria met)

BLOCKING ISSUES:

1. Missing validation tests
   
   Add to packages/backend/__tests__/app.test.js:
   
   test('should return 400 when title is empty string', async () => {
     const response = await request(app)
       .post('/api/todos')
       .send({ title: '' });
     expect(response.status).toBe(400);
   });
   
   test('should return 400 when title is undefined', async () => {
     const response = await request(app)
       .post('/api/todos')
       .send({});
     expect(response.status).toBe(400);
   });

2. Fix ESLint errors
   
   Line 47: Remove unused 'result' variable
   Line 52: Add semicolon at end of statement
   
   Run to verify: npm run lint

NEXT ACTIONS:
1. Add the missing validation tests
2. Fix the 2 ESLint errors
3. Run /validate-step 5-1 again
4. When all ✅, use /commit-and-push feature/post-endpoint

Need help fixing these? Switch to @tdd-developer mode for test help
or stay in @code-reviewer mode for lint fixes!"
```

## Success Criteria

Validation is complete when:
- ✅ Step number is provided and valid
- ✅ Exercise issue is found
- ✅ Step and success criteria are located
- ✅ Each criterion is checked systematically
- ✅ Clear pass/fail status for each criterion
- ✅ Specific guidance provided for incomplete items
- ✅ Commands shown for verification
- ✅ User knows exactly what to do next
