import Card from '@/Components/Card';
import SectionDivider from '@/Components/SectionDivider';
import SectionTitle from '@/Components/SectionTitle';

const education = [
    {
        name: 'Oran Elementary School',
        award: '(Responsibility Award)',
        years: 'S.Y. 2012–2018',
    },
    {
        name: 'Manaoag National High School',
        award: '(JHS) · With Honors',
        years: 'S.Y. 2018–2022',
    },
    {
        name: 'Manaoag National High School',
        award: '(SHS) · With Honors',
        years: 'S.Y. 2022–2024',
    },
    {
        name: 'Information Technology',
        award: 'Currently studying',
    },
];

export default function AboutSection() {
    return (
        <section
            className="relative scroll-mt-16 bg-white"
            id="about"
            aria-labelledby="about-title"
        >
            <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-20 sm:px-10 md:pb-24 md:pt-24 lg:px-16">
                <article className="relative rounded-md bg-[#dedede] px-6 pb-8 pt-16 shadow-md sm:px-9 sm:pb-10 sm:pt-16">
                    <SectionTitle
                        id="about-title"
                        className="absolute -top-6 left-6 rounded-md bg-[#c9dafa] px-5 py-2 text-2xl font-bold shadow-md sm:left-10 sm:text-3xl"
                    >
                        About Me
                    </SectionTitle>
                    <p className="text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
                        Hello! I’m Desiree B. Villaruz, a 20 year old from Oran
                        West, Manaoag, Pangasinan. I am an Information
                        Technology student who is continuously learning and
                        exploring different areas of technology. I enjoy
                        working on academic projects that enhance my
                        problem-solving skills and help me gain hands-on
                        experience. I am motivated to improve and grow as a
                        future IT professional.
                    </p>
                </article>

                <div className="mt-20 rounded-md bg-[#dedede] px-5 pb-8 shadow-md sm:px-8 sm:pb-10">
                    <h2 className="relative -top-6 mx-auto mb-[-0.5rem] table rounded-md bg-[#c9dafa] px-5 py-2 text-2xl font-bold shadow-md sm:text-3xl">
                        Education
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
                        {education.map(({ name, award, years }, index) => (
                            <Card
                                key={`${name}-${award}`}
                                className={`rounded-md bg-white px-4 py-4 text-center shadow-md ${
                                    index % 2 === 0
                                        ? 'sm:justify-self-start'
                                        : 'sm:justify-self-end'
                                }`}
                            >
                                <h3 className="text-lg font-semibold">
                                    {name}
                                </h3>
                                <p className="text-base">{award}</p>
                                {years && (
                                    <p className="text-base">{years}</p>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <SectionDivider />
        </section>
    );
}
