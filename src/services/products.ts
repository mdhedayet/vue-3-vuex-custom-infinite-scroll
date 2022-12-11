export const getProducts = async (id: string) => {
    const response = await fetch(`https://work.corporatesheba.com/api/guest/allproduct/1/1/1?page=${id}`);
    return await response.json();
}

export default {
    getProducts,
}


