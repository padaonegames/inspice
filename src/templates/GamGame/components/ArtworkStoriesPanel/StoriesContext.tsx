import { createContext } from "react";
import { ArtworkData } from "../../../../services/artwork.model";
import { GamGameStoryDefinition } from "../../../../services/gamGameActivity.model";

export const sampleStory: GamGameStoryDefinition = {
  _id: 'abcd-1234',
  author: 'Pablo Gutiérrez',
  title: 'Mi nueva historia de prueba',
  activityId: '',
  parts: [
    {
      artworkId: '',
      multimediaData: {
        tags: [
          { tag: '#divertido', locationX: 0.1, locationY: 0.1 },
          { tag: '#guay', locationX: 0.65, locationY: 0.65 },
        ],
        emojis: [
          { emoji: '🤩', locationX: 0.25, locationY: 0.25 },
          { emoji: '🥰', locationX: 0.5, locationY: 0.25 }
        ],
        textTemplate: 'It makes me feel',
        text: 'mucha felicidad'
      }
    }
  ]
};

export interface StoriesContext {
  artwork: ArtworkData;
  stories: GamGameStoryDefinition[];
}

/**
 * Creación del contexto y determinación del valor por defecto del mismo.
 */
export const StoriesContext = createContext<StoriesContext>({
  artwork: {
    id: '',
    title: '',
    author: '',
    src: '',
    date: '',
    info: '',
    location: ''
  },
  stories: []
});