const configHeaders = {
    headers:{
        "Content-Type": 'application/json',
        Authorization : `Bearer ${import.meta.env.VITE_TOKEN_AUTHORIZATION}` 
    }
};
export default configHeaders;