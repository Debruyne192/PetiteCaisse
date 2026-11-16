import { useForm, Head, Link, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { Layout } from "lucide-react";
import AccueilLayout from "@/layouts/AccueilLayout";


interface PageProps{
    flash:{
        error : string | null;
    };
    [key : string ] : any;
}
const services = [
        {
            titre: "CONSEILS & SOLUTIONS IT",
            description: "Accompagnement stratégique et audit des systèmes d'information pour optimiser les performances technologiques de votre structure.",
            icone: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            titre: "DÉVELOPPEMENT SUR MESURE",
            description: "Conception et réalisation d'applications web et mobiles performantes, adaptées aux besoins spécifiques et aux flux métiers de votre entreprise.",
            icone: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            titre: "SOLUTIONS COLLABORATIVES",
            description: "Mise en place de plateformes de travail partagées et d'outils collaboratifs pour fluidifier la communication et améliorer la productivité des équipes.",
            icone: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            titre: "MAINTENANCE & RÉSEAUX",
            description: "Installation, configuration et maintenance préventive de vos infrastructures réseaux et parcs informatiques pour garantir une continuité de service.",
            icone: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            titre: "SÉCURITÉ ÉLECTRONIQUE",
            description: "Déploiement de dispositifs de contrôle d'accès intelligents, de vidéosurveillance et de systèmes d'alarme pour sécuriser vos locaux professionnels.",
            icone: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            titre: "FORMATIONS & ASSISTANCE IT",
            description: "Programmes de renforcement de capacités et support technique continu pour accompagner vos collaborateurs dans la prise en main de vos nouveaux outils.",
            icone: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        }
    ];
export default function About() {
    

    return (
        <>
        <Head title="À Propos - BELTEK" />

            <section className="md:w-[200%] sm:w-[130%] bg-[#111827] text-white py-20 px-6 relative overflow-hidden lg:-ml-50 sm:-ml-17">
            <div className="max-w-7xl mx-auto space-y-16">
                
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-widest">
                        NOS <span className="text-indigo-400">SERVICES</span>
                    </h2>
                    <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                    <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
                        Découvrez le catalogue d'expertises et de solutions d'ingénierie numérique mis en œuvre par l'entreprise pour accompagner la modernisation de vos infrastructures.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="bg-[#1f2937]/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6 transform hover:scale-[1.02] hover:border-indigo-500/50 hover:bg-[#1f2937]/70 transition duration-300 shadow-xl"
                        >
                            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center shadow-inner">
                                {service.icone}
                            </div>

                            <h3 
                            className="text-base sm:text-lg font-black tracking-wider uppercase text-white">
                                {service.titre}
                            </h3>

                            <p 
                            className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
        
        </>
    );
}
About.layout = (page: React.ReactNode) => <AccueilLayout children={page} />;
