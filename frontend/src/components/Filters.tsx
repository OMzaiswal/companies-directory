
interface Props {
    search: string;
    setSearch: (val: string) => void;
    locationFilter: string;
    setLocationFilter: (val: string) => void;
    industryFilter: string;
    setIndustryFilter: (val: string) => void; 
    locations: string[];
    industries: string[];
    sortOrder: string;
    setSortOrder: (val: string) => void;
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
    sortOrder,
    setSortOrder
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
            <select
                className="border border-gray-400 px-6 py-2 rounded-md focus:outline-none" 
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="ASC">Name A-Z</option>
                <option value="DESC">Name Z-A</option>
            </select>
        </div>
    )
}