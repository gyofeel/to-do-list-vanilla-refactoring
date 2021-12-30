import eventCreator from '../model/eventCreator.js';

let template = null;

const createNewCardNode = () => {
    if (!template) {
        template = document.getElementById('card');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const attachEventsToCardElement = (el, index, dispatch) => {
    const addHandler = e => dispatch(eventCreator.addItem());
    const deleteHandler = e => dispatch(eventCreator.deleteCard(parseInt(index, 10)));
    const updateTitleHandler = e => dispatch(eventCreator.updateCardTitle(index, e.target.value));
    // const switchHandler = e => dispatch(eventCreator.switchCardOrder());

    el.querySelector('.add-item').addEventListener('click', addHandler);
    el.querySelector('.card-delete').addEventListener('click', deleteHandler);
    el.querySelector('.card-title-text').addEventListener('blur', updateTitleHandler);
};

const getCardElement = (data, index, dispatch) => {
    const { title, completeCount, totalCount } = data;

    const element = createNewCardNode();

    element.querySelector('.card-title-text').value = title;
    element.querySelector('.complete-num').textContent = completeCount;
    element.querySelector('.total-num').textContent = totalCount;

    attachEventsToCardElement(element, index, dispatch);

    return element;
};

export default (targetElement, state, dispatch) => {
    const { cards } = state;
    const newCardList = targetElement.cloneNode(true);

    newCardList.innerHTML = '';

    if (!cards.length) {
        return newCardList;
    }

    cards.map((card, index) => getCardElement(card, index, dispatch)).forEach(el => newCardList.appendChild(el));
    return newCardList;
};
