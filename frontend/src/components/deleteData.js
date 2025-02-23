

const Delete=async (id,module)=>{
        try {
            const response = await fetch("http://localhost:8000/" + module+"/delete", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({key:id}), 
            });

            const result = await response.json();
            if (result.success) {
                console.log("Data deleted sucessfully", result.data );
                return true;
            } else {
                alert("Failed to delete data"+ result.error);
                return false;
            }
        } catch (error) {
            alert("Error while deleting data:"+error);
            return false;
        }
}
export default Delete;