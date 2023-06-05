import { BsSearch } from "react-icons/bs";

interface SearchInputProps {}

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="search"
        className="px-4 py-2 h-14 border-2 border-[#9B1E25] rounded-xl focus:outline-none w-full"
        {...props}
      />
      <span className="py-2 px-4 border border-[#9B1E25] rounded-xl rounded-l-none absolute inset-y-0 right-0 pl-3 bg-[#9B1E25] flex items-center">
        <BsSearch className="text-white fill-current w-6 h-6" />
      </span>
    </div>
  );
};

export default SearchInput;
