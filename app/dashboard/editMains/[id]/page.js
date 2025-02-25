//app\editProduct\[id]\page.js
import EditMainsForm from "@/components/EditMainsForm";
 
const getMainsById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/mains/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error(`Failed to fetch mains: ${res.statusText}`);
        }
 
        const data = await res.json();
        console.log(data); // Log the response to see its structure
        return data;
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditMains({ params }) {
    const { id } = params;
    const data = await getMainsById(id);

    if (!data || !data.mains) {
        return <div>Mains not found</div>;
    }

    const { comment, imagex, newFiles } = data.mains;

    return (
        <div className="flex flex-col justify-center items-center">

            <EditMainsForm id={id} comment={comment} imagex={imagex} newFiles={newFiles} />
        </div>

        
    )
    
    
    
    ;
}