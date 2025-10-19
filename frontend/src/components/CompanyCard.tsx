
interface Company {
    id: number;
    name: string;
    location: string;
    industry: string;
}
export const CompanyCard = ({ company }: { company: Company }) => {

    return (
        <div className="py-12 bg-blue-50 hover:bg-blue-100 rounded-md shadow-sm hover:shadow-md transition">
            <p className="text-lg font-semibold mb-1 text-blue-600">{company.name}</p>
            <p className="text-sm"><strong>Location:</strong> {company.location}</p>
            <p className="text-sm"><strong>Industry:</strong> {company.industry}</p>
        </div>
    )
}