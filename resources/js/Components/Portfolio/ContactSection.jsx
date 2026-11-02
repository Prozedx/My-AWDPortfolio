import ContactField from '@/Components/ContactField';
import SectionDivider from '@/Components/SectionDivider';
import { useState } from 'react';

export default function ContactSection() {
    const [formStatus, setFormStatus] = useState('');

    function handleContactSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fields = ['first-name', 'last-name', 'message'].map((id) =>
            document.getElementById(id),
        );
        const emptyField = fields.find((field) => field.value.trim() === '');

        if (emptyField) {
            setFormStatus('Please complete every field.');
            emptyField.focus();
            return;
        }

        if (!form.reportValidity()) {
            setFormStatus('Please enter a valid email address.');
            document.getElementById('email').focus();
            return;
        }

        const firstName = document.getElementById('first-name').value.trim();
        setFormStatus(
            `Thanks, ${firstName}! Your message is ready. This demo does not send email.`,
        );
        form.reset();
    }

    return (
        <section
            className="relative min-h-[540px] scroll-mt-16 bg-white"
            id="contact"
            aria-labelledby="contact-title"
        >
            <div className="relative z-10 mx-auto grid min-h-[500px] max-w-6xl grid-cols-1 items-center gap-8 px-6 pb-20 pt-10 sm:px-10 md:grid-cols-[0.8fr_1.2fr] md:gap-10 lg:px-16">
                <div className="py-3">
                    <h2
                        className="text-xl leading-relaxed sm:text-2xl"
                        id="contact-title"
                    >
                        For commissions and project inquiries, please email:
                        <br />
                        <a
                            className="font-bold underline decoration-[#a8c7ff] decoration-2 underline-offset-4"
                            href="mailto:desireevillaruzz@gmail.com"
                        >
                            desireevillaruzz@gmail.com
                        </a>
                    </h2>
                    <p className="mt-2 text-base">
                        or send a message via this form:
                    </p>
                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm sm:mt-14 sm:text-base">
                        <a
                            className="text-gray-800 underline hover:text-blue-800"
                            href="mailto:desireevillaruzz@gmail.com"
                        >
                            Email Desiree
                        </a>
                        <a
                            className="text-gray-800 underline hover:text-blue-800"
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            className="text-gray-800 underline hover:text-blue-800"
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="rounded-xl bg-[#c9dafa] p-5 shadow-md sm:p-8">
                    <h3 className="mb-5 text-center text-2xl font-bold sm:text-3xl">
                        Contact
                    </h3>
                    <form
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                        id="contact-form"
                        noValidate
                        onSubmit={handleContactSubmit}
                    >
                        <ContactField
                            id="first-name"
                            name="firstName"
                            label="First Name"
                            autoComplete="given-name"
                            placeholder="First Name"
                            required
                        />
                        <ContactField
                            id="last-name"
                            name="lastName"
                            label="Last Name"
                            autoComplete="family-name"
                            placeholder="Last Name"
                            required
                        />
                        <ContactField
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            className="col-span-1 sm:col-span-2"
                            autoComplete="email"
                            placeholder="Email Address"
                            required
                        />
                        <ContactField
                            as="textarea"
                            id="message"
                            name="message"
                            label="Write a message"
                            className="col-span-1 resize-y sm:col-span-2"
                            rows="5"
                            placeholder="Write a message..."
                            required
                        />
                        <div className="col-span-1 flex flex-col items-center gap-2 sm:col-span-2">
                            <button
                                className="min-w-28 rounded-full bg-white px-7 py-3 text-base font-bold shadow-md transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Submit
                            </button>
                            <p
                                className="min-h-5 text-center text-sm"
                                id="form-status"
                                role="status"
                                aria-live="polite"
                            >
                                {formStatus}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <SectionDivider />
        </section>
    );
}
