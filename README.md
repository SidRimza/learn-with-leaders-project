# Learn with Leaders – Assignment

This project implements a simple learning programs platform using React and Supabase.

## Preliminary Questions

### 1. Vibe / AI-assisted Development Experience

I have experience using AI-assisted development tools such as Cursor AI and ChatGPT in my daily development workflow. I primarily use these tools to scaffold React components, refactor existing code, generate boilerplate logic, and speed up repetitive tasks.

In my workflow, AI tools act as a productivity aid rather than a decision-maker. I typically define the requirements and architecture first, use AI to accelerate implementation, and then manually review and refine the code to ensure correctness, performance, and maintainability.

---

### 2. AI Stack & Tools

I regularly use ChatGPT / OpenAI-based tools for problem-solving, code generation, debugging, and architectural exploration. These tools have helped me design component structures, API interaction patterns, and database-driven workflows in real projects.

I also use Cursor AI as an AI-powered editor to assist with inline suggestions and refactoring. While I have not built large-scale AI systems involving agents or vector databases yet, I am comfortable understanding and integrating AI-assisted workflows where they add practical value to product development.

---

## Tech Stack
- React + TypeScript
- Supabase (Auth, Database, RLS)
- Vite

## Features
- Email/password authentication
- Program listing page
- Program detail page
- Apply to program
- Application state persisted in database
- Role-based access enforced via Supabase RLS

## Application Flow
1. User logs in
2. Programs are fetched from Supabase
3. User can view program details
4. User can apply to a program
5. Applied state is fetched from DB and reflected in UI

## Security
- Row Level Security enabled
- Users can only apply as themselves
- Users can only read their own applications

## Setup
1. Clone repository
2. Add Supabase keys to `.env`
3. Run `npm install`
4. Run `npm run dev`

## Supabase Schema

```sql
-- users table
create table users (
  id uuid primary key references auth.users(id),
  full_name text,
  role text
);

-- programs table
create table programs (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  mentor_id uuid references users(id)
);

-- applications table
create table applications (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references programs(id),
  student_id uuid references users(id),
  status text
);
