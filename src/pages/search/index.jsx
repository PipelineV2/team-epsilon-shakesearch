import { useState, useEffect } from 'react';
import data from './data/collections.min.json';
import Fuse from 'fuse.js';
import Layout from "../../components/layout";
import { BsSearch } from "react-icons/bs";

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const fuseInstance = new Fuse(data, {
      keys: [
        'PLAY.TITLE',
        'PLAY.SCENE.TITLE',
        'PLAY.SCENE.STAGEDIR.#text',
        'PLAY.PERSONAE.PERSONA',
        'PLAY.ACT.TITLE',
      ],
      includeScore: true,
      includeMatches: true,
    });
    setFuse(fuseInstance);
  }, []);

  // A simple debounce function in a useEffect 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query === '') {
        setResults([]);
      } else if (fuse) {
        const fuzzyResults = fuse.search(query);
        const formattedResults = fuzzyResults.map((result) => result.item);
        setResults(formattedResults);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, fuse]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Layout>
    <section>
      <div className='container'>
      <div className='flex justify-center items-center mt-10 mb-10 flex-col'>
      <h1 className="text-2xl font-bold">Explore the Timeless Legacy of William Shakespeare</h1>
      <i>Read and search through the books written by Shakespeare with no hassle</i>
      </div>
      <div className="flex items-center justify-center mb-10">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="play title, scene, characters, line"
            className="py-4 px-8 border-2 border-red-500 rounded-xl w-96 focus:outline-none"
            autoFocus
          />
          <span className="py-2 px-4 border border-red-500 rounded-xl rounded-l-none absolute inset-y-0 right-0 pl-3 bg-red-500 flex items-center">
          <BsSearch className='text-white fill-current w-6 h-6'/>
          </span>
          </div>    
        </div>
        {query !== '' && (
          <p className='text-gray-700 text-base font-extrabold mb-3'>See results about {query}</p>
        )} 

        {/* Search results */}
        <div className='container mx-auto'>
          <div className="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
          {results.map((play) => {
            const scene = play?.PLAY?.ACT?.[0]?.SCENE?.[0] || {};
            const stagedir = Array.isArray(scene?.STAGEDIR)
              ? scene?.STAGEDIR.map((dir) => dir['#text'])
              : [];
            const personas = play?.PLAY?.PERSONAE?.PERSONA || [];
            const actTitles = play?.PLAY?.ACT?.map((act) => act?.TITLE) || [];


            return (
              <div key={play?.PLAY?.TITLE}>
                <h2 className="text-2xl mb-3">{play?.PLAY?.TITLE}</h2>
                <span className='inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3'>{scene?.TITLE}</span>
                <ul className="text-gray-700 text-base mb-3">
                  {stagedir.map((stageDir, index) => (
                    <li key={index}>{stageDir}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">Characters</span>
                <ul className="text-gray-700 text-base mb-3">
                  {personas.map((persona, index) => (
                    <li key={index}>{persona}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">Act Titles</span>
                <ul className="text-gray-700 text-base mb-3">
                  {actTitles.map((actTitle, index) => (
                    <li key={index}>{actTitle}</li>
                  ))}
                </ul>
              </div>
            );
          })}
          </div>
        </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;
