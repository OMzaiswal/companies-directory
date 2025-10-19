import { useEffect, useState } from "react"
import { Loading } from "../components/Loading";
import axios from "axios";
import { CompanyCard } from "../components/CompanyCard";
import { Filters } from "../components/Filters";
import { Pagination } from "../components/Pagination";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface Company {
    id: number,
    name: string,
    location: string,
    industry: string
}

export const Home = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const [page, setPage] = useState(1);
    const itemsPerPage = 12;


    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                console.log('try starts here')
                const res = await axios.get(`${baseUrl}/api/companies/`);
                setCompanies(res.data);
            } catch(err:any) {
                setError(err.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    }, [])

    useEffect(() => {
        let temp = [...companies];
        if(search) {
            temp = temp.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (locationFilter) {
            temp = temp.filter(c => c.location === locationFilter);
        }
        if (industryFilter) {
            temp = temp.filter(c => c.industry === industryFilter);
        }
        if (sortOrder === 'ASC') {
            temp.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sortOrder === 'DESC') {
            temp.sort((a, b) => b.name.localeCompare(a.name));
          }

        setFilteredCompanies(temp);
        setPage(1);
    }, [search, locationFilter, industryFilter, companies, sortOrder]);

    const start = (page - 1) * itemsPerPage;
    const paginatedCompanies = filteredCompanies.slice(start, start+itemsPerPage);


    const locations = Array.from(new Set(companies.map(c => c.location)));
    const industries = Array.from(new Set(companies.map(c => c.industry)));


    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-8">Companies Directory</h1>

            <div>
                <Filters 
                    search={search}
                    setSearch={setSearch}
                    locationFilter={locationFilter}
                    setLocationFilter={setLocationFilter}
                    industryFilter={industryFilter}
                    setIndustryFilter={setIndustryFilter}
                    locations={locations}
                    industries={industries}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                 />
            </div>
            
            {loading && (
                <Loading />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
                {paginatedCompanies.map(c => (
                    <CompanyCard key={c.id} company={c} />
                ))}
            </div>

            <div>
                <Pagination 
                    page={page}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredCompanies.length}
                />
            </div>
        </div>
    )
}