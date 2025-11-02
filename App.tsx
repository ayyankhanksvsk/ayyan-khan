import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Header } from './components/Header';
import { Spinner } from './components/Spinner';
import { ResultDisplay } from './components/ResultDisplay';
import { generateReunifyImage } from './services/geminiService';
import type { ImageState } from './types';
import { HowItWorks } from './components/HowItWorks';

const App: React.FC = () => {
  const [oldPhoto, setOldPhoto] = useState<ImageState>({ src: null, base64: null, mimeType: null });
  const [recentPhoto, setRecentPhoto] = useState<ImageState>({ src: null, base64: null, mimeType: null });
  const [pose, setPose] = useState<string>('hug');
  const [background, setBackground] = useState<string>('white');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const poses = [
    { value: 'hug', label: 'Hugging' },
    { value: 'handshake', label: 'Shaking Hands' },
    { value: 'talk', label: 'Talking' },
    { value: 'laugh', label: 'Laughing Together' },
    { value: 'look', label: 'Looking at Each Other' },
    { value: 'high_five', label: 'High-Fiving' },
    { value: 'fist_bump', label: 'Fist Bumping' },
    { value: 'whisper', label: 'Sharing a Secret' },
    { value: 'board_game', label: 'Playing a Board Game' },
    { value: 'cooking', label: 'Cooking Together' },
    { value: 'reading', label: 'Reading a Book Together' },
    { value: 'pointing', label: 'Pointing at Something' },
    { value: 'dancing', label: 'Dancing' },
    { value: 'selfie', label: 'Posing for a Selfie' },
    { value: 'arm_wrestle', label: 'Arm Wrestling' },
    { value: 'headphones', label: 'Sharing Headphones' },
    { value: 'tandem_bike', label: 'Riding a Tandem Bicycle' },
    { value: 'back_to_back', label: 'Back-to-Back' },
    { value: 'teaching', label: 'One Teaching the Other' },
    { value: 'toast', label: 'Toasting with Glasses' },
    { value: 'umbrella', label: 'Sharing an Umbrella' },
    { value: 'meditating', label: 'Meditating Side-by-Side' },
    { value: 'waving', label: 'Waving at the Camera' },
    { value: 'gift', label: 'Exchanging a Gift' },
  ];

  const backgrounds = [
    { value: 'white', label: 'Plain White' },
    { value: 'soft_blur', label: 'Soft Blur' },
    { value: 'park', label: 'Park Scene' },
    { value: 'studio', label: 'Studio Backdrop' },
    { value: 'desert', label: 'Desert at Sunset' },
    { value: 'helicopter', label: 'Inside a Helicopter' },
    { value: 'airplane', label: 'Airplane Window View' },
    { value: 'arabian_market', label: 'Arabian Market (Souk)' },
    { value: 'makkah_view', label: 'Makkah View (Artistic)' },
    { value: 'madina_view', label: 'Madina View (Artistic)' },
    { value: 'snowy_mountain', label: 'Snowy Mountain Peak' },
    { value: 'cozy_library', label: 'Cozy Library' },
    { value: 'futuristic_city', label: 'Futuristic City Street' },
    { value: 'sailboat', label: 'On a Sailboat' },
    { value: 'tropical_beach', label: 'Tropical Beach' },
    { value: 'castle_ruins', label: 'Ancient Castle Ruins' },
    { value: 'tokyo_crossing', label: 'Tokyo Street Crossing' },
    { value: 'japanese_garden', label: 'Japanese Garden' },
    { value: 'ballroom', label: 'Grand Ballroom' },
    { value: 'stage', label: 'On a Stage with Spotlights' },
    { value: 'space_station', label: 'Space Station Overlooking Earth' },
    { value: 'farm', label: 'Rustic Farm Scene' },
    { value: 'northern_lights', label: 'Under the Northern Lights' },
    { value: 'carnival', label: 'Vibrant Carnival' },
    { value: 'art_gallery', label: 'Art Gallery' },
  ];

  const handleReunify = async () => {
    if (!oldPhoto.base64 || !oldPhoto.mimeType || !recentPhoto.base64 || !recentPhoto.mimeType) {
      setError("Please upload both photos before reunifying.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await generateReunifyImage(
        oldPhoto.base64,
        oldPhoto.mimeType,
        recentPhoto.base64,
        recentPhoto.mimeType,
        pose,
        background
      );
      setGeneratedImage(resultBase64);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Sorry, something went wrong while creating your image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !oldPhoto.src || !recentPhoto.src || isLoading;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUploader
            id="old-photo"
            label="1. Upload an Old Photo"
            description="A childhood picture, a vintage family portrait, etc."
            onImageUpload={setOldPhoto}
          />
          <ImageUploader
            id="recent-photo"
            label="2. Upload a Recent Photo"
            description="A photo of a famous person, family member, or even yourself."
            onImageUpload={setRecentPhoto}
          />
        </div>
        
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">3. Customize Your Scene</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="pose-select" className="block text-sm font-medium text-gray-700 mb-2 text-center">Interaction</label>
                    <select
                        id="pose-select"
                        value={pose}
                        onChange={(e) => setPose(e.target.value)}
                        className="block w-full p-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        {poses.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="background-select" className="block text-sm font-medium text-gray-700 mb-2 text-center">Background</label>
                    <select
                        id="background-select"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        className="block w-full p-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        {backgrounds.map((b) => (
                            <option key={b.value} value={b.value}>
                                {b.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleReunify}
            disabled={isButtonDisabled}
            className={`px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
              ${isButtonDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl'
              }`}
          >
            {isLoading ? 'Creating Magic...' : 'Reunify Images'}
          </button>
        </div>

        {error && (
          <div className="mt-8 text-center p-4 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <Spinner />
          </div>
        )}

        {generatedImage && (
          <ResultDisplay imageBase64={generatedImage} />
        )}

        <HowItWorks />
        
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini. An artistic interpretation of reuniting across time.</p>
      </footer>
    </div>
  );
};

export default App;
