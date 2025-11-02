import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const poseDescriptions: { [key: string]: string } = {
  hug: 'is hugging the person from the old photo.',
  handshake: 'is shaking hands with the person from the old photo.',
  talk: 'is talking animatedly with the person from the old photo.',
  laugh: 'is laughing together with the person from the old photo.',
  look: 'and the person from the old photo are looking at each other warmly.',
  high_five: 'is giving a high-five to the person from the old photo.',
  fist_bump: 'is fist-bumping the person from the old photo.',
  whisper: 'is whispering a secret to the person from the old photo.',
  board_game: 'is playing a board game with the person from the old photo.',
  cooking: 'is cooking together with the person from the old photo.',
  reading: 'is reading a book together with the person from the old photo.',
  pointing: 'is pointing at something in the distance with the person from the old photo.',
  dancing: 'is dancing with the person from the old photo.',
  selfie: 'is posing for a selfie with the person from the old photo.',
  arm_wrestle: 'is arm-wrestling the person from the old photo.',
  headphones: 'is sharing headphones to listen to music with the person from the old photo.',
  tandem_bike: 'is riding a tandem bicycle with the person from the old photo.',
  back_to_back: 'is standing back-to-back with the person from the old photo, looking confident.',
  teaching: 'is teaching the person from the old photo how to do something, like play guitar or paint.',
  toast: 'is toasting, clinking glasses with the person from the old photo.',
  umbrella: 'is sharing an umbrella in the rain with the person from the old photo.',
  meditating: 'is meditating peacefully side-by-side with the person from the old photo.',
  waving: 'and the person from the old photo are waving at the camera.',
  gift: 'is exchanging a gift with the person from the old photo.',
};

const backgroundDescriptions: { [key: string]: string } = {
  white: 'Replace the original backgrounds with a smooth, plain white one.',
  soft_blur: 'Replace the original backgrounds with a soft, abstract blurred background.',
  park: 'Place them in a serene park scene with soft, natural lighting.',
  studio: 'Place them against a professional studio backdrop with soft, even lighting.',
  desert: 'Place them in a vast desert landscape at sunset.',
  helicopter: 'Place them inside the cockpit of a helicopter, flying over a city.',
  airplane: 'Place them inside an airplane, looking out the window at the wing and clouds.',
  arabian_market: 'Place them in a bustling, traditional Arabian market (a souk).',
  makkah_view: 'Place them with a respectful, artistic, and distant view of the city of Makkah in the background.',
  madina_view: 'Place them in an artistic scene with the courtyard of the Prophet\'s Mosque in Madina respectfully in the background.',
  snowy_mountain: 'Place them on a snowy mountain peak with a clear blue sky.',
  cozy_library: 'Place them in a cozy library with tall bookshelves and a warm fireplace.',
  futuristic_city: 'Place them on a street in a futuristic, cyberpunk-style city with neon lights.',
  sailboat: 'Place them on the deck of a sailboat on the open ocean.',
  tropical_beach: 'Place them on a beautiful tropical beach with white sand and clear turquoise water.',
  castle_ruins: 'Place them among ancient, majestic castle ruins.',
  tokyo_crossing: 'Place them in the middle of a busy street crossing in Tokyo.',
  japanese_garden: 'Place them in a serene Japanese garden with a bridge and a koi pond.',
  ballroom: 'Place them in a grand, elegant ballroom with chandeliers.',
  stage: 'Place them on a stage under bright spotlights.',
  space_station: 'Place them inside a space station, with a window looking down on planet Earth.',
  farm: 'Place them on a rustic farm with a classic red barn and green fields.',
  northern_lights: 'Place them in a winter landscape under the beautiful Aurora Borealis (Northern Lights).',
  carnival: 'Place them at a vibrant, colorful carnival at night with many lights.',
  art_gallery: 'Place them in a modern, quiet art gallery, looking at paintings.',
};

export async function generateReunifyImage(
  oldPhotoBase64: string,
  oldPhotoMimeType: string,
  recentPhotoBase64: string,
  recentPhotoMimeType: string,
  pose: string,
  background: string
): Promise<string> {

  const interactionDescription = poseDescriptions[pose] || poseDescriptions['hug'];
  const backgroundDescription = backgroundDescriptions[background] || backgroundDescriptions['white'];
  
  const prompt = `Create an image where the person from the recent photo ${interactionDescription} Make it look as if the two versions of the person are interacting naturally. ${backgroundDescription} Add soft, natural lighting that is consistent across both individuals and matches the scene.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: oldPhotoBase64,
              mimeType: oldPhotoMimeType,
            },
          },
          {
            inlineData: {
              data: recentPhotoBase64,
              mimeType: recentPhotoMimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data found in the API response.");
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate image with Gemini API.");
  }
}