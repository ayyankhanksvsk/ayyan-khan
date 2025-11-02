import React from 'react';

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const SelectIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.09A12.75 12.75 0 0112 3.75a12.75 12.75 0 0111.41 12.44v.09a2.25 2.25 0 01-2.47-2.118 3 3 0 00-5.78-1.128l-2.3-2.3a3 3 0 00-4.242 0l-2.3 2.3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
);

const MagicIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a2.25 2.25 0 01-1.423-1.423L12.25 18.5l1.938-.648a2.25 2.25 0 011.423 1.423l.648 1.938z" />
  </svg>
);

export const HowItWorks: React.FC = () => {
  return (
    <div className="mt-20 py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works in 3 Simple Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="flex flex-col items-center">
            <UploadIcon />
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1. Upload Two Photos</h3>
            <p className="text-gray-600 max-w-xs">
              First, upload an old photo of a person. Then, add a recent photo of anyone you choose—it could be a family member, a celebrity, or even yourself.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <SelectIcon />
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2. Choose the Pose</h3>
            <p className="text-gray-600 max-w-xs">
              Select how you want the two individuals to interact. Choose from options like hugging, talking, or shaking hands to set the mood for your reunion.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <MagicIcon />
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3. Create & Download</h3>
            <p className="text-gray-600 max-w-xs">
              Click the "Reunify Images" button and watch as our AI brings your concept to life. The final image will appear, ready for you to download and share.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};
