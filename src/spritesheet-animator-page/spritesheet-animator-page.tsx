import * as React from 'react';
import { inspect } from 'util';
import { useCharacter } from '../hooks/use-character';
import './spritesheet-animator-page.css';

const characters = ['Robot', 'Female Adventurer', 'Female Person', 'Male Person', 'Male Adventurer', 'Zombie'] as const;

const SpritesheetAnimatorPage: React.FC = () => {
    const [name, setName] = React.useState<string>(characters[0]);

    const { value, error, isPending } = useCharacter(name);

    return (
        <main>
            <h1>Spritesheet Animator</h1>
            <section>
                <select name="from" id="from" defaultValue="" onChange={(e) => setName(e.target.value)}>
                    {characters.map(c => <option value={c} key={c}>{c}</option>)} 
                </select>
                <div>
                    {isPending && <p className="loading">loading...</p>}
                    {!isPending && !error && <pre>{JSON.stringify(value, null, 4)}</pre>}
                    {error && <p className="error">{JSON.stringify(error)}</p>}
                </div>
                <img src={value?.spritesheetUrl}></img>
                {!isPending && !error && <pre>{new XMLSerializer().serializeToString(value?.texAtlas as Node)}</pre>}
            </section>
        </main>
    );
};

export default SpritesheetAnimatorPage;
