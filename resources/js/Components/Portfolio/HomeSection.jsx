import SectionDivider from '@/Components/SectionDivider';

export default function HomeSection() {
    return (
        <section
            className="relative min-h-[560px] scroll-mt-16 bg-white md:min-h-[620px]"
            id="home"
            aria-labelledby="welcome-title"
        >
            <div className="mx-auto grid min-h-[520px] max-w-6xl grid-cols-[1fr_120px] items-center gap-4 px-6 pb-14 pt-12 sm:grid-cols-[1fr_180px] sm:gap-10 sm:px-10 md:min-h-[580px] md:grid-cols-[1fr_220px] md:gap-16 lg:px-16">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#526f92] sm:text-base">
                        IT Student · Pangasinan, Philippines
                    </p>
                    <h1
                        className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
                        id="welcome-title"
                    >
                        WELCOME!
                    </h1>
                    <p className="mt-1 text-2xl sm:text-3xl md:text-4xl">
                        I’m <strong>Desiree Villaruz</strong>
                    </p>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
                        I enjoy turning ideas into functional and user-friendly
                        digital experiences.
                    </p>
                    <a
                        className="mt-6 inline-block rounded-md bg-[#c9dafa] px-5 py-3 text-base font-bold shadow-md transition hover:-translate-y-0.5 hover:bg-[#b7cdf0]"
                        href="#about"
                    >
                        Let’s Go!
                    </a>
                </div>
                <div className="h-40 w-28 justify-self-end overflow-hidden rounded-md bg-gray-200 shadow-lg sm:h-56 sm:w-44 md:h-64 md:w-52">
                    <img
                        className="h-full w-full object-cover object-center"
                        src="/images/desiree-headshot.png"
                        alt="Desiree Villaruz"
                    />
                </div>
            </div>
            <SectionDivider />
        </section>
    );
}
