
interface Props {
    search: string;
    setSearch: (val: string) => void;
    locationFilter: string;
    setLocationFilter: (val: string) => void;
    industryFilter: string;
    setIndustryFilter: (val: string) => void; 
    locations: string[];
    industries: string[];
}

export const Filters = ({
    search,
    setSearch,
    locationFilter,
    setLocationFilter,
    industryFilter,
    setIndustryFilter,
    locations,
    industries,
  }: Props) => {


    return (
        <div className="flex gap-4 mb-4">
            <p className="p-2 text-xl">Filters:</p>
            <input 
                type="text" 
                value={search}
                placeholder="Search by name"
                className="border border-gray-400 p-2 rounded-md focus:outline-none"
                onChange={(e) => setSearch(e.target.value)}
            />
            <select 
                className="border border-gray-400 px-6 py-2 rounded-md focus:outline-none"
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}   
            >
                <option value="">All Locations</option>
                {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                ))}
            </select>
            <select
                className="border border-gray-400 px-6 py-2 rounded-md focus:outline-none" 
                value={industryFilter}
                onChange={e => setIndustryFilter(e.target.value)}
            >
                <option value="">All Industries</option>
                {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                ))}
            </select>
        </div>
    )
}