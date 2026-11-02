import { useEffect, useState } from 'react';

const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections = document.querySelectorAll('main section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -55% 0px' },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <header className="sticky top-0 z-50 h-16 bg-[#a8c7ff] shadow-sm">
            <nav
                className="mx-auto flex h-full max-w-7xl items-center justify-end px-4 sm:px-8"
                aria-label="Main navigation"
            >
                <button
                    className="rounded-md border border-[#7098d4] bg-[#82aef5] px-4 py-2 text-base md:hidden"
                    id="menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="nav-links"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    Menu
                </button>
                <div
                    className={`${menuOpen ? 'flex' : 'hidden'} absolute left-3 right-3 top-full flex-col items-stretch gap-1 rounded-md bg-[#82aef5] p-2 shadow-md md:static md:flex md:flex-row md:items-center md:gap-1 md:p-1`}
                    id="nav-links"
                >
                    {links.map(({ id, label }) => (
                        <a
                            key={id}
                            className={`nav-item w-full rounded px-4 py-3 text-center text-lg hover:bg-[#dce8fb] md:w-auto md:px-5 md:py-3.5 md:text-xl ${
                                activeSection === id ? 'bg-[#dce8fb] shadow-sm' : ''
                            }`}
                            href={`#${id}`}
                            aria-current={activeSection === id ? 'location' : undefined}
                            onClick={() => {
                                setActiveSection(id);
                                setMenuOpen(false);
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
}
