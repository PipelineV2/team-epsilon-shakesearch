import { useState, useEffect } from 'react';
import data from './data/collections.min.json';
import Fuse from 'fuse.js';
import Layout from "../../components/layout";
import { BsSearch } from "react-icons/bs";
import brand from "../../assets/ss-image.png"

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const fuseInstance = new Fuse(data, {
      keys: [
        'PLAY.TITLE',
        'PLAY.SCENE.TITLE',
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

  // Search results limit
  const resultsLimit = 3;

  const highlightText = (text) => {
    if (!query || !text) {
      return text;
    }
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts?.map((part, index) =>
      regex.test(part) ? <span key={index} className="text-red-500 font-medium">{part}</span> : part
    );
  };
  
  
  

  return (
    <Layout>
      <section>
        <div className='container'>
          <div className='flex justify-center items-center mt-10 mb-5 flex-col'>
            <div className='flex justify-center items-center h-32 w-32 rounded-full border border-gray-300 mb-5'>
              <img className='rounded-full' src={brand} alt="William Shakespeare" />
            </div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Kalam', cursive" }}>
              Explore the Timeless Legacy of William Shakespeare
            </h1>
            <h4 className="text-gray-700 font-semibold">
              Read and search through the books written by Shakespeare with no hassle
            </h4>
          </div>
          <div className="flex items-center justify-center mb-10">
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="play title, scene, characters, line"
                className="py-4 px-8 border-2 border-red-500 rounded-xl w-96 focus:outline-none"
                autoFocus
              />
              <span className="py-2 px-4 border border-red-500 rounded-xl rounded-l-none absolute inset-y-0 right-0 pl-3 bg-red-500 flex items-center">
                <BsSearch className='text-white fill-current w-6 h-6' />
              </span>
            </div>
          </div>
          {query !== '' && (
            <p className='text-gray-700 text-base font-extrabold mb-3'>See results about {query}</p>
          )}

          {/* Search results */}
          <div className='container mx-auto'>
            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-x-16">
              {results.slice(0, resultsLimit).map((play) => {
                const scene = play?.PLAY?.ACT?.[0]?.SCENE?.[0] || {};
                const personas = play?.PLAY?.PERSONAE?.PERSONA || [];
                const actTitles = play?.PLAY?.ACT?.map((act) => act?.TITLE) || [];

                return (
                  <div key={play?.PLAY?.TITLE}>
                    <h2 className="text-2xl mb-3">{highlightText(play?.PLAY?.TITLE)}</h2>
                    <span className='inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3'>
                      {highlightText(scene?.TITLE)}
                    </span>
                    <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                      Characters
                    </span>
                    <ul className="text-gray-700 text-base mb-3">
                      {personas.map((persona, index) => (
                        <li key={index}>{highlightText(persona)}</li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input bg-red-200 mb-3">
                      Act Titles
                    </span>
                    <ul className="text-gray-700 text-base mb-3">
                      {actTitles.map((actTitle, index) => (
                        <li key={index}>{highlightText(actTitle)}</li>
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
