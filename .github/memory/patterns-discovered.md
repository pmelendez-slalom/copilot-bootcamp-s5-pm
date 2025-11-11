# Patterns Discovered

## Purpose

This file documents reusable code patterns, solutions, and best practices discovered during development. Each pattern entry helps maintain consistency and avoid repeating past mistakes.

**Important**: This file is committed to git as a living knowledge base.

---

## Pattern Template

Use this template when documenting new patterns:

```markdown
### Pattern: [Pattern Name]

**Context**: When/where this pattern applies

**Problem**: What issue does this solve?

**Solution**: How to implement it

**Example**:
```javascript
// Code example demonstrating the pattern
```

**Related Files**: 
- `path/to/file1.js`
- `path/to/file2.js`

**Notes**: Additional considerations, trade-offs, or warnings

---
```

## Discovered Patterns

### Pattern: Service Initialization - Empty Array vs Null

**Context**: When creating in-memory data stores or services that manage collections

**Problem**: Uninitialized arrays cause "Cannot read property of undefined" errors when endpoints try to access them before any data is added.

**Solution**: Always initialize collection variables to empty arrays at module scope, never leave them undefined or null.

**Example**:
```javascript
// ❌ Bad - Uninitialized
let todos;

// ❌ Bad - Null initialization
let todos = null;

// ✅ Good - Empty array initialization
let todos = [];
let nextId = 1;
```

**Related Files**: 
- `packages/backend/src/app.js` - Main API implementation

**Notes**: 
- This pattern applies to in-memory storage only
- For database-backed services, initialization happens in DB connection
- Empty arrays are falsy in boolean context but safe to iterate/access
- Always pair collection initialization with any required metadata (like `nextId` counter)

---

### Pattern: Input Validation for REST APIs

**Context**: When implementing POST/PUT endpoints that accept user input

**Problem**: Endpoints must validate required fields and sanitize input to prevent errors and ensure data quality. Missing or empty strings can cause unexpected behavior downstream.

**Solution**: Validate required fields exist and use `.trim()` to remove whitespace, then check if the trimmed value is empty.

**Example**:
```javascript
// ✅ Good - Proper validation
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  // Validate title exists and is not empty after trimming
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  // Use trimmed value
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

**Related Files**: 
- `packages/backend/src/app.js` - POST /api/todos endpoint

**Notes**: 
- Always validate BEFORE processing
- Use `.trim()` to handle whitespace-only strings
- Return 400 Bad Request for validation failures
- Include descriptive error messages
- Sanitize input even if validation passes

---

### Pattern: Boolean Toggle Logic

**Context**: When implementing toggle functionality for boolean fields

**Problem**: Directly setting a boolean to `true` or `false` doesn't toggle - it always sets the same value regardless of current state.

**Solution**: Use the logical NOT operator (`!`) to invert the current boolean value.

**Example**:
```javascript
// ❌ Bad - Always sets to true
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = true; // Bug: doesn't toggle
  res.json(todo);
});

// ✅ Good - Properly toggles
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed; // Toggles based on current state
  res.json(todo);
});
```

**Related Files**: 
- `packages/backend/src/app.js` - PATCH /api/todos/:id/toggle endpoint

**Notes**: 
- `!true` becomes `false`
- `!false` becomes `true`
- This pattern applies to any toggle operation
- Common bug: forgetting the `!` operator

---

### Pattern: Resource Not Found Handling

**Context**: When implementing endpoints that operate on specific resources by ID (GET, PUT, PATCH, DELETE)

**Problem**: Attempting operations on non-existent resources should return appropriate HTTP status codes, not crash or return misleading success messages.

**Solution**: Always check if the resource exists before operating on it. Return 404 with descriptive error if not found.

**Example**:
```javascript
// ✅ Good - Proper 404 handling
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Proceed with update
  todo.title = req.body.title;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.json({ message: 'Todo deleted successfully' });
});
```

**Related Files**: 
- `packages/backend/src/app.js` - PUT, PATCH, DELETE endpoints

**Notes**: 
- Use `find()` to get the object, `findIndex()` when you need to remove it
- Always `return` after sending 404 to prevent further execution
- 404 is the standard HTTP code for "resource not found"
- Include descriptive error messages for debugging

---

### Pattern: Preserving Partial Updates

**Context**: When implementing PUT endpoints that should update only specific fields

**Problem**: Full replacement vs partial update - PUT typically means full replacement, but sometimes you want to update only certain fields while preserving others.

**Solution**: In REST APIs, use PUT for partial updates with explicit field preservation logic, or use PATCH for partial updates.

**Example**:
```javascript
// ✅ Good - Preserves completed status when updating title
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  
  const todo = todos.find((t) => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Update only the title, preserve completed status
  if (title !== undefined) {
    todo.title = title;
  }
  
  res.json(todo);
});
```

**Related Files**: 
- `packages/backend/src/app.js` - PUT /api/todos/:id endpoint

**Notes**: 
- Check `if (field !== undefined)` to distinguish between omitted and explicitly set to undefined
- Document which fields can be updated via which endpoints
- Consider using PATCH for partial updates, PUT for full replacement
- In this implementation, PUT only updates title, not completed status

---

### Pattern: [Your Next Pattern]

**Context**: 

**Problem**: 

**Solution**: 

**Example**:
```javascript
// Your code example
```

**Related Files**: 

**Notes**: 

---

## Pattern Categories

As patterns accumulate, organize them into categories:

### Data Management
- Service Initialization - Empty Array vs Null
- Input Validation for REST APIs

### API Design
- Resource Not Found Handling (404 responses)
- Preserving Partial Updates (PUT vs PATCH semantics)

### Business Logic
- Boolean Toggle Logic

### Error Handling
- (Patterns to be added)

### Testing
- (Patterns to be added)

### React Components
- (Patterns to be added)

### State Management
- (Patterns to be added)

---

## Instructions for Adding Patterns

1. **Recognize the Pattern**: Notice when you solve a problem that might recur
2. **Document Immediately**: Add it while the context is fresh
3. **Include Examples**: Code speaks louder than words
4. **Cross-Reference**: Link to actual files where pattern is used
5. **Commit Often**: Each pattern addition is valuable to commit separately

### Good Candidates for Patterns

- Solutions to bugs that took >30 minutes to debug
- Architectural decisions that affect multiple files
- Best practices discovered through trial and error
- Workarounds for library quirks or limitations
- Testing strategies that work well
- Code structures that improved clarity

### Not Every Solution is a Pattern

Don't document:
- One-off fixes specific to a single file
- Obvious language features or standard practices
- External library usage (unless there's a trick to it)
- Trivial changes

**Ask yourself**: "Will I or someone else benefit from remembering this approach?" If yes, document it.
