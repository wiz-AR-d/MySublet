import React from 'react';

const Impressum = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Document Header */}
                <div className="bg-white border-b-4 border-gray-900 p-8 md:p-12 mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Impressum</h1>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600 border-t border-gray-200 pt-4 mt-4">
                        <p className="font-medium">Legal Notice – MySublet.de</p>
                        <p>Angaben gemäß <span className="font-semibold">§ 5 TMG</span></p>
                    </div>
                </div>

                {/* Document Body */}
                <div className="bg-white shadow-sm border border-gray-200">
                    {/* Section 1 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§1</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Angaben gemäß § 5 TMG</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="bg-gray-50 p-6 rounded border-l-4 border-gray-900">
                                <p className="font-bold text-gray-900 text-lg mb-3">MySublet.de</p>
                                <p className="font-semibold text-gray-900">Piyush Insaa</p>
                                <p>Bulmannstraße 2</p>
                                <p>90459 Nürnberg</p>
                                <p>Deutschland</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§2</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Kontakt</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                                    <p className="font-semibold text-gray-900 mb-1">E-Mail</p>
                                    <p><a href="mailto:support@mysublet.de" className="text-blue-600 hover:underline">support@mysublet.de</a></p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                                    <p className="font-semibold text-gray-900 mb-1">Telefon</p>
                                    <p>017632970796</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§3</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Unternehmensform</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="font-semibold text-gray-900">Einzelunternehmen</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§4</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="bg-gray-50 p-6 rounded border-l-4 border-gray-900">
                                <p className="font-semibold text-gray-900">Piyush Insaa</p>
                                <p>Bulmannstraße 2</p>
                                <p>90459 Nürnberg</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§5</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Umsatzsteuer-ID</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600">
                                <p className="font-semibold text-gray-900">Nicht umsatzsteuerpflichtig</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§6</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Haftung für Inhalte</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p className="bg-gray-50 p-4 rounded">Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                            <p className="text-sm">Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.</p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§7</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Haftung für Links</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p className="bg-gray-50 p-4 rounded">Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Daher kann ich für diese fremden Inhalte keine Gewähr übernehmen. Für Inhalte verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.</p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="border-b border-gray-200 p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§8</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Urheberrecht</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed">
                            <p className="bg-gray-50 p-4 rounded">Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung, Verbreitung oder Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="p-8 md:p-12">
                        <div className="flex items-start mb-6">
                            <span className="text-3xl font-bold text-gray-900 mr-4">§9</span>
                            <h2 className="text-2xl font-bold text-gray-900 mt-1">Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO</h2>
                        </div>
                        <div className="ml-12 text-gray-700 leading-relaxed space-y-3">
                            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:</p>
                            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                                <a
                                    href="https://ec.europa.eu/consumers/odr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    https://ec.europa.eu/consumers/odr
                                </a>
                            </div>
                            <p className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-600 text-sm">Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
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

export default Impressum;
