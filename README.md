# Desiree Villaruz Portfolio

A pair-built portfolio website using Laravel 12, Inertia.js, React, Tailwind
CSS, and MySQL. The public portfolio includes a database-backed gallery with
authenticated create, edit, and delete screens.

## Pair collaboration

This project is maintained by **Jian Mark R. Fernandez** and **Desiree B.
Villaruz**. Both members should be able to run the application, understand the
Gallery CRUD flow, and review each other's changes.

- Work together on features when possible; otherwise, agree on a task before
  splitting the work.
- Rotate the driver and navigator roles during pair-programming sessions. The
  driver writes code while the navigator reviews, tests, and helps plan the
  next step.
- Before finishing a session, explain the changes, update this README if setup
  changes, and leave the other member with the branch name and any remaining
  tasks.
- Use a separate Git branch for each task. Pull the latest `main` before
  starting, push your branch, and open a pull request so both members can
  review it before merging.
- Do not commit `.env`, passwords, tokens, or other local credentials.

## Setup on each member's computer

Install PHP 8.2 or newer, Composer, Node.js/npm, and MySQL or MariaDB. From the
project folder, install dependencies:

```bash
composer install
npm install
```

Create a local `.env` file from `.env.example` (in PowerShell, use
`Copy-Item .env.example .env`). Configure its MySQL settings for your machine:
`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`. Create
the database named in `DB_DATABASE`, then initialize the application:

```bash
php artisan key:generate
php artisan migrate
php artisan storage:link
```

Each member uses their own local `.env`, database, and account. Register an
account locally to manage gallery entries. Never share `.env` credentials in
GitHub or chat.

## Run locally

Start MySQL/MariaDB first. In two project-folder terminals, run:

```bash
php artisan serve
```

```bash
npm run dev
```

Open the address printed by `php artisan serve`, usually
`http://127.0.0.1:8000`. To make a production frontend build, run
`npm run build`.

## Portfolio and gallery

The portfolio's Gallery section displays records from MySQL. The small
**Admin** link in the footer opens gallery management (or login when signed
out). Gallery entries include a unique title, caption, image, category, and
date taken. Images must be JPG, PNG, or WebP and no larger than 5 MB.

## Project structure

- `resources/js/Pages/Portfolio.jsx` assembles the public portfolio.
- `resources/js/Components/Portfolio/` contains the separate portfolio
  sections.
- `resources/js/Pages/Gallery/` contains gallery index, create, and edit pages.
- `resources/js/Components/GalleryForm.jsx` is shared by the create and edit
  pages.
- `app/Http/Controllers/GalleryItemController.php` handles Gallery CRUD.
- `app/Http/Requests/GalleryItemRequest.php` validates Gallery input.
- `app/Models/GalleryItem.php` and `database/migrations/` define Gallery data.
- `routes/web.php` defines the public portfolio and authenticated resource
  routes.
- `public/images/` contains the original portfolio photos and project images.

The contact form is a front-end demo and does not send email.
