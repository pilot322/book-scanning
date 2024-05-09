import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col w-full h-full">
            <h1 className="mb-4 text-4xl font-bold">Αρχική</h1>

            <div className="h-48">
                <h2 className="text-2xl text-primary font-semibold mb-4">Σημερινές σαρώσεις</h2>
                <div className="skeleton w-96 h-32"></div>
            </div>

            <div className="h-48">
                <h2 className="text-2xl text-primary font-semibold mb-4">Σημερινές λήξεις</h2>
                <div className="skeleton w-96 h-32"></div>
            </div>

            <div className="h-48">
                <h2 className="text-2xl text-primary font-semibold mb-4">Εκκρεμότητες</h2>
                <div className="skeleton w-96 h-32"></div>
            </div>
        </div>
    );
}
