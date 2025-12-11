export const useRecommendations = (allProducts, currentProductId = null) => {
    if (!allProducts) return [];

    let list = [...allProducts];

    // Excluir el producto actual SOLO si currentProductId existe
    if (currentProductId) {
    list = list.filter(p => p.id !== currentProductId);
    }

    // Ordenar por score de mayor a menor
    list.sort((a, b) => b.ecoScore.score - a.ecoScore.score);

    // Tomar máximo 4 SOLO si currentProductId existe
    if (currentProductId) {
    return list.slice(0, 4);
    }

    // Retorna los productos ordenados por score de mayor a menor
    return list;
};
