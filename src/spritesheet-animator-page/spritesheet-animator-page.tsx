import * as React from 'react';
import { useCharacter } from '../hooks/use-character';
import './spritesheet-animator-page.css';

const characters = ['Robot', 'Female Adventurer', 'Female Person', 'Male Person', 'Male Adventurer', 'Zombie'] as const;

const SpritesheetAnimatorPage: React.FC = () => {
    const [name, setName] = React.useState<string>(characters[0]);

    const [character, characterError, characterPending] = useCharacter(name);

    return (
        <main>
            <h1>Spritesheet Animator</h1>
            <section>
                <select name="select-character" id="select-character" defaultValue="" onChange={e => setName(e.target.value)}>
                    {characters.map(c => <option value={c} key={c}>{c}</option>)} 
                </select>
                <div>
                    {characterPending && <p className="loading">loading...</p>}
                    {!characterPending && !characterError && <pre>{JSON.stringify(character, null, 4)}</pre>}
                    {characterError && <p className="characterError">{JSON.stringify(characterError)}</p>}
                </div>
                <img alt={character?.name} src={character?.spritesheetUrl}></img>
                {!characterPending && !characterError && <pre>{new XMLSerializer().serializeToString(character?.texAtlas as Node)}</pre>}
            </section>
        </main>
    );
};

export default SpritesheetAnimatorPage;
