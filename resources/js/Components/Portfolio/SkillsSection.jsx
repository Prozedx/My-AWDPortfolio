import SectionDivider from '@/Components/SectionDivider';
import SectionTitle from '@/Components/SectionTitle';
import SkillCard from '@/Components/SkillCard';

const skills = [
    {
        title: 'Technical Skills',
        items: [
            'Basic Programming (Java, C++ & Visual Basic)',
            'Networking (LAN/WAN setup, troubleshooting)',
            'HTML, CSS & JavaScript',
        ],
    },
    {
        title: 'Soft Skills',
        items: [
            'Poetry Writing Skills',
            'Creativity & Innovation',
            'Active Listening',
            'Time Management',
        ],
    },
];

export default function SkillsSection() {
    return (
        <section
            className="relative min-h-[500px] scroll-mt-16 bg-white"
            id="skills"
            aria-labelledby="skills-title"
        >
            <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-12 sm:px-10 md:pb-24 md:pt-16 lg:px-16">
                <SectionTitle
                    id="skills-title"
                    className="mx-auto mb-10 table rounded-md bg-[#c9dafa] px-6 py-3 text-3xl font-bold shadow-md sm:mb-12 sm:text-4xl"
                >
                    Skills
                </SectionTitle>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {skills.map(({ title, items }) => (
                        <SkillCard
                            key={title}
                            title={title}
                            skills={items}
                        />
                    ))}
                </div>
            </div>
            <SectionDivider />
        </section>
    );
}
