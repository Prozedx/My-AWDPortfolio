## Desiree Villaruz Portfolio

This project converts the original portfolio into a Laravel 12 application using
Inertia.js, React, and Tailwind CSS. The original static files remain in the
parent folder as a reference.

### Run the portfolio locally

From this `my-portfolioWebsite` folder, open two terminals:

```bash
php artisan serve
```

```bash
npm run dev
```

Open the address printed by `php artisan serve` (usually
`http://127.0.0.1:8000`). For a production asset build, run `npm run build`.

### MySQL database and gallery CRUD

Start the MySQL/MariaDB server and create the `laravel_portfolio` database.
Update `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in
`.env` to match your local MySQL account. Then run:

```bash
php artisan migrate
php artisan storage:link
```

The public portfolio's Gallery section reads items from MySQL. Register or log
in, then use the small **Admin** link in the footer to add, edit, or delete
gallery entries. Each entry has a title, caption, image, category, and date
taken. Uploaded images must be JPG, PNG, or WebP files up to 5 MB.

### Where to make changes

- `resources/js/Pages/Portfolio.jsx` assembles the portfolio page.
- `resources/js/Components/Portfolio/` contains the separate portfolio section
  components.
- `resources/js/Pages/Gallery/` contains the gallery management screens.
- `app/Http/Controllers/GalleryItemController.php` handles gallery CRUD.
- `app/Http/Requests/GalleryItemRequest.php` validates gallery input.
- `app/Models/GalleryItem.php` and `database/migrations/` define gallery data.
- `resources/js/Components/` contains reusable portfolio components, including
  the navbar, footer, section title, cards, filters, skill cards, and contact
  fields.
- `routes/web.php` maps `/` to the Inertia portfolio page.
- `public/images/` contains the portfolio photos and project images.

The contact form is still a front-end demo; it does not send email.

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
