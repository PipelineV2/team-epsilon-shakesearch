import HomeIntro from "../../components/homeIntro";
import Layout from "../../components/layout";
import SearchInput from "../../components/searchInput";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import { ReactComponent as GridIcon } from "../../assets/grid.svg";
import { ReactComponent as ListIcon } from "../../assets/list.svg";
import PlayItem from "../../components/playItem";

const PlaysPage = () => {
  return (
    <Layout>
      <section className="pb-40">
        <div className="container max-w-4xl mx-auto">
          <HomeIntro
            title="Iconic Plays and Poems of William Shakespeare"
            hasSubTitle={false}
          />

          <div className="mt-20 flex items-center gap-4">
            {/* Search Input */}
            <SearchInput
              placeholder="search books, words, quotes and more"
              // value={query}
              // onChange={handleSearch}
              // placeholder={placeholder}
              // autoFocus
              // onFocus={() => clearInterval(intervalIdRef.current)}
              // onBlur={() => resetInterval()}
            />
            <button className="flex flex-shrink-0 items-center px-4 h-14 rounded-lg text-white bg-[#9B1E25]">
              <span className="mr-1">
                <FilterIcon />
              </span>
              Filter Search
            </button>
          </div>
        </div>

        <div className="plays mt-[6rem]">
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-4">
              <p className="text-[#636366]">View Type:</p>

              <button
                type="button"
                className="h-10 w-10 border-0 rounded-md bg-[#9B1E25] flex items-center justify-center"
              >
                <GridIcon />
              </button>

              <button
                type="button"
                className="h-10 w-10 border-0 rounded-md flex items-center justify-center"
              >
                <ListIcon />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-14">
            <PlayItem />
            <PlayItem />
            <PlayItem />
            <PlayItem />
            <PlayItem />
            <PlayItem />
            <PlayItem />
            <PlayItem />
            <PlayItem />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlaysPage;
