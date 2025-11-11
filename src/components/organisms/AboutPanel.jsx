import Panel from "../atoms/panel";
import H3 from "../atoms/Heading";
import SocialLink from "../molecules/SocialLink";
import { Instagram, Phone, Linkedin } from "lucide-react";

const aboutText = "text-slate-700 text-[15px] sm:text-base leading-7 tracking-[0.0125em] max-w-[780px] min-h-[340px]";

export default function AboutPanel({ section, setSection }) {
    const tabs = [
        { key: "desc", label: "Deskripsi Aplikasi" },
        { key: "impact", label: "Dampak Riset" },
        { key: "team", label: "Anggota Tim" },
        { key: "tech", label: "Teknologi Alat" },
        { key: "contact", label: "Kontak" },
    ];

    return (
        <Panel variant="glass">
            <div className="grid lg:grid-cols-12 gap-6">
                {/* side menu */}
                <div className="lg:col-span-4 space-y-3">
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setSection(t.key)}
                            className={`w-full text-left rounded-[18px] px-5 py-3 font-semibold transition
                ${section === t.key ? "bg-white/40 text-white shadow" : "text-white/70 hover:text-white/95"}`}
                        >
                            <span className={`block ${section === t.key ? "text-lg" : ""}`}>{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* content */}
                <div className="lg:col-span-8">
                    {section === "desc" && (
                        <Panel variant="solid">
                            <H3 className="mb-4">Deskripsi Aplikasi</H3>
                            <div className={`${aboutText} text-justify`}>
                                <p className="mb-3"><span className="font-semibold">Tel-U Weather</span> adalah aplikasi monitoring cuaca …</p>
                                <p className="mb-3">Aplikasi ini memanfaatkan perangkat<em> MISOL 2900 Multi Sensor Weather Station</em> …</p>
                                <p>Parameter … Data juga terintegrasi dengan Weather Underground sehingga dapat diakses secara global.</p>
                            </div>
                        </Panel>
                    )}

                    {section === "impact" && (
                        <Panel variant="solid">
                            <H3 className="mb-4">Dampak Riset</H3>
                            <ul className={`list-disc pl-6 space-y-2 ${aboutText}`}>
                                <li>Peringatan dini hujan lebat/angin kencang di area kampus.</li>
                                <li>Penjadwalan kelas/outdoor, wisuda, event olahraga, dan aktivitas UKM lebih presisi.</li>
                                <li>Mendorong praktik <em>open science</em> …</li>
                                <li>Media praktikum untuk mata kuliah …</li>
                                <li>Meningkatkan pemahaman risiko cuaca ekstrem …</li>
                            </ul>
                        </Panel>
                    )}

                    {section === "team" && (
                        <Panel variant="solid">
                            <H3 className="mb-4">Anggota Tim</H3>
                            {(() => {
                                const team = [
                                    { name: "Muhammad Abyan Wibowo", fakultas: "D4 Teknologi Rekayasa Multimedia", nim: "1301201234" },
                                    { name: "Irham Kurnia Putra", fakultas: "Fakultas Informatika", nim: "103012300483" },
                                    { name: "Nama 3", fakultas: "Fakultas X", nim: "13XXXXXXXX" }
                                ];

                                return (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 max-w-[780px] min-h-[340px]">
                                        {team.map((m, i) => (
                                            <div
                                                key={m.nim || i}
                                                className="rounded-xl bg-white/80 ring-1 ring-black/5 p-4 shadow-sm"
                                            >
                                                <div className="font-medium text-slate-900">{m.name}</div>
                                                <div className="text-sm text-slate-600">Fakultas: {m.fakultas}</div>
                                                <div className="text-sm text-slate-600">
                                                    NIM: <span className="tabular-nums tracking-tight">{m.nim}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}
                        </Panel>
                    )}


                    {section === "tech" && (
                        <Panel variant="solid">
                            <H3 className="mb-4">Teknologi Alat</H3>
                            <div className={`grid sm:grid-cols-2 gap-6 ${aboutText}`}>
                                <div>
                                    <h4 className="font-semibold mb-2 text-slate-900">Hardware</h4>
                                    <ul className="list-disc pl-5 space-y-1"><li>WHC 2900</li></ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-slate-900">Software</h4>
                                    <p className="mb-1">Frontend:</p>
                                    <ul className="list-disc pl-5 mb-3"><li>ReactJS (Framework)</li></ul>
                                    <p className="mb-1">Backend:</p>
                                    <ul className="list-disc pl-5"><li>Flask (Framework)</li><li>PostgreSQL (Database)</li></ul>
                                </div>
                            </div>
                        </Panel>
                    )}

                    {section === "contact" && (
                        <Panel variant="solid">
                            <H3 className="mb-6 text-center">Hubungi Kami</H3>
                            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl min-h-[340px]">
                                <SocialLink
                                    icon={Instagram}
                                    title="Instagram"
                                    primary="@stas.rg"
                                    href="https://instagram.com/stas.rg"
                                />
                                <SocialLink
                                    icon={Phone}
                                    title="Telepon"
                                    primary="+62 813-1514-3774"
                                    href="tel:+6281315143774"
                                />
                                <SocialLink
                                    icon={Linkedin}
                                    title="LinkedIn"
                                    primary="Center of Excellence STAS-RG"
                                    secondary="linkedin.com/company/telu-weather"
                                    href="https://www.linkedin.com/company/telu-weather"
                                />
                            </div>
                        </Panel>
                    )}
                </div>
            </div>
        </Panel>
    );
}
