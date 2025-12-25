import {useState} from 'react'
import {ChevronDown, Search} from 'lucide-react'

const faqData = [
    {
        id: 1,
        question: "What is MySublet.de?",
        answer: "MySublet.de is a verified subletting platform in Germany where real people post real short-term rentals. We make subletting safe, simple, and scam-free."
    },
    {
        id: 2,
        question: "Is MySublet.de safe?",
        answer: "Yes. Every user must complete a mandatory manual identity verification. This removes fake profiles, prevents scams, and keeps the community clean."
    },
    {
        id: 3,
        question: "Why do you require verification?",
        answer: "To protect both hosts and tenants from:\n• fake listings\n• scammers\n• identity fraud\n• last-minute cancellations\n\nVerification creates trust and safety — no anonymous users."
    },
    {
        id: 4,
        question: "How does verification work?",
        answer: "You upload:\n• your ID (passport / residence permit / ID card)\n• your email\n• your phone number\n\nOur team manually checks it within a few hours. Nothing is shared publicly — only you and our verification team see it."
    },
    {
        id: 5,
        question: "Is verification free?",
        answer: "Yes, basic verification is free.\n\nIn the future, we may offer optional paid upgrades (priority check, premium badges)."
    },
    {
        id: 6,
        question: "Do I need landlord permission to sublet?",
        answer: "Yes — in Germany, subletting usually requires permission from the main landlord or property manager.\n\nHosts must confirm in the listing that they have this permission."
    },
    {
        id: 7,
        question: "Does MySublet.de create rental contracts?",
        answer: "Not automatically. Hosts and tenants can decide:\n• to use their own rental contract, or\n• to request our simple template (coming soon)"
    },
    {
        id: 8,
        question: "How do payments work between host and tenant?",
        answer: "Right now, rent and deposit are paid directly between host and tenant.\n\nStripe payment for listings / premium features only applies to MySublet services."
    },
    {
        id: 9,
        question: "Does MySublet.de handle deposits?",
        answer: "No — deposits are handled directly between host and tenant.\n\nIn the future, we might add a secure \"hold deposit\" feature."
    },
    {
        id: 10,
        question: "What types of listings can I post?",
        answer: "You can post:\n• furnished rooms\n• furnished apartments\n• short-term sublets\n• student sublets\n• co-living options\n• temporary stays (e.g., 1–6 months)\n\nLong-term rentals (12+ months) are also allowed if they are sublets."
    },
    {
        id: 11,
        question: "How long can a sublet be?",
        answer: "Anything from 1 week to several months — depends on the host's rules."
    },
    {
        id: 12,
        question: "Is Anmeldung (Registration) possible?",
        answer: "Some listings offer Anmeldung — some don't. Hosts must clearly state this in the listing."
    },
    {
        id: 13,
        question: "Can I cancel a booking?",
        answer: "You can message the host directly. MySublet.de is not part of the rental contract and does not control cancellations."
    },
    {
        id: 14,
        question: "Can I edit or delete my listing?",
        answer: "Yes — you can edit or remove your listing anytime in your dashboard."
    },
    {
        id: 15,
        question: "Why is my account not verified yet?",
        answer: "Possible reasons:\n• document blurry\n• wrong photo\n• name mismatch\n• phone/email not confirmed\n• your verification is in queue\n\nYou will get a notification if we need more information."
    },
    {
        id: 16,
        question: "Do you check apartments physically?",
        answer: "No — we verify people, not properties. We manually check:\n• identity\n• documents\n• legitimacy of the host\n\nWe do not go inside apartments."
    },
    {
        id: 17,
        question: "Is my data safe?",
        answer: "Yes. We follow German DSGVO rules:\n• data is encrypted\n• ID is never shown to other users\n• nothing is shared with third parties\n• used only for verification & security"
    },
    {
        id: 18,
        question: "Can I message other users before verification?",
        answer: "No. Messaging and booking are only available after verification to prevent spam and scams."
    },
    {
        id: 19,
        question: "What happens if someone scams?",
        answer: "We permanently ban the user. You can report anyone via:\n\nsupport@mysublet.de"
    },
    {
        id: 20,
        question: "Do you take any commission?",
        answer: "No. MySublet is free to use.\n\nOptional paid features may be added later (boost, premium listings)."
    },
    {
        id: 21,
        question: "Do you offer customer support?",
        answer: "Yes!\nEmail: support@mysublet.de\nWe reply within 24–48 hours on weekdays."
    }
]

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState('')
    const [openId, setOpenId] = useState(null)

    const filteredFaqs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-down">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Everything you need to know about MySublet.de
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 animate-slide-up">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 rounded-2xl focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all duration-300 hover:border-neutral-700"
                        />
                    </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-700 animate-stagger-in"
                                style={{animationDelay: `${index * 0.05}s`}}
                            >
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-800/50 transition-colors duration-300"
                                >
                                    <span className="text-lg font-semibold text-neutral-100 pr-4">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <div className="px-6 pb-5 pt-2">
                                        <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-neutral-400 text-lg">No questions found matching your search.</p>
                        </div>
                    )}
                </div>

                {/* Contact Section */}
                <div className="mt-12 p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center animate-fade-in">
                    <h2 className="text-2xl font-bold text-neutral-100 mb-3">
                        Still have questions?
                    </h2>
                    <p className="text-neutral-400 mb-6">
                        We're here to help! Reach out to our support team.
                    </p>
                    <a
                        href="mailto:support@mysublet.de"
                        className="inline-block bg-neutral-700 text-white px-8 py-3 rounded-xl hover:bg-neutral-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                    >
                        Contact Support
                    </a>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes stagger-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .animate-stagger-in {
          animation: stagger-in 0.5s ease-out backwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
        </div>
    )
}
