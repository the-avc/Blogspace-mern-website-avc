import React from 'react';
import Footer from '../components/footer.component';

const TermsAndConditions = () => {
    return (
        <>
        <div className="min-h-screen bg-white-50 flex flex-col items-center py-8">
            <div className="max-w-3xl w-full px-4 bg-white rounded-lg shadow-md shadow-black-800">
                <h1 className="text-3xl font-bold text-center text-black-800 mb-6">Terms and Conditions</h1>

                <div className="text-black-700 space-y-4">
                    <section>
                        <h2 className="text-xl font-semibold">Introduction</h2>
                        <p>
                            Welcome to my resume project! By browsing this page, you agree to abide by the basic terms set out below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">Usage</h2>
                        <p>
                            Feel free to explore the content, but keep in mind this is just a demonstration and not a commercial product.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">Content</h2>
                        <p>
                            All content on this page, including text and design, is for educational and portfolio purposes only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">No Liability</h2>
                        <p>
                            I’m not liable for any damages or issues arising from visiting this page, as it’s part of my personal resume project.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold">Changes</h2>
                        <p>
                            These terms might change, but since this is for my portfolio, I don’t expect any drastic changes.
                        </p>
                    </section>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default TermsAndConditions;
