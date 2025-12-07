import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Document Header */}
                <div className="bg-white border-b-4 border-gray-900 p-8 md:p-12 mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Datenschutzerklärung</h1>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600 border-t border-gray-200 pt-4 mt-4">
                        <p className="font-medium">Privacy Policy – MySublet.de</p>
                        <p>Stand: <span className="font-semibold">November 2025</span></p>
                    </div>
                </div>

                {/* Document Body */}
                <div className="bg-white shadow-sm border border-gray-200">
                    {/* Section 1 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">1.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Verantwortlicher</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <div className="bg-gray-50 p-6 rounded border-l-4 border-gray-900">
                                <p className="font-semibold text-gray-900">Piyush Insaa</p>
                                <p>Bulmannstraße 2</p>
                                <p>90459 Nürnberg, Deutschland</p>
                                <p className="mt-3 text-sm">E-Mail: <a href="mailto:support@mysublet.de" className="text-blue-600 hover:underline">support@mysublet.de</a></p>
                            </div>
                            <p className="pt-4">Als Betreiber dieser Website bin ich für die Verarbeitung personenbezogener Daten verantwortlich (Art. 4 Nr. 7 DSGVO).</p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">2.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Hosting & Datenverarbeitung</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-4">
                            <p>Unsere Website wird über <strong>Supabase</strong> gehostet. Supabase speichert Daten auf Servern innerhalb der EU.</p>
                            <div>
                                <p className="font-semibold text-gray-900 mb-2">Folgende Daten werden automatisch verarbeitet (Server-Logs):</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="flex items-start"><span className="mr-2">•</span><span>IP-Adresse (gekürzt gespeichert)</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>Datum und Uhrzeit des Abrufs</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>Browsertyp & Version</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>Betriebssystem</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>Referrer-URL</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>Aufgerufene Seiten</span></li>
                                </ul>
                            </div>
                            <p className="bg-blue-50 p-4 rounded border-l-4 border-blue-600"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).<br />Keine Weitergabe an unbefugte Dritte.</p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">3.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Cookies</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                                    <p className="font-semibold text-gray-900 mb-1">a) Essenzielle Cookies</p>
                                    <p className="text-sm">Technisch notwendig (Login, Sessions)</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">
                                    <p className="font-semibold text-gray-900 mb-1">b) Tracking-Cookies</p>
                                    <p className="text-sm">Nur mit Einwilligung (Google Analytics)</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">4.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Google Analytics</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p>Verwendet <strong>Google Ireland Limited</strong>.</p>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="font-semibold text-gray-900 mb-2">Verarbeitet:</p>
                                <p>Seitenaufrufe, Klickverhalten, Geräteinfos, Nutzungsdauer</p>
                            </div>
                            <p>IP-Masking aktiv.</p>
                            <p className="bg-blue-50 p-4 rounded border-l-4 border-blue-600"><strong>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).<br />USA-Datenübertragung möglich (EU-US Data Privacy Framework).</p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">5.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Stripe (Zahlungen)</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p>Zahlungsabwicklung über <strong>Stripe Payments Europe Ltd.</strong></p>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="font-semibold text-gray-900 mb-2">Verarbeitete Daten:</p>
                                <p>Name, E-Mail, Rechnungsdaten, Zahlungsdaten, Transaktionen</p>
                            </div>
                            <p className="bg-blue-50 p-4 rounded border-l-4 border-blue-600"><strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. b (Vertrag), Art. 6 Abs. 1 lit. f (Betrugsprävention).<br />Datenübertragung in die USA möglich.</p>
                        </div>
                    </section>

                    {/* Sections 6-14 in compact format */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">6.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Kontaktformular</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-2">
                            <p><strong>Verarbeitet:</strong> Name, E-Mail, Nachricht, optionale Anhänge.</p>
                            <p>Nur zur Bearbeitung der Anfrage.</p>
                            <p className="text-sm bg-blue-50 p-3 rounded"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">7.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Benutzerkonten & Registrierung</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-2">
                            <p><strong>Speicherung von:</strong> Name, E-Mail, Passwort (verschlüsselt), Verifizierungsdaten, Nutzungsdaten.</p>
                            <p className="text-sm bg-blue-50 p-3 rounded"><strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. b, Art. 6 Abs. 1 lit. f DSGVO</p>
                            <p className="text-sm bg-red-50 p-3 rounded border-l-4 border-red-600"><strong>Wichtig:</strong> ID-Daten niemals öffentlich.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">8.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Bilder & Dateiuploads</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p>Uploads werden in Supabase/CDN verarbeitet und gespeichert.</p>
                            <p className="text-sm bg-blue-50 p-3 rounded mt-2"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">9.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Newsletter</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p className="text-sm bg-gray-100 p-3 rounded">Derzeit nicht aktiv. Ergänzung erfolgt bei Einführung.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">10.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Datenübermittlung in Drittländer</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p>Kann im Rahmen von Google und Stripe stattfinden:</p>
                            <p className="text-sm bg-blue-50 p-3 rounded mt-2">EU-US Data Privacy Framework & Standardvertragsklauseln</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">11.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Löschung von Daten</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p className="mb-3">Daten werden gelöscht, wenn:</p>
                            <ul className="list-none space-y-2 ml-4">
                                <li className="flex items-start"><span className="mr-2">•</span><span>Zweck entfällt</span></li>
                                <li className="flex items-start"><span className="mr-2">•</span><span>gesetzliche Fristen ablaufen</span></li>
                                <li className="flex items-start"><span className="mr-2">•</span><span>du die Löschung beantragst (Art. 17 DSGVO)</span></li>
                            </ul>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12 bg-blue-50">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">12.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Deine Rechte</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded border border-gray-200">• Auskunft (Art. 15)</div>
                                <div className="bg-white p-3 rounded border border-gray-200">• Berichtigung (Art. 16)</div>
                                <div className="bg-white p-3 rounded border border-gray-200">• Löschung (Art. 17)</div>
                                <div className="bg-white p-3 rounded border border-gray-200">• Einschränkung (Art. 18)</div>
                                <div className="bg-white p-3 rounded border border-gray-200">• Datenübertragbarkeit (Art. 20)</div>
                                <div className="bg-white p-3 rounded border border-gray-200">• Widerruf (Art. 7)</div>
                                <div className="bg-white p-3 rounded border border-gray-200">• Widerspruch (Art. 21)</div>
                            </div>
                            <p className="mt-4 font-semibold">Kontakt: <a href="mailto:support@mysublet.de" className="text-blue-600 hover:underline">support@mysublet.de</a></p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">13.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Sicherheit</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p>SSL-Verschlüsselung, Zugriffsbeschränkungen, sichere Passworthashes, regelmäßige Updates.</p>
                        </div>
                    </section>

                    <section className="p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">14.</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Änderungen</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p>Diese Datenschutzerklärung kann angepasst werden.</p>
                        </div>
                    </section>
                </div>

                {/* Document Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>© 2025 MySublet.de – Alle Rechte vorbehalten</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
