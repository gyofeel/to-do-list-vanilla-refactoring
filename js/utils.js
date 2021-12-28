const getFormattedDate = (objDate)=>{
    return `${objDate.getFullYear()}. ${objDate.getMonth()+1}. ${objDate.getDate()}`;
};

export { getFormattedDate };