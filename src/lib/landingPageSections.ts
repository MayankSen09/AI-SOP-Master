// Landing Page Section Generators
// Modular, reusable HTML section generators for landing pages

export interface SectionConfig {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
}

export const generateHeroSection = (
    productName: string,
    mainBenefit: string,
    subheadline: string,
    ctaText: string,
    config: SectionConfig
) => `
<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-${config.colors.primary} to-${config.colors.secondary} text-white py-20 px-4 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-40 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
    </div>
    
    <div class="max-w-6xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                    ✨ ${productName}
                </div>
                <h1 class="text-5xl md:text-6xl font-black mb-6 leading-tight" style="font-family: '${config.fonts.heading}', sans-serif">
                    ${mainBenefit}
                </h1>
                <p class="text-xl mb-8 opacity-95 leading-relaxed" style="font-family: '${config.fonts.body}', sans-serif">
                    ${subheadline}
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#signup" class="group bg-white text-${config.colors.primary} px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-lg inline-flex items-center gap-2">
                        ${ctaText}
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </a>
                    <a href="#learn-more" class="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition text-lg">
                        Learn More
                    </a>
                </div>
                <!-- Trust Indicators -->
                <div class="mt-8 flex items-center gap-6 text-sm">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>4.9/5 from 2,000+ reviews</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span>Free 14-day trial</span>
                    </div>
                </div>
            </div>
            <div class="hidden md:block">
                <!-- Dashboard Mockup/Hero Image Placeholder -->
                <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    <div class="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                        <svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
@keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -20px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(20px, 20px) scale(1.05); }
}
.animate-blob {
    animation: blob 10s infinite;
}
.animation-delay-2000 {
    animation-delay: 2s;
}
.animation-delay-4000 {
    animation-delay: 4s;
}
</style>
`;

export const generateFeaturesSection = (
    productName: string,
    features: Array<{ title: string; description: string; icon: string }>,
    config: SectionConfig
) => `
<!-- Features Section -->
<section class="py-20 px-4 bg-${config.colors.background}">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-${config.colors.primary}/10 text-${config.colors.primary} rounded-full text-sm font-bold mb-4">
                FEATURES
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6" style="font-family: '${config.fonts.heading}', sans-serif">
                Everything You Need to Succeed
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto" style="font-family: '${config.fonts.body}', sans-serif">
                ${productName} is packed with powerful features designed to help you achieve your goals faster
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            ${features.map((feature) => `
            <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-${config.colors.primary}/50">
                <div class="absolute inset-0 bg-gradient-to-br from-${config.colors.primary}/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative">
                    <div class="w-14 h-14 bg-gradient-to-br from-${config.colors.primary} to-${config.colors.secondary} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        ${feature.icon}
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4" style="font-family: '${config.fonts.heading}', sans-serif">
                        ${feature.title}
                    </h3>
                    <p class="text-gray-600 leading-relaxed" style="font-family: '${config.fonts.body}', sans-serif">
                        ${feature.description}
                    </p>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

export const generateTestimonialsSection = (
    testimonials: Array<{ name: string; role: string; company: string; quote: string; rating: number }>,
    config: SectionConfig
) => `
<!-- Testimonials Section -->
<section class="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-${config.colors.accent}/10 text-${config.colors.accent} rounded-full text-sm font-bold mb-4">
                TESTIMONIALS
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6" style="font-family: '${config.fonts.heading}', sans-serif">
                Loved by Thousands of Users
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto" style="font-family: '${config.fonts.body}', sans-serif">
                Don't just take our word for it - hear what our customers have to say
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            ${testimonials.map((testimonial) => `
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <!-- Rating -->
                <div class="flex gap-1 mb-4">
                    ${Array(testimonial.rating).fill(0).map(() => `
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    `).join('')}
                </div>
                
                <!-- Quote -->
                <p class="text-gray-700 mb-6 italic leading-relaxed" style="font-family: '${config.fonts.body}', sans-serif">
                    "${testimonial.quote}"
                </p>
                
                <!-- Author -->
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-${config.colors.primary} to-${config.colors.secondary} rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ${testimonial.name.charAt(0)}
                    </div>
                    <div>
                        <div class="font-bold text-gray-900">${testimonial.name}</div>
                        <div class="text-sm text-gray-600">${testimonial.role} at ${testimonial.company}</div>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

export const generatePricingSection = (
    plans: Array<{ name: string; price: string; period: string; features: string[]; popular?: boolean }>,
    config: SectionConfig
) => `
<!-- Pricing Section -->
<section class="py-20 px-4 bg-gray-50">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-${config.colors.primary}/10 text-${config.colors.primary} rounded-full text-sm font-bold mb-4">
                PRICING
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6" style="font-family: '${config.fonts.heading}', sans-serif">
                Simple, Transparent Pricing
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8" style="font-family: '${config.fonts.body}', sans-serif">
                Choose the plan that works best for you. All plans include a 14-day free trial.
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            ${plans.map((plan) => `
            <div class="relative ${plan.popular ? 'scale-105 z-10' : ''}">
                ${plan.popular ? `
                <div class="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div class="bg-gradient-to-r from-${config.colors.primary} to-${config.colors.secondary} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        MOST POPULAR
                    </div>
                </div>
                ` : ''}
                
                <div class="bg-white p-8 rounded-2xl shadow-xl ${plan.popular ? `border-2 border-${config.colors.primary}` : 'border border-gray-200'}">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2" style="font-family: '${config.fonts.heading}', sans-serif">
                        ${plan.name}
                    </h3>
                    <div class="mb-6">
                        <span class="text-5xl font-black text-gray-900">${plan.price}</span>
                        <span class="text-gray-600">/${plan.period}</span>
                    </div>
                    
                    <ul class="space-y-4 mb-8">
                        ${plan.features.map(feature => `
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-${config.colors.accent} flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-700" style="font-family: '${config.fonts.body}', sans-serif">${feature}</span>
                        </li>
                        `).join('')}
                    </ul>
                    
                    <a href="#signup" class="${plan.popular ? `bg-gradient-to-r from-${config.colors.primary} to-${config.colors.secondary} text-white` : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} w-full py-4 rounded-xl font-bold text-center transition-all hover:shadow-lg inline-block">
                        Get Started
                    </a>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="text-center mt-12">
            <p class="text-gray-600" style="font-family: '${config.fonts.body}', sans-serif">
                All plans include a <strong>30-day money-back guarantee</strong>. No questions asked.
            </p>
        </div>
    </div>
</section>
`;

export const generateStatsSection = (
    stats: Array<{ number: string; label: string; icon: string }>,
    config: SectionConfig
) => `
<!-- Stats Section -->
<section class="py-20 px-4 bg-gradient-to-br from-${config.colors.primary} to-${config.colors.secondary} text-white">
    <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
            ${stats.map((stat) => `
            <div class="text-center">
                <div class="text-5xl mb-4">${stat.icon}</div>
                <div class="text-5xl md:text-6xl font-black mb-2" style="font-family: '${config.fonts.heading}', sans-serif">
                    ${stat.number}
                </div>
                <div class="text-lg opacity-90" style="font-family: '${config.fonts.body}', sans-serif">
                    ${stat.label}
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>
`;

export const generateFAQSection = (
    faqs: Array<{ question: string; answer: string }>,
    config: SectionConfig
) => `
<!-- FAQ Section -->
<section class="py-20 px-4 bg-white">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
            <div class="inline-block px-4 py-2 bg-${config.colors.primary}/10 text-${config.colors.primary} rounded-full text-sm font-bold mb-4">
                FAQ
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6" style="font-family: '${config.fonts.heading}', sans-serif">
                Frequently Asked Questions
            </h2>
            <p class="text-xl text-gray-600" style="font-family: '${config.fonts.body}', sans-serif">
                Got questions? We've got answers.
            </p>
        </div>
        
        <div class="space-y-4">
            ${faqs.map((faq) => `
            <details class="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <summary class="flex justify-between items-center cursor-pointer list-none">
                    <h3 class="text-lg font-bold text-gray-900" style="font-family: '${config.fonts.heading}', sans-serif">
                        ${faq.question}
                    </h3>
                    <svg class="w-6 h-6 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </summary>
                <p class="mt-4 text-gray-700 leading-relaxed" style="font-family: '${config.fonts.body}', sans-serif">
                    ${faq.answer}
                </p>
            </details>
            `).join('')}
        </div>
    </div>
</section>
`;

export const generateCTASection = (
    headline: string,
    subheadline: string,
    ctaText: string,
    config: SectionConfig
) => `
<!-- Final CTA Section -->
<section class="py-20 px-4 bg-gradient-to-r from-${config.colors.primary} to-${config.colors.secondary} text-white">
    <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-black mb-6" style="font-family: '${config.fonts.heading}', sans-serif">
            ${headline}
        </h2>
        <p class="text-xl mb-8 opacity-95" style="font-family: '${config.fonts.body}', sans-serif">
            ${subheadline}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#signup" class="bg-white text-${config.colors.primary} px-10 py-5 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-lg inline-flex items-center justify-center gap-3">
                ${ctaText}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
            </a>
            <a href="#contact" class="border-2 border-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 transition text-lg">
                Talk to Sales
            </a>
        </div>
        
        <!-- Trust Badges -->
        <div class="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-75">
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">SSL Secure</span>
            </div>
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
                <span class="text-sm">24/7 Support</span>
            </div>
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">Money-Back Guarantee</span>
            </div>
        </div>
    </div>
</section>
`;

export const generateFooter = (productName: string, config: SectionConfig) => `
<!-- Footer -->
<footer class="bg-gray-900 text-gray-400 py-12 px-4">
    <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
            <div>
                <h3 class="text-white font-bold text-lg mb-4">${productName}</h3>
                <p class="text-sm leading-relaxed" style="font-family: '${config.fonts.body}', sans-serif">
                    The #1 solution for modern teams looking to scale their success.
                </p>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-4">Product</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:text-white transition">Features</a></li>
                    <li><a href="#" class="hover:text-white transition">Pricing</a></li>
                    <li><a href="#" class="hover:text-white transition">Security</a></li>
                    <li><a href="#" class="hover:text-white transition">Roadmap</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-4">Company</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:text-white transition">About</a></li>
                    <li><a href="#" class="hover:text-white transition">Blog</a></li>
                    <li><a href="#" class="hover:text-white transition">Careers</a></li>
                    <li><a href="#" class="hover:text-white transition">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-4">Legal</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:text-white transition">Privacy</a></li>
                    <li><a href="#" class="hover:text-white transition">Terms</a></li>
                    <li><a href="#" class="hover:text-white transition">Cookie Policy</a></li>
                    <li><a href="#" class="hover:text-white transition">Licenses</a></li>
                </ul>
            </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; ${new Date().getFullYear()} ${productName}. All rights reserved.</p>
        </div>
    </div>
</footer>
`;
