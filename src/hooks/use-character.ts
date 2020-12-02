import { ICharacter } from '../spritesheet-animator-page/character.interface';
import { usePromise, UsePromiseState } from './use-promise';

const toSlug = (s: string) => s.toLowerCase().replace(/\s/, '-');
const characterPath = (c: string) => `/assets/kenney_tooncharacters1/${toSlug(c)}/character_${toSlug(c)}_sheetHD`;

const fetchCharacter = async (name: string): Promise<ICharacter | null> => {
    const [spritesheetUrl, texAtlasUrl] = ['png', 'xml'].map(ext => `${characterPath(name)}.${ext}`);
    const spritesheetPromise = fetch(spritesheetUrl).then(r => r.blob())
    const texAtlasPromise = fetch(texAtlasUrl).then(r => r.text()).then(t => new DOMParser().parseFromString(t, 'text/xml'))
    return Promise.all([spritesheetPromise, texAtlasPromise])
        .then(([spritesheet, texAtlas]) => ({ name, spritesheet, spritesheetUrl, texAtlas, texAtlasUrl }));
};

export const useCharacter = (name: string): UsePromiseState<ICharacter | null> => usePromise(fetchCharacter(name), null);
