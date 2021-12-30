let template = null;

const createNewHeaderInfoNode = () => {
    if (!template) {
        template = document.getElementById('header-info');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const getHeaderInfo = (userName, date) => {
    const element = createNewHeaderInfoNode();
    element.querySelector('.username').textContent = userName;
    element.querySelector('.date').textContent = date;
    return element;
};

export default (targetElement, { userName, date }) => {
    const newHeaderInfo = targetElement.cloneNode(true);
    
    newHeaderInfo.innerHTML = '';
    newHeaderInfo.appendChild(getHeaderInfo(userName, date));

    return newHeaderInfo;
};