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

### API Design
- (Patterns to be added)

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
