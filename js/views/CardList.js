import eventCreator from '../model/eventCreator.js';

let cardTemplate = null,
    buttonTemplate = null

const createNewCardNode = () => {
    if (!cardTemplate) {
        cardTemplate = document.getElementById('card');
    }

    return cardTemplate.content.firstElementChild.cloneNode(true);
};

const createNewButtonNode = () => {
    if (!buttonTemplate) {
        buttonTemplate = document.getElementById('add-card-button');
    }

    return buttonTemplate.content.firstElementChild.cloneNode(true);
}

const attachEventsToCardElement = (el, index, dispatch) => {
    const addHandler = e => dispatch(eventCreator.addItem(index));
    const deleteHandler = e => dispatch(eventCreator.deleteCard(index));
    const updateTitleHandler = e => dispatch(eventCreator.updateCardTitle(index, e.target.value));
    // const switchHandler = e => dispatch(eventCreator.switchCardOrder());

    el.querySelector('.add-item').addEventListener('click', addHandler);
    el.querySelector('.card-delete').addEventListener('click', deleteHandler);
    el.querySelector('.card-title-text').addEventListener('blur', updateTitleHandler);
};

const attachEventsToButtonElement = (el, dispatch) => {
    const addHandler = e => dispatch(eventCreator.addCard());

    el.addEventListener('click', addHandler);
};

const getCardElement = (data, index, dispatch) => {
    const { title, completeCount, totalCount } = data;

    const element = createNewCardNode();

    element.querySelector('.card-title-text').value = title;
    element.querySelector('.complete-num').textContent = completeCount;
    element.querySelector('.total-num').textContent = totalCount;
    element.querySelector('.list').dataset.cardIndex = index;

    attachEventsToCardElement(element, index, dispatch);

    return element;
};

const getButtonElement = (dispatch) => {
    const element = createNewButtonNode();
    attachEventsToButtonElement(element, dispatch);

    return element;
};

export default (targetElement, state, dispatch) => {
    const { cards } = state;
    const newCardList = targetElement.cloneNode(true);

    newCardList.innerHTML = '';

    if (!cards.length) {
        return newCardList;
    }

    cards.map((card, index) => getCardElement(card, parseInt(index, 10), dispatch)).forEach(el => newCardList.appendChild(el));
    newCardList.appendChild(getButtonElement(dispatch));

    return newCardList;
};
