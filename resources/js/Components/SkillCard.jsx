import Card from '@/Components/Card';

export default function SkillCard({ title, skills }) {
    return (
        <Card className="min-h-64 rounded-md bg-[#dedede] px-6 py-7 shadow-md sm:px-9">
            <h3 className="mb-7 text-center text-2xl font-bold sm:text-3xl">
                {title}
            </h3>
            <ol className="mx-auto max-w-md list-decimal space-y-2 pl-6 text-lg leading-relaxed sm:text-xl">
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ol>
        </Card>
    );
}
