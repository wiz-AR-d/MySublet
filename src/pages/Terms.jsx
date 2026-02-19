import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Document Header */}
                <div className="bg-white border-b-4 border-gray-900 p-8 md:p-12 mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Allgemeine Geschäftsbedingungen</h1>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600 border-t border-gray-200 pt-4 mt-4">
                        <p className="font-medium">Terms of Service (AGB) – MySublet.de</p>
                        <p>Stand: <span className="font-semibold">November 2025</span></p>
                    </div>
                </div>

                {/* Document Body */}
                <div className="bg-white shadow-sm border border-gray-200">
                    {/* Section 1 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§1</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Geltungsbereich</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-4">
                            <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Nutzer der Plattform MySublet.de, betrieben von:</p>
                            <div className="bg-gray-50 p-6 rounded border-l-4 border-gray-900">
                                <p className="font-semibold text-gray-900">Piyush Insaa</p>
                                <p>Bulmannstraße 2</p>
                                <p>90459 Nürnberg, Deutschland</p>
                                <p className="mt-2 text-sm">E-Mail: <a href="mailto:support@mysublet.de" className="text-blue-600 hover:underline">support@mysublet.de</a></p>
                            </div>
                            <p className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">MySublet.de stellt eine Plattform zur Verfügung, über die Hosts (Anbietende) und Mieter (Suchende) miteinander in Kontakt treten können. <strong>MySublet.de ist nicht Vertragspartei</strong> der über die Plattform angebahnten Mietverhältnisse.</p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§2</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Rolle von MySublet.de</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-4">
                            <p>MySublet.de ist ausschließlich Vermittler einer digitalen Kontaktplattform. Die Plattform:</p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-green-50 p-3 rounded border-l-4 border-green-600">• zeigt Inserate von Hosts an</div>
                                <div className="bg-green-50 p-3 rounded border-l-4 border-green-600">• ermöglicht Kontakt zwischen Host und Mieter</div>
                                <div className="bg-green-50 p-3 rounded border-l-4 border-green-600">• bietet Verifikation zur Sicherheit an</div>
                                <div className="bg-green-50 p-3 rounded border-l-4 border-green-600">• stellt technische Infrastruktur bereit</div>
                            </div>
                            <p className="bg-red-50 p-4 rounded border-l-4 border-red-600 font-semibold">MySublet.de ist keine Wohnungsagentur, kein Vermieter und kein Zwischenvermieter.</p>
                            <p className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">Alle Mietverträge werden ausschließlich zwischen Host und Mieter abgeschlossen.</p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§3</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Nutzerkonto</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-4">
                            <p>Zur Nutzung der Plattform ist ein Nutzerkonto erforderlich.</p>
                            <div>
                                <p className="font-semibold text-gray-900 mb-2">Nutzer verpflichten sich:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="flex items-start"><span className="mr-2">✓</span><span>richtige und vollständige Angaben zu machen</span></li>
                                    <li className="flex items-start"><span className="mr-2">✓</span><span>Zugangsdaten geheim zu halten</span></li>
                                    <li className="flex items-start"><span className="mr-2">✓</span><span>das Konto nur persönlich zu nutzen</span></li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 mb-2">MySublet.de kann Nutzerkonten sperren oder löschen, wenn:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>falsche Daten angegeben werden</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>gegen gesetzliche Vorgaben verstoßen wird</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Betrugsverdacht besteht</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>beleidigende oder schädliche Inhalte verbreitet werden</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 - Verification */}
                    <section className="border-b border-gray-200 p-8 md:p-12 bg-blue-50">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§4</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Verifikation (verpflichtend & manuell)</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-4">
                            <p className="bg-white p-4 rounded border-l-4 border-blue-600 font-semibold">Um die Plattform nutzen zu können, müssen alle Nutzer erfolgreich verifiziert werden.</p>

                            <div className="bg-white p-6 rounded">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4.1 Pflichtverifikation</h3>
                                <p className="mb-2">Folgende Angaben bzw. Unterlagen sind verpflichtend:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="flex items-start"><span className="mr-2">•</span><span>gültiger Personalausweis, Reisepass oder Aufenthaltstitel</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>gültige E-Mail-Adresse</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>gültige Telefonnummer</span></li>
                                </ul>
                                <p className="mt-4 bg-red-50 p-3 rounded border-l-4 border-red-600 text-sm">Ohne abgeschlossene Verifikation können Nutzer: keine Inserate erstellen, keine Nachrichten senden, keine Buchungen anfragen, keine Dienste der Plattform nutzen.</p>
                            </div>

                            <div className="bg-white p-6 rounded">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4.2 Manuelle Prüfung</h3>
                                <p className="mb-2">Alle Dokumente werden manuell von MySublet.de überprüft, um:</p>
                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="bg-green-50 p-2 rounded text-sm">✓ Fake-Accounts zu verhindern</div>
                                    <div className="bg-green-50 p-2 rounded text-sm">✓ Betrug auszuschließen</div>
                                    <div className="bg-green-50 p-2 rounded text-sm">✓ Identität zu bestätigen</div>
                                    <div className="bg-green-50 p-2 rounded text-sm">✓ Community-Sicherheit zu erhöhen</div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4.3 Verifikation für Hosts</h3>
                                <p className="mb-2">Hosts müssen zusätzlich:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="flex items-start"><span className="mr-2">•</span><span>die Adresse der angebotenen Unterkunft angeben</span></li>
                                    <li className="flex items-start"><span className="mr-2">•</span><span>bestätigen, dass Untervermietung erlaubt ist (z. B. Zustimmung des Vermieters / Mietvertragsregelung)</span></li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4.4 Keine Veröffentlichung von Ausweisdaten</h3>
                                <p className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-600">ID-Dokumente und personenbezogene Daten werden niemals öffentlich angezeigt, sondern nur intern zur Sicherheitsprüfung genutzt.</p>
                            </div>

                            <div className="bg-white p-6 rounded">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4.5 Ablehnung oder Sperrung</h3>
                                <p className="mb-2">MySublet.de kann Verifikationen ablehnen, zurückziehen oder Konten sperren, wenn:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Dokumente gefälscht sind</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Identität zweifelhaft ist</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Sicherheitsbedenken bestehen</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Sections 5-14 in compact format */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§5</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Nutzung der Plattform</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p>Nutzer dürfen keine:</p>
                            <ul className="list-none space-y-2">
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>falschen oder irreführenden Inserate einstellen</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>rechtswidrigen Sublets anbieten</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>beleidigenden oder diskriminierenden Inhalte posten</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Spam oder Massen-Nachrichten senden</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Bots oder automatisierte Tools nutzen</span></li>
                            </ul>
                            <p className="bg-red-100 p-4 rounded border-l-4 border-red-600 font-bold">Verstöße führen zur sofortigen Sperrung.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§6</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Mietverhältnis zwischen Host & Mieter</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p className="font-semibold">MySublet.de:</p>
                            <ul className="list-none space-y-2">
                                <li className="flex items-start bg-gray-50 p-2 rounded"><span className="mr-2">•</span><span>ist nicht an Mietverträgen beteiligt</span></li>
                                <li className="flex items-start bg-gray-50 p-2 rounded"><span className="mr-2">•</span><span>erstellt keine Mietverträge</span></li>
                                <li className="flex items-start bg-gray-50 p-2 rounded"><span className="mr-2">•</span><span>ist nicht verantwortlich für Kaution, Zahlung, Zustand der Wohnung</span></li>
                                <li className="flex items-start bg-gray-50 p-2 rounded"><span className="mr-2">•</span><span>haftet nicht für Streitigkeiten zwischen Host und Mieter</span></li>
                            </ul>
                            <p className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600 mt-3">Die Verantwortung für Rechtmäßigkeit, Zustand und Zahlung liegt ausschließlich bei Host und Mieter.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§7</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Gebühren & Zahlungen</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p className="bg-green-50 p-4 rounded border-l-4 border-green-600 font-semibold">Die Plattform ist grundsätzlich kostenlos nutzbar.</p>
                            <div>
                                <p className="mb-2">MySublet.de kann folgende kostenpflichtige Dienste anbieten:</p>
                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="bg-blue-50 p-2 rounded text-sm">• Verifikationsservices</div>
                                    <div className="bg-blue-50 p-2 rounded text-sm">• Premium-Anzeigen</div>
                                    <div className="bg-blue-50 p-2 rounded text-sm">• Inserate-Booster</div>
                                    <div className="bg-blue-50 p-2 rounded text-sm">• Zusatzfunktionen</div>
                                </div>
                            </div>
                            <p className="text-sm">Bezahlungen werden über <strong>Stripe</strong> abgewickelt.</p>
                            <p className="text-sm bg-gray-100 p-3 rounded">Für Mietzahlungen oder Kautionszahlungen sind Host und Mieter selbst verantwortlich (außer MySublet.de bietet optional eine Zahlungsfunktion an).</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§8</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Inhalte & Bilder</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-2">
                            <p>Mit dem Upload von Bildern oder Texten bestätigt der Nutzer:</p>
                            <ul className="list-none space-y-2">
                                <li className="flex items-start bg-green-50 p-2 rounded"><span className="mr-2">✓</span><span>Eigentum an den Inhalten</span></li>
                                <li className="flex items-start bg-green-50 p-2 rounded"><span className="mr-2">✓</span><span>keine Verletzung von Urheber- oder Persönlichkeitsrechten</span></li>
                                <li className="flex items-start bg-green-50 p-2 rounded"><span className="mr-2">✓</span><span>keine Nutzung geschützter Bilder ohne Erlaubnis</span></li>
                            </ul>
                            <p className="text-sm bg-blue-50 p-3 rounded mt-3">MySublet.de darf Inhalte für die Plattformdarstellung verwenden.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§9</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Bewertungen & Kommunikation</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-2">
                            <p>Bewertungen müssen sachlich und ehrlich sein. Verboten sind:</p>
                            <ul className="list-none space-y-2">
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Beleidigungen</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Fake-Bewertungen</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Weitergabe privater Nachrichten</span></li>
                                <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Manipulation von Bewertungen</span></li>
                            </ul>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§10</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Haftung</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-4">
                            <div>
                                <p className="font-semibold mb-2">MySublet.de haftet nur für:</p>
                                <ul className="list-none space-y-2">
                                    <li className="flex items-start bg-green-50 p-2 rounded"><span className="mr-2">✓</span><span>vorsätzliches oder grob fahrlässiges Verhalten</span></li>
                                    <li className="flex items-start bg-green-50 p-2 rounded"><span className="mr-2">✓</span><span>technische Fehler der Plattform, die vorsätzlich oder grob fahrlässig verursacht wurden</span></li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold mb-2">MySublet.de haftet nicht für:</p>
                                <ul className="list-none space-y-2">
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Mietverhältnisse & Zahlungsprobleme</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Betrug durch Nutzer</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Schäden an Wohnungen oder Eigentum</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Falsche Angaben in Inseraten</span></li>
                                    <li className="flex items-start bg-red-50 p-2 rounded"><span className="mr-2">✗</span><span>Ausfälle, Wartung oder technische Unterbrechungen</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§11</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Kündigung & Löschung</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p className="bg-gray-50 p-4 rounded">Nutzer können ihr Konto jederzeit löschen. MySublet.de kann Konten bei Verstößen oder Missbrauch sperren oder löschen.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§12</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Änderungen der AGB</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">MySublet.de kann diese AGB jederzeit ändern. Wesentliche Änderungen werden den Nutzern rechtzeitig mitgeteilt.</p>
                        </div>
                    </section>

                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§13</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Anwendbares Recht & Gerichtsstand</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="bg-gray-50 p-4 rounded space-y-2">
                                <p><strong>Anwendbares Recht:</strong> Deutsches Recht</p>
                                <p><strong>Gerichtsstand:</strong> Nürnberg (soweit zulässig)</p>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§14</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Kontakt</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                                <a href="mailto:support@mysublet.de" className="text-blue-600 hover:underline font-semibold">support@mysublet.de</a>
                            </div>
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

export default Terms;
