import { useEffect, useState } from "react";
import axios from "axios";

interface Company {
  id: number;
  name: string;
  location: string;
  industry: string;
}

const Home = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/companies");
        setCompanies(res.data);
        setFilteredCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Apply filters
  useEffect(() => {
    let temp = companies;

    if (search) temp = temp.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (locationFilter) temp = temp.filter(c => c.location === locationFilter);
    if (industryFilter) temp = temp.filter(c => c.industry === industryFilter);

    setFilteredCompanies(temp);
    setPage(1); // Reset page on filter change
  }, [search, locationFilter, industryFilter, companies]);

  // Pagination slice
  const start = (page - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(start, start + itemsPerPage);

  // Unique filter options
  const locations = Array.from(new Set(companies.map(c => c.location)));
  const industries = Array.from(new Set(companies.map(c => c.industry)));

  if (loading) return <p className="text-center mt-10">Loading companies...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Companies Directory</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {/* Companies grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedCompanies.map((c) => (
          <div key={c.id} className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-1">{c.name}</h3>
            <p className="text-sm"><strong>Location:</strong> {c.location}</p>
            <p className="text-sm"><strong>Industry:</strong> {c.industry}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(Math.ceil(filteredCompanies.length / itemsPerPage))].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={page === Math.ceil(filteredCompanies.length / itemsPerPage)}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
