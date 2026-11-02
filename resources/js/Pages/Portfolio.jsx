import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import AboutSection from '@/Components/Portfolio/AboutSection';
import ContactSection from '@/Components/Portfolio/ContactSection';
import GallerySection from '@/Components/Portfolio/GallerySection';
import HomeSection from '@/Components/Portfolio/HomeSection';
import SkillsSection from '@/Components/Portfolio/SkillsSection';
import { Head } from '@inertiajs/react';

export default function Portfolio({ galleryItems }) {
    return (
        <>
            <Head title="Desiree Villaruz | Portfolio" />
            <Navbar />

            <main>
                <HomeSection />
                <AboutSection />
                <SkillsSection />
                <GallerySection galleryItems={galleryItems} />
                <ContactSection />
            </main>

            <Footer />
        </>
    );
}
