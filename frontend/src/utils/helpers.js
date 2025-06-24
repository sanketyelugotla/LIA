export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const truncate = (str, length = 100) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
};