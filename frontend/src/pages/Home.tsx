import { useEffect, useState } from "react"
import { Loading } from "../components/Loading";
import axios from "axios";

interface Company {
    id: string,
    name: string,
    location: string,
    industry: string
}

export const Home = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<Company>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get('/')
            } catch(err) {}
        }
    }, [])



    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div></div>
    )
}